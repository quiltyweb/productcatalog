// @flow

import React, { Component } from 'react';
import axios from 'axios';

import type { Node } from 'react';
import type { $AxiosXHR } from 'axios';
import type { CategoryData } from '../../types';

import ProductsList from '../ProductsList/ProductsList';
import '../Main/Main.scss';

type Props = {
  children?: Node
}
type State = {
  categories: Array<CategoryData>
}
type ResponseData = { categories: Array<CategoryData> }

class Main extends Component<Props, State> {
  constructor (props: Props) {
    super(props);
    this.state = { categories: [] };
  }

  async componentDidMount () {
    try {
      const response: $AxiosXHR<ResponseData> = await axios.get('/api/category');

      if (response.status === 200) {
        this.setCategories(response.data.categories);
      } else {
        throw Error('Oops, Something went wrong! Please Try Again.');
      }
    } catch (error) {
      this.setCategories([]);
    }
  }

  setCategories = (categories: Array<CategoryData>): void => {
    this.setState({ categories });
  }

  render () {
    return (
      <main className="Main">
        <div className="Main-content">
          { this.props.children }
        </div>
        <div className="Main-sidebar">
          <ProductsList categories={ this.state.categories } />
        </div>
      </main>
    );
  }
}
export default Main;
