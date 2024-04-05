// @ts-nocheck
import { useInfiniteQuery } from "react-query";
import { BASE_URL } from "../../config/index";

export const useProductsQuery = (
  keyword: string,
  rating: boolean,
  currency: string,
  shop: string | undefined
) => {
  const params = new URLSearchParams({
    keyword,
    rating,
    currency,
    shop,
  });

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetching: fetchingProducts,
    remove,
  } = useInfiniteQuery({
    enabled: false,
    queryKey: ["product", keyword, rating, currency],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `${BASE_URL}/scrapfly/request-products?${params}&page=${pageParam}`
      );
      return response.json();
    },
    getNextPageParam: (lastPage) => {
      if (
        lastPage.data.page === lastPage.data.pageLimit ||
        !lastPage.data.products.length
      ) {
        return undefined;
      }
      return lastPage.data.page + 1;
    },
    select: (data) => {
      const allData = data?.pages.flatMap(({ data }) => data.products) || [];
      const uniqueDataMap = allData.reduce((map, item) => {
        if (!map[item?.productId]) {
          map[item?.productId] = item;
        }
        return map;
      }, {});
      return Object.values(uniqueDataMap);
    },
  });
  return {
    products: data || [],
    fetchingProducts,
    next: fetchNextPage,
    hasNext: hasNextPage || false,
    remove,
  };
};
