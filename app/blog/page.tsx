import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/lib/cosmic";
import { Card } from "@/components/ui/glass-card";
import { PageHero, PageShell, SectionBlock, SectionIntro, SitePage } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Blog - PeaceLeague Africa",
  description: "Read the latest stories and updates from PeaceLeague Africa.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <SitePage>
      <PageShell>
        <PageHero
          eyebrow="Journal"
          title={
            <>
              Stories, field notes, and updates
              <span className="block text-[#f1ddab]">from the PeaceLeague Africa platform.</span>
            </>
          }
          description="The blog now feels more editorial: better pacing, stronger cards, and a clearer sense of what is worth reading first."
          align="left"
        />

        <SectionBlock>
          <SectionIntro
            eyebrow="Latest posts"
            title="A cleaner archive for impact stories and platform thinking."
            description="Every article should feel like part of the same premium system as the homepage and campaigns experience."
          />

          {posts.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-12">
              {posts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={`group block ${index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-4"}`}
                >
                  <Card className={`overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-0 ${index === 0 ? "min-h-[32rem]" : "min-h-[28rem]"}`}>
                    {post.metadata.featured_image ? (
                      <div className={`relative overflow-hidden ${index === 0 ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
                        <img
                          src={post.metadata.featured_image}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,6,0.08),rgba(10,8,6,0.78))]" />
                      </div>
                    ) : null}

                    <div className="p-6 sm:p-7">
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

                      <h2 className={`mt-5 font-display text-white transition-colors duration-300 group-hover:text-[#f1ddab] ${index === 0 ? "text-4xl leading-tight" : "text-3xl leading-snug"}`}>
                        {post.title}
                      </h2>

                      {post.metadata.excerpt ? (
                        <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/62">{post.metadata.excerpt}</p>
                      ) : null}

                      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                        <div>
                          <p className="text-sm font-medium text-white">{post.metadata.author || "PeaceLeague Africa"}</p>
                          {post.metadata.published_date ? (
                            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/38">
                              {new Date(post.metadata.published_date).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          ) : null}
                        </div>
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-white/72 transition-colors duration-300 group-hover:text-[#f1ddab]">
                          Read article
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.045] px-8 py-16 text-center">
              <p className="text-lg text-white/60">No blog posts yet.</p>
              <p className="mt-2 text-sm text-white/40">Check back soon for stories, updates, and reflections from the platform.</p>
            </Card>
          )}
        </SectionBlock>
      </PageShell>
    </SitePage>
  );
}
