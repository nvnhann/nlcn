import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip, Dialog, DialogContent, DialogTitle,
    Divider, FormControlLabel,
    Grid, IconButton,
    Paper, Slide,
    TextField,
    Toolbar,
    Typography,
} from '@material-ui/core';
import {Rating} from '@material-ui/lab';
import React, {useEffect, useState} from 'react';
import {useMatch} from 'react-router-dom';
import SachApi from '../../API/SachAPI';
import Page from '../../Component/Page';
import {Icon} from '@iconify/react';
import {useDispatch, useSelector} from 'react-redux';
import {addtoCart} from '../../Store/cartSlice';
import {fCurrency} from "../../ultils/fCurrentcy";
import {useSnackbar} from "notistack";
import DiaChiAPI from "../../API/DiaChiAPI";
import Checkout from "../../Component/Checkout";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import {shortString} from "../../ultils/shortString";
import ReviewAPI from "../../API/ReviewAPI";
import {formatDateTime} from "../../ultils/formatDateTime";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {use} from "express/lib/router";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function ProductDetail() {
    const match = useMatch('/app/:idsach');
    const idsach = match.params.idsach;
    const [soluong, setSoluong] = useState(1);
    const [sach, setSach] = useState([]);
    const isLogin = !!useSelector((state) => state.user.current.email);
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const [diaChi, setDiachi] = useState([]);
    const [open, setOpen] = useState(false);
    const [sachCK, setSachCK] = useState([sach]);
    const [show, setShow] = useState(true);
    const [review, setReview] = useState({rating: 5, comment: '', idsach: idsach});
    const [dataRv, setDataRv] = useState([]);
    const [refrv, setRefrv] = useState(0);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpen(false);
    };


    const addCart = () => {
        dispatch(
            addtoCart({
                idsach: sach.idsach,
                tensach: sach.tensach,
                gia_sach: sach.gia_sach,
                so_luong: parseInt(soluong),
                hinh_anh: sach.hinhanh,
            })
        );
    };
    useEffect(() => {
        (async () => {
            const res = await SachApi.getById(idsach);
            setSach(res);
            setSachCK([{
                idsach: res.idsach,
                tensach: res.tensach,
                phan_tram: res.phan_tram,
                gia_sach: res.gia_sach,
                so_luong: parseInt(soluong),
                hinh_anh: res.hinhanh,
            }])
            if (isLogin) {
                const diachi = await DiaChiAPI.get();
                setDiachi(diachi);
            }
        })();
    }, [isLogin, soluong]); // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        (async () => {
            const rv = await ReviewAPI.getById(idsach);
            setDataRv(rv);
        })()
    }, [refrv]);


    const checkout = async () => {
        if (!isLogin) {
            enqueueSnackbar('Vui lòng đăng nhập để thanh toán', {variant: 'error', autoHideDuration: 2000});
        } else {
            handleClickOpen();
        }
    }

    const handleSubmitComment = async () => {
        try {
            await ReviewAPI.create(review);
            setRefrv(e=>e+1);
            setReview(prevState => ({
                ...prevState,
                comment: ''
            }))
        } catch (error) {
            console.log(error);
        }

    }



    return (
        <Page title={sach.tensach}>
            <Box>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item xs={4}>
                            <CardMedia component="img" image={sach.hinhanh} style={{boxShadow: '16px'}}/>
                            <Grid container style={{marginTop: '1rem'}}>
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        style={{textTransform: 'none', width: '80%'}}
                                        startIcon={<Icon icon="emojione-monotone:shopping-cart"/>}
                                        onClick={() => {
                                            addCart();
                                        }}
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{textTransform: 'none', width: '80%'}}
                                        onClick={checkout}
                                    >
                                        Mua ngay
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            <Card>
                                <AppBar position="static" elevation={0}>
                                    <Toolbar style={{padding: '.5rem'}}>
                                        <Typography color="inherit" variant="h4">
                                            {sach.tensach}
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography component="span">Nhà xuất bản: </Typography>
                                            <Typography component="span" color="secondary">
                                                {sach.tennxb}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography component="span">Tác giả: </Typography>
                                            <Typography component="span" color="secondary">
                                                {sach.hotentg}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography component="span">Nhà cung cấp: </Typography>
                                            <Typography component="span" color="secondary">
                                                {sach.tenncc}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography component="span">Hình thức bìa: </Typography>
                                            <Typography component="span" color="secondary">
                                                {sach.hinh_thuc_bia}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Rating name="read-only" value={Number.parseFloat(sach?.danhgia)} precision={0.1} readOnly/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography component="span" variant="h5" color="secondary">
                                                {sach.phan_tram ? fCurrency(sach.gia_sach * (100 - sach.phan_tram) / 100) : fCurrency(sach.gia_sach)}
                                            </Typography>

                                            {sach.phan_tram && <> <Typography
                                                component="span"
                                                variant="body1"
                                                style={{
                                                    color: 'text.disabled',
                                                    textDecoration: 'line-through',
                                                    marginLeft: '1rem'
                                                }}
                                            >
                                                {fCurrency(sach.gia_sach)}
                                            </Typography> <Chip
                                                style={{margin: '0 0 .5rem 1rem'}}
                                                color="secondary"
                                                size="small"
                                                label={'-' + sach.phan_tram + "%"}
                                            /></>
                                            }
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" component="span">
                                                Số lượng:
                                            </Typography>
                                            <TextField
                                                style={{margin: '0 0 2rem 1rem'}}
                                                variant="outlined"
                                                id="title1"
                                                label="Số lượng"
                                                type="number"
                                                value={soluong}
                                                onChange={(e) => {
                                                    if (e.target.value < 1) return setSoluong(1);
                                                    else if (e.target.value > sach.so_luong) return setSoluong(sach.so_luong);
                                                    else setSoluong(e.target.value);
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Divider style={{margin: '1rem 0'}}/>
                                    <Typography style={{margin: '1rem 0'}} color="primary" variant="h4">
                                        Thông tin chi tiết
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography component="span">Mã sách: </Typography>
                                            <Typography component="span" color="secondary">
                                                {sach.idsach}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography component="span">Ngôn ngữ: </Typography>
                                            <Typography component="span" color="secondary">
                                                {sach.ngon_ngu}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography component="span">Thể loại: </Typography>
                                            <Typography component="span" color="secondary">
                                                {sach.tentl}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography component="span">Kích thướt: </Typography>
                                            <Typography component="span" color="secondary">
                                                {sach.kt_doc + 'x' + sach.kt_ngang + ' cm'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography component="span">Số trang: </Typography>
                                            <Typography component="span" color="secondary">
                                                {sach.so_trang}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography component="span">Trọng lượng: </Typography>
                                            <Typography component="span" color="secondary">
                                                {sach.trong_luong + ' gram'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography component="span">Hình thức bìa: </Typography>
                                            <Typography component="span" color="secondary">
                                                {sach.hinh_thuc_bia}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider style={{margin: '1rem 0'}}/>
                                    <Typography component="div" style={{whiteSpace: 'pre-line'}}>
                                        {show ? shortString(sach.mo_ta) + ' ...' : sach.mo_ta}
                                    </Typography>
                                    <Box textAlign="center">
                                        {show ? (<Button variant="outlined"
                                                         onClick={() => setShow(false)}
                                                         color="primary"
                                                         style={{
                                                             textTransform: 'none',
                                                             width: '12rem',
                                                             margin: '.5rem 0'
                                                         }}
                                        >
                                            Xem thêm
                                        </Button>) : (<Button variant="outlined"
                                                              onClick={() => setShow(true)}
                                                              color="primary"
                                                              style={{
                                                                  textTransform: 'none',
                                                                  width: '12rem',
                                                                  margin: '.5rem 0'
                                                              }}
                                        >
                                            Thu gọn
                                        </Button>)}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container style={{marginTop: '1rem'}}>
                        {isLogin ? ( <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <form style={{width: '90%', margin: '0 auto'}}>
                                        <FormControlLabel
                                            style={{margin: '0 1rem'}}
                                            control={
                                                <>
                                                    <input
                                                        name="rating"
                                                        type="number"
                                                        value={review.rating}
                                                        hidden
                                                        readOnly
                                                    />
                                                    <Rating
                                                        value={review.rating}
                                                        onChange={(_, value) => setReview(prevState => ({
                                                            ...prevState, rating: value
                                                        }))}
                                                        name="rating"
                                                        icon={<StarBorderIcon fontSize="inherit"/>}
                                                        precision={1}
                                                    />
                                                </>
                                            }
                                        />

                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={review.comment}
                                            onChange={(e) => setReview(prevState => ({
                                                ...prevState,
                                                comment: e.target.value
                                            }))}
                                            id="title"
                                            label="Bình luận"
                                            name="title"
                                            autoFocus
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSubmitComment}
                                            style={{textTransform: 'none'}}
                                        >
                                            Thêm
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </Grid>) : (<Typography color="primary" variant="h5" style={{margin: '1rem'}}>Đăng nhập để bình luân - đánh giá</Typography>  )}
                    </Grid>
                    <Card>
                        <AppBar  position="static" elevation={0}>
                            <Toolbar>
                                <Typography color="inherit" variant="h4">
                                    Bình luận đánh giá sản phẩm
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <CardContent>
                            {dataRv.map(e => (
                                <div key={e.idbldg}>
                                    <Grid container style={{marginTop: '1rem'}}>
                                        <Grid item xs={2}>
                                            <Typography variant="h6" color="primary">{`${e.ho||' '} ${e.ten || '' }`}</Typography>
                                            <Typography color="primary">{formatDateTime(e.thoi_gian)}</Typography>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Rating
                                                value={e.danhgia}
                                                name="ratingg"
                                                icon={<StarBorderIcon fontSize="inherit"/>}
                                            />
                                            <Typography style={{textAlign: 'justify'}}>
                                                {e.binhluan}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </Paper>
            </Box>
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
                            sach={sachCK}
                            closeDialog={handleClose}
                            tong_gia={sach.phan_tram ? sach.gia_sach * (100 - sach.phan_tram) * soluong / 100 : sach.gia_sach * soluong}
                        />
                    </DialogContent>
                </SimpleBar>
            </Dialog>
        </Page>
    );
}

export default ProductDetail;
