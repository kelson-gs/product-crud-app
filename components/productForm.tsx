import { cloudinaryService } from "@/services/cloudinary.services"
import { productsService } from "@/services/product.service"
import { theme } from "@/styles/theme"
import { ProductFormProps } from "@/types/products"
import { showError, showSuccess } from "@/utils/toast"
import * as ImagePicker from "expo-image-picker"
import { useEffect, useState } from "react"
import {
    ActivityIndicator,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"

export function ProductForm({
    onSuccess,
    onClose,
    initialData,
}: ProductFormProps) {
    const isEdit = !!initialData

    const [form, setForm] = useState({
        product_code: "",
        description: "",
    })

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<any>(null)

    useEffect(() => {
        if (initialData) {
            setForm({
                product_code: initialData.product_code,
                description: initialData?.description || '',
            })

            if (initialData.image) {
                setImage({ uri: initialData.image })
            }
        }
    }, [initialData])

    async function pickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        })

        if (!result.canceled) {
            setImage(result.assets[0])
        }
    }

    async function handleCreate() {
        if (!form.product_code || !form.description || !image) return

        try {
            setLoading(true)

            const formData = new FormData()
            formData.append("file", {
                uri: image.uri,
                name: "product.jpg",
                type: "image/jpeg",
            } as any)
            formData.append("upload_preset", "ml_default")

            const { url } = await cloudinaryService.uploadImage(formData)

            const created = await productsService.create({
                product_code: form.product_code,
                description: form.description,
                status: true,
                image: url
            })

            showSuccess("Produto criado com sucesso!")
            onSuccess(created)
            onClose()
        } catch (err: any) {
            showError("Erro ao criar produto!")
            console.error(err)
            if(err.response) {

                console.log(err.response.data)
            }
        } finally {
            setLoading(false)
        }
    }

    async function handleEdit() {
        try {
            setLoading(true)

            if (!initialData) return

            let imageUrl = initialData.image

            if (image && typeof image !== "string") {
                const formData = new FormData()
                formData.append("file", {
                    uri: image.uri,
                    name: "product.jpg",
                    type: "image/jpeg",
                } as any)

                formData.append("upload_preset", "ml_default")
                const { url } = await cloudinaryService.uploadImage(formData)
                imageUrl = url
            }

            const data = {
                id: initialData.id || '',
                product_code: form.product_code,
                description: form.description,
                status: true,
                image: imageUrl,
            }

            const updated = await productsService.update(data)

            showSuccess("Produco editado com sucesso!")
            onSuccess(updated)
            onClose()
        } catch (err) {
            showError("Erro ao editar produto!")
            console.error("Erro ao editar produto:", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 16,
                }}
            >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {isEdit ? "Editar Produto" : "Cadastrar Produto"}
                </Text>

                <TouchableOpacity onPress={onClose}>
                    <Text style={{ color: "red" }}>Fechar</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={pickImage}
                style={{
                    height: 140,
                    borderWidth: 1,
                    borderStyle: "dashed",
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                }}
            >
                {image ? (
                    <Image
                        source={{ uri: image.uri }}
                        style={{ width: "100%", height: "100%", borderRadius: 8 }}
                    />
                ) : (
                    <Text>Adicionar imagem</Text>
                )}
            </TouchableOpacity>

            <TextInput
                placeholder="Código do produto"
                value={form.product_code}
                onChangeText={(text) =>
                    setForm({ ...form, product_code: text })
                }
                style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 12,
                }}
            />

            <TextInput
                placeholder="Descrição"
                multiline
                value={form.description}
                onChangeText={(text) =>
                    setForm({ ...form, description: text })
                }
                style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 12,
                    height: 100,
                    marginBottom: 16,
                }}
            />

            <TouchableOpacity
                onPress={isEdit ? handleEdit : handleCreate}
                style={{
                    backgroundColor: theme.colors.original,
                    padding: 14,
                    borderRadius: 8,
                    alignItems: "center",
                }}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={{ color: "#fff" }}>
                        {isEdit ? "Salvar Alterações" : "Cadastrar Produto"}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    )
}
