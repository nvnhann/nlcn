import {Icon} from '@iconify/react';
import {
    AppBar,
    Avatar,
    Box,
    Button, CardMedia, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, Toolbar,
    Typography,
} from '@material-ui/core';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import Page from '../../Component/Page';
import {Controller, useForm} from 'react-hook-form';
import InputText from '../../Component/Form-control/InputText';
import TheLoaiAPI from '../../API/TheLoaiAPI';
import tacGiaApi from '../../API/tacGiaApi';
import NgonNguAPI from '../../API/NgonNguAPI';
import NhaXuatBanAPI from '../../API/NhaXuatBanAPI';
import KichThuotAPI from '../../API/KichThuotAPI';
import NhaCungCapAPI from '../../API/NhaCungCapAPI';
import SachAPI from '../../API/SachAPI';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import {useSnackbar} from 'notistack';
import {Pagination} from "@material-ui/lab";
import sachAPI from "../../API/SachAPI";
import {fCurrency} from "../../ultils/fCurrentcy";
import {shortString} from "../../ultils/shortString";
import XLSX from 'xlsx';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Book() {
    const {enqueueSnackbar} = useSnackbar();
    const [data, setData] = useState([]);
    const [tacgia, setTacgia] = useState([]);
    const [ngonngu, setNgonNgu] = useState([]);
    const [nhaxuatban, setNhaxuatban] = useState([]);
    const [kichthuot, setKichThuot] = useState([]);
    const [nhacungcap, setNhacungcap] = useState([]);
    const [theloai, setTheloai] = useState([]);
    const [filterData, setFilterData] = useState(data);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [filenameE, SetfilenameE] = useState('');
    const [filename, Setfilename] = useState('');
    const [count, setCount] = useState(0);
    const [idsach, setIdsach] = useState('');
    const [tensach, setTenSach] = useState('');
    const [show, setShow] = useState(true);
    const [filter, setFilter] = useState({
        idsach: 'ASC',
        tensach: '',
        search: '',
        gia: '',
        so_luong: '',
        khuyen_mai: ''
    })
    const [page, setPage] = useState(1);
    const [ctsach, setCTsach] = useState({});

    const handlePage = (event, value) => {
        setPage(value);
    };

    const ExportExcel = async () =>{
        const res = await sachAPI.getExcel();
        /// console.log(res)
        const workSheet = XLSX.utils.json_to_sheet(res);
        const workBook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workBook, workSheet, "Sach");
        XLSX.write(workBook, {bookType: "xlsx", type: "buffer"});
        XLSX.write(workBook, {bookType: "xlsx", type: "binary"});
        XLSX.writeFile(workBook, "Sach.xlsx")

    }

    useEffect(() => {
        (async () => {
            setTacgia(await tacGiaApi.get());
            setNgonNgu(await NgonNguAPI.get());
            setNhaxuatban(await NhaXuatBanAPI.get());
            setKichThuot(await KichThuotAPI.get());
            setNhacungcap(await NhaCungCapAPI.get());
            setTheloai(await TheLoaiAPI.get());
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const f = filter;
            f.page = page;
            const res = await SachAPI.get(f);
            setData(res);
            setFilterData(res);
        })();
    }, [count, filter, page]);

    const schema = yup.object().shape({
        trong_luong: yup
            .number()
            .min(1, 'Tr???ng l?????ng kh??ng h???p l???')
            .typeError('Tr???ng l?????ng kh??ng h???p l???!'),
        so_luong: yup.number().min(1, 'Tr???ng l?????ng kh??ng h???p l???').typeError('S??? l?????ng kh??ng h???p l???!'),
        so_trang: yup.number().min(1, 'S??? trang kh??ng h???p l???').typeError('S??? trang kh??ng h???p l???!'),
        gia_sach: yup.number().min(1, 'Gi?? s??ch kh??ng h???p l???').typeError('Gi?? s??ch kh??ng h???p l???!'),
    });
    const form = useForm({
        defaultValues: {
            tensach: '',
            gia_sach: '',
            hinhanh: '',
            mo_ta: '',
            so_luong: '',
            hinh_thuc_bia: '',
            trong_luong: '',
            so_trang: '',
            idtg: '',
            idnn: '',
            idkt: '',
            idncc: '',
            idtl: '',
            idnxb: '',
        },
        resolver: yupResolver(schema),
    });


    const formEdit = useForm({
        defaultValues: {
            tensach: '',
            gia_sach: '',
            hinhanh: '',
            mo_ta: '',
            so_luong: '',
            hinh_thuc_bia: '',
            trong_luong: '',
            so_trang: '',
            idtg: '',
            idnn: '',
            idkt: '',
            idncc: '',
            idtl: '',
            idnxb: '',
        },
        resolver: yupResolver(schema),
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpen(false);
    };

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpenDelete(false);
    };

    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpenEdit(false);
    };

    const handleClickOpenDetail = async (idsach) => {
        setOpenDetail(true);
        const res = await SachAPI.getById(idsach);
        setCTsach(res);

    };

    const handleCloseDetail = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpenDetail(false);
    };

    const handleSubmit = async (value) => {
        const formDt = new FormData();
        const data = {
            tensach: value.tensach,
            mo_ta: value.mo_ta,
            so_luong: value.so_luong,
            hinh_thuc_bia: value.hinh_thuc_bia,
            trong_luong: value.trong_luong,
            so_trang: value.so_trang,
            gia_sach: value.gia_sach,
            idtg: value.idtg,
            idnn: value.idnn,
            idkt: value.idkt,
            idncc: value.idncc,
            idtl: value.idtl,
            idnxb: value.idnxb,
        };
        formDt.append('data', JSON.stringify(data));
        formDt.append('hinh_anh', value.hinh_anh[0]);
        console.log(value);
        try {
            await SachAPI.create(formDt);
            form.reset();
            enqueueSnackbar('Th??m th??nh c??ng', {variant: 'success', autoHideDuration: 2000});
            setCount((e) => e + 1);
            Setfilename('');
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000});
        }
    };

    const handleSubmitEdit = async (value) => {
        const formDt = new FormData();
        const data = {
            tensach: value.tensach,
            mo_ta: value.mo_ta,
            so_luong: value.so_luong,
            hinh_thuc_bia: value.hinh_thuc_bia,
            trong_luong: value.trong_luong,
            so_trang: value.so_trang,
            idtg: value.idtg,
            gia_sach: value.gia_sach,
            hinh_anh: filenameE,
            idnn: value.idnn,
            idkt: value.idkt,
            idncc: value.idncc,
            idtl: value.idtl,
            idnxb: value.idnxb,
        };
        formDt.append('data', JSON.stringify(data));
        formDt.append('hinh_anh', value.hinh_anh[0]);
        try {
            await SachAPI.update(idsach, formDt);
            enqueueSnackbar('Th??m th??nh c??ng', {variant: 'success', autoHideDuration: 2000});
            setCount((e) => e + 1);
            handleCloseEdit();
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000});
        }
    };

    const submitDelete = async () => {
        try {
            await SachAPI.delete(idsach);
            enqueueSnackbar('X??a ' + tensach + ' th??nh c??ng', {
                variant: 'success',
                autoHideDuration: 2000,
            });
            handleCloseDelete();
            setCount((e) => e + 1);
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000});
        }
    };


    return (
        <>
            <Page title="Book">
                <Box my={2}>
                    <TextField
                        value={filter.search}
                        onChange={(e) => setFilter(prevState => ({...prevState, search: e.target.value}))}
                        style={{width: '40ch'}}
                        variant="standard"
                        placeholder="T??m ki???m ..."
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
                                    onClick={() => setFilter(prevState => ({...prevState, search: ''}))}
                                >
                                    <Icon icon="ic:outline-clear" color="#6b7280"/>
                                </IconButton>
                            ),
                        }}
                    />
                    <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        style={{textTransform: 'none', marginLeft: '1rem'}}
                        color="primary"
                        startIcon={<Icon icon="bi:plus-square-fill" color="#ffffff"/>}
                    >
                        Th??m S??ch
                    </Button>
                </Box>
                <Box>
                    <TableContainer style={{height: '37rem'}}>
                        <Table>
                            <TableHead style={{backgroundColor: '#6b7280'}}>
                                <TableRow>
                                    <TableCell align="center" style={{color: '#fff'}}>
                                        ID S??ch
                                        {filter.idsach === 'DESC' ? (<IconButton onClick={() => {
                                            setFilter(prevState => ({
                                                ...prevState,
                                                tensach: '',
                                                idsach: 'ASC',
                                                gia: '',
                                                so_luong: '',
                                                khuyen_mai: ''
                                            }))
                                        }}>
                                            <Icon icon="akar-icons:arrow-down" color="#fff"/>
                                        </IconButton>) : (<IconButton
                                            onClick={() => {
                                                setFilter(prevState => ({
                                                    ...prevState,
                                                    tensach: '',
                                                    idsach: 'DESC',
                                                    gia: '',
                                                    so_luong: '',
                                                    khuyen_mai: ''
                                                }))
                                            }}
                                        >
                                            <Icon icon="akar-icons:arrow-up" color="#fff"/>
                                        </IconButton>)}

                                    </TableCell>
                                    <TableCell align="center" style={{color: '#fff'}}>
                                        T??n s??ch
                                        {filter.tensach === 'DESC' ? (<IconButton onClick={() => {
                                            setFilter(prevState => ({
                                                ...prevState,
                                                tensach: 'ASC',
                                                idsach: '',
                                                gia: '',
                                                so_luong: '',
                                                khuyen_mai: ''
                                            }))
                                        }}>
                                            <Icon icon="akar-icons:arrow-down" color="#fff"/>
                                        </IconButton>) : (<IconButton
                                            onClick={() => {
                                                setFilter(prevState => ({
                                                    ...prevState,
                                                    tensach: 'DESC',
                                                    idsach: '',
                                                    gia: '',
                                                    so_luong: '',
                                                    khuyen_mai: ''
                                                }))

                                            }}
                                        >
                                            <Icon icon="akar-icons:arrow-up" color="#fff"/>
                                        </IconButton>)}
                                    </TableCell>
                                    <TableCell align="center" style={{color: '#fff'}}>
                                        Gi??
                                        {filter.gia === 'DESC' ? (<IconButton onClick={() => {
                                            setFilter(prevState => ({
                                                ...prevState,
                                                tensach: '',
                                                idsach: '',
                                                gia: 'ASC',
                                                so_luong: '',
                                                khuyen_mai: ''
                                            }))
                                        }}>
                                            <Icon icon="akar-icons:arrow-down" color="#fff"/>
                                        </IconButton>) : (<IconButton
                                            onClick={() => {
                                                setFilter(prevState => ({
                                                    ...prevState,
                                                    tensach: '',
                                                    idsach: '',
                                                    gia: 'DESC',
                                                    so_luong: '',
                                                    khuyen_mai: ''
                                                }))

                                            }}
                                        >
                                            <Icon icon="akar-icons:arrow-up" color="#fff"/>
                                        </IconButton>)}
                                    </TableCell>
                                    <TableCell align="center" style={{color: '#fff'}}>
                                        S??? l?????ng
                                        {filter.so_luong === 'DESC' ? (<IconButton onClick={() => {
                                            setFilter(prevState => ({
                                                ...prevState,
                                                tensach: '',
                                                idsach: '',
                                                gia: '',
                                                so_luong: 'ASC',
                                                khuyen_mai: ''
                                            }))
                                        }}>
                                            <Icon icon="akar-icons:arrow-down" color="#fff"/>
                                        </IconButton>) : (<IconButton
                                            onClick={() => {
                                                setFilter(prevState => ({
                                                    ...prevState,
                                                    tensach: '',
                                                    idsach: '',
                                                    gia: '',
                                                    so_luong: 'DESC',
                                                    khuyen_mai: ''
                                                }))

                                            }}
                                        >
                                            <Icon icon="akar-icons:arrow-up" color="#fff"/>
                                        </IconButton>)}
                                    </TableCell>
                                    <TableCell align="center" style={{color: '#fff'}}>
                                        Khuy???n m??i
                                        {filter.khuyen_mai === 'DESC' ? (<IconButton onClick={() => {
                                            setFilter(prevState => ({
                                                ...prevState,
                                                tensach: '',
                                                idsach: '',
                                                gia: '',
                                                so_luong: '',
                                                khuyen_mai: 'ASC'
                                            }))
                                        }}>
                                            <Icon icon="akar-icons:arrow-down" color="#fff"/>
                                        </IconButton>) : (<IconButton
                                            onClick={() => {
                                                setFilter(prevState => ({
                                                    ...prevState,
                                                    tensach: '',
                                                    idsach: '',
                                                    gia: '',
                                                    so_luong: '',
                                                    khuyen_mai: 'DESC'
                                                }))

                                            }}
                                        >
                                            <Icon icon="akar-icons:arrow-up" color="#fff"/>
                                        </IconButton>)}
                                    </TableCell>
                                    <TableCell align="center" style={{color: '#fff'}}>
                                        H??nh ?????ng
                                    </TableCell>

                                </TableRow>
                            </TableHead>
                            {/*table body*/}
                            <TableBody>
                                {filterData?.map(e => (<TableRow key={e.idsach}>
                                    <TableCell align="center">{e.idsach} </TableCell>
                                    <TableCell>{e.tensach}</TableCell>
                                    <TableCell align="center">{' $' + e.gia_sach}</TableCell>
                                    <TableCell align="center">{e.so_luong}</TableCell>
                                    <TableCell align="center">{e.phan_tram ? '-' + e.phan_tram + '%' : ''}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            startIcon={<Icon icon="fluent:delete-24-filled" color="#ff4444"/>}
                                            size="small"
                                            style={{textTransform: 'none'}}
                                            onClick={() => {
                                                handleClickOpenDelete();
                                                setIdsach(e.idsach);
                                                setTenSach(e.tensach);
                                            }}
                                        >
                                            X??a
                                        </Button>

                                        <Button
                                            startIcon={<Icon icon="eva:edit-2-fill" color="#33b5e5"/>}
                                            size="small"
                                            onClick={async () => {
                                                const res = await sachAPI.getById(e.idsach);
                                                handleClickOpenEdit();
                                                formEdit.reset({
                                                    tensach: res.tensach,
                                                    mo_ta: res.mo_ta,
                                                    so_trang: res.so_trang,
                                                    trong_luong: res.trong_luong,
                                                    so_luong: res.so_luong,
                                                    hinh_thuc_bia: res.hinh_thuc_bia,
                                                    idnxb: res.idnxb,
                                                    idtg: res.idtg,
                                                    gia_sach: res.gia_sach,
                                                    idnn: res.idnn,
                                                    idncc: res.idncc,
                                                    idtl: res.idtl,
                                                    idkt: res.idkt
                                                })
                                                SetfilenameE(res.hinhanh);
                                                setIdsach(res.idsach);
                                            }}
                                        >
                                            S???a
                                        </Button>
                                        <IconButton onClick={() => {
                                            handleClickOpenDetail(e.idsach)
                                        }}> <Icon
                                            icon="ei:eye"/></IconButton>

                                    </TableCell>
                                </TableRow>))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container style={{margin: '1rem 0', position: "relative"}}>
                        <Grid item xs={9}>
                            <Pagination size="small" count={Math.ceil(filterData[0]?.so_luong_trang / 6)}
                                        color="primary"
                                        page={page} onChange={handlePage}/>

                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                onClick={ExportExcel}
                                variant="contained"
                                style={{position: 'absolute', textTransform: 'none', right: 0}}
                                color="primary"
                                startIcon={<Icon icon="entypo:download" color="#ffffff"/>}
                            >
                                T???i v???
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Page>

            <Dialog
                fullWidth
                maxWidth="md"
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
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

                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <SimpleBar style={{maxHeight: 700}}>
                        <DialogContent>
                            <InputText fullWidth label="T??n s??ch" name="tensach" form={form}/>
                            <InputText fullWidth label="Gi?? s??ch" name="gia_sach" form={form}/>
                            <InputText fullWidth label="Tr???ng l?????ng(gr)" name="trong_luong" form={form}/>
                            <InputText fullWidth label="S??? l?????ng" name="so_luong" form={form}/>
                            <InputText fullWidth label="S??? trang" name="so_trang" form={form}/>
                            <InputText fullWidth label="H??nh th???c b??a" name="hinh_thuc_bia" form={form}/>
                            <div>
                                <FormControl style={{minWidth: 140}} margin="normal">
                                    <InputLabel id="tg-simple-select-label">T??c gi???</InputLabel>
                                    <Controller
                                        as={
                                            <Select
                                                value={form.getValues('idtg')}
                                                onChange={(e) => form.setValue('idtg', e.target.value)}
                                                labelId="tg-simple-select-label"
                                            >
                                                {tacgia.map((value) => (
                                                    <MenuItem value={value.idtg} key={value.idtg}>
                                                        {value.hotentg}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        }
                                        name="idtg"
                                        control={form.control}
                                    />
                                </FormControl>

                                <FormControl style={{minWidth: 140, marginLeft: '.5rem'}} margin="normal">
                                    <InputLabel id="nn-simple-select-label">Ng??n ng???</InputLabel>
                                    <Controller
                                        as={
                                            <Select
                                                value={form.getValues('idnn')}
                                                onChange={(e) => form.setValue('idnn', e.target.value)}
                                                labelId="nn-simple-select-label"
                                            >
                                                {ngonngu.map((value) => (
                                                    <MenuItem value={value.idnn} key={value.idnn}>
                                                        {value.ngon_ngu}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        }
                                        name="idnn"
                                        control={form.control}
                                    />
                                </FormControl>
                                <FormControl style={{minWidth: 140, marginLeft: '.5rem'}} margin="normal">
                                    <InputLabel id="nxb-simple-select-label">Nh?? xu???t b???n</InputLabel>
                                    <Controller
                                        as={
                                            <Select
                                                value={form.getValues('idnxb')}
                                                onChange={(e) => form.setValue('idnxb', e.target.value)}
                                                labelId="nxb-simple-select-label"
                                            >
                                                {nhaxuatban.map((value) => (
                                                    <MenuItem value={value.idnxb} key={value.idnxb}>
                                                        {value.tennxb}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        }
                                        name="idnxb"
                                        control={form.control}
                                    />
                                </FormControl>

                                <FormControl style={{minWidth: 140, marginLeft: '.5rem'}} margin="normal">
                                    <InputLabel id="ncc-simple-select-label">Nh?? cung c???p</InputLabel>
                                    <Controller
                                        as={
                                            <Select
                                                value={form.getValues('idncc')}
                                                onChange={(e) => form.setValue('idncc', e.target.value)}
                                                labelId="ncc-simple-select-label"
                                            >
                                                {nhacungcap.map((value) => (
                                                    <MenuItem value={value.idncc} key={value.idncc}>
                                                        {value.tenncc}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        }
                                        name="idncc"
                                        control={form.control}
                                    />
                                </FormControl>
                                <FormControl style={{minWidth: 140, marginLeft: '.5rem'}} margin="normal">
                                    <InputLabel id="tl-simple-select-label">Th??? lo???i</InputLabel>
                                    <Controller
                                        as={
                                            <Select
                                                value={form.getValues('idtl')}
                                                onChange={(e) => form.setValue('idtl', e.target.value)}
                                                labelId="tl-simple-select-label"
                                            >
                                                {theloai.map((value) => (
                                                    <MenuItem value={value.idtl} key={value.idtl}>
                                                        {value.tentl}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        }
                                        name="idtl"
                                        control={form.control}
                                    />
                                </FormControl>
                                <FormControl style={{minWidth: 140, marginLeft: '.5rem'}} margin="normal">
                                    <InputLabel id="kt-simple-select-label">K??ch th?????t</InputLabel>
                                    <Controller
                                        as={
                                            <Select
                                                value={form.getValues('idkt')}
                                                onChange={(e) => form.setValue('idkt', e.target.value)}
                                                labelId="kt-simple-select-label"
                                            >
                                                {kichthuot.map((value) => (
                                                    <MenuItem value={value.idkt} key={value.idkt}>
                                                        {value.kt_ngang + 'x' + value.kt_doc + ' cm'}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        }
                                        name="idkt"
                                        control={form.control}
                                    />
                                </FormControl>
                            </div>
                            <div style={{marginTop: '1rem', display: 'flex'}}>
                                <label htmlFor="btn-upload">
                                    <input
                                        ref={form.register}
                                        id="btn-upload"
                                        name="hinh_anh"
                                        style={{display: 'none'}}
                                        type="file"
                                        onChange={(e) => Setfilename(URL?.createObjectURL(e.target.files[0]))}
                                    />
                                    <Button
                                        startIcon={<Icon icon="entypo:upload"/>}
                                        variant="outlined"
                                        color="primary"
                                        style={{textTransform: 'none'}}
                                        component="span"
                                    >
                                        T???i h??nh ???nh l??n
                                    </Button>
                                </label>
                                <span style={{marginLeft: '1rem'}}>
                  {!!filename && (
                      <Avatar style={{width: 200, height: 200}} src={filename} variant="rounded"/>
                  )}
                </span>
                            </div>
                            <div style={{marginTop: '1rem'}}>
                                <Controller
                                    as={
                                        <TextField
                                            label="M?? t???"
                                            type="text"
                                            multiline
                                            rows={10}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    }
                                    control={form.control}
                                    name="mo_ta"
                                    className="mx-2"
                                />
                            </div>
                        </DialogContent>
                    </SimpleBar>
                    <DialogActions>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            style={{textTransform: 'none'}}
                        >
                            Th??m
                        </Button>
                        <Button onClick={handleClose} style={{textTransform: 'none'}}>
                            ????ng
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            {/* form edit */}
            <Dialog
                fullWidth
                maxWidth="md"
                open={openEdit}
                onClose={handleCloseEdit}
                TransitionComponent={Transition}
            >
                <DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseEdit}
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

                <form onSubmit={formEdit.handleSubmit(handleSubmitEdit)}>
                    <SimpleBar style={{maxHeight: 700}}>
                        <DialogContent>
                            <InputText fullWidth label="T??n s??ch" name="tensach" form={formEdit}/>
                            <InputText fullWidth label="Gi?? s??ch" name="gia_sach" form={formEdit}/>
                            <InputText fullWidth label="Tr???ng l?????ng(gr)" name="trong_luong" form={formEdit}/>
                            <InputText fullWidth label="S??? l?????ng" name="so_luong" form={formEdit}/>
                            <InputText fullWidth label="S??? trang" name="so_trang" form={formEdit}/>
                            <InputText fullWidth label="H??nh th???c b??a" name="hinh_thuc_bia" form={formEdit}/>
                            <div>
                                <FormControl style={{minWidth: 140}} margin="normal">
                                    <InputLabel id="tg-simple-select-label">T??c gi???</InputLabel>
                                    <Controller
                                        as={
                                            <Select
                                                value={formEdit.getValues('idtg')}
                                                onChange={(e) => formEdit.setValue('idtg', e.target.value)}
                                                labelId="tg-simple-select-label"
                                            >
                                                {tacgia.map((value) => (
                                                    <MenuItem value={value.idtg} key={value.idtg}>
                                                        {value.hotentg}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        }
                                        name="idtg"
                                        control={formEdit.control}
                                    />
                                </FormControl>

                                <FormControl style={{minWidth: 140, marginLeft: '.5rem'}} margin="normal">
                                    <InputLabel id="nn-simple-select-label">Ng??n ng???</InputLabel>
                                    <Controller
                                        as={
                                            <Select
                                                value={formEdit.getValues('idnn')}
                                                onChange={(e) => formEdit.setValue('idnn', e.target.value)}
                                                labelId="nn-simple-select-label"
                                            >
                                                {ngonngu.map((value) => (
                                                    <MenuItem value={value.idnn} key={value.idnn}>
                                                        {value.ngon_ngu}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        }
                                        name="idnn"
                                        control={formEdit.control}
                                    />
                                </FormControl>
                                <FormControl style={{minWidth: 140, marginLeft: '.5rem'}} margin="normal">
                                    <InputLabel id="nxb-simple-select-label">Nh?? xu???t b???n</InputLabel>
                                    <Controller
                                        as={
                                            <Select
                                                value={formEdit.getValues('idnxb')}
                                                onChange={(e) => formEdit.setValue('idnxb', e.target.value)}
                                                labelId="nxb-simple-select-label"
                                            >
                                                {nhaxuatban.map((value) => (
                                                    <MenuItem value={value.idnxb} key={value.idnxb}>
                                                        {value.tennxb}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        }
                                        name="idnxb"
                                        control={formEdit.control}
                                    />
                                </FormControl>

                                <FormControl style={{minWidth: 140, marginLeft: '.5rem'}} margin="normal">
                                    <InputLabel id="ncc-simple-select-label">Nh?? cung c???p</InputLabel>
                                    <Controller
                                        as={
                                            <Select
                                                value={formEdit.getValues('idncc')}
                                                onChange={(e) => formEdit.setValue('idncc', e.target.value)}
                                                labelId="ncc-simple-select-label"
                                            >
                                                {nhacungcap.map((value) => (
                                                    <MenuItem value={value.idncc} key={value.idncc}>
                                                        {value.tenncc}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        }
                                        name="idncc"
                                        control={formEdit.control}
                                    />
                                </FormControl>
                                <FormControl style={{minWidth: 140, marginLeft: '.5rem'}} margin="normal">
                                    <InputLabel id="tl-simple-select-label">Th??? lo???i</InputLabel>
                                    <Controller
                                        as={
                                            <Select
                                                value={formEdit.getValues('idtl')}
                                                onChange={(e) => formEdit.setValue('idtl', e.target.value)}
                                                labelId="tl-simple-select-label"
                                            >
                                                {theloai.map((value) => (
                                                    <MenuItem value={value.idtl} key={value.idtl}>
                                                        {value.tentl}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        }
                                        name="idtl"
                                        control={formEdit.control}
                                    />
                                </FormControl>
                                <FormControl style={{minWidth: 140, marginLeft: '.5rem'}} margin="normal">
                                    <InputLabel id="kt-simple-select-label">K??ch th?????t</InputLabel>
                                    <Controller
                                        as={
                                            <Select
                                                value={formEdit.getValues('idkt')}
                                                onChange={(e) => formEdit.setValue('idkt', e.target.value)}
                                                labelId="kt-simple-select-label"
                                            >
                                                {kichthuot.map((value) => (
                                                    <MenuItem value={value.idkt} key={value.idkt}>
                                                        {value.kt_ngang + 'x' + value.kt_doc + ' cm'}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        }
                                        name="idkt"
                                        control={formEdit.control}
                                    />
                                </FormControl>
                            </div>
                            <div style={{marginTop: '1rem', display: 'flex'}}>
                                <label htmlFor="btn-upload">
                                    <input
                                        ref={formEdit.register}
                                        id="btn-upload"
                                        name="hinh_anh"
                                        style={{display: 'none'}}
                                        type="file"
                                        onChange={(e) => {
                                            SetfilenameE(URL?.createObjectURL(e.target.files[0]));
                                        }}
                                    />
                                    <Button
                                        startIcon={<Icon icon="entypo:upload"/>}
                                        variant="outlined"
                                        color="primary"
                                        style={{textTransform: 'none'}}
                                        component="span"
                                    >
                                        T???i h??nh ???nh l??n
                                    </Button>
                                </label>
                                <span style={{marginLeft: '1rem'}}>
                  <Avatar style={{width: 200, height: 200}} src={filenameE} variant="rounded"/>
                </span>
                            </div>
                            <div style={{marginTop: '1rem'}}>
                                <Controller
                                    as={
                                        <TextField
                                            label="M?? t???"
                                            type="text"
                                            multiline
                                            rows={10}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    }
                                    control={formEdit.control}
                                    name="mo_ta"
                                    className="mx-2"
                                />
                            </div>
                        </DialogContent>
                    </SimpleBar>
                    <DialogActions>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            style={{textTransform: 'none'}}
                        >
                            ?????ng ??
                        </Button>
                        <Button onClick={handleCloseEdit} style={{textTransform: 'none'}}>
                            ????ng
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Dialog open={openDelete} onClose={handleCloseDelete} TransitionComponent={Transition}>
                <DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDelete}
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
                        <Typography variant="h5">B???n mu???n x??a: {tensach}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={submitDelete}
                        color="primary"
                        variant="contained"
                        style={{textTransform: 'none'}}
                    >
                        ?????ng ??
                    </Button>
                    <Button onClick={handleCloseDelete} style={{textTransform: 'none'}}>
                        ????ng
                    </Button>
                </DialogActions>
            </Dialog>


                <Dialog fullWidth maxWidth="lg" open={openDetail} onClose={handleCloseDetail}
                        TransitionComponent={Transition}>
                    <DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseDetail}
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
                    <SimpleBar style={{maxHeight: 700}}>
                    <DialogContent>
                        <Box style={{margin: '.5rem 0'}}>
                            <AppBar position="static" elevation={0}>
                                <Toolbar style={{padding: '.5rem'}}>
                                    <Typography color="inherit" variant="h4">
                                        {ctsach.tensach}
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <Grid container spacing={2} style={{margin: '1rem 0'}}>
                                <Grid item xs={8}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" component="span">M?? s??ch: </Typography>
                                            <Typography variant="h5" component="span" color="secondary">
                                                {ctsach.idsach}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" component="span">Ng??n ng???: </Typography>
                                            <Typography variant="h5" component="span" color="secondary">
                                                {ctsach.ngon_ngu}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography  variant="h5" component="span">Nh?? xu???t b???n: </Typography>
                                            <Typography  variant="h5" component="span" color="secondary">
                                                {ctsach.tennxb}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" component="span">T??c gi???: </Typography>
                                            <Typography variant="h5" component="span" color="secondary">
                                                {ctsach.hotentg}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" component="span">Nh?? cung c???p: </Typography>
                                            <Typography variant="h5" component="span" color="secondary">
                                                {ctsach.tenncc}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" component="span">H??nh th???c b??a: </Typography>
                                            <Typography variant="h5" component="span" color="secondary">
                                                {ctsach.hinh_thuc_bia}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" component="span">S??? l?????ng: </Typography>
                                            <Typography variant="h5" component="span" color="secondary">
                                                {ctsach.so_luong}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" component="span">Tr???ng l?????ng: </Typography>
                                            <Typography variant="h5" component="span" color="secondary">
                                                {ctsach.trong_luong + ' gram'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h5" component="span">Th??? lo???i: </Typography>
                                            <Typography variant="h5" component="span" color="secondary">
                                                {ctsach.tentl}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" component="span">K??ch th?????t: </Typography>
                                            <Typography variant="h5" component="span" color="secondary">
                                                {ctsach.kt_doc + 'x' + ctsach.kt_ngang + ' cm'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" component="span">S??? trang: </Typography>
                                            <Typography variant="h5" component="span" color="secondary">
                                                {ctsach.so_trang + ' trang'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" component="span">H??nh th???c b??a: </Typography>
                                            <Typography variant="h5" component="span" color="secondary">
                                                {ctsach.hinh_thuc_bia}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" component="span">Gi??: </Typography>
                                            <Typography component="span" variant="h5" color="secondary">
                                                {ctsach.phan_tram ? fCurrency(ctsach.gia_sach * (100 - ctsach.phan_tram) / 100) : fCurrency(ctsach.gia_sach)}
                                            </Typography>

                                            {ctsach.phan_tram && <> <Typography
                                                component="span"
                                                variant="body1"
                                                style={{
                                                    color: 'text.disabled',
                                                    textDecoration: 'line-through',
                                                    marginLeft: '1rem'
                                                }}
                                            >
                                                {fCurrency(ctsach.gia_sach)}
                                            </Typography> <Chip
                                                style={{margin: '0 0 .5rem 1rem'}}
                                                color="secondary"
                                                size="small"
                                                label={'-' + ctsach.phan_tram + "%"}
                                            /></>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs ={4}>
                                    <CardMedia component="img" image={ctsach.hinhanh} style={{boxShadow: '16px'}}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography component="div" variant="h6" style={{whiteSpace: 'pre-line'}}>
                                        {show ? shortString(ctsach.mo_ta) + ' ...' : ctsach.mo_ta}
                                    </Typography>
                                        {show ? (<Button variant="outlined"
                                                         onClick={() => setShow(false)}
                                                         color="primary"
                                                         style={{
                                                             textTransform: 'none',
                                                             width: '12rem',
                                                             margin: '.5rem 0'
                                                         }}
                                        >
                                            Xem th??m
                                        </Button>) : (<Button variant="outlined"
                                                              onClick={() => setShow(true)}
                                                              color="primary"
                                                              style={{
                                                                  textTransform: 'none',
                                                                  width: '12rem',
                                                                  margin: '.5rem 0'
                                                              }}
                                        >
                                            Thu g???n
                                        </Button>)}
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                    </SimpleBar>
                    <DialogActions>
                        <Button onClick={handleCloseDetail} style={{textTransform: 'none'}}>
                            ????ng
                        </Button>
                    </DialogActions>
                </Dialog>

        </>
    );
}

export default Book;
