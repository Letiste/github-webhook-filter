export const events: { [key: string]: { type?: 'Action' | 'RefType'; eventTypes?: string[] } } = {
  code_scanning_alert: {
    eventTypes: ['created', 'reopened_by_user', 'closed_by_user', 'fixed', 'appeared_in_branch', 'reopened'],
  },
  create: {
    type: 'RefType',
    eventTypes: ['branch', 'tag'],
  },
  deploy_key: {
    eventTypes: ['created', 'deleted'],
  },
  issues: {
    eventTypes: [
      'opened',
      'edited',
      'deleted',
      'pinned',
      'unpinned',
      'closed',
      'reopened',
      'assigned',
      'unassigned',
      'labeled',
      'unlabeled',
      'locked',
      'unlocked',
      'transferred',
      'milestoned',
      'demilestoned',
    ],
  },
  member: {
    eventTypes: ['added', 'removed', 'edited'],
  },
  membership: {
    eventTypes: ['added', 'removed'],
  },
  milestone: {
    eventTypes: ['created', 'closed', 'opened', 'edited', 'deleted'],
  },
  organization: {
    eventTypes: ['deleted', 'renamed', 'member_added', 'member_removed', 'member_invited'],
  },
  pull_request: {
    eventTypes: [
      'assigned',
      'auto_merge_disabled',
      'auto_merge_enabled',
      'closed',
      'converted_to_draft',
      'edited',
      'labeled',
      'locked',
      'opened',
      'ready_for_review',
      'reopened',
      'review_request_removed',
      'review_requested',
      'synchronize',
      'unassigned',
      'unlabeled',
      'unlocked',
    ],
  },
  release: {
    eventTypes: ['published', 'unpublished', 'created', 'edited', 'deleted', 'prereleased', 'released'],
  },
  repository: {
    eventTypes: ['created', 'deleted', 'archived', 'unarchived', 'edited', 'renamed', 'transferred', 'publicized', 'privatized'],
  },
  repository_vulnerability_alert: {
    eventTypes: ['create', 'dismiss', 'resolve'],
  },
  secret_scanning_alert: {
    eventTypes: ['created', 'resolved', 'reopened'],
  },
  team: {
    eventTypes: ["created", "deleted", "edited", "added_to_repository", "removed_from_repository"]
  },
  team_add: {}
};
