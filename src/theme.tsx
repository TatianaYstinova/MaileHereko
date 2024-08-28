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
        color: "#ffffff",
        fontFamily: "Poppins, sans-serif",
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          border: "2px solid #7B6EF6",
          fontFamily: "Poppins, sans-serif",
          borderRadius: "12px",
          fontWeight: 400,
          color:"#FFFFFF",
          fontSize: "16px",
          lineHight: "24px",
          backgroundColor: "#7B6EF6",
          padding: "16px 32px",
          "&:hover": {
            border: "2px solid #5A4AF4",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          display: "flex",
          borderRadius: "12px",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          padding: "16px",
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "auto",
          position: "relative",
          alignItems: "center",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#f9f9f9",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          display: "flex",
          background: "transparent",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    }, 
  },
});

export default theme;
