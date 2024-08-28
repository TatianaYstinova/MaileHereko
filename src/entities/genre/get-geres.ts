import { useQuery } from "react-query"
import { getGenresApi } from "./api"
import { useDispatch, useSelector } from "react-redux"
import { cataloguePageActions, possibleFilterValuesSelector } from "../../Pages/CatalogPage/CatalogPageSlice";
import { RootState } from "../../store/store";

export const usePossibleFilterValues = (filterFieldName: string) => {
  const dispatch = useDispatch();

  useQuery(['filterFieldName', filterFieldName], () => getGenresApi(filterFieldName), {
    onSuccess: (response) => {
      if (response.data) {
        dispatch(cataloguePageActions.setPossibleFilterValues({
          filterFieldName, possibleValues: response.data || []
        }))
      }
    }
  })

  const possibleFilterValues = useSelector((state: RootState) => (possibleFilterValuesSelector(state, filterFieldName)));

  return { possibleFilterValues }
}