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
import KichThuotAPI from '../../API/KichThuotAPI';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NhaCungCap() {
  const [data, setData] = useState([]);
  const [idkt, setIdkt] = useState('');
  const [filterData, setFilterData] = useState(data);
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [count, setCount] = useState(0);
  const [ngang, setNgang] = useState('');
  const [doc, setDoc] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const form = useForm({
    defaultValues: {
      ngang: '',
      doc: '',
    },
  });

  const formEdit = useForm({
    defaultValues: {
      ngang: '',
      doc: '',
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
      const res = await KichThuotAPI.get();
      setData(res);
      setFilterData(res);
    })();
  }, [count]);

  const handleSubmit = async (value) => {
    try {
      await KichThuotAPI.create(value);
      form.reset();
      enqueueSnackbar('Th??m th??nh c??ng', { variant: 'success', autoHideDuration: 2000 });
      setCount((e) => e + 1);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 2000 });
    }
  };

  const submitDelete = async () => {
    try {
      await KichThuotAPI.delete(idkt);
      enqueueSnackbar('X??a kich thuot ' + ngang + 'x' + doc + ' cm' +' th??nh c??ng', {
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
      await KichThuotAPI.update(idkt, value);
      enqueueSnackbar('Thay ?????i th??nh c??ng', { variant: 'success', autoHideDuration: 2000 });
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
      field: 'kichthuot',
      headerName: 'Kich Th?????t',
      width: 200,
    },
    {
      field: 'ngang',
      headerName: 'Ngang',
      width: 200,
    },
    {
      field: 'doc',
      headerName: 'D???c',
      width: 200,
    },
    {
      field: 'action',
      headerName: 'H??nh ?????ng',
      width: 200,
      renderCell: (params) => (
        <>
          <strong>
            <Button
              onClick={() => {
                handleClickOpenDelete();
                setNgang(params.row.ngang);
                setIdkt(params.row.id);
                setDoc(params.row.doc);
              }}
              startIcon={<Icon icon="fluent:delete-24-filled" color="#ff4444" />}
              size="small"
            >
              X??a
            </Button>
          </strong>

          <strong>
            <Button
              onClick={() => {
                setTimeout(() => {
                  formEdit.setValue('ngang', params.row.ngang);
                  formEdit.setValue('doc', params.row.doc);
                }, 10);
                setIdkt(params.row.id);
                handleClickOpenEdit();
              }}
              startIcon={<Icon icon="eva:edit-2-fill" color="#33b5e5" />}
              size="small"
            >
              S???a
            </Button>
          </strong>
        </>
      ),
    },
  ];

  const rows = [];

  filterData?.forEach((e) => {
    rows.push({
      id: e.idkt,
      kichthuot: e.kt_doc + 'x' + e.kt_ngang + ' cm',
      ngang: e.kt_ngang,
      doc: e.kt_doc,
      action: e.idnxb,
    });
  });

  return (
    <div>
      <Page title="K??ch th?????t">
        <Typography color="primary" variant="h4" gutterBottom>
          K??ch th?????t
        </Typography>

        <Box my={2}>
          <TextField
            value={searchText}
            onChange={(e) => requestSearch(e.target.value)}
            style={{ width: '40ch' }}
            variant="standard"
            placeholder="T??m ki???m ..."
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
            Th??m k??ch th?????t
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
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
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
            <InputText fullWidth label="Ngang" name="ngang" form={form} />
            <InputText fullWidth label="D???c" form={form} name="doc" />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ textTransform: 'none' }}
            >
              Th??m
            </Button>
            <Button onClick={handleClose} style={{ textTransform: 'none' }}>
              ????ng
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog open={openEdit} onClose={handleCloseEdit} TransitionComponent={Transition}>
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
            <InputText fullWidth label="Ngang" name="ngang" form={formEdit} />
            <InputText fullWidth label="D???c" form={formEdit} name="doc" />
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              style={{ textTransform: 'none' }}
            >
              ?????ng ??
            </Button>
            <Button onClick={handleCloseEdit} style={{ textTransform: 'none' }}>
              ????ng
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
            <Typography variant="h5">B???n mu???n x??a: {ngang + 'x' + doc}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={submitDelete}
            color="primary"
            variant="contained"
            style={{ textTransform: 'none' }}
          >
            ?????ng ??
          </Button>
          <Button onClick={handleCloseDelete} style={{ textTransform: 'none' }}>
            ????ng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NhaCungCap;
