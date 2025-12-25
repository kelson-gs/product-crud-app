import { theme } from "@/styles/theme"
import { Text, TouchableOpacity } from "react-native"

interface Props {
    title: string
    onPress: () => void
    isFont?: boolean
    variant?: "default" | "link" | "primary"
}

export function Button({ title, onPress, variant = "default", isFont = false }: Props) {
    if (variant === "link") {
        return (
            <TouchableOpacity onPress={onPress}>
                <Text style={{ 
                    color: theme.colors.text, 
                    marginTop: 16, 
                    textAlign: 'center',
                    fontFamily: `${isFont && 'Merienda'}`
                }}>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }

    if (variant === "primary") {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={{
                    backgroundColor: theme.colors.original,
                    padding: 14,
                    borderRadius: 8,
                    marginTop: 16,
                    
                }}
            >
                <Text style={{ 
                    color: "#fff", 
                    textAlign: "center", 
                    fontSize: 16,
                    fontFamily: `${isFont && 'Merienda'}`
                }}>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: theme.colors.primary,
                padding: 14,
                borderRadius: 8,
                marginTop: 16,
            }}
        >
            <Text style={{ 
                color: "#fff", 
                textAlign: "center", 
                fontSize: 16,
                fontFamily: `${isFont && 'Merienda'}`
            }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
