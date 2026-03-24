import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SectionLabel } from "@/components/section-label";
import { useToast } from "@/hooks/use-toast";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function GrantApply() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    chabadHouse: "",
    projectName: "",
    builtSoFar: "",
    fundingHelp: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "grant-application", data: formData }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      toast({ title: "Application submitted!", description: "We'll review your application and get back to you." });
      setFormData({ name: "", chabadHouse: "", projectName: "", builtSoFar: "", fundingHelp: "", email: "" });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(".page-title",
      { y: 40, opacity: 0, visibility: "hidden" },
      { y: 0, opacity: 1, visibility: "visible", duration: 1, ease: "power3.out" }
    )
    .fromTo(".page-subtitle",
      { opacity: 0, y: 20, visibility: "hidden" },
      { opacity: 1, y: 0, visibility: "visible", duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(".form-panel",
      { opacity: 0, y: 40, visibility: "hidden" },
      { opacity: 1, y: 0, visibility: "visible", duration: 0.8, ease: "power3.out" },
      "-=0.3"
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <SectionLabel number="001" label="GRANT PROGRAM" />

        <h1 className="page-title gsap-hidden text-4xl md:text-5xl font-display font-bold text-foreground mt-4">
          Apply for a Grant
        </h1>
        <p className="page-subtitle gsap-hidden text-lg text-muted-foreground mt-3">
          ChabadLabs supports builders. Tell us about your project.
        </p>

        <form onSubmit={handleSubmit} className="form-panel gsap-hidden mt-12">
          <div className="glass-panel border border-border rounded-2xl p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Your Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Rabbi Moshe Cohen"
                className="bg-card/40 border-border/60"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chabadHouse" className="text-sm font-medium text-foreground">
                Your Chabad House / City
              </Label>
              <Input
                id="chabadHouse"
                name="chabadHouse"
                value={formData.chabadHouse}
                onChange={handleChange}
                placeholder="Chabad of Downtown Miami"
                className="bg-card/40 border-border/60"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectName" className="text-sm font-medium text-foreground">
                Project Name
              </Label>
              <Input
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="My AI Project"
                className="bg-card/40 border-border/60"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="builtSoFar" className="text-sm font-medium text-foreground">
                What have you built so far?
              </Label>
              <Textarea
                id="builtSoFar"
                name="builtSoFar"
                value={formData.builtSoFar}
                onChange={handleChange}
                placeholder="Describe your project, what stage it's at, and any links..."
                className="bg-card/40 border-border/60 min-h-[120px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fundingHelp" className="text-sm font-medium text-foreground">
                What would funding help you do?
              </Label>
              <Textarea
                id="fundingHelp"
                name="fundingHelp"
                value={formData.fundingHelp}
                onChange={handleChange}
                placeholder="How would a grant help your project move forward?"
                className="bg-card/40 border-border/60 min-h-[120px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Contact Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="bg-card/40 border-border/60"
                required
              />
            </div>

            <Button
              type="submit"
              className="btn-futuristic w-full py-3 font-semibold mt-4"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
