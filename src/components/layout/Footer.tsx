export function Footer() {
    return (
        <footer className="border-t mt-auto py-6 px-6 text-sm text-muted-foreground">
            <div className="container mx-auto flex flex-col items-center justify-between gap-2 sm:flex-row">
                <p>© {new Date().getFullYear()} MyLogo. All rights reserved.</p>
                <div className="flex gap-4">
                    <a href="/about" className="hover:text-foreground transition-colors">About</a>
                    <a href="/contact" className="hover:text-foreground transition-colors">Contact</a>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    )
}
