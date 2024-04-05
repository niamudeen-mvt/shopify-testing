import { formatDate } from "../../utils/helpers.js";
import { getUserLocale } from "../../utils/i18nUtils.js";
import { useQuery } from "react-query";
import api from "../../utils/axios";

export const importStatus = {
  QUEUE: "queue",
  IN_PROCESS: "in process",
  SUCCESS: "success",
  FAILED: "failed",
};

const productStatus = {
  SUCCESS: "success",
  FAILED: "failed",
  NEW: "new",
};
export const useHistoryQuery = (id: number) => {
  const {
    isFetching: historyLoading,
    data: historyList,
    refetch: updateHistory,
  } = useQuery({
    enabled: true,
    queryKey: ["import history"],
    queryFn: async () => {
      const { data } = await api.get(`/import-history/request-imports/${id}`);
      return data;
    },
    select: (data: any) => {
      return data?.data?.map((importItem: any) => ({
        id: importItem._id,
        taskId: importItem.taskId,
        status: importItem.status,
        total: importItem.products.length,
        passed: importItem.products.filter(
          (product: any) => product.status === productStatus.SUCCESS
        ).length,
        createdAt: formatDate(new Date(importItem.createdAt), getUserLocale()),
      }));
    },
  });

  return { historyLoading, historyList, updateHistory };
};
