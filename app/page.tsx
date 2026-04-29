import { getFeaturedCampaigns, getStories, type Campaign, type CampaignStory } from "@/lib/cosmic";
import HomeClient from "./home-client";

// Server Component - fetches data at build/request time
export default async function Home() {
  const [campaigns, stories] = await Promise.all([
    getFeaturedCampaigns(3),
    getStories(),
  ]);

  return <HomeClient campaigns={campaigns} stories={stories} />;
}

// Generate static params for better performance
export async function generateStaticParams() {
  return [];
}