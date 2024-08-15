import "./HomePage.scss";
import { useEffect, useState } from "react";
import {
  Filter,
  MovieDtoV13,
  MovieFields,
} from "@openmoviedb/kinopoiskdev_client";
import { getMoviesByFilter } from "../../entities/movie/api/get-by-filters";
import { FilmPreviewCard } from "../../components/FilmPreviewCard/FilmPreviewCard";
import {
  ButtonBase,
  Grid,
  Typography,
} from "@mui/material";

import { SearchBox } from "../../components/SearchBox/SearchBox";
import { Link } from "react-router-dom";


export type moviesData = {
  totalCount: number;
  pages: number;
};


export const HomePage = () => {
  const [moviesData, setMoviesData] = useState<moviesData>({
    totalCount: 0,
    pages: 0,
  });
  const [movies, setMovies] = useState<MovieDtoV13[]>([]);
  const [filter, setFilters] = useState<Filter<MovieFields>>({
    page: 1,
    limit: 8,
  });

  useEffect(() => {
    getMoviesByFilterHandler();
  }, []);

  const getMoviesByFilterHandler = async () => {
    const response = await getMoviesByFilter(filter);
    if (response.data) {
      const newMoviesData = {
        totalCount: response.data.total,
        pages: response.data.pages,
      };
      const filterValue: Filter<MovieFields> = {
        ...filter,
        limit: filter.limit,
        page: Number(filter.page)! + 1,
      };
      setFilters(filterValue);
      setMoviesData(newMoviesData);
      setMovies([...movies, ...response.data.docs]);
    }
  };
  
  
  return (
    <div>
      <SearchBox setFilters={setFilters} setMoviesData={setMoviesData} setMovies={setMovies} />
      <Grid container spacing={3} columns={{ xs: 4, md: 12 }}>
        <Grid className="text- button- container" item xs={12} md={12}>
          <Typography className="text" component="span">
            {" "}
            Все{" "}
          </Typography>
          <Typography className="quantity" component="span">
            {" "}
            {`(${moviesData?.totalCount})`}
          </Typography>
        </Grid>
        {movies?.map((movie: MovieDtoV13) => {
          return (
            <Grid key={movie.id} item md={3}>
              <Link to={`/movie/${movie.id}`}>
              <FilmPreviewCard movieId={movie.id}
                alternativeName={
                  movie.alternativeName ? movie.alternativeName : ""
                }
                name={movie.name}
                grade={movie.rating?.kp || 0}
                img={movie.poster?.url}
              />
              </Link>
             
            </Grid>
          );
        })}
      </Grid>
      <ButtonBase sx={{ mt: 4 }} onClick={getMoviesByFilterHandler}>
        get more
      </ButtonBase>
    </div>
  );
};
