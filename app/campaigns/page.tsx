import { getCampaigns } from "@/lib/actions";
import { CampaignGrid } from "./_components/campaign-grid";

// ISR: revalidate every 60 seconds
export const revalidate = 60;

export default async function CampaignsPage() {
  // Fetch campaigns (server-side)
  const result = await getCampaigns(20);
  
  const campaigns = result.success ? result.campaigns : [];

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground mt-2">
            Support causes that matter across Africa
          </p>
        </div>
        
        {campaigns.length > 0 ? (
          <CampaignGrid campaigns={campaigns as any[]} />
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold">No campaigns found</h3>
            <p className="text-muted-foreground mt-2">
              Check back soon for new campaigns
            </p>
          </div>
        )}
      </div>
    </main>
  );
}