import { Component } from 'react';
import './Plate.scss';

interface PlateProps {
  searchTerm: string;
}
interface Character {
  name: string;
  birth_year: string;
  gender: string;
  hair_color: string;
  eye_color: string;
  height: string;
}
interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}
interface PlateState {
  searchResults: ApiResponse;
  isLoading: boolean;
}

class Plate extends Component<PlateProps, PlateState> {
  constructor(props: PlateProps) {
    super(props);

    this.state = {
      searchResults: {
        count: 0,
        next: null,
        previous: null,
        results: [],
      },
      isLoading: false,
    };
  }

  searchItems = (term: string) => {
    this.setState({ isLoading: true });

    fetch(`https://swapi.dev/api/people/?search=${term}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          searchResults: data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error('Error getting data from API:', error);
        this.setState({ isLoading: false });
      });
  };

  componentDidUpdate(prevProps: PlateProps) {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      this.searchItems(this.props.searchTerm);
    }
  }

  render() {
    console.log(this.state.searchResults);
    return (
      <div className="plate-block">
        <div className="catalog-products">
          {this.state.isLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            this.state.searchResults.results.map(
              (result: Character, index: number) => (
                <div className="about" key={result.name}>
                  <h3>{result.name}</h3>
                  <div>
                    <div>
                      <h4>
                        Bithday: <span>{result.birth_year}</span>
                      </h4>
                    </div>
                    <div>
                      <h4>
                        Gender: <span>{result.gender}</span>
                      </h4>
                      <h4>
                        Hair: <span>{result.hair_color}</span>
                      </h4>
                    </div>
                    <div>
                      <h4>
                        Eyes: <span>{result.eye_color}</span>
                      </h4>
                      <h4>
                        Height: <span>{result.height}</span>
                      </h4>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    );
  }
}

export default Plate;
