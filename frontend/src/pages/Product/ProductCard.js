import {Box, Card, Chip, Link, styled, Typography} from '@material-ui/core';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import {fCurrency} from "../../ultils/fCurrentcy";

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
});

function ProductCard({product}) {
    const {tensach, hinhanh, gia_sach, idsach, phan_tram, danhgia} = product;

    return (
        <Card
            style={{
                borderRadius: '16px',
            }}
        >
            <Box sx={{pt: '100%', position: 'relative'}}>
                {phan_tram && (
                    <Chip


                        label={'-' + phan_tram + '%'}
                        style={{
                            zIndex: 9,
                            top: 0,
                            right: 0,
                            position: 'absolute',
                            textTransform: 'uppercase',
                            backgroundColor: '#ff9800',
                            color: '#fff'
                        }}
                    />


                )}
                <ProductImgStyle alt={tensach} src={hinhanh}/>
            </Box>
            <Box p={3}>
                <Link to={'/app/' + idsach} color="inherit" underline="hover" component={RouterLink}>
                    <Typography variant="subtitle2">{tensach}</Typography>
                </Link>
                <Typography Typography variant="subtitle1">
                    <Typography component="span" variant="body1" style={{
                        color: '#424242',
                    }}>
                        {phan_tram ? fCurrency(gia_sach * (100 - phan_tram) / 100) : fCurrency(gia_sach)}
                    </Typography>
                    {/*{phan_tram && <Chip style={{marginLeft: '1rem'}} label={'-'+phan_tram+'%'} size="small" color="secondary"/>}*/}
                    {phan_tram && <Typography component="span"
                                              variant="body1" style={{
                        color: '#ff5722',
                        textDecoration: 'line-through', marginLeft: '1rem'
                    }}>
                        {fCurrency(gia_sach)}
                    </Typography>}
                </Typography>


                <Rating name="read-only" value={Number.parseFloat(danhgia)} precision={0.1}/>
            </Box>
        </Card>
    );
}

export default ProductCard;
