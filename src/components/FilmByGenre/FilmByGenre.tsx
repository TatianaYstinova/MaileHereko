import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Filter, MovieFields } from "@openmoviedb/kinopoiskdev_client";
import { useInfiniteQuery } from "react-query";
import { getMoviesByFilter } from "../../entities/movie";
import { FilmPreviewCard } from "../FilmPreviewCard/FilmPreviewCard";

const api = ({
  pageParam,
  filter,
}: {
  pageParam?: number;
  filter: Filter<MovieFields>;
}) => getMoviesByFilter({ ...filter, page: pageParam });

export const FilmByGenre = () => {
  const [query] = useSearchParams();

  const [filter, setFilter] = useState<Filter<MovieFields>>({
    page: 0,
    limit: 8,
  });

  useEffect(() => {
    const genre = query.get("genre");

    setFilter((previousFilter) => ({
      ...previousFilter,
      ["genres.name"]: genre ? [genre] : undefined,
    }));
  }, [query.get("genre"), setFilter]);

  const { data: filmsByGenre, fetchNextPage } = useInfiniteQuery(
    ["filmsByGenre"],
    ({ pageParam }) => api({ filter, pageParam }),
    {
      getNextPageParam: (lastPage) => {
        return (lastPage.data?.page || 0) + 1;
      },
    }
  );

  return (
    <>
      {filmsByGenre?.pages.map((page) =>
        page.data?.docs.map(({ id, name, genres ,poster }) => (
          <Link to={`/movie/${id}`}>
          <FilmPreviewCard
            name={name}
            alternativeName={""}
            grade={genres ? genres.length : 0}
            img={poster?.url}
            movieId={id}
          />
    </Link>
        ))
      )}
      <Button onClick={() => fetchNextPage()}>Показать ещё</Button>
    </>
  );
};
