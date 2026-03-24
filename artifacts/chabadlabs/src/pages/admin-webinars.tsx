import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Save, ChevronDown, ChevronUp, RefreshCw, Upload } from "lucide-react";
import webinarsJson from "@/data/webinars.json";

interface Webinar {
  id: number;
  title: string;
  date: string;
  presenter: string;
  difficulty: string;
  summary: string;
  takeaways: string[];
  recordingUrl: string;
  youtubeId?: string;
  tags: string[];
}

export default function AdminWebinars() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);
  const [dirty, setDirty] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const fetchWebinars = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/webinars");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setWebinars(data);
      setDirty(new Set());
    } catch {
      toast({
        title: "Failed to load webinars",
        description: "Using local data as fallback.",
        variant: "destructive",
      });
      setWebinars((webinarsJson as Webinar[]).map((w) => ({ ...w })));
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchWebinars();
  }, [fetchWebinars]);

  const updateWebinar = (id: number, patch: Partial<Webinar>) => {
    setWebinars((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...patch } : w))
    );
    setDirty((prev) => new Set(prev).add(id));
  };

  const saveWebinar = async (w: Webinar) => {
    setSaving(w.id);
    try {
      const res = await fetch(`/api/webinars/${w.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(w),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setDirty((prev) => {
        const next = new Set(prev);
        next.delete(w.id);
        return next;
      });
      toast({ title: "Saved", description: `"${w.title}" updated.` });
    } catch {
      toast({ title: "Save failed", description: "Could not save webinar.", variant: "destructive" });
    } finally {
      setSaving(null);
    }
  };

  const addWebinar = async () => {
    try {
      const res = await fetch("/api/webinars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "(New Webinar)",
          date: new Date().toISOString().slice(0, 10),
          presenter: "",
          difficulty: "Beginner",
          summary: "",
          takeaways: [],
          recordingUrl: "#",
          youtubeId: "",
          tags: [],
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { id } = await res.json();
      await fetchWebinars();
      setExpandedId(id);
      toast({ title: "Created", description: "New webinar added." });
    } catch {
      toast({ title: "Failed to create", description: "Could not add webinar.", variant: "destructive" });
    }
  };

  const deleteWebinar = async (id: number) => {
    try {
      const res = await fetch(`/api/webinars/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setWebinars((prev) => prev.filter((w) => w.id !== id));
      if (expandedId === id) setExpandedId(null);
      toast({ title: "Deleted", description: "Webinar removed." });
    } catch {
      toast({ title: "Delete failed", description: "Could not delete webinar.", variant: "destructive" });
    }
  };

  const seedFromJson = async () => {
    try {
      const res = await fetch("/api/webinars/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webinars: webinarsJson }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.imported) {
        toast({ title: "Imported", description: `${data.imported} webinars seeded from JSON.` });
        await fetchWebinars();
      } else {
        toast({ title: "Already seeded", description: `Database already has ${data.count} webinars.` });
      }
    } catch {
      toast({ title: "Seed failed", description: "Could not import webinars.", variant: "destructive" });
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Webinar Admin</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchWebinars} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button variant="outline" onClick={seedFromJson}>
            <Upload className="w-4 h-4 mr-2" /> Seed from JSON
          </Button>
          <Button variant="outline" onClick={addWebinar}>
            <Plus className="w-4 h-4 mr-2" /> Add Webinar
          </Button>
        </div>
      </div>

      {loading && webinars.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">Loading...</div>
      )}

      <div className="space-y-3">
        {webinars.map((w) => {
          const isExpanded = expandedId === w.id;
          const isDirty = dirty.has(w.id);
          return (
            <div key={w.id} className={`border rounded-lg ${isDirty ? "border-primary/50" : "border-border"}`}>
              {/* Collapsed header */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
                onClick={() => setExpandedId(isExpanded ? null : w.id)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 shrink-0" />
                  )}
                  <span className="font-medium truncate">
                    {w.title || "(untitled)"}
                  </span>
                  <span className="text-sm text-muted-foreground shrink-0">
                    {w.date}
                  </span>
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded shrink-0">
                    {w.difficulty}
                  </span>
                  {isDirty && (
                    <span className="text-xs text-primary font-medium shrink-0">unsaved</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {isDirty && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 text-primary hover:text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        saveWebinar(w);
                      }}
                      disabled={saving === w.id}
                    >
                      <Save className={`w-4 h-4 ${saving === w.id ? "animate-pulse" : ""}`} />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteWebinar(w.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Expanded form */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-border pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Title</Label>
                      <Input
                        value={w.title}
                        onChange={(e) =>
                          updateWebinar(w.id, { title: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={w.date}
                        onChange={(e) =>
                          updateWebinar(w.id, { date: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Presenter</Label>
                      <Input
                        value={w.presenter}
                        onChange={(e) =>
                          updateWebinar(w.id, { presenter: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Difficulty</Label>
                      <Select
                        value={w.difficulty}
                        onValueChange={(val) =>
                          updateWebinar(w.id, { difficulty: val })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Summary</Label>
                    <Textarea
                      rows={3}
                      value={w.summary}
                      onChange={(e) =>
                        updateWebinar(w.id, { summary: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Recording URL</Label>
                      <Input
                        value={w.recordingUrl}
                        onChange={(e) =>
                          updateWebinar(w.id, { recordingUrl: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>YouTube ID (optional)</Label>
                      <Input
                        value={w.youtubeId ?? ""}
                        onChange={(e) =>
                          updateWebinar(w.id, { youtubeId: e.target.value })
                        }
                        placeholder="e.g. f56EGtO0mug"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Tags (comma-separated)</Label>
                    <Input
                      value={w.tags.join(", ")}
                      onChange={(e) =>
                        updateWebinar(w.id, {
                          tags: e.target.value
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean),
                        })
                      }
                    />
                  </div>

                  {/* Takeaways */}
                  <div className="space-y-2">
                    <Label>Takeaways</Label>
                    {w.takeaways.map((t, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          value={t}
                          onChange={(e) => {
                            const updated = [...w.takeaways];
                            updated[idx] = e.target.value;
                            updateWebinar(w.id, { takeaways: updated });
                          }}
                          placeholder={`Takeaway ${idx + 1}`}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 text-destructive hover:text-destructive"
                          onClick={() => {
                            const updated = w.takeaways.filter(
                              (_, i) => i !== idx
                            );
                            updateWebinar(w.id, {
                              takeaways: updated.length > 0 ? updated : [""],
                            });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateWebinar(w.id, {
                          takeaways: [...w.takeaways, ""],
                        })
                      }
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Takeaway
                    </Button>
                  </div>

                  {/* Save button at bottom of expanded form */}
                  <div className="flex justify-end pt-2">
                    <Button
                      onClick={() => saveWebinar(w)}
                      disabled={saving === w.id || !isDirty}
                      className="btn-futuristic"
                    >
                      <Save className={`w-4 h-4 mr-2 ${saving === w.id ? "animate-pulse" : ""}`} />
                      {saving === w.id ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!loading && webinars.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="mb-4">No webinars in database.</p>
          <Button variant="outline" onClick={seedFromJson}>
            <Upload className="w-4 h-4 mr-2" /> Import from JSON
          </Button>
        </div>
      )}
    </div>
  );
}
