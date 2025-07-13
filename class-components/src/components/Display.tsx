import React from 'react';
import type {
  DisplayState,
  DisplayProps,
  PokemonListItem,
} from '../types/Types';

export default class Display extends React.Component<
  DisplayProps,
  DisplayState
> {
  constructor(props: DisplayProps) {
    super(props);
    this.state = {
      data: { results: [] },
      loading: true,
      error: null,
    };
  }

  componentDidMount(): void {
    this.fetchPokemon();
  }

  componentDidUpdate(prevProps: DisplayProps): void {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchPokemon();
    }
  }

  fetchPokemon(): void {
    this.setState({ loading: true, error: null });
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=1302';

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (this.props.searchTerm) {
          const filteredResults = {
            ...data,
            results: data.results.filter((pokemon: PokemonListItem) =>
              pokemon.name.includes(this.props.searchTerm.toLowerCase())
            ),
          };
          this.setState({
            data: filteredResults,
            loading: false,
          });
        } else {
          this.setState({
            data: data,
            loading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          error: error.message,
          loading: false,
        });
      });
  }

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return (
        <fieldset>
          <legend>Results</legend>
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        </fieldset>
      );
    }

    if (error) {
      return (
        <fieldset>
          <legend>Results</legend>
          <div className="error-container">
            <p>Error: {error}</p>
          </div>
        </fieldset>
      );
    }

    if (!data || !data.results || data.results.length === 0) {
      return (
        <fieldset>
          <legend>Results</legend>
          <p>No Pokémon found matching your search criteria</p>
        </fieldset>
      );
    }

    const pokeArr: PokemonListItem[] = data.results;

    return (
      <fieldset>
        <legend>Results</legend>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {pokeArr.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>
    );
  }
}
