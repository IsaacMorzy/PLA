import { Metadata } from 'next'
import { getBlogPosts, type BlogPost } from '@/lib/cosmic'
import { Footer } from '@/components/layout/footer'
import { GlassCard } from '@/components/ui/glass-card'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - PeaceLeague Africa',
  description: 'Read the latest stories and updates from PeaceLeague Africa.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

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
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <GlassCard variant="gradient" className="text-center py-16 px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
              Our <span className="text-[#d4a853]">Blog</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Stories of impact, updates from the field, and insights from our community.
            </p>
          </GlassCard>
        </section>

        <section className="max-w-6xl mx-auto px-6">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <GlassCard 
                    variant={i % 3 === 0 ? 'gold' : i % 2 === 0 ? 'gradient' : 'default'} 
                    className="h-full group cursor-pointer hover:border-[#d4a853]/50 transition-all"
                  >
                    {post.metadata.featured_image && (
                      <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
                        <img 
                          src={post.metadata.featured_image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-3">
                      {post.metadata.category && (
                        <span className="px-3 py-1 bg-[#d4a853]/20 text-[#d4a853] text-sm rounded-full">
                          {post.metadata.category}
                        </span>
                      )}
                      {post.metadata.read_time && (
                        <span className="text-white/50 text-sm">{post.metadata.read_time}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#d4a853] transition-colors">
                      {post.title}
                    </h3>
                    {post.metadata.excerpt && (
                      <p className="text-white/60 line-clamp-3">{post.metadata.excerpt}</p>
                    )}
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                      {post.metadata.author_image && (
                        <img 
                          src={post.metadata.author_image} 
                          alt={post.metadata.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="text-white text-sm font-medium">{post.metadata.author}</p>
                        {post.metadata.published_date && (
                          <p className="text-white/50 text-xs">
                            {new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          ) : (
            <GlassCard variant="default" className="text-center py-16 px-8">
              <p className="text-white/60 text-lg mb-4">No blog posts yet.</p>
              <p className="text-white/40">Check back soon for stories and updates.</p>
            </GlassCard>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}