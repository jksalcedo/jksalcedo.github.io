import Image from "next/image";
import {ArrowDown, Mail} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import type {GithubUser} from "@/lib/types";

export default function HeroSection({ user }: { user: GithubUser | null }) {
  if (!user) {
    return (
        <section id="home" className="py-20 text-center">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">Loading Profile...</h1>
          <p className="text-muted-foreground mt-4">Fetching data from GitHub.</p>
        </section>
    );
  }

  return (
      <section id="home"
               className="flex justify-center flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
        {/* The avatar is great, no changes needed */}
        <div className="relative w-40 h-40 md:w-48 md:h-48 shrink-0">
          <Image
              src={user.avatar_url}
              alt={user.name || user.login}
              width={192}
              height={192}
              className="rounded-full border-4 border-primary shadow-lg"
              priority
          />
        </div>
        <div>
          <h1 className="font-headline text-4xl md:text-6xl font-bold">
            {user.name}
          </h1>
          {/* This is your new, controlled professional headline */}
          <p className="mt-2 text-xl md:text-2xl text-muted-foreground font-light">
            Computer Science Student & Aspiring Android Developer
          </p>
          <p className="mt-4 max-w-xl text-muted-foreground">
            I build efficient and user-friendly mobile applications. Currently focused on the Android ecosystem with
            Kotlin.
          </p>
          <div className="mt-6 flex gap-4 justify-center md:justify-start">
            {/* Primary CTA now links to your work on the same page */}
            <Button asChild size="lg">
              <Link href="#projects">
                <ArrowDown className="mr-2 h-5 w-5"/>
                View My Work
              </Link>
            </Button>
            {/* Secondary CTA remains for contact */}
            <Button variant="outline" size="lg" asChild>
              <Link href="#contact">
                <Mail className="mr-2 h-5 w-5"/>
                Contact Me
              </Link>
            </Button>
          </div>
        </div>
      </section>
  );
}