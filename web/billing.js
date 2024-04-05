import { BillingInterval } from '@shopify/shopify-api'

export const billingConfig = {
  Basic: {
    amount: 5000.0,
    currencyCode: 'USD',
    interval: BillingInterval.Every30Days,
  },
}
