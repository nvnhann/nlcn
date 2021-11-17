import React from 'react';
import {Box, Button, Paper, Typography} from "@material-ui/core";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import PasswordField from "../../Component/Form-control/PasswordField";
import userAPI from "../../API/userAPI";
import {useSnackbar} from "notistack";

function ChangePwd() {
    const {enqueueSnackbar} = useSnackbar();
    const schema = yup.object().shape({
        passwordold: yup.string().required("Vui lòng nhập mật khảu"),
        passwordnew: yup.string().required("Vui lòng nhập mật khảu"),
        repwdnew: yup.string().required("Vui lòng nhập lại mật khảu").oneOf([yup.ref('passwordnew')], 'Mật khẩu không khớp')
    });

    const formP = useForm({
        defaultValues: {
            passwordold: '',
            passwordnew: '',
            repwdnew: ''
        },
        resolver: yupResolver(schema)
    });

    const onSubmitP = async (value) =>{
        try {
            await userAPI.changePwd(value);
            enqueueSnackbar('Cập nhật thành công', {variant: 'success', autoHideDuration: 2000});
            formP.reset();

        }catch (error){
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000})
        }

    }
    return (
        <Paper elevation={3} style={{padding: '1rem'}}>
            <Box style={{width: '30rem', margin: '0 auto', padding: '2rem'}}>
                <Typography variant="h4" color="primary" align="center" style={{margin: '1rem 0'}}>
                    Đổi mật khẩu
                </Typography>
                <form onSubmit={formP.handleSubmit(onSubmitP)}>
                <PasswordField name="passwordold" label="Mật khẩu cũ" form={formP}/>
                <PasswordField name="passwordnew" label="Mật khẩu mới" form={formP}/>
                <PasswordField name="repwdnew" label="Nhập lại mật khẩu" form={formP}/>
                    <Button type="submit" variant="contained" color="primary" style={{textTransform: 'none', margin:'1rem auto'}}>
                        Đồng ý
                    </Button>
                </form>
            </Box>
        </Paper>
    );
}

export default ChangePwd;