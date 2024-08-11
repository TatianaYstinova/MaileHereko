import { Button, Popover, Rating } from "@mui/material";
import Star from "../../assets/star.svg";
import { useState } from "react";
import "./MovieRatingEditor.scss";

export const MovieRatingEditor = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [ratingValue, setRatingValue] = useState<number | null>(null);
 

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
    handleClose(); // Закрываем Popover после выбора
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
        id={id}
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
          defaultValue={2}
        />
      </Popover>
    </>
  );
};
