import Tooltip from "@mui/material/Tooltip";
import { issueTypeMeta } from "../../theme/issueMeta";
import type { IssueType } from "../../types";

interface IssueTypeIconProps {
  type: IssueType;
  fontSize?: number;
}

export function IssueTypeIcon({ type, fontSize = 16 }: IssueTypeIconProps) {
  const meta = issueTypeMeta[type];
  const Icon = meta.icon;
  return (
    <Tooltip title={meta.label}>
      <Icon sx={{ fontSize, color: meta.color }} />
    </Tooltip>
  );
}
