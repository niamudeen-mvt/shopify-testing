import 'dotenv/config'
import { LATEST_API_VERSION } from '@shopify/shopify-api'
import { shopifyApp } from '@shopify/shopify-app-express'
import { MongoDBSessionStorage } from '@shopify/shopify-app-session-storage-mongodb'
import { restResources } from '@shopify/shopify-api/rest/admin/2023-04'
import { billingConfig } from './billing.js'

const shopify = shopifyApp({
  api: {
    apiVersion: LATEST_API_VERSION,
    restResources,
    billing: billingConfig, // or replace with billingConfig above to enable example billing
  },
  auth: {
    path: '/api/auth',
    callbackPath: '/api/auth/callback',
  },
  webhooks: {
    path: '/api/webhooks',
  },
  sessionStorage: new MongoDBSessionStorage(process.env.DB_URL, process.env.DB_NAME),
})
export default shopify
