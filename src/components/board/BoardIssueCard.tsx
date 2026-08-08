import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import { IssueTypeIcon } from "../common/IssueTypeIcon";
import { PriorityIcon } from "../common/PriorityIcon";
import { UserAvatar } from "../common/UserAvatar";
import type { Issue } from "../../types";

interface BoardIssueCardProps {
  issue: Issue;
  basePath: string;
}

export function BoardIssueCard({ issue, basePath }: BoardIssueCardProps) {
  const navigate = useNavigate();

  return (
    <Paper
      variant="outlined"
      onClick={() => navigate(`${basePath}/${issue.key}`)}
      sx={{
        p: 1.25,
        mb: 1,
        cursor: "pointer",
        borderColor: "divider",
        "&:hover": {
          borderColor: "#B3BAC5",
          boxShadow: "0 1px 4px rgba(9,30,66,0.15)",
        },
      }}
    >
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
        {issue.title}
      </Typography>

      {issue.labels.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}>
          {issue.labels.map((label) => (
            <Chip
              key={label}
              label={label}
              size="small"
              sx={{ height: 18, fontSize: 10, bgcolor: "#F1F2F4" }}
            />
          ))}
        </Box>
      )}

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <IssueTypeIcon type={issue.type} />
          <PriorityIcon priority={issue.priority} />
          <Typography variant="caption" color="text.secondary">
            {issue.key}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          {issue.storyPoints !== null && (
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                bgcolor: "#DFE1E6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
                color: "text.secondary",
              }}
            >
              {issue.storyPoints}
            </Box>
          )}
          <UserAvatar user={issue.assignee} size={24} />
        </Box>
      </Box>
    </Paper>
  );
}
