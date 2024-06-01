import { useState, useCallback, useEffect } from "react";
import useFetchBGG from "@/hooks/useFetchBGG";
import { extractBGGdataFromElement } from "@/utils/bgg";

const useGetBGGdata = (gameToSearch) => {
  const [elementToShow, setElementToShow] = useState(null);

  const afterLoad = useCallback((bggData) => {
    setElementToShow(bggData);
  }, []);

  const [getBGGelements, , loading] = useFetchBGG({
    endpoint: "ELEMENT",
    initialState: {
      game: null,
      thumbnail: "",
      versions: [],
    },
    format: extractBGGdataFromElement,
    afterLoad,
  });

  useEffect(() => {
    if (gameToSearch) {
      getBGGelements({
        id: gameToSearch.bgg_id,
        stats: 1,
      });
    } else {
      setElementToShow(null);
    }
  }, [getBGGelements, gameToSearch]);

  return {
    elementToShow,
    loading,
  };
};

export default useGetBGGdata;
