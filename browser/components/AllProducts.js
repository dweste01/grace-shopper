import React from 'react';
import { Link } from 'react-router';

export default function AllProducts (props) {

  const fish = props.products;
  console.log('products: ', props.filteredProducts)

  return (
  	<div className="container-fluid default-container">
      <h2 className="fancy-type" id="products-title">Our current selection</h2>
      <div className="row">
      {
        fish && fish.map(oneFish => (
          <div id="product-tile" className="col-xs-4" key={ oneFish.id }>
            <Link className="thumbnail" to={`/products/${oneFish.id}`}>
              <img src={ oneFish.imageUrl } />
              <div className="caption">
                  <p id="product-tile-title">{ oneFish.title } ({ oneFish.region })</p>
                  <p className="yellow" id="product-tile-price">${oneFish.price}</p>
              </div>
            </Link>
          </div>
        ))
      }
      </div>
    </div>
  	)
}
