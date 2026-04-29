#!/bin/bash
# Force use of system Solana
export SBPF_OUT_DIR="$(pwd)/target/release"
export CARGO_TARGET_DIR="$(pwd)/target"

# Build debug for faster iteration
cd "$(dirname "$0")/programs/peaceleague"
cargo build-bpf --use-system-solana 2>&1 || cargo build 2>&1