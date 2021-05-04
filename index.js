const {Plugin} = require("powercord/entities")
const {get} = require("powercord/http")

const Settings = require("./Settings.jsx")

const wrapResult = (str) => `-- **Wolfram Alpha** --\n${str}\n------------------------`

module.exports = class Wolfram extends Plugin {
    async startPlugin() {
        const appID = this.settings.get("appID", "")

        if (!appID) {
            return {
                send: false,
                result: "No App ID provided; set an App ID in settings",
            }
        }

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
                    const res = await get(url)

                    if (res.statusCode == 200) {
                        const result = wrapResult(
                            `*Input:* ${input}\n*Output:* ${res.body.toString()}`,
                        )

                        return {
                            send: !isPrivate && shouldSend,
                            result,
                        }
                    }

                    return {
                        send: false,
                        result: wrapResult(
                            `*Input:* ${input}\n*Error*: ${res.body?.toString() ?? "Unknown"}`,
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
