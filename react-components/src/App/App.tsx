import React, { Component } from 'react';
import Searcher from '../components/Searcher/Searcher';
import Plate from '../components/Plate/Plate';

interface AppState {
  searchTerm: string;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);

    this.state = {
      searchTerm: '',
    };
  }
  updateSearchTerm = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  render() {
    return (
      <div className="app">
        <h1>StarWars: Characters</h1>
        <Searcher onSearch={this.updateSearchTerm} />
        <Plate searchTerm={this.state.searchTerm} />
      </div>
    );
  }
}

export default App;
