import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/section-title";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section id="contact">
      <SectionTitle>Get In Touch</SectionTitle>
      <div className="max-w-xl mx-auto text-center">
        <p className="mb-8 text-muted-foreground">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Feel free to reach out to me.
        </p>
        <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
          <a href="mailto:salcedo.jaressenkyle@gmail.com">
            <Mail className="mr-2 h-5 w-5" />
            Say Hello
          </a>
        </Button>
        <div className="mt-12 flex justify-center gap-6">
          <Link href="https://github.com/jksalcedo" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-7 w-7" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://linkedin.com/in/jksalcedo" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-7 w-7" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="https://twitter.com/jksalcedo" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="h-7 w-7" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
