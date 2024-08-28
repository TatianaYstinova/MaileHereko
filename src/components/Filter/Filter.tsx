import { Filter, MovieFields } from "@openmoviedb/kinopoiskdev_client";
import { usePossibleFilterValues } from "../../entities/genre";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import {
  FormControlLabel,
  Input,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import "./Filter.scss";

interface FiltersProps {
  setFilters: (param: Filter<MovieFields>) => void;
}

export const Filters: React.FC<FiltersProps> = ({ setFilters }) => {
  const { possibleFilterValues: genres } =
    usePossibleFilterValues(`genres.name`);
  const { possibleFilterValues: types } = usePossibleFilterValues(`type`);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [ratingKpRange, setRatingKpRange] = useState<number[]>([1, 10]);
  const [ratingIMDRange, setRatingIMDRange] = useState<number[]>([1, 10]);

  const [yearsOfProduction, setYearsOfProduction] = useState<number[]>([
    1870, 2030,
  ]);

  const handleSliderChangeRatingKp = (
    _event: Event,
    value: number | number[],
    _activeThumb: number
  ) => {
    const newValue = Array.isArray(value) ? value : [value];
    setRatingKpRange(newValue);
  };
  const handleSliderChangeRatingIMDb = (
    _event: Event,
    value: number | number[],
    _activeThumb: number
  ) => {
    const newValue = Array.isArray(value) ? value : [value];
    setRatingIMDRange(newValue);
  };
  const handleSliderChangeYearsOfProduction = (
    _event: Event,
    value: number | number[],
    _activeThumb: number
  ) => {
    const newValue = Array.isArray(value) ? value : [value];
    setYearsOfProduction(newValue);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick}>Фильтры</Button>
      <Popover
        className="popover"
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="filters-container">
          <div className="genres-container">
            <Typography>Жанры</Typography>
            {genres?.map((genre) => (
              <div>
                <FormControlLabel control={<Checkbox />} label={genre.name} />
              </div>
            ))}
          </div>
          <div className="format">
            <Typography>Формат</Typography>
            {types?.map((type) => (
              <div>
                <FormControlLabel control={<Checkbox />} label={type.name} />
              </div>
            ))}
          </div>
          <div className="other">
            <Typography>Прочее</Typography>
            <div className="years-of-production">
              <Typography gutterBottom>Годы выпуска</Typography>
              <TextField
                value={yearsOfProduction[0]}
                onChange={(e) =>
                  setYearsOfProduction((prev) => {
                    prev[0] = Number(e.target.value || 0);

                    return [...prev];
                  })
                }
                margin="normal"
                inputProps={{ type: "number" }}
              />
              <Slider
                value={yearsOfProduction}
                onChange={handleSliderChangeYearsOfProduction}
                min={1870}
                max={2030}
              />
              <TextField
                value={String(yearsOfProduction[1])}
                onChange={(e) =>
                  setYearsOfProduction((prev) => {
                    prev[1] = Number(e.target.value || 0);

                    return [...prev];
                  })
                }
                margin="normal"
                inputProps={{ type: "number" }}
              />
            </div>
            <div>
              <Typography gutterBottom>Рейтинг по версии КиноПоиска</Typography>
              <Slider
                value={ratingKpRange}
                onChange={handleSliderChangeRatingKp}
                valueLabelDisplay="auto"
                min={1}
                max={10}
                step={1}
              />
              <Typography gutterBottom>Рейтинг по версии IMDb</Typography>
              <Slider
                value={ratingIMDRange}
                onChange={handleSliderChangeRatingIMDb}
                valueLabelDisplay="auto"
                min={1}
                max={10}
                step={1}
              />
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
};
