import "./SearchBox.scss";

import  { useState } from "react";
import { useQuery } from "react-query";
import { Autocomplete, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  MovieDtoV13
} from "@openmoviedb/kinopoiskdev_client";
import { getAllMoviesFilter } from "../../entities/movie";
import './SearchBox.scss';

export function SearchBox() {
  const [searchСriterion, setSearchCriterion] = useState("");
  const [selectedMovie, setSelectedMovie] =
    useState<MovieDtoV13  | null>(null);
  const navigate = useNavigate();

  // Получаем фильмы по фильтру
  const { data: movies} = useQuery(
    ["movies", searchСriterion],
    () => getAllMoviesFilter({ name: searchСriterion }),
    {
      enabled: searchСriterion.length > 0,
    }
  );
  const handleSearch = () => {
    if (selectedMovie) {
      navigate(`/movie/${selectedMovie.id}`); 
    }
  };

  return (
    <div className="movie-search-container">
      <Autocomplete className="search-field"
        options={movies?.data?.docs || []}
        getOptionLabel={(option) => option.name || ""} 
        onChange={(event, newValue) => {
          setSelectedMovie(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Поиск фильма"
            variant="outlined"
            onChange={(e) => setSearchCriterion(e.target.value)}
          />
        )}
      />
      <Button className="film-search-button" variant="contained"  onClick={handleSearch}>
        Найти
      </Button>
    </div>
  );
}
