import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import logo from './logo.png';
import './Home.css';

export const FETCH_CATEGORIES_QUERY = gql`
query fetchCategories {
  fetchCategories{
    edges{
      node{
        id
        name
        products{
          edges{
            node{
              name
            }
          }
        }
      }
    }
  }
}`;

const Home: React.FunctionComponent = () => {
  const { loading, error, data } = useQuery(FETCH_CATEGORIES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    console.log('data is back! >>>',data);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          product catalog!
        </p>
        <a
          className="App-link"
          href="https://www.gattoni.cl"
          target="_blank"
          rel="noopener noreferrer"
        >
          gattoni.cl v1
        </a>
      </header>
      <main>
        Home page
      </main>
    </div>
  );
}

export default Home;



