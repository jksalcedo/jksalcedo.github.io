import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { GithubRepo } from "@/lib/types";
import { Star, GitFork, ExternalLink } from "lucide-react";
import SectionTitle from "@/components/section-title";

export default function RepositoriesSection({ repos }: { repos: GithubRepo[] }) {
  if (!repos || repos.length === 0) {
    return null;
  }

  return (
    <section id="repositories">
      <SectionTitle>Top Repositories</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <Link href={repo.html_url} key={repo.id} target="_blank" rel="noopener noreferrer" className="block group">
            <Card className="h-full flex flex-col bg-card hover:border-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">{repo.name}</CardTitle>
                  <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
                {repo.description && <CardDescription className="flex-grow pt-2 text-muted-foreground">{repo.description}</CardDescription>}
              </CardHeader>
              <CardContent className="mt-auto flex items-center gap-4 text-sm text-muted-foreground">
                {repo.language && (
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary" />
                    <span>{repo.language}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4" />
                  <span>{repo.forks_count}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
