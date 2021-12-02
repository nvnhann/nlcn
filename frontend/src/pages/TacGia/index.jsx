import React, {useEffect, useState} from 'react';
import tacGiaApi from '../../API/tacGiaApi';
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
    DialogActions, TableContainer, TableHead, TableCell, TableRow, Table, TableBody, TableFooter,
} from '@material-ui/core';
import {Icon} from '@iconify/react';
import {DataGrid} from '@mui/x-data-grid';
import {escapeRegExp} from '../../ultils/escapRegExp';
import {useForm} from 'react-hook-form';
import InputText from '../../Component/Form-control/InputText';
import {useSnackbar} from 'notistack';
import {Pagination} from "@material-ui/lab";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TacGia() {
    const [data, setData] = useState([]);
    const [idtg, setIdtg] = useState('');
    const [filterData, setFilterData] = useState(data);
    const [searchText, setSearchText] = useState('');
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [count, setCount] = useState(0);
    const [hotentg, setHotentg] = useState('');
    const {enqueueSnackbar} = useSnackbar();
    const [filter, setFilter] = useState({idtg:'ASC', hotentg: ''})
    const [page, setPage] = React.useState(1);
    const handlePage = (event, value) => {
        setPage(value);
    };

    const form = useForm({
        defaultValues: {
            hotentg: '',
            diachi: '',
        },
    });

    const formEdit = useForm({
        defaultValues: {
            idtg: '',
            hotentg: '',
            diachi: '',
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
            const res = await tacGiaApi.get(f);
            setData(res);
            setFilterData(res);
        })();
    }, [count, filter.idtg, filter.hotentg, page]);

    const handleSubmit = async (value) => {
        try {
            await tacGiaApi.create(value);
            form.reset();
            enqueueSnackbar('Thêm thành công', {variant: 'success', autoHideDuration: 2000});
            setCount((e) => e + 1);
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000});
        }
    };

    const submitDelete = async () => {
        try {
            await tacGiaApi.delete(idtg);
            enqueueSnackbar('Xóa tác giả ' + hotentg + ' thành công', {
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
            await tacGiaApi.update(idtg, value);
            enqueueSnackbar('Thay đổi thành công', {variant: 'success', autoHideDuration: 2000});
            handleCloseEdit();
            setCount((e) => e + 1);
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000});
        }
    };
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

    return (
        <div>
            <Page title="Tác giả">
                <Box style={{width: '70rem', margin: '0 auto'}}>
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
                        <Button
                            onClick={handleClickOpen}
                            variant="contained"
                            style={{textTransform: 'none', marginLeft: '1rem'}}
                            color="primary"
                            startIcon={<Icon icon="bi:plus-square-fill" color="#ffffff"/>}
                        >
                            Thêm tác giả
                        </Button>
                    </Box>
                    <TableContainer style={{height: '37rem'}}>
                        <Table>
                            <TableHead style={{backgroundColor: '#6b7280'}}>
                                <TableRow>
                                    <TableCell align="center" style={{color: '#fff'}}>
                                        ID Tác giả
                                        { filter.idtg === 'DESC' ? (
                                            <IconButton onClick={()=>{
                                                setFilter(prevState => ({
                                                    ...prevState,
                                                    idtg: 'ASC'
                                                }))
                                            }}>
                                                <Icon icon="akar-icons:arrow-down" color="#fff"/>
                                            </IconButton>
                                        ): (
                                            <IconButton
                                                onClick={()=>{
                                                    setFilter(prevState => ({
                                                        ...prevState,
                                                        idtg: 'DESC'
                                                    }))

                                                }}
                                            >
                                                <Icon icon="akar-icons:arrow-up" color="#fff"/>
                                            </IconButton>
                                        )}

                                    </TableCell>
                                    <TableCell align="center" style={{color: '#fff'}}>
                                        Họ và tên
                                        { filter.hotentg === 'DESC' ? (
                                            <IconButton onClick={()=>{
                                                setFilter(prevState => ({
                                                    ...prevState,
                                                    hotentg: 'ASC'
                                                }))
                                            }}>
                                                <Icon icon="akar-icons:arrow-down" color="#fff"/>
                                            </IconButton>
                                        ): (
                                            <IconButton
                                                onClick={()=>{
                                                    setFilter(prevState => ({
                                                        ...prevState,
                                                        hotentg: 'DESC'
                                                    }))

                                                }}
                                            >
                                                <Icon icon="akar-icons:arrow-up" color="#fff"/>
                                            </IconButton>
                                        )}
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
                                {filterData?.map(e => (
                                    <TableRow key={e.idtg}>
                                        <TableCell align="center">{e.idtg} </TableCell>
                                        <TableCell>{e.hotentg}</TableCell>
                                        <TableCell>{e.dia_chi}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                onClick={() => {
                                                    handleClickOpenDelete();
                                                    setHotentg(e.hotentg);
                                                    setIdtg(e.idtg);
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
                                                        formEdit.setValue('hotentg', e.hotentg);
                                                        formEdit.setValue('diachi', e.dia_chi);
                                                    }, 10);
                                                    setIdtg(e.idtg);
                                                    handleClickOpenEdit();
                                                }}
                                                startIcon={<Icon icon="eva:edit-2-fill" color="#33b5e5"/>}
                                                size="small"
                                            >
                                                Sửa
                                            </Button>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination size="small" style={{margin: '1rem 0'}} count={Math.ceil(filterData[0]?.so_luong/8)} color="primary" page={page} onChange={handlePage} />
                </Box>
            </Page>
            <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
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
                        <InputText fullWidth label="Họ và tên tác giả" name="hotentg" form={form}/>
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
            <Dialog open={openEdit} onClose={handleCloseEdit} TransitionComponent={Transition}>
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
                        <InputText fullWidth label="Họ và tên tác giả" name="hotentg" form={formEdit}/>
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
                        <Typography variant="h5">Bạn muốn xóa: {hotentg}</Typography>
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

export default TacGia;
