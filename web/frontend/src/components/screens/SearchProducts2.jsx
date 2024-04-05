import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  InlineGrid,
  InlineStack,
  Icon,
  InlineError,
  LegacyCard,
  ResourceItem,
  ResourceList,
  Select,
  TextField,
  Thumbnail,
} from '@shopify/polaris'
import { StarFilledIcon } from '@shopify/polaris-icons'
import {
  useProductsImportMutation,
  useProductsQuery,
  useStoreCurrencyQuery,
} from '../../hooks/requests/index'

const currencyList = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'DKK', value: 'DKK' },
  { label: 'SEK', value: 'SEK' },
  { label: 'GBP', value: 'GBP' },
  { label: 'RON', value: 'RON' },
  { label: 'CAD', value: 'CAD' },
  { label: 'AUD', value: 'AUD' },
]

const languageList = [
  { label: 'English', value: 'English' },
  { label: 'German', value: 'German' },
  { label: 'Dutch', value: 'Dutch' },
  { label: 'Danish', value: 'Danish' },
  { label: 'Swedish', value: 'Swedish' },
  { label: 'French', value: 'French' },
  { label: 'Romanian', value: 'Romanian' },
]

const productStatuses = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Draft', value: 'DRAFT' },
]

const isValidCurrency = validatedCurrency =>
  currencyList.some(curr => curr.value === validatedCurrency)

const availableCurrencies = currencyList.map(curr => curr.label).join(', ')

function SearchProducts() {
  const [keyword, setKeyword] = useState('')
  const [productType, setProductType] = useState('')
  const [productTag, setProductTag] = useState('')
  const [currencyError, setCurrencyError] = useState('')
  const [ratingFilter, setRatingFilter] = useState(true)
  const [maxTitleLength, setMaxTitleLength] = useState(30)
  const [multiplier, setMultiplier] = useState(1)
  const [compareAtPriceMultiplier, setCompareAtPriceMultiplier] = useState(1)
  const [minPrice, setMinPrice] = useState(null)
  const [productStatus, setProductStatus] = useState(productStatuses[0].value)
  const [importLanguage, setImportLanguage] = useState(languageList[0].value)
  const [selectedItems, setSelectedItems] = useState([])

  const { importProducts, importLoading } = useProductsImportMutation()
  const { supportedCurrency } = useStoreCurrencyQuery()
  const { products, fetchingProducts, hasNext, next, remove } = useProductsQuery(
    keyword,
    ratingFilter,
    supportedCurrency,
  );

  const minTitleLength = 15
  const minPriceMultiplier = 1

  const maxTitleFieldError = useMemo(
    () =>
      maxTitleLength < minTitleLength
        ? `The minimum title length must be ${minTitleLength} characters`
        : false,
    [maxTitleLength, minTitleLength],
  )

  const priceMultiplierError = useMemo(
    () =>
      multiplier < minPriceMultiplier
        ? `The minimum price multiplier must be ${minPriceMultiplier}`
        : false,
    [multiplier, minPriceMultiplier],
  )

  const compareAtPriceMultiplierError = useMemo(
    () =>
      compareAtPriceMultiplier < minPriceMultiplier
        ? `The minimum compare at price multiplier must be ${minPriceMultiplier}`
        : false,
    [compareAtPriceMultiplier, minPriceMultiplier],
  )

  const handleOnSearch = useCallback(val => {
    setKeyword(val)
    setProductType(val)
  }, [])

  const handleOnImport = useCallback(() => {
    if (maxTitleFieldError || priceMultiplierError) {
      return
    }

    return importProducts({
      products: selectedItems,
      priceMultiplier: multiplier,
      compareAtPriceMultiplier,
      language: importLanguage,
      currency: supportedCurrency,
      status: productStatus,
      type: productType,
      tag: productTag,
      maxTitleLength,
      minPrice
    })
  }, [
    selectedItems.length,
    multiplier,
    compareAtPriceMultiplier,
    minPrice,
    importLanguage,
    supportedCurrency,
    productStatus,
    productType,
    maxTitleFieldError,
    maxTitleLength,
    productTag,
  ])

  const forceRefetch = useCallback(async () => {
    if (keyword) {
      remove()
      await next({ pageParam: 1 })
    }
  }, [remove, next, keyword])

  useEffect(() => {
    if (supportedCurrency) {
      if (!isValidCurrency(supportedCurrency)) {
        setCurrencyError(
          `Your store currency (${supportedCurrency}) is not supported by the application. Available currencies: ${availableCurrencies}`,
        )
      } else {
        setCurrencyError('')
      }
    }
  }, [supportedCurrency]);

  const handleKeyPress = (event) => {
    const enterKeyPressed = event.keyCode === 13;
    if (enterKeyPressed && !(fetchingProducts || importLoading)) {
      event.preventDefault();
      forceRefetch()
    }
  }

  const checkboxLabel = (
    <InlineStack gap="1">
      <Icon source={StarFilledIcon} color="primary" /> 4 & Up
    </InlineStack>
  )

  return (
    <div className="wrapper">
      <LegacyCard sectioned>
        <Checkbox label={checkboxLabel} checked={ratingFilter} onChange={setRatingFilter} />
        <InlineGrid gap="2" columns={['twoThirds', 'oneThird']}>
          <div onKeyDown={handleKeyPress}>
            <TextField label="Search AliExpress" value={keyword} onChange={handleOnSearch} />
          </div>
          <Select
            id="currency"
            label="Currency"
            options={currencyList}
            value={supportedCurrency}
            error={!!currencyError}
            placeholder="Loading..."
            disabled
          />
        </InlineGrid>
        <Box paddingBlockStart="2">
          <InlineError message={currencyError} fieldID="currency" />
        </Box>
        <Box paddingBlockStart="4">
          <Button primary loading={fetchingProducts || importLoading} onClick={forceRefetch}>
            Search
          </Button>
        </Box>
      </LegacyCard>
      <LegacyCard>
        <ResourceList
          resourceName={{
            singular: 'product',
            plural: 'products',
          }}
          selectable
          items={products ?? []}
          selectedItems={selectedItems}
          idForItem={(item, idx) => item.productId ?? idx}
          onSelectionChange={setSelectedItems}
          renderItem={({ title, price, image, productId, rating }) => {
            const media = <Thumbnail source={image} alt={title} />
            return (
              <ResourceItem
                id={productId}
                verticalAlignment="flex-start"
                accessibilityLabel={`View details for ${title}`}
                name={title}
                media={media}
              >
                <h3>{title}</h3>
                <InlineStack gap="4" align="space-between">
                  <p>{price}</p>
                  {rating && (
                    <InlineStack gap="1">
                      {rating}
                      <Icon source={StarFilledIcon} color="primary" />
                    </InlineStack>
                  )}
                </InlineStack>
              </ResourceItem>
            )
          }}
        />
        {!!products.length && hasNext && (
          <Box padding="4">
            <InlineStack align="center">
              <Button loading={fetchingProducts} onClick={next} plain monochrome textAlign="center">
                Load more
              </Button>
            </InlineStack>
          </Box>
        )}
        {selectedItems.length > 0 && (
          <>
            <Divider />
            <Box padding="4">
              <InlineGrid alignItems="end" gap="4" columns={2}>
                <Select
                  label="Product status"
                  options={productStatuses}
                  onChange={setProductStatus}
                  value={productStatus}
                />
                <Select
                  label="Import language"
                  options={languageList}
                  onChange={setImportLanguage}
                  value={importLanguage}
                />
              </InlineGrid>
              <Box paddingBlockStart="4">
                <InlineGrid alignItems="end" gap="4" columns={1}>
                  <TextField
                    value={multiplier}
                    onChange={setMultiplier}
                    minLength={minPriceMultiplier}
                    min={minPriceMultiplier}
                    type="number"
                    prefix="Price multiplier:"
                    autoComplete="off"
                    suffix="X"
                    error={priceMultiplierError}
                  />
                  <TextField
                    value={compareAtPriceMultiplier}
                    onChange={setCompareAtPriceMultiplier}
                    minLength={minPriceMultiplier}
                    min={minPriceMultiplier}
                    type="number"
                    prefix="Compare at price multiplier:"
                    autoComplete="off"
                    suffix="X"
                    error={compareAtPriceMultiplierError}
                  />
                  <TextField
                    value={minPrice}
                    onChange={setMinPrice}
                    type="number"
                    prefix="Minimal price:"
                    autoComplete="off"
                    suffix={supportedCurrency}
                  />
                  <TextField
                    value={productType}
                    onChange={setProductType}
                    prefix="Product type:"
                    autoComplete="off"
                  />
                  <TextField
                    value={productTag}
                    onChange={setProductTag}
                    prefix="Product tags:"
                    helpText="You can add several separated by commas."
                    autoComplete="off"
                  />
                  <TextField
                    value={maxTitleLength}
                    onChange={setMaxTitleLength}
                    prefix="Max title length:"
                    autoComplete="off"
                    minLength={minTitleLength}
                    min={minTitleLength}
                    type="number"
                    suffix="chars"
                    error={maxTitleFieldError}
                  />
                </InlineGrid>
              </Box>
              <Box paddingBlockStart="4">
                <Button fullWidth loading={importLoading} primary onClick={handleOnImport}>
                  Import {selectedItems.length} {selectedItems.length > 1 ? 'Items' : 'Item'} (
                  {multiplier}
                  {'X '}
                  price |{' ' + languageList.find(option => option.value === importLanguage).label})
                </Button>
              </Box>
            </Box>
          </>
        )}
      </LegacyCard>
    </div>
  )
}

export default SearchProducts
