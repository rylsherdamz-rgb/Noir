# Future Features

A roadmap of features to add to Noir, drawn from what Scopuly, another Stellar wallet, offers dApp
developers through its open-source Connect Lab
([Scopuly/scopuly-connect-demo](https://github.com/Scopuly/scopuly-connect-demo)).

The comparison is based on that repository's README only. Scopuly's own site and Provider API docs
could not be read, so Scopuly's in-wallet features (swaps, trading, assets, and so on) are not
covered here.

## Where Noir is today

- Chrome extension that injects a SEP-43 provider at `window.noir.stellar` (`isNoir: true`) with
  `requestAccess`, `getAddress`, `getNetwork`, `signTransaction`, `signAuthEntry` and `signMessage`.
- Android app that links NFC cards to Soroban contracts for tap-to-pay.
- `NoirModule` for Stellar Wallets Kit, submitted in
  [Creit-Tech/Stellar-Wallets-Kit#124](https://github.com/Creit-Tech/Stellar-Wallets-Kit/pull/124)
  and awaiting review.
- End-to-end tests of the module against the real extension in headless Chrome.

## Priority 1: get into the ecosystem

### Published Stellar Wallets Kit module
Scopuly ships a `ScopulyModule` in Stellar Wallets Kit, which is also part of `defaultModules()`.
Any dApp using the kit then gets Scopuly with no extra setup.

- [ ] Get PR #124 reviewed and merged (ask in the Stellar Dev Discord, keep CI green).
- [ ] Once released, document the kit version that includes `NoirModule`.
- [ ] Add a copy-paste snippet: `StellarWalletsKit.init({ modules: [new NoirModule()], network })`,
      `setWallet("noir")`, `fetchAddress()`, `signTransaction(xdr, { address, networkPassphrase })`.

### Noir Connect Lab (integration demo)
Scopuly's most visible developer asset is an open-source React + TypeScript demo that walks through
the whole flow. Noir should have its own.

- [ ] Five-step flow: **Connect** (fetch address, check network) → **Fund** → **Prepare**
      (fetch sequence from Horizon, build a one-operation payment) → **Sign** (no submission) →
      **Submit** (explicit, shows hash, ledger result and explorer link).
- [ ] Developer inspector for each step: the integration code, request parameters, responses and
      the unsigned and signed XDR.
- [ ] Activity log, kept in memory only and cleared on reload.
- [ ] Testnet by default with a "Get test XLM" button using Friendbot. Mainnet is never selected
      automatically.
- [ ] Mainnet self-payment (for example 0.01 XLM to your own account) so only the fee is spent,
      with a checkbox acknowledging real fees, a fixed max fee and a five-minute expiry.
- [ ] Show an ambiguous submission as "unknown" rather than failed, and tell the user to check the
      hash instead of resubmitting.
- [ ] Switching network or connection method disconnects and discards prepared or signed XDR.
- [ ] Static HTTPS deploy with no backend and no analytics.
- [ ] A Noir-specific step showing a Soroban contract call and `signAuthEntry`, which Scopuly's
      demo does not cover.

### Standalone provider package and API docs
Scopuly publishes its provider as an npm package (`@scopuly/signer-extension-api`) with a hosted
Provider API docs page.

- [ ] Publish a typed npm package wrapping `window.noir.stellar` (detection, typed requests,
      error type).
- [ ] Docs page listing every method with parameters, return shapes and examples.
- [ ] A documented error-code table for the `{ error: { code, message } }` responses.
- [ ] Document provider events if any are added (account changed, network changed, disconnect).

## Priority 2: more ways to connect

### WalletConnect
Scopuly also supports WalletConnect through the kit's `WalletConnectModule`, so dApps can connect
without an extension installed.

- [ ] Support WalletConnect (Reown) in the Android app so it can sign for desktop dApps by QR code.
- [ ] Request only the selected Stellar chain, and check the CAIP-10 account and session expiry.

### Extension paired with a mobile signer
In Scopuly, the extension does not store secret keys; it pairs with a signer app on the phone or
desktop and forwards signing requests to it.

- [ ] Optional pairing mode where the Noir extension forwards signing requests to the Android app,
      so keys never live in the browser.
- [ ] Pairing instructions inside the extension.
- [ ] Clear handling when a pending signing request times out (close it in the app, no automatic
      retry).

### In-app dApp browser
Scopuly suggests opening dApps inside its in-app browser when the extension is not available, for
example on a phone.

- [ ] In-app browser in the Android app that injects the same `window.noir.stellar` provider.

### More platforms
Scopuly's signer runs on iOS, Android and macOS.

- [ ] iOS app, including NFC tap-to-pay where the platform allows it.
- [ ] Firefox and Edge builds of the extension.

## Priority 3: security and trust

- [ ] Keep signing and submitting as separate, explicit user actions everywhere.
- [ ] Document how dApps can verify a returned transaction: the body is unchanged and the Ed25519
      signature is valid for the requested account and network.
- [ ] Session management: list connected dApps, grant account access per site and revoke it.
- [ ] Testable rejection paths (permission denied, user rejected, network mismatch).
- [ ] Publish a dependency audit summary in the README and be honest about open findings.
- [ ] State clearly where keys are stored on each platform.

## Priority 4: developer experience

- [ ] README quick start for running the demo locally (Node version, `npm ci`, `npm run dev`).
- [ ] Troubleshooting table: `tx_bad_seq` or expired, `tx_bad_auth`, `tx_insufficient_fee`,
      "Wallet network mismatch", "No account found", signing timeouts, extension not detected.
- [ ] `npm run check` (lint, types, unit tests, build) and Playwright end-to-end tests with mocked
      provider and Horizon, using disposable keys.
- [ ] Privacy and third-party section listing what each integration path stores (for example,
      WalletConnect and the kit may keep state in browser storage).
- [ ] Mark example code as not an audited production payments system.

## Where Noir can go further than Scopuly

Scopuly's demo leaves these out of scope, so they are room for Noir to stand out:

- [ ] Multisig accounts and custom signer thresholds.
- [ ] Fee-bump transactions.
- [ ] Soroban-first flows: contract calls, auth entries and NFC tap-to-pay demos.
