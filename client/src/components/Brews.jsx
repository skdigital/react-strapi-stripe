import React, { Component } from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class Brews extends Component {
  async componentDidMount() {
    try {
      const response = await strapi.request('POST', '/graphql', {
        data: {
          query: /* GraphQL */ `
          query {
            brand(id: "${this.props.match.params.brandId}") {
              _id
              name
              image {
                url
              }
              brews {
                _id
                name
                price
              }
            }
          }
        `
        }
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div>Brews</div>
      </React.Fragment>
    );
  }
}

export default Brews;
