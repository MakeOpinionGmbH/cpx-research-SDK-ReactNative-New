import axios from "axios";
import React, { Component, Dispatch, ErrorInfo, ReactElement } from "react";
import { Text } from "react-native";
import { WebView as ReactNativeWebView } from "react-native-webview";

import { IAppContextActions } from "../../context/reducer";
import { endpoints, urls } from "../../utils/globals";
import { deepPropsComparison, IRequestParams } from "../../utils/helpers";

interface IProps
{
  activeTab: string;
  appDispatch: Dispatch<IAppContextActions>;
  currentUrl: string;
  onLoadEnd: () => void;
  onLoadStart: () => void;
  requestParams: IRequestParams;
}

interface IState
{
  hasError: false;
}

class WebView extends Component<IProps, IState>
{
  private constructor(props: IProps)
  {
    super(props);
    this.state = { hasError: false };
  }

  public shouldComponentUpdate(nextProps: Readonly<IProps>): boolean
  {
    return !deepPropsComparison(this.props, nextProps);
  }

  private static getDerivedStateFromError(error: any): { hasError: boolean }
  {
    console.error("[WebView getDerivedStateFromError]: ", error);

    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void
  {
    console.error("WebView did catch an error: ", error, errorInfo);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,max-len
  private onError = async (appDispatch: Dispatch<IAppContextActions>, requestParams: IRequestParams, nativeEvent: any, error?: string): Promise<void> =>
  {
    if(error) 
    {
      alert("Something went wrong: " + error);
    }
    else 
    {
      alert("Something went wrong");
    }

    try 
    {
      await axios.get(urls.baseUrl + endpoints.homeEndpoint, {
        params: {
          requestParams,
          webViewErrorEvent: nativeEvent,
        }
      });
    }
    catch (e) 
    {
      console.log("an error occurred while logging the webViewError", e);
    }

    appDispatch({
      actionType: "setCpxState",
      payload: { state: "widgets" }
    });
  };

  public render(): ReactElement
  {
    if(this.state.hasError)
    {
      return <Text>Something went wrong.</Text>;
    }

    return (
      <ReactNativeWebView
        {...this.props}
        setSupportMultipleWindows={false}
        onError={(syntheticEvent: any) =>
        {
          const { nativeEvent } = syntheticEvent;
          console.error("[WebView onError]: ", nativeEvent);
          void this.onError(this.props.appDispatch, this.props.requestParams, nativeEvent, nativeEvent.description);
        }}
        onHttpError={(syntheticEvent: any) => 
        {
          const { nativeEvent } = syntheticEvent;
          console.error("[WebView onHttpError]: WebView received error: ", nativeEvent);
          void this.onError(this.props.appDispatch, this.props.requestParams, nativeEvent, nativeEvent.statusCode + " - " + nativeEvent.description);
        }}
        source={{ uri: this.props.currentUrl }}
      />
    );
  }
}

export default WebView;
