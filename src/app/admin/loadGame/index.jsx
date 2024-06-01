/* eslint-disable @next/next/no-img-element */
import useGetBGGdata from "@/hooks/useGetBGGdata";
import SearchBGG from "./searchBGG";
import { useEffect, useState } from "react";
import BGGinfo from "@/components/bggInfo";

const LoadGame = () => {
  const [searchResultBGG, setSearchResultBGG] = useState(null);

  const { elementToShow, loading } = useGetBGGdata(searchResultBGG);

  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [bgg_id, set_bgg_id] = useState("");

  useEffect(() => {
    if (elementToShow) {
      const { name, game_thumbnail, bgg_id, year_published } = elementToShow;
      setName(`${name} (${year_published})`);
      setThumbnail(game_thumbnail);
      set_bgg_id(bgg_id);
    } else {
      setName("");
      setThumbnail("");
      set_bgg_id("");
    }
  }, [elementToShow]);

  return (
    <div>
      <div className="max-w-md">
        <label className="block text-sm font-medium">Buscar en la BGG</label>
        <SearchBGG setSearchResultBGG={setSearchResultBGG} />
      </div>
      {loading ? <div className="pt-5 font-bold">Cargando...</div> : null}
      {elementToShow ? (
        <div className="py-4">
          <div className="p-3 bg-white rounded-lg shadow-md flex gap-4">
            <div className="w-52 border border-gray-300">
              <img src={thumbnail} alt={name} className="w-full" />
            </div>
            <div className="grow">
              <div className="">
                <input
                  type="text"
                  className="font-bold text-xl border border-gray-300 rounded-lg p-2 w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <BGGinfo game={elementToShow} />
              <div className="py-8">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LoadGame;
