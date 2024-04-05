import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";

type propTypes = {
  products: any;
  hasNext: any;
  next: any;
  setSelectedItems: any;
  selectedItems: any;
};
export default function ProductsTable({
  products,
  hasNext,
  next,
  setSelectedItems,
  selectedItems,
}: propTypes) {
  const [productsList, setProductsList] = useState<any>(products);
  const [selectedProducts, setSelectedProducts] = useState<any>([]);

  useEffect(() => {
    if (selectedItems?.length > 0) {
      const selectedProducts = [...productsList]?.map((product: any) => {
        const isProductSelected = selectedItems?.some(
          (productId: string) => productId == product?.productId
        );
        if (isProductSelected) return { ...product, isSelected: true };
        else return product;
      });
      setProductsList(selectedProducts);
    }
  }, [selectedItems]);

  const selectAllProducts = (event: any) => {
    const { checked } = event?.target;

    if (productsList?.length === 0) {
      return;
    }
    const selected_products = productsList?.map((product: any) => {
      return {
        ...product,
        isSelected: checked ? true : false,
      };
    });

    if (checked) {
      const selectItems = selected_products?.map(
        (item: any) => item?.productId
      );
      setSelectedItems(selectItems);
    } else {
      setSelectedItems([]);
    }
    setProductsList(selected_products);
  };

  const selectProduct = (event: any, productId: any) => {
    const { checked } = event?.target;
    if (productsList?.length === 0) {
      return;
    }

    if (checked) {
      const temp = [...productsList]?.map((product: any) => {
        if (product?.productId == productId) {
          return {
            ...product,
            isSelected: true,
          };
        } else {
          return product;
        }
      });

      setProductsList(temp);
      setSelectedItems([...selectedItems, productId]);
      setSelectedProducts([
        ...selectedProducts,
        temp?.find((product: any) => product?.productId == productId),
      ]);
    } else {
      const temp = [...productsList]?.map((product: any) => {
        if (product?.productId == productId) {
          return {
            ...product,
            isSelected: false,
          };
        } else {
          return product;
        }
      });

      setSelectedItems(
        selectedItems?.filter((item: any) => item !== productId)
      );
      setProductsList(temp);
      setSelectedProducts(
        selectedProducts?.filter(
          (item: any, i: number) => item?.productId != productId
        )
      );
    }
  };

  const selectedProductsCount = productsList?.filter(
    (product: any) => product?.isSelected
  )?.length;

  const productsCount =
    selectedProductsCount === 0
      ? `Showing ${productsList?.length} Products`
      : `${selectedProductsCount} selected`;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
      <div className="p-4 py-6 bg-white w-full border-b ">
        <div className="flex items-center">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={selectAllProducts}
          />
          <label
            htmlFor="checkbox-table-search-1"
            className="ml-3 text-xs w-max"
          >
            {productsCount}
          </label>
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <tbody>
          {productsList?.map((product: any) => {
            return (
              <tr
                key={product?.productId}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={product?.isSelected}
                      onChange={(event) =>
                        selectProduct(event, product?.productId)
                      }
                    />
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    src={product?.image}
                    alt="Product"
                    className="w-5 md:w-32 max-w-full max-h-full"
                  />
                </th>
                <td className="px-6 py-4">
                  <div>
                    <span>{product?.title}</span>
                    <div className="flex justify-between items-center mt-2">
                      <span>{product?.price}</span>
                      <span className="flex items-center">
                        {product?.rating}{" "}
                        <FaStar size={18} className="text-secondary ml-2" />
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
          <tr></tr>
        </tbody>
      </table>
      {!!products.length && hasNext && (
        <div className="mt-4 flex justify-center items-center">
          <button
            type="button"
            className="text-black px-7 py-2 rounded-lg w-full mb-10"
            onClick={next}
          >
            Load more....
          </button>
        </div>
      )}
    </div>
  );
}
