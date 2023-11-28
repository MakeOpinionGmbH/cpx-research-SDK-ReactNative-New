import React, { FunctionComponent, useContext, useState } from "react";
import { SafeAreaView, View } from "react-native";

import AppStoreContext, { IAppContext } from "../../context/context";
import { CornerWidget } from "../cornerWidget/CornerWidget";
import { NotificationWidget } from "../notificationWidget/NotificationWidget";
import { SidebarWidget } from "../sidebarWidget/SidebarWidget";
import { WebviewWrapper } from "../webviewWrapper/WebviewWrapper";
import styles from "./Container.style";

export const Container: FunctionComponent = () =>
{
  const { appContext, appDispatch } = useContext<IAppContext>(AppStoreContext);

  const [containerHeight, setContainerHeight] = useState<number | undefined>();
  const [containerWidth, setContainerWidth] = useState<number | undefined>();

  if(appContext.cpxState === "hidden")
  {
    return null;
  }

  const onWidgetPress = (isSingleSurvey?: boolean): void =>
  {
    console.log("open webview");

    appDispatch({
      actionType: "setCpxState",
      payload: {
        state: isSingleSurvey ? "webViewSingleSurvey" : "webView",
      }
    });
  };

  const isWebViewActive = appContext.cpxState === "webView" || appContext.cpxState === "webViewSingleSurvey";

  return (
    <SafeAreaView
      pointerEvents="box-none"
      style={[styles.container, isWebViewActive && styles.containerWebViewActive]}>
      <View
        pointerEvents="box-none"
        style={styles.innerContainer}
        onLayout={event =>
        {
          setContainerHeight(event.nativeEvent.layout.height);
          setContainerWidth(event.nativeEvent.layout.width);
        }}>
        {appContext.cpxState === "widgets" && (
          <>
            <CornerWidget onPress={() => onWidgetPress(appContext.config.cornerWidget?.isSingleSurvey)}/>
            <SidebarWidget
              onPress={() => onWidgetPress(appContext.config.sidebarWidget?.isSingleSurvey)}
              containerHeight={containerHeight}
              containerWidth={containerWidth}
            />
            {!appContext.isNotificationWidgetHidden && (
              <NotificationWidget
                onPress={() => onWidgetPress(appContext.config.notificationWidget?.isSingleSurvey)}
                containerHeight={containerHeight}
                containerWidth={containerWidth}
              />
            )}
          </>
        )}
        {isWebViewActive && <WebviewWrapper/>}
      </View>
    </SafeAreaView>
  );
};
