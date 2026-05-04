"use client";

import { CampaignCard as SharedCampaignCard } from "@/components/campaign/campaign-card";

interface Campaign {
  id: string;
  title: string;
  slug: string;
  metadata: {
    description?: string;
    image?: string;
    goal: number;
    raised: number;
    donors?: number;
    category?: string;
    location?: string;
    status?: string;
    beneficiary_name?: string;
    beneficiary_story?: string;
  };
}

interface CampaignCardProps {
  campaign: Campaign;
  index?: number;
}

const fallbackImage = "https://images.unsplash.com/photo-1488521787991-ed7bbaa77390?w=800&h=600&fit=crop";

export function CampaignCard({ campaign, index = 0 }: CampaignCardProps) {
  return <SharedCampaignCard campaign={campaign} index={index} />;
}
