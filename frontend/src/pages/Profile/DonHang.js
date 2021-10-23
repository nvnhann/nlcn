import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog, DialogActions,
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
    Typography
} from "@material-ui/core";
import HoaDonAPI from "../../API/HoaDonAPI";
import {formatDateTime} from "../../ultils/formatDateTime";
import {fCurrency} from "../../ultils/fCurrentcy";
import {Icon} from "@iconify/react";
import {useSnackbar} from "notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function DonHang() {
    const [hoadon, setHoadon] = useState([]);
    const [open, setOpen] = useState(false);
    const [idhd, setIdhd] = useState('');
    const [ref, setRef] = useState(0);
    const {enqueueSnackbar} = useSnackbar();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpen(false);
    };


    useEffect(() => {
        (async () => {
            const res = await HoaDonAPI.get();
            setHoadon(res)
        })()
    }, [ref]);

    const HuyDon = async ()=>{
        try{
            await HoaDonAPI.huydon(idhd);
            setRef(e=>e+1);
            enqueueSnackbar('Gửi yêu cầu thành công', {variant: 'success', autoHideDuration: 2000});
            handleClose();

        }catch (error){
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000});
        }
    }
    const tableHead = [{
        name: 'Đơn hàng'
    },
        {
            name: 'Ngày'
        },
        {
            name: 'Sách'
        },
        {
            name: 'Giá'
        },
        {
            name: 'Tổng giá'
        },
        {
            name: 'Trạng thái'
        },
        {
            name: 'Hành động'
        }
    ]
    return (
        <Paper elevation={3} style={{padding: '1rem'}}>
            <TableContainer>
                <Table>
                    <TableHead style={{backgroundColor: '#6b7280'}}>
                        <TableRow>
                            {tableHead.map((e, index) => (
                                <TableCell style={{color: '#fff', textAlign: 'center', fontSize: '1rem'}}
                                           key={index}>
                                    {e.name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hoadon.hd?.map((e, i) => (

                            <TableRow key={i}>
                                <TableCell>{e.idhd}</TableCell>
                                <TableCell>{formatDateTime(e.thoi_gian)}</TableCell>
                                <TableCell>
                                    <ol>
                                        {hoadon.cthd.map((ev, i) => (
                                            (ev.idhd === e.idhd) && (
                                                <li key={i}>{ev.tensach + '(sl: ' + ev.so_luong + ')'}</li>
                                            )
                                        ))}
                                    </ol>
                                </TableCell>
                                <TableCell>
                                    <ol>
                                        {hoadon.cthd.map((ev, i) => (
                                            (ev.idhd === e.idhd) && (
                                                <li key={i}>{ev.phan_tram ? fCurrency(ev.gia) + '(-' + ev.phan_tram + '%)' : fCurrency(ev.gia)}</li>
                                            )
                                        ))}
                                    </ol>
                                </TableCell>
                                <TableCell>{fCurrency(e.tong_gia)}</TableCell>
                                <TableCell style={{textAlign: 'center', fontSize: '1rem'}}>
                                    {(e.trang_thai === 0) && (
                                        <div style={{color: '#3f51b5'}}>
                                            Đang chờ xác nhận
                                        </div>
                                    )}

                                    {(e.trang_thai === 3) && (
                                        <div className="font-bold text-10 text-gray-500 ">
                                            Đang yêu cầu hủy
                                        </div>
                                    )}
                                    {(e.trang_thai === 4) && (
                                        <Button
                                            disabled
                                            color="secondary">
                                            Đã hủy
                                        </Button>
                                    )}
                                    {(e.trang_thai === 2) && (
                                        <Button
                                            disabled
                                            color="secondary">
                                            Đã xác nhận
                                        </Button>
                                    )}


                                </TableCell>
                                <TableCell>
                                    {(e.trang_thai === 0) && (
                                        <Button
                                            variant="contained"
                                            style={{textTransform: 'none'}}
                                            onClick={()=>{
                                                handleClickOpen();
                                                setIdhd(e.idhd)
                                            }}
                                            color="secondary">hủy</Button>
                                    )}

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}

            >
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
                <DialogContent>
                    <Typography style={{margin: '1rem 0'}}>
                        Bạn muốn hủy đơn hàng. Đơn hàng sẽ được hoàn tiền trong 3 ngày.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={HuyDon}
                        color="primary"
                        variant="contained"
                        style={{ textTransform: 'none' }}
                    >
                      Đồng ý
                    </Button>
                    <Button onClick={handleClose} style={{ textTransform: 'none' }}>
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}

export default DonHang;