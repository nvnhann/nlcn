import React, {useEffect, useState} from 'react';
import {
    Button,
    Paper,
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

function DonHang() {
    const [hoadon, setHoadon] = useState([]);

    useEffect(()=>{
        (async ()=>{
            const res = await HoaDonAPI.get();
            setHoadon(res)
        })()
    },[]);

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
                        {hoadon.hd?.map((e,i)=>(

                            <TableRow key={i}>
                                <TableCell>{e.idhd}</TableCell>
                                <TableCell>{formatDateTime(e.thoi_gian)}</TableCell>
                                <TableCell>
                                    <ol>
                                        {hoadon.cthd.map((ev,i)=>(
                                            (ev.idhd === e.idhd ) && (
                                                <li key={i}>{ev.tensach + '(sl: '+ev.so_luong+')'}</li>
                                            )
                                        ))}
                                    </ol>
                                </TableCell>
                                <TableCell>
                                    <ol>
                                        {hoadon.cthd.map((ev,i)=>(
                                            (ev.idhd === e.idhd ) && (
                                                <li key={i}>{ ev.phan_tram ? fCurrency(ev.gia)+'(-'+ev.phan_tram+'%)' : fCurrency(ev.gia)}</li>
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
                                            color="secondary">hủy</Button>
                                    )}
                                    {(e.trang_thai === 3) && (
                                        <Button variant="contained" disabled>
                                            Yêu cầu hủy
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default DonHang;