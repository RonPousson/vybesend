# VybeSend Audience — by VybeMedia

**Status: working internal campaign planning application v0.1; NOT live email fulfillment.**

VybeSend is an internal-only application for Nexus Advertising Strategies LLC DBA VybeMedia. It helps operators plan and price multi-touch acquisition campaigns, with honest accounting for unique audience records and repeat deployments.

## Run locally

Install a current Node.js release, then:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. To verify calculations and compile the app:

```bash
npm test
npm run build
```

## Included today
- Silver ($2,800 / 75,000 sends / 60,000 unique), Gold ($3,700 / 125,000 sends / 100,000 unique), and Platinum ($5,500 / 200,000 sends / 150,000 unique) starter configurations.
- Budget, total sends, unique audience, lead target and adjustable follow-up count.
- Actual reusable campaign allocation logic separating unique contacts from repeat sends.
- CPM scenario calculator with separately modeled one-time audience licensing, per-send deployment, additional costs, estimated contribution and margin.
- Copyable campaign JSON, responsive white/blue/charcoal interface and launch-readiness checklist.
- Automated calculation tests and a test/build GitHub Actions workflow.

## Internal launch roadmap

VybeSend is for VybeMedia operators only for the initial pilot. No resale, white-labeling, self-service onboarding, SaaS billing or separate client portal is required. Reassess after at least two months of validated internal operation; no automatic commercialization.

### P0 — Required before live sending
- Secure operator authentication, server-side authorization, persistent campaign storage and audit history.
- Approved supplier and ESP contracts, documented audience permissions and reuse limits, verified sender identity and provider acceptance.
- Recipient-level suppression, unsubscribe, bounce and complaint processing, frequency caps, deduplication and pre-send eligibility checks.
- Approved creative, manual operator approval, test sends, controlled scheduling, idempotent dispatch and emergency pause.
- Secure production deployment and end-to-end testing with synthetic or authorized test recipients.

### P1 — Required before selling tracked acquisition outcomes
- Landing page and form attribution, call tracking with recording consent where applicable, lead deduplication and qualification, reporting by wave.
- Actual vendor costs and agreed client terms; manual invoicing and operator-generated reports are acceptable initially.

### P2 — After pilot
- AI-assisted optimization based on measured outcomes; Ghost creative integration if useful; VybeTrax and VybeHubs integrations; Stripe if needed. Existing client reporting channels can substitute for a new portal.

## Outstanding implementation inventory
- Operator login, persistent database and client-specific authorization.
- Audience supplier contracts, consent validation, license restrictions and delivery APIs.
- Mandatory recipient-level opt-outs, complaints, bounces, suppression and frequency caps.
- Automated AI targeting/optimization, sending queues and scheduled deployments.
- Ghost email creative or newsletter integration.
- Real lead tracking, call recording, landing pages, VybeTrax, VybeHubs and Stripe.
- A secure production server and deployment URL; a separate client-visible portal is deferred.

## Business rules
1. **Total email sends are not unique audience reach**. Example: 150,000 unique contacts plus 50,000 eligible repeats equals 200,000 total sends.
2. Purchased audience records cannot be sent to without verifying legal basis, advertiser permissions, contract terms, applicable platform policy, and suppression status.
3. The default $4 audience CPM and $4 deployment CPM are **illustrative assumptions only**. They have not been validated with a vendor. Other costs should be entered before assessing contribution.
4. Qualified-lead numbers are planning targets, not delivery guarantees.
5. Never put recipient data, access tokens, API keys or client credentials in this GitHub repository.

## Architecture direction
- Current UI: Vite with plain JavaScript, modular pure calculation functions and responsive CSS.
- Ghost: optional creative/publishing layer only; not a source of permission to send campaigns to third-party lists.
- Future: server-side authentication + PostgreSQL database + approved ESP + compliance workflows + VybeTrax/VybeHubs integrations.

**Repository visibility warning:** The repository was detected as PUBLIC when development started. Change it to private before storing business-confidential information.

© 2026 Nexus Advertising Strategies LLC DBA VybeMedia. Original VybeSend code reserved.
