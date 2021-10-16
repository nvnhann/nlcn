import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuantity, removeFromCart } from '../../Store/cartSlice';
import Page from '../../Component/Page';
import { Icon } from '@iconify/react';
import { cartItemTotal } from '../../Store/selecters';
function ShopCart() {
  const cart = useSelector((state) => state.cart.cartItem);
  const total = useSelector(cartItemTotal);
  const dispatch = useDispatch();
  const cell = [
    {
      name: 'Tên sách',
    },
    {
      name: 'Hình ảnh',
    },
    {
      name: 'Giá',
    },
    {
      name: 'Số lượng',
    },
    {
      name: 'Hành động',
    },
  ];

  return (
    <Page title="Giỏ hàng">
      <Paper style={{ maxWidth: 1000, margin: '0 auto', paddingBottom: '5rem' }}>
        <TableContainer>
          <Table>
            <TableHead style={{ backgroundColor: '#6b7280' }}>
              <TableRow>
                {cell.map((e, index) => (
                  <TableCell style={{ color: '#fff' }} key={index}>
                    {e.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((e) => (
                <TableRow key={e.idsach}>
                  <TableCell>{e.tensach}</TableCell>
                  <TableCell>
                    <Avatar
                      variant="square"
                      style={{ width: '5rem', height: '5rem', borderRadius: '5px' }}
                      src={e.hinhanh}
                    />
                  </TableCell>
                  <TableCell>$ {e.gia}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        dispatch(
                          setQuantity({
                            idsach: e.idsach,
                            soluong: e.soluong < 2 ? 1 : e.soluong - 1,
                          })
                        );
                      }}
                    >
                      <Icon icon="gg:remove" />
                    </IconButton>
                    <span>{e.soluong}</span>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        dispatch(
                          setQuantity({
                            idsach: e.idsach,
                            soluong: e.soluong + 1,
                          })
                        );
                      }}
                    >
                      <Icon icon="carbon:add-alt" />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        dispatch(dispatch(removeFromCart(e.idsach)));
                      }}
                    >
                      <Icon icon="fluent:delete-24-filled" color="red" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box>
          <div style={{ margin: '1rem' }}>
            <Typography component="span">Tổng thanh toán: </Typography>
            <Typography component="span" color="secondary">
              ${total}
            </Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            style={{ textTransform: 'none', width: '12rem', margin: '1rem' }}
          >
            Thanh toán
          </Button>
        </Box>
      </Paper>
    </Page>
  );
}

export default ShopCart;
