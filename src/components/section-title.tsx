import type { ReactNode } from 'react';

export default function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-8 md:mb-12 text-center">
      {children}
    </h2>
  );
}
