#!/usr/bin/env node
// Initialize PeaceLeague program state on devnet
const { Connection, Keypair, PublicKey, Transaction, TransactionInstruction, SystemProgram, ComputeBudgetProgram } = require("@solana/web3.js");
const fs = require("fs");

const RPC_URL = "https://api.devnet.solana.com";
const PROGRAM_ID = new PublicKey("65VieGUg5tJEQDAHEgTLXqxVaKJWdQEnzAXyrdLuRt2K");
const STATE_SEED = "state";

async function main() {
  const connection = new Connection(RPC_URL, "confirmed");
  const wallet = Keypair.fromSecretKey(
    Buffer.from(JSON.parse(fs.readFileSync("/home/morzy/.config/solana/id.json", "utf8")))
  );
  
  console.log("Wallet:", wallet.publicKey.toBase58());
  
  // Derive state PDA
  const [stateAddress] = PublicKey.findProgramAddressSync(
    [Buffer.from(STATE_SEED)],
    PROGRAM_ID
  );
  
  console.log("State PDA:", stateAddress.toBase58());
  
  // Check if already initialized
  const stateInfo = await connection.getAccountInfo(stateAddress);
  if (stateInfo) {
    console.log("Program state already initialized!");
    return;
  }
  
  // Initialize discriminator: sha256("global:initialize")[0..8]
  const discriminator = Buffer.from([175, 175, 109, 31, 13, 152, 155, 237]);
  
  const tx = new Transaction();
  tx.add(
    ComputeBudgetProgram.setComputeUnitLimit({ units: 100000 }),
    ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 10000 })
  );
  
  tx.add(
    new TransactionInstruction({
      keys: [
        { pubkey: stateAddress, isWritable: true, isSigner: false },
        { pubkey: wallet.publicKey, isWritable: true, isSigner: true },
        { pubkey: SystemProgram.programId, isWritable: false, isSigner: false },
      ],
      programId: PROGRAM_ID,
      data: discriminator,
    })
  );
  
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  tx.feePayer = wallet.publicKey;
  
  tx.sign(wallet);
  const sig = await connection.sendRawTransaction(tx.serialize());
  console.log("Transaction:", sig);
  
  await connection.confirmTransaction(sig, "confirmed");
  console.log("✅ Program state initialized successfully!");
  
  // Verify
  const state = await connection.getAccountInfo(stateAddress);
  console.log("State account exists:", !!state);
}

main().catch(console.error);
