import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import { ProductCard } from './components'
import mockData from './data';
import { ToolbarActions } from '../ToolbarActions';
import { withProductLayout } from '../../../layouts/Main';

const ProductListBase = () => {

  const [products] = useState(mockData);

  return (
    <Grid container spacing={5}>
      {products.map(product => (
        <Grid
          item
          key={product.id}
          lg={4}
          md={6}
          xs={12}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

const ProductList = withProductLayout({
    title: 'Apps',
    withPagination: true,
    Buttons: ToolbarActions
  })(ProductListBase)

export {ProductList};
