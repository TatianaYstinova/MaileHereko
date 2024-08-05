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
    MuiButtonBase: {
      styleOverrides: {
        root: {
          border: "2px solid #7B6EF6",
          fontFamily: "Poppins, sans-serif",
          borderRadius: '12px', 
          color: 'white',
          fontWeight: 400,
          fontSize: '16px',
          lineHight: '24px',
          backgroundColor: '#7B6EF6',
          padding: '16px 32px',
          '&:hover': {
            border: '2px solid #5A4AF4',
          },
        },
      },
    },
    MuiTextField :{
      styleOverrides:{
        root:{
          width:"100%",
          display:"flex",
          border:"1px solid #ffffff",
          
        }
      }
    },
  },
});

export default theme;
