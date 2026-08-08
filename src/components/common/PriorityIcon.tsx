import Tooltip from "@mui/material/Tooltip";
import { priorityMeta } from "../../theme/issueMeta";
import type { Priority } from "../../types";

interface PriorityIconProps {
  priority: Priority;
  fontSize?: number;
}

export function PriorityIcon({ priority, fontSize = 16 }: PriorityIconProps) {
  const meta = priorityMeta[priority];
  const Icon = meta.icon;
  return (
    <Tooltip title={`Priority: ${meta.label}`}>
      <Icon sx={{ fontSize, color: meta.color }} />
    </Tooltip>
  );
}
