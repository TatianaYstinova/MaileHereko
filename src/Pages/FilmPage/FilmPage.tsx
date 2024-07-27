import { useEffect, useState } from "react";

import './FilmPage.scss'


import { MovieDtoV13 } from "@openmoviedb/kinopoiskdev_client";

import Button from "@mui/material/Button";

import { TOKEN } from '../../shared/kp-client'
import { FilmCard } from '../../components/FilmCard'
import { getMovieById } from "../../entities/movie";
import { getFavorites, FavoriteMovie, addToFavorites, deleteFromFavorites as deleteFromFavoritesApi } from '../../entities/favorites';



import Modal from "@mui/material/Modal/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import thankYou from '../../assets/thankyou.png';



export const FilmPage = () => {
  const [movie, setMovie] = useState<MovieDtoV13 | null>(null);
  const [favoriteMovie, setFavoriteMovie] = useState<FavoriteMovie | null>(null);

  const [favorites, setFavorites] = useState<FavoriteMovie[] | null>(null);

  useEffect(() => {
    getMovieById(1263772).then((response) => setMovie(response.data));
  }, []);

  useEffect(() => {
    getFavorites(TOKEN).then(favorites => setFavorites(favorites));
  }, [setFavorites]);

  const [isInFavorites, setIsInFavorites] = useState<boolean>(false);

  useEffect(() => {
    if (favorites && movie) {
      const favorite = favorites.find(({ favoritedMovieId }) => favoritedMovieId === movie.id);

      if (favorite) {
        setIsInFavorites(true);
        setFavoriteMovie(favorite);
      } else {
        setIsInFavorites(false);
        setFavoriteMovie(null);
      }
    }
  }, [movie, favorites]);

  const addFavorites = async () => {
    if (movie) {
      addToFavorites({
        userId: TOKEN,
        favoritedMovieId: movie.id
      }).then(() => getFavorites(TOKEN).then(favorites => setFavorites(favorites)))
    }
  }

  const deleteFromFavorites = async () => {
    if (favoriteMovie) {
      deleteFromFavoritesApi({
        id: favoriteMovie.id
      }).then(() => getFavorites(TOKEN).then(favorites => setFavorites(favorites)))
    }
  }

  const [isOpenModalFavoriteMovie, setIsOpenModalFavoriteMovie] = useState<boolean>(false);

  const toggleFavorite = async () => {
    if(isInFavorites){
      deleteFromFavorites();
    } else {
      addFavorites();
    }

    setIsOpenModalFavoriteMovie(true);
  }

  const handleClose = () => {
    setIsOpenModalFavoriteMovie(false);
  }


  return (
    <>
      <div className="img-container">
        <div className="img-poster">
          <img className='poster-header' src={movie?.poster?.url} alt="poster" />
        </div>
      </div>
      <div className="path-container">
        <div className="path">MaileHereko/Movies</div>
        <div className="film-title">{movie?.name}</div>
      </div>
      <div className="filmCard-container">
        {movie && <FilmCard {...movie} />}
        <div className="button-container">
          <Button className="film-button"
            variant="contained"
            onClick={toggleFavorite}>
            {isInFavorites ? 'Удалить из избранного' : 'Добавить в избранное'}
          </Button>
          <Modal
            open={isOpenModalFavoriteMovie}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className='modal-style-box'>
              <Typography id="modal-modal-title">
                <img  className='picture-modal'src={thankYou} alt="" />
              </Typography>
              <Typography  className='picture-modal-title' id="modal-modal-description" >
                {isInFavorites ? `Вы добавили ${movie?.name} в "Избранное"` : `Вы удалили ${movie?.name} из "Избранное"`}
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
};
