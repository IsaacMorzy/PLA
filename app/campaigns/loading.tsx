export default function Loading() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="h-10 w-32 bg-muted rounded animate-pulse mx-auto" />
          <div className="h-5 w-64 bg-muted rounded animate-pulse mx-auto mt-2" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card rounded-lg overflow-hidden">
              <div className="aspect-video bg-muted animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="flex justify-between">
                  <div className="h-5 w-16 bg-muted rounded animate-pulse" />
                  <div className="h-5 w-14 bg-muted rounded animate-pulse" />
                </div>
                <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-2 w-full bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}