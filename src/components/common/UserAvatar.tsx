import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import type { User } from "../../types";

interface UserAvatarProps {
  user: User | null;
  size?: number;
}

export function UserAvatar({ user, size = 24 }: UserAvatarProps) {
  if (!user) {
    return (
      <Tooltip title="Unassigned">
        <Avatar
          sx={{
            width: size,
            height: size,
            bgcolor: "#DFE1E6",
            color: "#42526E",
          }}
        >
          <PersonOutlineIcon sx={{ fontSize: size * 0.65 }} />
        </Avatar>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={user.name}>
      <Avatar
        sx={{
          width: size,
          height: size,
          bgcolor: user.color,
          fontSize: size * 0.42,
          fontWeight: 600,
        }}
      >
        {user.initials}
      </Avatar>
    </Tooltip>
  );
}
