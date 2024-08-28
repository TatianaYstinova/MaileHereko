import { Box, CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";

import { Link } from "react-router-dom";
import { boxCard, cardStyle,  } from "./style";

interface CatalogCardProps {
  genre: string;
}

export const  CatalogCard =(props: CatalogCardProps)  =>{
  return (
    <Link to={`/film-by-genre?genre=${encodeURIComponent(props.genre)}`}>
    <Card sx={cardStyle}>
      <Box sx={boxCard}>
        <Typography component="span" sx={{ color: "#FFBD6D" }}>
            {props.genre}
        </Typography>
      </Box>
      <CardMedia
        component="img"
        height="inherit"
        // image={props.poster}
        alt="Image description"
        sx={{ borderRadius: "8px" }}
      />
    </Card>
    </Link>

  );
}
