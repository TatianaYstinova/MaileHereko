import { useEffect, useState } from "react";

import './film.scss'
import logo from '../../assets/logoImg/Frame 82.png'

import { MovieDtoV13 } from "@openmoviedb/kinopoiskdev_client";

import { Button, CircularProgress } from "@mui/material";

import { TOKEN } from '../../shared/kp-client'
import { FilmCard } from '../../components/FilmCard'
import { getMovieById } from "../../entities/movie";
import { getFavorites, Favorite, addToFavorites, deleteFromFavorites as deleteFromFavoritesApi } from '../../entities/favorites';
import { Navbar } from "../../components/Navbar";
import { StyleButton } from "../../components/Navbar/styles";

const navigationMenuLinkName = [
  {
    title: 'Movie'
  },
  {
    title: 'Catalog'
  },
  {
    title: 'Sign in ->',

  }

];

export const FilmPage = () => {
  const [movie, setMovie] = useState<MovieDtoV13 | null>(null);
  const [favorite, setFavorite] = useState<Favorite | null>(null);

  const [favorites, setFavorites] = useState<Favorite[] | null>(null);

  useEffect(() => {
    getMovieById(1263772).then((response) => setMovie(response.data));
  }, [setMovie]);

  useEffect(() => {
    // сейчас эта функция возвращает избранные фильмы ВСЕХ пользователей
    // а нужно возвращать фильмы только текущего пользователя
    // текущего пользователя идентифицирует TOKEN
    // соответственно надо понять, как составить запрос к json-server с фильтром по userId === TOKEN из списка избранных фильмов
    getFavorites(TOKEN).then(favorites => setFavorites(favorites));
  }, [setFavorites]);

  const [isInFavorites, setIsInFavorites] = useState<boolean>(false);

  useEffect(() => {
    if (favorites && movie) {
      const favorite = favorites.find(({ favoritedMovieId }) => favoritedMovieId === movie.id);

      if (favorite) {
        setIsInFavorites(true);
        setFavorite(favorite);
      } else {
        setIsInFavorites(false);
        setFavorite(null);
      }
    }
  }, [movie, favorites, setIsInFavorites, setFavorite]);

  const addFavorites = async () => {
    if (movie) {
      addToFavorites({
        userId: TOKEN,
        favoritedMovieId: movie.id
      }).then(() => getFavorites(TOKEN).then(favorites => setFavorites(favorites)))
    }
  }

  const deleteFromFavorites = async () => {
    if (favorite) {
      deleteFromFavoritesApi({
        id: favorite.id
      }).then(() => getFavorites(TOKEN).then(favorites => setFavorites(favorites)))
    }
  }

  return (
    <>
      <div className='header-container'>
        <img className='logo' src={logo} alt='picture logo' />
        <div className='menu-navigation'>
          {navigationMenuLinkName.map((element) => <Navbar title={element.title} />)}
        </div>
      </div>
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
        <StyleButton className="film-button"
          variant="contained"
          onClick={isInFavorites ? deleteFromFavorites : addFavorites}
          disabled={!movie}
        >
          {isInFavorites ? 'Удалить из избранного' : 'Добавить в избранное'}
        </StyleButton>
      </div>

    </>
  );
};
