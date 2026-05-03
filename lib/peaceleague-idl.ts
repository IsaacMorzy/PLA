import type { Idl } from "@coral-xyz/anchor";

export const peaceleagueIdl: Idl = {
  address: "65VieGUg5tJEQDAHEgTLXqxVaKJWdQEnzAXyrdLuRt2K",
  metadata: {
    name: "peaceleague",
    version: "0.1.0",
    spec: "0.1.0",
    description: "PeaceLeague Africa crowdfunding program",
  },
  instructions: [
    {
      name: "initialize",
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      accounts: [
        { name: "state", writable: true },
        { name: "authority", writable: true, signer: true },
        { name: "systemProgram" },
      ],
      args: [],
    },
    {
      name: "createCampaign",
      discriminator: [111, 131, 187, 98, 160, 193, 114, 244],
      accounts: [
        { name: "campaign", writable: true },
        { name: "state", writable: true },
        { name: "creator", writable: true, signer: true },
        { name: "systemProgram" },
      ],
      args: [
        { name: "campaignId", type: "u64" },
        { name: "title", type: "string" },
        { name: "description", type: "string" },
        { name: "imageUrl", type: "string" },
        { name: "goal", type: "u64" },
      ],
    },
    {
      name: "donate",
      discriminator: [121, 186, 218, 211, 73, 70, 196, 180],
      accounts: [
        { name: "donor", writable: true, signer: true },
        { name: "campaign", writable: true },
        { name: "systemProgram" },
      ],
      args: [
        { name: "campaignId", type: "u64" },
        { name: "amount", type: "u64" },
      ],
    },
    {
      name: "withdraw",
      discriminator: [183, 18, 70, 156, 148, 109, 161, 34],
      accounts: [
        { name: "authority", writable: true, signer: true },
        { name: "campaign", writable: true },
        { name: "systemProgram" },
      ],
      args: [{ name: "campaignId", type: "u64" }],
    },
    {
      name: "deleteCampaign",
      discriminator: [223, 105, 48, 131, 88, 27, 249, 227],
      accounts: [
        { name: "authority", writable: true, signer: true },
        { name: "campaign", writable: true },
      ],
      args: [{ name: "campaignId", type: "u64" }],
    },
  ],
  accounts: [
    {
      name: "programState",
      discriminator: [77, 209, 137, 229, 149, 67, 167, 230],
    },
    {
      name: "campaign",
      discriminator: [50, 40, 49, 11, 157, 220, 229, 192],
    },
  ],
  errors: [
    { code: 6000, name: "invalidGoal", msg: "Goal must be at least 1 SOL" },
    { code: 6001, name: "emptyTitle", msg: "Title cannot be empty" },
    { code: 6002, name: "emptyDescription", msg: "Description cannot be empty" },
    { code: 6003, name: "campaignDeleted", msg: "Campaign has been deleted" },
    { code: 6004, name: "insufficientFunds", msg: "Insufficient funds for withdrawal" },
    { code: 6005, name: "unauthorized", msg: "Unauthorized - not campaign author" },
  ],
  types: [
    {
      name: "programState",
      type: {
        kind: "struct",
        fields: [
          { name: "campaignCount", type: "u64" },
          { name: "authority", type: "pubkey" },
          { name: "bump", type: "u8" },
        ],
      },
    },
    {
      name: "campaign",
      type: {
        kind: "struct",
        fields: [
          { name: "author", type: "pubkey" },
          { name: "title", type: "string" },
          { name: "description", type: "string" },
          { name: "imageUrl", type: "string" },
          { name: "goal", type: "u64" },
          { name: "raised", type: "u64" },
          { name: "donatedCount", type: "u32" },
          { name: "createdAt", type: "i64" },
          { name: "isDeleted", type: "bool" },
          { name: "bump", type: "u8" },
          { name: "campaignId", type: "u64" },
        ],
      },
    },
  ],
};
