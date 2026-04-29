import { NextRequest, NextResponse } from "next/server";
import { createCampaign, listCampaigns, getCampaignBySlug, updateCampaign, deleteCampaign } from "@/lib/actions";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get("action");
  const slug = searchParams.get("slug");
  const id = searchParams.get("id");
  const limit = parseInt(searchParams.get("limit") || "100");

  if (action === "list") {
    const result = await listCampaigns(limit);
    return NextResponse.json(result);
  }

  if (action === "get" && slug) {
    const result = await getCampaignBySlug(slug);
    return NextResponse.json(result);
  }

  if (action === "ping") {
    return NextResponse.json({
      status: "ok",
      bucket: process.env.COSMIC_BUCKET_SLUG,
      timestamp: new Date().toISOString(),
    });
  }

  return NextResponse.json({ error: "Invalid action. Use ?action=list, ?action=get&slug=X" }, { status: 400 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, description, goal, category, beneficiary_name, beneficiary_story, location } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const result = await createCampaign({
      title, slug, description, goal, category, beneficiary_name, beneficiary_story, location,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, metadata } = body;

    if (!id || !metadata) {
      return NextResponse.json({ error: "id and metadata are required" }, { status: 400 });
    }

    const result = await updateCampaign(id, metadata);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  try {
    const result = await deleteCampaign(id);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}