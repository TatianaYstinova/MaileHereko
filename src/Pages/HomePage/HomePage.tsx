import "./HomePage.scss";
import { useEffect, useState } from "react";
import {
  Filter,
  MovieDtoV13,
  MovieFields,
  SPECIAL_VALUE,
} from "@openmoviedb/kinopoiskdev_client";
import { getMoviesByFilter } from "../../entities/movie/api/get-by-filters";
import { FilmPreviewCard } from "../../components/FilmPreviewCard/FilmPreviewCard";
import {
  Button,
  ButtonBase,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  Popover,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

export type moviesData = {
  totalCount: number;
  pages: number;
};
export type Genre = string;

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
  const [searchWord, setSearchWord] = useState<string>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isTop10Checked, setIsTop10Checked] = useState(false);
  const [isTop250Checked, setIsTop250Checked] = useState(false);
  const [isSeriesChecked, setIsSeriesChecked] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  const [ratingKp, setRatingKp] = useState<number[]>([1, 10]);
  const [ratingIMDb, setRatingIMDb] = useState<number[]>([1, 10]);

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
      name: searchWord || undefined,
      page: 1,
      isSeries: isSeriesChecked,
      ["genres.name"]: selectedGenres,
      ["rating.kp"]: ratingKp.join("-"),
      ["rating.imdb"]: ratingIMDb.join("-"),
    };
    if (isTop10Checked) {
      searchFilter.top10 = SPECIAL_VALUE.NOT_NULL;
    }
    if (isTop250Checked) {
      searchFilter.top250 = SPECIAL_VALUE.NOT_NULL;
    }
    setFilters(JSON.parse(JSON.stringify(searchFilter)));

    const response = await getMoviesByFilter(
      JSON.parse(JSON.stringify(searchFilter))
    );
    if (response.data) {
      const newMoviesData = {
        totalCount: response.data.total,
        pages: response.data.pages,
      };
      setMoviesData(newMoviesData);
      setMovies(response.data.docs);
    }
  };

  const handleGenreChange = (genre: Genre) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((item) => item !== genre); // Убираем жанр, если он уже выбран
      } else {
        return [...prev, genre]; // Добавляем жанр в выбранные
      }
    });
  };

  const handleSliderChangeRatingKp = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    const newValue = Array.isArray(value) ? value : [value];
    setRatingKp(newValue);
  };
  const handleSliderChangeRatingIMDb = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    const newValue = Array.isArray(value) ? value : [value];
    setRatingIMDb(newValue);
  };

  // Функции для управления Popover
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div className="search-box-container">
        <Button variant="outlined" onClick={handleClick}>
          Фильтры
        </Button>
        <Popover
          className="popover"
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Grid container spacing={2} padding={2}>
            <Grid item xs={6}>
              <Typography variant="h6">Фильмы</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isTop10Checked}
                    onChange={(e) => setIsTop10Checked(e.target.checked)}
                  />
                }
                label="Топ 10"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isTop250Checked}
                    onChange={(e) => setIsTop250Checked(e.target.checked)}
                  />
                }
                label="Топ 250"
              />
              <Typography gutterBottom>Рейтинг по версии КиноПоиска</Typography>
              <Slider
                value={ratingKp}
                onChange={handleSliderChangeRatingKp}
                valueLabelDisplay="on"
                min={1}
                max={10}
                step={1}
              />
              <Typography gutterBottom>Рейтинг по версии IMDb</Typography>
              <Slider
                value={ratingIMDb}
                onChange={handleSliderChangeRatingIMDb}
                valueLabelDisplay="on"
                min={1}
                max={10}
                step={1}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Сериалы</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSeriesChecked}
                    onChange={(e) => setIsSeriesChecked(e.target.checked)}
                  />
                }
                label="Все сериалы"
              />
              <Typography variant="h6">Жанры</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedGenres.includes("криминал")}
                    onChange={() => handleGenreChange("криминал")}
                  />
                }
                label="Криминал"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedGenres.includes("комедия")}
                    onChange={() => handleGenreChange("комедия")}
                  />
                }
                label="Комедия"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedGenres.includes("военные")}
                    onChange={() => handleGenreChange("военные")}
                  />
                }
                label="Военные"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedGenres.includes("фантастика")}
                    onChange={() => handleGenreChange("фантастика")}
                  />
                }
                label="Фантастика"
              />
            </Grid>
          </Grid>
        </Popover>
        <Grid className="search-word">
          <TextField
            variant="outlined"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            className="search-box-button"
            onClick={handleSearch}
          >
            Поиск
          </Button>
        </Grid>
      </div>

      <Grid container spacing={3} columns={{ xs: 4, md: 12 }}>
        <Grid className="text- button- container" item xs={12} md={12}>
          <Typography className="text" component="span">
            {" "}
            Все{" "}
          </Typography>
          <Typography component="span">
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
                grade={movie.rating?.kp || 0}
                img={movie.poster?.url}
              />
              <Button
                variant="contained"
                onClick={() => window.location.href = `home/movie/${movie.id}`} 
              >
                Перейти к фильму
              </Button>
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
