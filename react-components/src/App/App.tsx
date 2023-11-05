import { useState } from 'react';
import Searcher from '../components/Searcher/Searcher';
import Plate from '../components/Plate/Plate';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const updateSearchTerm = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <div className="app">
      <h1>StarWars: Characters</h1>
      <Searcher onSearch={updateSearchTerm} />
      <Plate searchTerm={searchTerm} />
    </div>
  );
};

export default App;
