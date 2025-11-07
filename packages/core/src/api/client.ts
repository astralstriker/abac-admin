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
      ...config
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(`${this.config.baseURL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...this.config.headers,
          ...options.headers
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = new Error(
          `API Error: ${response.status} ${response.statusText}`
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
    const url = new URL(endpoint, this.config.baseURL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return this.request<T>(url.pathname + url.search, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}
