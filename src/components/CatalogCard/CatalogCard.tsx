import {
  CardActionArea,
  CardMedia,
  CardContent,
  Card,
  Typography,
  Grid,
} from "@mui/material";

interface CatalogCardProps {
  image: string;
  text: string;
}

export default function CatalogCard({ image, text }: CatalogCardProps) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardActionArea sx={{ padding: 1 }}>
          <CardMedia component="img" height="280" image={image} />
          <CardContent>
            <Typography gutterBottom variant="body2" component="div">
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
