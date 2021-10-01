import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Avatar, Box, Drawer, Link, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import SideBarConfig from './SideBarConfig';
import Hidden from '../../Component/Hidden';
import NavSection from '../../Component/NavSection';
import { styled } from '@material-ui/core';

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: 12,
  backgroundColor: theme.palette.grey[200],
}));

export default function DashBoardSideBar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const email = useSelector((state) => state.user.current.email);
  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  const renderContent = (
    <>
      <Box style={{ margin: '2rem 1rem' }}>
        <Link underline="none" component={RouterLink} to="/">
          <AccountStyle>
            <Avatar src="https://cdn.quasar.dev/img/boy-avatar.png" alt="photoURL" />
            <Box style={{ marginLeft: '1rem' }}>
              <Typography variant="subtitle2" style={{ color: 'text.primary' }}>
                Admin
              </Typography>
              <Typography variant="body2" style={{ color: 'text.secondary' }}>
                {email}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>
      <NavSection navConfig={SideBarConfig} />
    </>
  );
  return (
    <RootStyle>
      <Hidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            style: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
      <Hidden width="mdDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            style: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
            },
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
    </RootStyle>
  );
}
