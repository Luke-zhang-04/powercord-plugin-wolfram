/**
 * Powercord Type Defs
 *
 * @license MIT
 * @copyright 2021 Luke Zhang
 */

export type WebpackInstance = {
    cache: {[key: string]: unknown}
    require: Function
}

export type ContextMenuModule = {
    openContextMenu: Function
    clodeContextMenu: Function
}

export const React: typeof import("react")

/**
 * Grabs a module from the Webpack store
 *
 * @param filter Filter used to grab the module. Can be a function or an array of keys the object must have.
 * @param retry Whether or not to retry fetching if the module is not found. Each try will be
 *   delayed by 100ms and max retries is 20.
 * @param forever If Powercord should try to fetch the module forever. Should be used only if
 *   you're in early stages of startup.
 * @returns The found module. A promise will always be returned, unless retry is false.
 */
export const getModule: (
    filter: Function | string[],
    retry?: boolean,
    forever?: boolean,
) => Promise<{[key: string]: unknown}> | {[key: string]: unknown}

/**
 * Grabs all found modules from the webpack store
 *
 * @param filter Filter used to grab the module. Can be a function or an array of keys the object must have.
 * @returns The found modules.
 */
export const getAllModules: (filter: Function | string[]) => {[key: string]: unknown}[]

/**
 * Grabs a React component by its display name
 *
 * @param displayName Component's display name.
 * @param retry Whether or not to retry fetching if the module is not found. Each try will be
 *   delayed by 100ms and max retries is 20.
 * @param forever If Powercord should try to fetch the module forever. Should be used only if
 *   you're in early stages of startup.
 * @returnsThe component. A promise will always be returned, unless retry is false.
 */
export const getModuleByDisplayName: (
    displayName: string,
    retry?: boolean,
    forever?: boolean,
) => Promise<{[key: string]: unknown}> | {[key: string]: unknown}

export const init: () => void
