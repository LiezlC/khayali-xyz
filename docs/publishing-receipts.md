# Publishing with receipts

Commit the intended changes, then run:

```powershell
npm run publish:verified -- --url https://www.khayali.xyz/music --sentinel "Khayali Tunes"
```

This publishes the current committed revision to `origin/main`. It never stages local edits. The push uses the frozen full commit ID and normal fast-forward rules. A failed push is still followed by observation because a remote effect may already exist.

Completion requires all of these conditions:

- The remote main branch equals the intended revision.
- `/api/build-info` returns that revision from the deployed build.
- The requested page returns HTTP 200 and contains the specified text.

Choose a phrase that identifies the intended page or change. Build identity and page content are separate assertions. The endpoint reports the source revision embedded during the build; it does not prove every behavior of the application.

The ledger defaults to `~/.agents/receipts/ledger.jsonl`; override it with `RECEIPTS_LEDGER`. Open records preserve the intended target before the command. Close records contain command status and independent probe results. HTTP observations include final response URL, response hash and check time. Rechecks append evidence without changing the target:

```powershell
node scripts/receipts.mjs status
node scripts/receipts.mjs check RECEIPT_ID
npm run test:receipts
```

An unreachable target is unknown. A mismatching observed state is incomplete or failed. A matching state does not establish that the wrapped command caused it; file receipts record whether the condition already held before the command. Invalid ledger events are reported rather than silently discarded. Legacy git receipts without fixed targets require a new receipt.

The wrapper executes argument arrays without a shell. For Windows `.cmd` tools, invoke their JavaScript entry point with Node instead. The publishing workflow uses the Git executable directly. Commands and git probes have bounded execution time, and deploy checks retry within a bounded window. If a deploy takes longer, recheck its receipt rather than pushing again.

The ledger uses synchronous append and flush. It is local operational evidence, without cryptographic attestation or a multi-writer transaction protocol. Keep secrets out of intent text and probe targets. Tests use disposable local repositories and HTTP servers; fault injection never changes production state.
