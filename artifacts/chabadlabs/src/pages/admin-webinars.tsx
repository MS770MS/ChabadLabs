import { useState } from "react";
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
import { Trash2, Plus, Copy, ChevronDown, ChevronUp } from "lucide-react";
import webinarsSource from "@/data/webinars.json";

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

function makeEmptyWebinar(nextId: number): Webinar {
  return {
    id: nextId,
    title: "",
    date: new Date().toISOString().slice(0, 10),
    presenter: "",
    difficulty: "Beginner",
    summary: "",
    takeaways: [""],
    recordingUrl: "#",
    youtubeId: "",
    tags: [],
  };
}

export default function AdminWebinars() {
  const [webinars, setWebinars] = useState<Webinar[]>(
    () => (webinarsSource as Webinar[]).map((w) => ({ ...w }))
  );
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { toast } = useToast();

  const nextId = Math.max(0, ...webinars.map((w) => w.id)) + 1;

  const updateWebinar = (id: number, patch: Partial<Webinar>) => {
    setWebinars((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...patch } : w))
    );
  };

  const addWebinar = () => {
    const newW = makeEmptyWebinar(nextId);
    setWebinars((prev) => [...prev, newW]);
    setExpandedId(newW.id);
  };

  const deleteWebinar = (id: number) => {
    setWebinars((prev) => prev.filter((w) => w.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const copyJson = async () => {
    const clean = webinars.map((w) => {
      const out: Record<string, unknown> = { ...w };
      if (!out.youtubeId) delete out.youtubeId;
      return out;
    });
    try {
      await navigator.clipboard.writeText(JSON.stringify(clean, null, 2));
      toast({ title: "Copied!", description: "JSON copied to clipboard." });
    } catch {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Webinar Admin</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addWebinar}>
            <Plus className="w-4 h-4 mr-2" /> Add Webinar
          </Button>
          <Button onClick={copyJson}>
            <Copy className="w-4 h-4 mr-2" /> Copy JSON
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {webinars.map((w) => {
          const isExpanded = expandedId === w.id;
          return (
            <div key={w.id} className="border border-border rounded-lg">
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
                </div>
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
                          <SelectItem value="Intermediate">
                            Intermediate
                          </SelectItem>
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
                </div>
              )}
            </div>
          );
        })}
      </div>

      {webinars.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          No webinars. Click "Add Webinar" to create one.
        </div>
      )}
    </div>
  );
}
