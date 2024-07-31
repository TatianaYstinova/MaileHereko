import CatalogCard from "../../components/CatalogCard/CatalogCard";
import { Typography, Container, Grid } from "@mui/material";

const CatalogPage = () => {
  return (
    <Container
      fixed
      sx={{
        marginTop: 10,
        gap: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        sx={{ fontWeight: "bold" }}
      >
        Каталог фильмов
      </Typography>
      <Grid container spacing={2}>
        <CatalogCard
          text="wieweiuwe"
          image="https://www.kino-teatr.ru/news/22471/199538.jpg"
        />
      </Grid>
    </Container>
  );
};

export default CatalogPage;
