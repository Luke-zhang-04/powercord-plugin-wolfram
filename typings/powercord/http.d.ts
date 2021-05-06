/**
 * Powercord Type Defs
 *
 * @license MIT
 * @copyright 2021 Luke Zhang
 */

export type HTTPResponse = {
    raw: string
    body: string | {[key: string]: unknown}
    ok: boolean
    statusCode: number
    statusText: string
    headers: string
}

class HTTPError extends Error {
    public constructor(message: string, res: unknown)
}

class GenericRequest {
    public readonly opts: {
        method: string
        query: {[key: string]: string}
        headers: {[key: string]: string}
    }

    public constructor(method: string, uri: string)

    private _objectify: Function

    /**
     * Appends a querystring parameter
     *
     * @param key Parameter key
     * @param value Parameter value
     * @returns Self, for fluent calls
     */
    public query(key: string, value: string): GenericRequest

    /**
     * Sets a header for the request
     *
     * @param key Header name
     * @param value Header value
     * @returns Self, for fluent calls
     */
    public set(key: string, value: string): GenericRequest

    /**
     * Specifies the data to send (for non-GET requests), which will get serialized based on the
     * Content-Type header <b>Make sure to specify the Content-Type header before calling this</b>
     *
     * @param data Data that'll be sent
     * @returns Self, for fluent calls
     */
    public send(data: {[key: string]: unknown} | string): GenericRequest

    /**
     * Executes the request
     */
    public execute(): Promise<HTTPResponse>

    /**
     * Executes the request and attaches success and/or error handler
     *
     * @param resolver Success handler
     * @param rejector Error handler
     */
    public then(
        resolver: (res: HTTPResponse) => void,
        rejector?: (err: HTTPError | null) => void,
    ): Promise<HTTPResponse>

    /**
     * Executes the requests and attaches an error handler
     *
     * @param rejector Error handler
     */
    public catch(rejector?: (err: HTTPError | null) => void): Promise<HTTPResponse>
}

/**
 * Creates a GET request
 *
 * @param url URL to call
 * @returns Created request
 */
export function get(url: string): GenericRequest

/**
 * Creates a POST request
 *
 * @param url URL to call
 * @returns Created request
 */
export function post(url: string): GenericRequest

/**
 * Creates a PUT request
 *
 * @param url URL to call
 * @returns Created request
 */
export function put(url: string): GenericRequest

/**
 * Creates a DELETE request
 *
 * @param url URL to call
 * @returns Created request
 */
export function del(url: string): GenericRequest

/**
 * Creates a HEAD request
 *
 * @param url URL to call
 * @returns Created request
 */
export function head(url: string): GenericRequest
