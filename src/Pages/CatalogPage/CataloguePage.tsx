import { CatalogCard } from "../../components/CatalogCard/CatalogCard";
import { useGenres } from "../../entities/genre";
import "./CatalogPage.scss";

export const CatalogPage = () => {
  const { genres } = useGenres();

  return (
    <div className="catalogue-page" >
      {genres.map((genre) => (
      <CatalogCard genre={genre.name} />
      ))}
    </div>
  );
};
export default CatalogPage;
