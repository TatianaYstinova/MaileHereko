import { Filter, MovieFields } from "@openmoviedb/kinopoiskdev_client";
import { useGenres } from "../../entities/genre";
import Checkbox from "@mui/material/Checkbox";
import pink from "@mui/material/colors/pink";
import { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { FormControlLabel, Typography } from "@mui/material";

interface FiltersProps {
  setFilters: (param: Filter<MovieFields>) => void;
}

export const Filters: React.FC<FiltersProps> = ({ setFilters }) => {
  const { genres } = useGenres();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="filters-container">
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
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className="genres-container">
          <Typography>Жанры</Typography>
          {genres.map((genre) => (
            <div>
              <FormControlLabel control={<Checkbox />} label={genre.name} />
            </div>
          ))}
        </div>
      </Popover>
    </div>
  );
};
