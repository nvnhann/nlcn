import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Paper,
    Slide,
    Typography
} from '@material-ui/core';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from "@iconify/react";
import {useForm} from "react-hook-form";
import InputText from "../../Component/Form-control/InputText";
import {useSnackbar} from "notistack";
import {unwrapResult} from "@reduxjs/toolkit";
import {updateProfile} from "../../Store/profileSlice";
import {fCurrency} from "../../ultils/fCurrentcy";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function Account() {
    const profile = useSelector((state) => state.profile.account);
    const email = useSelector((state) => state.user.current.email);
    const [open, setOpen] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpen(false);
    };
    const form = useForm({
        defaultValues: {
            hoten: '',
            phone: profile.sdt || ' ',
        },
    });

    const handleSubmit = async (value) => {
        try {
            unwrapResult(dispatch(await updateProfile(value)));
            enqueueSnackbar('Cập nhật thành công', {variant: 'success', autoHideDuration: 2000});
            handleClose();
            form.reset({firstname: value.firstname, lastname: value.lastname, phone: value.phone});
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000});
        }
    }
    return (
        <Paper elevation={3} style={{padding: '1rem'}}>
            <Typography variant="h4" color="primary" align="center" style={{margin: '1rem 0'}}>Thông tin tài
                khoản</Typography>
            <div style={{marginBottom: '1rem'}}>
                <Typography variant="h6" component="span" style={{marginRight: '1rem'}}>
                    Họ và tên:
                </Typography>
                <Typography color="secondary" variant="h6" component="span">
                    {profile.hoten}
                </Typography>
            </div>
            <div style={{marginBottom: '1rem'}}>
                <Typography variant="h6" component="span" style={{marginRight: '1rem'}}>
                    Email:
                </Typography>
                <Typography variant="h6" component="span" color="secondary">
                    {email}
                </Typography>
            </div>
            <div style={{marginBottom: '1rem'}}>
                <Typography variant="h6" component="span" style={{marginRight: '1rem'}}>
                    Số điện thoại:
                </Typography>
                <Typography variant="h6" component="span" color="secondary">
                    {profile.sdt}
                </Typography>
            </div>
            <Button variant="contained" color="primary" style={{textTransform: 'none'}}
                    onClick={() => {
                        handleClickOpen();
                        form.reset({
                            hoten: profile.hoten,
                            phone: profile.sdt
                        })
                    }}>Cập nhật thông tin</Button>
            {/*<Divider style={{margin: '1rem 0'}}/>*/}
            {/*<div style={{marginBottom: '1rem'}}>*/}
            {/*    <Typography variant="h6" component="span" style={{marginRight: '1rem'}}>*/}
            {/*        Đơn hàng thành công:*/}
            {/*    </Typography>*/}
            {/*    <Typography variant="h6" component="span" color="secondary">*/}
            {/*        {profile.so_hd}*/}
            {/*    </Typography>*/}
            {/*</div>*/}
            {/*<div style={{marginBottom: '1rem'}}>*/}
            {/*    <Typography variant="h6" component="span" style={{marginRight: '1rem'}}>*/}
            {/*        Số tiền đã thanh toán:*/}
            {/*    </Typography>*/}
            {/*    <Typography variant="h6" component="span" color="secondary">*/}
            {/*        {fCurrency(profile.tong_gia)}*/}
            {/*    </Typography>*/}
            {/*</div>*/}
            <Divider style={{margin: '1rem 0'}}/>
            <div style={{marginBottom: '1rem'}}>
                <Typography variant="h6" component="span" style={{marginRight: '1rem'}}>
                    Địa chỉ giao hàng mặc định:
                </Typography>
                <Typography variant="h6" component="span" color="secondary">
                    {profile.diachi}
                </Typography>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <DialogTitle>
                        <Typography color="primary" align="center">Cập nhật thông tin tài khoản</Typography>
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
                    <DialogContent>
                        <InputText fullWidth form={form} name="hoten" label="Tên"/>
                        <InputText fullWidth form={form} name="phone" label="Số điện thoại"/>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            style={{textTransform: 'none'}}
                        >
                            Cập nhật
                        </Button>
                        <Button onClick={handleClose} style={{textTransform: 'none'}}>
                            Đóng
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Paper>
    );
}

export default Account;
