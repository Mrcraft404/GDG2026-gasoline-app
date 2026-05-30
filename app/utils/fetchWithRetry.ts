import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios"
import https from "https"

// Agente HTTPS con keep-alive para mejor compatibilidad con servidores que bloquean conexiones cortas
const httpsAgent = new https.Agent({ keepAlive: true })

const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
  "Accept-Encoding": "gzip, deflate, br",
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  "Sec-Ch-Ua": '"Chromium";v="124", "Google Chrome";v="124"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"Windows"',
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1",
}

export async function fetchWithRetry(
  url: string,
  config?: AxiosRequestConfig,
  maxRetries = 3
): Promise<AxiosResponse> {
  const fullConfig: AxiosRequestConfig = {
    timeout: 20000,
    httpsAgent,
    headers: { ...BROWSER_HEADERS, ...config?.headers },
    maxRedirects: 5,
    ...config,
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await axios.get(url, fullConfig)
    } catch (err: any) {
      const isRetryable =
        err.code === "ECONNRESET" ||
        err.code === "ECONNABORTED" ||
        err.code === "ETIMEDOUT" ||
        err.code === "ENOTFOUND" ||
        (err.response?.status && err.response.status >= 500)

      if (!isRetryable || attempt === maxRetries) throw err

      const waitMs = attempt * 2500
      console.warn(
        `[fetch] ${url.split("?")[0]} · intento ${attempt}/${maxRetries} (${err.code}), reintentando en ${waitMs}ms...`
      )
      await new Promise((r) => setTimeout(r, waitMs))
    }
  }

  throw new Error("fetchWithRetry: máximo de reintentos alcanzado")
}
