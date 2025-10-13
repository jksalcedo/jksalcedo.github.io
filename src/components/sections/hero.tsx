import Image from "next/image";
import { Github, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { GithubUser } from "@/lib/types";
import { Badge } from "../ui/badge";

export default function HeroSection({ user }: { user: GithubUser | null }) {
  if (!user) {
    return (
      <section id="home" className="py-20 text-center">
        <h1 className="font-headline text-4xl md:text-6xl font-bold">Failed to load GitHub profile.</h1>
        <p className="text-muted-foreground mt-4">Please check your internet connection or the GitHub API status.</p>
      </section>
    );
  }

  return (
    <section id="home" className="flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
      <div className="relative w-40 h-40 md:w-48 md:h-48 shrink-0">
        <Image
          src={user.avatar_url}
          alt={user.name || user.login}
          width={192}
          height={192}
          className="rounded-full border-4 border-primary shadow-lg"
          priority
        />
        <div className="absolute bottom-2 right-2 bg-background p-2 rounded-full shadow-md">
            <Github className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div>
        <h1 className="font-headline text-4xl md:text-6xl font-bold">
          {user.name}
        </h1>
        <p className="mt-2 text-lg text-primary">@{user.login}</p>
        {user.bio && <p className="mt-4 max-w-xl text-muted-foreground">{user.bio}</p>}
        <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4 text-muted-foreground">
          {user.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          )}
          <Badge variant="secondary">{user.followers} followers</Badge>
          <Badge variant="secondary">{user.following} following</Badge>
        </div>
        <div className="mt-6 flex gap-4 justify-center md:justify-start">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href={user.html_url} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="#contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
