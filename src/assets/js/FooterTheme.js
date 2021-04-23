import { createMuiTheme } from "@material-ui/core/styles";

const footerTheme = createMuiTheme({
  palette: {
    background: {
      default: "secondary",
    },
    primary: {
      main: "#e8eaf6",
      light: "#118ab2",
      dark: "#3949ab",
    },
  },
});

export default footerTheme;
