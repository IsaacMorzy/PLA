import { Metadata } from 'next'
import { getBlogPostBySlug } from '@/lib/cosmic'
import { GlassCard } from '@/components/ui/glass-card'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    return { title: 'Blog Post Not Found - PeaceLeague Africa' }
  }

  return {
    title: `${post.title} - PeaceLeague Africa`,
    description: post.metadata.excerpt || post.title,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

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
        <article className="max-w-3xl mx-auto px-6">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[#d4a853] hover:text-[#e8c87a] mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {post.metadata.featured_image && (
            <div className="relative h-64 md:h-96 mb-8 rounded-2xl overflow-hidden">
              <img 
                src={post.metadata.featured_image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            {post.metadata.category && (
              <span className="px-4 py-1.5 bg-[#d4a853]/20 text-[#d4a853] text-sm font-medium rounded-full">
                {post.metadata.category}
              </span>
            )}
            {post.metadata.read_time && (
              <span className="text-white/50">{post.metadata.read_time}</span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 font-display">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 pb-8 mb-8 border-b border-white/10">
            {post.metadata.author_image && (
              <img 
                src={post.metadata.author_image} 
                alt={post.metadata.author}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <p className="text-white font-medium">{post.metadata.author}</p>
              {post.metadata.published_date && (
                <p className="text-white/50 text-sm">
                  {new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              )}
            </div>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <GlassCard variant="default" className="p-0 overflow-visible">
              <div 
                className="text-white/80 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: post.content || post.metadata.excerpt || '' 
                }}
              />
            </GlassCard>
          </div>

          {post.metadata.tags && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-white/50 text-sm mb-3">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {post.metadata.tags.split(',').map((tag: string) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-white/[0.05] text-white/70 text-sm rounded-full"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  )
}