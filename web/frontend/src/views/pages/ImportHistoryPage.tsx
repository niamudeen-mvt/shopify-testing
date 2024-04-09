import Label from "../../components/Label";
import { useAuth } from "../../context/authContext";
import {
  useRetryImportMutation,
  useStopImportMutation,
} from "../../hooks/requests";
import {
  importStatus,
  useHistoryQuery,
} from "../../hooks/requests/useHistoryQuery";

const ImportHistoryPage = () => {
  const { authUser } = useAuth();
  const { historyList, historyLoading, updateHistory } = useHistoryQuery(
    authUser?._id
  );
  const { declineImport }: { declineImport: any } = useStopImportMutation();
  const { retryImport }: { retryImport: any } = useRetryImportMutation();

  const declineProductImport = async (id: any) => {
    await declineImport({
      taskId: id,
    });
    updateHistory();
  };

  const retryProductImport = async (id: any) => {
    await retryImport({
      taskId: id,
    });
    updateHistory();
  };

  return (
    <div className="sm:min-w-[750px]">
      <button
        type="button"
        className="bg-secondary text-white w-max px-7 py-2 rounded-lg mb-10"
        onClick={() => updateHistory()}
      >
        {historyLoading ? "Loading..." : "Update"}
      </button>
      {historyList?.length > 0
        ? historyList?.reverse()?.map((item: any) => {
            const isFailedImport = item.status === importStatus.FAILED;
            const isActiveImport = [
              importStatus.IN_PROCESS,
              importStatus.QUEUE,
            ].includes(item.status);
            return (
              <div
                key={item?.id}
                className="w-[80%] p-6 shadow rounded-lg dark:bg-gray-800 dark:border-gray-700 mb-4 grid gap-1 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <h5 className="font-medium tracking-tight text-gray-900 dark:text-white">
                    {item.id}
                  </h5>

                  {isActiveImport && (
                    <button
                      type="button"
                      className="text-blue-500 w-max py-2 rounded-lg"
                      onClick={() => declineProductImport(item?.taskId)}
                    >
                      Decline
                    </button>
                  )}

                  {isFailedImport && (
                    <button
                      type="button"
                      className="text-red-500 w-max py-2 rounded-lg"
                      onClick={() => retryProductImport(item?.taskId)}
                    >
                      Retry
                    </button>
                  )}
                </div>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Status: <Label type={item.status}>{item.status}</Label>
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Created At: {item.createdAt}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Imported :{"  "}
                  <Label type="imported">
                    {" "}
                    {item.passed}/{item.total}
                  </Label>
                </p>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default ImportHistoryPage;
