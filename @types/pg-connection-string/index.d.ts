declare module 'pg-connection-string' {
  export interface PgConnectionObject {
    host: string,
    database: string,
    port?: string,
    client_encoding?: string,
    user?: string,
    password?: string,
    ssl?: boolean,
    application_name?: string,
    fallback_application_name?: string
  }

  export default function parse(str: string): PgConnectionObject
}
