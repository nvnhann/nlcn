import React, {useEffect, useState} from 'react';
import Page from '../../Component/Page';
import ProductList from './ProductList';
import {
    Box,
    Button,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Popover,
    Select,
} from '@material-ui/core';
import SachApi from '../../API/SachAPI';
import {useNavigate, useSearchParams} from "react-router-dom";
import TheLoaiAPI from "../../API/TheLoaiAPI";
import NhomTheLoaiAPI from "../../API/NhomTheLoaiAPI";
import TacGiaApi from "../../API/tacGiaApi";

function Product() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [book, setBook] = useState([]);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [theloai, setTheloai] = useState([]);
    const [nhomtl, setnhomtl] = useState([]);
    const [tacgia, setTacgia] = useState([]);
    const [filter, setFilter] = useState({sort: 'moinhat', dm: ''})
    const handleClickD = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseD = () => {
        setAnchorEl(null);
    };
    const openD = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


    useEffect(() => {
        (async () => {
            setBook(await SachApi.get({search: searchParams.get('s'), sort: filter.sort}));
            setTheloai(await TheLoaiAPI.get());
            setnhomtl(await NhomTheLoaiAPI.get());
            setTacgia(await TacGiaApi.get());
        })();
    }, [searchParams, filter]);

    return (
        <Page title="Sách">
            <Box>
                <FormControl style={{minWidth: 140}}>
                    <InputLabel id="filter-select">Sắp xếp theo</InputLabel>
                    <Select
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        labelId="filter-select"
                        value={filter.sort}
                        onChange={(e) => {
                            setFilter(prevState => ({...prevState, sort: e.target.value}))
                        }}
                    >
                        <MenuItem value="moinhat">Mới nhất</MenuItem>
                        <MenuItem value="gia_giam">Giá giảm</MenuItem>
                        <MenuItem value="gia_tang">Giá tăng</MenuItem>
                        <MenuItem value="khuyenmai">Khuyến mãi</MenuItem>
                    </Select>
                </FormControl>
                <Button style={{textTransform: 'none', margin: '.75rem 1rem '}} variant="contained" color="primary"
                        onClick={handleClickD}>Danh
                    mục sản phẩm</Button>
                <Popover open={openD}
                         anchorEl={anchorEl}
                         onClose={handleCloseD}
                         anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                         transformOrigin={{vertical: 'top', horizontal: 'right'}}
                >
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        <Grid container>
                            {nhomtl?.map(e => (
                                <Grid item md>
                                    <ListItem button key={e.idntl} style={{
                                        width: '10rem',
                                        backgroundColor: '#6b7280',
                                        color: '#fff',
                                        margin: '0 .5rem'
                                    }}
                                              onClick={() => {
                                                  navigate({pathname: '/app?s=' + e.tenntl});
                                                  handleCloseD();
                                              }}
                                    >
                                        <ListItemText primary={e.tenntl}/>
                                    </ListItem>
                                    <List component="div" disablePadding>
                                        {theloai?.map(ev => (
                                            (e.idntl === ev.idntl && (
                                                <ListItem
                                                    key={ev.idtl}
                                                    button
                                                    style={{marginLeft: '1rem'}}
                                                    onClick={() => {
                                                        navigate({pathname: '/app?s=' + ev.tentl});
                                                        handleCloseD();
                                                    }}

                                                >
                                                    <ListItemText primary={ev.tentl}/>
                                                </ListItem>
                                            ))
                                        ))}
                                    </List>
                                </Grid>
                            ))}
                            <Grid item md>
                                <ListItem style={{backgroundColor: '#6b7280', color: '#fff', margin: '0 .5rem'}}>
                                    <ListItemText primary="Tác giả"/>
                                </ListItem>
                                <List component="div" disablePadding>
                                    {tacgia?.map(ev => (
                                            <ListItem onClick={() => {
                                                navigate({pathname: '/app?s=' + ev.hotentg});
                                                handleCloseD();
                                            }} button key={ev.idtg} style={{marginLeft: '1rem', width: '15rem'}}>
                                                <ListItemText primary={ev.hotentg}/>
                                            </ListItem>
                                        )
                                    )}
                                </List>
                            </Grid>
                        </Grid>
                    </List>
                </Popover>
            </Box>
            <Divider style={{margin: '1rem 0'}}/>
            <ProductList products={book}/>
        </Page>
    );
}

export default Product;
