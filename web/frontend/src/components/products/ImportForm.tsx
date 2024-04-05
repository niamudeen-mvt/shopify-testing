import { useCallback, useMemo, useState } from "react";
import { useAuth } from "../../context/authContext";
import SelectItem from "../shared/SelectItem";
import SpecialInput from "../shared/input/SpecialInput";
import { IoCloseOutline } from "react-icons/io5";
import { useProductsImportMutation } from "../../hooks/requests";

const languageList = [
  { label: "English", value: "English" },
  { label: "German", value: "German" },
  { label: "Dutch", value: "Dutch" },
  { label: "Danish", value: "Danish" },
  { label: "Swedish", value: "Swedish" },
  { label: "French", value: "French" },
  { label: "Romanian", value: "Romanian" },
];

const productStatuses = [
  { label: "Active", value: "ACTIVE" },
  { label: "Draft", value: "DRAFT" },
];

type propTypes = {
  minPrice?: any;
  selectedItems: string[];
  productType: string;
  productTag: string;
  supportedCurrency: string | undefined;
  setProductType: any;
  setProductTag: any;
  setMinPrice: any;
};

export default function ImportForm({
  minPrice,
  selectedItems,
  productType,
  productTag,
  supportedCurrency,
  setProductType,
  setProductTag,
  setMinPrice,
}: propTypes) {
  const { authUser } = useAuth();

  const [maxTitleLength, setMaxTitleLength] = useState(30);
  const [multiplier, setMultiplier] = useState(1);
  const [compareAtPriceMultiplier, setCompareAtPriceMultiplier] = useState(1);
  const [productStatus, setProductStatus] = useState(productStatuses[0].value);
  const [importLanguage, setImportLanguage] = useState(languageList[0].value);

  const minTitleLength = 15;
  const minPriceMultiplier = 1;

  const { importProducts } = useProductsImportMutation();

  const maxTitleFieldError = useMemo(
    () =>
      maxTitleLength < minTitleLength
        ? `The minimum title length must be ${minTitleLength} characters`
        : false,
    [maxTitleLength, minTitleLength]
  );

  const priceMultiplierError = useMemo(
    () =>
      multiplier < minPriceMultiplier
        ? `The minimum price multiplier must be ${minPriceMultiplier}`
        : false,
    [multiplier, minPriceMultiplier]
  );

  const compareAtPriceMultiplierError = useMemo(
    () =>
      compareAtPriceMultiplier < minPriceMultiplier
        ? `The minimum compare at price multiplier must be ${minPriceMultiplier}`
        : false,
    [compareAtPriceMultiplier, minPriceMultiplier]
  );

  const handleSpecialInput = (event: any, key: any) => {
    const { value } = event?.target;
    switch (key) {
      case "priceMultiplier":
        setMultiplier(value);
        break;
      case "compareAtPriceMultiplier":
        setCompareAtPriceMultiplier(value);
        break;
      case "minPrice":
        setMinPrice(value);
        break;
      case "productType":
        setProductType(value);
        break;
      case "maxTitleLength":
        setMaxTitleLength(value);
        break;
      case "productTag":
        if (productTag) {
          let tempstring = "";
          tempstring += value;
          setProductTag(tempstring);
        } else {
          setProductTag(value);
        }
        break;
      default:
        break;
    }
  };

  const handleSelectItems = (event: any, id: string) => {
    const { value } = event.target;
    if (id === "status" && value) {
      setProductStatus(value);
    } else if (id === "language" && value) {
      setImportLanguage(value);
    }
  };

  const handleSubmit = useCallback(() => {
    if (
      maxTitleFieldError ||
      priceMultiplierError ||
      selectedItems?.length === 0
    ) {
      return;
    }
    const payload: any = {
      products: selectedItems,
      priceMultiplier: multiplier,
      compareAtPriceMultiplier,
      language: importLanguage,
      currency: supportedCurrency,
      status: productStatus,
      type: productType,
      tag: productTag,
      maxTitleLength,
      minPrice,
      shopify_session: {
        id: authUser?._id,
        shop: `${authUser?.shop}.myshopify.com`,
        access_token: authUser?.access_token,
        isOnline: false,
        scope: "write_products",
      },
    };

    return importProducts(payload);
  }, [
    selectedItems?.length,
    multiplier,
    compareAtPriceMultiplier,
    minPrice,
    importLanguage,
    productStatus,
    productType,
    supportedCurrency,
    maxTitleFieldError,
    maxTitleLength,
    productTag,
  ]);

  return (
    <section className="mb-10 relative bg-white  shadow-lg sm:rounded-lg">
      <form className="min-h-[100px] p-10 rounded-md -z-0 text-gray-600 font-normal">
        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <SelectItem
              id={"status"}
              value={productStatus}
              label="Product Status"
              options={productStatuses}
              handleChange={handleSelectItems}
            />
          </div>
          <div className="w-1/2">
            <SelectItem
              id={"language"}
              value={importLanguage}
              label="Import language"
              options={languageList}
              handleChange={handleSelectItems}
            />
          </div>
        </div>
        <div className="form-control mb-6 flex flex-col">
          <SpecialInput
            type="number"
            value={multiplier}
            id="priceMultiplier"
            handleChange={handleSpecialInput}
            errors={priceMultiplierError}
            prefix="Price multiplier :"
            suffix={<IoCloseOutline size={22} />}
          />
        </div>
        <div className="form-control mb-6 flex flex-col">
          <SpecialInput
            type="number"
            value={compareAtPriceMultiplier}
            id={"compareAtPriceMultiplier"}
            handleChange={handleSpecialInput}
            errors={compareAtPriceMultiplierError}
            prefix="Compare at price at multiplier :"
          />
        </div>
        <div className="form-control mb-6 flex flex-col">
          <SpecialInput
            type="number"
            value={minPrice}
            id={"minPrice"}
            handleChange={handleSpecialInput}
            prefix="Min price :"
            suffix={supportedCurrency}
          />
        </div>
        <div className="form-control mb-6 flex flex-col">
          <SpecialInput
            type="text"
            value={productType}
            id={"productType"}
            handleChange={handleSpecialInput}
            prefix="Product type :"
          />
        </div>
        <div className="form-control mb-6 flex flex-col">
          <SpecialInput
            type="text"
            value={productTag}
            id={"productTag"}
            handleChange={handleSpecialInput}
            note={"You can add several separated by commas"}
            prefix="Product tags :"
          />
        </div>
        <div className="form-control mb-6 flex flex-col">
          <SpecialInput
            type="number"
            value={maxTitleLength}
            id={"maxTitleLength"}
            handleChange={handleSpecialInput}
            errors={maxTitleFieldError}
            prefix="Max title length :"
            suffix="Chars"
          />
        </div>
        <button
          type="button"
          className="text-white px-7 rounded-lg border w-full bg-secondary h-10"
          onClick={handleSubmit}
        >
          Import {selectedItems.length}{" "}
          {selectedItems.length > 1 ? "Items" : "Item"} ({multiplier}
          {"X "}
          price |
          {" " +
            languageList?.find(
              (option: any) => option?.value === importLanguage
            )?.label}
          )
        </button>
      </form>
    </section>
  );
}
