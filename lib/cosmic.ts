import * as cosmicSdk from "@cosmicjs/sdk";
import type { BucketConfig } from "@cosmicjs/sdk";

const { createBucketClient } = cosmicSdk;

const bucketConfig: BucketConfig = {
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || "peaceleague-africa",
  readKey: process.env.COSMIC_READ_KEY || "",
  writeKey: process.env.COSMIC_WRITE_KEY || "",
};

export const cosmic = createBucketClient(bucketConfig);

export const campaignsObjectType = "campaigns";
export const storiesObjectType = "stories";
export const blogObjectType = "blog-posts";
export const updatesObjectType = "campaign-updates";
export const testimonialsObjectType = "testimonials";
export const teamMembersObjectType = "team-members";
export const galleryObjectType = "gallery";

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
    onchain_campaign_id?: number | string;
    campaign_pda?: string;
    author_wallet?: string;
    tx_signature?: string;
    cluster?: string;
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

export interface Testimonial {
  id: string;
  title: string;
  slug?: string;
  metadata: {
    quote?: string;
    role?: string;
    image?: string;
  };
}

export interface TeamMember {
  id: string;
  title: string;
  slug?: string;
  metadata: {
    role?: string;
    bio?: string;
    image?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  slug?: string;
  metadata: {
    image?: string;
    location?: string;
    category?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content?: string;
  metadata: {
    excerpt?: string;
    featured_image?: string;
    author?: string;
    author_image?: string;
    published_date?: string;
    category?: string;
    tags?: string;
    read_time?: string;
  };
}

export interface Donor {
  id: string;
  title: string;
  metadata: {
    amount?: string;
    message?: string;
    is_anonymous?: boolean;
    created_at?: string;
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

// Blog Posts
export async function getBlogPosts(limit = 100): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects.find({ 
      type: blogObjectType, 
      sort: "-created_at",
      limit 
    });
    return response.objects as unknown as BlogPost[];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await cosmic.objects.find({
      type: blogObjectType,
      query: { slug },
      limit: 1,
    });
    return (response.objects[0] as unknown as BlogPost) || null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
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

// Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects.find({ type: testimonialsObjectType });
    return response.objects as unknown as Testimonial[];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

// Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await cosmic.objects.find({ type: teamMembersObjectType });
    return response.objects as unknown as TeamMember[];
  } catch (error) {
    console.error("Error fetching team:", error);
    return [];
  }
}

// Gallery
export async function getGallery(): Promise<GalleryItem[]> {
  try {
    const response = await cosmic.objects.find({ 
      type: galleryObjectType,
      sort: "created_at" as any,
    });
    return response.objects as unknown as GalleryItem[];
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return [];
  }
}

// Donors (from donations)
export async function getRecentDonors(limit = 20): Promise<Donor[]> {
  try {
    const response = await cosmic.objects.find({ 
      type: "donations",
      sort: "-created_at",
      limit,
    });
    return response.objects as unknown as Donor[];
  } catch (error) {
    console.error("Error fetching donors:", error);
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