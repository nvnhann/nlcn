import React, { useEffect, useState } from 'react';
import tacGiaApi from 'src/API/tacGiaApi';
import Page from 'src/Component/Page';
import { Box, Typography, Button, TextField, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import { DataGrid } from '@mui/x-data-grid';
import { escapeRegExp } from 'src/ultils/escapRegExp';
import { IconButton } from '@material-ui/core';

function Author() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState(data);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    (async () => {
      const res = await tacGiaApi.get();
      console.log(res);
      setData(res);
      setFilterData(res);
    })();
  }, []);

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

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 200,
    },
    {
      field: 'hotentg',
      headerName: 'Họ và tên tác giả',
      width: 200,
    },

    {
      field: 'diachi',
      headerName: 'Địa chỉ',
      width: 300,
    },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 200,
      renderCell: (params) => (
        <>
          <strong>
            <Button
              onClick={() => console.log(params.row)}
              startIcon={<Icon icon="fluent:delete-24-filled" color="#ff4444" />}
              size="small"
            >
              Xóa
            </Button>
          </strong>
          <strong>
            <Button
              onClick={() => console.log(params.row)}
              startIcon={<Icon icon="eva:edit-2-fill" color="#33b5e5" />}
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
      id: e.idtg,
      hotentg: e.hotentg,
      diachi: e.dia_chi,
      action: e.id,
    });
  });

  return (
    <div>
      <Page title="Tác giả">
        <Typography color="primary" variant="h4" gutterBottom>
          Tác giả
        </Typography>

        <Box sx={{ my: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <TextField
              value={searchText}
              onChange={(e) => requestSearch(e.target.value)}
              sx={{ width: '40ch' }}
              variant="standard"
              placeholder="Tìm kiếm ..."
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <Icon icon="bi:search" color="#6b7280" />
                  </IconButton>
                ),
                endAdornment: (
                  <IconButton
                    title="Clear"
                    aria-label="Clear"
                    size="small"
                    style={{ visibility: searchText ? 'visible' : 'hidden' }}
                    onClick={() => requestSearch('')}
                  >
                    <Icon icon="ic:outline-clear" color="#6b7280" />
                  </IconButton>
                ),
              }}
            />
            <Button variant="contained" color="primary" startIcon={<Icon icon="bi:plus-square-fill" color="#ffffff" />}>
              Thêm tác giả
            </Button>
          </Stack>
        </Box>
        <Box>
          <div style={{ height: 400, width: '100%' }}>
            <div style={{ height: 350, width: '100%' }}>
              <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
            </div>
          </div>
        </Box>
      </Page>
    </div>
  );
}

export default Author;
