import api from "../../utils/axios";
import { useMutation, useQueryClient } from "react-query";

export const useStopImportMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: declineImport, isLoading: declineLoading } = useMutation({
    mutationKey: ["decline import"],
    mutationFn: async (payload) => {
      const response = await api.post("/import-history/decline", payload);
      return response;
    },
    onSuccess: (response: any) => {
      if (response.status === "success") {
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

  return { declineImport, declineLoading };
};
