import Page from '../../Component/Page';
import {
    Box,
    Typography,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    IconButton, TableBody, Dialog, DialogTitle, Slide, DialogContent, DialogActions, TextField
} from '@material-ui/core';
import React,{useEffect, useState} from 'react';
import userAPI from '../../API/userAPI';
import {Icon} from '@iconify/react';
import {useSnackbar} from 'notistack';
import {Pagination} from "@material-ui/lab";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function User() {
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState(data);
    const [filter, setFilter] = useState({idtk: 'ASC', hoten: '', search: ''})
    const [page, setPage] = useState(1);
    const [idtk, setIdtk] = useState('');
    const [count, setCount] = useState(0);
    const {enqueueSnackbar} = useSnackbar();
    const [openDelete, setOpenDelete] = useState(false);

    const handlePage = (event, value) => {
        setPage(value);
    };

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = (e, r) => {
        if (r === 'backdropClick' || r === 'escapeKeyDown') return;
        setOpenDelete(false);
    };

    useEffect(() => {
        (async () => {
            const f = filter;
            f.page = page;
            const res = await userAPI.getAll(f);
            setData(res);
            setFilterData(res);
        })();
    }, [count, filter.idtk, filter.hoten, filter.search, page]);

    const submitDelete = async () =>{
        try {
            await userAPI.delete(idtk);
            enqueueSnackbar('Đã xoá thành công', {
                variant: 'success', autoHideDuration: 2000,
            });
            handleCloseDelete();
            setCount((e) => e + 1);
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000});
        }
    }

    return (
        <Page title="User">
            <Box style={{width: '70rem', margin: '0 auto'}}>
                <TextField
                    value={filter.search}
                    onChange={(e) => setFilter(prevState => ({
                        ...prevState, search: e.target.value
                    }))}
                    style={{width: '40ch', margin: '1rem 0'}}
                    variant="standard"
                    placeholder="Tìm kiếm ..."
                    InputProps={{
                        startAdornment: (<IconButton>
                            <Icon icon="bi:search" color="#6b7280"/>
                        </IconButton>), endAdornment: (<IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{visibility: filter.search ? 'visible' : 'hidden'}}
                            onClick={() => setFilter(prevState => ({
                                ...prevState, search: ''
                            }))}
                        >
                            <Icon icon="ic:outline-clear" color="#6b7280"/>
                        </IconButton>),
                    }}
                />
                <TableContainer style={{height: '37rem'}}>
                    <Table>
                        <TableHead style={{backgroundColor: '#6b7280'}}>
                            <TableRow>
                                <TableCell align="center" style={{color: '#fff'}}>
                                    ID User
                                    {filter.idtk === 'DESC' ? (<IconButton onClick={() => {
                                        setFilter(prevState => ({
                                            ...prevState, hoten: '', idtk: 'ASC'
                                        }))
                                    }}>
                                        <Icon icon="akar-icons:arrow-down" color="#fff"/>
                                    </IconButton>) : (<IconButton
                                        onClick={() => {
                                            setFilter(prevState => ({
                                                ...prevState, hoten: '', idtk: 'DESC'
                                            }))
                                        }}
                                    >
                                        <Icon icon="akar-icons:arrow-up" color="#fff"/>
                                    </IconButton>)}

                                </TableCell>
                                <TableCell align="center" style={{color: '#fff'}}>
                                    Họ và tên
                                    {filter.hoten === 'DESC' ? (<IconButton onClick={() => {
                                        setFilter(prevState => ({
                                            ...prevState, hoten: 'ASC'
                                        }))
                                    }}>
                                        <Icon icon="akar-icons:arrow-down" color="#fff"/>
                                    </IconButton>) : (<IconButton
                                        onClick={() => {
                                            setFilter(prevState => ({
                                                ...prevState, hoten: 'DESC'
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
                                    Email
                                </TableCell>
                                <TableCell align="center" style={{color: '#fff'}}>
                                    Hành động
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        {/*table body*/}
                        <TableBody>
                            {filterData?.map(e => (<TableRow key={e.idtk}>
                                <TableCell align="center">{e.idtk} </TableCell>
                                <TableCell  align="center">{e.hoten || ''  }</TableCell>
                                <TableCell  align="center">{e.sdt}</TableCell>
                                <TableCell >{e.email}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        onClick={() => {
                                            handleClickOpenDelete();
                                            setIdtk(e.idtk);
                                        }}
                                        startIcon={<Icon icon="fluent:delete-24-filled" color="#ff4444"/>}
                                        size="small"
                                        style={{textTransform: 'none'}}
                                    >
                                        Xóa
                                    </Button>

                                </TableCell>
                            </TableRow>))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination size="small" style={{margin: '1rem 0'}} count={Math.ceil(filterData[0]?.so_luong / 8)} color="primary"
                            page={page} onChange={handlePage}/>
            </Box>

            <Dialog open={openDelete} onClose={handleCloseDelete} TransitionComponent={Transition}>
                <DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDelete}
                        style={{
                            position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <Icon icon="majesticons:close" color="#6b7280"/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box style={{width: '26rem'}} m={2} textAlign="center">
                        <Typography variant="h5">Xác nhận xóa</Typography>
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
        </Page>
    );
}
