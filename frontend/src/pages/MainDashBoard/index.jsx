import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, Typography} from "@material-ui/core";
import {Icon} from "@iconify/react";
import hoaDonAPI from "../../API/HoaDonAPI";


function MainDashBoard() {

    const [data,setData] = useState([]);

    useEffect(() => {
        (async () => {
           const res = await hoaDonAPI.thongke();
           setData(res);
        })();
    }, []);

    console.log(data)
    return (
        <>
            <Card style={{margin: '5rem 0'}}>
               <CardContent>
                  <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      style={{textTransform: 'none', margin: '0 1rem'}}
                    endIcon={ <Icon icon="majesticons:user-group" />}
                  >
                      {data?.sltk} User
                  </Button>
                   <Button
                       size="large"
                       color="primary"
                       variant="contained"
                       style={{textTransform: 'none', margin: '0 1rem'}}
                       endIcon={<Icon icon="emojione-monotone:money-bag" />}
                   >
                      Doanh thu   {data?.tonggia}
                   </Button>
                   <Button
                       size="large"
                       color="primary"
                       variant="contained"
                       style={{textTransform: 'none', margin: '0 1rem'}}
                       endIcon={<Icon icon="emojione-monotone:green-book" />}
                   >
                       {data?.slsach} Quyển sách
                   </Button>
                   <Button
                       size="large"
                       color="primary"
                       variant="contained"
                       style={{textTransform: 'none', margin: '0 1rem'}}
                       endIcon={ <Icon icon="icon-park-outline:bill" />}
                   >
                       {data?.sldon} Đơn hàng
                   </Button>
                   <Button
                       size="large"
                       color="primary"
                       variant="contained"
                       style={{textTransform: 'none', margin: '0 1rem'}}
                       endIcon={ <Icon icon="fa-solid:house-user" />}
                   >
                       {data?.slncc} Nhà cung cấp
                   </Button>
                   <Button
                       size="large"
                       color="primary"
                       variant="contained"
                       style={{textTransform: 'none', margin: '0 1rem'}}
                       endIcon={ <Icon icon="carbon:user-filled" />}
                   >
                       {data?.sltg} Tác giả
                   </Button>
                   <Button
                       size="large"
                       color="primary"
                       variant="contained"
                       style={{textTransform: 'none', margin: '1rem'}}
                       endIcon={ <Icon icon="ci:user-square" />}
                   >
                       {data?.slnxb} Nhà xuất bản
                   </Button>
                   <Button
                       size="large"
                       color="primary"
                       variant="contained"
                       style={{textTransform: 'none', margin: '1rem'}}
                       endIcon={ <Icon icon="dashicons:category" />}
                   >
                       {data?.sltl} Thể loại
                   </Button>

                  <Box style={{margin: '1rem 0'}}>
                      <Typography align="center" variant="h4" color="primary" >Mọi thắc mắc vui lòng liên hệ quản trị website</Typography>
                      <Typography align="center" variant="h4" color="primary">Email: nvnhan.dev@gmail.com</Typography>
                      <Typography align="center" variant="h4" color="primary">Số điện thoại: 0794351150</Typography>

                  </Box>
               </CardContent>
            </Card>
        </>
    );
}

export default MainDashBoard;