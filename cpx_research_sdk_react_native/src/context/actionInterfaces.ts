import { IAppStore, TCpxState } from "./context";

export interface ISetCpxState
{
  actionType: "setCpxState";
  payload: {
    state: TCpxState;
  };
}

export interface ISetNotificationWidgetHiding
{
  actionType: "setNotificationWidgetHiding";
  payload: {
    isHidden: boolean;
  };
}

export interface IGetWidgetImages
{
  actionType: "getWidgetImages";
}

export interface IUpdateAppContext
{
  actionType: "updateAppContext";
  payload: Partial<IAppStore>;
}
