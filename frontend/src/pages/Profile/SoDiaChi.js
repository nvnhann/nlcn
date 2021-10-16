import React, {useEffect, useState} from 'react';
import {
    Button, Checkbox,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, FormControlLabel,
    Grid,
    IconButton,
    Paper,
    Slide,
    Typography
} from "@material-ui/core";
import {useSelector} from "react-redux";
import {Icon} from "@iconify/react";
import {useForm, Controller} from "react-hook-form";
import InputText from "../../Component/Form-control/InputText";
import {useSnackbar} from "notistack";
import DiaChiAPI from "../../API/DiaChiAPI";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function SoDiaChi() {
    const profile = useSelector(state => state.profile.account);
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [diachi, setDiachi] = useState([]);
    const [count, setCount] = useState(0);
    useEffect(()=>{
        (async ()=>{
            const data = await DiaChiAPI.get();
            setDiachi(data);
        })()
    },[count])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpen(false);
    };
    const form = useForm({
        defaultValues:{
            ho: '',
            ten: '',
            diachi: '',
            macdinh: 0,
            sdt: ''
        }
    })

    const handleSubmit = async (value)=>{
        checked ? value.macdinh = 1 : value.macdinh =0;
        try {
            await DiaChiAPI.create(value);
            enqueueSnackbar('Thêm địa chỉ thành công', { variant: 'success', autoHideDuration: 2000 });
            handleClose();
            form.reset();
            setCount(e=>e+1)

        }catch (error){
            enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 2000 });
        }
    }
    return (
        <Paper  elevation={3} style={{padding: '1rem'}}>
            <Typography variant="h4" color="primary" align="center" style={{margin: '1rem 0'}}>
                Sổ địa chỉ
            </Typography>
            <Button
                onClick={handleClickOpen}
                variant="contained"
                style={{ textTransform: 'none' }}
                color="primary"
                startIcon={<Icon icon="bi:plus-square-fill" color="#ffffff" />}
            >
                Thêm địa chỉ
            </Button>
            <Typography variant="h5" color="primary"  style={{margin: '1rem 0'}}>
                Địa chỉ thanh toán mặc định
            </Typography>
            {diachi[0]?.diachi && (<>
                <Typography component="span" style={{margin: '1rem 0'}}>
                    {diachi[0].ho + ' '+ diachi[0].ten + ' | '+diachi[0].sdt + ' | '+ diachi[0].diachi}
                </Typography>
                <IconButton><Icon icon="akar-icons:edit" color="#33b5e5" /></IconButton>
            </>)}
            <Typography variant="h5" color="primary"  style={{margin: '1rem 0'}}>
                Địa chỉ khác
            </Typography>
            {diachi?.map(e=>{
            if(e.mac_dinh!==1){
                return(
                    <div key={e.iddc}>
                        <Typography  component="span" style={{margin: '1rem 0'}}>
                            {e.ho + ' '+ e.ten + ' | '+e.sdt + ' | '+ e.diachi}
                        </Typography>
                        <IconButton><Icon icon="akar-icons:edit" color="#33b5e5" /></IconButton>
                    </div>
                )
            }
            })
            }
            <Dialog open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition} >
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                <DialogTitle>
                    <Typography  color="primary" align="center">Thêm địa chỉ</Typography>
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
                        <Icon icon="majesticons:close" color="#6b7280" />
                    </IconButton>
                </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={6}><InputText form={form} name="ho"  label="Họ"/></Grid>
                            <Grid item xs={6}><InputText form={form} name="ten" label="Tên" /></Grid>
                        </Grid>
                        <InputText form={form} name="sdt" label="số điện thoại" fullWidth />
                        <InputText form={form} name="diachi" label="Địa chỉ" fullWidth />
                        <FormControlLabel
                            control={
                                <Controller
                                    name="macdinh"
                                    control={form.control}
                                    as={<Checkbox   color="primary" onClick={()=>setChecked(e=>!e)}
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
                            style={{ textTransform: 'none' }}
                        >
                            Thêm
                        </Button>
                        <Button onClick={handleClose} style={{ textTransform: 'none' }}>
                            Đóng
                        </Button>
                    </DialogActions>
                </form>

            </Dialog>
        </Paper>
    );
}

export default SoDiaChi;