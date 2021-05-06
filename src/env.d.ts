declare module "powercord/entities" {
    export class Plugin {
        public entityID: string

        public startPlugin?(): void

        public pluginWillUnload?(): void

        public settings: {
            get: <T>(name: string, defaultValue: T) => T
            get: <T>(name: string, defaultValue?: T) => T | undefined
            set: <T>(name: string, val: T) => void
        }
    }
}

declare module "powercord/components/settings" {
    export const SwitchItem: typeof import("react").Component
    export const TextInput: typeof import("react").Component
}

declare interface RenderProps {
    settings: {[key: string]: unknown}
    getSetting: <T>(name: string, defaultValue: T) => T
    getSetting: <T>(name: string, defaultValue?: T) => T | undefined
    toggleSetting: <T>(name: string, defaultValue?: T) => void
    updateSetting: <T>(name: string, value: T) => void
}

declare const powercord: {
    api: {
        commands: {
            registerCommand: (config: {
                command: string
                description?: string
                usage?: string
                executor: (
                    args: string[],
                ) =>
                    | {send: boolean; result: string}
                    | void
                    | Promise<{send: boolean; result: string} | void>
            }) => void
            unregisterCommand: (name: string) => void
            prefix: string
        }
        settings: {
            registerSettings: (
                entityID: string,
                config: {
                    category: string
                    label: string
                    render: (props: RenderProps) => typeof import("react").ReactNode
                },
            ) => void
            unregisterSettings: (entityID: string) => void
        }
    }
}
