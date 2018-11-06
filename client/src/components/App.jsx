import React, { Component } from 'react';
// prettier-ignore
import { Container, Box,Heading, Card, Image, Text, SearchField, Icon} from 'gestalt';
import { Link } from 'react-router-dom';
import Loader from './shared/Loader';
import './styles/App.css';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class App extends Component {
  state = {
    brands: [],
    searchTerm: '',
    loadingBrands: true
  };

  async componentDidMount() {
    try {
      const response = await strapi.request('POST', '/graphql', {
        data: {
          query: /* GraphQL */ `
            query {
              brands {
                _id
                name
                description
                image {
                  url
                }
              }
            }
          `
        }
      });
      console.log(response.data.brands);
      this.setState({ brands: response.data.brands, loadingBrands: false });
    } catch (err) {
      console.error(err);
      this.setState({ loadingBrands: false });
    }
  }

  handleChange = ({ value }) => {
    this.setState({ searchTerm: value });
  };

  filteredBrands = ({ searchTerm, brands }) => {
    return brands.filter(brand => {
      return (
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  render() {
    const { searchTerm, loadingBrands } = this.state;

    return (
      <React.Fragment>
        <Container>
          {/* Brand Search Field Component */}
          <Box display="flex" justifyContent="center" marginTop={4}>
            <SearchField
              id="searchField"
              accessibilityLabel="Brands Search Field"
              onChange={this.handleChange}
              value={searchTerm}
              placeholder="Search Brands"
            />
            <Box margin={2}>
              <Icon
                icon="filter"
                accessibilityLabel="Brands Filter Icon"
                color={searchTerm ? 'orange' : 'gray'}
              />
            </Box>
          </Box>
          {/* Brands Section */}
          <Box display="flex" justifyContent="center" marginBottom={2}>
            <Heading color="midnight" size="md">
              Brew Brands
            </Heading>
          </Box>

          {/* Brands */}
          <Box
            wrap
            display="flex"
            justifyContent="around"
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: '#d6c8ec' }
            }}
            shape="rounded"
          >
            {this.filteredBrands(this.state).map(brand => (
              <Box paddingY={5} margin={2} width={200} key={brand._id}>
                <Card
                  image={
                    <Box height={200} width={200}>
                      <Image
                        fit="cover"
                        alt="Brand"
                        naturalHeight={1}
                        naturalWidth={1}
                        src={`${apiUrl}${brand.image.url}`}
                      />
                    </Box>
                  }
                >
                  <Box
                    display="flex"
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text bold size="xl">
                      {brand.name}
                    </Text>
                    <Text>{brand.description}</Text>
                    <Text bold size="xl">
                      <Link to={`/${brand._id}`}>See Brews</Link>
                    </Text>
                  </Box>
                </Card>
              </Box>
            ))}
          </Box>
          <Loader show={loadingBrands} />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
