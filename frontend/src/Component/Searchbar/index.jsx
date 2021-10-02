import { Icon } from '@iconify/react';
import { useState } from 'react';

// material
import {
  alpha,
  styled,
  Box,
  Input,
  Slide,
  InputAdornment,
  ClickAwayListener,
  IconButton,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  color: '#ffffff',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: 'rgb(145 158 171 / 24%) 0px 8px 16px 0px',
  backgroundColor: `${alpha('#e0e0e0', 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [text, setText] = useState('');
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    navigate('/app?s=' + text);
    e.preventDefault();
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <Icon icon="bi:search" color="#fff" width={20} height={20} />
          </IconButton>
        )}
        <form onSubmit={handleSubmit}>
          <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
            <SearchbarStyle>
              <Input
                autoFocus
                fullWidth
                onChange={(e) => setText(e.target.value)}
                disableUnderline
                placeholder="Tìm kiếm…"
                startAdornment={
                  <InputAdornment position="start">
                    <Box
                      component={Icon}
                      icon={<Icon icon="bi:search" />}
                      style={{ color: '#ffffff', width: 20, height: 20 }}
                    />
                  </InputAdornment>
                }
                style={{ mr: 1, fontWeight: 'fontWeightBold' }}
              />
              <IconButton
                aria-label="close"
                onClick={() => {
                  handleClose();
                  navigate('/app');
                }}
                style={{
                  color: '#ffffff',
                }}
              >
                <Icon icon="majesticons:close" color="#6b7280" />
              </IconButton>
            </SearchbarStyle>
          </Slide>
        </form>
      </div>
    </ClickAwayListener>
  );
}
