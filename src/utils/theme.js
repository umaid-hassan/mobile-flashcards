import { DefaultTheme, Colors } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.teal800,
    secondary: Colors.teal500,
    error: Colors.red500
  }
};