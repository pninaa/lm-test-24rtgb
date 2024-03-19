import React from 'react';
import { SearchResult } from '@/types'; // Assuming SearchResult interface is defined in a separate file

interface SearchResultsProps {
  fuseSearcher: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ fuseSearcher }) => {
  return (
    <>
      <div className="font-bold text-center">Results:</div>
      <div className="text-center">
        {fuseSearcher.length > 0 ? (
          fuseSearcher.map((item, index) => (
            <div key={index}>
              <div>{item.title}</div>
              <div>{item.body}</div>
              <br />
            </div>
          ))
        ) : (
          <div>No results found</div>
        )}
      </div>
    </>
  );
}

export default SearchResults;
