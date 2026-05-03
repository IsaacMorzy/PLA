import { notFound, redirect } from "next/navigation";
import { getMergedCampaignByOnchainId } from "@/lib/campaigns";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LegacyCampaignIdPage({ params }: PageProps) {
  const { id } = await params;
  const campaignId = Number.parseInt(id, 10);

  if (Number.isNaN(campaignId) || campaignId < 0) {
    notFound();
  }

  const campaign = await getMergedCampaignByOnchainId(campaignId);

  if (!campaign) {
    notFound();
  }

  redirect(`/campaign/${campaign.slug}`);
}
