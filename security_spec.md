# Security Specification for Firestore Rules

## 1. Data Invariants
- A `Report` must have a valid `orgUnitId`, `period`, and `dataSetId`.
- The `completedBy` field must match the authenticated user's email.
- `lastUpdated` and `completedAt` must be server-resident timestamps.
- Reports cannot be updated once they are in "COMPLETE" state, unless by an admin.
- `values` must be an object containing only numerical data (mostly).

## 2. The "Dirty Dozen" Payloads (Rejected Cases)
1. **Identity Spoofing**: `create` with `completedBy: "victim@example.com"` while `request.auth.token.email` is different.
2. **State Shortcutting**: `update` changing `completedAt` to a manual client date instead of `request.time`.
3. **Ghost Fields**: `create` with extra field `isUselessAdmin: true`.
4. **Invalid Type**: `create` with `values: "I am a string, not an object"`.
5. **ID Poisoning**: Creating a report with a 2KB string as ID.
6. **Immutable Field Attack**: `update` changing `orgUnitId` after creation.
7. **Size Exhaustion**: `values` object with 10,000 keys.
8. **Terminal State Break**: `update` a document where `status == 'COMPLETE'`.
9. **Unverified Write**: Writing as an unverified user (if verification is required).
10. **Global Search**: `list` query without `orgUnitId` or `dataSetId` filter.
11. **PII Leak**: Reading private user info in reports from other users.
12. **System Field Injection**: Manually setting `lastUpdated`.

## 3. Test Runner (Conceptual)
Visible in the `firestore.rules` logic.
