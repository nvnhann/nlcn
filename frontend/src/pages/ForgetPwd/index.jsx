import React, {useState} from 'react';
import {Box, Button, Paper, Typography} from "@material-ui/core";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import InputText from "../../Component/Form-control/InputText";
import OtpAPI from "../../API/OtpAPI";
import {useSnackbar} from "notistack";
import Cookies from "js-cookie";
import PasswordField from "../../Component/Form-control/PasswordField";
import userAPI from "../../API/userAPI";
import {useNavigate} from "react-router-dom";

function ForgetPwd() {
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const [checkotp, setCheckotp] = useState(false);
    const [check, setCheck] = useState(false);
    const [email, setEmail] = useState('');
    const schemaOtp = yup.object().shape({
        email: yup.string().required('Vui lòng nhập email').email('Email không hơp lệ  '),
        otp: yup.string().required('Vui lòng nhập mã otp'),
    });

    const schema = yup.object().shape({
        pwd: yup.string().required('Vui lòng nhập mật khảu').min(8, 'Mật khẩu ít nhất 8 ký tự'),
        repwd: yup
            .string()
            .required('Vui lòng nhập lại mật khảu')
            .oneOf([yup.ref('pwd')], 'Mật khẩu không khớp'),
    });


    const form = useForm({
        defaultValues: {
            pwd: '',
            repwd: ''
        },
        resolver: yupResolver(schema)
    })

    const formOTP = useForm({
        defaultValues: {
            email: '',
            otp: '',
        },
        resolver: yupResolver(schemaOtp),
    });

    const getOTP = async (value) => {
        try {
            await OtpAPI.getOtpForget({email: value});
            setCheckotp(true);

        } catch (err) {
            enqueueSnackbar(err.message, {variant: 'error', autoHideDuration: 2000});
        }
    };

    const otpSubmit = () => {
        if (formOTP.getValues('otp') === '') return;
        if (formOTP.getValues('otp') === Cookies.get('otpforget')) {
            enqueueSnackbar('Xác nhận thành công!', {variant: 'success', autoHideDuration: 2000});
            setCheck(true);
        } else {
            enqueueSnackbar("OTP không hợp lệ!", {variant: 'error', autoHideDuration: 2000});
        }
    };

    const onsubmitChangePwd = async (value) => {
        value.email = email;
        try {
            await userAPI.changePwdByEmail(value);
            enqueueSnackbar('Cập nhật thành công!', {variant: 'success', autoHideDuration: 2000});
            navigate('/');

        } catch (err) {
            enqueueSnackbar(err.message, {variant: 'error', autoHideDuration: 2000});
        }


    }

    if (!check) {
        return (
            <Paper elevation={3} style={{padding: '1rem', width: '50rem', margin: '5rem auto'}}>
                <Box style={{width: '35rem', margin: '0 auto'}}>
                    <Typography variant="h4" color="primary" align="center" style={{margin: '1rem 0'}}>
                        Quên mật khẩu
                    </Typography>
                    {!checkotp ? (
                        <Box textAlign="center" my={2}>
                            <InputText name="email" label="Email" form={formOTP} fullWidth/>
                            <Button
                                style={{
                                    width: '22.4rem',
                                    margin: '1rem auto',
                                    textTransform: 'none',
                                }}
                                variant="contained"
                                color="primary"
                                aria-label="LOG IN"
                                onClick={() => {
                                    const email = formOTP.getValues('email');
                                    setEmail(email)
                                    getOTP(email);
                                }}
                            >
                                Lấy mã OTP
                            </Button>
                        </Box>
                    ) : (
                        <>

                            <form>
                                <InputText name="otp" label="Nhập mã OTP" form={formOTP} fullWidth/>
                                <Box textAlign="center" my={2}>
                                    <Button
                                        style={{
                                            width: '22.4rem',
                                            margin: '0 auto',
                                            textTransform: 'none',
                                        }}
                                        variant="contained"
                                        color="primary"
                                        aria-label="LOG IN"
                                        onClick={() => {
                                            otpSubmit()
                                            formOTP.reset({email: email})
                                        }}
                                    >
                                        Xác nhận
                                    </Button>
                                    <Box textAlign="center">
                                        <Button onClick={() => {
                                            getOTP(email)
                                        }}
                                                style={{textTransform: 'none'}}>
                                            Lấy lại mã OTP
                                        </Button>
                                    </Box>
                                </Box>
                            </form>
                        </>
                    )}
                </Box>


            </Paper>
        );
    } else {
        return (
            <Paper elevation={3} style={{padding: '2rem', width: '50rem', margin: '5rem auto'}}>
                <Box style={{width: '35rem', margin: '0 auto'}}>
                    <Typography variant="h4" color="primary" align="center" style={{margin: '1rem 0'}}>
                        Cập nhật mật khẩu
                    </Typography>
                    <form onSubmit={form.handleSubmit(onsubmitChangePwd)}>
                        <PasswordField form={form} name='pwd' label="Mật khẩu mới"/>
                        <PasswordField form={form} name='repwd' label="Nhập lại khẩu mới"/>
                        <Button
                            style={{
                                textTransform: 'none',
                            }}
                            variant="contained"
                            color="primary"
                            aria-label="LOG IN"
                            type="submit"
                        >
                            Xác nhận
                        </Button>
                    </form>
                </Box>
            </Paper>
        )
    }
}

export default ForgetPwd;