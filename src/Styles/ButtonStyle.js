import { StyleSheet } from "aphrodite/no-important";

const buttonStyle = StyleSheet.create({
  button: {
    "font-size": "14px",
    "line-height": "30px",
    cursor: "pointer !important",
    "border-radius": "4px",
    color: "#767676",
    "background-color": "#fff;",
    border: "1px solid #d1d1d1",
    height: "32px",
    padding: "0 11px",
    "font-size": "14px",
    "line-height": "30px",
    '@media (max-width: 768px)': {
      "background-color": "linear-gradient(180deg, #0000 50%, #0b151e05),#fff;",
    },
  }
});

export default buttonStyle;

