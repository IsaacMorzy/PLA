import {
  getCampaignBySlug as getCosmicCampaignBySlug,
  getCampaigns as getCosmicCampaigns,
  type Campaign as CosmicCampaign,
} from "./cosmic.ts";
import {
  getCampaign as getOnchainCampaign,
  getCampaignAddress,
  type CampaignAccount,
} from "./peaceleague-client.ts";
import { SOLANA_CLUSTER } from "./solana-config.ts";

export interface UnifiedCampaign {
  cosmic: CosmicCampaign;
  onchain: CampaignAccount | null;
  slug: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
  location?: string;
  beneficiaryName?: string;
  beneficiaryStory?: string;
  onchainCampaignId?: number;
  campaignPda?: string;
  authorWallet?: string;
  txSignature?: string;
  cluster?: string;
  goalLamports?: bigint;
  raisedLamports?: bigint;
  donorCount?: number;
  isDeleted?: boolean;
  createdAt?: bigint;
}

function parseOnchainCampaignId(campaign: CosmicCampaign): number | undefined {
  const raw = campaign.metadata?.onchain_campaign_id;
  if (raw === undefined || raw === null || raw === "") return undefined;

  const parsed = typeof raw === "number" ? raw : Number(raw);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : undefined;
}

export function mergeCampaignSources(
  cosmicCampaign: CosmicCampaign,
  onchainCampaign: CampaignAccount | null
): UnifiedCampaign {
  const onchainCampaignId = parseOnchainCampaignId(cosmicCampaign);

  return {
    cosmic: cosmicCampaign,
    onchain: onchainCampaign,
    slug: cosmicCampaign.slug,
    title: cosmicCampaign.title,
    description: cosmicCampaign.metadata?.description,
    image: cosmicCampaign.metadata?.image,
    category: cosmicCampaign.metadata?.category,
    location: cosmicCampaign.metadata?.location,
    beneficiaryName: cosmicCampaign.metadata?.beneficiary_name,
    beneficiaryStory: cosmicCampaign.metadata?.beneficiary_story,
    onchainCampaignId,
    campaignPda:
      cosmicCampaign.metadata?.campaign_pda ||
      (onchainCampaignId !== undefined ? getCampaignAddress(onchainCampaignId).toBase58() : undefined),
    authorWallet:
      cosmicCampaign.metadata?.author_wallet || onchainCampaign?.author.toBase58(),
    txSignature: cosmicCampaign.metadata?.tx_signature,
    cluster: cosmicCampaign.metadata?.cluster || SOLANA_CLUSTER,
    goalLamports: onchainCampaign?.goal,
    raisedLamports: onchainCampaign?.raised,
    donorCount: onchainCampaign?.donatedCount,
    isDeleted: onchainCampaign?.isDeleted,
    createdAt: onchainCampaign?.createdAt,
  };
}

export async function getMergedCampaigns(limit = 100): Promise<UnifiedCampaign[]> {
  const cosmicCampaigns = await getCosmicCampaigns(limit);

  const merged = await Promise.all(
    cosmicCampaigns.map(async (campaign) => {
      const onchainCampaignId = parseOnchainCampaignId(campaign);
      const onchainCampaign =
        onchainCampaignId !== undefined
          ? await getOnchainCampaign(onchainCampaignId)
          : null;

      return mergeCampaignSources(campaign, onchainCampaign);
    })
  );

  return merged;
}

export async function getMergedCampaignBySlug(
  slug: string
): Promise<UnifiedCampaign | null> {
  const cosmicCampaign = await getCosmicCampaignBySlug(slug);
  if (!cosmicCampaign) return null;

  const onchainCampaignId = parseOnchainCampaignId(cosmicCampaign);
  const onchainCampaign =
    onchainCampaignId !== undefined ? await getOnchainCampaign(onchainCampaignId) : null;

  return mergeCampaignSources(cosmicCampaign, onchainCampaign);
}

export async function getMergedCampaignByOnchainId(
  onchainCampaignId: number,
  limit = 100
): Promise<UnifiedCampaign | null> {
  const cosmicCampaigns = await getCosmicCampaigns(limit);
  const cosmicCampaign = cosmicCampaigns.find(
    (campaign) => parseOnchainCampaignId(campaign) === onchainCampaignId
  );

  if (!cosmicCampaign) return null;

  const onchainCampaign = await getOnchainCampaign(onchainCampaignId);
  return mergeCampaignSources(cosmicCampaign, onchainCampaign);
}
