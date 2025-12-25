// src/services/authService.ts
import { RegisterUser } from "@/types/user"
import { api } from "./api"

interface ApiError {
  message: string
}

export async function registerUser(data: RegisterUser) {
  try {
    const response = await api.post<RegisterUser>(
      `/auth/register`,
      data
    )

    return response.data
  } catch (error: any) {
    if (error.response) {
      const apiError: ApiError = error.response.data
      throw new Error(apiError.message || "Erro ao cadastrar usuário")
    }

    if (error.request) {
      throw new Error("Erro de conexão com o servidor")
    }

    throw new Error("Erro inesperado")
  }
}
