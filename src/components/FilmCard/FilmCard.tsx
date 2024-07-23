
import { MovieDtoV13 } from '@openmoviedb/kinopoiskdev_client';
import React from 'react';
import star from '../../assets/star.png';

export const FilmCard: React.FC<MovieDtoV13> = ({
  rating,
  slogan,
  poster,
  description,
  type,
  year,
  movieLength,
  genres,
  countries,
}) => {
  return (
    <div className='film-card'>
      <div className='poster-coitainer'>
      <div className='poster'>
        {poster && <img className='poster-film' src={poster?.url} />}
      </div>
      </div>
      <div className='poster-info'>
      <div className='slogan'>{slogan}</div>
      <div className='description'>Описание: {description}</div>
      <div className='rating'><img src={star} alt='star' />{rating?._await?.toFixed()}</div>
      <div className='type'>Тип: {type}</div>
      <div className='year'>Год выпуска: {year}</div>
      <div className='movieLength'>Длина фильма : {movieLength?.toString()} мин.</div>
      <div className='genres'>Жанр: {genres?.map((genre) => genre.name)}</div>
      <div className='countries'>Страна: {countries?.map((countrie) => countrie.name)}</div>
      </div>
    </div>

  )
}
