import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Popover from "@mui/material/Popover";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Filter,
  MovieFields,
  SPECIAL_VALUE,
} from "@openmoviedb/kinopoiskdev_client";
import { getMoviesByFilter } from "../../entities/movie/api/get-by-filters";
import "./SearchBox.scss";
import { useAppDispatch } from "../../store/hooks";
import { homePageActions } from "../../Pages/HomePage/HomePageSlice";
import { Filters } from "../Filter/Filter";

interface SearchBoxProps {
  setFilters: (param: Filter<MovieFields>) => void;
}

export type Genre = string;

export const SearchBox: React.FC<SearchBoxProps> = ({ setFilters }) => {
  const [isTop10Checked, setIsTop10Checked] = useState(false);
  const [isTop250Checked, setIsTop250Checked] = useState(false);
  const [searchWord, setSearchWord] = useState<string>();
  const [isSeriesChecked, setIsSeriesChecked] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  const dispatch = useAppDispatch();

  const handleSearch = async () => {
    const searchFilter: Filter<MovieFields> = {
      page: 1,
      limit: 8,
      name: searchWord || undefined,
      isSeries: isSeriesChecked,
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
      dispatch(homePageActions.setMoviesData(newMoviesData));
      dispatch(homePageActions.setMovies(response.data.docs));
    }
  };
  const handleGenreChange = (genre: Genre) => {
    setSelectedGenres((prev) => {
      const newGenres = prev.includes(genre)
        ? prev.filter((item) => item !== genre)
        : [...prev, genre];

      return newGenres;
    });
  };

  return (
    <div className="search-box-container">
      <Filters
        setFilters={function (param: Filter<MovieFields>): void {
          throw new Error("Function not implemented.");
        }}
      />
      {/* <Button
        variant="outlined"
        onClick={handleClick}
        className="filter-button"
      >
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
      </Popover> */}
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
  );
};
