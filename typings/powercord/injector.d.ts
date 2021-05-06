/**
 * Powercord Type Defs
 *
 * @license MIT
 * @copyright 2021 Luke Zhang
 */

/**
 * Injects into a function
 *
 * @param injectionId ID of the injection, used for uninjecting
 * @param mod Module we should inject into
 * @param funcName Name of the function we're aiming at
 * @param patch Function to inject
 * @param pre Whether the injection should run before original code or not
 */
export const inject: (
    injectionId: string,
    mod: {[key: string]: unknown},
    funcName: string,
    patch: Function,
    pre?: boolean,
) => void

/**
 * Removes an injection
 *
 * @param injectionId The injection specified during injection
 */
export const uninject: (injectionId: string) => void

/**
 * Check if a function is injected
 *
 * @param injectionId The injection to check
 */
export const isInjected: (injectionId: string) => boolean
