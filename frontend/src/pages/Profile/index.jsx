import React, {useEffect, useState} from 'react';
import { Grid, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Account from './Account';
import Page from '../../Component/Page';
import {useDispatch} from "react-redux";
import {getProfile} from "../../Store/profileSlice";
import SoDiaChi from "./SoDiaChi";
const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: '10rem',
  },
  listItem: {
    textDecoration: 'none!important',
    height: 40,
    width: 'calc(100% - 16px)',
    borderRadius: '0 20px 20px 0',
    paddingLeft: 24,
    paddingRight: 12,
  },
  selected: {
    backgroundColor: theme.palette.primary.main + '!important',
    color: '#fff',
  },
}));
export default function Profile() {
  const classes = useStyle();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(()=>{
    (async ()=>{
      dispatch(await getProfile())
    })()
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  const list = [
    {
      index: 0,
      primary: 'Bảng điều khiển tài khoản',
    },
    {
      index: 1,
      primary: 'Sổ địa chỉ',
    },
    {
      index: 2,
      primary: 'Đơn hàng của tôi',
    },
    {
      index: 3,
      primary: 'Nhận xét của tôi',
    },
    {
      index: 4,
      primary: 'Yêu thích',
    },
    {
      index: 5,
      primary: 'Thông báo',
    },
    {
      index: 6,
      primary: 'Đổi mật khẩu',
    },
  ];
  return (
    <Page title="Thông tin cá nhân">
      <Grid container spacing={2} style={{ height: '100vh' }}>
        <Grid item lg={3}>
          <Paper elevation={4}>
            <List component="nav">
              {list.map((element) => (
                <div key={element.index}>
                  <ListItem
                    button
                    classes={{ root: classes.listItem, selected: classes.selected }}
                    selected={selectedIndex === element.index}
                    onClick={(event) => {
                      handleListItemClick(event, element.index);
                    }}
                  >
                    <ListItemText
                      primary={<Typography href={element.path}>{element.primary}</Typography>}
                    />
                  </ListItem>
                </div>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item lg={9}>
          {selectedIndex === 0 && <Account />}
          {selectedIndex === 1 && <SoDiaChi/>}

        </Grid>
      </Grid>
    </Page>
  );
}
