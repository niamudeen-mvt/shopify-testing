import { useMutation } from "react-query";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { sendNotification } from "../../utils/notifications";

export const useProductsImportMutation = () => {
  const navigate = useNavigate();

  const { mutate: importProducts, isLoading: importLoading } = useMutation({
    mutationKey: ["import products"],
    mutationFn: async (payload) => {
      const response = await api.post("/scrapfly/import-products", payload);
      return response;
    },
    onSuccess: (response) => {
      if (response?.status === 200) {
        navigate("/import-history");
      }
    },
    onError: ({ response }) => {
      sendNotification("warning", response?.data?.data);
    },
  });
  return { importProducts, importLoading };
};
