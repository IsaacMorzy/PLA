import { Metadata } from 'next'
import { getGallery } from '@/lib/cosmic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/glass-card'

export const metadata: Metadata = {
  title: 'Image Gallery - PeaceLeague Africa',
  description: 'See the impact of your donations through images.',
}

export default async function ImageGalleryPage() {
  const galleryItems = await getGallery()
  
  // Fallback data if no CMS content
  const fallbackImages = [
    { id: '1', title: 'Education', metadata: { image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae7734?w=800&h=600&fit=crop', location: 'Nigeria' }},
    { id: '2', title: 'Clean Water', metadata: { image: 'https://images.unsplash.com/photo-1536939398780-594ecc193cab?w=800&h=600&fit=crop', location: 'Kenya' }},
    { id: '3', title: 'Healthcare', metadata: { image: 'https://images.unsplash.com/photo-1576091160550-2173dba9996e?w=800&h=600&fit=crop', location: 'Ghana' }},
    { id: '4', title: 'Education', metadata: { image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop', location: 'Uganda' }},
    { id: '5', title: 'Food Security', metadata: { image: 'https://images.unsplash.com/photo-1593113598332-cd2887e8a7f2?w=800&h=600&fit=crop', location: 'Somalia' }},
    { id: '6', title: 'Agriculture', metadata: { image: 'https://images.unsplash.com/photo-1555881400-74d47acaa2d8?w=800&h=600&fit=crop', location: 'Tanzania' }},
  ]

  const displayGallery = galleryItems.length > 0 ? galleryItems.map(item => ({
    id: item.id,
    title: item.title || 'Gallery Item',
    metadata: {
      image: item.metadata?.image || '',
      location: item.metadata?.location || ''
    }
  })) : fallbackImages

  return (
    <div className="min-h-screen bg-[#1a1815] relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-20" 
          style={{ background: 'radial-gradient(circle, #d4a853 0%, transparent 70%)' }} 
        />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-15" 
          style={{ background: 'radial-gradient(circle, #c46d46 0%, transparent 70%)' }} 
        />
      </div>

      <main className="relative z-10 pt-24 pb-16">
        <section className="max-w-6xl mx-auto px-6 mb-12">
          <Card variant="gradient" className="text-center">
            <CardContent className="py-12">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">Image Gallery</h1>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                See the real impact of your donations.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayGallery.map((item) => (
              <Card key={item.id} variant="default" className="overflow-hidden group hover:border-[#d4a853]/30 transition-colors">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.metadata.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-white/70">{item.metadata.location}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}