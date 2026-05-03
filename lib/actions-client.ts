"use server";

import { createCampaign } from "./actions";

export async function createCampaignAction(formData: {
  title: string;
  slug: string;
  description: string;
  image?: string;
  goal: number;
  beneficiary_name?: string;
  beneficiary_story?: string;
  category?: string;
  location?: string;
  onchain_campaign_id?: number;
  campaign_pda?: string;
  author_wallet?: string;
  tx_signature?: string;
  cluster?: string;
}) {
  return createCampaign(formData);
}