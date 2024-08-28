import { PossibleValueDto } from "@openmoviedb/kinopoiskdev_client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface CataloguePageState {
  [filterFieldName: string]: PossibleValueDto[];
}

export interface SetGenresActionPayload {
  possibleValues: PossibleValueDto[];
  filterFieldName: string;
}

const initialState: CataloguePageState = {}

const cataloguePageSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setPossibleFilterValues(state, action: PayloadAction<SetGenresActionPayload>) {
      const { filterFieldName, possibleValues } = action.payload;
      state[filterFieldName] = possibleValues;
    }
  }
})
export const cataloguePageActions = cataloguePageSlice.actions;

export const cataloguePageReducer = cataloguePageSlice.reducer;

export const possibleFilterValuesSelector = (state: RootState, filterFieldName: string): PossibleValueDto[] | undefined => state.catalogPage[filterFieldName];