import { type Layer2, type Layer3 } from '@l2beat/config'
import { type ContractsVerificationStatuses } from '@l2beat/shared-pure'
import { type ProjectDetailsSection } from '~/components/projects/sections/types'
import { toRosetteTuple } from '~/components/rosette/individual/to-rosette-tuple'
import { type RosetteValue } from '~/components/rosette/types'
import { type ProjectsChangeReport } from '~/server/features/projects-change-report/get-projects-change-report'
import {
  isActivityChartDataEmpty,
  isTvlChartDataEmpty,
} from '~/server/features/utils/is-chart-data-empty'
import { api } from '~/trpc/server'
import { getContractsSection } from '~/utils/project/contracts-and-permissions/get-contracts-section'
import { getPermissionsSection } from '~/utils/project/contracts-and-permissions/get-permissions-section'
import { getDiagramParams } from '~/utils/project/get-diagram-params'
import { getScalingRiskSummarySection } from '~/utils/project/risk-summary/get-scaling-risk-summary'
import { getOperatorSection } from '~/utils/project/technology/get-operator-section'
import { getOtherConsiderationsSection } from '~/utils/project/technology/get-other-considerations-section'
import { getScalingTechnologySection } from '~/utils/project/technology/get-technology-section'
import { getWithdrawalsSection } from '~/utils/project/technology/get-withdrawals-section'
import { getTokensForProject } from '../../tvl/tokens/get-tokens-for-project'

interface Params {
  project: Layer3
  isVerified: boolean
  isHostChainVerified: boolean
  contractsVerificationStatuses: ContractsVerificationStatuses
  projectsChangeReport: ProjectsChangeReport
  rosetteValues: RosetteValue[]
  hostChain?: Layer2
  hostChainRosetteValues?: RosetteValue[]
  combinedRosetteValues?: RosetteValue[]
}

export async function getL3ProjectDetails({
  project,
  hostChain,
  isVerified,
  rosetteValues,
  isHostChainVerified,
  combinedRosetteValues,
  hostChainRosetteValues,
  projectsChangeReport,
  contractsVerificationStatuses,
}: Params) {
  const permissionsSection = project.permissions
    ? getPermissionsSection(
        {
          id: project.id,
          type: project.type,
          hostChain: project.hostChain,
          isUnderReview: !!project.isUnderReview,
          permissions: project.permissions,
          nativePermissions: project.nativePermissions,
        },
        contractsVerificationStatuses,
      )
    : undefined

  const contractsSection = getContractsSection(
    {
      id: project.id,
      type: project.type,
      hostChain: project.hostChain,
      isVerified,
      slug: project.display.slug,
      contracts: project.contracts,
      isUnderReview: project.isUnderReview,
      escrows: project.config.escrows,
      architectureImage: project.display.architectureImage,
    },
    contractsVerificationStatuses,
    projectsChangeReport,
  )

  const hostChainRisksSummary = hostChain
    ? getScalingRiskSummarySection(hostChain, isHostChainVerified)
    : hostChain
  const riskSummary = getScalingRiskSummarySection(project, isVerified)
  const technologySection = getScalingTechnologySection(project)
  const operatorSection = getOperatorSection(project)
  const withdrawalsSection = getWithdrawalsSection(project)
  const otherConsiderationsSection = getOtherConsiderationsSection(project)

  await Promise.all([
    api.tvl.chart.prefetch({
      range: '1y',
      filter: { type: 'projects', projectIds: [project.id] },
      excludeAssociatedTokens: false,
    }),
    api.activity.chart.prefetch({
      range: '1y',
      filter: { type: 'projects', projectIds: [project.id] },
    }),
  ])
  const [tvlChartData, activityChartData, tokens] = await Promise.all([
    api.tvl.chart({
      range: '1y',
      filter: { type: 'projects', projectIds: [project.id] },
      excludeAssociatedTokens: false,
    }),
    api.activity.chart({
      range: '1y',
      filter: { type: 'projects', projectIds: [project.id] },
    }),
    getTokensForProject(project),
  ])

  const sortedMilestones =
    project.milestones?.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    ) ?? []

  const items: ProjectDetailsSection[] = []

  const hostChainWarning = hostChain
    ? { hostChain: hostChain.display }
    : undefined
  const hostChainWarningWithRiskCount =
    hostChain && hostChainRisksSummary
      ? {
          hostChain: hostChain.display,
          riskCount: hostChainRisksSummary.riskGroups.flatMap((rg) => rg.items)
            .length,
        }
      : undefined

  if (!project.isUpcoming && !isTvlChartDataEmpty(tvlChartData)) {
    items.push({
      type: 'ChartSection',
      props: {
        id: 'tvl',
        stacked: true,
        title: 'Value Secured',
        projectId: project.id,
        milestones: sortedMilestones,
        tokens,
      },
    })
  }

  if (!isActivityChartDataEmpty(activityChartData)) {
    items.push({
      type: 'ChartSection',
      props: {
        id: 'activity',
        title: 'Activity',
        projectId: project.id,
        milestones: project.milestones ?? [],
        category: project.display.category,
        projectName: project.display.name,
      },
    })
  }

  if (
    !project.isUpcoming &&
    project.milestones &&
    project.milestones.length > 0
  ) {
    items.push({
      type: 'MilestonesAndIncidentsSection',
      props: {
        id: 'milestones-and-incidents',
        title: 'Milestones & Incidents',
        milestones: project.milestones,
      },
    })
  }

  if (project.display.detailedDescription) {
    items.push({
      type: 'DetailedDescriptionSection',
      props: {
        id: 'detailed-description',
        title: 'Detailed description',
        description: project.display.description,
        detailedDescription: project.display.detailedDescription,
      },
    })
  }

  if (riskSummary.riskGroups.length > 0) {
    items.push({
      type: 'RiskSummarySection',
      props: {
        ...riskSummary,
        id: 'risk-summary',
        title: 'Risk summary',
        hostChainWarning: hostChainWarningWithRiskCount,
      },
    })
  }

  if (project.isUpcoming) {
    items.push({
      type: 'UpcomingDisclaimer',
      excludeFromNavigation: true,
    })
    return items
  }

  if (hostChain && hostChainRosetteValues) {
    items.push({
      type: 'L3RiskAnalysisSection',
      props: {
        id: 'risk-analysis',
        title: 'Risk analysis',
        l2: {
          name: hostChain.display.name,
          risks: toRosetteTuple(hostChainRosetteValues),
        },
        l3: {
          name: project.display.name,
          risks: toRosetteTuple(rosetteValues),
        },
        combined: combinedRosetteValues
          ? toRosetteTuple(combinedRosetteValues)
          : undefined,
        warning: project.display.warning,
        redWarning: project.display.redWarning,
        isVerified,
        isUnderReview: project.isUnderReview,
      },
    })
  } else {
    items.push({
      type: 'RiskAnalysisSection',
      props: {
        id: 'risk-analysis',
        title: 'Risk analysis',
        rosetteType: 'pizza',
        rosetteValues,
        warning: project.display.warning,
        redWarning: project.display.redWarning,
        isVerified,
        isUnderReview: project.isUnderReview,
      },
    })
  }

  if (project.stage && project.stage.stage !== 'NotApplicable') {
    items.push({
      type: 'StageSection',
      props: {
        id: 'stage',
        title: 'Rollup stage',
        stageConfig: project.stage,
        name: project.display.name,
        icon: `/icons/${project.display.slug}.png`,
        type: project.display.category,
        isUnderReview: project.isUnderReview,
      },
    })
  }

  if (technologySection) {
    items.push({
      type: 'TechnologySection',
      props: {
        id: 'technology',
        title: 'Technology',
        ...technologySection,
        hostChainWarning,
      },
    })
  }

  if (project.stateDerivation) {
    items.push({
      type: 'StateDerivationSection',
      props: {
        id: 'state-derivation',
        title: 'State derivation',
        isUnderReview: project.isUnderReview,
        ...project.stateDerivation,
      },
    })
  }

  if (project.stateValidation) {
    items.push({
      type: 'StateValidationSection',
      props: {
        id: 'state-validation',
        title: 'State validation',
        stateValidation: project.stateValidation,
        diagram: getDiagramParams('state-validation', project.display.slug),
        isUnderReview: project.isUnderReview,
      },
    })
  }

  if (operatorSection) {
    items.push({
      type: 'TechnologySection',
      props: {
        id: 'operator',
        title: 'Operator',
        ...operatorSection,
        hostChainWarning,
      },
    })
  }

  if (withdrawalsSection) {
    items.push({
      type: 'TechnologySection',
      props: {
        id: 'withdrawals',
        title: 'Withdrawals',
        ...withdrawalsSection,
        hostChainWarning,
      },
    })
  }

  if (otherConsiderationsSection) {
    items.push({
      type: 'TechnologySection',
      props: {
        id: 'other-considerations',
        title: 'Other considerations',
        ...otherConsiderationsSection,
      },
    })
  }

  if (permissionsSection) {
    items.push({
      type: 'PermissionsSection',
      props: {
        ...permissionsSection,
        id: 'permissions',
        title: 'Permissions',
      },
    })
  }

  if (contractsSection) {
    items.push({
      type: 'ContractsSection',
      props: {
        ...contractsSection,
        id: 'contracts',
        title: 'Smart contracts',
      },
    })
  }

  if (project.knowledgeNuggets && project.knowledgeNuggets.length > 0) {
    items.push({
      type: 'KnowledgeNuggetsSection',
      props: {
        knowledgeNuggets: project.knowledgeNuggets,
        id: 'knowledge-nuggets',
        title: 'Knowledge nuggets',
      },
    })
  }

  return items
}
