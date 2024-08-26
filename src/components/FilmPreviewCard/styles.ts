import theme from "../../theme";

export const cardSx = {
    maxWidth: 284,
    maxHeight: 480,
    p: 2,
    borderRadius: "12px",
    position: "relative",
  };
  
  export const boxSx = {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    paddingX: 1,
    paddingY: 1.5,
    gap: "4px",
    backgroundColor: "#000000A6",
    borderRadius: "8px",
    mt: 1.3,
    ml: 1,
  };
  
  export const cardMediaSx = { borderRadius: "8px" };
  
  export const cardContent = { paddingTop: 2, paddingBottom: 8 };
  
  export const typographySx = {
    color: theme.palette.grey[50],
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "600",
    textAlign: "left",
  };