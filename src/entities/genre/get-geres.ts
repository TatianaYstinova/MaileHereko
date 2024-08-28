import { useQuery } from "react-query"
import { getGenresApi } from "./api"
import { useDispatch, useSelector } from "react-redux"
import { cataloguePageActions, genreSelector } from "../../Pages/CatalogPage/CatalogPageSlice";

export const useGenres = () => {
    const dispatch = useDispatch();

    useQuery(['genres'], getGenresApi, {
        onSuccess: (response) => {
            if (response.data) {
                dispatch(cataloguePageActions.setGenres({ genres: response.data }))
            }
        }
    })

    const genres = useSelector(genreSelector);

    return { genres }
}