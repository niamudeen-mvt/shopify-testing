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
        queryClient.invalidateQueries("import history");
      }
    },
  });

  return { retryImport, retryLoading };
};
