import "./CardElement.scss";
import {
  CardActionArea,
  Chip,
  CardMedia,
  CardContent,
  Card,
  Typography,
} from "@mui/material";
import starIcon from "../../assets/star.svg";

export default function ActionAreaCar() {
  return (
    <Card sx={{ maxWidth: 180 }}>
      <CardActionArea sx={{ padding: 1 }}>
        <Chip
          className="chip"
          size="small"
          label="8.5"
          icon={<img src={starIcon} />}
        />
        <CardMedia
          component="img"
          height="280"
          image="https://www.kino-teatr.ru/news/22471/199538.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="body2" component="div">
            Lizard
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
