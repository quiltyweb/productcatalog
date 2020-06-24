import { NavLink, MemoryRouter as Router } from 'react-router-dom';
import React from 'react';
import { mount } from 'enzyme';
import ProductsList from '../ProductsList';


describe('ProductsList', () => {
  describe('when given an empty categories array', () => {
    it('renders the text no categories inside it', () => {
      const emptyCategories = [];
      const wrapper = mount(
        <ProductsList categories={ emptyCategories } />);
      const li = wrapper.find('.ProductsList__empty');
      expect(li.text()).toBe('No categories');
    });
  });

  describe('when given a categories array', () => {
    it('allow to set props', () => {
      const wrapper = mount(
        <Router>
          <ProductsList categories={ [{ _id: 1, categoryId: '001', title: 'category 1' }] } />
        </Router>);
      const propsObject = wrapper.props().children.props;
      expect(propsObject.categories).toEqual([{ _id: 1, categoryId: '001', title: 'category 1' }]);
    });

    it('renders the list ProductsList', () => {
      const wrapper = mount(
        <Router>
          <ProductsList categories={ [{ _id: 1, categoryId: '001', title: 'category 1' }] } />
        </Router>);
      expect((wrapper.children()).find('.ProductsList')).toHaveLength(1);
    });

    it('renders the list with items inside it', () => {
      const categories = [
        { _id: 1, categoryId: '001', title: 'category 1' },
        { _id: 2, categoryId: '002', title: 'category 2' },
        { _id: 3, categoryId: '003', title: 'category 3' },
        { _id: 4, categoryId: '004', title: 'category 4' },
      ];

      const wrapper = mount(
        <Router>
          <ProductsList categories={ categories } />
        </Router>);
      expect((wrapper.find(NavLink))).toHaveLength(4);
    });
  });
});
