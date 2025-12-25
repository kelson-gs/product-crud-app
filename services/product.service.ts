import {
    CreateProductDTO,
    Product,
    UpdateProductDTO,
    UpdateStatusProductDTO,
} from "@/types/products"
import { api } from "./api"

export const productsService = {

  async create(data: CreateProductDTO) {
    const res = await api.post<Product>("/product", data)
    return res.data
  },

  async getAll() {
    const res = await api.get<Product[]>("/products")
    return res.data
  },

  async getOnly(id: string) {
    const res = await api.get<Product>(`/product/${id}`)
    return res.data
  },

  async update(data: UpdateProductDTO) {
    const res = await api.put<Product>("/product", data)
    return res.data
  },

  async updateStatus(data: UpdateStatusProductDTO) {
    const res = await api.put<Product>("/product/status", {
      id: data.id,
      status: data.status,
    })
    return res.data
  },

  async delete(id: number) {
    await api.delete("/product", {
      data: { id },
    })
  },
}
