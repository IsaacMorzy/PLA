import { describe, it, expect, beforeEach } from 'vitest';
import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import {
  getCampaignAddress,
  getProgramStateAddress,
  getAllCampaignAddresses,
  PROGRAM_ID,
  MIN_CAMPAIGN_GOAL,
  MIN_DONATION,
  PLATFORM_FEE_PERCENT,
  SOL_LAMPORTS,
  PROGRAM_STATE_SEED,
  CAMPAIGN_SEED,
} from './program';

describe('PROGRAM_ID', () => {
  it('has valid program ID', () => {
    expect(PROGRAM_ID).toBeInstanceOf(PublicKey);
    expect(PROGRAM_ID.toBase58()).toBe('CcmjoYupPASLWApnqmud3QJXqw7c3cC3ZSow2LmHW675');
  });
});

describe('Constants', () => {
  it('has correct SOL_LAMPORTS', () => {
    expect(SOL_LAMPORTS).toBe(1_000_000_000);
  });

  it('has correct MIN_CAMPAIGN_GOAL (1 SOL)', () => {
    expect(MIN_CAMPAIGN_GOAL).toBe(1_000_000_000);
  });

  it('has correct MIN_DONATION (1 SOL)', () => {
    expect(MIN_DONATION).toBe(1_000_000_000);
  });

  it('has correct PLATFORM_FEE_PERCENT', () => {
    expect(PLATFORM_FEE_PERCENT).toBe(5);
  });
});

describe('Seeds', () => {
  it('has correct PROGRAM_STATE_SEED', () => {
    expect(PROGRAM_STATE_SEED).toBe('program_state');
  });

  it('has correct CAMPAIGN_SEED', () => {
    expect(CAMPAIGN_SEED).toBe('campaign');
  });
});

describe('getProgramStateAddress', () => {
  it('returns a valid PDA', () => {
    const address = getProgramStateAddress();
    expect(address).toBeInstanceOf(PublicKey);
  });

  it('uses correct seed', () => {
    const address = getProgramStateAddress();
    const [expected] = PublicKey.findProgramAddressSync(
      [Buffer.from(PROGRAM_STATE_SEED)],
      PROGRAM_ID
    );
    expect(address.toBase58()).toBe(expected.toBase58());
  });
});

describe('getCampaignAddress', () => {
  it('returns a valid PDA for number cid', () => {
    const address = getCampaignAddress(0);
    expect(address).toBeInstanceOf(PublicKey);
  });

  it('returns a valid PDA for BN cid', () => {
    const address = getCampaignAddress(new BN(5));
    expect(address).toBeInstanceOf(PublicKey);
  });

  it('generates unique addresses per cid', () => {
    const address0 = getCampaignAddress(0);
    const address1 = getCampaignAddress(1);
    expect(address0.toBase58()).not.toBe(address1.toBase58());
  });
});

describe('getAllCampaignAddresses', () => {
  it('generates correct number of addresses', () => {
    const addresses = getAllCampaignAddresses(3);
    expect(addresses).toHaveLength(3);
  });

  it('generates correct addresses', () => {
    const addresses = getAllCampaignAddresses(3);
    addresses.forEach((addr, i) => {
      expect(addr.toBase58()).toBe(getCampaignAddress(i).toBase58());
    });
  });
});