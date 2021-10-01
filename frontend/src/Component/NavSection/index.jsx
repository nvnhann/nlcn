import PropTypes from 'prop-types';
import { matchPath, NavLink as RouterLink, useLocation } from 'react-router-dom';
// material
import React from 'react';
import {
  alpha,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@material-ui/core';
// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ item, active }) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon } = item;

  const activeRootStyle = {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    borderRadius: '8px',
  };

  return (
    <ListItem
      component={RouterLink}
      to={path}
      style={{
        ...(isActiveRoot ? activeRootStyle : { color: theme.palette.primary.main }),
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText disableTypography primary={title} />
    </ListItem>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

export default function NavSection({ navConfig, ...other }) {
  const { pathname } = useLocation();
  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  return (
    <Box {...other} style={{ padding: '1rem' }}>
      <List disablePadding>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
