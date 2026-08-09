import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import { IssueTypeIcon } from "../components/common/IssueTypeIcon";
import { IssueDetailPanel } from "../components/issue/IssueDetailPanel";
import { issues, sprints, getIssueByKey, currentProject } from "../data/mockData";
import { issueTypeMeta } from "../theme/issueMeta";
import type { Issue } from "../types";

const BACKLOG_COLUMN = "backlog";

const columns = [...sprints.map((sprint) => sprint.id), BACKLOG_COLUMN];

function columnLabel(columnId: string): { title: string; subtitle: string } {
  if (columnId === BACKLOG_COLUMN) {
    return { title: "Backlog", subtitle: "Unscheduled" };
  }
  const sprint = sprints.find((s) => s.id === columnId);
  return { title: sprint?.name ?? columnId, subtitle: sprint ? `${sprint.startDate} – ${sprint.endDate}` : "" };
}

function columnIndexForIssue(issue: Issue): number {
  const columnId = issue.sprintId ?? BACKLOG_COLUMN;
  const index = columns.indexOf(columnId);
  return index === -1 ? columns.length - 1 : index;
}

export function TimelinePage() {
  const { issueKey } = useParams();
  const navigate = useNavigate();
  const epics = useMemo(() => issues.filter((issue) => issue.type === "epic"), []);

  const rows = useMemo(
    () =>
      epics.map((epic) => {
        const children = issues.filter((issue) => issue.epicId === epic.id);
        const columnIndices = (children.length > 0 ? children : [epic]).map(columnIndexForIssue);
        const startCol = Math.min(...columnIndices);
        const endCol = Math.max(...columnIndices);
        const doneCount = children.filter((issue) => issue.status === "done").length;
        const percentDone = children.length > 0 ? Math.round((doneCount / children.length) * 100) : 0;
        return { epic, children, startCol, endCol, doneCount, percentDone };
      }),
    [epics],
  );

  const selectedIssue = issueKey ? getIssueByKey(issueKey) ?? null : null;

  return (
    <Box sx={{ p: 2.5, maxWidth: 1200 }}>
      <Breadcrumbs sx={{ mb: 0.5, fontSize: 12 }}>
        <Link underline="hover" color="text.secondary" href="#" variant="caption">
          {currentProject.name}
        </Link>
        <Typography variant="caption" color="text.secondary">
          Timeline
        </Typography>
      </Breadcrumbs>

      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Timeline
      </Typography>

      <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1, overflow: "hidden" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `220px repeat(${columns.length}, 1fr)`,
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "#F7F8F9",
          }}
        >
          <Box sx={{ px: 1.5, py: 1 }} />
          {columns.map((columnId) => {
            const { title, subtitle } = columnLabel(columnId);
            return (
              <Box
                key={columnId}
                sx={{ px: 1.5, py: 1, borderLeft: "1px solid", borderColor: "divider" }}
              >
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {subtitle}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {rows.map(({ epic, children, startCol, endCol, doneCount, percentDone }) => {
          const meta = issueTypeMeta[epic.type];
          return (
            <Box
              key={epic.id}
              sx={{
                display: "grid",
                gridTemplateColumns: `220px repeat(${columns.length}, 1fr)`,
                borderBottom: "1px solid",
                borderColor: "divider",
                "&:last-of-type": { borderBottom: "none" },
              }}
            >
              <Box
                onClick={() => navigate(`/timeline/${epic.key}`)}
                sx={{
                  px: 1.5,
                  py: 1.75,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  cursor: "pointer",
                  minWidth: 0,
                  "&:hover": { bgcolor: "#F1F2F4" },
                }}
              >
                <IssueTypeIcon type={epic.type} />
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {epic.key}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }} noWrap>
                    {epic.title}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  gridColumn: `${startCol + 2} / ${endCol + 3}`,
                  display: "flex",
                  alignItems: "center",
                  px: 0.75,
                  minHeight: 56,
                }}
              >
                <Tooltip
                  title={
                    children.length > 0
                      ? `${doneCount} of ${children.length} issues done`
                      : "No linked issues yet"
                  }
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 22,
                      borderRadius: 1.5,
                      bgcolor: `${meta.color}33`,
                      border: `1px solid ${meta.color}`,
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/timeline/${epic.key}`)}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        width: `${percentDone}%`,
                        bgcolor: meta.color,
                        transition: "width 0.2s ease",
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                        fontSize: 11,
                        color: "#172B4D",
                      }}
                    >
                      {children.length > 0 ? `${doneCount}/${children.length}` : "—"}
                    </Typography>
                  </Box>
                </Tooltip>
              </Box>
            </Box>
          );
        })}
      </Box>

      <IssueDetailPanel issue={selectedIssue} basePath="/timeline" />
    </Box>
  );
}
