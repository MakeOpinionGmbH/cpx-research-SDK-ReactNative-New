import React, { FunctionComponent } from "react";
import {
  Image, ScrollView, Text, TouchableOpacity, View
} from "react-native";

import { ITexts } from "../context/context";
import styles from "./CpxSurveyCards.style";

const clockIcon = require("../../assets/clock.png");
const starIcon = require("../../assets/star.png");

interface IConfig
{
  accentColor?: string;
  cardBackgroundColor?: string;
  inactiveStarColor?: string;
  starColor?: string;
  textColor?: string;
}

interface IProps
{
  config?: IConfig;
  openWebView: ((surveyId?: string) => void) | undefined;
  surveys: any[];
  texts: ITexts;
}

export const CpxSurveyCards: FunctionComponent<IProps> = ({
  config,
  openWebView,
  surveys,
  texts,
}) =>
{
  const relevantSurveys = surveys.slice(0, 10);

  if(!surveys || surveys.length === 0 || !texts)
  {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal style={styles.cardsWrapper}>
        {relevantSurveys.map((survey, index) =>
        {
          const { payout, payout_original } = survey;
          const stars = survey.statistics_rating_avg || 0;
          const disabledStars = 5 - stars;

          const accentColor = config?.accentColor || "#40e2d3";
          const cardBackgroundColor = config?.cardBackgroundColor || "white";
          const textColor = config?.textColor || "black";
          const starColor = config?.starColor || "#ffc400";
          const inActiveStarColor = config?.inactiveStarColor || "#dfdfdfff";

          return (
            <TouchableOpacity
              onPress={() => openWebView?.(survey.id)}
              activeOpacity={.5}
              style={[
                styles.card,
                { backgroundColor: cardBackgroundColor },
                index === 0 ? { marginLeft: 12 } : { },
                index === relevantSurveys.length - 1 ? { marginRight: 12 } : { }
              ]}
              key={survey.id}>
              <View style={styles.payoutWrapper}>
                {payout_original && (
                  <Text style={[styles.payoutOriginal, { color: "black" }]}>
                    {payout_original}
                  </Text>
                )}
                <Text style={[styles.payout, { color: payout_original ? "red" : accentColor }]}>
                  {payout}
                </Text>
              </View>
              <Text style={[styles.currency, { color: accentColor }]}>{survey.payout === 1 ? texts.currencySingular : texts.currencyPlural}</Text>
              <View style={styles.timeNeededWrapper}>
                <Image style={[styles.clockIcon, { tintColor: accentColor }]} source={clockIcon}/>
                <Text style={[styles.timeNeededText, { color: textColor }]}>
                  {survey.loi} {texts.shortcutMin}
                </Text>
              </View>
              <View style={styles.starsWrapper}>
                {[...Array(stars)].map((_, index2) => (
                  <Image
                    key={index2}
                    style={[styles.star, { tintColor: starColor }]}
                    source={starIcon}
                  />
                ))}
                {[...Array(disabledStars)].map((_, index2) => (
                  <Image
                    key={"2-" + index2}
                    style={[styles.star, { tintColor: inActiveStarColor }]}
                    source={starIcon}
                  />
                ))}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
