/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext, Dispatch } from "react";

import { IAppContextActions } from "./reducer";

interface IWidgetStyle
{
  backgroundColor: string;
  roundedCorners: number;
  text: string;
  textColor: string;
  textSize: number;
}

interface IWidgetConfig
{
  isSingleSurvey?: boolean;
}

export interface ICornerWidgetStyle extends IWidgetStyle
{
  position: "topleft" | "topright" | "bottomright" | "bottomleft";
  size: number;
}

export interface INotificationWidgetStyle extends IWidgetStyle
{
  height: number;
  position: "top" | "bottom";
  width: number;
}

export interface ISidebarWidgetStyle extends IWidgetStyle
{
  height: number;
  position: "left" | "right";
  width: number;
}

export interface ICpxConfig
{
  accentColor: string;
  add_info?: string;
  appId: string;
  bindFetchSurveysAndTransactions?: (fetchSurveysAndTransactions: () => Promise<void>) => void;
  bindMarkTransactionAsPaid?: (markTransactionAsPaid: (transactionId: string, messageId: string) => Promise<void>) => void;
  bindOpenWebView?: (openWebView: (surveyId?: string) => void) => void;
  cornerWidget?: ICornerWidgetStyle & IWidgetConfig;
  isHidden?: boolean;
  notificationWidget?: INotificationWidgetStyle & IWidgetConfig;
  onSurveysUpdate?: (surveys: any[]) => void;
  onTextsUpdate?: (texts: ITexts) => void;
  onTransactionsUpdate?: (transactions: any[]) => void;
  onWebViewWasClosed?: () => void;
  sidebarWidget?: ISidebarWidgetStyle & IWidgetConfig;
  userId: string;
}

export type TCpxState = "hidden" | "webView" | "webViewSingleSurvey" | "widgets";

interface IWidgetImages
{
  corner?: string;
  notification?: string;
  sidebar?: string;
}

export interface ITexts
{
  currencyPlural: string;
  currencySingular: string;
  shortcutMin: string;
}

export const emptyTexts: ITexts = {
  currencyPlural: "",
  currencySingular: "",
  shortcutMin: "",
};

export interface IAppStore
{
  config: ICpxConfig;
  cpxState: TCpxState;
  isNotificationWidgetHidden: boolean;
  singleSurveyIdForWebView?: any;
  surveys: any[];
  texts: ITexts;
  transactions: any[];
  widgetImages: IWidgetImages;
}
 
export const initialAppStore: IAppStore = {
  config: {
    accentColor: "",
    appId: "-1",
    userId: "-1",
  },
  cpxState: "hidden",
  isNotificationWidgetHidden: false,
  singleSurveyIdForWebView: undefined,
  surveys: [],
  texts: emptyTexts,
  transactions: [],
  widgetImages: {},
};

export const getInitialAppStore = (config: ICpxConfig): IAppStore => ({
  ...initialAppStore,
  config
});

export interface IAppContext
{
  appContext: IAppStore;
  appDispatch: Dispatch<IAppContextActions>;
}

const AppStoreContext = createContext<IAppContext>({
  appContext: initialAppStore,
  appDispatch: () => {},
});

export default AppStoreContext;
