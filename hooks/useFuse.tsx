import { useCallback, useMemo, useState, useEffect } from 'react';

import Fuse from 'fuse.js';

export default function useFuse<T>(
  list: ReadonlyArray<T>,
  searchTxt: string,
  fuseOptions?: Fuse.IFuseOptions<T>,
  index?: Fuse.FuseIndex<T>
): [filteredData: ReadonlyArray<T>, search: (query: string) => void] {
  const [filteredData, setFilteredData] = useState(list);
  const fuseSearch = useMemo(() => new Fuse(list, fuseOptions, index), [list, fuseOptions]);

  useEffect(() => {
    setFilteredData(list);
  }, [list, searchTxt]);

  const highlight = (fuseSearchResult: any, highlightClassName: string = 'bg-yellow-300') => {
    const set = (obj: object, path: string, value: any) => {
      const pathValue = path.split('.');
      let i;

      for (i = 0; i < pathValue.length - 1; i++) {
        obj = obj[pathValue[i]];
      }

      obj[pathValue[i]] = value;
    };

    const generateHighlightedText = (inputText: string, regions: number[] = []) => {
      let content = [];
      let nextUnhighlightedRegionStartingIndex = 0;

      regions.forEach((region) => {
        const lastRegionNextIndex = region[1] + 1;

        content.push(inputText.substring(nextUnhighlightedRegionStartingIndex, region[0]));
        content.push(<span className={highlightClassName}>{inputText.substring(region[0], lastRegionNextIndex)}</span>);

        nextUnhighlightedRegionStartingIndex = lastRegionNextIndex;
      });

      content.push(inputText.substring(nextUnhighlightedRegionStartingIndex));

      return content;
    };

    return fuseSearchResult
      .filter(({ matches }: any) => matches && matches.length)
      .map(({ item, matches }: any) => {
        const highlightedItem = { ...item };

        matches.forEach((match: any) => {
          set(highlightedItem, match.key, generateHighlightedText(match.value, match.indices));
        });

        highlightedItem.title = highlightedItem.title.map((itm, index) => (
          <span key={'subKey' + searchTxt + index} className="font-bold">
            {itm}
          </span>
        ));

        return highlightedItem;
      });
  };

  return highlight(fuseSearch.search(searchTxt));
}
