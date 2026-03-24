import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Trash2, RefreshCw } from "lucide-react";

interface Submission {
  id: number;
  type: string;
  data: Record<string, unknown>;
  created_at: string;
}

const TYPE_LABELS: Record<string, string> = {
  "tool-recommendation": "Tool Recommendation",
  "partner-contact": "Partner Contact",
  "grant-application": "Grant Application",
};

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

function summarizeData(data: Record<string, unknown>): string {
  const parts: string[] = [];
  for (const [key, val] of Object.entries(data)) {
    if (val && typeof val === "string" && val.trim()) {
      parts.push(`${key}: ${val}`);
    }
  }
  return parts.join(" | ") || "(empty)";
}

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/submissions");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSubmissions(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
      toast({
        title: "Failed to load submissions",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const deleteSubmission = async (id: number) => {
    try {
      const res = await fetch(`/api/submissions/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      toast({ title: "Deleted", description: "Submission removed." });
    } catch {
      toast({
        title: "Delete failed",
        description: "Could not delete submission.",
        variant: "destructive",
      });
    }
  };

  // Group submissions by type
  const grouped = submissions.reduce<Record<string, Submission[]>>(
    (acc, sub) => {
      const key = sub.type || "other";
      if (!acc[key]) acc[key] = [];
      acc[key].push(sub);
      return acc;
    },
    {}
  );

  const typeOrder = [
    "tool-recommendation",
    "partner-contact",
    "grant-application",
  ];
  const sortedTypes = [
    ...typeOrder.filter((t) => grouped[t]),
    ...Object.keys(grouped).filter((t) => !typeOrder.includes(t)),
  ];

  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Submissions</h1>
        <Button variant="outline" onClick={fetchSubmissions} disabled={loading}>
          <RefreshCw
            className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 rounded-lg text-sm text-destructive">
          Error loading submissions: {error}
        </div>
      )}

      {!loading && submissions.length === 0 && !error && (
        <div className="text-center py-16 text-muted-foreground">
          No submissions yet.
        </div>
      )}

      {sortedTypes.map((type) => (
        <div key={type} className="mb-10">
          <h2 className="text-xl font-semibold mb-3">
            {TYPE_LABELS[type] || type}
            <span className="ml-2 text-sm text-muted-foreground font-normal">
              ({grouped[type].length})
            </span>
          </h2>
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead className="w-[160px]">Date</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="w-[60px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {grouped[type].map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-mono text-xs">
                      {sub.id}
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDate(sub.created_at)}
                    </TableCell>
                    <TableCell className="text-sm truncate max-w-[400px]">
                      {summarizeData(sub.data)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => deleteSubmission(sub.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </div>
  );
}
