#!/bin/bash
export RUSTUP_TOOLCHAIN=sbf
export CARGO_HOME=/home/morzy/.cargo
export RUSTUP_HOME=/home/morzy/.rustup
exec /home/morzy/.local/share/solana/install/active_release/bin/cargo-build-sbf "$@"