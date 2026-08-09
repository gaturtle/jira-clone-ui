import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterListOutlined";
import { BoardColumn } from "../components/board/BoardColumn";
import { IssueDetailPanel } from "../components/issue/IssueDetailPanel";
import { UserAvatar } from "../components/common/UserAvatar";
import { issues, sprints, users, getIssueByKey, currentProject } from "../data/mockData";
import { statusOrder } from "../theme/issueMeta";

export function BoardPage() {
  const { issueKey } = useParams();
  const activeSprint = sprints.find((sprint) => sprint.isActive);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  const boardIssues = useMemo(
    () => issues.filter((issue) => issue.sprintId === activeSprint?.id),
    [activeSprint],
  );

  const filteredIssues = useMemo(() => {
    if (selectedAssignees.length === 0) return boardIssues;
    return boardIssues.filter(
      (issue) => issue.assignee && selectedAssignees.includes(issue.assignee.id),
    );
  }, [boardIssues, selectedAssignees]);

  const toggleAssignee = (userId: string) => {
    setSelectedAssignees((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
    );
  };

  const selectedIssue = issueKey ? getIssueByKey(issueKey) ?? null : null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "calc(100vh - 48px)", p: 2.5 }}>
      <Breadcrumbs sx={{ mb: 0.5, fontSize: 12 }}>
        <Link underline="hover" color="text.secondary" href="#" variant="caption">
          {currentProject.name}
        </Link>
        <Typography variant="caption" color="text.secondary">
          Board
        </Typography>
      </Breadcrumbs>

      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        {activeSprint?.name ?? "Board"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 2,
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            bgcolor: "#F1F2F4",
            borderRadius: 1,
            px: 1,
            py: 0.5,
            width: 220,
          }}
        >
          <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
          <InputBase placeholder="Search board" fullWidth sx={{ fontSize: 13 }} />
        </Box>

        <AvatarGroup max={6} sx={{ "& .MuiAvatar-root": { width: 28, height: 28, fontSize: 11, cursor: "pointer" } }}>
          {users.map((user) => (
            <Box
              key={user.id}
              onClick={() => toggleAssignee(user.id)}
              sx={{
                outline: selectedAssignees.includes(user.id) ? "2px solid #0052CC" : "none",
                outlineOffset: 1,
                borderRadius: "50%",
              }}
            >
              <UserAvatar user={user} size={28} />
            </Box>
          ))}
        </AvatarGroup>

        <Button size="small" startIcon={<FilterListIcon fontSize="small" />} color="inherit">
          Filter
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Typography variant="caption" color="text.secondary">
          {activeSprint ? `${activeSprint.startDate} – ${activeSprint.endDate}` : ""}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 1.5, flex: 1, overflowX: "auto", pb: 1 }}>
        {statusOrder.map((status) => (
          <BoardColumn
            key={status}
            status={status}
            issues={filteredIssues.filter((issue) => issue.status === status)}
            basePath="/board"
          />
        ))}
      </Box>

      <IssueDetailPanel issue={selectedIssue} basePath="/board" />
    </Box>
  );
}
