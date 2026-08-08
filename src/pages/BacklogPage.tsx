import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { BacklogSection } from "../components/backlog/BacklogSection";
import { IssueDetailPanel } from "../components/issue/IssueDetailPanel";
import { issues, sprints, getIssueByKey, currentProject } from "../data/mockData";

export function BacklogPage() {
  const { issueKey } = useParams();
  const selectedIssue = issueKey ? getIssueByKey(issueKey) ?? null : null;
  const backlogIssues = issues.filter((issue) => issue.sprintId === null);

  return (
    <Box sx={{ p: 2.5, maxWidth: 1100 }}>
      <Breadcrumbs sx={{ mb: 0.5, fontSize: 12 }}>
        <Link underline="hover" color="text.secondary" href="#" variant="caption">
          {currentProject.name}
        </Link>
        <Typography variant="caption" color="text.secondary">
          Backlog
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          Backlog
        </Typography>
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
          <InputBase placeholder="Search backlog" fullWidth sx={{ fontSize: 13 }} />
        </Box>
      </Box>

      {sprints.map((sprint) => (
        <BacklogSection
          key={sprint.id}
          title={sprint.name}
          subtitle={sprint.isActive ? `${sprint.startDate} – ${sprint.endDate} · ${sprint.goal}` : sprint.goal}
          issueList={issues.filter((issue) => issue.sprintId === sprint.id)}
          basePath="/backlog"
          defaultOpen
          actionLabel={sprint.isActive ? "Complete sprint" : "Start sprint"}
        />
      ))}

      <BacklogSection
        title="Backlog"
        issueList={backlogIssues}
        basePath="/backlog"
        defaultOpen
        actionLabel="Create sprint"
      />

      <IssueDetailPanel issue={selectedIssue} basePath="/backlog" />
    </Box>
  );
}
