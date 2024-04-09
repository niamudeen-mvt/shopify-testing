import { useMutation } from "react-query";
import { fetchStoreConfiguration } from "../../services/api/auth";

export const useStoreCurrencyQuery = () => {
  const {
    mutate,
    data,
    isLoading: currencyLoading,
  } = useMutation({
    mutationKey: ["store currency"],
    mutationFn: async (data) => {
      const resp = await fetchStoreConfiguration(data);
      return resp;
    },
    onSuccess: (response) => {
      if (response?.code === "SUCCESS" && response?.currency) {
        return response?.currency;
      }
    },
  });

  return { mutate, supportedCurrency: data?.data?.currency, currencyLoading };
};
