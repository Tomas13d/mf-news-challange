import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default api;

// Clase customizada de Errores para poder manejarlos y mostrarlos luego mejor en las alertas
export class ApiError extends Error {
  public statusCode?: number;
  public isNetworkError: boolean;
  public originalError?: any;

  constructor(
    message: string,
    options?: {
      statusCode?: number;
      isNetworkError?: boolean;
      originalError?: any;
    }
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = options?.statusCode;
    this.isNetworkError = options?.isNetworkError || false;
    this.originalError = options?.originalError;
  }
}

// Handler centralizado para manejar llamadas API con try/catch (para no tener que ponerlo en cada servicio)
export async function handleApiCall<T>(
  apiCall: Promise<{ data: T }>
): Promise<T> {
  try {
    const res = await apiCall;
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        console.error("[Network Error]:", error.message);
        throw new ApiError("Error de red. Por favor, revisa tu conexión.", {
          isNetworkError: true,
          originalError: error,
        });
      }

      const status = error.response.status;
      const data = error.response.data;

      let message = "Ocurrió un error desconocido";

      if (status >= 500) {
        message = "Error en el servidor. Por favor intenta más tarde.";
      } else if (status === 404) {
        message = "Recurso no encontrado.";
      } else if (status === 401) {
        message = "No autorizado. Por favor inicia sesión.";
      } else if (status === 400) {
        message = data?.message || "Error en la solicitud. Revisa los datos.";
      } else {
        message = data?.message || `Error ${status}`;
      }

      console.error(`[API Error ${status}]:`, data || message);

      throw new ApiError(message, {
        statusCode: status,
        originalError: error,
      });
    } else {
      console.error("[Unexpected Error]:", error);
      throw new ApiError("Error inesperado. Por favor intenta más tarde.", {
        originalError: error,
      });
    }
  }
}
