import React, {useEffect, useState} from 'react';
import Page from "../../Component/Page";
import {
    Avatar,
    Box,
    Button, Chip,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Divider, Grid,
    IconButton, List, ListItem, ListItemIcon, ListItemText,
    Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import {Icon} from "@iconify/react";
import HoaDonAPI from "../../API/HoaDonAPI";
import {formatDateTime} from "../../ultils/formatDateTime";
import {fCurrency} from "../../ultils/fCurrentcy";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import {useSnackbar} from "notistack";
import {Pagination} from "@material-ui/lab";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function HoaDonAdmin() {
    const [openX, setOpenX] = useState(false);
    const [openH, setOpenH] = useState(false);
    const [data, setData] = useState({});
    const [filterData, setFilterData] = useState(data);
    const [open, setOpen] = useState(false);
    const [idhd, setIdhd] = useState('');
    const [ref, setRef] = useState(0);
    const {enqueueSnackbar} = useSnackbar();
    const [filter, setFilter] = useState({
        tong_gia: '',
        thoi_gian: '',
        search: ''
    });
    const [page, setPage] = React.useState(1);

    const handlePage = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        (async () => {
            const f = filter;
            f.page = page;
            const res = await HoaDonAPI.getAll(f);
            setData(res);
            setFilterData(res);
        })();
    }, [ref, filter]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpen(false);
    };

    const handleClickOpenH = () => {
        setOpenH(true);
    };

    const handleCloseH = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpenH(false);
    };

    const handleClickOpenX = () => {
        setOpenX(true);
    };

    const handleCloseX = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpenX(false);
    };


    const XacNhan = async () => {
        try {
            await HoaDonAPI.xacnhan(idhd);
            enqueueSnackbar('Xác nhận đơn hàng thành công', {variant: 'success', autoHideDuration: 2000});
            setRef(e => e + 1);
            handleCloseH();
            setIdhd('');
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000});
        }
    }

    const XacNhanHuy = async () => {
        try {
            await HoaDonAPI.xacnhanhuy(idhd);
            enqueueSnackbar('Xác nhận hủy đơn hàng thành công', {variant: 'success', autoHideDuration: 2000});
            setRef(e => e + 1);
            handleCloseX();
            setIdhd('');
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000});
        }
    }


    return (
        <Page title="Hóa đơn">
            <Box my={2}>
                <TextField
                    value={filter.search}
                    onChange={(e) => setFilter(prevState => ({
                        ...prevState, search: e.target.value
                    }))}
                    style={{width: '40ch'}}
                    variant="standard"
                    placeholder="Tìm kiếm ..."
                    InputProps={{
                        startAdornment: (
                            <IconButton>
                                <Icon icon="bi:search" color="#6b7280"/>
                            </IconButton>
                        ),
                        endAdornment: (
                            <IconButton
                                title="Clear"
                                aria-label="Clear"
                                size="small"
                                style={{visibility: filter.search ? 'visible' : 'hidden'}}
                                onClick={() => setFilter(prevState => ({
                                    ...prevState, search: ''
                                }))}
                            >
                                <Icon icon="ic:outline-clear" color="#6b7280"/>
                            </IconButton>
                        ),
                    }}
                />
            </Box>
            <Box>
                <TableContainer style={{height: '37rem'}}>
                    <Table>
                        <TableHead style={{backgroundColor: '#6b7280'}}>
                            <TableRow>
                                <TableCell align="center" style={{color: '#fff'}}>
                                    ID Hoá đơn
                                </TableCell>
                                <TableCell align="center" style={{color: '#fff'}}>
                                    Họ và tên
                                </TableCell>
                                <TableCell align="center" style={{color: '#fff'}}>Email Paypal</TableCell>
                                <TableCell align="center" style={{color: '#fff'}}>Sách</TableCell>
                                <TableCell align="center" style={{color: '#fff',width: '10rem'}}>
                                    Tổng giá
                                    {filter.tong_gia === 'DESC' ? (<IconButton onClick={() => {
                                        setFilter(prevState => ({
                                            ...prevState, thoi_gian: '', tong_gia: 'ASC'
                                        }))
                                    }}>
                                        <Icon icon="akar-icons:arrow-down" color="#fff"/>
                                    </IconButton>) : (<IconButton
                                        onClick={() => {
                                            setFilter(prevState => ({
                                                ...prevState, thoi_gian: '', tong_gia: 'DESC'
                                            }))
                                        }}
                                    >
                                        <Icon icon="akar-icons:arrow-up" color="#fff"/>
                                    </IconButton>)}
                                </TableCell>
                                <TableCell align="center" style={{color: '#fff'}}>Thời gian
                                    {filter.thoi_gian === 'DESC' ? (<IconButton onClick={() => {
                                        setFilter(prevState => ({
                                            ...prevState, tong_gia: '', thoi_gian: 'ASC'
                                        }))
                                    }}>
                                        <Icon icon="akar-icons:arrow-down" color="#fff"/>
                                    </IconButton>) : (<IconButton
                                        onClick={() => {
                                            setFilter(prevState => ({
                                                ...prevState, tong_gia: '', thoi_gian: 'DESC'
                                            }))
                                        }}
                                    >
                                        <Icon icon="akar-icons:arrow-up" color="#fff"/>
                                    </IconButton>)}
                                </TableCell>
                                <TableCell align="center" style={{color: '#fff', width: '15rem'}}>
                                    Hành động
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {/*table body*/}
                        <TableBody>
                            {filterData?.hd?.map(e => (<TableRow key={e.idtg}>
                                <TableCell align="center">{e.idhd}</TableCell>
                                <TableCell align="center">{e.hoten}</TableCell>
                                <TableCell align="center">{e.email_paypal}</TableCell>
                                <TableCell>
                                    <List >
                                    {filterData?.cthd?.map((ev,i)=>(
                                        (ev.idhd === e.idhd) && (
                                            <ListItem key={i}>
                                                <ListItemIcon>
                                                    <Icon icon="emojione-monotone:green-book" />
                                                </ListItemIcon>
                                                <ListItemText primary={ev.tensach} />
                                            </ListItem>
                                        )
                                    ))}
                                    </List>
                                </TableCell>
                                <TableCell align="center">{'$'+e.tong_gia}</TableCell>
                                <TableCell align="center">{formatDateTime(e.thoi_gian)}</TableCell>

                                <TableCell align="center">
                                        {(e.trang_thai === 0) && (
                                            <>
                                                    <Button
                                                        variant="contained"
                                                        onClick={()=>{
                                                            handleClickOpenH();
                                                            setIdhd(e.idhd);
                                                        }}
                                                        color="primary"
                                                        style={{textTransform: 'none', marginRight: '1rem'}}
                                                        size="small"
                                                    >
                                                        Xác nhận
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={()=>{
                                                            handleClickOpenX();
                                                            setIdhd(e.idhd);
                                                        }}
                                                        style={{textTransform: 'none', marginRight: '1rem'}}
                                                        size="small"
                                                    >
                                                        Hủy
                                                    </Button>
                                                    <IconButton onClick={()=>{
                                                        handleClickOpen()
                                                        setIdhd(e.idhd);
                                                    }}> <Icon icon="ei:eye"/></IconButton>
                                            </>
                                        )}
                                        {(e.trang_thai === 2) && (
                                            <>
                                                <Button
                                                    disabled
                                                    style={{textTransform: 'none', color: '#b26500'}}
                                                >
                                                    Đã xác nhận
                                                </Button>
                                                <IconButton onClick={()=>{
                                                    handleClickOpen()
                                                    setIdhd(e.idhd);
                                                }}> <Icon icon="ei:eye"/></IconButton>
                                            </>

                                        )}

                                        {(e.trang_thai === 4) && (
                                            <>
                                                <Button
                                                    disabled
                                                    style={{textTransform: 'none', color: '#ab003c'}}
                                                >
                                                    Đã hủy
                                                </Button>
                                            </>

                                        )}

                                        {(e.trang_thai === 3) && (
                                            <>
                                                <Button
                                                    style={{textTransform: 'none'}}
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={()=>{
                                                        handleClickOpenX()
                                                        setIdhd(e.idhd);
                                                    }}
                                                >
                                                    Yêu cầu hủy
                                                </Button>
                                                <IconButton onClick={()=>{
                                                    handleClickOpen()
                                                    setIdhd(e.idhd);
                                                }}> <Icon icon="ei:eye"/></IconButton>
                                            </>

                                        )}
                                </TableCell>
                            </TableRow>))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container style={{margin: '1rem 0', position: "relative"}}>
                    <Grid item xs={9}>
                        <Pagination size="small" count={Math.ceil(filterData?.hd ? filterData.hd[0]?.so_luong / 10 : 1)} color="primary"
                                    page={page} onChange={handlePage}/>

                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            // onClick={ExportExcel}
                            variant="contained"
                            style={{position: 'absolute', textTransform: 'none', right: 0}}
                            color="primary"
                            startIcon={<Icon icon="entypo:download" color="#ffffff"/>}
                        >
                            Tải về
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Dialog
                fullWidth
                maxWidth="md"
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}>
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
                        <Icon icon="majesticons:close" color="#6b7280" />
                    </IconButton>
                </DialogTitle>
                <SimpleBar style={{ maxHeight: 500 }}>
                    <DialogContent>
                        {filterData?.hd?.map(e=>(
                            (e.idhd === idhd) && (
                                <Box key={e.idhd}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography component="span" style={{marginRight: '1rem'}} color="secondary">
                                                IDHĐ:
                                            </Typography>

                                            <Typography component="span">
                                                {e.idhd}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography component="span" style={{marginRight: '1rem'}} color="secondary">
                                                IDTK:
                                            </Typography>

                                            <Typography component="span">
                                                {e.idtk}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography component="span" style={{marginRight: '1rem'}} color="secondary">
                                                Họ tên:
                                            </Typography>

                                            <Typography component="span">
                                                {e.hoten}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography component="span" style={{marginRight: '1rem'}} color="secondary">
                                               Sđt:
                                            </Typography>

                                            <Typography component="span">
                                                {e.sdt}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography component="span" style={{marginRight: '1rem'}} color="secondary">
                                               Thời gian:
                                            </Typography>

                                            <Typography component="span">
                                                {formatDateTime(e.thoi_gian)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography component="span" style={{marginRight: '1rem'}} color="secondary">
                                                Địa chỉ:
                                            </Typography>

                                            <Typography component="span">
                                                {e.diachi}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Box>
                                        {filterData.cthd.map((ev, index) => (
                                            (ev.idhd === e.idhd) &&(
                                                <div key={index}>
                                                    <Divider style={{margin: '1rem 0'}}/>
                                                    <Box>
                                                        <Grid container>
                                                            <Grid item xs={2}>
                                                                <Avatar variant="square" style={{width: '8rem', height: '8rem'}}
                                                                        src={ev.hinhanh}/>
                                                            </Grid>
                                                            <Grid item xs={10}>
                                                                <Typography variant="h5">{ev.tensach}</Typography>
                                                                <div>
                                                                    <Typography component="span">Số lượng: </Typography>
                                                                    <Typography component="span">{ev.so_luong}</Typography>
                                                                </div>
                                                                <Typography component="span" variant="h5" color="secondary">
                                                                    {!!ev.phan_tram ? fCurrency(ev.gia * (100 - ev.phan_tram) / 100) : fCurrency(ev.gia)}
                                                                </Typography>

                                                                {!!ev.phan_tram && <> <Typography
                                                                    component="span"
                                                                    variant="body1"
                                                                    style={{
                                                                        color: 'text.disabled',
                                                                        textDecoration: 'line-through',
                                                                        marginLeft: '1rem'
                                                                    }}
                                                                >
                                                                    {fCurrency(ev.gia)}
                                                                </Typography> <Chip
                                                                    style={{margin: '0 0 .5rem 1rem'}}
                                                                    color="secondary"
                                                                    size="small"
                                                                    label={'-' + ev.phan_tram + "%"}
                                                                /></>
                                                                }
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </div>
                                            )
                                        ))}
                                    </Box>
                                    <Divider  style={{margin: '1rem 0'}} />
                                    <Typography component="span" variant="h4">Tổng hóa đơn: </Typography>
                                    <Typography component="span" variant="h4" color="secondary">{fCurrency(e.tong_gia)}</Typography>
                                </Box>
                            )
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{
                            handleClose();
                            setIdhd('')
                        }} style={{ textTransform: 'none' }}>
                            Đóng
                        </Button>
                    </DialogActions>
                </SimpleBar>
            </Dialog>

            <Dialog
                fullWidth
                maxWidth="xs"
                open={openX}
                onClose={handleCloseX}
                TransitionComponent={Transition}>
                <DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseX}
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
                    <Typography style={{margin: '1rem 0'}} align="center" color="secondary" variant="h5">Xác nhận hủy đơn hàng</Typography>
                </DialogContent>

                <DialogActions>
                    <Button
                        color="primary"
                        variant="contained"
                        style={{ textTransform: 'none' }}
                        onClick={XacNhanHuy}
                    >
                        Xác nhận
                    </Button>
                    <Button onClick={handleCloseX} style={{ textTransform: 'none' }}>
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                fullWidth
                maxWidth="xs"
                open={openH}
                onClose={handleCloseH}
                TransitionComponent={Transition}>
                <DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseH}
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
                    <Typography style={{margin: '1rem 0'}} align="center" color="secondary" variant="h5">Xác nhận đơn hàng</Typography>
                </DialogContent>

                <DialogActions>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={XacNhan}
                        style={{ textTransform: 'none' }}
                    >
                        Xác nhận
                    </Button>
                    <Button onClick={handleCloseH} style={{ textTransform: 'none' }}>
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>

        </Page>
    );
}

export default HoaDonAdmin;