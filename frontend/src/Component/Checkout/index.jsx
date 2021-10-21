import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
    AppBar, Avatar,
    Box, Button, Checkbox, Chip, Divider,
    FormControlLabel,
    FormLabel, Grid, IconButton,
    makeStyles, Radio,
    RadioGroup,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import DiaChiAPI from "../../API/DiaChiAPI";
import InputText from "../Form-control/InputText";
import {useSnackbar} from "notistack";
import {fCurrency} from "../../ultils/fCurrentcy";
import { PayPalButton } from "react-paypal-button-v2";
import {useSelector} from "react-redux";




Checkout.propTypes = {
    idtk: PropTypes.number,
    idsach: PropTypes.string,
    diachi: PropTypes.array,
    hinh_anh: PropTypes.string,
    tensach: PropTypes.string,
    soluong: PropTypes.number,
    gia_sach: PropTypes.number,
    phan_tram: PropTypes.number,
    closeDialog: PropTypes.func
};

const useStyles = makeStyles(theme => ({

    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    }
}));

function Checkout(props) {
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();
    const [showForm, setShowForm] = useState(false);
    const [checked, setChecked] = useState(false);
    const [diaChi, setDiachi] = useState([]);
    const idtk = useSelector(state => state.user.current.id);
    const [infor, setInfor] = useState({
        idtk: idtk,
        idsach: props.idsach,
        soluong: props.soluong,
        iddc: props.diachi[0].iddc,
        gia: props.phan_tram ? props.gia_sach * (100 - props.phan_tram) / 100 : props.gia_sach
    });
    const options ={
        clientId: "Ae_6rwFIgAMy-SefAgBIw2h3rfyLCmbph_p5x7fbJzQJuqH57pCrr4whyRsGiY8Xr-EnqLQ-rQ6Wu7xr",
        currency: "USD"
    }
    const [count, setCount] = useState(0);
    useEffect(()=>{
        (async ()=>{
            const res = await DiaChiAPI.get();
            setDiachi(res);
        })();
    },[count]);


    const onSuccess =  async (payment)=>{
        const value = infor;
        value.emailPayPal= payment.payer.email_address;
        value.Ngay = payment.update_time;
        console.log(value)
        enqueueSnackbar('Thanh toán thành công', {variant: 'success', autoHideDuration: 2000});
    }


    const onError = err => {
        enqueueSnackbar('Có lỗi xảy ra', {variant: 'error', autoHideDuration: 2000});

        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        console.log("Error!", err);
        // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
        // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    };

    const form = useForm({
        defaultValues: {
            ho: '',
            ten: '',
            diachi: '',
            macdinh: 0,
            sdt: ''
        }
    });


    const handleSubmit = async (value) => {
        checked ? value.macdinh = 1 : value.macdinh = 0;
        try {
            await DiaChiAPI.create(value);
            enqueueSnackbar('Thêm địa chỉ thành công', {variant: 'success', autoHideDuration: 2000});
            setShowForm(false);
            setCount(e => e + 1)
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000});
        }
        setInfor(prevState => ({
            ...prevState,
            iddc: diaChi[0].iddc
        }));
    }
    return (
        <Box my={2}>
            <AppBar className={classes.appBar} position="static" elevation={0}>
                <Toolbar>
                    <Typography color="inherit" variant="h4" align="center">
                        Thanh toán
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box m={2}>
                <FormLabel component="legend">Thông tin giao hàng </FormLabel>
                <RadioGroup
                    name="thongtingiaohang"
                    value={infor.iddc}
                    onChange={e=>setInfor(prevState =>({
                        ...prevState,
                        iddc: e.target.value
                    }))}>
                    {diaChi.map(e=>(
                        <FormControlLabel onClick={()=>{setShowForm(false)}}  key={e.iddc} value={e.iddc} control={<Radio />} label={e.ho +' '+ e.ten + " | "+e.sdt+" | "+e.diachi} />
                    ))}
                    <FormControlLabel onClick={()=>{setShowForm(true)}} value="" control={<Radio />} label="Khác..."/>
                </RadioGroup>
            </Box>
            {showForm && (
                <Box>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}><InputText form={form} name="ho" label="Họ"/></Grid>
                        <Grid item xs={4}><InputText form={form} name="ten" label="Tên"/></Grid>
                        <Grid item xs={4}><InputText form={form} name="sdt" label="số điện thoại"/></Grid>
                    </Grid>

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
                       <div>
                           <Button
                               type="submit"
                               color="primary"
                               variant="contained"
                               style={{textTransform: 'none'}}
                           >
                               Thêm
                           </Button>
                       </div>
                    </form>

                </Box>
            )}
            <Divider style={{margin: '1rem 0'}}/>
            <Box >
                <Grid container>
                    <Grid item xs={2}>
                        <Avatar variant="square" style={{width: '8rem', height: '8rem'}}
                                src={props.hinh_anh}/>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h5">{props.tensach}</Typography>
                        <div>
                            <Typography component="span">Số lượng: </Typography>
                            <Typography component="span">{props.soluong}</Typography>
                        </div>
                        <Typography component="span" variant="h5" color="secondary">
                            {props.phan_tram ? fCurrency(props.gia_sach * (100 - props.phan_tram) / 100) : fCurrency(props.gia_sach)}
                        </Typography>

                        {props.phan_tram && <> <Typography
                            component="span"
                            variant="body1"
                            style={{
                                color: 'text.disabled',
                                textDecoration: 'line-through',
                                marginLeft: '1rem'
                            }}
                        >
                            {fCurrency(props.gia_sach)}
                        </Typography> <Chip
                            style={{margin: '0 0 .5rem 1rem'}}
                            color="secondary"
                            size="small"
                            label={'-' + props.phan_tram + "%"}
                        /></>
                        }
                    </Grid>
                </Grid>
            </Box>
            <Divider style={{margin: '1rem 0'}}/>
            <Typography component="span" variant="h4">Tổng thanh toán: </Typography>
            <Typography component="span"  variant="h4" color="secondary">{fCurrency(infor.gia)}</Typography>
          <Box my={1} style={{textAlign: "center"}}>
              {infor.iddc && (
                  <PayPalButton
                      amount={infor.gia}
                      options={options}
                      onSuccess={onSuccess}
                      onError={onError}
                  />
              )}

              {!infor.iddc && (<>
                  <Divider style={{margin: '1rem 0'}}/>
                  <Typography>Vui lòng chọn thông tin để thanh toán</Typography>
              </>)}
          </Box>
        </Box>
    );
}

export default Checkout;