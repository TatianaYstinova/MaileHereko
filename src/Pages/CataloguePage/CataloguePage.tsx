import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getMoviesByFilter } from "../../entities/movie";
import { useQuery } from "react-query";
import { cataloguePageActions } from "./CataloguePageSlice";

import { CatalogCard } from "../../components/CatalogCard/atalogCard";

import { useGenres } from "../../entities/genre";

export const CataloguePage = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.catalogPage.movies);
  const [page, setPage] = useState(1);
  const limit = 8;

  const { genres } = useGenres();

  console.log({ genres });

  const fetchMovies = async () => {
    const filters = { page, limit };
    const data = await getMoviesByFilter(filters);
    return data;
  };
  const { isLoading, isError } = useQuery(["movies", page], fetchMovies, {
    onSuccess: (data) => {
      if (data.data?.docs) {
        dispatch(cataloguePageActions.setMovie({ movies: data.data.docs }));
      }
    },
  });

  const loadMoreMovies = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading movies</p>;

  return (
    <div className="catalogue-page">
      <CatalogCard genre={""} poster={""} />
    </div>
  );
};
export default CataloguePage;
