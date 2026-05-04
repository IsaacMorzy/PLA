import { Metadata } from "next";
import { getGallery } from "@/lib/cosmic";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/glass-card";
import { PageHero, PageShell, SectionBlock, SectionIntro, SitePage } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Image Gallery - PeaceLeague Africa",
  description: "See the impact of your donations through images.",
};

export default async function ImageGalleryPage() {
  const galleryItems = await getGallery();

  const fallbackImages = [
    { id: "1", title: "Education", metadata: { image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae7734?w=800&h=600&fit=crop", location: "Nigeria" } },
    { id: "2", title: "Clean Water", metadata: { image: "https://images.unsplash.com/photo-1536939398780-594ecc193cab?w=800&h=600&fit=crop", location: "Kenya" } },
    { id: "3", title: "Healthcare", metadata: { image: "https://images.unsplash.com/photo-1576091160550-2173dba9996e?w=800&h=600&fit=crop", location: "Ghana" } },
    { id: "4", title: "Education", metadata: { image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop", location: "Uganda" } },
    { id: "5", title: "Food Security", metadata: { image: "https://images.unsplash.com/photo-1593113598332-cd2887e8a7f2?w=800&h=600&fit=crop", location: "Somalia" } },
    { id: "6", title: "Agriculture", metadata: { image: "https://images.unsplash.com/photo-1555881400-74d47acaa2d8?w=800&h=600&fit=crop", location: "Tanzania" } },
  ];

  const displayGallery =
    galleryItems.length > 0
      ? galleryItems.map((item) => ({
          id: item.id,
          title: item.title || "Gallery Item",
          metadata: {
            image: item.metadata?.image || "",
            location: item.metadata?.location || "",
          },
        }))
      : fallbackImages;

  return (
    <SitePage>
      <PageShell>
        <PageHero
          eyebrow="Gallery"
          title={
            <>
              Visual proof of community work,
              <span className="block text-[#f1ddab]">captured with more presence.</span>
            </>
          }
          description="The gallery should feel less like a loose image dump and more like a curated window into the outcomes, places, and people behind the mission."
          align="left"
        />

        <SectionBlock>
          <SectionIntro
            eyebrow="Field moments"
            title="A more editorial image grid for impact storytelling."
            description="Images now sit in a cleaner, more atmospheric frame so the page feels premium even when content is sparse."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {displayGallery.map((item, index) => (
              <Card key={item.id} className={`group overflow-hidden rounded-[2rem] border border-white/10 p-0 ${index === 0 ? "md:col-span-2" : ""}`}>
                <div className={`relative overflow-hidden ${index === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
                  <img
                    src={item.metadata.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,6,0.08),rgba(10,8,6,0.82))]" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">Impact image</p>
                    <h2 className="mt-3 font-display text-3xl text-white">{item.title}</h2>
                    <p className="mt-3 inline-flex items-center gap-2 text-sm text-[#f1ddab]">
                      <MapPin className="h-4 w-4" />
                      {item.metadata.location || "Across Africa"}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </SectionBlock>
      </PageShell>
    </SitePage>
  );
}
