import "./HomePage.scss";
import { useEffect, useState } from "react";
import {
  Filter,
  IQueryFields,
  MovieDtoV13,
  MovieFields,
} from "@openmoviedb/kinopoiskdev_client";
import { getMoviesByFilter } from "../../entities/movie/api/get-by-filters";
import { FilmPreviewCard } from "../../components/FilmPreviewCard/FilmPreviewCard";
import { Button, ButtonBase, Grid, TextField, Typography } from "@mui/material";

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
  const [searchWord, setSearchWord] = useState<string>("");

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
  const handleSearch = async () => {
    const searchFilter: Filter<MovieFields> = {
      ...filter,
      name: searchWord,
      page: 1,
    };
    setFilters(searchFilter);

    const response = await getMoviesByFilter(searchFilter);
    if (response.data) {
      const newMoviesData = {
        totalCount: response.data.total,
        pages: response.data.pages,
      };
      setMoviesData(newMoviesData);
      setMovies(response.data.docs);
    }
  };

  return (
    <div>
        <div>
      <Grid item xs={12} sx={{display:"flex"}}>
        <TextField
          label="Поиск фильмов"
          variant="outlined"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <Button variant="contained" className="search-box-button" onClick={handleSearch}>
          Поиск
        </Button>
      </Grid>

        </div>

      <Grid
        container
        spacing={3}
        columns={{ xs: 4, md: 12 }}
        sx={{
          justifyContent: "center",
          maxWidth: "1200px",
          margin: "auto",
          position: "relative",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          md={12}
          style={{ textAlign: "left", color: "#767E94", lineHeight: "24px" }}
        >
          <Typography
            component="span"
            sx={{ fontSize: "32px", fontWeight: "600" }}
          >
            {" "}
            Все{" "}
          </Typography>
          <Typography
            component="span"
            sx={{ fontSize: "16px", fontWeight: "400" }}
          >
            {" "}
            {`(${moviesData?.totalCount})`}
          </Typography>
        </Grid>
        {movies?.map((movie: MovieDtoV13) => {
          return (
            <Grid key={movie.id} item md={3}>
              <FilmPreviewCard
                alternativeName={
                  movie.alternativeName ? movie.alternativeName : ""
                }
                name={movie.name}
                grade={23}
                img={movie.poster?.url}
              />
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
