import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Compass, Home} from 'lucide-react';

export default function NotFound() {
    return (
        <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center py-12">
            <Compass className="w-24 h-24 text-primary animate-pulse"/>

            <h1 className="mt-8 font-headline text-5xl md:text-7xl font-bold">
                404 - Lost in Cyberspace
            </h1>

            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                The page you're looking for doesn't exist... yet. If you were looking for my blog, it's still under
                construction while I brew up some new ideas here in Nabua. 🌴
            </p>

            <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/">
                        <Home className="mr-2 h-5 w-5"/>
                        Return to Homepage
                    </Link>
                </Button>
            </div>
        </div>
    );
}