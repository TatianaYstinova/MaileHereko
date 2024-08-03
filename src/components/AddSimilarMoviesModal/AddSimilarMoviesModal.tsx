import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  MovieDocsResponseDtoV13,
  MovieDtoV13,
} from "@openmoviedb/kinopoiskdev_client";
import { useEffect, useState } from "react";
import { getAllMoviesFilter } from "../../entities/movie";
import Button from "@mui/material/Button";
import { addToSimilarMovies } from "../../entities/moviesSelection/api";
import {
  MoviesSelection,
  getSimilarMovies,
} from "../../entities/moviesSelection";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface AddSimilarMoviesModalProps {
  isOpenModalSelectionMovies: boolean;
  handleCloseModalSelectionMovies: () => void;
  movieId: number;
  updateSelectionMovies: (newMovie: MoviesSelection[]) => void;
}

export function AddSimilarMoviesModal({
  isOpenModalSelectionMovies,
  handleCloseModalSelectionMovies,
  movieId,
  updateSelectionMovies,
}: AddSimilarMoviesModalProps) {
  const [value, setValue] = useState<{
    id: number;
    name: string | undefined;
  } | null>(null);
  
  const [searchWord,setSearchWord] = useState('');
 


  // Запрашиваем все фильмы
  const { data: allFilmsFromKp } = useQuery<MovieDocsResponseDtoV13["docs"]>(
    ["allMovies"],
    async () => {
      const response = await getAllMoviesFilter({ name: value?.name || "" });
      return response.data?.docs || [];
    }
  );

  const addMovieMutation = useMutation(addToSimilarMovies, {
    onSuccess: async () => {
      const response = await getSimilarMovies(movieId);
      updateSelectionMovies(response);
      handleCloseModalSelectionMovies();
    },
  });
  const handleAddMovie = () => {
    if (value && value.id && movieId) {
      addMovieMutation.mutate({
        similarMovieId: value.id,
        movieId: movieId,
      });
    }
  };
  const { data,  } = useQuery(["similarMovies", searchWord],() =>getAllMoviesFilter({name: searchWord}));
  
  

  
  const handleChange = async (_: any, value: string) => {
    setSearchWord(value)
    
    };

  return (
    <Modal
      open={isOpenModalSelectionMovies}
      onClose={handleCloseModalSelectionMovies}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-style-box">
        <Typography id="modal-modal-title">Введите название фильма:</Typography>
        <Typography
          className="picture-modal-title"
          id="modal-modal-description"
        >
          <Autocomplete
            value={value}
            onChange={(_, newValue) => setValue(newValue)}
            disablePortal
            onInputChange={handleChange}
            options={(data?.data?.docs ?? [])
              .filter((movie) => !!movie.name)
              .map((movie) => ({ id: movie.id, name: movie.name }))}
            getOptionLabel={(option) => option.name ?? ""}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
        </Typography>
        <Button
          className="addition"
          variant="contained"
          onClick={handleAddMovie}
        >
          Добавить
        </Button>
      </Box>
    </Modal>
  );
}
