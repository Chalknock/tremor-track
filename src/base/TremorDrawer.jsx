import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Link, Outlet } from "react-router-dom"; // Import Link and Outlet
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  AssuredWorkload,
  Checklist,
  Summarize,
  AccountBox,
} from "@mui/icons-material";

const drawerWidth = 240;

const TremorDrawer = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawerItems = useMemo(
    () => [
      { text: "Evaluate", icon: <Checklist />, path: "/evaluate" },
      { text: "Reports", icon: <Summarize />, path: "/reports" },
      { text: "Inspection", icon: <AssuredWorkload />, path: "/inspection" },
      { text: "Account", icon: <AccountBox />, path: "/account" },
    ],
    []
  );

  const drawer = (
    <div>
      {!mobileOpen && <Toolbar />}
      <Divider />
      <List>
        {drawerItems.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={Link}
              to={path}
              onClick={handleDrawerClose}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            display: { sm: "none" },
            position: "fixed",
            top: "10px",
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="row justify-content-center p-2 m-1"
          >
            ATC-20 sidebar
          </Typography>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "none",
            },
            ".MuiToolbar-gutters": {
              background: "#1976d2",
              display: "none",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          paddingLeft: 1,
          paddingBottom: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet /> {/* Render the matched child route */}
      </Box>
    </Box>
  );
};

TremorDrawer.propTypes = {
  // Define props here if necessary
};

export default TremorDrawer;
