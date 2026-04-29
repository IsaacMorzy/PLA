import { getCampaigns } from "@/lib/actions";
import { CampaignsClient } from "./campaigns-client";

// ISR: revalidate every 60 seconds
export const revalidate = 60;

export default async function CampaignsPage() {
  // Fetch campaigns (server-side)
  const result = await getCampaigns(20);
  
  const campaigns = result.success ? result.campaigns : [];

  return <CampaignsClient initialCampaigns={campaigns as any[]} />;
}