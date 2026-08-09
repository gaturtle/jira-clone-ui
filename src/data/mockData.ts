import type { Issue, Project, Sprint, User } from "../types";

export const currentProject: Project = {
  id: "proj-1",
  key: "WF",
  name: "Wayfinder",
  avatarColor: "#0052CC",
};

export const users: User[] = [
  { id: "u1", name: "Ava Chen", initials: "AC", color: "#00875A" },
  { id: "u2", name: "Marcus Reid", initials: "MR", color: "#0052CC" },
  { id: "u3", name: "Priya Nair", initials: "PN", color: "#FF8B00" },
  { id: "u4", name: "Sam Okafor", initials: "SO", color: "#6554C0" },
  { id: "u5", name: "Lena Ivanova", initials: "LI", color: "#DE350B" },
];

const [ava, marcus, priya, sam, lena] = users;

export const sprints: Sprint[] = [
  {
    id: "sprint-1",
    name: "Sprint 24",
    goal: "Ship the issue board view and finalize backlog grooming flow",
    isActive: true,
    startDate: "2026-08-04",
    endDate: "2026-08-18",
  },
  {
    id: "sprint-2",
    name: "Sprint 25",
    goal: "Polish issue detail experience and reporting foundations",
    isActive: false,
    startDate: "2026-08-18",
    endDate: "2026-09-01",
  },
];

let issueCounter = 100;
function nextKey(): string {
  issueCounter += 1;
  return `WF-${issueCounter}`;
}

function makeIssue(partial: Omit<Issue, "id" | "key" | "comments" | "createdAt" | "reporter"> & {
  reporter?: User;
}): Issue {
  const key = nextKey();
  return {
    id: key.toLowerCase(),
    key,
    reporter: partial.reporter ?? ava,
    comments: [],
    createdAt: "2026-08-01",
    ...partial,
  };
}

const boardExperienceEpic = makeIssue({
  title: "Board & issue experience",
  description: "End-to-end kanban board and issue detail experience: columns, cards, filters, and the slide-over detail panel.",
  type: "epic",
  priority: "high",
  status: "in_progress",
  assignee: marcus,
  storyPoints: null,
  labels: ["frontend"],
  sprintId: "sprint-1",
  epicId: null,
});

const planningToolsEpic = makeIssue({
  title: "Sprint planning & backlog tooling",
  description: "Backlog grooming, sprint grouping, and performance groundwork for large backlogs.",
  type: "epic",
  priority: "medium",
  status: "todo",
  assignee: priya,
  storyPoints: null,
  labels: ["frontend"],
  sprintId: "sprint-2",
  epicId: null,
});

export const issues: Issue[] = [
  boardExperienceEpic,
  planningToolsEpic,
  makeIssue({
    title: "Design kanban board column layout",
    description:
      "Define the visual structure for the board columns (To Do, In Progress, In Review, Done) including card density and swimlane spacing.",
    type: "story",
    priority: "high",
    status: "done",
    assignee: priya,
    storyPoints: 5,
    labels: ["design"],
    sprintId: "sprint-1",
    epicId: boardExperienceEpic.id,
  }),
  makeIssue({
    title: "Implement issue card component",
    description: "Build the reusable issue card used across board and backlog views, showing type icon, key, title, and assignee avatar.",
    type: "task",
    priority: "high",
    status: "done",
    assignee: marcus,
    storyPoints: 3,
    labels: ["frontend"],
    sprintId: "sprint-1",
    epicId: boardExperienceEpic.id,
  }),
  makeIssue({
    title: "Fix avatar overflow on narrow board columns",
    description: "When a column has fewer cards, the assignee avatar wraps awkwardly onto a second line at narrow widths.",
    type: "bug",
    priority: "medium",
    status: "in_progress",
    assignee: sam,
    storyPoints: 2,
    labels: ["frontend", "bug"],
    sprintId: "sprint-1",
    epicId: boardExperienceEpic.id,
  }),
  makeIssue({
    title: "Board: filter bar with assignee avatars",
    description: "Add a horizontal filter bar above the board that lets users toggle by assignee, matching Jira's avatar filter row.",
    type: "story",
    priority: "medium",
    status: "in_progress",
    assignee: ava,
    storyPoints: 5,
    labels: ["frontend"],
    sprintId: "sprint-1",
    epicId: boardExperienceEpic.id,
  }),
  makeIssue({
    title: "Set up sidebar navigation shell",
    description: "Left sidebar with project switcher, Board/Backlog links, and collapsible sections, styled to match Jira's information density.",
    type: "task",
    priority: "highest",
    status: "in_review",
    assignee: marcus,
    storyPoints: 3,
    labels: ["frontend"],
    sprintId: "sprint-1",
    epicId: boardExperienceEpic.id,
  }),
  makeIssue({
    title: "Issue detail panel: description and activity tabs",
    description: "Slide-over panel showing full description, comments/activity feed, and a details sidebar with status, assignee, priority.",
    type: "story",
    priority: "high",
    status: "todo",
    assignee: lena,
    storyPoints: 8,
    labels: ["frontend"],
    sprintId: "sprint-1",
    epicId: boardExperienceEpic.id,
  }),
  makeIssue({
    title: "Backlog: group issues by sprint with collapsible sections",
    description: "Backlog view groups issues under active/future sprint headers and a flat backlog section, each collapsible.",
    type: "story",
    priority: "high",
    status: "todo",
    assignee: priya,
    storyPoints: 5,
    labels: ["frontend"],
    sprintId: "sprint-1",
    epicId: planningToolsEpic.id,
  }),
  makeIssue({
    title: "Investigate performance of long backlog lists",
    description: "Spike on whether virtualization is needed once backlog exceeds a few hundred issues.",
    type: "task",
    priority: "low",
    status: "todo",
    assignee: null,
    storyPoints: null,
    labels: ["spike"],
    sprintId: null,
    epicId: planningToolsEpic.id,
  }),
  makeIssue({
    title: "Reporting dashboards",
    description: "Sprint burndown and velocity charts. Out of scope for the current milestone.",
    type: "epic",
    priority: "low",
    status: "todo",
    assignee: null,
    storyPoints: null,
    labels: ["reporting"],
    sprintId: null,
    epicId: null,
  }),
  makeIssue({
    title: "Add empty states for board columns",
    description: "Each board column should show a friendly empty state illustration/message when it has zero cards.",
    type: "task",
    priority: "low",
    status: "todo",
    assignee: sam,
    storyPoints: 1,
    labels: ["frontend"],
    sprintId: null,
    epicId: boardExperienceEpic.id,
  }),
  makeIssue({
    title: "Polish issue type and priority iconography",
    description: "Swap placeholder icons for a consistent icon set across bug/story/task/epic and the five priority levels.",
    type: "task",
    priority: "medium",
    status: "todo",
    assignee: lena,
    storyPoints: 2,
    labels: ["design"],
    sprintId: null,
    epicId: boardExperienceEpic.id,
  }),
  makeIssue({
    title: "Keyboard shortcut cheatsheet modal",
    description: "A static modal listing Jira-style keyboard shortcuts, opened from the top bar help menu.",
    type: "story",
    priority: "lowest",
    status: "todo",
    assignee: null,
    storyPoints: 3,
    labels: ["frontend"],
    sprintId: null,
    epicId: planningToolsEpic.id,
  }),
];

export function getIssueByKey(key: string): Issue | undefined {
  return issues.find((issue) => issue.key === key);
}

export function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}
