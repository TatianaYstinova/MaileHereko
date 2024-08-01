import { useEffect, useState } from "react";

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
  getMoviesSelection,
} from "../../entities/moviesSelection";

import Link from "@mui/material/Link/Link";
import { useParams } from "react-router";

import { AddSimilarMoviesModal } from "../../components/AddSimilarMoviesModal/AddSimilarMoviesModal";
import CardElement from "../../components/CardElement/CardElement";

export const FilmPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const userId = TOKEN;
  
  // Запрос на получение фильма по ID
  const { data: movie } = useQuery(
    ["movie", id],
    () => getMovieById(Number(id)),
    {
      enabled: !!id, // Запрос не выполняется, пока id не задан
    }
  );

  // Запрос на получение избранных фильмов
  const { data: favorites } = useQuery(["favorites", userId], () =>
    getFavorites(userId)
  );

  // Запрос на получение выборки фильмов
  const { data: selectionMovies } = useQuery(
    ["selectionMovies", movie?.data?.id],
    () => getMoviesSelection(Number(movie?.data?.id)),
    {
      enabled: !!movie,
    }
  );
  // Мутация для добавления в избранное
  const addFavoriteMutation = useMutation(addToFavorites, {
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites", userId]);
    },
  });
  
  // Мутация для удаления из избранного
  const deleteFavoriteMutation = useMutation(deleteFromFavoritesApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites", userId]);
    },
  });
  const isInFavorites = favorites?.some(({ favoritedMovieId }) => favoritedMovieId === movie?.data?.id);

  const [isOpenModalFavoriteMovie, setIsOpenModalFavoriteMovie] = useState(false);
  const [isOpenModalSelectionMovies, setIsOpenModalSelectionMovies] = useState(false);

  const toggleFavorite = () => {
    if (isInFavorites) {
      if(favorites && favorites.length > 0){
        const favorite = favorites.find(favorite => favorite.favoritedMovieId === movie?.data?.id);
        if (favorite) {
          deleteFavoriteMutation.mutate({ id: favorite.id });
        }
      }
    } else {
      const favoritedMovieId = movie?.data?.id;
      if(favoritedMovieId !== undefined){
        addFavoriteMutation.mutate({ userId: TOKEN, favoritedMovieId});
      }
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
   
  const similarMovieIds = selectionMovies ? selectionMovies.map(selectionMovie => selectionMovie.similarMovieId) : [];

  const { data: similarFromKp } = useQuery(['similarMovies', similarMovieIds], () => getAllMoviesFilter({ id: similarMovieIds }), {
    enabled: similarMovieIds.length > 0,
  });
  const movieId = movie?.data?.id;
  const isMovieIdValid = typeof movieId === 'number';

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
            onClick={{toggleFavorite}}
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
                  ? `Вы добавили ${movie?.data?.name} в "Избранное"`
                  : `Вы удалили ${movie?.data?.name} из "Избранное"`}
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
      <div className="container-selection-movies">
        {Array.isArray(similarFromKp?.data) && similarFromKp?.data?.map(({ poster, rating, name, id }) => (
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
          onClick={openModalSelectionMovies}
        >
          Добавить фильм
        </Button>
        {movie && isMovieIdValid && (
          <AddSimilarMoviesModal
            handleCloseModalSelectionMovies={handleCloseModalSelectionMovies}
            isOpenModalSelectionMovies={isOpenModalSelectionMovies}
            movieId={movieId}
            updateSelectionMovies={selectionMovies  || []}
          />
        )}
      </div>
    </>
  );
};
export default FilmPage;
