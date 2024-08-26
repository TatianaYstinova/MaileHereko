import { Box, CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";

import { Link } from "react-router-dom";

interface CatalogCardProps {
  genre: string;
  poster: string;
}

export const  CatalogCard =(props: CatalogCardProps)  =>{
  return (
    <Link to={`/page-name?genre=${props.genre}`}>
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
            {props.genre}
        </Typography>
      </Box>
      <CardMedia
        component="img"
        height="inherit"
        image={props.poster}
        alt="Image description"
        sx={{ borderRadius: "8px" }}
      />
    </Card>
    </Link>

  );
}
