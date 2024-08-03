import { useState } from "react";

import "./FilmPage.scss";

import Button from "@mui/material/Button";

import { TOKEN } from "../../shared/kp-client";
import { FilmCard } from "../../components/FilmCard";
import { getAllMoviesFilter, getMovieById } from "../../entities/movie";
import {
  getFavorites,
  addToFavorites,
  deleteFromFavorites as deleteFromFavoritesApi,
} from "../../entities/favorites";
import { useQuery, useMutation, useQueryClient } from "react-query";

import Modal from "@mui/material/Modal/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import thankYou from "../../assets/thankyou.png";
import {
  getSimilarMovies,
  MoviesSelection,
} from "../../entities/moviesSelection";

import Link from "@mui/material/Link/Link";
import { useParams } from "react-router";

import { AddSimilarMoviesModal } from "../../components/AddSimilarMoviesModal/AddSimilarMoviesModal";
import CardElement from "../../components/CardElement/CardElement";

export const FilmPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const userId = TOKEN;
  const [isOpenModalFavoriteMovie, setIsOpenModalFavoriteMovie] =
    useState(false);
  const [isOpenModalSelectionMovies, setIsOpenModalSelectionMovies] =
    useState(false);
 

  // Запрос на получение фильма по ID
  const { data: movie } = useQuery(
    ["movie", id],
    () => getMovieById(Number(id)),
    { enabled: !!id }
  );

  // Запрос на получение избранных фильмов
  const { data: favorites } = useQuery(["favorites", userId], () =>
    getFavorites(userId)
  );

  const isInFavorites = favorites?.some(
    ({ favoritedMovieId }) => favoritedMovieId === movie?.data?.id
  );
  const favoriteMovie =
    favorites?.find(
      ({ favoritedMovieId }) => favoritedMovieId === movie?.data?.id
    ) || null;

  // Мутация для добавления в избранное
  const addFavoriteMutation = useMutation(addToFavorites, {
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites", userId]);
      setIsOpenModalFavoriteMovie(true);
    },
  });

  // Мутация для удаления из избранного
  const deleteFavoriteMutation = useMutation(deleteFromFavoritesApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites", userId]);
      setIsOpenModalFavoriteMovie(true);
    },
  });

  const handleToggleFavorite = () => {
    if (isInFavorites) {
      if (favoriteMovie?.id !== undefined) {
        deleteFavoriteMutation.mutate({ id: favoriteMovie.id });
      }
    } else {
      const favoritedMovieId = movie?.data?.id;

      if (favoritedMovieId !== undefined) {
        addFavoriteMutation.mutate({
          userId: TOKEN,
          favoritedMovieId: favoritedMovieId,
        });
      }
    }
  };

  // Запрос на получение  похожих фильмов
  const { data: similarMoviesData, refetch } = useQuery(
    "similarMoviesFromMyServer",
    () => getSimilarMovies(Number(movie?.data?.id)),
    {
      enabled: !!movie,
    }
  );
 

  const { data: similarFromKp } = useQuery(
    ["similarMovies", similarMoviesData],
    async () => {
      const similarMovieIds = similarMoviesData?.map(
        (similarMovies) => similarMovies.similarMovieId
      );
      return similarMovieIds && similarMovieIds.length
        ? await getAllMoviesFilter({ id: similarMovieIds })
        : null;
    },
    {
      enabled: !!similarMoviesData,
    }
  );

  const movieId = movie?.data?.id;
  const isMovieIdValid = typeof movieId === "number";

  return (
    <>
      <div className="img-container">
        <div className="img-poster">
          <img
            className="poster-header"
            src={movie?.data?.poster?.url}
            alt="poster"
          />
        </div>
      </div>
      <div className="path-container">
        <div className="path">MaileHereko/Movies</div>
        <div className="film-title">{movie?.data?.name}</div>
      </div>
      <div className="filmCard-container">
        {movie?.data && <FilmCard {...movie?.data} />}
        <div className="button-container">
          <Button
            className="film-button"
            variant="contained"
            onClick={handleToggleFavorite}
          >
            {isInFavorites ? "Удалить из избранного" : "Добавить в избранное"}
          </Button>
          <Modal
            open={isOpenModalFavoriteMovie}
            onClose={() => setIsOpenModalFavoriteMovie(false)}
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
                  ? `Вы добавили ${movie?.data?.name} в "Избранное"`
                  : `Вы удалили ${movie?.data?.name} из "Избранное"`}
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
      <div className="container-selection-movies">
        {Array.isArray(similarFromKp?.data?.docs) &&
          similarFromKp?.data?.docs.map(({ poster, rating, name, id }) => (
            <Link href={`/movie/${id}`} key={id}>
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
          onClick={() => setIsOpenModalSelectionMovies(true)}
        >
          Добавить фильм
        </Button>
        {movie && isMovieIdValid && (
          <AddSimilarMoviesModal
            refetch={refetch}
            handleCloseModalSelectionMovies={() =>
              setIsOpenModalSelectionMovies(false)
            }
            isOpenModalSelectionMovies={isOpenModalSelectionMovies}
            movieId={movieId}
          />
        )}
      </div>
    </>
  );
};
export default FilmPage;
