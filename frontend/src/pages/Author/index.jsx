import React, { useEffect, useState } from 'react';
import tacGiaApi from 'src/API/tacGiaApi';
import Page from 'src/Component/Page';
import { Box, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { DataGrid } from '@mui/x-data-grid';

function Author() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState(data);

  useEffect(() => {
    (async () => {
      const res = await tacGiaApi.get();
      console.log(res);
      setData(res);
      setFilterData(res);
    })();
  }, []);

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
        <strong>
          <Button
            onClick={() => console.log(params.row.ten)}
            startIcon={<Icon icon="fluent:delete-24-filled" color="#ff4444" />}
            size="small"
          >
            Xóa
          </Button>
        </strong>
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
