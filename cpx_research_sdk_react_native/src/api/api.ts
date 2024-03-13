import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

import { ITexts } from "../context/context";
import { endpoints, urls } from "../utils/globals";
import { IRequestParams, buildQueryString } from "../utils/helpers";

export interface ISurveysTransactionsTexts {
  surveys: any[];
  texts: ITexts;
  transactions: any[];
}

export const fetchSurveysAndTransactionsApi = async (
  requestParams: IRequestParams,
  showLogs: boolean
): Promise<ISurveysTransactionsTexts> => {
  {
    showLogs && console.log("[fetchSurveysAndTransactions]");
  }

  let hasAnErrorOccurred = false;
  let response: AxiosResponse | undefined;

  try {
    const queryString = buildQueryString(requestParams);
    response = await axios.get(urls.apiUrl + endpoints.surveysEndpoint + queryString);
  } catch (e) {
    {
      showLogs && console.log("an error occurred while fetching surveys and transactions: ", e);
    }
    hasAnErrorOccurred = true;
  }

  if (!hasAnErrorOccurred && response == null) {
    {
      showLogs && console.log("an error occurred while fetching surveys and transactions: empty response");
    }
    hasAnErrorOccurred = true;
  } else if (!hasAnErrorOccurred && response?.data?.error_code) {
    {
      showLogs && console.log("an error occurred while fetching surveys and transactions: ", response.data?.error_message);
    }
    hasAnErrorOccurred = true;
  }

  if (hasAnErrorOccurred) {
    return Promise.reject();
  }

  if (!response) {
    {
      showLogs && console.log("no response from the api");
    }
    return Promise.reject();
  }

  if (!response?.data) {
    {
      showLogs && console.log("no data returned from the api");
    }
    return Promise.reject();
  }

  if (!response?.data.surveys) {
    {
      showLogs && console.log("no surveys returned from the api");
    }
    return Promise.reject();
  }

  {
    showLogs &&
      console.log(
        `fetched ${response?.data?.count_available_surveys} surveys and ${response?.data?.transactions?.length} transactions successfully`
      );
  }

  return {
    surveys: response.data.surveys,
    texts: {
      currencyPlural: response.data.text?.currency_name_plural,
      currencySingular: response.data.text?.currency_name_singular,
      shortcutMin: response.data.text?.shortcurt_min,
    },
    transactions: response.data.transactions,
  };
};

export const markTransactionAsPaidApi = async (
  transactionId: string,
  messageId: string,
  requestParams: IRequestParams,
  showLogs: boolean
): Promise<void> => {
  {
    showLogs && console.log("[markTransactionAsPaid]");
  }

  const params = {
    ...requestParams,
    messageId,
    transactionId,
    transaction_set_paid: true,
  };

  const requestConfig: AxiosRequestConfig = {
    params,
    url: urls.apiUrl + endpoints.surveysEndpoint,
  };

  {
    showLogs && console.log(`Mark transaction ${transactionId} as paid with url '${axios.getUri(requestConfig)}'`);
  }

  let response: AxiosResponse | undefined;
  let hasAnErrorOccurred = false;

  try {
    const queryString = buildQueryString(requestParams);
    response = await axios.get(urls.apiUrl + endpoints.surveysEndpoint + queryString);
  } catch (e) {
    {
      showLogs && console.log("an error occurred while marking transaction as paid: ", e);
    }
    hasAnErrorOccurred = true;
  }

  if (response?.data?.error_code) {
    {
      showLogs && console.log("an error occurred while marking transaction as paid: ", response.data.error_message);
    }
    hasAnErrorOccurred = true;
  }

  if (hasAnErrorOccurred) {
    return;
  }

  {
    showLogs && console.log("marked transaction as paid successfully");
  }
};
