Generated with discovered.json: 0xf9064957f9522b1fe9291d4a939acb66351ff5c3

# Diff at Fri, 17 Jan 2025 06:56:17 GMT:

- author: sekuba (<29250140+sekuba@users.noreply.github.com>)
- comparing to: main@1d87738af0941aaf4af591699a4b95396cfa786d block: 21629156
- current block number: 21642560

## Description

Initial discovery: standard orbit stack optimium with known shapes except for a slightly modified bridge that supports custom gastokens.

## Config/verification related changes

Following changes come from updates made to the config file,
or/and contracts becoming verified, not from differences found during
discovery. Values are for block 21629156 (main branch discovery), not current.

```diff
-   Status: DELETED
    contract EndpointV2 (0x1a44076050125825900e736c501f859c50fE728c)
    +++ description: None
```

```diff
-   Status: DELETED
    contract  (0x1ccBf0db9C192d969de57E25B3fF09A25bb1D862)
    +++ description: None
```

```diff
-   Status: DELETED
    contract Bitcorn (0x386E7A3a0c0919c9d53c3b04FF67E73Ff9e45Fb6)
    +++ description: None
```

```diff
-   Status: DELETED
    contract Treasury (0x5ebB3f2feaA15271101a927869B3A56837e73056)
    +++ description: None
```

```diff
-   Status: DELETED
    contract ReadLib1002 (0x74F55Bc2a79A27A0bF1D1A35dB5d0Fc36b9FDB9D)
    +++ description: None
```

```diff
-   Status: DELETED
    contract SendUln302 (0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1)
    +++ description: None
```

```diff
-   Status: DELETED
    contract ReceiveUln302 (0xc02Ab410f0734EFa3F14628780e6e695156024C2)
    +++ description: None
```

```diff
-   Status: DELETED
    contract GnosisSafe (0xCDa8e3ADD00c95E5035617F970096118Ca2F4C92)
    +++ description: None
```

```diff
    contract CornMultisig (0xCff1ad9f09b32252171207e8525c90B18D4E2C7D) {
    +++ description: None
      name:
-        "Safe"
+        "CornMultisig"
      receivedPermissions:
+        [{"permission":"configure","target":"0x828C71bc1D7A34F32FfA624240633b6B7272C3D6","description":"Pause and unpause and set important roles and parameters in the system contracts: Can delegate Sequencer management to a BatchPosterManager address, manage data availability, DACs and the fastConfirmer role, set the Sequencer-only window, introduce an allowList to the bridge and whitelist Inboxes/Outboxes.","via":[{"address":"0x8672705351C81f40B55b1ac2A1998de66166d0eA"}]},{"permission":"upgrade","target":"0x2a3C554f212E3e0c78eaF0808f5313A10542dA2d","via":[{"address":"0xEE9924C5fd94601C80fF8010f577C9f7f3C20B84"},{"address":"0x8672705351C81f40B55b1ac2A1998de66166d0eA"}]},{"permission":"upgrade","target":"0x37693F11f3D724E55D0B03D5F328D8202C913243","via":[{"address":"0xEE9924C5fd94601C80fF8010f577C9f7f3C20B84"},{"address":"0x8672705351C81f40B55b1ac2A1998de66166d0eA"}]},{"permission":"upgrade","target":"0x4ad144ea249A98F77e0b78104D3B6eB6cd3a76DA","via":[{"address":"0xEE9924C5fd94601C80fF8010f577C9f7f3C20B84"},{"address":"0x8672705351C81f40B55b1ac2A1998de66166d0eA"}]},{"permission":"upgrade","target":"0x6282197777e7c318C7209bd7059110886aa429C6","via":[{"address":"0xEE9924C5fd94601C80fF8010f577C9f7f3C20B84"},{"address":"0x8672705351C81f40B55b1ac2A1998de66166d0eA"}]},{"permission":"upgrade","target":"0x7E31f112d340a4D0cB0e4bD82f2853089d1bF10C","via":[{"address":"0xEE9924C5fd94601C80fF8010f577C9f7f3C20B84"},{"address":"0x8672705351C81f40B55b1ac2A1998de66166d0eA"}]},{"permission":"upgrade","target":"0x828C71bc1D7A34F32FfA624240633b6B7272C3D6","via":[{"address":"0x8672705351C81f40B55b1ac2A1998de66166d0eA"}]},{"permission":"upgrade","target":"0x8672705351C81f40B55b1ac2A1998de66166d0eA","via":[{"address":"0xEE9924C5fd94601C80fF8010f577C9f7f3C20B84"},{"address":"0x8672705351C81f40B55b1ac2A1998de66166d0eA"}]},{"permission":"upgrade","target":"0xBb309FFFC24F77927d7C4eb86BaA67D8f9dC0EB8","via":[{"address":"0xEE9924C5fd94601C80fF8010f577C9f7f3C20B84"},{"address":"0x8672705351C81f40B55b1ac2A1998de66166d0eA"}]}]
      directlyReceivedPermissions:
+        [{"permission":"act","target":"0x8672705351C81f40B55b1ac2A1998de66166d0eA"}]
    }
```

```diff
+   Status: CREATED
    contract OneStepProverMath (0x036147913eEb42E97790F9a693246c8444290AB6)
    +++ description: One of the modular contracts used for the last step of a fraud proof, which is simulated inside a WASM virtual machine.
```

```diff
+   Status: CREATED
    contract OneStepProverMemory (0x21c6F81b1063f09A6c26EDc74fBb9beb349A5E96)
    +++ description: One of the modular contracts used for the last step of a fraud proof, which is simulated inside a WASM virtual machine.
```

```diff
+   Status: CREATED
    contract OneStepProverHostIo (0x231173CC90cB8486A7dbD1733B5105254316D50A)
    +++ description: One of the modular contracts used for the last step of a fraud proof, which is simulated inside a WASM virtual machine.
```

```diff
+   Status: CREATED
    contract ERC20Outbox (0x2a3C554f212E3e0c78eaF0808f5313A10542dA2d)
    +++ description: Facilitates L2 to L1 contract calls: Messages initiated from L2 (for example withdrawal messages) eventually resolve in execution on L1.
```

```diff
+   Status: CREATED
    contract ERC20Inbox (0x37693F11f3D724E55D0B03D5F328D8202C913243)
    +++ description: Facilitates sending L1 to L2 messages like depositing ETH, but does not escrow funds.
```

```diff
+   Status: CREATED
    contract SequencerInbox (0x4ad144ea249A98F77e0b78104D3B6eB6cd3a76DA)
    +++ description: A sequencer (registered in this contract) can submit transaction batches or commitments here.
```

```diff
+   Status: CREATED
    contract ERC20RollupEventInbox (0x6282197777e7c318C7209bd7059110886aa429C6)
    +++ description: Helper contract sending configuration data over the bridge during the systems initialization.
```

```diff
+   Status: CREATED
    contract OneStepProver0 (0x72b55c2C38EadE57C10047746632A369A060A46E)
    +++ description: One of the modular contracts used for the last step of a fraud proof, which is simulated inside a WASM virtual machine.
```

```diff
+   Status: CREATED
    contract ERC20Bridge (0x7E31f112d340a4D0cB0e4bD82f2853089d1bF10C)
    +++ description: Escrow contract for the project's gas token (can be different from ETH). Keeps a list of allowed Inboxes and Outboxes for canonical bridge messaging.
```

```diff
+   Status: CREATED
    contract RollupProxy (0x828C71bc1D7A34F32FfA624240633b6B7272C3D6)
    +++ description: Central contract for the project's configuration like its execution logic hash (`wasmModuleRoot`) and addresses of the other system contracts. Entry point for Proposers creating new Rollup Nodes (state commitments) and Challengers submitting fraud proofs (In the Orbit stack, these two roles are both held by the Validators).
```

```diff
+   Status: CREATED
    contract ValidatorUtils (0x84eA2523b271029FFAeB58fc6E6F1435a280db44)
    +++ description: This contract implements view only utilities for validators.
```

```diff
+   Status: CREATED
    contract UpgradeExecutor (0x8672705351C81f40B55b1ac2A1998de66166d0eA)
    +++ description: Central contract defining the access control permissions for upgrading the system contract implementations.
```

```diff
+   Status: CREATED
    contract OneStepProofEntry (0x9f403f2054736884518E6D3f510C02f5959BDCC6)
    +++ description: One of the modular contracts used for the last step of a fraud proof, which is simulated inside a WASM virtual machine.
```

```diff
+   Status: CREATED
    contract ChallengeManager (0xBb309FFFC24F77927d7C4eb86BaA67D8f9dC0EB8)
    +++ description: Contract that allows challenging state roots. Can be called through the RollupProxy by Validators or the UpgradeExecutor.
```

```diff
+   Status: CREATED
    contract ProxyAdmin (0xEE9924C5fd94601C80fF8010f577C9f7f3C20B84)
    +++ description: None
```

Generated with discovered.json: 0x539edf4d8f84184928279511f53706754239dfe1

# Diff at Thu, 09 Jan 2025 10:59:48 GMT:

- author: vincfurc (<10850139+vincfurc@users.noreply.github.com>)
- current block number: 21586482

## Description

Provide description of changes. This section will be preserved.

## Initial discovery

```diff
+   Status: CREATED
    contract wBTC Escrow (0x00943b11764176C3a8323aEFCBd6fE70CFb6272d)
    +++ description: None
```

```diff
+   Status: CREATED
    contract EndpointV2 (0x1a44076050125825900e736c501f859c50fE728c)
    +++ description: None
```

```diff
+   Status: CREATED
    contract  (0x1ccBf0db9C192d969de57E25B3fF09A25bb1D862)
    +++ description: None
```

```diff
+   Status: CREATED
    contract Bitcorn (0x386E7A3a0c0919c9d53c3b04FF67E73Ff9e45Fb6)
    +++ description: None
```

```diff
+   Status: CREATED
    contract Governor (0x515C7d8Fcb950f8b030ac08C994b37b4b8F3F7B5)
    +++ description: None
```

```diff
+   Status: CREATED
    contract Treasury (0x5ebB3f2feaA15271101a927869B3A56837e73056)
    +++ description: None
```

```diff
+   Status: CREATED
    contract ReadLib1002 (0x74F55Bc2a79A27A0bF1D1A35dB5d0Fc36b9FDB9D)
    +++ description: None
```

```diff
+   Status: CREATED
    contract cbBTC Escrow (0x957C9DC25DE6B8E46a7Fa0D081bA749DD005B54f)
    +++ description: None
```

```diff
+   Status: CREATED
    contract SendUln302 (0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1)
    +++ description: None
```

```diff
+   Status: CREATED
    contract ReceiveUln302 (0xc02Ab410f0734EFa3F14628780e6e695156024C2)
    +++ description: None
```

```diff
+   Status: CREATED
    contract GnosisSafe (0xCDa8e3ADD00c95E5035617F970096118Ca2F4C92)
    +++ description: None
```

```diff
+   Status: CREATED
    contract Safe (0xCff1ad9f09b32252171207e8525c90B18D4E2C7D)
    +++ description: None
```
