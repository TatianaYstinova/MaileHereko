import { Box, CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";

import { Link } from "react-router-dom";
import { boxCard, cardStyle, linkStyle } from "./style";

interface CatalogCardProps {
  genre: string;
}

export const CatalogCard = (props: CatalogCardProps) => {
  return (
    <Box sx={linkStyle}>
      <Link
        to={`/film-by-genre?genre=${encodeURIComponent(props.genre)}`}
        style={{ width: "100%", height: "100%", textDecoration: "none" }}
      >
        <Card sx={cardStyle}>
          <Box sx={boxCard}>
            <Typography
              component="span"
              sx={{ color: "#FFBD6D", fontSize: "50px" }}
            >
              {props.genre}
            </Typography>
          </Box>
          <CardMedia
            component="img"
            height="inherit"
            sx={{ borderRadius: "8px" }}
          />
        </Card>
      </Link>
    </Box>
  );
};
