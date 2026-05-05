import Link from "next/link";
import { getMergedCampaignBySlug } from "@/lib/campaigns";
import CampaignClient from "./campaign-client";
import { PageShell, SitePage } from "@/components/site/page-shell";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CampaignPage({ params }: Props) {
  const { slug } = await params;
  const campaign = await getMergedCampaignBySlug(slug);

  if (!campaign) {
    return (
      <SitePage>
        <PageShell className="max-w-3xl">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] px-8 py-14 text-center">
            <h1 className="font-display text-4xl text-white">Campaign not found</h1>
            <p className="mt-4 text-sm leading-7 text-white/60">
              The campaign may have been removed, renamed, or is no longer available.
            </p>
            <Link
              href="/campaigns"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#d4a853] px-6 py-3 text-sm font-semibold text-[#17120d] transition duration-300 hover:bg-[#e5bc68]"
            >
              Browse all campaigns
            </Link>
          </div>
        </PageShell>
      </SitePage>
    );
  }

  return <CampaignClient campaign={campaign} />;
}
