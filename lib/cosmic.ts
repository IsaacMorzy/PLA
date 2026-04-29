import { createBucketClient, BucketConfig } from "@cosmicjs/sdk";

const bucketConfig: BucketConfig = {
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || "peaceleague-africa",
  readKey: process.env.COSMIC_READ_KEY || "",
  writeKey: process.env.COSMIC_WRITE_KEY || "",
};

export const cosmic = createBucketClient(bucketConfig);

export const campaignsObjectType = "campaigns";
export const storiesObjectType = "stories";
export const updatesObjectType = "campaign-updates";

// Campaign data types
export interface Campaign {
  id: string;
  title: string;
  slug: string;
  metadata: {
    description?: string;
    image?: string;
    goal?: number;
    raised?: number;
    donors?: number;
    beneficiary_name?: string;
    beneficiary_story?: string;
    status?: string;
    category?: string;
    location?: string;
    created_at?: string;
  };
}

export interface CampaignStory {
  id: string;
  title: string;
  slug: string;
  metadata: {
    content?: string;
    beneficiary_story?: string;
    image?: string;
    author?: string;
    location?: string;
  };
}

// Fetch functions — SDK v2: find() returns thenable with toArray()
export async function getCampaigns(limit = 100): Promise<Campaign[]> {
  try {
    const response = await cosmic.objects.find({ type: campaignsObjectType, limit });
    return response.objects as unknown as Campaign[];
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
}

export async function getCampaignsByCategory(category: string): Promise<Campaign[]> {
  try {
    const response = await cosmic.objects.find({
      type: campaignsObjectType,
      query: { "metadata.category": category },
    });
    return response.objects as unknown as Campaign[];
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
}

export async function getCampaignBySlug(slug: string): Promise<Campaign | null> {
  try {
    const response = await cosmic.objects.find({
      type: campaignsObjectType,
      query: { slug },
      limit: 1,
    });
    return (response.objects[0] as unknown as Campaign) || null;
  } catch (error) {
    console.error("Error fetching campaign:", error);
    return null;
  }
}

export async function getFeaturedCampaigns(limit = 3): Promise<Campaign[]> {
  try {
    const response = await cosmic.objects.find({
      type: campaignsObjectType,
      query: { "metadata.status": "active" },
      limit,
    });
    return response.objects as unknown as Campaign[];
  } catch (error) {
    console.error("Error fetching featured campaigns:", error);
    return [];
  }
}

export async function getStories(): Promise<CampaignStory[]> {
  try {
    const response = await cosmic.objects.find({ type: storiesObjectType });
    return response.objects as unknown as CampaignStory[];
  } catch (error) {
    console.error("Error fetching stories:", error);
    return [];
  }
}

export async function getCampaignUpdates(campaignId: string) {
  try {
    const response = await cosmic.objects.find({
      type: updatesObjectType,
      query: { "metadata.campaign_id": campaignId },
    });
    return response.objects;
  } catch (error) {
    console.error("Error fetching updates:", error);
    return [];
  }
}

// Categories
export const campaignCategories = [
  { id: "healthcare", label: "Healthcare", icon: "🏥" },
  { id: "education", label: "Education", icon: "📚" },
  { id: "emergency", label: "Emergency", icon: "🚨" },
  { id: "environment", label: "Environment", icon: "🌱" },
  { id: "community", label: "Community", icon: "🏘️" },
  { id: "technology", label: "Technology", icon: "💻" },
];