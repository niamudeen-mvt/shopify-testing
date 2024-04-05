import { useMutation, useQueryClient } from "react-query";
import api from "../../utils/axios";

export const useRetryImportMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: retryImport, isLoading: retryLoading } = useMutation({
    mutationKey: ["retry import"],
    mutationFn: async (payload) => {
      const response = await api.post("/import-history/retry-import", payload);
      return response;
    },
    onSuccess: (response: any) => {
      if (response?.status === "success") {
        queryClient.setQueryData(
          "/import-history/request-imports",
          (oldHistoryList: any) => {
            const newHistoryList = oldHistoryList.data?.map((history: any) => {
              if (history._id === response.data._id) {
                return response.data;
              }

              return history;
            });

            return {
              ...oldHistoryList,
              data: newHistoryList,
            };
          }
        );
      }
    },
  });

  return { retryImport, retryLoading };
};
