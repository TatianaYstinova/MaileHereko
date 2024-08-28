import { CatalogCard } from "../../components/CatalogCard/CatalogCard";
import { usePossibleFilterValues } from "../../entities/genre";
import "./CatalogPage.scss";

export const CatalogPage = () => {
  const { possibleFilterValues: genres } =
    usePossibleFilterValues("genres.name");

  return (
    <div className="catalogue-page">
      {genres?.map((genre) => (
        <CatalogCard genre={genre.name} />
      ))}
    </div>
  );
};
export default CatalogPage;
