import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { NavLink } from "react-router-dom";
import { currentProject } from "../../data/mockData";

export const SIDEBAR_WIDTH = 240;

const navItems = [
  { label: "Board", to: "/board", icon: ViewKanbanOutlinedIcon, disabled: false },
  { label: "Backlog", to: "/backlog", icon: FormatListBulletedOutlinedIcon, disabled: false },
  { label: "Timeline", to: "/timeline", icon: TimelineOutlinedIcon, disabled: false },
  { label: "Reports", to: "/reports", icon: SummarizeOutlinedIcon, disabled: true },
  { label: "Project settings", to: "/settings", icon: SettingsOutlinedIcon, disabled: true },
];

export function Sidebar() {
  return (
    <Box
      component="nav"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        height: "100vh",
        borderRight: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, px: 2, py: 2 }}>
        <Avatar
          variant="rounded"
          sx={{ bgcolor: currentProject.avatarColor, width: 32, height: 32, fontSize: 14, fontWeight: 700 }}
        >
          {currentProject.key.slice(0, 2)}
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
            {currentProject.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Software project
          </Typography>
        </Box>
      </Box>

      <List sx={{ px: 1, py: 0 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.label}
            component={item.disabled ? "div" : NavLink}
            to={item.disabled ? undefined : item.to}
            disabled={item.disabled}
            sx={{
              borderRadius: 1,
              mb: 0.25,
              py: 0.75,
              "&.active": {
                bgcolor: "#DEEBFF",
                color: "primary.main",
                "& .MuiListItemIcon-root": { color: "primary.main" },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 34 }}>
              <item.icon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              slotProps={{ primary: { sx: { fontSize: 13.5, fontWeight: 500 } } }}
            />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ mt: "auto", px: 2, py: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Static UI preview &middot; no backend
        </Typography>
      </Box>
    </Box>
  );
}
