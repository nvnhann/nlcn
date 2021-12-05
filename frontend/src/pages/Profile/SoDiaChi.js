import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    IconButton,
    Paper,
    Slide,
    Typography
} from "@material-ui/core";

import {Icon} from "@iconify/react";
import {Controller, useForm} from "react-hook-form";
import InputText from "../../Component/Form-control/InputText";
import {useSnackbar} from "notistack";
import DiaChiAPI from "../../API/DiaChiAPI";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function SoDiaChi() {
    const [open, setOpen] = useState(false);
    const [openE, setOpenE] = useState(false);
    const [openD, setOpenD] = useState(false);
    const [checked, setChecked] = useState(false);
    const [checkedE, setCheckedE] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [diachi, setDiachi] = useState([]);
    const [count, setCount] = useState(0);
    const [iddc, setIddc] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await DiaChiAPI.get();
            setDiachi(data);
        })()
    }, [count])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpen(false);
    };

    const handleClickOpenE = () => {
        setOpenE(true);
    };

    const handleCloseE = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpenE(false);
    };

    const handleClickOpenD = () => {
        setOpenD(true);
    };

    const handleCloseD = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpenD(false);
    };
    const form = useForm({
        defaultValues: {
           hoten:'',
            diachi: '',
            macdinh: 0,
            sdt: ''
        }
    });

    const formE = useForm({
        defaultValues: {
            ten: '',
            diachi: '',
            sdt: '',
            macdinh: 0,
        }
    });

    const handleSubmit = async (value) => {
        checked ? value.macdinh = 1 : value.macdinh = 0;
        try {
            await DiaChiAPI.create(value);
            enqueueSnackbar('Thêm địa chỉ thành công', {variant: 'success', autoHideDuration: 2000});
            handleClose();
            form.reset();
            setCount(e => e + 1)

        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000});
        }
    }

    const handleSubmitE = async (value) => {
        checkedE ? value.macdinh = 1 : value.macdinh = 0;

        try {
            await DiaChiAPI.update(iddc, value);
            enqueueSnackbar('cập nhật địa chỉ thành công', {variant: 'success', autoHideDuration: 2000});
            handleCloseE();
            setCount(e => e + 1);
            setIddc(null);

        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000});
        }
    }

    const handleSumitD = async () => {
        try {
            await DiaChiAPI.delete(iddc);
            enqueueSnackbar('đã xóa địa chỉ thành công', {
                variant: 'success',
                autoHideDuration: 2000,
            });
            handleCloseD();
            setCount((e) => e + 1);
            setIddc(null)
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000});
        }
    }
    return (
        <Paper elevation={3} style={{padding: '1rem'}}>
            <Typography variant="h4" color="primary" align="center" style={{margin: '1rem 0'}}>
                Sổ địa chỉ
            </Typography>
            <Button
                onClick={handleClickOpen}
                variant="contained"
                style={{textTransform: 'none'}}
                color="primary"
                startIcon={<Icon icon="bi:plus-square-fill" color="#ffffff"/>}
            >
                Thêm địa chỉ
            </Button>
            <Typography variant="h5" color="primary" style={{margin: '1rem 0'}}>
                Địa chỉ thanh toán mặc định
            </Typography>
            {!!diachi[0]?.mac_dinh && (<>
                <Typography component="span" style={{margin: '1rem 0'}}>
                    {diachi[0].hoten + ' | ' + diachi[0].sdt + ' | ' + diachi[0].diachi}
                </Typography>
                <IconButton onClick={() => {
                    handleClickOpenE();
                    formE.reset({
                        hoten: diachi[0].hoten,
                        sdt: diachi[0].sdt,
                        diachi: diachi[0].diachi,
                        macdinh: 0
                    });
                    setIddc(diachi[0].iddc);
                    setCheckedE(true);
                }}><Icon icon="akar-icons:edit" color="#33b5e5"/></IconButton>
            </>)}
            <Typography variant="h5" color="primary" style={{margin: '1rem 0'}}>
                Địa chỉ khác
            </Typography>
            {diachi?.map(e => {
                if (e.mac_dinh !== 1) {
                    return (
                        <div key={e.iddc}>
                            <Typography component="span" style={{margin: '1rem 0'}}>
                                {e.hoten +' | ' + e.sdt + ' | ' + e.diachi}
                            </Typography>
                            <IconButton onClick={() => {
                                handleClickOpenE();
                                formE.reset({hoten: e.hoten, sdt: e.sdt, diachi: e.diachi, macdinh: 0});
                                setIddc(e.iddc)
                                setCheckedE(false);
                            }}><Icon icon="akar-icons:edit" color="#33b5e5"/>
                            </IconButton>
                            <IconButton onClick={() => {
                                handleClickOpenD();
                                setIddc(e.iddc);
                            }}>
                                <Icon icon="fluent:delete-24-filled" color="red"/>
                            </IconButton>
                        </div>
                    )
                } else return null;
            })
            }
            <Dialog open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <DialogTitle>
                        <Typography color="primary" align="center">Thêm địa chỉ</Typography>
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
                        <InputText form={form} name="hoten" label="Họ và tên" fullWidth/>
                        <InputText form={form} name="sdt" label="số điện thoại" fullWidth/>
                        <InputText form={form} name="diachi" label="Địa chỉ" fullWidth/>
                        <FormControlLabel
                            control={
                                <Controller
                                    name="macdinh"
                                    control={form.control}
                                    as={<Checkbox color="primary" onClick={() => setChecked(e => !e)}
                                    />
                                    }
                                />}
                            label="Đặt làm địa chỉ mặc định"


                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            style={{textTransform: 'none'}}
                        >
                            Thêm
                        </Button>
                        <Button onClick={handleClose} style={{textTransform: 'none'}}>
                            Đóng
                        </Button>
                    </DialogActions>
                </form>

            </Dialog>

            <Dialog open={openE}
                    onClose={handleCloseE}
                    TransitionComponent={Transition}>
                <form onSubmit={formE.handleSubmit(handleSubmitE)}>
                    <DialogTitle>
                        <Typography color="primary" align="center">Sửa địa chỉ</Typography>
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseE}
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
                        <InputText form={formE} name="hoten" label="Họ và tên" fullWidth/>
                        <InputText form={formE} name="sdt" label="số điện thoại" fullWidth/>
                        <InputText form={formE} name="diachi" label="Địa chỉ" fullWidth/>
                        <FormControlLabel
                            control={
                                <Controller
                                    name="macdinh"
                                    control={formE.control}
                                    as={<Checkbox checked={checkedE} color="primary"
                                                  onClick={() => setCheckedE(e => !e)}
                                    />
                                    }
                                />}
                            label="Đặt làm địa chỉ mặc định"

                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            style={{textTransform: 'none'}}
                        >
                            Đồng ý
                        </Button>
                        <Button onClick={handleCloseE} style={{textTransform: 'none'}}>
                            Đóng
                        </Button>
                    </DialogActions>
                </form>

            </Dialog>

            <Dialog open={openD} onClose={handleCloseD} TransitionComponent={Transition}>
                <DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseD}
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
                    <Box style={{width: '26rem'}} m={2} textAlign="center">
                        <Typography variant="h5" color="secondary">Bạn muốn xóa !</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleSumitD}
                        color="primary"
                        variant="contained"
                        style={{textTransform: 'none'}}
                    >
                        Đồng ý
                    </Button>
                    <Button onClick={handleCloseD} style={{textTransform: 'none'}}>
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}

export default SoDiaChi;