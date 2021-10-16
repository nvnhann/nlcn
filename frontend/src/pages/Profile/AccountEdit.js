import React from 'react';
import { Grid, Paper,  Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import InputText from "../../Component/Form-control/InputText";

function AccountEdit() {
    const profile = useSelector(state => state.profile.account);

    const form = useForm({
        defaultValues: {
            firstname: profile.ten || '',
            lastname: profile.ho || '',
            phone: profile.sdt || '',

        },
    });

    return (
       <Paper elevation={3} style={{ padding: '1rem' }}>
           <Typography variant="h4" color="primary" align="center" style={{margin: '1rem 0'}}>Thông tin tài khoản</Typography>
           <Grid container >
              <Grid item xs={6}><InputText form={form} name="lastname"  label="Họ"/></Grid>
               <Grid item xs={6}><InputText form={form} name="firstname" label="Tên" /></Grid>
           </Grid>
           <InputText form={form} name="phone" label="Số điện thoại" />
       </Paper>
    );
}

export default AccountEdit;