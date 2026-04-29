"use server";

import { cosmic, campaignsObjectType } from "@/lib/cosmic";

export async function createCampaign(data: {
  title: string;
  slug: string;
  description?: string;
  image?: string;
  goal?: number;
  beneficiary_name?: string;
  beneficiary_story?: string;
  category?: string;
  location?: string;
  status?: string;
}) {
  try {
    // SDK v2: insertOne() with object_type, title, slug, metadata
    const campaign = await cosmic.objects.insertOne({
      object_type: campaignsObjectType,
      title: data.title,
      slug: data.slug,
      metadata: {
        description: data.description || "",
        image: data.image || "",
        goal: data.goal || 5,
        raised: 0,
        beneficiary_name: data.beneficiary_name || "",
        beneficiary_story: data.beneficiary_story || "",
        status: data.status || "active",
        category: data.category || "community",
        location: data.location || "",
      },
    });

    return { success: true, campaign };
  } catch (error) {
    console.error("Error creating campaign:", error);
    return { success: false, error: String(error) };
  }
}

export async function listCampaigns(limit = 100) {
  try {
    // SDK v2: find() returns thenable with toArray()
    const result = await cosmic.objects.find({ type: campaignsObjectType, limit });
    return { success: true, campaigns: result.objects };
  } catch (error) {
    console.error("Error listing campaigns:", error);
    return { success: false, error: String(error) };
  }
}

// Alias for listCampaigns - returns campaign list for /campaigns page
export async function getCampaigns(limit = 20) {
  return listCampaigns(limit);
}

export async function getCampaignBySlug(slug: string) {
  try {
    const result = await cosmic.objects.find({
      type: campaignsObjectType,
      query: { slug },
      limit: 1,
    });
    const campaign = result.objects[0] || null;
    return { success: true, campaign };
  } catch (error) {
    console.error("Error getting campaign:", error);
    return { success: false, error: String(error) };
  }
}

export async function updateCampaign(id: string, metadata: Record<string, unknown>) {
  try {
    const campaign = await cosmic.objects.updateOne(id, { metadata });
    return { success: true, campaign };
  } catch (error) {
    console.error("Error updating campaign:", error);
    return { success: false, error: String(error) };
  }
}

export async function deleteCampaign(id: string) {
  try {
    await cosmic.objects.deleteOne(id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting campaign:", error);
    return { success: false, error: String(error) };
  }
}