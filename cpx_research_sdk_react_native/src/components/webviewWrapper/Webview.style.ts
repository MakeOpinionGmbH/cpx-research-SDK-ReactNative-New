import { StyleSheet } from "react-native";

export const progressBarHeight = 4;

const styles = StyleSheet.create({
  circularProgressIndicator: {
    alignSelf: "center",
    position: "absolute",
    top: "48%",
  },
  container: {

    height: "100%",
    left: 0,
    position: "absolute",
    top: 8,
    width: "100%"
  },
  iconsWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  linearProgressBarWrapper: {
    alignItems: "center",
    backgroundColor: "black",
    flexDirection: "column",
    height: progressBarHeight,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 1
  }
});

export default styles;
