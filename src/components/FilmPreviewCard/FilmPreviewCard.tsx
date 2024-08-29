import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { MovieRatingEditor } from "../MovieRatingEditor/MovieRatingEditor";
import {
  cardSx,
  boxSx,
  cardMediaSx,
  cardContent,
  typographySx,
} from "./styles";

export type FilmPreviewCardProps = {
  name: string | undefined;
  alternativeName: string;
  grade: number;
  img: string | undefined;
  movieId: number;
};

export const FilmPreviewCard = (props: FilmPreviewCardProps) => {
  const imageUrl = props.img ? props.img : props.alternativeName;

  return (
    <Card sx={cardSx}>
      <Box sx={boxSx}>
        <Typography component="span" sx={{ color: "#FFBD6D" }}>
          {props.grade.toFixed(1)}
        </Typography>
        <MovieRatingEditor movieId={props.movieId} />
      </Box>
      <CardMedia
        component="img"
        height="inherit"
        image={imageUrl}
        alt="Image description"
        sx={cardMediaSx}
      />
      <CardContent sx={cardContent}>
        <Typography sx={typographySx} component="p">
          {props.name}
        </Typography>
      </CardContent>
    </Card>
  );
};
