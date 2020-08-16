export interface HttpRequest<T> {
  body?: T
  userId?: string
}

export interface HttpResponse {
  statusCode: number
  body: any
}
