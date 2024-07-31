import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Poppins, sans-serif",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(32, 40, 62, 0.4)",
          color: "#ffffff",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          color: "#FFAD49",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        color: '#ffffff',
      }
  },
 
  },
 
});

export default theme;
