export interface ApiClientOptions {
  baseURL?: string;
}

export interface RequestInterceptorContext {
  url: string;
  options: RequestInit;
}

export type RequestInterceptor = (ctx: RequestInterceptorContext) => RequestInterceptorContext | Promise<RequestInterceptorContext>;
export type ResponseInterceptor = (response: Response) => Response | Promise<Response>;

export class ApiClient {
  baseURL: string;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor(options: ApiClientOptions = {}) {
    this.baseURL = options.baseURL ?? '';
  }

  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
  }

  private async applyRequestInterceptors(url: string, options: RequestInit) {
    let ctx = { url, options };
    for (const interceptor of this.requestInterceptors) {
      ctx = await interceptor(ctx);
    }
    return ctx;
  }

  private async applyResponseInterceptors(response: Response) {
    let res = response;
    for (const interceptor of this.responseInterceptors) {
      res = await interceptor(res);
    }
    return res;
  }

  async request(path: string, options: RequestInit = {}) {
    const fullUrl = this.baseURL + path;
    const { url, options: finalOptions } = await this.applyRequestInterceptors(fullUrl, options);
    const response = await fetch(url, finalOptions);
    return this.applyResponseInterceptors(response);
  }

  get(path: string, options: RequestInit = {}) {
    return this.request(path, { ...options, method: 'GET' });
  }

  post(path: string, body?: any, options: RequestInit = {}) {
    return this.request(path, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
  }

  put(path: string, body?: any, options: RequestInit = {}) {
    return this.request(path, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
  }

  delete(path: string, options: RequestInit = {}) {
    return this.request(path, { ...options, method: 'DELETE' });
  }
}