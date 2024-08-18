import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useState } from "react";
import { getMoviesByFilter } from '../../entities/movie/api';
import Button from "@mui/material/Button";
import { addToSimilarMovies } from "../../entities/moviesSelection/api";
import {
  SimiralMovie,
} from "../../entities/moviesSelection";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
  useQuery,
  
} from "react-query";

interface AddSimilarMoviesModalProps {
  isOpenModalSelectionMovies: boolean;
  handleCloseModalSelectionMovies: () => void;
  movieId: number;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<SimiralMovie[], unknown>>;
}

export function AddSimilarMoviesModal({
  isOpenModalSelectionMovies,
  handleCloseModalSelectionMovies,
  movieId,
  refetch,
}: AddSimilarMoviesModalProps) {
  const [value, setValue] = useState<{
    id: number;
    name: string | undefined;
  } | null>(null);

  const [searchWord, setSearchWord] = useState("");
  

  const addMovieMutation = useMutation(addToSimilarMovies, {
    onSuccess:  () => {
      refetch();
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
  const { data } = useQuery(["filmsBySearchWord", searchWord], () =>
    getMoviesByFilter({ name: searchWord })
  );

  const handleChange = async (_: any, value: string) => {
    setSearchWord(value);
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
