export type IssueType = "epic" | "story" | "task" | "bug";

export type Priority = "highest" | "high" | "medium" | "low" | "lowest";

export type Status = "todo" | "in_progress" | "in_review" | "done";

export interface User {
  id: string;
  name: string;
  initials: string;
  color: string;
}

export interface Comment {
  id: string;
  author: User;
  body: string;
  createdAt: string;
}

export interface Issue {
  id: string;
  key: string;
  title: string;
  description: string;
  type: IssueType;
  priority: Priority;
  status: Status;
  assignee: User | null;
  reporter: User;
  storyPoints: number | null;
  labels: string[];
  sprintId: string | null;
  epicId: string | null;
  comments: Comment[];
  createdAt: string;
}

export interface Sprint {
  id: string;
  name: string;
  goal: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

export interface Project {
  id: string;
  key: string;
  name: string;
  avatarColor: string;
}
