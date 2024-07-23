import styledMUI from '@mui/material/styles/styled';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';



export const StyleButton = styledMUI(Button)({width:'400px',display:'flex',left:'744px'});

export const StyledLink = styledMUI(Link)({color:'white'});

// НЕ РАБОТАЕТ ШРИФТ
export const LinkTypogrpahy = styledMUI(Typography)(({}));

