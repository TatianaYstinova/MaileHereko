import Button from "@mui/material/Button"
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
import { Filter, MovieDtoV13, MovieFields, SPECIAL_VALUE } from "@openmoviedb/kinopoiskdev_client";
import { getMoviesByFilter } from "../../entities/movie/api/get-by-filters";
import { moviesData } from "../../Pages/HomePage/HomePage";

interface SearchBoxProps {
    setFilters: React.Dispatch<React.SetStateAction<Filter<MovieFields>>>;
    setMoviesData: React.Dispatch<React.SetStateAction<moviesData>>;
    setMovies: React.Dispatch<React.SetStateAction<MovieDtoV13[]>>;
  }

export type Genre = string;

export const SearchBox : React.FC<SearchBoxProps> = ({ setFilters , setMoviesData, setMovies }) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isTop10Checked, setIsTop10Checked] = useState(false);
    const [isTop250Checked, setIsTop250Checked] = useState(false);
    const [searchWord, setSearchWord] = useState<string>();
    const [isSeriesChecked, setIsSeriesChecked] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
    const [ratingKp, setRatingKp] = useState<number[]>([1, 10]);
    const [ratingIMDb, setRatingIMDb] = useState<number[]>([1, 10]);



    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearch = async () => {
        const searchFilter: Filter<MovieFields> = {
            page: 1,
            limit: 8,
            name: searchWord || undefined,
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


    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
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
      );
    
};




