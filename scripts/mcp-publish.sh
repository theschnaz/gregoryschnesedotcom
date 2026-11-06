#!/usr/bin/env bash
# Publish (or update) this site's MCP server in the official MCP Registry
# (https://registry.modelcontextprotocol.io) as com.gregoryschnese/profile.
#
#   MCP_REGISTRY_PRIVATE_KEY=<hex ed25519 private key> npm run mcp:publish
#
# Ownership of gregoryschnese.com is proven over HTTP: the registry fetches
# https://gregoryschnese.com/.well-known/mcp-registry-auth (the public key,
# committed in public/.well-known/) and checks it against the signature made
# with your private key. The private key never leaves your machine; it is the
# same key used for trybitstack.com.
#
# To publish a new version: bump "version" in server.json (the live MCP server
# and /.well-known/mcp.json read it from there), deploy, then run this again.
set -euo pipefail
cd "$(dirname "$0")/.."

DOMAIN=gregoryschnese.com

if ! command -v mcp-publisher >/dev/null 2>&1; then
  echo "mcp-publisher not found. Install it with one of:"
  echo "  brew install mcp-publisher"
  echo "  go install github.com/modelcontextprotocol/registry/cmd/publisher@latest && mv \"\$(go env GOPATH)/bin/publisher\" /usr/local/bin/mcp-publisher"
  exit 1
fi
if [ -z "${MCP_REGISTRY_PRIVATE_KEY:-}" ]; then
  echo "Set MCP_REGISTRY_PRIVATE_KEY to your hex-encoded Ed25519 private key (the one used for trybitstack.com)."
  exit 1
fi

# The deployed auth file must match the committed one, or the registry will reject the login.
live=$(curl -fsS "https://$DOMAIN/.well-known/mcp-registry-auth" || true)
local=$(cat public/.well-known/mcp-registry-auth)
if [ "$live" != "$local" ]; then
  echo "https://$DOMAIN/.well-known/mcp-registry-auth doesn't match public/.well-known/mcp-registry-auth. Deploy first."
  exit 1
fi

mcp-publisher validate
mcp-publisher login http --domain "$DOMAIN" --private-key "$MCP_REGISTRY_PRIVATE_KEY"
mcp-publisher publish
echo "Published. Check: https://registry.modelcontextprotocol.io/v0/servers?search=$DOMAIN"
