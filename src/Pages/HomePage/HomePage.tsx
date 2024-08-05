import "./HomePage.scss";
import { useEffect, useState } from "react";
import {
  Filter,
  IQueryFields,
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
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

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
  const [searchWord, setSearchWord] = useState<string>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isTop100Checked, setIsTop100Checked] = useState(false);
  const [isTop250Checked, setIsTop250Checked] = useState(false);

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
    };
    if (isTop100Checked) {
      searchFilter.top10 = SPECIAL_VALUE.NOT_NULL;
    }
    if (isTop250Checked) {
      searchFilter.top250 = SPECIAL_VALUE.NOT_NULL;
    }
    setFilters(JSON.parse(JSON.stringify(searchFilter)));

    const response = await getMoviesByFilter(JSON.parse(JSON.stringify(searchFilter)));
    if (response.data) {
      const newMoviesData = {
        totalCount: response.data.total,
        pages: response.data.pages,
      };
      setMoviesData(newMoviesData);
      setMovies(response.data.docs);
    }
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
          Расширенный поиск
        </Button>
        <Popover
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
          <div style={{ padding: "16px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isTop100Checked}
                  onChange={(e) => setIsTop100Checked(e.target.checked)}
                />
              }
              label="Тор 100"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={isTop250Checked}
                  onChange={(e) => setIsTop250Checked(e.target.checked)}
                />
              }
              label="Тор 250"
            />
          </div>
        </Popover>
        <Grid sx={{position:'relative',width:'100%',display:'flex'}} >
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
 