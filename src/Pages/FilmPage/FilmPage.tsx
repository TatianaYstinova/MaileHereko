import { useState } from "react";

import "./FilmPage.scss";

import Button from "@mui/material/Button";

import { TOKEN } from "../../shared/kp-client";
import { FilmCard } from "../../components/FilmCard";
import {  getMovieById } from "../../entities/movie";
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
import { getSimilarMovies } from "../../entities/moviesSelection";

import Link from "@mui/material/Link/Link";
import { useParams } from "react-router";

import { AddSimilarMoviesModal } from "../../components/AddSimilarMoviesModal/AddSimilarMoviesModal";
import CardElement from "../../components/CardElement/CardElement";
import Skeleton from "@mui/material/Skeleton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { filmPageActions } from "./FilmPageSlice";
import { getMoviesByFilter } from "../../entities/movie/api";

export const FilmPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const userId = TOKEN;
  const [isOpenModalFavoriteMovie, setIsOpenModalFavoriteMovie] =
    useState(false);
  const [isOpenModalSelectionMovies, setIsOpenModalSelectionMovies] =
    useState(false);
  const dispatch = useAppDispatch();

  //  данные из состояния Redux
  const movie = useAppSelector((state) => state.filmPage.movie);
  const favorites = useAppSelector((state) => state.filmPage.favorites);
  const similarMovies = useAppSelector((state)=>state.filmPage.similarMovies)

  const { isLoading: isLoadingMovie } = useQuery(
    ["movie", id],
    () => getMovieById(Number(id)),
    {
      enabled: !!id,
      onSuccess: (data) => {
        dispatch(filmPageActions.setMovie({ movie: data }));
      },
    }
  );

  const { isLoading: isLoadingFavorites } = useQuery(
    ["favorites", userId],
    () => getFavorites(userId),
    {
      onSuccess: (data) => {
        dispatch(filmPageActions.setFavorites({ favoriteMovie: data }));
      },
    }
  );

  const isInFavorites =
    favorites?.some(
      ({ favoritedMovieId }) => favoritedMovieId === movie?.data?.id
    ) || false;

  const favoriteMovie =
    favorites?.find(
      ({ favoritedMovieId }) => favoritedMovieId === movie?.data?.id
    ) || null;

  
  const addFavoriteMutation = useMutation(addToFavorites, {
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites", userId]);
      setIsOpenModalFavoriteMovie(true);
    },
  });

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

  const {  refetch } = useQuery(
    "similarMoviesFromMyServer",
    () => getSimilarMovies(Number(movie?.data?.id)),
    {
      enabled: !!movie,
      onSuccess:(data)=>{
        dispatch(filmPageActions.setSimilarMovies({similarMovies:data}))
      }
    }
  );

  const { data: similarFromKp } = useQuery(
    ["similarMovies", similarMovies],
    async () => {
      const similarMovieIds = similarMovies?.map(
        (similarMovies) => similarMovies.similarMovieId
      );
      return similarMovieIds && similarMovieIds.length
        ? await getMoviesByFilter({ id: similarMovieIds })
        : null;
    },
    {
      enabled: !!similarMovies,
    }
  );

  const movieId = movie?.data?.id;
  const isMovieIdValid = typeof movieId === "number";

  if (isLoadingMovie) {
    return <div className="download">Загрузка...</div>; 
  }

  return (
    <>
      <div className="img-container">
        <div className="img-poster">
          <img
            className="poster-header"
            src={movie?.data?.poster?.url || "Нет постера"}
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
          {addFavoriteMutation.isLoading ||
          deleteFavoriteMutation.isLoading ||
          isLoadingFavorites ? (
            <Skeleton variant="rectangular" width={210} height={50} />
          ) : (
            <Button
              className="film-button"
              variant="contained"
              onClick={handleToggleFavorite}
            >
              {isInFavorites ? "Удалить из избранного" : "Добавить в избранное"}
            </Button>
          )}
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
