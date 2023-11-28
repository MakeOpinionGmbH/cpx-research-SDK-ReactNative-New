import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 999
  },
  containerWebViewActive: {
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  innerContainer: {
    flex: 1,
  },
  notification: {
    alignSelf: "center",
    backgroundColor: "yellow",
    bottom: 0,
    height: 100,
    position: "absolute",
    width: 300
  },
  sidebar: {
    alignSelf: "flex-end",
    backgroundColor: "yellow",
    height: 300,
    position: "absolute",
    width: 100,
  }
});

export default styles;
