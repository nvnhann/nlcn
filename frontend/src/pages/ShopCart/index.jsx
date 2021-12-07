import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Slide,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {removeFromCart, setQuantity} from '../../Store/cartSlice';
import Page from '../../Component/Page';
import {Icon} from '@iconify/react';
import {cartItemTotal} from '../../Store/selecters';
import SimpleBar from "simplebar-react";
import Checkout from "../../Component/Checkout";
import {useSnackbar} from "notistack";
import DiaChiAPI from "../../API/DiaChiAPI";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ShopCart() {
    const isLogin = !!useSelector((state) => state.user.current.email);
    const cart = useSelector((state) => state.cart.cartItem);
    const total = useSelector(cartItemTotal);
    const [open, setOpen] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [diaChi, setDiachi] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpen(false);
    };

    useEffect(() => {
        (async () => {
            if (isLogin) {
                const diachi = await DiaChiAPI.get();
                setDiachi(diachi);
            }
        })();
    }, [isLogin]); // eslint-disable-line react-hooks/exhaustive-deps

    const checkout = async () => {
        if (!isLogin) {
            enqueueSnackbar('Vui lòng đăng nhập để thanh toán', {variant: 'error', autoHideDuration: 2000});
        } else {
            handleClickOpen();
        }
    }
    const dispatch = useDispatch();
    const cell = [
        {
            name: 'Tên sách',
        },
        {
            name: 'Hình ảnh',
        },
        {
            name: 'Giá',
        },
        {
            name: 'Số lượng',
        },
        {
            name: 'Hành động',
        },
    ];

    return (
        <Page title="Giỏ hàng">
            <Paper style={{maxWidth: 1200, margin: '0 auto', paddingBottom: '5rem'}}>
                <TableContainer>
                    <Table>
                        <TableHead style={{backgroundColor: '#6b7280'}}>
                            <TableRow>
                                {cell.map((e, index) => (
                                    <TableCell align="center" style={{color: '#fff'}} key={index}>
                                        {e.name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((e) => (
                                <TableRow key={e.idsach}>
                                    <TableCell>{e.tensach}</TableCell>
                                    <TableCell>
                                        <Avatar
                                            variant="square"
                                            style={{width: '5rem', height: '5rem', borderRadius: '5px'}}
                                            src={e.hinh_anh}
                                        />
                                    </TableCell>
                                    <TableCell>$ {e.gia_sach}</TableCell>
                                    <TableCell style={{width: '10rem'}}>
                                        <IconButton
                                            color="primary"
                                            onClick={() => {
                                                dispatch(
                                                    setQuantity({
                                                        idsach: e.idsach,
                                                        so_luong: e.so_luong < 2 ? 1 : e.so_luong - 1,
                                                    })
                                                );
                                            }}
                                        >
                                            <Icon icon="gg:remove"/>
                                        </IconButton>
                                        <span>{e.so_luong}</span>
                                        <IconButton
                                            color="primary"
                                            onClick={() => {
                                                dispatch(
                                                    setQuantity({
                                                        idsach: e.idsach,
                                                        so_luong: e.so_luong + 1,
                                                    })
                                                );
                                            }}
                                        >
                                            <Icon icon="carbon:add-alt"/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            onClick={() => {
                                                dispatch(dispatch(removeFromCart(e.idsach)));
                                            }}
                                        >
                                            <Icon icon="fluent:delete-24-filled" color="red"/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box>
                    <div style={{margin: '1rem'}}>
                        <Typography component="span">Tổng thanh toán: </Typography>
                        <Typography component="span" color="secondary">
                            ${total}
                        </Typography>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={()=>{
                            if (total < 1) {
                                enqueueSnackbar('Giỏ hàng rỗng', {variant: 'error', autoHideDuration: 2000});
                                return;
                            }
                            checkout();

                        }

                        }
                        style={{textTransform: 'none', width: '12rem', margin: '1rem'}}
                    >
                        Thanh toán
                    </Button>
                </Box>
            </Paper>
            <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose} TransitionComponent={Transition}>
                <DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        style={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <Icon icon="majesticons:close" color="#6b7280"/>
                    </IconButton>
                </DialogTitle>
                <SimpleBar style={{maxHeight: 600}}>
                    <DialogContent>
                        <Checkout
                            diachi={diaChi}
                            sach={cart}
                            closeDialog={handleClose}
                            tong_gia={total}
                        />
                    </DialogContent>
                </SimpleBar>
            </Dialog>
        </Page>
    );
}

export default ShopCart;
