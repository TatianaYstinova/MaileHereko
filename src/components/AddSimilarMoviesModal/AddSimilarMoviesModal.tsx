import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { MovieDocsResponseDtoV13 } from "@openmoviedb/kinopoiskdev_client";
import { useState } from "react";
import { getAllMoviesFilter } from "../../entities/movie";
import Button from "@mui/material/Button";
import { addToSelectionMovies } from "../../entities/moviesSelection/api";
import {
  MoviesSelection,
  getMoviesSelection,
} from "../../entities/moviesSelection";

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
  const [allFilmsFromKp, setAllFilmsFromKp] = useState<
    MovieDocsResponseDtoV13["docs"] | null
  >(null);
  const [value, setValue] = useState<{
    id: number;
    name: string | undefined;
  } | null>(null);

  const handleChange = async (_: any, value: string) => {
    const response = await getAllMoviesFilter({ name: value });
    setAllFilmsFromKp(response.data?.docs || null);
  };
  const handleAddMovie = async () => {
    if (value) {
      await addToSelectionMovies({
        similarMovieId: value.id,
        movieId: movieId,
      });
      const response = await getMoviesSelection(movieId);
      updateSelectionMovies(response);
      handleCloseModalSelectionMovies();
    }
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
            onChange={(
              event: any,
              newValue: { id: number; name: string | undefined } | null
            ) => {
              setValue(newValue);
            }}
            disablePortal
            id="combo-box-demo"
            className="text-input"
            onInputChange={handleChange}
            options={(allFilmsFromKp ?? [])
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
