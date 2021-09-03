import axios from 'axios';
import { FastifyLoggerInstance } from 'fastify';
import { FilterConfigurationSchema as FilterConfigurationInterface } from '../types/configuration/filterConfiguration.schema';
import { BodyWebhookSchema as BodyWebhookInterface } from '../types/webhook/bodyWebhook.schema';
import { PullRequestSchema as PullRequestInterface } from '../types/webhook/pullRequest.schema';
import { IssueSchema as IssueInterface } from '../types/webhook/issue.schema';
import { CreateSchema as CreateInterface } from '../types/webhook/create.schema';
import { MemberSchema as MemberInterface } from '../types/webhook/member.schema';
import { DeployKeySchema as DeployKeyInterface } from '../types/webhook/deployKey.schema';
import { RepositoryVulnerabilityAlertSchema as RepositoryVulnerabilityAlertInterface } from '../types/webhook/repositoryVulnerabilityAlert.schema';
import { TeamAddSchema as TeamAddInterface } from '../types/webhook/teamAdd.schema';
import { CodeScanningAlertSchema as CodeScanningAlertInterface } from '../types/webhook/codeScanningAlert.schema';
import { MembershipSchema as MembershipInterface } from '../types/webhook/membership.schema';
import { MilestoneSchema as MilestoneInterface } from '../types/webhook/milestone.schema';
import { OrganizationSchema as OrganizationInterface } from '../types/webhook/organization.schema';
import { ReleaseSchema as ReleaseInterface } from '../types/webhook/release.schema';
import { SecretScanningAlertSchema as SecretScanningAlertInterface } from '../types/webhook/secretScanningAlert.schema';
import { TeamSchema as TeamInterface } from '../types/webhook/team.schema';
import { filterPR } from './eventHandlers/pullRequestHandler';
import { filterIssue } from './eventHandlers/issueHandler';
import { filterCreate } from './eventHandlers/createHandler';
import { IncomingHttpHeaders } from 'http';
import * as configuration from './filterConfiguration.json';
import { filterMember } from './eventHandlers/memberHandler';
import { filterDeployKey } from './eventHandlers/deployKeyHandlers';
import { filterRepository } from './eventHandlers/repositoryHandler';
import { filterRepositoryVulnerabilityAlert } from './eventHandlers/repositoryVulnerabiltyAlertHandler';
import { filterTeamAdd } from './eventHandlers/teamAddHandler';
import { filterCodeScanningAlert } from './eventHandlers/codeScanningAlertHandler';
import { filterMembership } from './eventHandlers/membershipHandler';
import { filterMilestone } from './eventHandlers/milestoneHandler';
import { filterOrganization } from './eventHandlers/organizationHandler';
import { filterRelease } from './eventHandlers/releaseHandler';
import { filterSecretScanningAlert } from './eventHandlers/secretScanningAlertHandler';
import { filterTeam } from './eventHandlers/teamHandler';

const filterConfiguration = configuration as FilterConfigurationInterface;
const webhookUrl = process.env.WEBHOOK_URL

if (!webhookUrl) {
  throw new Error('Environment Variable "WEBHOOK_URL" is not defined')
}

export function handleEvents(event: string, body: BodyWebhookInterface, headers: IncomingHttpHeaders, logger: FastifyLoggerInstance) {
  if (filterConfiguration.users_black_listed.includes(body.sender.login)) {
    return
  }
  let valid = false;
  switch (event) {
    case 'pull_request':
      valid = filterPR(body as PullRequestInterface, filterConfiguration.pull_request);
      break;
    case 'issues':
      valid = filterIssue(body as IssueInterface, filterConfiguration.issue);
      break;
    case 'create':
      valid = filterCreate(body as CreateInterface, filterConfiguration.create);
      break;
    case 'member':
      valid = filterMember(body as MemberInterface, filterConfiguration.member);
      break;
    case 'deploy_key':
      valid = filterDeployKey(body as DeployKeyInterface, filterConfiguration.deployKey);
      break;
    case 'repository':
      valid = filterRepository(body as DeployKeyInterface, filterConfiguration.repository);
      break;
    case 'repository_vulnerability_alert':
      valid = filterRepositoryVulnerabilityAlert(body as RepositoryVulnerabilityAlertInterface, filterConfiguration.repositoryVulnerabilityAlert);
      break;
    case 'team_add':
      valid = filterTeamAdd(body as TeamAddInterface, filterConfiguration.teamAdd);
      break;
    case 'code_scanning_alert':
      valid = filterCodeScanningAlert(body as CodeScanningAlertInterface, filterConfiguration.codeScanningAlert);
      break;
    case 'membership':
      valid = filterMembership(body as MembershipInterface, filterConfiguration.membership);
      break;
    case 'milestone':
      valid = filterMilestone(body as MilestoneInterface, filterConfiguration.milestone);
      break;
    case 'organization':
      valid = filterOrganization(body as OrganizationInterface, filterConfiguration.organization);
      break;
    case 'release':
      valid = filterRelease(body as ReleaseInterface, filterConfiguration.release);
      break;
    case 'secret_scanning_alert':
      valid = filterSecretScanningAlert(body as SecretScanningAlertInterface, filterConfiguration.secretScanningAlert);
      break;
    case 'team':
      valid = filterTeam(body as TeamInterface, filterConfiguration.team);
      break;
  }

  if (valid) {
    const githubHeaders = Object.keys(headers)
      .filter((key) => key.startsWith('x-github-'))
      .reduce((newHeaders, key) => {
        newHeaders[key] = headers[key] as string;
        return newHeaders;
      }, {} as Record<string, string>);
    axios.post(webhookUrl!, body, { headers: { 'Content-Type': 'application/json', ...githubHeaders } }).catch(logger.error);
  }
  else {
    logger.warn(`Event "${event}" with property "${body.action || body.ref_type}" from sender "${body.sender.login}" has been filtered`)
  }
}
