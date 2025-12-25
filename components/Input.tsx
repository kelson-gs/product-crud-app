import { theme } from "@/styles/theme"
import { TextInput } from "react-native"

export function Input(props: any) {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#888"
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#555",
        color: theme.colors.text,
        paddingVertical: 12,
        marginBottom: 16,
      }}
    />
  )
}
