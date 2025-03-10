import { UnixTime } from '@l2beat/shared-pure'

import { REASON_FOR_BEING_OTHER } from '../../common/ReasonForBeingInOther'
import { ProjectDiscovery } from '../../discovery/ProjectDiscovery'
import { Badge } from '../badges'
import { CELESTIA_DA_PROVIDER, opStackL2 } from './templates/opStack'
import { Layer2 } from './types'

const discovery = new ProjectDiscovery('hypr')

export const hypr: Layer2 = opStackL2({
  isArchived: true,
  createdAt: new UnixTime(1695904849), // 2023-09-28T12:40:49Z
  daProvider: CELESTIA_DA_PROVIDER,
  additionalBadges: [Badge.DA.Celestia],
  discovery,
  display: {
    reasonsForBeingOther: [
      REASON_FOR_BEING_OTHER.NO_PROOFS,
      REASON_FOR_BEING_OTHER.NO_DA_ORACLE,
    ],
    name: 'Hypr',
    slug: 'hypr',
    description: 'Hypr is a blockchain focused on scaling ZK gaming.',
    links: {
      websites: ['https://hypr.network/'],
      apps: ['https://bridge.hypr.network/'],
      documentation: ['https://docs.hypr.network'],
      explorers: ['https://explorer.hypr.network/'],
      repositories: [],
      socialMedia: [
        'https://twitter.com/hypr_network',
        'https://t.me/hyprnetwork',
      ],
    },
    activityDataSource: 'Blockchain RPC',
  },
  genesisTimestamp: new UnixTime(1705509623),
  isNodeAvailable: 'UnderReview',
  milestones: [
    {
      name: 'Hypr live on mainnet',
      link: 'https://x.com/hypr_network/status/1750251802451378528',
      date: '2024-01-24T00:00:00Z',
      description: 'Hypr launches on mainnet.',
      type: 'general',
    },
  ],
  discoveryDrivenData: true,
  // rpcUrl: 'https://rpc.hypr.network',
  // associatedTokens: ['HYPR'], removed due to insufficient price data
})
