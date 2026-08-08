import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BoardIssueCard } from "./BoardIssueCard";
import { statusMeta } from "../../theme/issueMeta";
import type { Issue, Status } from "../../types";

interface BoardColumnProps {
  status: Status;
  issues: Issue[];
  basePath: string;
}

export function BoardColumn({ status, issues, basePath }: BoardColumnProps) {
  const meta = statusMeta[status];

  return (
    <Box
      sx={{
        width: 272,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        bgcolor: "#F7F8F9",
        borderRadius: 1,
        p: 1,
        maxHeight: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, px: 0.5, mb: 1 }}>
        <Typography
          variant="caption"
          sx={{ fontWeight: 700, letterSpacing: 0.4, color: meta.color }}
        >
          {meta.label}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {issues.length}
        </Typography>
      </Box>
      <Box sx={{ overflowY: "auto", px: 0.25 }}>
        {issues.map((issue) => (
          <BoardIssueCard key={issue.id} issue={issue} basePath={basePath} />
        ))}
        {issues.length === 0 && (
          <Box
            sx={{
              border: "2px dashed",
              borderColor: "divider",
              borderRadius: 1,
              py: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              No issues
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
