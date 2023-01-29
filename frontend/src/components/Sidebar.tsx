import * as React from 'react';
import { useNavigate } from "react-router";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar,  } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { AuthQuery } from "../api";

const drawerWidth = 240;

const query = new AuthQuery();



const Sidebar = ({ children }: {children: React.ReactNode}) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const moveToCase1 = () => {
    query.killThread()
    navigate(`/signin_case1`)
  };

  const moveToCase2 = () => {
    query.killThread()
    query.postSignInCase2_1()
    navigate(`/signin_case2`)
  };

  const moveToCase3 = () => {
    query.killThread()
    query.postSignInCase3_1()
    navigate(`/signin_case3`)
  };

  const moveToList = () => {
    query.killThread()
    navigate(`/signlist`)
  };

  const moveToSignUp = () => {
    query.killThread()
    navigate(`/signup`)
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
            <ListItemButton onClick={moveToCase1}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Sign in Case0" />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton onClick={moveToCase2}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Sign in Case1" />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton onClick={moveToCase3}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Sign in Case2" />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton onClick={moveToSignUp}>
              <ListItemIcon>
                <ArrowUpwardIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Up" />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton onClick={moveToList}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="Account list for developper" />
            </ListItemButton>
        </ListItem>
      </List>
    </div>
  );


  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Sidebar;
