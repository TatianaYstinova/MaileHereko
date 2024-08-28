import "./HomePage.scss";
import { useEffect } from "react";
import { MovieDtoV13 } from "@openmoviedb/kinopoiskdev_client";
import { getMoviesByFilter } from "../../entities/movie/api/get-by-filters";
import { FilmPreviewCard } from "../../components/FilmPreviewCard/FilmPreviewCard";
import { ButtonBase, Grid, Typography } from "@mui/material";

import { SearchBox } from "../../components/SearchBox/SearchBox";
import { Link } from "react-router-dom";
import { homePageActions } from "./HomePageSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

export type moviesData = {
  totalCount: number;
  pages: number;
};

const moviesDataSelector = (state: RootState) => state.homePage.moviesData;
const moviesSelector = (state: RootState) => state.homePage.movies;
const filterSelector = (state: RootState) => state.homePage.filter;

export const HomePage = () => {
  const moviesData = useAppSelector(moviesDataSelector);
  const movies = useAppSelector(moviesSelector);
  const filter = useAppSelector(filterSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getMoviesByFilterHandler();
  }, [filter]);

  const getMoviesByFilterHandler = async () => {
    const response = await getMoviesByFilter(filter);

    if (response.data) {
      const newMoviesData = {
        totalCount: response.data.total,
        pages: response.data.pages,
      };

      dispatch(homePageActions.setMoviesData(newMoviesData));

      if (filter.page === 1) {
        dispatch(homePageActions.setMovies(response.data.docs));
      } else {
        dispatch(homePageActions.addMovies(response.data.docs));
      }
    }
  };

  const handleShowMore = () => {
    const newFilter = {
      ...filter,
      page: Number(filter.page) + 1,
    };
    dispatch(homePageActions.setFilter(newFilter));
  };

  return (
    <div>
      <SearchBox
        setFilters={(newFilters) =>
          dispatch(homePageActions.setFilter(newFilters))
        }
      />
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
        {movies.map((movie: MovieDtoV13) => {
          return (
            <Grid key={movie.id} item md={3}>
              <Link to={`/movie/${movie.id}`}>
                <FilmPreviewCard
                  movieId={movie.id}
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
      {movies.length < moviesData.totalCount && (
        <ButtonBase sx={{ mt: 4 }} onClick={handleShowMore}>
          Показать еще
        </ButtonBase>
      )}
    </div>
  );
};
