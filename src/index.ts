/**
 * Powercord Plugin Wolfram
 *
 * @license MIT https://github.com/Luke-zhang-04/powercord-plugin-wolfram
 * @copyright 2021 Syfe, Luke Zhang
 */

import {Plugin} from "powercord/entities"
import Settings from "./Settings"
import http from "powercord/http"

const wrapResult = (str: string) => `――― **Wolfram Alpha** ―――\n${str}\n―――――――――――――`

// NOTE: Class must be exported like this. Keep this.
module.exports = class Wolfram extends Plugin {
    async startPlugin() {
        let appID = this.settings.get<string | undefined>("appID", undefined)

        powercord.api.settings.registerSettings("wolfram", {
            category: this.entityID,
            label: "Wolfram",
            render: Settings,
        })

        powercord.api.commands.registerCommand({
            command: "wolfram",
            description: "Lets you fetch a question from Wolfram",
            usage: "{c} [--send] [--private]",
            executor: async (args) => {
                if (
                    (appID ??= this.settings.get<string | undefined>("appID", undefined)) ===
                    undefined
                ) {
                    return {
                        send: false,
                        result: "No App ID provided; set an App ID in settings.",
                    }
                }

                const shouldSend = args.includes("--send")
                    ? !!args.splice(args.indexOf("--send"), 1)
                    : this.settings.get("send", false)
                const isPrivate =
                    args.includes("--private") && !!args.splice(args.indexOf("--private"), 1)
                const input = args.join(" ")

                if (!input) {
                    return {
                        send: false,
                        result: `Invalid arguments. Run \`${powercord.api.commands.prefix}help wolfram\` for more information.`,
                    }
                }

                const url = `https://api.wolframalpha.com/v1/result?appid=${appID}&i=${encodeURIComponent(
                    input,
                )}&units=metric`

                try {
                    const res = await http.get(url)

                    if (res.statusCode == 200) {
                        const result = wrapResult(
                            `*Input:* \`${input}\`\n*Output:* \`${res.body.toString()}\``,
                        )

                        return {
                            send: !isPrivate && shouldSend,
                            result,
                        }
                    }

                    return {
                        send: false,
                        result: wrapResult(
                            `*Input:* ${input}\n*Error*: ${res.body.toString() ?? "Unknown"}`,
                        ),
                    }
                } catch (err) {
                    const error = err instanceof Error ? err.toString() : String(err)

                    return {
                        send: false,
                        result: wrapResult(`*Input:* ${input}\n*Error*: ${error}`),
                    }
                }
            },
        })
    }

    pluginWillUnload() {
        powercord.api.settings.unregisterSettings("wolfram")
        powercord.api.commands.unregisterCommand("wolfram")
    }
}
