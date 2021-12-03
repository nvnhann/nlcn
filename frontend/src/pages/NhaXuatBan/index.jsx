import React, {useEffect, useState} from 'react';
import Page from '../../Component/Page';
import {
    Box,
    Typography,
    Button,
    TextField,
    IconButton,
    Slide,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid,
} from '@material-ui/core';
import {Icon} from '@iconify/react';
import {useForm} from 'react-hook-form';
import InputText from '../../Component/Form-control/InputText';
import {useSnackbar} from 'notistack';
import NhaXuatBanAPI from '../../API/NhaXuatBanAPI';
import XLSX from 'xlsx';
import {Pagination} from "@material-ui/lab";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function NhaCungCap() {
    const [data, setData] = useState([]);
    const [idnxb, setIdnxb] = useState('');
    const [filterData, setFilterData] = useState(data);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [count, setCount] = useState(0);
    const [tennxb, setTennxb] = useState('');
    const {enqueueSnackbar} = useSnackbar();
    const [filter, setFilter] = useState({idnxb: 'ASC', tennxb: '', search: ''})
    const [page, setPage] = React.useState(1);

    const handlePage = (event, value) => {
        setPage(value);
    };

    const ExportExcel = async () => {
        const res = await NhaXuatBanAPI.getExcel();
        /// console.log(res)
        const workSheet = XLSX.utils.json_to_sheet(res);
        const workBook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workBook, workSheet, "NXB");
        XLSX.write(workBook, {bookType: "xlsx", type: "buffer"});
        XLSX.write(workBook, {bookType: "xlsx", type: "binary"});
        XLSX.writeFile(workBook, "NhaXuatBan.xlsx")

    }

    const form = useForm({
        defaultValues: {
            tennxb: '',
            diachi: '',
            sdt: ''
        },
    });

    const formEdit = useForm({
        defaultValues: {
            tennxb: '',
            diachi: '',
            sdt: ''
        },
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

    useEffect(() => {
        (async () => {
            const f = filter;
            f.page = page;
            const res = await NhaXuatBanAPI.get(f);
            setData(res);
            setFilterData(res);
        })();
    }, [count, filter.search, filter.tennxb, filter.idnxb, page]);

    const handleSubmit = async (value) => {
        try {
            await NhaXuatBanAPI.create(value);
            form.reset();
            enqueueSnackbar('Thêm thành công', {variant: 'success', autoHideDuration: 2000});
            setCount((e) => e + 1);
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000});
        }
    };

    const submitDelete = async () => {
        try {
            await NhaXuatBanAPI.delete(idnxb);
            enqueueSnackbar('Xóa nhà xuất bản ' + tennxb + ' thành công', {
                variant: 'success',
                autoHideDuration: 2000,
            });
            handleCloseDelete();
            setCount((e) => e + 1);
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000});
        }
    };

    const handleSubmitEdit = async (value) => {
        try {
            await NhaXuatBanAPI.update(idnxb, value);
            enqueueSnackbar('Thay đổi thành công', {variant: 'success', autoHideDuration: 2000});
            handleCloseEdit();
            setCount((e) => e + 1);
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000});
        }
    };

    return (
        <div>
            <Page title="Nhà xuất bản">
                <Box>
                    <Box my={2}>
                        <TextField
                            value={filter.search}
                            onChange={(e) => setFilter(prevState => ({...prevState, tennxb: e.target.value}))}
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
                                        onClick={() => setFilter(prevState => ({...prevState, tennxb: ''}))}
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
                            Thêm nhà xuất bản
                        </Button>
                    </Box>
                    <TableContainer style={{height: '37rem'}}>
                        <Table>
                            <TableHead style={{backgroundColor: '#6b7280'}}>
                                <TableRow>
                                    <TableCell align="center" style={{color: '#fff'}}>
                                        ID Nhà xuất bản
                                        {filter.idnxb === 'DESC' ? (<IconButton onClick={() => {
                                            setFilter(prevState => ({
                                                ...prevState, tennxb: '', idnxb: 'ASC'
                                            }))
                                        }}>
                                            <Icon icon="akar-icons:arrow-down" color="#fff"/>
                                        </IconButton>) : (<IconButton
                                            onClick={() => {
                                                setFilter(prevState => ({
                                                    ...prevState, tennxb: '', idnxb: 'DESC'
                                                }))
                                            }}
                                        >
                                            <Icon icon="akar-icons:arrow-up" color="#fff"/>
                                        </IconButton>)}

                                    </TableCell>
                                    <TableCell align="center" style={{color: '#fff'}}>
                                        Họ và tên
                                        {filter.tennxb === 'DESC' ? (<IconButton onClick={() => {
                                            setFilter(prevState => ({
                                                ...prevState, tennxb: 'ASC'
                                            }))
                                        }}>
                                            <Icon icon="akar-icons:arrow-down" color="#fff"/>
                                        </IconButton>) : (<IconButton
                                            onClick={() => {
                                                setFilter(prevState => ({
                                                    ...prevState, tennxb: 'DESC'
                                                }))

                                            }}
                                        >
                                            <Icon icon="akar-icons:arrow-up" color="#fff"/>
                                        </IconButton>)}
                                    </TableCell>
                                    <TableCell align="center" style={{color: '#fff'}}>
                                        Số điện thoại
                                    </TableCell>
                                    <TableCell align="center" style={{color: '#fff'}}>
                                        Địa chỉ
                                    </TableCell>

                                    <TableCell align="center" style={{color: '#fff'}}>
                                        Hành động
                                    </TableCell>

                                </TableRow>
                            </TableHead>
                            {/*table body*/}
                            <TableBody>
                                {filterData?.map(e => (<TableRow key={e.idnxb}>
                                    <TableCell align="center">{e.idnxb} </TableCell>
                                    <TableCell>{e.tennxb}</TableCell>
                                    <TableCell>{e.sdt}</TableCell>
                                    <TableCell>{e.dia_chi}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            onClick={() => {
                                                handleClickOpenDelete();
                                                setTennxb(e.tennxb);
                                                setIdnxb(e.idnxb);
                                            }}
                                            startIcon={<Icon icon="fluent:delete-24-filled" color="#ff4444"/>}
                                            size="small"
                                            style={{textTransform: 'none'}}
                                        >
                                            Xóa
                                        </Button>

                                        <Button
                                            onClick={() => {
                                                setTimeout(() => {
                                                    formEdit.setValue('tennxb', e.tennxb);
                                                    formEdit.setValue('diachi', e.dia_chi);
                                                    formEdit.setValue('sdt', e.sdt);
                                                }, 10);
                                                setIdnxb(e.idnxb);
                                                handleClickOpenEdit();
                                            }}
                                            startIcon={<Icon icon="eva:edit-2-fill" color="#33b5e5"/>}
                                            size="small"
                                        >
                                            Sửa
                                        </Button>
                                    </TableCell>
                                </TableRow>))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container style={{margin: '1rem 0', position: "relative"}}>
                        <Grid item xs={9}>
                            <Pagination size="small" count={Math.ceil(filterData[0]?.so_luong / 8)} color="primary"
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
                                Tải về
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
                    <DialogContent>
                        <InputText fullWidth label="Tên nhà xuất bản" name="tennxb" form={form}/>
                        <InputText fullWidth label="Địa chỉ" form={form} name="diachi"/>
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
                    <DialogContent>
                        <InputText fullWidth label="Tên nhà cung cấp" name="tennxb" form={formEdit}/>
                        <InputText fullWidth label="Địa chỉ" form={formEdit} name="diachi"/>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                            style={{textTransform: 'none'}}
                        >
                            Đồng ý
                        </Button>
                        <Button onClick={handleCloseEdit} style={{textTransform: 'none'}}>
                            Đóng
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
                        <Typography variant="h5">Bạn muốn xóa: {tennxb}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={submitDelete}
                        color="primary"
                        variant="contained"
                        style={{textTransform: 'none'}}
                    >
                        Đồng ý
                    </Button>
                    <Button onClick={handleCloseDelete} style={{textTransform: 'none'}}>
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NhaCungCap;
