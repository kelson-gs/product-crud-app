export interface Product {
    id?: string
    product_code: string
    description?: string
    image?: string
    status: boolean
}

export interface CreateProductDTO {
    description: string
    product_code: string
    status: boolean
    image?: string
}

export interface UpdateProductDTO {
    id: string
    product_code?: string
    description?: string
    image?: string
}

export interface UpdateStatusProductDTO {
    id: string
    status: boolean
}

export interface ProductFormProps {
    onSuccess: (product: Product) => void
    onClose: () => void
    initialData?: Product
}