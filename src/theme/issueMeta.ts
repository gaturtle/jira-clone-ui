import BugReportIcon from "@mui/icons-material/BugReport";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BoltIcon from "@mui/icons-material/Bolt";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import type { IssueType, Priority, Status } from "../types";

export const issueTypeMeta: Record<
  IssueType,
  { label: string; color: string; icon: typeof BugReportIcon }
> = {
  epic: { label: "Epic", color: "#8777D9", icon: BoltIcon },
  story: { label: "Story", color: "#65BA43", icon: BookmarkIcon },
  task: { label: "Task", color: "#4BADE8", icon: TaskAltIcon },
  bug: { label: "Bug", color: "#E5493A", icon: BugReportIcon },
};

export const priorityMeta: Record<
  Priority,
  { label: string; color: string; icon: typeof KeyboardArrowUpIcon }
> = {
  highest: { label: "Highest", color: "#CD1317", icon: KeyboardDoubleArrowUpIcon },
  high: { label: "High", color: "#E9494A", icon: KeyboardArrowUpIcon },
  medium: { label: "Medium", color: "#E97F33", icon: DragHandleIcon },
  low: { label: "Low", color: "#2D8738", icon: KeyboardArrowDownIcon },
  lowest: { label: "Lowest", color: "#2D8738", icon: KeyboardDoubleArrowDownIcon },
};

export const statusMeta: Record<Status, { label: string; color: string; chipBg: string }> = {
  todo: { label: "TO DO", color: "#42526E", chipBg: "#DFE1E6" },
  in_progress: { label: "IN PROGRESS", color: "#0052CC", chipBg: "#DEEBFF" },
  in_review: { label: "IN REVIEW", color: "#5243AA", chipBg: "#EAE6FF" },
  done: { label: "DONE", color: "#006644", chipBg: "#E3FCEF" },
};

export const statusOrder: Status[] = ["todo", "in_progress", "in_review", "done"];
