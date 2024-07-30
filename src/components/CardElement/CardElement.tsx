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

interface CardElementProps {
  starNumber:number | "Нет оценок";
  image:string;
  text:string;
}

export default function CardElement({starNumber,image,text}:CardElementProps) {
  return (
    <Card sx={{ maxWidth: 180 }}>
      <CardActionArea sx={{ padding: 1 }}>
        <Chip
          className="chip"
          size="small"
          label={starNumber}
          icon={<img src={starIcon} />}
        />
        <CardMedia
          component="img"
          height="280"
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="body2" component="div">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
