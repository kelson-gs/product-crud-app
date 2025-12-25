
import { Input } from "@/components/Input"
import { productsService } from "@/services/product.service"
import { useFocusEffect } from "expo-router"
import { useCallback, useMemo, useState } from "react"
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native"

export default function Dashboard() {
    const [products, setProducts] = useState<any[]>([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    useFocusEffect(
        useCallback(() => {
            setLoading(true)

            productsService
                .getAll()
                .then(setProducts)
                .finally(() => setLoading(false))
        }, [])
    )

    const filtered = useMemo(() => {
        if (!search) return products
        return products.filter(p =>
            p.description?.toLowerCase().includes(search.toLowerCase())
        )
    }, [products, search])

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 40 }} />
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Input
                placeholder="Buscar produto..."
                value={search}
                onChangeText={setSearch}
            />

            <FlatList
                data={filtered}
                keyExtractor={item => String(item.id)}
                numColumns={2}
                columnWrapperStyle={{ gap: 12 }}
                contentContainerStyle={{ gap: 12, paddingTop: 16 }}
                renderItem={({ item }) => (
                    <View style={{
                        position: 'relative',
                        flex: 1,
                        backgroundColor: "#111",
                        borderRadius: 12,
                        overflow: "hidden",
                        opacity: item.status ? 1 : 0.5
                    }}>
                        <Text style={{
                            position: 'absolute',
                            backgroundColor: item.status ? "#22c55e" : "#44433eff",
                            color: "#fff",
                            top: 6,
                            left: 5,
                            padding: 4,
                            borderRadius: 8,
                            zIndex: 100,
                            fontSize: 12
                        }}>
                            {item.status ? "Ativo" : "Inativo"}
                        </Text>
                        {item.image && (
                            <Image
                                source={{ uri: item.image }}
                                style={{ width: "100%", height: 120 }}
                            />
                        )}

                        <View style={{ padding: 10 }}>
                            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                                {item.product_code}
                            </Text>

                            <Text style={{ color: "#fff", fontSize: 14 }}>
                                {item.description}
                            </Text>


                        </View>
                    </View>
                )}
            />
        </View>
    )
}