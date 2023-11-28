import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

import { ITexts } from "../context/context";
import { endpoints, urls } from "../utils/globals";
import { IRequestParams } from "../utils/helpers";

export interface ISurveysTransactionsTexts
{
  surveys: any[];
  texts: ITexts;
  transactions: any[];
}

export const fetchSurveysAndTransactionsApi = async (requestParams: IRequestParams): Promise<ISurveysTransactionsTexts> =>
{
  console.log("[fetchSurveysAndTransactions]");

  let hasAnErrorOccurred = false;
  let response: AxiosResponse | undefined;

  try
  {
    response = await axios.get(urls.apiUrl + endpoints.surveysEndpoint, { params: requestParams });
  }
  catch (e)
  {
    console.log("an error occurred while fetching surveys and transactions: ", e);
    hasAnErrorOccurred = true;
  }

  if(!hasAnErrorOccurred && response == null)
  {
    console.log("an error occurred while fetching surveys and transactions: empty response");
    hasAnErrorOccurred = true;
  }
  else if(!hasAnErrorOccurred && response?.data?.error_code)
  {
    console.log("an error occurred while fetching surveys and transactions: ", response.data?.error_message);
    hasAnErrorOccurred = true;
  }

  if(hasAnErrorOccurred)
  {
    return Promise.reject();
  }

  if(!response)
  {
    console.log("no response from the api");
    return Promise.reject();
  }

  if(!response?.data)
  {
    console.log("no data returned from the api");
    return Promise.reject();
  }

  if(!response?.data.surveys)
  {
    console.log("no surveys returned from the api");
    return Promise.reject();
  }

  console.log(`fetched ${response?.data?.count_available_surveys} surveys and ${response?.data?.transactions?.length} transactions successfully`);

  return {
    surveys: response.data.surveys,
    texts: {
      currencyPlural: response.data.text?.currency_name_plural,
      currencySingular: response.data.text?.currency_name_singular,
      shortcutMin: response.data.text?.shortcurt_min,
    },
    transactions: response.data.transactions
  };
};

export const markTransactionAsPaidApi = async (transactionId: string, messageId: string, requestParams: IRequestParams): Promise<void> =>
{
  console.log("[markTransactionAsPaid]");

  const params = {
    ...requestParams,
    messageId,
    transactionId,
    transaction_set_paid: true
  };

  const requestConfig: AxiosRequestConfig = {
    params,
    url: urls.apiUrl + endpoints.surveysEndpoint
  };

  console.log(`Mark transaction ${transactionId} as paid with url '${axios.getUri(requestConfig)}'`);

  let response: AxiosResponse | undefined;
  let hasAnErrorOccurred = false;

  try
  {
    response = await axios.get(urls.apiUrl + endpoints.surveysEndpoint, { params });
  }
  catch (e)
  {
    console.log("an error occurred while marking transaction as paid: ", e);
    hasAnErrorOccurred = true;
  }

  if(response?.data?.error_code)
  {
    console.log("an error occurred while marking transaction as paid: ", response.data.error_message);
    hasAnErrorOccurred = true;
  }

  if(hasAnErrorOccurred)
  {
    return;
  }

  console.log("marked transaction as paid successfully");
};
