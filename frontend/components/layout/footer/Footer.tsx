export function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto px-4 py-10 grid gap-6 md:grid-cols-3">
        
        <div>
          <h3 className="font-semibold mb-2">UF Store</h3>
          <p className="text-sm text-muted-foreground">
            Din shop för kvalitetsprodukter.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Länkar</h3>
          <ul className="space-y-1 text-sm">
            <li>Shop</li>
            <li>Om oss</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Kontakt</h3>
          <p className="text-sm text-muted-foreground">
            info@ufstore.se
          </p>
        </div>

      </div>
    </footer>
  );
}