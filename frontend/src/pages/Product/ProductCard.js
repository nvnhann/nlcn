import { Box, Card, Link, styled, Typography } from '@material-ui/core';
import { Label } from '@material-ui/icons';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

function ProductCard({ product }) {
  const { tensach, hinhanh, gia_sach, status } = product;

  return (
    <Card
      style={{
        borderRadius: '16px',
      }}
    >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <ProductImgStyle alt={tensach} src={hinhanh} />
      </Box>
      <Box p={3}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2">{tensach}</Typography>
        </Link>

        <Typography
          variant="body1"
          style={{
            color: 'primary',
          }}
        >
          {gia_sach} $
        </Typography>

        <Rating name="read-only" value={5} readOnly />
      </Box>
    </Card>
  );
}

export default ProductCard;
