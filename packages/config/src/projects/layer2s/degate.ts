import {
  assert,
  EthereumAddress,
  ProjectId,
  UnixTime,
} from '@l2beat/shared-pure'
import { utils } from 'ethers'

import {
  DA_BRIDGES,
  DA_LAYERS,
  DA_MODES,
  EXITS,
  FORCE_TRANSACTIONS,
  NEW_CRYPTOGRAPHY,
  OPERATOR,
  RISK_VIEW,
  STATE_CORRECTNESS,
  TECHNOLOGY_DATA_AVAILABILITY,
  addSentimentToDataAvailability,
} from '../../common'
import { ProjectDiscovery } from '../../discovery/ProjectDiscovery'
import { Badge } from '../badges'
import { getStage } from './common/stages/getStage'
import { Layer2 } from './types'

const discovery = new ProjectDiscovery('degate')

const forcedWithdrawalDelay = discovery.getContractValue<{
  [key: string]: number
}>('ExchangeV3', 'getConstants').MAX_AGE_FORCED_REQUEST_UNTIL_WITHDRAW_MODE

const maxAgeDepositUntilWithdrawable = discovery.getContractValue<number>(
  'ExchangeV3',
  'getMaxAgeDepositUntilWithdrawable',
)

const forcedWithdrawalFee = discovery.getContractValue<number>(
  'LoopringV3',
  'forcedWithdrawalFee',
)

const maxForcedWithdrawalFee = discovery.getContractValue<{
  [key: string]: number
}>('ExchangeV3', 'getConstants').MAX_FORCED_WITHDRAWAL_FEE

const maxForcedWithdrawalFeeString = `${utils.formatEther(
  maxForcedWithdrawalFee,
)} ETH`

export const degate: Layer2 = {
  isArchived: true,
  type: 'layer2',
  id: ProjectId('degate'),
  createdAt: new UnixTime(1684838286), // 2023-05-23T10:38:06Z
  badges: [
    Badge.VM.AppChain,
    Badge.DA.EthereumCalldata,
    Badge.Fork.LoopringFork,
  ],
  display: {
    name: 'DeGate Legacy',
    slug: 'degate',
    headerWarning: 'This project is in shutdown mode and no longer active.',
    description:
      'DeGate is an app-specific ZK Rollup that enables a trustless, fast and low-fee decentralized order book exchange, helping users to trade easy and sleep easy. DeGate smart contracts are forked from Loopring V3.',
    purposes: ['Exchange'],
    provider: 'Loopring',
    category: 'ZK Rollup',

    links: {
      websites: ['https://degate.com/'],
      apps: ['https://app.degate.com/'],
      documentation: ['https://docs.degate.com/'],
      explorers: [],
      repositories: ['https://github.com/degatedev/protocols'],
      socialMedia: [
        'https://twitter.com/DeGateDex',
        'https://discord.gg/degate',
        'https://youtube.com/@degatedex1718',
        'https://medium.com/degate',
        'https://mirror.xyz/0x078a601f492043C8e7D0E15B0F8815f58b4c342f',
      ],
    },
  },
  config: {
    associatedTokens: ['DG'],
    escrows: [
      discovery.getEscrowDetails({
        address: EthereumAddress('0x814d0c1903D69EB1c7ceB8F5190B20A06892d1dA'),
        sinceTimestamp: new UnixTime(1681991243),
        tokens: '*',
      }),
    ],
    trackedTxs: [
      {
        uses: [
          { type: 'liveness', subtype: 'stateUpdates' },
          { type: 'l2costs', subtype: 'stateUpdates' },
        ],
        query: {
          formula: 'functionCall',
          address: EthereumAddress(
            '0x6B937A5920726e70c5bF1d4d4E18EEeEd46FaE83',
          ),
          selector: '0x377bb770',
          functionSignature:
            'function submitBlocks(bool isDataCompressed,bytes data)',
          sinceTimestamp: new UnixTime(1681993655),
          untilTimestamp: new UnixTime(1695902496),
        },
      },
    ],
  },
  dataAvailability: addSentimentToDataAvailability({
    layers: [DA_LAYERS.ETH_CALLDATA],
    bridge: DA_BRIDGES.ENSHRINED,
    mode: DA_MODES.STATE_DIFFS,
  }),
  riskView: {
    stateValidation: RISK_VIEW.STATE_ZKP_SN,
    dataAvailability: RISK_VIEW.DATA_ON_CHAIN,
    exitWindow: RISK_VIEW.EXIT_WINDOW_NON_UPGRADABLE,
    sequencerFailure: {
      ...RISK_VIEW.SEQUENCER_FORCE_VIA_L1_LOOPRING(
        forcedWithdrawalDelay,
        forcedWithdrawalFee,
        maxAgeDepositUntilWithdrawable,
      ),
      sources: [
        {
          contract: 'ExchangeV3',
          references: [
            'https://etherscan.io/address/0xe63602a9B3DFE983187525AC985Fec4F57B24eD5#code#F23#L102',
            'https://etherscan.io/address/0xe63602a9B3DFE983187525AC985Fec4F57B24eD5#code#F35#L162',
          ],
        },
      ],
    },
    proposerFailure: {
      ...RISK_VIEW.PROPOSER_USE_ESCAPE_HATCH_MP,
      sources: [
        {
          contract: 'ExchangeV3',
          references: [
            'https://etherscan.io/address/0xe63602a9B3DFE983187525AC985Fec4F57B24eD5#code#F1#L420',
          ],
        },
      ],
    },
  },
  stage: getStage(
    {
      stage0: {
        callsItselfRollup: true,
        stateRootsPostedToL1: true,
        dataAvailabilityOnL1: true,
        rollupNodeSourceAvailable: true,
      },
      stage1: {
        stateVerificationOnL1: true,
        fraudProofSystemAtLeast5Outsiders: null,
        usersHave7DaysToExit: null,
        usersCanExitWithoutCooperation: true,
        securityCouncilProperlySetUp: null,
      },
      stage2: {
        proofSystemOverriddenOnlyInCaseOfABug: null,
        fraudProofSystemIsPermissionless: null,
        delayWith30DExitWindow: [
          true,
          'Users have at least 30d to exit as the system cannot be upgraded.',
        ],
      },
    },
    {
      rollupNodeLink: 'https://github.com/degatedev/degate-state-recover',
    },
  ),
  technology: {
    stateCorrectness: {
      ...STATE_CORRECTNESS.VALIDITY_PROOFS,
      references: [
        {
          text: 'Operator - DeGate design doc',
          href: 'https://github.com/degatedev/protocols/blob/degate_mainnet/DeGate%20Protocol%20Specification%20Document.md#operator',
        },
      ],
    },
    newCryptography: {
      ...NEW_CRYPTOGRAPHY.ZK_SNARKS,
      references: [
        {
          text: 'Operator - DeGate design doc',
          href: 'https://github.com/degatedev/protocols/blob/degate_mainnet/DeGate%20Protocol%20Specification%20Document.md#operator',
        },
      ],
    },
    dataAvailability: {
      ...TECHNOLOGY_DATA_AVAILABILITY.ON_CHAIN_CALLDATA,
      references: [
        {
          text: 'Introduction - DeGate design doc',
          href: 'https://github.com/degatedev/protocols/blob/degate_mainnet/DeGate%20Protocol%20Specification%20Document.md#design-features',
        },
      ],
    },
    operator: {
      ...OPERATOR.CENTRALIZED_OPERATOR,
      references: [
        {
          text: 'ExchangeV3.sol#L341-L348 - DeGate source code',
          href: 'https://etherscan.io/address/0xe63602a9B3DFE983187525AC985Fec4F57B24eD5#code#F1#L341',
        },
        {
          text: 'LoopringIOExchangeOwner.sol#L98-L101 - DeGate source code',
          href: 'https://etherscan.io/address/0x6B937A5920726e70c5bF1d4d4E18EEeEd46FaE83#code#F1#L98',
        },
      ],
    },
    forceTransactions: {
      ...FORCE_TRANSACTIONS.WITHDRAW_OR_HALT(),
      references: [
        {
          text: 'Forced Withdrawals - DeGate design doc',
          href: 'https://github.com/degatedev/protocols/blob/degate_mainnet/Smart%20Contract%20Design.md#force-withdrawal',
        },
      ],
    },
    exitMechanisms: [
      {
        ...EXITS.REGULAR('zk', 'no proof'),
        references: [
          {
            text: 'Withdraw - DeGate design doc',
            href: 'https://github.com/degatedev/protocols/blob/degate_mainnet/Smart%20Contract%20Design.md#normal-withdrawal',
          },
        ],
      },
      {
        ...EXITS.FORCED(),
        references: [
          {
            text: 'Forced Request Handling - DeGate design doc',
            href: 'https://github.com/degatedev/protocols/blob/degate_mainnet/Smart%20Contract%20Design.md#force-withdrawal',
          },
          {
            text: 'ExchangeV3.sol#L392 - DeGate source code, forceWithdraw function',
            href: 'https://etherscan.io/address/0xe63602a9B3DFE983187525AC985Fec4F57B24eD5#code#F1#L392',
          },
        ],
      },
      {
        ...EXITS.EMERGENCY(
          'Withdrawal Mode',
          'merkle proof',
          forcedWithdrawalDelay,
        ),
        references: [
          {
            text: 'Forced Request Handling - DeGate design doc',
            href: 'https://github.com/degatedev/protocols/blob/degate_mainnet/Smart%20Contract%20Design.md#exodus-mode',
          },

          {
            text: 'ExchangeV3.sol#L420 - DeGate source code, withdrawFromMerkleTree function',
            href: 'https://etherscan.io/address/0xe63602a9B3DFE983187525AC985Fec4F57B24eD5#code#F1#L420',
          },
        ],
      },
    ],
  },
  stateDerivation: {
    nodeSoftware:
      'Node software source code can be found [here](https://github.com/degatedev/degate-state-recover).',
    compressionScheme: 'No compression is used.',
    genesisState:
      'The system does not begin with a genesis state; instead, it initiates from a zero state, as referenced in [`CreateEmptyState`](https://github.com/degatedev/degate-state-recover/blob/main/statemanager/state.go#L28).',
    dataFormat:
      'DeGate bundles off-chain transactions into [zkBlocks](https://github.com/degatedev/protocols/blob/degate_mainnet/Circuit%20Design.md#zkblock) and submits them to the blockchain. zkBlock data definition is documented [here](https://github.com/degatedev/protocols/blob/degate_mainnet/Smart%20Contract%20Design.md#zkblock-data-definition).',
  },
  permissions: [
    {
      name: 'DefaultDepositContract Owner',
      accounts: (() => {
        const owner1 = discovery.getAddressFromValue(
          'DefaultDepositContract',
          'owner',
        )
        const owner2 = discovery.getAddressFromValue(
          'LoopringIOExchangeOwner',
          'owner',
        )
        const owner3 = discovery.getAddressFromValue('LoopringV3', 'owner')

        // making sure that the description is correct
        assert(owner1 === owner2 && owner2 === owner3 && owner3, 'DeGate')

        const permissionedAccount = discovery.formatPermissionedAccount(owner1)

        // if it was updated, we should add multisig participants
        assert(permissionedAccount.type === 'Contract', 'DeGate')

        return [permissionedAccount]
      })(),
      description: `This address is the owner of the following contracts: LoopringIOExchangeOwner, LoopringV3, DefaultDepositContract. Can add or remove block submitters. Can change the forced withdrawal fee up to ${maxForcedWithdrawalFeeString}. Can change a way that balance is calculated per contract during the deposit, allowing the support of non-standard tokens.`,
    },
    {
      name: 'BlockVerifier Owner',
      description: 'This address is the owner of the BlockVerifier contract.',
      accounts: [discovery.getPermissionedAccount('BlockVerifier', 'owner')],
    },
    {
      name: 'Block Submitters',
      accounts: discovery.getPermissionedAccounts(
        'LoopringIOExchangeOwner',
        'blockSubmitters',
      ),
      description:
        'Actors who can submit new blocks, updating the L2 state on L1.',
    },
  ],
  contracts: {
    addresses: [
      discovery.getContractDetails('ExchangeV3', 'Main ExchangeV3 contract.'),
      discovery.getContractDetails(
        'LoopringIOExchangeOwner',
        'Contract used by the Prover to submit exchange blocks with zkSNARK proofs that are later processed and verified by the BlockVerifier contract.',
      ),
      discovery.getContractDetails(
        'DefaultDepositContract',
        'ERC 20 token basic deposit contract. Handles user deposits and withdrawals.',
      ),
      discovery.getContractDetails(
        'LoopringV3',
        'Contract for setting exchange fee parameters.',
      ),
      discovery.getContractDetails(
        'BlockVerifier',
        'zkSNARK Verifier based on ethsnarks library.',
      ),
    ],
    risks: [],
  },
  milestones: [
    {
      name: 'DeGate DEX Launches Mainnet Beta',
      link: 'https://medium.com/degate/degate-dex-launches-mainnet-beta-trade-easy-sleep-easy-603574bd3a46',
      date: '2023-05-03T00:00:00Z',
      description:
        'DeGate launches mainnet beta with a deposit cap and a program to recover eventual user losses.',
      type: 'general',
    },
  ],
}
