import { getMergedCampaigns } from "@/lib/campaigns";
import { CampaignsClient } from "./campaigns-client";

// ISR: revalidate every 60 seconds
export const revalidate = 60;

const cmsSolToLamports = (amount?: number) => Math.floor((amount ?? 0) * 1_000_000_000);

export default async function CampaignsPage() {
  const mergedCampaigns = await getMergedCampaigns(20);

  const campaigns = mergedCampaigns.map((campaign) => ({
    id: campaign.cosmic.id,
    title: campaign.title,
    slug: campaign.slug,
    metadata: {
      description: campaign.description,
      image: campaign.image,
      goal: Number(campaign.goalLamports ?? BigInt(cmsSolToLamports(campaign.cosmic.metadata?.goal))),
      raised: Number(campaign.raisedLamports ?? BigInt(cmsSolToLamports(campaign.cosmic.metadata?.raised))),
      donors: campaign.donorCount ?? campaign.cosmic.metadata?.donors ?? 0,
      category: campaign.category,
      location: campaign.location,
      status: campaign.isDeleted ? "deleted" : campaign.cosmic.metadata?.status ?? "active",
    },
  }));

  return <CampaignsClient initialCampaigns={campaigns} />;
}