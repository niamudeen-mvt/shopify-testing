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
        queryClient.invalidateQueries("import history");
      }
    },
  });

  return { declineImport, declineLoading };
};
