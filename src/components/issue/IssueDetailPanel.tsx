import type { ReactNode } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { IssueTypeIcon } from "../common/IssueTypeIcon";
import { PriorityIcon } from "../common/PriorityIcon";
import { UserAvatar } from "../common/UserAvatar";
import { StatusChip } from "../common/StatusChip";
import { issueTypeMeta, priorityMeta } from "../../theme/issueMeta";
import type { Issue } from "../../types";

interface IssueDetailPanelProps {
  issue: Issue | null;
  basePath: string;
}

export function IssueDetailPanel({ issue, basePath }: IssueDetailPanelProps) {
  const navigate = useNavigate();

  const handleClose = () => navigate(basePath);

  return (
    <Drawer
      anchor="right"
      open={Boolean(issue)}
      onClose={handleClose}
      slotProps={{ paper: { sx: { width: { xs: "100%", sm: 640 } } } }}
    >
      {issue && (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2.5,
              py: 1.5,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
              <IssueTypeIcon type={issue.type} fontSize={18} />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                {issue.key}
              </Typography>
            </Stack>
            <IconButton size="small" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflowY: "auto", px: 2.5, py: 2.5 }}>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2.5 }}>
                  {issue.title}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                  <Button size="small" variant="outlined" startIcon={<AddIcon />}>
                    Add
                  </Button>
                  <Button size="small" variant="outlined" startIcon={<LinkIcon />}>
                    Link
                  </Button>
                </Stack>

                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Description
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                  {issue.description}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                  Activity
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Add a comment..."
                  multiline
                  minRows={2}
                  sx={{ mb: 2 }}
                />
                {issue.comments.length === 0 ? (
                  <Typography variant="caption" color="text.secondary">
                    No comments yet.
                  </Typography>
                ) : (
                  <Stack spacing={2}>
                    {issue.comments.map((comment) => (
                      <Box key={comment.id} sx={{ display: "flex", gap: 1.25 }}>
                        <UserAvatar user={comment.author} size={28} />
                        <Box>
                          <Typography variant="caption" sx={{ fontWeight: 700 }}>
                            {comment.author.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {comment.body}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                )}
              </Box>

              <Box sx={{ width: 220, flexShrink: 0 }}>
                <Box sx={{ mb: 2 }}>
                  <StatusChip status={issue.status} size="medium" />
                </Box>

                <Stack spacing={2}>
                  <DetailField label="Assignee">
                    <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                      <UserAvatar user={issue.assignee} size={24} />
                      <Typography variant="body2">
                        {issue.assignee ? issue.assignee.name : "Unassigned"}
                      </Typography>
                    </Stack>
                  </DetailField>

                  <DetailField label="Reporter">
                    <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                      <UserAvatar user={issue.reporter} size={24} />
                      <Typography variant="body2">{issue.reporter.name}</Typography>
                    </Stack>
                  </DetailField>

                  <DetailField label="Priority">
                    <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                      <PriorityIcon priority={issue.priority} />
                      <Typography variant="body2">{priorityMeta[issue.priority].label}</Typography>
                    </Stack>
                  </DetailField>

                  <DetailField label="Type">
                    <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                      <IssueTypeIcon type={issue.type} />
                      <Typography variant="body2">{issueTypeMeta[issue.type].label}</Typography>
                    </Stack>
                  </DetailField>

                  <DetailField label="Story points">
                    <Typography variant="body2">{issue.storyPoints ?? "None"}</Typography>
                  </DetailField>

                  <DetailField label="Labels">
                    {issue.labels.length > 0 ? (
                      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
                        {issue.labels.map((label) => (
                          <Chip key={label} label={label} size="small" sx={{ bgcolor: "#F1F2F4" }} />
                        ))}
                      </Stack>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        None
                      </Typography>
                    )}
                  </DetailField>

                  <DetailField label="Created">
                    <Typography variant="body2">{issue.createdAt}</Typography>
                  </DetailField>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Drawer>
  );
}

function DetailField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
        {label}
      </Typography>
      {children}
    </Box>
  );
}
