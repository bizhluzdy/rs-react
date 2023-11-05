import React, { useState, useEffect } from 'react';
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

const Plate: React.FC<PlateProps> = (props) => {
  const [searchResults, setSearchResults] = useState<ApiResponse>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const searchItems = (term: string) => {
    setIsLoading(true);

    fetch(`https://swapi.dev/api/people/?search=${term}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error getting data from API:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    searchItems(props.searchTerm);
  }, [props.searchTerm]);

  console.log(searchResults);

  return (
    <div className="plate-block">
      <div className="catalog-products">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          searchResults.results.map((result: Character) => (
            <div className="about" key={result.name}>
              <h3>{result.name}</h3>
              <div>
                <div>
                  <h4>
                    Birthday: <span>{result.birth_year}</span>
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
          ))
        )}
      </div>
    </div>
  );
};

export default Plate;
