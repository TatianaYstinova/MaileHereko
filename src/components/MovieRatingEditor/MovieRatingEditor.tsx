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
import { useMutation, useQuery } from "react-query";
import React from "react";
import { TOKEN } from "../../shared/kp-client";
import { DeletingAnAssessment } from "../../entities/estimates/api/delete";
import { useSelector } from "react-redux";
import { isUathorizedSelector } from "../../store";

interface MovieRatingEditorProps {
  movieId: number;
}

export const MovieRatingEditor: React.FC<MovieRatingEditorProps> = ({
  movieId,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [ratingValue, setRatingValue] = useState<number | null>(null);

  const userId = TOKEN;

  const { data: scores, refetch } = useQuery<FilmScore[]>(["filmScores"], () =>
    getFilmScores(userId)
  );

  useEffect(() => {
    if (scores) {
      const existingScore = scores.find(
        (score) => score.movieId === movieId && score.userId === userId
      );

      if (existingScore) {
        setRatingValue(existingScore.grade);
      } else {
        setRatingValue(null);
      }
    }
  }, [scores, userId, movieId]);

  const addMutation = useMutation(addFilmScores, {
    onSuccess: () => {
      refetch();
    },
  });

  const updateMutation = useMutation(EvaluationUpdate, {
    onSuccess: () => {
      refetch();
    },
  });

  const deleteMutation = useMutation(DeletingAnAssessment, {
    onSuccess: () => {
      refetch();
    },
  });

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
    const existingScore = scores?.find((score) => score.movieId === movieId);

    if (existingScore) {
      if (value === null) {
        deleteMutation.mutate({
          id: existingScore.id,
        });
      } else {
        updateMutation.mutate({
          id: existingScore.id,
          userId: userId,
          movieId: movieId,
          grade: Number(value),
        });
      }
    } else {
      addMutation.mutate({ userId, movieId, grade: Number(value) });
    }
    handleClose();
  };

  const open = Boolean(anchorEl);
  const openModal = open ? "simple-popover" : undefined;

  const getCircleColor = () => {
    if (ratingValue !== null) {
      if (ratingValue >= 1 && ratingValue <= 4) return "low-rating";
      if (ratingValue >= 5 && ratingValue <= 8) return "medium-rating";
      if (ratingValue >= 9 && ratingValue <= 10) return "high-rating";
    }
    return "transparent";
  };

  const isAuthorized = useSelector(isUathorizedSelector);

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outlined"
        style={{ position: "relative" }}
      >
        {ratingValue !== null ? (
          <span className={`viewer-rating ${getCircleColor()}`}>
            {ratingValue}
          </span>
        ) : null}
        <img src={Star} alt="star" />
      </Button>
      {isAuthorized && (
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
            max={10}
            onChange={handleRatingChange}
            onClick={(event) => {
              event.stopPropagation();
            }}
            defaultValue={ratingValue || 0}
          />
        </Popover>
      )}
    </>
  );
};
