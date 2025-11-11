export interface ABACAdminConfig {
  baseURL: string;
  headers?: Record<string, string>;
  timeout?: number;
  onError?: (error: Error) => void;
  onSuccess?: (response: Response) => void;
}

export class ABACAdminClient {
  private config: ABACAdminConfig;

  constructor(config: ABACAdminConfig) {
    this.config = {
      timeout: 30000,
      ...config,
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      // Normalize URL construction: ensure single slash between base and endpoint
      const normalizedEndpoint = endpoint.startsWith("/")
        ? endpoint
        : `/${endpoint}`;
      const baseURL = this.config.baseURL.endsWith("/")
        ? this.config.baseURL.slice(0, -1)
        : this.config.baseURL;
      const url = `${baseURL}${normalizedEndpoint}`;

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...this.config.headers,
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = new Error(
          `API Error: ${response.status} ${response.statusText}`,
        );
        this.config.onError?.(error);
        throw error;
      }

      this.config.onSuccess?.(response);
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      this.config.onError?.(error as Error);
      throw error;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    let url = endpoint;
    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, value);
      });
      url = `${endpoint}?${searchParams.toString()}`;
    }
    return this.request<T>(url, { method: "GET" });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}
