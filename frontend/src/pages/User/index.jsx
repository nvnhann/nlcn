import Page from "../../Component/Page";
import {Box, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import userAPI from "../../API/userAPI";
import MUIDataTable from "mui-datatables";

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export default function User() {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            const res = await userAPI.getAll();
            setData(res);

        })()
    }, []);
    // const requestSearch = (searchValue) => {
    //     setSearchText(searchValue);
    //     const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    //     const filteredRows = data.rows.filter((row) => {
    //         return Object.keys(row).some((field) => {
    //             return searchRegex.test(row[field].toString());
    //         });
    //     });
    //     setRows(filteredRows);
    // };
    const column = [
        "ID tài khoản",
        "Email",
        "Họ",
        "Tên",
        "Số điện thoại",
        "Địa chỉ"
    ]
    const options = {
        filter: true,
        filterType: "dropdown",
    };
    const row = [];
    console.log(data)
    data?.map(e=>{
        const item = [e.id, e.email, e.ho, e.ten, e.sdt, e.diachi];
        row.push(item);


    })
    //
    // const requestSearch = (searchValue) => {
    //     setSearchText(searchValue);
    //     const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    //     const filteredRows = rows.filter((row) => {
    //         return Object.keys(row).some((field) => {
    //             return searchRegex.test(row[field].toString());
    //         });
    //     });
    //     setData(filteredRows);
    // };

    return (
        <Page title="User">
            <Typography color="primary" variant="h4" gutterBottom>
                User
            </Typography>
            <Box>
                <MUIDataTable
                    title="User"
                    options={options}
                    data={row}
                    columns={column}
                />
            </Box>
        </Page>
    )
}