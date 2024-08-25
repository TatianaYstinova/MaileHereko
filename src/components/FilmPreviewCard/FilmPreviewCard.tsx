import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import theme from "../../theme";
import { MovieRatingEditor } from "../MovieRatingEditor/MovieRatingEditor";

/* 
компонент карточки фильма
с названием и картинкой,
без дополнительной информации
*/
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
    <Card
      sx={{
        maxWidth: 284,
        maxHeight: 480,
        p: 2,
        borderRadius: "12px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          paddingX: 1,
          paddingY: 1.5,
          gap: "4px",
          backgroundColor: "#000000A6",
          borderRadius: "8px",
          mt: 1.3,
          ml: 1,
        }}
      >
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
        sx={{ borderRadius: "8px" }}
      />
      <CardContent sx={{ paddingTop: 2 }} style={{ paddingBottom: 8 }}>
        <Typography
          sx={{
            color: theme.palette.grey[50],
            fontSize: "16px",
            lineHeight: "24px",
            fontWeight: "600",
            textAlign: "left",
          }}
          component="p"
        >
          {props.name}
        </Typography>
      </CardContent>
    </Card>
  );
};
