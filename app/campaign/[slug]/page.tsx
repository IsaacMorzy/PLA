import { getCampaignBySlug, type Campaign } from "@/lib/cosmic";
import CampaignClient from "./campaign-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CampaignPage({ params }: Props) {
  const { slug } = await params;
  const campaign = await getCampaignBySlug(slug);

  if (!campaign) {
    return (
      <main className="min-h-screen pt-24 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-white">Campaign not found</h1>
          <a href="/campaigns" className="btn btn-primary mt-4">
            Browse Campaigns
          </a>
        </div>
      </main>
    );
  }

  return <CampaignClient campaign={campaign} />;
}