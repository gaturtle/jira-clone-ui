import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { BacklogIssueRow } from "./BacklogIssueRow";
import type { Issue } from "../../types";

interface BacklogSectionProps {
  title: string;
  subtitle?: string;
  issueList: Issue[];
  basePath: string;
  defaultOpen?: boolean;
  actionLabel?: string;
}

export function BacklogSection({
  title,
  subtitle,
  issueList,
  basePath,
  defaultOpen = true,
  actionLabel,
}: BacklogSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const totalPoints = issueList.reduce((sum, issue) => sum + (issue.storyPoints ?? 0), 0);

  return (
    <Box sx={{ mb: 2, border: "1px solid", borderColor: "divider", borderRadius: 1, overflow: "hidden" }}>
      <Box
        onClick={() => setOpen((v) => !v)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 1.25,
          cursor: "pointer",
          bgcolor: "#F7F8F9",
        }}
      >
        <IconButton size="small" sx={{ p: 0.25 }}>
          {open ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
        </IconButton>
        <Typography variant="body2" fontWeight={700}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
        <Chip label={`${issueList.length} issues`} size="small" sx={{ bgcolor: "#DFE1E6", height: 20, fontSize: 11 }} />
        {totalPoints > 0 && (
          <Chip label={`${totalPoints} pts`} size="small" sx={{ bgcolor: "#DFE1E6", height: 20, fontSize: 11 }} />
        )}
        <Box sx={{ flexGrow: 1 }} />
        {actionLabel && (
          <Button size="small" variant="contained" onClick={(e) => e.stopPropagation()}>
            {actionLabel}
          </Button>
        )}
      </Box>
      <Collapse in={open}>
        {issueList.length > 0 ? (
          issueList.map((issue) => (
            <BacklogIssueRow key={issue.id} issue={issue} basePath={basePath} />
          ))
        ) : (
          <Box sx={{ px: 2, py: 2 }}>
            <Typography variant="caption" color="text.secondary">
              No issues in this section.
            </Typography>
          </Box>
        )}
      </Collapse>
    </Box>
  );
}
