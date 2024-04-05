// import { useAuthenticatedFetch } from './useAuthenticatedFetch'
import { useMemo } from "react";
import { useMutation } from "react-query";

export const useAppMutation = ({ url, fetchInit = {}, reactQueryOptions }) => {
  // const authenticatedFetch = useAuthenticatedFetch()
  const mutate = useMemo(() => {
    return async (data) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        ...fetchInit,
        body: JSON.stringify(data),
      });
      return response.json();
    };
  }, [url, JSON.stringify(fetchInit)]);

  return useMutation(mutate, reactQueryOptions);
};
