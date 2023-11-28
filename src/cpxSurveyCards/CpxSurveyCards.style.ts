import { StyleSheet } from "react-native";

const clockIconSize = 16;
const starIconSize = 19;
const cardHeight = 118;
const cardsWrapperPaddingBottom = 20;
const cardsWrapperPaddingTop = 10;

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 6,
    flexDirection: "column",
    height: cardHeight,
    justifyContent: "center",
    marginBottom: cardsWrapperPaddingBottom,
    marginHorizontal: 6,
    marginTop: cardsWrapperPaddingTop,
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 2
    },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    width: 120,
  },
  cardsWrapper: {
    paddingBottom: cardsWrapperPaddingBottom,
    paddingTop: cardsWrapperPaddingTop,
    width: "100%",
  },
  clockIcon: {
    height: clockIconSize,
    marginRight: 5,
    resizeMode: "contain",
    width: clockIconSize,
  },
  currency: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: -2,
  },
  payout: {
    fontSize: 20,
    fontWeight: "700"
  },
  payoutOriginal: {
    fontSize: 14,
    fontWeight: "400",
    marginRight: 5,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },
  payoutWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  star: {
    height: starIconSize,
    marginHorizontal: -1,
    resizeMode: "contain",
    width: starIconSize
  },
  starsWrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    overflow: "scroll"
  },
  timeNeededText: {
    fontSize: 12,
    fontWeight: "500"
  },
  timeNeededWrapper: {
    alignItems: "center",
    flexDirection: "row"
  },
  wrapper: {
    alignItems: "center",
    flexDirection: "row",
    height: cardHeight + cardsWrapperPaddingTop + cardsWrapperPaddingBottom,
    width: "100%",
  }
});

export default styles;
