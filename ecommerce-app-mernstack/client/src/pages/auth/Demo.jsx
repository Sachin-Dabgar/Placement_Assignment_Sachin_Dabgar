import React, { useEffect, useState } from 'react';
import { searchAPI } from 'your-search-service';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      searchAPI(searchTerm).then(results => {
        // Update search results
      });
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Render search input and results
}