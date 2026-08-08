import Chip from "@mui/material/Chip";
import { statusMeta } from "../../theme/issueMeta";
import type { Status } from "../../types";

interface StatusChipProps {
  status: Status;
  size?: "small" | "medium";
}

export function StatusChip({ status, size = "small" }: StatusChipProps) {
  const meta = statusMeta[status];
  return (
    <Chip
      label={meta.label}
      size={size}
      sx={{
        bgcolor: meta.chipBg,
        color: meta.color,
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: 0.3,
      }}
    />
  );
}
