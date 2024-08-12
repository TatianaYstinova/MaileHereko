import { Button, Popover, Rating } from "@mui/material";
import Star from "../../assets/star.svg";
import { useEffect, useState } from "react";
import "./MovieRatingEditor.scss";
import {
  FilmScore,
  getFilmScores,
  addFilmScores,
  EvaluationUpdate,
} from "../../entities/estimates/index";
import { useMutation, useQuery, useQueryClient } from "react-query";
import React from "react";
import { TOKEN } from "../../shared/kp-client";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../entities/movie";

interface MovieRatingEditorProps {
  movieId: number;
}

export const MovieRatingEditor: React.FC<MovieRatingEditorProps> = ({
  movieId,
}) => {
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [ratingValue, setRatingValue] = useState<number | null>(null);

  const userId = TOKEN;

  // Загрузка оценок фильма
  const { data: scores } = useQuery<FilmScore[]>(
    ["filmScores", movieId],
    () => getFilmScores(userId)
  );

  // useEffect для установки значения рейтинга из загруженных оценок
  useEffect(() => {
    if (scores) {
      const existingScore = scores.find((score) => score.movieId === movieId);
      if (existingScore) {
        setRatingValue(existingScore.grade);
      } else {
        setRatingValue(null);
      }
    }
  }, [scores, userId]);
  

  // Мутация для добавления новой оценки
  const addMutation = useMutation(addFilmScores, {
    onSuccess: () => {
      queryClient.invalidateQueries(["filmScores", movieId]);
    },
  });

  // Мутация для обновления существующей оценки
  const updateMutation = useMutation(EvaluationUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries(["filmScores", movieId]);
    },
  });

  // Функции для управления Popover
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRatingChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    setRatingValue(Number(value));
    handleClose();

    // Проверка, существует ли уже оценка, чтобы определить, нужно ли создать или обновить
    const existingScore = scores?.find((score) => score.userId === userId);

    if (existingScore) {
      // Если оценка уже существует, обновляем её
      updateMutation.mutate({
        id: existingScore.id,
        userId: userId,
        movieId: movieId,
        grade: Number(value),
      });
    } else {
      // Если оценки нет, создаем новую
      addMutation.mutate({ userId, movieId, grade: Number(value) });
    }
  };

  const open = Boolean(anchorEl);
  const openModal = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outlined"
        style={{ position: "relative" }}
      >
        {ratingValue !== null ? (
          <span className="viewer-rating">{ratingValue}</span>
        ) : null}
        <img src={Star} alt="star" />
      </Button>
      <Popover
        className="popover-star"
        id={openModal}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ width: "700px", height: "150px", left: "0" }}
      >
        {" "}
        <Rating
          name="size-medium"
          onChange={handleRatingChange}
          onClick={(event) => {
            event.stopPropagation();
          }}
          defaultValue={ratingValue || 0}
        />
      </Popover>
    </>
  );
};
