import { StackScreenProps } from "@react-navigation/stack";
import CpxResearch, { CpxSurveyCards } from "cpx-research-sdk-react-native/src";
import { emptyTexts, ITexts } from "cpx-research-sdk-react-native/src/context/context";
import React, { FunctionComponent, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "./screens.style";

const HomeScreen: FunctionComponent<StackScreenProps<any>> = ({ navigation }) =>
{
  const markTransactionAsPaidRef = useRef<(transactionId: string, messageId: string) => Promise<void> | undefined>();
  const fetchSurveysAndTransactionsRef = useRef<() => Promise<void> | undefined>();
  const openWebViewRef = useRef<(surveyId?: string) => void | undefined>();

  const [surveys, setSurveys] = useState<any[]>([]);
  const [texts, setTexts] = useState<ITexts>(emptyTexts);

  const [isCpxLayerHidden, setIsCpxLayerHidden] = useState(false);

  return (
    <>
      <CpxResearch
        accentColor="#ff9800"
        appId="8614"
        userId="2"
        add_info="&additional_info1=123"
        onSurveysUpdate={surveys => setSurveys(surveys)}
        onTextsUpdate={texts => setTexts(texts)}
        onTransactionsUpdate={(transactions) => console.log("onSurveysUpdate Callback", transactions)}
        onWebViewWasClosed={() => { /* do something */ }}
        bindMarkTransactionAsPaid={markTransactionAsPaid => markTransactionAsPaidRef.current = markTransactionAsPaid}
        bindFetchSurveysAndTransactions={fetchSurveysAndTransactions => fetchSurveysAndTransactionsRef.current = fetchSurveysAndTransactions}
        bindOpenWebView={openWebView => openWebViewRef.current = openWebView}
        isHidden={isCpxLayerHidden}
        cornerWidget={{
          backgroundColor: "#ff9800",
          position: "topright",
          roundedCorners: 0,
          size: 100,
          text: "Click me",
          textColor: "#ffffff",
          textSize: 12,
        }}
        notificationWidget={{
          backgroundColor: "#ff9800",
          height: 60,
          isSingleSurvey: true,
          position: "bottom",
          roundedCorners: 10,
          text: "Click me",
          textColor: "#ffffff",
          textSize: 12,
          width: 300,
        }}
        sidebarWidget={{
          backgroundColor: "#ff9800",
          height: 240,
          position: "left",
          roundedCorners: 20,
          text: "Click me",
          textColor: "#ffffff",
          textSize: 12,
          width: 40,
        }}
      />
      <SafeAreaView style={styles.appWrapper}>
        <View style={styles.viewContainer}>
          <Text style={styles.text}>React Native SDK Demo App</Text>
          <CpxSurveyCards
            surveys={surveys}
            texts={texts}
            config={{
              accentColor: "#41d7e5",
              cardBackgroundColor: "white",
              inactiveStarColor: "#dfdfdfff",
              starColor: "#ffc400",
              textColor: "black"
            }}
            openWebView={openWebViewRef.current}
          />
          <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={() => fetchSurveysAndTransactionsRef.current?.()}>
            <Text style={styles.buttonText}>Fetch surveys and transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => markTransactionAsPaidRef.current?.("123", "345")}>
            <Text style={styles.buttonText}>Mark Transaction as paid</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setIsCpxLayerHidden(false)}>
            <Text style={styles.buttonText}>Show CPX Layer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setIsCpxLayerHidden(true)}>
            <Text style={styles.buttonText}>Hide CPX Layer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => openWebViewRef.current?.(/* pass optional surveyId here */)}>
            <Text style={styles.buttonText}>Open Webview</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate({ name: "Page 2", params: {} })}>
            <Text style={styles.buttonText}>Next Page</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
