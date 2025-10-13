export default function PageFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex h-20 items-center justify-center px-4">
        <p className="text-sm text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} JK Salcedo. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
