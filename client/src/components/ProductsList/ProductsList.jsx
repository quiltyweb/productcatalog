// @flow
/* eslint no-underscore-dangle: 0 */

import React from 'react';
import { NavLink } from 'react-router-dom';

import type { Node } from 'react';
import type { CategoryData } from '../../types';

import './ProductsList.scss';

type Props = { categories: Array<CategoryData> }

// @todo Change Later with .map and data from API
const ProductsList = ({ categories }: Props): Node => {
  return (
    <ul className="ProductsList">
      { categories && categories.length > 0 ?
        categories.map((cat) => {
          return (
            <li key={ cat._id }>
              <NavLink
                className="ProductsList-link"
                exact
                to={ `/category/${cat.categoryId}` }>{ cat.title }
              </NavLink>
            </li>
          );
        }) : <li className="ProductsList__empty">No categories</li> }
    </ul>
  );
};

export default ProductsList;
