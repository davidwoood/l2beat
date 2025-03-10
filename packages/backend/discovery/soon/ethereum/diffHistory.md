Generated with discovered.json: 0xe4820a4e3187a76254b32a45b656be86a9bfb65e

# Diff at Thu, 16 Jan 2025 13:34:05 GMT:

- author: sekuba (<29250140+sekuba@users.noreply.github.com>)
- current block number: 21637371

## Description

Initial discovery.

    SOON is a fairly standard OP Stack (with no proofs) with SVM as the execution environment
    all EVM addresses are changed to SOL addresses (byte32)
    ERC20 token transfers are not allowed, only ETH
    they are using EigenDA for DA with no bridge (no trace of Service Manager)


## Initial discovery

```diff
+   Status: CREATED
    contract L2OutputOracle (0x017A4D5A1F670F5a9dfEBD0F0cB25C2C44a82448)
    +++ description: Contains a list of proposed state roots which Proposers assert to be a result of block execution. Currently only the PROPOSER address can submit new state roots.
```

```diff
+   Status: CREATED
    contract SystemConfig (0x1E69C2522Dc139c9fC74E6ecb89373d435E70Dd8)
    +++ description: Contains configuration parameters such as the Sequencer address, gas limit on this chain and the unsafe block signer address.
```

```diff
+   Status: CREATED
    contract OptimismPortal (0x5A0702C7EbbEC83802b35DB737FCcDc5fc6c5E07)
    +++ description: The main entry point to deposit funds from host chain to this chain. It also allows to prove and finalize withdrawals. This version (originally from SOON) of the OptimismPortal is modified to support Solana addresses. It also disallows ERC20 token deposits. Has a MIN_BRIDGE_VALUE set to 0.001 ETH.
```

```diff
+   Status: CREATED
    contract L1ERC721Bridge (0x7d34832fc0cc6ed718a993CAAb4c6CAdaE9763A2)
    +++ description: None
```

```diff
+   Status: CREATED
    contract ProxyAdmin (0x90b2Da5f99C0ca658067D621E3694C2Ec49C233d)
    +++ description: None
```

```diff
+   Status: CREATED
    contract AddressManager (0xA131FB9Ac1D86651Cf863baaE9190A787Aef56dd)
    +++ description: Legacy contract used to manage a mapping of string names to addresses. Modern OP stack uses a different standard proxy system instead, but this contract is still necessary for backwards compatibility with several older contracts.
```

```diff
+   Status: CREATED
    contract L1CrossDomainMessenger (0xbB138cE37870443d5b2B02a36619D3478738E0f6)
    +++ description: Sends messages from host chain to this chain, and relays messages back onto host chain. In the event that a message sent from host chain to this chain is rejected for exceeding this chain's epoch gas limit, it can be resubmitted via this contract's replay function.
```

```diff
+   Status: CREATED
    contract SuperchainConfig (0xD02631b334FfDCD5674217e57fe524c44B341DD4)
    +++ description: This is NOT the shared SuperchainConfig contract of the OP stack Superchain but rather a local fork. It manages the `PAUSED_SLOT`, a boolean value indicating whether the local chain is paused, and `GUARDIAN_SLOT`, the address of the guardian which can pause and unpause the system.
```

```diff
+   Status: CREATED
    contract SoonMultisig (0xD686D498a67Bb96FAa4afA3b2b1Cf182f5c3A701)
    +++ description: None
```

```diff
+   Status: CREATED
    contract L1StandardBridge (0xe822c3d76ac133f7d9f12c39c1BF28a797624AA9)
    +++ description: The main entry point to deposit ETH from host chain to this chain. This version (originally from SOON) is modified to support Solana addresses. It requires specifying the destination SOL address and removes support for ERC20 tokens.
```
