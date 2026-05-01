#!/bin/bash
set -e
cd "$(dirname "$0")"
export ANCHOR_WALLET="/home/morzy/.config/solana/id.json"
echo "ANCHOR_WALLET=$ANCHOR_WALLET"
anchor test