import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Toolbar,
  Typography,
  Chip,
  Divider,
  Button,
  TextField,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import SachApi from '../../API/SachAPI';
import Page from '../../Component/Page';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../../Store/cartSlice';

function ProductDetail() {
  const match = useMatch('/app/:idsach');
  const idsach = match.params.idsach;
  const [soluong, setSoluong] = useState(1);
  const [sach, setSach] = useState([]);
  const dispatch = useDispatch();
  const addCart = () => {
    dispatch(
      addtoCart({
        idsach: sach.idsach,
        tensach: sach.tensach,
        gia: sach.gia_sach,
        soluong: parseInt(soluong),
        hinhanh: sach.hinhanh,
      })
    );
  };
  useEffect(() => {
    (async () => {
      setSach(await SachApi.getById(idsach));
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Page title={sach.tensach}>
      <Box>
        <Paper elevation={0}>
          <Grid container>
            <Grid item xs={4}>
              <CardMedia component="img" image={sach.hinhanh} style={{ boxShadow: '16px' }} />

              <Grid container style={{ marginTop: '1rem' }}>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    style={{ textTransform: 'none' }}
                    startIcon={<Icon icon="emojione-monotone:shopping-cart" />}
                    onClick={() => {
                      addCart();
                    }}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ textTransform: 'none', width: '12rem' }}
                  >
                    Mua ngay
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Card>
                <AppBar position="static" elevation={0}>
                  <Toolbar style={{ padding: '.5rem' }}>
                    <Typography color="inherit" variant="h4">
                      {sach.tensach}
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography component="span">Nhà xuất bản: </Typography>
                      <Typography component="span" color="secondary">
                        {sach.tennxb}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography component="span">Tác giả: </Typography>
                      <Typography component="span" color="secondary">
                        {sach.hotentg}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography component="span">Nhà cung cấp: </Typography>
                      <Typography component="span" color="secondary">
                        {sach.tenncc}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography component="span">Hình thức bìa: </Typography>
                      <Typography component="span" color="secondary">
                        {sach.hinh_thuc_bia}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Rating name="read-only" value={5} readOnly />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography component="span" variant="h5" color="secondary">
                        {sach.gia_sach}${' '}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body1"
                        style={{
                          color: 'text.disabled',
                          textDecoration: 'line-through',
                        }}
                      >
                        5$
                      </Typography>
                      <Chip
                        style={{ margin: '0 0 .5rem 1rem' }}
                        color="secondary"
                        size="small"
                        label="-5%"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" component="span">
                        Số lượng:
                      </Typography>
                      <TextField
                        style={{ margin: '0 0 2rem 1rem' }}
                        variant="outlined"
                        id="title1"
                        label="Số lượng"
                        type="number"
                        value={soluong}
                        onChange={(e) => {
                          if (e.target.value < 1) return setSoluong(1);
                          else setSoluong(e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Divider style={{ margin: '1rem 0' }} />
                  <Typography style={{ margin: '1rem 0' }} color="primary" variant="h4">
                    Thông tin chi tiết
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography component="span">Mã sách: </Typography>
                      <Typography component="span" color="secondary">
                        {sach.idsach}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography component="span">Ngôn ngữ: </Typography>
                      <Typography component="span" color="secondary">
                        {sach.ngon_ngu}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography component="span">Thể loại: </Typography>
                      <Typography component="span" color="secondary">
                        {sach.tentl}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography component="span">Kích thướt: </Typography>
                      <Typography component="span" color="secondary">
                        {sach.kt_doc + 'x' + sach.kt_ngang + ' cm'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography component="span">Số trang: </Typography>
                      <Typography component="span" color="secondary">
                        {sach.so_trang}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography component="span">Trọng lượng: </Typography>
                      <Typography component="span" color="secondary">
                        {sach.trong_luong + ' gram'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography component="span">Hình thức bìa: </Typography>
                      <Typography component="span" color="secondary">
                        {sach.hinh_thuc_bia}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider style={{ margin: '1rem 0' }} />
                  <Typography component="div" style={{ whiteSpace: 'pre-line' }}>
                    {sach.mo_ta}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Page>
  );
}

export default ProductDetail;
