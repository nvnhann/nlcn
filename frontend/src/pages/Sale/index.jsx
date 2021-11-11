import React, {useEffect, useState} from 'react';
import Page from "../../Component/Page";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Slide,
    TextField,
    Typography
} from "@material-ui/core";
import {Icon} from "@iconify/react";
import KhuyenMaiAPI from "../../API/KhuyenMaiAPI";
import {DataGrid} from "@mui/x-data-grid";
import {formatDateTime} from "../../ultils/formatDateTime";
import SachApi from "../../API/SachAPI";
import {escapeRegExp} from "../../ultils/escapRegExp";
import {useSnackbar} from "notistack";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Sale() {
    const [data, setData] = useState([]);
    const [ref, setRef] = useState(0);
    const [filterData, setFilterData] = useState(data);
    const [sach, setSach] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [open, setOpen] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [idkm, setIdkm] = useState('');

    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 7);
    const [dataForm, setDataForm] = useState({
        idsach: '',
        ngay_bd_km: currentTime.toISOString().slice(0, 16),
        ngay_het_km: currentTime.toISOString().slice(0, 16),
        phan_tram: 1
    });

    const [dataFormEdit, setDataFormEdit] = useState({
        idsach: '',
        ngay_bd_km: currentTime.toISOString().slice(0, 16),
        ngay_het_km: currentTime.toISOString().slice(0, 16),
        phan_tram: 1
    });

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };


    const handleCloseDelete = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpenDelete(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpen(false);
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
            const res = await KhuyenMaiAPI.get();
            const sachkm = await SachApi.getSachKm();
            console.log(sachkm)
            setSach(sachkm);
            setData(res);
            setFilterData(res);
        })()
    }, [ref]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentdate = new Date();
        const date1 = new Date(dataForm.ngay_bd_km);
        const date2 = new Date(dataForm.ngay_het_km);
        if (dataForm.idsach === '') {
            enqueueSnackbar('Vui lòng chọn tên sách', {variant: 'error', autoHideDuration: 4000});
        } else if (date1 < currentdate) {
            enqueueSnackbar('Thời gian bắt đầu không hợp lệ', {variant: 'error', autoHideDuration: 4000});
        } else if (date2 < currentdate) {
            enqueueSnackbar('Thời gian kết thúc không hợp lệ', {variant: 'error', autoHideDuration: 4000});
        } else if (date1 > date2) {
            enqueueSnackbar('Thời gian hết hạn không được nhỏ hơn thời gian bắt đầu', {
                variant: 'error',
                autoHideDuration: 4000
            });
        } else {
            try {
                await KhuyenMaiAPI.create(dataForm);
                enqueueSnackbar('Thêm thành công!', {variant: 'success', autoHideDuration: 2000});
                setRef(e => e + 1);
                handleClose();

            } catch (e) {
                enqueueSnackbar(e.message, {variant: 'error', autoHideDuration: 4000});

            }
        }
    }

    const submitDelete = async () => {
        try {
            await KhuyenMaiAPI.delete(idkm);

            enqueueSnackbar('Xóa thành công', {
                variant: 'success',
                autoHideDuration: 2000,
            });
            handleCloseDelete();
            setIdkm('');
            setRef(e => e + 1);
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000});
        }
    }

    const handleSubmitEdit = async (e)=>{ e.preventDefault();
        const currentdate = new Date();
        const date1 = new Date(dataFormEdit.ngay_bd_km);
        const date2 = new Date(dataFormEdit.ngay_het_km);
        if (dataFormEdit.idsach === '') {
            enqueueSnackbar('Vui lòng chọn tên sách', {variant: 'error', autoHideDuration: 4000});
        } else if (date1 < currentdate) {
            enqueueSnackbar('Thời gian bắt đầu không hợp lệ', {variant: 'error', autoHideDuration: 4000});
        } else if (date2 < currentdate) {
            enqueueSnackbar('Thời gian kết thúc không hợp lệ', {variant: 'error', autoHideDuration: 4000});
        } else if (date1 > date2) {
            enqueueSnackbar('Thời gian hết hạn không được nhỏ hơn thời gian bắt đầu', {
                variant: 'error',
                autoHideDuration: 4000
            });
        } else {
            try {
                await KhuyenMaiAPI.update(idkm,dataFormEdit);
                enqueueSnackbar('Sửa thành công!', {variant: 'success', autoHideDuration: 2000});
                setRef(e => e + 1);
                handleCloseEdit();
            } catch (e) {
                enqueueSnackbar(e.message, {variant: 'error', autoHideDuration: 4000});

            }
        }
    }
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 200,
        },
        {
            field: 'idsach',
            width: 200,
            hide: true
        },
        {
            field: 'tensach',
            headerName: 'Tên sách',
            width: 400,
        },
        {
            field: 'phan_tram',
            headerName: '% khuyến mãi',

            width: 200,
        },
        {
            field: 'ngay_bd_km',
            headerName: 'Thời gian bắt đầu',
            renderCell: (params) => (
                <Typography>{formatDateTime(params.row.ngay_bd_km)}</Typography>
            ),
            width: 200,
        },

        {
            field: 'ngay_het_km',
            headerName: 'Thời gian kết thúc',
            renderCell: (params) => (
                <Typography>{formatDateTime(params.row.ngay_het_km)}</Typography>
            ),
            width: 200,
        },
        {
            field: 'action',
            headerName: 'Hành động',
            width: 200,
            renderCell: (params) => (
                <>
                    <strong>
                        <Button
                            onClick={() => {
                                handleClickOpenDelete();
                                setIdkm(params.row.id);
                            }}
                            startIcon={<Icon icon="fluent:delete-24-filled" color="#ff4444"/>}
                            size="small"
                        >
                            Xóa
                        </Button>
                    </strong>

                    <strong>
                        <Button
                            onClick={() => {
                                const datebd = new Date(params.row.ngay_bd_km);
                                const datekt = new Date(params.row.ngay_het_km);
                                datebd.setHours(datebd.getHours()+7);
                                datekt.setHours(datekt.getHours()+7);
                                sach.push({
                                    idsach: params.row.idsach,
                                    tensach: params.row.tensach
                                })
                                setIdkm(params.row.id)
                                setDataFormEdit({
                                    idsach: params.row.idsach,
                                    ngay_bd_km: datebd.toISOString().slice(0, 16),
                                    ngay_het_km: datekt.toISOString().slice(0, 16),
                                    phan_tram: params.row.phan_tram
                                })
                                console.log(dataFormEdit)
                                handleClickOpenEdit();
                            }}
                            startIcon={<Icon icon="eva:edit-2-fill" color="#33b5e5"/>}
                            size="small"
                        >
                            Sửa
                        </Button>
                    </strong>
                </>
            ),
        },
    ];

    const rows = [];

    filterData?.forEach((e) => {
        rows.push({
            id: e.idkm,
            tensach: e.tensach,
            phan_tram: e.phan_tram,
            ngay_bd_km: e.ngay_bd_km,
            ngay_het_km: e.ngay_het_km,
            idsach: e.idsach,
            action: e.idkm,
        });
    });

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
        <Page title="sale">
            <Typography color="primary" variant="h4" gutterBottom>
                Khuyến mãi
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
                <Button
                    variant="contained"
                    style={{textTransform: 'none', marginLeft: '1rem'}}
                    onClick={handleClickOpen}
                    color="primary"
                    startIcon={<Icon icon="bi:plus-square-fill" color="#ffffff"/>}
                >
                    Thêm khuyến mãi
                </Button>
            </Box>
            <Box>
                <div style={{height: 390, width: '100%'}}>
                    <div style={{height: 390, width: '100%'}}>
                        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]}/>
                    </div>
                </div>
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
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <FormControl style={{minWidth: 840, margin: '1rem'}} margin="normal">
                            <InputLabel id="demo-simple-select-label">Tên sách</InputLabel>
                            <Select
                                name="idsach"
                                value={dataForm.idsach}
                                onChange={(e) => setDataForm(prevState => ({
                                    ...prevState,
                                    idsach: e.target.value
                                }))}
                                labelId="demo-simple-select-label"
                            >
                                {sach.map((value) => (
                                    <MenuItem value={value.idsach} key={value.idsach}>
                                        {value.tensach}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            style={{margin: '0 0 2rem 1rem'}}
                            variant="outlined"
                            id="title1"
                            label="Phần trăm"
                            type="number"
                            value={dataForm.phan_tram}
                            onChange={(e) => {
                                if (e.target.value < 1) return setDataForm(prevState => ({
                                    ...prevState,
                                    phan_tram: 1
                                }))
                                else return setDataForm(prevState => ({
                                    ...prevState,
                                    phan_tram: e.target.value
                                }))
                            }}
                        />
                        <div>

                            <TextField
                                id="date"
                                label="Ngày bắt đầu"
                                type="datetime-local"
                                defaultValue={dataForm.ngay_bd_km}
                                style={{width: 300, margin: '0 1rem'}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e => setDataForm(prevState => ({
                                    ...prevState,
                                    ngay_bd_km: e.target.value
                                }))}
                            />

                            <TextField
                                id="date"
                                label="Ngày hết hạn"
                                type="datetime-local"
                                defaultValue={dataForm.ngay_het_km}
                                style={{width: 300, margin: '0 1rem'}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e => setDataForm(prevState => ({
                                    ...prevState,
                                    ngay_het_km: e.target.value
                                }))}
                            />
                        </div>

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
                        <Typography variant="h5" color="secondary">Xác nhận xóa</Typography>
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

            <Dialog fullWidth maxWidth="md" open={openEdit} onClose={handleCloseEdit} TransitionComponent={Transition}>
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
                <form onSubmit={handleSubmitEdit}>
                    <DialogContent>
                        <FormControl style={{minWidth: 840, margin: '1rem'}} margin="normal">
                            <InputLabel id="demo-simple-select-label">Tên sách</InputLabel>
                            <Select
                                name="idsach"
                                value={dataFormEdit.idsach}
                                onChange={(e) => setDataFormEdit(prevState => ({
                                    ...prevState,
                                    idsach: e.target.value
                                }))}
                                labelId="demo-simple-select-label"
                            >
                                {sach.map((value) => (
                                    <MenuItem value={value.idsach} key={value.idsach}>
                                        {value.tensach}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            style={{margin: '0 0 2rem 1rem'}}
                            variant="outlined"
                            id="title1"
                            label="Phần trăm"
                            type="number"
                            value={dataFormEdit.phan_tram}
                            onChange={(e) => {
                                if (e.target.value < 1) return setDataFormEdit(prevState => ({
                                    ...prevState,
                                    phan_tram: 1
                                }))
                                else return setDataFormEdit(prevState => ({
                                    ...prevState,
                                    phan_tram: e.target.value
                                }))
                            }}
                        />
                        <div>

                            <TextField
                                id="date"
                                label="Ngày bắt đầu"
                                type="datetime-local"
                                defaultValue={dataFormEdit.ngay_bd_km}
                                style={{width: 300, margin: '0 1rem'}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e => setDataFormEdit(prevState => ({
                                    ...prevState,
                                    ngay_bd_km: e.target.value
                                }))}
                            />

                            <TextField
                                id="date"
                                label="Ngày hết hạn"
                                type="datetime-local"
                                defaultValue={dataFormEdit.ngay_het_km}
                                style={{width: 300, margin: '0 1rem'}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e => setDataFormEdit(prevState => ({
                                    ...prevState,
                                    ngay_het_km: e.target.value
                                }))}
                            />
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            color="primary"
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
        </Page>
    );
}

export default Sale;