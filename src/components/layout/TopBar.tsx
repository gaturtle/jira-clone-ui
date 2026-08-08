import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { UserAvatar } from "../common/UserAvatar";
import { users } from "../../data/mockData";

export function TopBar() {
  const me = users[0];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        top: 0,
        zIndex: (t) => t.zIndex.appBar,
      }}
    >
      <Toolbar variant="dense" sx={{ gap: 1.5, minHeight: 48 }}>
        <IconButton size="small">
          <AppsOutlinedIcon fontSize="small" />
        </IconButton>
        <Typography variant="subtitle2" fontWeight={700} sx={{ mr: 2 }}>
          Jira-ish
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
            width: 320,
            maxWidth: "40vw",
          }}
        >
          <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
          <InputBase placeholder="Search" fullWidth sx={{ fontSize: 13 }} />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton size="small">
          <HelpOutlineOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <NotificationsNoneOutlinedIcon fontSize="small" />
        </IconButton>
        <UserAvatar user={me} size={28} />
      </Toolbar>
    </AppBar>
  );
}
