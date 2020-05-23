import React from 'react';
import {QueryRenderer} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import environment from '../../environment';
// import logo from './logo.png';
import './Home.css';

const Home: React.FunctionComponent = () => {
  return (
    <QueryRenderer
        environment={environment}
        query={graphql`
        query HomeQuery {
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
      }
    `}
        variables={{}}
        render={({error, props}) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          console.log('props >>>>',props);

          return <div>hello world</div>;
        }}
      />
  );
}

export default Home;



