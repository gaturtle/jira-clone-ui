import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import { IssueTypeIcon } from "../common/IssueTypeIcon";
import { PriorityIcon } from "../common/PriorityIcon";
import { UserAvatar } from "../common/UserAvatar";
import { StatusChip } from "../common/StatusChip";
import type { Issue } from "../../types";

interface BacklogIssueRowProps {
  issue: Issue;
  basePath: string;
}

export function BacklogIssueRow({ issue, basePath }: BacklogIssueRowProps) {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(`${basePath}/${issue.key}`)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 1.5,
        py: 1,
        cursor: "pointer",
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        "&:hover": { bgcolor: "#F7F8F9" },
      }}
    >
      <IssueTypeIcon type={issue.type} />
      <Typography variant="body2" color="text.secondary" sx={{ width: 70, flexShrink: 0 }}>
        {issue.key}
      </Typography>
      <Typography variant="body2" sx={{ flex: 1, minWidth: 0 }} noWrap>
        {issue.title}
      </Typography>
      {issue.labels.map((label) => (
        <Chip
          key={label}
          label={label}
          size="small"
          sx={{ height: 18, fontSize: 10, bgcolor: "#F1F2F4", display: { xs: "none", md: "inline-flex" } }}
        />
      ))}
      <StatusChip status={issue.status} />
      <PriorityIcon priority={issue.priority} />
      {issue.storyPoints !== null && (
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            bgcolor: "#DFE1E6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            fontWeight: 700,
            color: "text.secondary",
            flexShrink: 0,
          }}
        >
          {issue.storyPoints}
        </Box>
      )}
      <UserAvatar user={issue.assignee} size={24} />
    </Box>
  );
}
