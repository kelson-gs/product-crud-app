import { ProductForm } from "@/components/productForm"
import { productsService } from "@/services/product.service"
import { theme } from "@/styles/theme"
import { showError, showSuccess } from "@/utils/toast"
import { useEffect, useState } from "react"
import {
    FlatList,
    Image,
    Modal,
    Text,
    TouchableOpacity,
    View
} from "react-native"

interface Product {
    id: string
    product_code: string
    description: string
    status: boolean
}

export default function Products() {
    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState<any[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    useEffect(() => {
        productsService.getAll()
            .then(setProducts)
    }, [])

    async function toggleStatus(id: string, currentStatus: boolean) {
        const newStatus = !currentStatus

        try {
            await productsService.updateStatus({ id, status: newStatus })

            setProducts(prev =>
                prev.map(item =>
                    item.id === id
                        ? { ...item, status: newStatus }
                        : item
                )
            )

            showSuccess("Status alterado!")
        } catch (error) {
            showError("Erro ao alterar Status!")
            console.error(error)
        }
    }

    async function deleteProduct(id: number) {
        try {
            await productsService.delete(id)
            setProducts(prev => prev.filter(item => item.id !== id))
            showSuccess("Produto deletado com sucesso!")
        } catch (error) {
            showError("Houve um erro ao deletar produto")
            console.error(error)
        }
    }

    function editProduct(product: Product) {
        setSelectedProduct(product)
        setOpen(true)
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <TouchableOpacity
                onPress={() => {
                    setSelectedProduct(null)
                    setOpen(true)
                }}
                style={{
                    backgroundColor: theme.colors.original,
                    padding: 14,
                    borderRadius: 8,
                    marginBottom: 16
                }}
            >
                <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
                    Cadastrar Produto
                </Text>
            </TouchableOpacity>

            <FlatList
                data={products}
                keyExtractor={item => item.id}
                contentContainerStyle={{ gap: 12 }}
                renderItem={({ item }) => (
                    <View
                        style={{
                            backgroundColor: "#1f1f1f",
                            padding: 16,
                            borderRadius: 8,
                        }}
                    >
                        {item.image && (
                            <Image
                                source={{ uri: item.image }}
                                style={{ width: "100%", height: 120 }}
                            />
                        )}
                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                            {item.product_code}
                        </Text>

                        <Text style={{ color: "#ccc", marginVertical: 6 }}>
                            {item.description}
                        </Text>

                        <Text
                            style={{
                                color: item.status ? "#22c55e" : "#ef4444",
                                marginBottom: 12,
                                fontWeight: "bold",
                            }}
                        >
                            {item.status ? "Ativo" : "Inativo"}
                        </Text>

                        <View style={{ flexDirection: "row", gap: 8 }}>
                            <TouchableOpacity
                                onPress={() => toggleStatus(item.id, item.status)}
                                style={{
                                    flex: 1,
                                    padding: 10,
                                    borderRadius: 6,
                                    backgroundColor: "#374151",
                                }}
                            >
                                <Text style={{ color: "#fff", textAlign: "center" }}>
                                    {item.status ? "Inativar" : "Ativar"}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => editProduct(item)}
                                style={{
                                    flex: 1,
                                    padding: 10,
                                    borderRadius: 6,
                                    backgroundColor: "#2563eb",
                                }}
                            >
                                <Text style={{ color: "#fff", textAlign: "center" }}>
                                    Alterar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => deleteProduct(item.id)}
                                style={{
                                    flex: 1,
                                    padding: 10,
                                    borderRadius: 6,
                                    backgroundColor: "#dc2626",
                                }}
                            >
                                <Text style={{ color: "#fff", textAlign: "center" }}>
                                    Deletar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <Modal visible={open} animationType="slide">
                <ProductForm
                    initialData={selectedProduct ?? undefined}
                    onClose={() => {
                        setOpen(false)
                        setSelectedProduct(null)
                    }}
                    onSuccess={(product) => {
                        setProducts(prev => {
                            const exists = prev.find(p => p.id === product.id)
                            if (exists) {
                                return prev.map(p => (p.id === product.id ? product : p))
                            }

                            return [...prev, product]
                        })
                    }}
                />
            </Modal>
        </View>
    )
}