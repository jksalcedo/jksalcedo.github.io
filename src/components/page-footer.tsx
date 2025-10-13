import Link from "next/link";

export default function PageFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col sm:flex-row h-24 sm:h-20 items-center justify-center px-4 text-center text-muted-foreground">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Jaressen Kyle Salcedo. All Rights Reserved.
        </p>
        <div className="hidden sm:block mx-2">|</div>
        <p className="text-sm">
          Made with{' '}
          <Link
            href="https://firebase.google.com/studio"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            Firebase Studio
          </Link>
        </p>
      </div>
    </footer>
  );
}
