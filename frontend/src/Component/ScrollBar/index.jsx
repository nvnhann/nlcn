import PropTypes from 'prop-types';
import SimpleBarReact from 'simplebar-react';

import React from 'react';
import { alpha, Box, styled } from '@material-ui/core';
const RootStyle = styled('div')({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
});

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: '50%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    '&.simplebar-visible:before': {
      opacity: 1,
    },
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10,
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6,
  },
  '& .simplebar-mask': {
    zIndex: 'inherit',
  },
}));

ScrollBar.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default function ScrollBar({ children, style, ...other }) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  if (isMobile) {
    return (
      <Box style={{ overflowX: 'auto', ...style }} {...other}>
        {children}
      </Box>
    );
  }
  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} style={style} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
}
