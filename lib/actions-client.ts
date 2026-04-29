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
}) {
  return createCampaign(formData);
}