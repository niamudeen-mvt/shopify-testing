import { model, Schema } from 'mongoose'

export const importStatus = {
  QUEUE: 'queue',
  IN_PROCESS: 'in process',
  SUCCESS: 'success',
  FAILED: 'failed',
}

export const productStatus = {
  SUCCESS: 'success',
  FAILED: 'failed',
  NEW: 'new',
}

const schema = new Schema(
  {
    storeId: { type: String, required: true },
    taskId: { type: String },
    products: [
      {
        productId: { type: String, required: true },
        status: {
          type: String,
          enum: ['success', 'failed', 'new'],
          default: 'new',
        },
      },
    ],
    status: {
      type: String,
      enum: ['queue', 'in process', 'success', 'failed'],
      default: 'in process',
    },
  },
  { timestamps: true },
)

const ProductImport = model('ProductImport', schema)

export default ProductImport
