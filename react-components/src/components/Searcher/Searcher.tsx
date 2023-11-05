import React, { useState, useEffect, useCallback } from 'react';
import './Searcher.scss';

interface SearcherProps {
  onSearch: (searchTerm: string) => void;
}

const Searcher: React.FC<SearcherProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = useCallback(() => {
    const trimmedSearchTerm = searchTerm.trim();
    localStorage.setItem('lastSearchTerm', trimmedSearchTerm);

    props.onSearch(trimmedSearchTerm);
  }, [searchTerm, props]);

  useEffect(() => {
    const lastSearchTerm = localStorage.getItem('lastSearchTerm');
    if (lastSearchTerm) {
      setSearchTerm(lastSearchTerm);
      handleSearch();
    }
  }, [handleSearch]);

  return (
    <div className="search-block">
      <input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
      <input type="submit" onClick={handleSearch} />
    </div>
  );
};

export default Searcher;
