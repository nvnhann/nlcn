import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  styled,
  Toolbar,
  Typography,
  useTheme,
  makeStyles,
  Badge,
} from '@material-ui/core';
import MuiAppBar from '@material-ui/core/AppBar';
import { Icon } from '@iconify/react';
import AccountPopover from './AccountPopover';
import { useSelector } from 'react-redux';
import Login from '../../Component/Authentication/Login';
import Register from '../../Component/Authentication/Register';
import Searchbar from '../../Component/Searchbar';
import { cartItemCount } from '../../Store/selecters';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: theme.palette.primary.main,
  [theme.breakpoints.up('lg')]: {
    // width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  },
  left: 0,
  right: 0,
  margin: '0 auto',
}));

NavbarHome.propTypes = {
  onOpenSidebar: PropTypes.func,
};
const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function NavbarHome({ onOpenSidebar }) {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const cartcount = useSelector(cartItemCount);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e, r) => {
    if (r === 'backdropClick' || r === 'escapeKeyDown') return;
    setOpen(false);
  };
  const isLogin = !!useSelector((state) => state.user.current.email);

  useEffect(() => {
    return () => {
      // window.location.reload();
    };
  }, []);

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar style={{ [theme.breakpoints.up('lg')]: { minHeight: '80px' } }}>
          <IconButton onClick={onOpenSidebar}>
            <Icon icon="bx:bxs-book-heart" color="white" />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            style={{ color: '#fff', textDecoration: 'none' }}
            href="/app"
          >
            RIKUO
          </Typography>
          <Box style={{ flexGrow: 1 }} />
          <Searchbar />
          <IconButton
            component={RouterLink}
            to="/shopcart"
            style={{ color: '#fff' }}
            color="inherit"
          >
            <Badge badgeContent={cartcount} color="secondary">
              <Icon icon="eva:shopping-cart-fill" />
            </Badge>
          </IconButton>
          {isLogin ? (
            <AccountPopover />
          ) : (
            <Button
              style={{ color: '#fff', textTransform: 'none' }}
              endIcon={<Icon icon="ant-design:login-outlined" color="white" />}
              onClick={handleClickOpen}
            >
              Đăng nhập
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        <DialogTitle>
          <IconButton aria-label="close" onClick={handleClose} className={classes.closeButton}>
            <Icon icon="majesticons:close" color="#6b7280" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {mode === MODE.LOGIN && (
            <>
              <Login handleClose={handleClose} />
              <Box textAlign="center" mt={2}>
                <Button onClick={() => setMode(MODE.REGISTER)} style={{ textTransform: 'none' }}>
                  Bạn chưa có tài khoản? Đăng ký
                </Button>
              </Box>
              <Box textAlign="center">
                <Button style={{ textTransform: 'none' }} onClick={()=>{
                    handleClose();
                    navigate('/forgetpwd');

                }}>
                  Quên mật khẩu
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.REGISTER && (
            <>
              <Register handleClose={handleClose} />
              <Box textAlign="center" mt={2}>
                <Button onClick={() => setMode(MODE.LOGIN)} style={{ textTransform: 'none' }}>
                  Bạn đã có tài khoản? Đăng nhập
                </Button>
              </Box>


            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ textTransform: 'none' }}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
