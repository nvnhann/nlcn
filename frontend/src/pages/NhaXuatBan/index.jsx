import React, { useEffect, useState } from 'react';
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
  DialogActions,
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import { DataGrid } from '@mui/x-data-grid';
import { escapeRegExp } from '../../ultils/escapRegExp';
import { useForm } from 'react-hook-form';
import InputText from '../../Component/Form-control/InputText';
import { useSnackbar } from 'notistack';
import NhaXuatBanAPI from '../../API/NhaXuatBanAPI';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NhaCungCap() {
  const [data, setData] = useState([]);
  const [idnxb, setIdnxb] = useState('');
  const [filterData, setFilterData] = useState(data);
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [count, setCount] = useState(0);
  const [tennxb, setTennxb] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const form = useForm({
    defaultValues: {
      tennxb: '',
      diachi: '',
    },
  });

  const formEdit = useForm({
    defaultValues: {
      tennxb: '',
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
      const res = await NhaXuatBanAPI.get();
      setData(res);
      setFilterData(res);
    })();
  }, [count]);

  const handleSubmit = async (value) => {
    try {
      await NhaXuatBanAPI.create(value);
      form.reset();
      enqueueSnackbar('Thêm thành công', { variant: 'success', autoHideDuration: 2000 });
      setCount((e) => e + 1);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 2000 });
    }
  };

  const submitDelete = async () => {
    try {
      await NhaXuatBanAPI.delete(idnxb);
      enqueueSnackbar('Xóa nhà xuất bản ' + tennxb + ' thành công', {
        variant: 'success',
        autoHideDuration: 2000,
      });
      handleCloseDelete();
      setCount((e) => e + 1);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 2000 });
    }
  };

  const handleSubmitEdit = async (value) => {
    try {
      await NhaXuatBanAPI.update(idnxb, value);
      enqueueSnackbar('Thay đổi thành công', { variant: 'success', autoHideDuration: 2000 });
      handleCloseEdit();
      setCount((e) => e + 1);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 2000 });
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

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 200,
    },
    {
      field: 'tennxb',
      headerName: 'Tên nhà xuất bản',
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
              onClick={() => {
                handleClickOpenDelete();
                setTennxb(params.row.tennxb);
                setIdnxb(params.row.id);
              }}
              startIcon={<Icon icon="fluent:delete-24-filled" color="#ff4444" />}
              size="small"
            >
              Xóa
            </Button>
          </strong>

          <strong>
            <Button
              onClick={() => {
                setTimeout(() => {
                  formEdit.setValue('tennxb', params.row.tennxb);
                  formEdit.setValue('diachi', params.row.diachi);
                }, 10);
                setIdnxb(params.row.id);
                handleClickOpenEdit();
              }}
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
      id: e.idnxb,
      tennxb: e.tennxb,
      diachi: e.dia_chi,
      action: e.idnxb,
    });
  });

  return (
    <div>
      <Page title="Nhà xuất bản">
        <Typography color="primary" variant="h4" gutterBottom>
          Nhà Xuất Bản
        </Typography>

        <Box my={2}>
          <TextField
            value={searchText}
            onChange={(e) => requestSearch(e.target.value)}
            style={{ width: '40ch' }}
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
          <Button
            onClick={handleClickOpen}
            variant="contained"
            style={{ textTransform: 'none', marginLeft: '1rem' }}
            color="primary"
            startIcon={<Icon icon="bi:plus-square-fill" color="#ffffff" />}
          >
            Thêm nhà xuất bản
          </Button>
        </Box>
        <Box>
          <div style={{ height: 390, width: '100%' }}>
            <div style={{ height: 390, width: '100%' }}>
              <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
            </div>
          </div>
        </Box>
      </Page>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
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
            <Icon icon="majesticons:close" color="#6b7280" />
          </IconButton>
        </DialogTitle>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogContent>
            <InputText fullWidth label="Tên nhà xuất bản" name="tennxb" form={form} />
            <InputText fullWidth label="Địa chỉ" form={form} name="diachi" />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ textTransform: 'none' }}
            >
              Thêm
            </Button>
            <Button onClick={handleClose} style={{ textTransform: 'none' }}>
              Đóng
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="md"
        open={openEdit}
        onClose={handleCloseEdit}
        TransitionComponent={Transition}
      >
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
            <Icon icon="majesticons:close" color="#6b7280" />
          </IconButton>
        </DialogTitle>
        <form onSubmit={formEdit.handleSubmit(handleSubmitEdit)}>
          <DialogContent>
            <InputText fullWidth label="Tên nhà cung cấp" name="tennxb" form={formEdit} />
            <InputText fullWidth label="Địa chỉ" form={formEdit} name="diachi" />
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              style={{ textTransform: 'none' }}
            >
              Đồng ý
            </Button>
            <Button onClick={handleCloseEdit} style={{ textTransform: 'none' }}>
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
            <Icon icon="majesticons:close" color="#6b7280" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box style={{ width: '26rem' }} m={2} textAlign="center">
            <Typography variant="h5">Bạn muốn xóa: {tennxb}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={submitDelete}
            color="primary"
            variant="contained"
            style={{ textTransform: 'none' }}
          >
            Đồng ý
          </Button>
          <Button onClick={handleCloseDelete} style={{ textTransform: 'none' }}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NhaCungCap;
