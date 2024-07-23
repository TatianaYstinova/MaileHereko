
import '../../Pages/HomePage/Home.scss'

import { LinkTypogrpahy, StyledLink } from './styles';

interface NavbarParams {
  title: string;
}


export function Navbar(parametrs: NavbarParams) {
  return (
    <StyledLink href="#" underline="hover"><LinkTypogrpahy>{parametrs.title}</LinkTypogrpahy></StyledLink>
  );
}


