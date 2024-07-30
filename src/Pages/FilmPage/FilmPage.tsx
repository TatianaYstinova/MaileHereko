import { useEffect, useState } from "react";

import "./FilmPage.scss";

import {
  MovieDocsResponseDtoV13,
  MovieDtoV13,
} from "@openmoviedb/kinopoiskdev_client";

import Button from "@mui/material/Button";

import { TOKEN } from "../../shared/kp-client";
import { FilmCard } from "../../components/FilmCard";
import { getAllMoviesFilter, getMovieById } from "../../entities/movie";
import {
  getFavorites,
  FavoriteMovie,
  addToFavorites,
  deleteFromFavorites as deleteFromFavoritesApi,
} from "../../entities/favorites";

import Modal from "@mui/material/Modal/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import thankYou from "../../assets/thankyou.png";
import {
  getMoviesSelection,
  MoviesSelection,
} from "../../entities/moviesSelection";

import Link from "@mui/material/Link/Link";
import { useParams } from "react-router";

import { AddSimilarMoviesModal } from "../../components/AddSimilarMoviesModal/AddSimilarMoviesModal";
import CardElement from "../../components/CardElement/CardElement";

export const FilmPage = () => {
  const [movie, setMovie] = useState<MovieDtoV13 | null>(null);
  const [favoriteMovie, setFavoriteMovie] = useState<FavoriteMovie | null>(
    null
  );
  const [isInFavorites, setIsInFavorites] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<FavoriteMovie[] | null>(null);
  const { id } = useParams();
  const [isOpenModalFavoriteMovie, setIsOpenModalFavoriteMovie] =
    useState<boolean>(false);
  const [selectionMovies, setSelectionMovies] = useState<
    MoviesSelection[] | null
  >(null);
  const [similarFromKp, setSimilarFromKp] = useState<
    MovieDocsResponseDtoV13["docs"] | null
  >(null);
  const [isOpenModalSelectionMovies, setIsOpenModalSelectionMovies] =
    useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const movieId = parseInt(id);
      getMovieById(movieId).then((response) => setMovie(response.data));
    }
  }, [id]);

  useEffect(() => {
    getFavorites(TOKEN).then((favorites) => setFavorites(favorites));
  }, [setFavorites]);

  useEffect(() => {
    if (favorites && movie) {
      const favorite = favorites.find(
        ({ favoritedMovieId }) => favoritedMovieId === movie.id
      );

      if (favorite) {
        setIsInFavorites(true);
        setFavoriteMovie(favorite);
      } else {
        setIsInFavorites(false);
        setFavoriteMovie(null);
      }
    }
  }, [movie, favorites]);

  useEffect(() => {
    if (movie) {
      getMoviesSelection(movie.id).then(setSelectionMovies);
    }
  }, [movie]);

  useEffect(() => {
    if (selectionMovies) {
      const similarMovieIds = selectionMovies.map(
        (selectionMovie) => selectionMovie.similarMovieId
      );

      if (similarMovieIds.length) {
        getAllMoviesFilter({ id: similarMovieIds }).then((response) =>
          setSimilarFromKp(response.data?.docs || null)
        );
      }
    }
  }, [selectionMovies]);

  const addFavorites = async () => {
    if (movie) {
      addToFavorites({
        userId: TOKEN,
        favoritedMovieId: movie.id,
      }).then(() =>
        getFavorites(TOKEN).then((favorites) => setFavorites(favorites))
      );
    }
  };

  const deleteFromFavorites = async () => {
    if (favoriteMovie) {
      deleteFromFavoritesApi({
        id: favoriteMovie.id,
      }).then(() =>
        getFavorites(TOKEN).then((favorites) => setFavorites(favorites))
      );
    }
  };

  const toggleFavorite = () => {
    if (isInFavorites) {
      deleteFromFavorites();
    } else {
      addFavorites();
    }

    setIsOpenModalFavoriteMovie(true);
  };

  const handleClose = () => {
    setIsOpenModalFavoriteMovie(false);
  };
  const handleCloseModalSelectionMovies = () => {
    setIsOpenModalSelectionMovies(false);
  };
  const openModalSelectionMovies = () => {
    setIsOpenModalSelectionMovies(true);
  };

  return (
    <>
      <div className="img-container">
        <div className="img-poster">
          <img
            className="poster-header"
            src={movie?.poster?.url}
            alt="poster"
          />
        </div>
      </div>
      <div className="path-container">
        <div className="path">MaileHereko/Movies</div>
        <div className="film-title">{movie?.name}</div>
      </div>
      <div className="filmCard-container">
        {movie && <FilmCard {...movie} />}
        <div className="button-container">
          <Button
            className="film-button"
            variant="contained"
            onClick={toggleFavorite}
          >
            {isInFavorites ? "Удалить из избранного" : "Добавить в избранное"}
          </Button>
          <Modal
            open={isOpenModalFavoriteMovie}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="modal-style-box">
              <Typography id="modal-modal-title">
                <img className="picture-modal" src={thankYou} alt="" />
              </Typography>
              <Typography
                className="picture-modal-title"
                id="modal-modal-description"
              >
                {isInFavorites
                  ? `Вы добавили ${movie?.name} в "Избранное"`
                  : `Вы удалили ${movie?.name} из "Избранное"`}
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
      <div className="container-selection-movies">
        {similarFromKp?.map(({ poster, rating, name, id }) => (
          <Link href={`/movie/${id}`}>
            <CardElement
              image={poster?.url || ""}
              starNumber={Number(rating?.kp?.toFixed(1)) || "Нет оценок"}
              text={name || ""}
            />
          </Link>
        ))}
        <Button
          className="add-film-to-selections "
          variant="contained"
          onClick={openModalSelectionMovies}
        >
          Добавить фильм
        </Button>
        {movie && (
          <AddSimilarMoviesModal
            handleCloseModalSelectionMovies={handleCloseModalSelectionMovies}
            isOpenModalSelectionMovies={isOpenModalSelectionMovies}
            movieId={movie.id}
            updateSelectionMovies={setSelectionMovies}
          />
        )}
      </div>
    </>
  );
};
export default FilmPage;
