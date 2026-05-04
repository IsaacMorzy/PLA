import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/cosmic";
import { Card } from "@/components/ui/glass-card";
import { PageShell, SitePage } from "@/components/site/page-shell";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Blog Post Not Found - PeaceLeague Africa" };
  }

  return {
    title: `${post.title} - PeaceLeague Africa`,
    description: post.metadata.excerpt || post.title,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <SitePage>
      <PageShell className="max-w-5xl">
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/62 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </div>

        <article className="mx-auto max-w-4xl">
          <header className="rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-3">
              {post.metadata.category ? (
                <span className="rounded-full border border-[#d4a853]/25 bg-[#d4a853]/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#f1ddab]">
                  {post.metadata.category}
                </span>
              ) : null}
              {post.metadata.read_time ? (
                <span className="text-[11px] uppercase tracking-[0.22em] text-white/42">{post.metadata.read_time}</span>
              ) : null}
            </div>

            <h1 className="mt-6 font-display text-[2.8rem] leading-[0.96] text-white sm:text-[3.8rem] lg:text-[4.6rem]">
              {post.title}
            </h1>

            {post.metadata.excerpt ? (
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/64 sm:text-lg">{post.metadata.excerpt}</p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
              {post.metadata.author_image ? (
                <img src={post.metadata.author_image} alt={post.metadata.author || "Author"} className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4a853]/20 bg-[#d4a853]/10 text-sm font-semibold text-[#f1ddab]">
                  {(post.metadata.author || "P").slice(0, 1).toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-medium text-white">{post.metadata.author || "PeaceLeague Africa"}</p>
                {post.metadata.published_date ? (
                  <p className="mt-1 text-sm text-white/45">
                    {new Date(post.metadata.published_date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                ) : null}
              </div>
            </div>
          </header>

          {post.metadata.featured_image ? (
            <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
              <img src={post.metadata.featured_image} alt={post.title} className="h-auto w-full object-cover" />
            </div>
          ) : null}

          <Card className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 sm:p-10 lg:p-12">
            <div
              className="max-w-none text-white/78 [&_a]:text-[#f1ddab] [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-[#d4a853]/30 [&_blockquote]:pl-5 [&_blockquote]:font-display [&_blockquote]:text-2xl [&_blockquote]:leading-relaxed [&_em]:text-white/90 [&_h1]:mt-10 [&_h1]:font-display [&_h1]:text-4xl [&_h1]:text-white [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-white [&_h3]:mt-8 [&_h3]:font-semibold [&_h3]:text-white [&_li]:leading-8 [&_ol]:my-6 [&_ol]:space-y-2 [&_p]:my-5 [&_p]:leading-8 [&_strong]:text-white [&_ul]:my-6 [&_ul]:space-y-2"
              dangerouslySetInnerHTML={{ __html: post.content || post.metadata.excerpt || "" }}
            />
          </Card>

          {post.metadata.tags ? (
            <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/38">Tags</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.metadata.tags.split(",").map((tag: string) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/70">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </article>
      </PageShell>
    </SitePage>
  );
}
