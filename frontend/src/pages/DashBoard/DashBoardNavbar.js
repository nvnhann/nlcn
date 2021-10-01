import React from 'react';
import PropTypes from 'prop-types';
import { Box, CssBaseline, IconButton, Toolbar, Typography } from '@material-ui/core';
import MuiAppBar from '@material-ui/core/AppBar';
import { Icon } from '@iconify/react';
import Hidden from '../../Component/Hidden';
import AdminPopover from './AdminPopover';
import { styled } from '@material-ui/core';

const DRAWER_WIDTH = 280;

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: theme.palette.primary.main,
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

DashBoardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashBoardNavbar({ onOpenSidebar }) {
  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Hidden width="lgUp">
            <IconButton onClick={onOpenSidebar} sx={{ mr: 1 }}>
              <Icon icon="eva:book-fill" color="white" />
            </IconButton>
          </Hidden>

          <Typography
            variant="h6"
            noWrap
            component="a"
            style={{ color: '#fff', textDecoration: 'none' }}
            href="/"
          >
            RIKUO
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <Hidden width="mdDown">
            <Typography variant="h6">Hi Admin!</Typography>
          </Hidden>

          <AdminPopover />
        </Toolbar>
      </AppBar>
    </div>
  );
}
