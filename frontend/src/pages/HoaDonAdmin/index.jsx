import React, {useEffect, useState} from 'react';
import Page from "../../Component/Page";
import {
    Avatar,
    Box,
    Button, Chip,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Divider, Grid,
    IconButton,
    Slide,
    TextField,
    Typography
} from "@material-ui/core";
import {Icon} from "@iconify/react";
import {escapeRegExp} from "../../ultils/escapRegExp";
import HoaDonAPI from "../../API/HoaDonAPI";
import {formatDateTime} from "../../ultils/formatDateTime";
import {DataGrid} from "@mui/x-data-grid";
import {fCurrency} from "../../ultils/fCurrentcy";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function HoaDonAdmin() {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState({});
    const [filterData, setFilterData] = useState(data);
    const [ref, setRef] = useState(0);
    const [open, setOpen] = useState(false);
    const [idhd, setIdhd] = useState('')
    const requestSearch = (searchValue) => {
        if (searchValue === '') {
            setSearchText(searchValue);
            return setFilterData(data);
        }
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = data.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        return setFilterData(filteredRows);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpen(false);
    };

    useEffect(() => {
        (async () => {
            const res = await HoaDonAPI.getAll();
            setData(res);
            setFilterData(res);
        })();
    }, [ref]);


    const columns = [
        {
            field: 'action',
            headerName: 'Hành động',
            width: 250,
            renderCell: (params) => (
                <>
                    <strong>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{textTransform: 'none', marginRight: '1rem'}}
                            size="small"
                        >
                            Xác nhận
                        </Button>
                    </strong>

                    <strong>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{textTransform: 'none', marginRight: '1rem'}}
                            size="small"
                        >
                            Hủy
                        </Button>
                    </strong>
                    <strong>
                        <IconButton onClick={()=>{
                            handleClickOpen()
                            setIdhd(params.row.id);
                        }}> <Icon icon="ei:eye"/></IconButton>
                    </strong>
                </>
            ),
        },
        {
            field: 'id',
            headerName: 'ID hóa đơn',
            width: 200,
        },
        {
            field: 'idtk',
            headerName: 'ID user',
            width: 200,
        },
        {
            field: 'sach',
            headerName: 'Sách',
            width: 500,
        },
        {
            field: 'ttgh',
            headerName: 'Thông tin giao hàng',
            width: 500,
        },
        {
            field: 'tong_gia',
            headerName: 'Tổng đơn',
            width: 200,
        },
        {
            field: 'email_paypal',
            headerName: 'Email Paypal',
            width: 300,
        },
        {
            field: 'thoi_gian',
            headerName: 'Thời gian',
            width: 300,
        },
    ];

    const rows = [];

    const ttensach = (a,e)=>{
        let tensach = '';
        a.map((ev) => {
            if(ev.idhd === e.idhd) {
                tensach+=ev.tensach;
            }
        })
        return tensach
    }
    filterData?.hd?.forEach((e) => {
        rows.push({
            id: e.idhd,
            idtk: e.idtk,
            sach: ttensach(filterData.cthd,e)
            ,
            ttgh: e.ho + ' ' + e.ten + ' - ' + e.sdt + ' - ' + e.diachi,
            email_paypal: e.email_paypal,
            tong_gia: fCurrency(e.tong_gia),
            thoi_gian: formatDateTime(e.thoi_gian),
            action: e.idhd,
        });
    });

    return (
        <Page title="Hóa đơn">
            <Typography color="primary" variant="h4" gutterBottom>
                Hóa đơn
            </Typography>
            <Box my={2}>
                <TextField
                    value={searchText}
                    onChange={(e) => requestSearch(e.target.value)}
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
                                style={{visibility: searchText ? 'visible' : 'hidden'}}
                                onClick={() => requestSearch('')}
                            >
                                <Icon icon="ic:outline-clear" color="#6b7280"/>
                            </IconButton>
                        ),
                    }}
                />
            </Box>
            <Box>
                <div style={{height: 390, width: '100%'}}>
                    <div style={{height: 390, width: '100%'}}>
                        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]}/>
                    </div>
                </div>
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
                                                {e.ho + ' ' + e.ten}
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
                        <Button
                            color="primary"
                            variant="contained"
                            style={{ textTransform: 'none' }}
                        >
                            Xác nhận
                        </Button>
                        <Button onClick={handleClose} style={{ textTransform: 'none' }}>
                            Đóng
                        </Button>
                    </DialogActions>
                </SimpleBar>
            </Dialog>
        </Page>
    );
}

export default HoaDonAdmin;