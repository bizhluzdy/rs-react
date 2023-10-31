import { Component, ChangeEvent } from 'react';
import './Searcher.scss';

interface SearcherProps {
  onSearch: (searchTerm: string) => void;
}

interface SearcherState {
  searchTerm: string;
  isSearching: boolean;
}

class Searcher extends Component<SearcherProps, SearcherState> {
  constructor(props: SearcherProps) {
    super(props);

    this.state = {
      searchTerm: '',
      isSearching: false,
    };
  }

  handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const trimmedSearchTerm = this.state.searchTerm.trim();
    this.setState({ isSearching: true });
    localStorage.setItem('lastSearchTerm', trimmedSearchTerm);

    this.props.onSearch(trimmedSearchTerm);
  };

  componentDidMount() {
    const lastSearchTerm = localStorage.getItem('lastSearchTerm');
    if (lastSearchTerm) {
      this.setState({ searchTerm: lastSearchTerm }, () => {
        this.handleSearch();
      });
    }
  }

  render() {
    return (
      <div className="search-block">
        <input
          type="search"
          placeholder="Search..."
          value={this.state.searchTerm}
          onChange={this.handleSearchInputChange}
        />
        <input type="submit" onClick={this.handleSearch} />
      </div>
    );
  }
}

export default Searcher;
