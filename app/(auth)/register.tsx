import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { registerUser } from "@/services/user.services"
import { theme } from "@/styles/theme"
import { ErrorsRegister } from "@/types/user"
import { showError, showSuccess } from "@/utils/toast"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Text, View } from "react-native"

export default function RegisterScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [errors, setErrors] = useState<ErrorsRegister>({})

    const router = useRouter()

    const validate = () => {
        const newErrors: ErrorsRegister = {}

        if (!name.trim()) {
            newErrors.name = "Nome é obrigatório"
        } else if (name.length < 3) {
            newErrors.name = "Nome deve ter no mínimo 3 caracteres"
        }

        if (!email.trim()) {
            newErrors.email = "Email é obrigatório"
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email inválido"
        }

        if (!password) {
            newErrors.password = "Senha é obrigatória"
        } else if (password.length < 6) {
            newErrors.password = "Senha deve ter no mínimo 6 caracteres"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleRegister = async () => {
        if (!validate()) return

        try {
            await registerUser({
                email: email.trim().toLocaleLowerCase(),
                password,
                name
            })

            showSuccess("usuário registrado com sucesso!")
            router.replace("/login")
        } catch (error: any) {
            showError("Houve um erro ao registrar usuário!")
            alert(error.message || "Erro ao cadastrar")
        }
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                padding: 24,
                backgroundColor: theme.colors.background,
            }}
        >
            <Text
                style={{
                    fontFamily: "Merienda",
                    fontSize: 32,
                    color: theme.colors.text,
                    marginBottom: 32,
                }}
            >
                Criar Conta
            </Text>

            <Input placeholder="Nome" onChangeText={setName} />
            {errors.name && <Text style={{ color: "red" }}>{errors.name}</Text>}

            <Input placeholder="Email" onChangeText={setEmail} />
            {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}

            <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={setPassword}
            />
            {errors.password && (
                <Text style={{ color: "red" }}>{errors.password}</Text>
            )}

            <Button
                title="Cadastrar"
                isFont
                variant="primary"
                onPress={handleRegister}
            />
        </View>
    )
}
