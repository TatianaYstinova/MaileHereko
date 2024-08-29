import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Filter, MovieFields } from "@openmoviedb/kinopoiskdev_client";
import { getMoviesByFilter } from "../../entities/movie/api/get-by-filters";
import "./SearchBox.scss";
import { useAppDispatch } from "../../store/hooks";
import { homePageActions } from "../../Pages/HomePage/HomePageSlice";
import { ButtonBase } from "@mui/material";

interface SearchBoxProps {
  setFilters: (param: Filter<MovieFields>) => void;
}

export type Genre = string;

export const SearchBox: React.FC<SearchBoxProps> = ({ setFilters }) => {
  const [searchWord, setSearchWord] = useState<string>();

  const dispatch = useAppDispatch();

  const handleSearch = async () => {
    const searchFilter: Filter<MovieFields> = {
      page: 1,
      limit: 8,
      name: searchWord || undefined,
      isSeries: false,
    };
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

  return (
    <div className="search-box-container">
      <Grid className="search-word">
        <TextField
          sx={{ width: "100%" }}
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
        <ButtonBase className="search-box-button" onClick={handleSearch}>
          Поиск
        </ButtonBase>
      </Grid>
    </div>
  );
};
