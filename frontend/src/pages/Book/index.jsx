import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
  Typography,
} from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { escapeRegExp } from '../../ultils/escapRegExp';
import Page from '../../Component/Page';
import { Controller, useForm } from 'react-hook-form';
import InputText from '../../Component/Form-control/InputText';
import TheLoaiAPI from '../../API/TheLoaiAPI';
import tacGiaApi from '../../API/tacGiaApi';
import NgonNguAPI from '../../API/NgonNguAPI';
import NhaXuatBanAPI from '../../API/NhaXuatBanAPI';
import KichThuotAPI from '../../API/KichThuotAPI';
import NhaCungCapAPI from '../../API/NhaCungCapAPI';
import SachAPI from '../../API/SachAPI';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useSnackbar } from 'notistack';
import { DataGrid } from '@mui/x-data-grid';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Book() {
  const [searchText, setSearchText] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [tacgia, setTacgia] = useState([]);
  const [ngonngu, setNgonNgu] = useState([]);
  const [nhaxuatban, setNhaxuatban] = useState([]);
  const [kichthuot, setKichThuot] = useState([]);
  const [nhacungcap, setNhacungcap] = useState([]);
  const [theloai, setTheloai] = useState([]);
  const [filterData, setFilterData] = useState(data);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [filenameE, SetfilenameE] = useState('');
  const [filename, Setfilename] = useState('');
  const [count, setCount] = useState(0);
  const [idsach, setIdsach] = useState('');
  const [tensach, setTenSach] = useState('');

  useEffect(() => {
    (async () => {
      setTacgia(await tacGiaApi.get());
      setNgonNgu(await NgonNguAPI.get());
      setNhaxuatban(await NhaXuatBanAPI.get());
      setKichThuot(await KichThuotAPI.get());
      setNhacungcap(await NhaCungCapAPI.get());
      setTheloai(await TheLoaiAPI.get());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await SachAPI.getAll();
      setData(res);
      setFilterData(res);
    })();
  }, [count]);

  const schema = yup.object().shape({
    trong_luong: yup
      .number()
      .min(1, 'Trọng lượng không hợp lệ')
      .typeError('Trọng lượng không hợp lệ!'),
    so_luong: yup.number().min(1, 'Trọng lượng không hợp lệ').typeError('Số lượng không hợp lệ!'),
    so_trang: yup.number().min(1, 'Số trang không hợp lệ').typeError('Số trang không hợp lệ!'),
    gia_sach: yup.number().min(1, 'Giá sách không hợp lệ').typeError('Giá sách không hợp lệ!'),
  });
  const form = useForm({
    defaultValues: {
      tensach: '',
      gia_sach: '',
      hinhanh: '',
      mo_ta: '',
      so_luong: '',
      hinh_thuc_bia: '',
      trong_luong: '',
      so_trang: '',
      idtg: '',
      idnn: '',
      idkt: '',
      idncc: '',
      idtl: '',
      idnxb: '',
    },
    resolver: yupResolver(schema),
  });

  const formEdit = useForm({
    defaultValues: {
      tensach: '',
      gia_sach: '',
      hinhanh: '',
      mo_ta: '',
      so_luong: '',
      hinh_thuc_bia: '',
      trong_luong: '',
      so_trang: '',
      idtg: '',
      idnn: '',
      idkt: '',
      idncc: '',
      idtl: '',
      idnxb: '',
    },
    resolver: yupResolver(schema),
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
      field: 'action',
      headerName: 'Hành động',
      width: 200,
      renderCell: (params) => (
        <>
          <strong>
            <Button
              onClick={() => {
                handleClickOpenDelete();
                setIdsach(params.row.id);
                setTenSach(params.row.tensach);
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
                handleClickOpenEdit();
                setTimeout(() => {
                  formEdit.setValue('tensach', params.row.tensach);
                  formEdit.setValue('mo_ta', params.row.mota);
                  formEdit.setValue('so_trang', params.row.sotrang);
                  formEdit.setValue('trong_luong', params.row.trongluong);
                  formEdit.setValue('so_luong', params.row.soluong);
                  formEdit.setValue('hinh_thuc_bia', params.row.htb);
                  formEdit.setValue('idnxb', params.row.idnxb);
                  formEdit.setValue('idtg', params.row.idtg);
                  formEdit.setValue('gia_sach', params.row.giasach);
                  formEdit.setValue('idnn', params.row.idnn);
                  formEdit.setValue('idncc', params.row.idncc);
                  formEdit.setValue('idtl', params.row.idtl);
                  formEdit.setValue('idkt', params.row.idkt);
                }, 10);
                SetfilenameE(params.row.hinhanh);
                setIdsach(params.row.id);
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
    {
      field: 'id',
      headerName: 'ID',
      width: 200,
    },
    {
      field: 'tensach',
      headerName: 'Tên sách',
      width: 500,
    },
    {
      field: 'giasach',
      headerName: 'Giá sách ($)',
      width: 200,
    },
    {
      field: 'hinhanh',
      headerName: 'Hình ảnh',
      width: 150,
      renderCell: (params) => (
        <strong>
          <Avatar src={params.row.hinhanh} variant="rounded" />
        </strong>
      ),
    },
    {
      field: 'nxb',
      headerName: 'Nhà xuất bản',
      width: 200,
    },
    {
      field: 'mota',
      headerName: 'Mô tả',
      width: 400,
    },
    {
      field: 'ncc',
      headerName: 'Nhà cung cấp',
      width: 200,
    },
    {
      field: 'tacgia',
      headerName: 'Tác giả',
      width: 200,
    },
    {
      field: 'htb',
      headerName: 'Hình thức bìa',
      width: 200,
    },
    {
      field: 'soluong',
      headerName: 'Số lượng',
      width: 150,
    },
    {
      field: 'ngonngu',
      headerName: 'Ngôn ngữ',
      width: 150,
    },
    {
      field: 'trongluong',
      headerName: 'Trọng lượng(gr)',
      width: 150,
    },
    {
      field: 'kichthuot',
      headerName: 'Kích thướt',
      width: 150,
    },
    {
      field: 'sotrang',
      headerName: 'Số trang',
      width: 150,
    },
    { field: 'idtg', hide: true },
    { field: 'idncc', hide: true },
    { field: 'idnxb', hide: true },
    { field: 'idtl', hide: true },
    { field: 'idkt', hide: true },
    { field: 'idnn', hide: true },
  ];

  const rows = [];
  filterData?.forEach((e) => {
    rows.push({
      id: e.idsach,
      tensach: e.tensach,
      hinhanh: e.hinhanh,
      giasach: e.gia_sach,
      mota: e.mo_ta,
      nxb: e.tennxb,
      ncc: e.tenncc,
      tacgia: e.hotentg,
      htb: e.hinh_thuc_bia,
      soluong: e.so_luong,
      ngonngu: e.ngon_ngu,
      trongluong: e.trong_luong,
      kichthuot: e.kt_doc + 'x' + e.kt_ngang + ' cm',
      sotrang: e.so_trang,
      idtg: e.idtg,
      idnxb: e.idnxb,
      idncc: e.idncc,
      idtl: e.idtl,
      idkt: e.idkt,
      idnn: e.idnn,
      action: e.idncc,
    });
  });

  const handleSubmit = async (value) => {
    const formDt = new FormData();
    const data = {
      tensach: value.tensach,
      mo_ta: value.mo_ta,
      so_luong: value.so_luong,
      hinh_thuc_bia: value.hinh_thuc_bia,
      trong_luong: value.trong_luong,
      so_trang: value.so_trang,
      gia_sach: value.gia_sach,
      idtg: value.idtg,
      idnn: value.idnn,
      idkt: value.idkt,
      idncc: value.idncc,
      idtl: value.idtl,
      idnxb: value.idnxb,
    };
    formDt.append('data', JSON.stringify(data));
    formDt.append('hinh_anh', value.hinh_anh[0]);
    console.log(value);
    try {
      await SachAPI.create(formDt);
      form.reset();
      enqueueSnackbar('Thêm thành công', { variant: 'success', autoHideDuration: 2000 });
      setCount((e) => e + 1);
      Setfilename('');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 2000 });
    }
  };

  const handleSubmitEdit = async (value) => {
    const formDt = new FormData();
    const data = {
      tensach: value.tensach,
      mo_ta: value.mo_ta,
      so_luong: value.so_luong,
      hinh_thuc_bia: value.hinh_thuc_bia,
      trong_luong: value.trong_luong,
      so_trang: value.so_trang,
      idtg: value.idtg,
      gia_sach: value.gia_sach,
      hinh_anh: filenameE,
      idnn: value.idnn,
      idkt: value.idkt,
      idncc: value.idncc,
      idtl: value.idtl,
      idnxb: value.idnxb,
    };
    formDt.append('data', JSON.stringify(data));
    formDt.append('hinh_anh', value.hinh_anh[0]);
    try {
      await SachAPI.update(idsach, formDt);
      enqueueSnackbar('Thêm thành công', { variant: 'success', autoHideDuration: 2000 });
      setCount((e) => e + 1);
      handleCloseEdit();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 2000 });
    }
  };

  const submitDelete = async () => {
    try {
      await SachAPI.delete(idsach);
      enqueueSnackbar('Xóa tác giả ' + tensach + ' thành công', {
        variant: 'success',
        autoHideDuration: 2000,
      });
      handleCloseDelete();
      setCount((e) => e + 1);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 2000 });
    }
  };
  return (
    <>
      <Page title="Book">
        <Typography color="primary" variant="h4" gutterBottom>
          Sách
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
            Thêm Sách
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
          <SimpleBar style={{ maxHeight: 500 }}>
            <DialogContent>
              <InputText fullWidth label="Tên sách" name="tensach" form={form} />
              <InputText fullWidth label="Giá sách" name="gia_sach" form={form} />
              <InputText fullWidth label="Trọng lượng(gr)" name="trong_luong" form={form} />
              <InputText fullWidth label="Số lượng" name="so_luong" form={form} />
              <InputText fullWidth label="Số trang" name="so_trang" form={form} />
              <InputText fullWidth label="Hình thức bìa" name="hinh_thuc_bia" form={form} />
              <div>
                <FormControl style={{ minWidth: 140 }} margin="normal">
                  <InputLabel id="tg-simple-select-label">Tác giả</InputLabel>
                  <Controller
                    as={
                      <Select
                        value={form.getValues('idtg')}
                        onChange={(e) => form.setValue('idtg', e.target.value)}
                        labelId="tg-simple-select-label"
                      >
                        {tacgia.map((value) => (
                          <MenuItem value={value.idtg} key={value.idtg}>
                            {value.hotentg}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                    name="idtg"
                    control={form.control}
                  />
                </FormControl>

                <FormControl style={{ minWidth: 140, marginLeft: '.5rem' }} margin="normal">
                  <InputLabel id="nn-simple-select-label">Ngôn ngữ</InputLabel>
                  <Controller
                    as={
                      <Select
                        value={form.getValues('idnn')}
                        onChange={(e) => form.setValue('idnn', e.target.value)}
                        labelId="nn-simple-select-label"
                      >
                        {ngonngu.map((value) => (
                          <MenuItem value={value.idnn} key={value.idnn}>
                            {value.ngon_ngu}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                    name="idnn"
                    control={form.control}
                  />
                </FormControl>
                <FormControl style={{ minWidth: 140, marginLeft: '.5rem' }} margin="normal">
                  <InputLabel id="nxb-simple-select-label">Nhà xuất bản</InputLabel>
                  <Controller
                    as={
                      <Select
                        value={form.getValues('idnxb')}
                        onChange={(e) => form.setValue('idnxb', e.target.value)}
                        labelId="nxb-simple-select-label"
                      >
                        {nhaxuatban.map((value) => (
                          <MenuItem value={value.idnxb} key={value.idnxb}>
                            {value.tennxb}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                    name="idnxb"
                    control={form.control}
                  />
                </FormControl>

                <FormControl style={{ minWidth: 140, marginLeft: '.5rem' }} margin="normal">
                  <InputLabel id="ncc-simple-select-label">Nhà cung cấp</InputLabel>
                  <Controller
                    as={
                      <Select
                        value={form.getValues('idncc')}
                        onChange={(e) => form.setValue('idncc', e.target.value)}
                        labelId="ncc-simple-select-label"
                      >
                        {nhacungcap.map((value) => (
                          <MenuItem value={value.idncc} key={value.idncc}>
                            {value.tenncc}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                    name="idncc"
                    control={form.control}
                  />
                </FormControl>
                <FormControl style={{ minWidth: 140, marginLeft: '.5rem' }} margin="normal">
                  <InputLabel id="tl-simple-select-label">Thể loại</InputLabel>
                  <Controller
                    as={
                      <Select
                        value={form.getValues('idtl')}
                        onChange={(e) => form.setValue('idtl', e.target.value)}
                        labelId="tl-simple-select-label"
                      >
                        {theloai.map((value) => (
                          <MenuItem value={value.idtl} key={value.idtl}>
                            {value.tentl}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                    name="idtl"
                    control={form.control}
                  />
                </FormControl>
                <FormControl style={{ minWidth: 140, marginLeft: '.5rem' }} margin="normal">
                  <InputLabel id="kt-simple-select-label">Kích thướt</InputLabel>
                  <Controller
                    as={
                      <Select
                        value={form.getValues('idkt')}
                        onChange={(e) => form.setValue('idkt', e.target.value)}
                        labelId="kt-simple-select-label"
                      >
                        {kichthuot.map((value) => (
                          <MenuItem value={value.idkt} key={value.idkt}>
                            {value.kt_ngang + 'x' + value.kt_doc + ' cm'}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                    name="idkt"
                    control={form.control}
                  />
                </FormControl>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex' }}>
                <label htmlFor="btn-upload">
                  <input
                    ref={form.register}
                    id="btn-upload"
                    name="hinh_anh"
                    style={{ display: 'none' }}
                    type="file"
                    onChange={(e) => Setfilename(URL?.createObjectURL(e.target.files[0]))}
                  />
                  <Button
                    startIcon={<Icon icon="entypo:upload" />}
                    variant="outlined"
                    color="primary"
                    style={{ textTransform: 'none' }}
                    component="span"
                  >
                    Tải hình ảnh lên
                  </Button>
                </label>
                <span style={{ marginLeft: '1rem' }}>
                  {!!filename && (
                    <Avatar style={{ width: 200, height: 200 }} src={filename} variant="rounded" />
                  )}
                </span>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <Controller
                  as={
                    <TextField
                      label="Mô tả"
                      type="text"
                      multiline
                      rows={10}
                      variant="outlined"
                      fullWidth
                    />
                  }
                  control={form.control}
                  name="mo_ta"
                  className="mx-2"
                />
              </div>
            </DialogContent>
          </SimpleBar>
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
      {/* form edit */}
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
          <SimpleBar style={{ maxHeight: 500 }}>
            <DialogContent>
              <InputText fullWidth label="Tên sách" name="tensach" form={formEdit} />
              <InputText fullWidth label="Giá sách" name="gia_sach" form={formEdit} />
              <InputText fullWidth label="Trọng lượng(gr)" name="trong_luong" form={formEdit} />
              <InputText fullWidth label="Số lượng" name="so_luong" form={formEdit} />
              <InputText fullWidth label="Số trang" name="so_trang" form={formEdit} />
              <InputText fullWidth label="Hình thức bìa" name="hinh_thuc_bia" form={formEdit} />
              <div>
                <FormControl style={{ minWidth: 140 }} margin="normal">
                  <InputLabel id="tg-simple-select-label">Tác giả</InputLabel>
                  <Controller
                    as={
                      <Select
                        value={formEdit.getValues('idtg')}
                        onChange={(e) => formEdit.setValue('idtg', e.target.value)}
                        labelId="tg-simple-select-label"
                      >
                        {tacgia.map((value) => (
                          <MenuItem value={value.idtg} key={value.idtg}>
                            {value.hotentg}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                    name="idtg"
                    control={formEdit.control}
                  />
                </FormControl>

                <FormControl style={{ minWidth: 140, marginLeft: '.5rem' }} margin="normal">
                  <InputLabel id="nn-simple-select-label">Ngôn ngữ</InputLabel>
                  <Controller
                    as={
                      <Select
                        value={formEdit.getValues('idnn')}
                        onChange={(e) => formEdit.setValue('idnn', e.target.value)}
                        labelId="nn-simple-select-label"
                      >
                        {ngonngu.map((value) => (
                          <MenuItem value={value.idnn} key={value.idnn}>
                            {value.ngon_ngu}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                    name="idnn"
                    control={formEdit.control}
                  />
                </FormControl>
                <FormControl style={{ minWidth: 140, marginLeft: '.5rem' }} margin="normal">
                  <InputLabel id="nxb-simple-select-label">Nhà xuất bản</InputLabel>
                  <Controller
                    as={
                      <Select
                        value={formEdit.getValues('idnxb')}
                        onChange={(e) => formEdit.setValue('idnxb', e.target.value)}
                        labelId="nxb-simple-select-label"
                      >
                        {nhaxuatban.map((value) => (
                          <MenuItem value={value.idnxb} key={value.idnxb}>
                            {value.tennxb}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                    name="idnxb"
                    control={formEdit.control}
                  />
                </FormControl>

                <FormControl style={{ minWidth: 140, marginLeft: '.5rem' }} margin="normal">
                  <InputLabel id="ncc-simple-select-label">Nhà cung cấp</InputLabel>
                  <Controller
                    as={
                      <Select
                        value={formEdit.getValues('idncc')}
                        onChange={(e) => formEdit.setValue('idncc', e.target.value)}
                        labelId="ncc-simple-select-label"
                      >
                        {nhacungcap.map((value) => (
                          <MenuItem value={value.idncc} key={value.idncc}>
                            {value.tenncc}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                    name="idncc"
                    control={formEdit.control}
                  />
                </FormControl>
                <FormControl style={{ minWidth: 140, marginLeft: '.5rem' }} margin="normal">
                  <InputLabel id="tl-simple-select-label">Thể loại</InputLabel>
                  <Controller
                    as={
                      <Select
                        value={formEdit.getValues('idtl')}
                        onChange={(e) => formEdit.setValue('idtl', e.target.value)}
                        labelId="tl-simple-select-label"
                      >
                        {theloai.map((value) => (
                          <MenuItem value={value.idtl} key={value.idtl}>
                            {value.tentl}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                    name="idtl"
                    control={formEdit.control}
                  />
                </FormControl>
                <FormControl style={{ minWidth: 140, marginLeft: '.5rem' }} margin="normal">
                  <InputLabel id="kt-simple-select-label">Kích thướt</InputLabel>
                  <Controller
                    as={
                      <Select
                        value={formEdit.getValues('idkt')}
                        onChange={(e) => formEdit.setValue('idkt', e.target.value)}
                        labelId="kt-simple-select-label"
                      >
                        {kichthuot.map((value) => (
                          <MenuItem value={value.idkt} key={value.idkt}>
                            {value.kt_ngang + 'x' + value.kt_doc + ' cm'}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                    name="idkt"
                    control={formEdit.control}
                  />
                </FormControl>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex' }}>
                <label htmlFor="btn-upload">
                  <input
                    ref={formEdit.register}
                    id="btn-upload"
                    name="hinh_anh"
                    style={{ display: 'none' }}
                    type="file"
                    onChange={(e) => {
                      SetfilenameE(URL?.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <Button
                    startIcon={<Icon icon="entypo:upload" />}
                    variant="outlined"
                    color="primary"
                    style={{ textTransform: 'none' }}
                    component="span"
                  >
                    Tải hình ảnh lên
                  </Button>
                </label>
                <span style={{ marginLeft: '1rem' }}>
                  <Avatar style={{ width: 200, height: 200 }} src={filenameE} variant="rounded" />
                </span>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <Controller
                  as={
                    <TextField
                      label="Mô tả"
                      type="text"
                      multiline
                      rows={10}
                      variant="outlined"
                      fullWidth
                    />
                  }
                  control={formEdit.control}
                  name="mo_ta"
                  className="mx-2"
                />
              </div>
            </DialogContent>
          </SimpleBar>
          <DialogActions>
            <Button
              type="submit"
              color="primary"
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
            <Typography variant="h5">Bạn muốn xóa: {tensach}</Typography>
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
    </>
  );
}

export default Book;
