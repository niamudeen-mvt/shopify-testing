import { FaStar } from "react-icons/fa6";
import { useAuth } from "../../context/authContext";
import { useEffect, useState, useCallback, KeyboardEvent } from "react";
import ImportForm from "../products/ImportForm";
import ProductsTable from "../products/ProductsTable";
import { useProductsQuery, useStoreCurrencyQuery } from "../../hooks/requests";

const currencyList = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "DKK", value: "DKK" },
  { label: "SEK", value: "SEK" },
  { label: "GBP", value: "GBP" },
  { label: "RON", value: "RON" },
  { label: "CAD", value: "CAD" },
  { label: "AUD", value: "AUD" },
];

const isValidCurrency = (validatedCurrency: string) =>
  currencyList.some((curr) => curr.value === validatedCurrency);

const availableCurrencies = currencyList.map((curr) => curr.label).join(", ");

export default function SearchProducts() {
  const { authUser } = useAuth();
  const [keyword, setKeyword] = useState("");
  const [ratingFilter, setRatingFilter] = useState(true);
  const [currencyError, setCurrencyError] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [productType, setProductType] = useState("");
  const [productTag, setProductTag] = useState("");

  const {
    mutate,
    supportedCurrency,
    currencyLoading,
  }: { mutate: any; supportedCurrency: string; currencyLoading: boolean } =
    useStoreCurrencyQuery();

  const {
    products,
    fetchingProducts,
    hasNext,
    next,
    remove,
  }: {
    products: any;
    fetchingProducts: any;
    hasNext: any;
    next: any;
    remove: any;
  } = useProductsQuery(
    keyword,
    ratingFilter,
    supportedCurrency,
    authUser?.shop
  );

  useEffect(() => {
    if (authUser?.shop && authUser?.access_token) {
      mutate({
        shop: authUser?.shop,
        access_token: authUser?.access_token,
      });
    }
  }, []);

  useEffect(() => {
    if (supportedCurrency) {
      if (!isValidCurrency(supportedCurrency)) {
        setCurrencyError(
          `Your store currency (${supportedCurrency}) is not supported by the application. Available currencies: ${availableCurrencies}`
        );
      } else {
        setCurrencyError("");
      }
    }
  }, [supportedCurrency]);

  const handleOnSearch = useCallback((val: any) => {
    setKeyword(val);
    setProductType(val);
  }, []);

  const forceRefetch = useCallback(async () => {
    if (keyword) {
      remove();
      await next({ pageParam: 1 });
    }
  }, [remove, next, keyword]);

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const enterKeyPressed = event.keyCode === 13;
    if (enterKeyPressed && !fetchingProducts && supportedCurrency) {
      event.preventDefault();
      forceRefetch();
    }
  };

  const modifiedProducts: any =
    products?.filter((product: any) => product !== undefined)?.length > 0
      ? products?.map((product: any) => {
          return {
            ...product,
            isSelected: false,
          };
        })
      : [];

  return (
    <>
      <form>
        <div className="flex items-center mb-3">
          <input
            id="checked-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.checked)}
          />
          <label
            htmlFor="checked-checkbox"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center"
          >
            <FaStar size={20} className="text-secondary mx-2" /> 4 & Up
          </label>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-[60%]">
            <label className="text-sm">Search AliExpress</label>
            <input
              type="text"
              className="block w-full p-2 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={keyword}
              onChange={(e) => handleOnSearch(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
            />
          </div>
          <div className="w-[40%]">
            <label className="text-sm">Currency</label>
            <input
              type="text"
              className="block w-full p-2 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled
              placeholder={!currencyLoading ? supportedCurrency : "Loading..."}
            />
          </div>
        </div>
        {currencyError && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium mb-4">
            {currencyError}
          </p>
        )}
        <button
          type="button"
          className="bg-secondary text-white w-max px-7 py-2 rounded-lg
          "
          onClick={() => forceRefetch()}
          disabled={supportedCurrency ? false : true}
        >
          {fetchingProducts ? "Loading..." : "Search"}
        </button>
      </form>
      {modifiedProducts?.length > 0 && ratingFilter ? (
        <div className="mt-4">
          <ProductsTable
            products={modifiedProducts}
            hasNext={hasNext}
            next={next}
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
          />
        </div>
      ) : null}
      <div className="mt-4">
        {selectedItems?.length > 0 && (
          <ImportForm
            minPrice={minPrice}
            selectedItems={selectedItems}
            productTag={productTag}
            productType={productType}
            supportedCurrency={supportedCurrency}
            setProductType={setProductType}
            setProductTag={setProductTag}
            setMinPrice={setMinPrice}
          />
        )}
      </div>
    </>
  );
}
