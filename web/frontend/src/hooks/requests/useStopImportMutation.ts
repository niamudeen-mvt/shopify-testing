import api from "../../utils/axios";
import { useMutation } from "react-query";
import { sendNotification } from "../../utils/notifications";

export const useStopImportMutation = () => {
  const { mutate: declineImport, isLoading: declineLoading } = useMutation({
    mutationKey: ["decline import"],
    mutationFn: async (payload) => {
      const response = await api.post("/import-history/decline", payload);
      return response;
    },
    onSuccess: (response: any) => {
      if (response?.status === 200) {
        sendNotification(
          "success",
          "Import has been successfully stopped, click on the update button"
        );
      }
    },
  });

  return { declineImport, declineLoading };
};
