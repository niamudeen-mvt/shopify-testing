import { useMutation } from "react-query";
import api from "../../utils/axios";
import { sendNotification } from "../../utils/notifications";

export const useRetryImportMutation = () => {
  const { mutate: retryImport, isLoading: retryLoading } = useMutation({
    mutationKey: ["retry import"],
    mutationFn: async (payload) => {
      const response = await api.post("/import-history/retry-import", payload);
      return response;
    },
    onSuccess: (response: any) => {
      if (response?.status === 200) {
        sendNotification(
          "success",
          "Import has been successfully added to the queue, click on the update button"
        );
      }
    },
  });

  return { retryImport, retryLoading };
};
