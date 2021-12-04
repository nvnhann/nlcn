import React, {useEffect, useState} from 'react';
import Page from '../../Component/Page';
import ProductList from './ProductList';
import {Container} from '@material-ui/core';
import SachApi from '../../API/SachAPI';
import {useSearchParams} from "react-router-dom";

function Product() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [book, setBook] = useState([]);

    useEffect(() => {
        (async () => {
            setBook(await SachApi.get({search: searchParams.get('s')}));
        })();
    }, [searchParams]);


    return (
        <Page title="Sách">
            <Container>
                <ProductList products={book}/>
            </Container>
        </Page>
    );
}

export default Product;
