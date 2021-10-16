import React, { useEffect, useState } from 'react';
import Page from '../../Component/Page';
import ProductList from './ProductList';
import { Container } from '@material-ui/core';
import SachApi from '../../API/SachAPI';
import { useLocation } from 'react-router';
import { escapeRegExp } from '../../ultils/escapRegExp';
function Product() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  let text = query.get('s');
  const [book, setBook] = useState([]);
  const [fillterBook, setFillterBook] = useState(book);

  const requestSearch = (text) => {
    if (!text) {
      return setFillterBook(book);
    }
    const searchRegex = new RegExp(escapeRegExp(text), 'i');
    const filteredRows = book.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    return setFillterBook(filteredRows);
  };
  useEffect(() => {
    (async () => {
      setBook(await SachApi.get());
      setFillterBook(await SachApi.get());
    })();
  }, []);

  useEffect(() => {
    requestSearch(text);
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Page title="Sách">
      <Container>
        <ProductList products={fillterBook} />
      </Container>
    </Page>
  );
}

export default Product;
