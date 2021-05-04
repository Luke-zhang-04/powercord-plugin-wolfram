"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("powercord/entities");
const Settings_1 = __importDefault(require("./Settings"));
const http_1 = __importDefault(require("powercord/http"));
const wrapResult = (str) => `-- **Wolfram Alpha** --\n${str}\n------------------------`;
// NOTE: Class must be exported like this. Keep this.
module.exports = class Wolfram extends entities_1.Plugin {
    async startPlugin() {
        const appID = this.settings.get("appID", "");
        if (!appID) {
            return {
                send: false,
                result: "No App ID provided; set an App ID in settings",
            };
        }
        powercord.api.settings.registerSettings("wolfram", {
            category: this.entityID,
            label: "Wolfram",
            render: Settings_1.default,
        });
        powercord.api.commands.registerCommand({
            command: "wolfram",
            description: "Lets you fetch a question from Wolfram",
            usage: "{c} [--send] [--private]",
            executor: async (args) => {
                var _a, _b;
                const shouldSend = args.includes("--send")
                    ? !!args.splice(args.indexOf("--send"), 1)
                    : this.settings.get("send", false);
                const isPrivate = args.includes("--private") && !!args.splice(args.indexOf("--private"), 1);
                const input = args.join(" ");
                if (!input) {
                    return {
                        send: false,
                        result: `Invalid arguments. Run \`${powercord.api.commands.prefix}help wolfram\` for more information.`,
                    };
                }
                const url = `https://api.wolframalpha.com/v1/result?appid=${appID}&i=${encodeURIComponent(input)}&units=metric`;
                try {
                    const res = await http_1.default.get(url);
                    if (res.statusCode == 200) {
                        const result = wrapResult(`*Input:* ${input}\n*Output:* ${res.body.toString()}`);
                        return {
                            send: !isPrivate && shouldSend,
                            result,
                        };
                    }
                    return {
                        send: false,
                        result: wrapResult(`*Input:* ${input}\n*Error*: ${(_b = (_a = res.body) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "Unknown"}`),
                    };
                }
                catch (err) {
                    const error = err instanceof Error ? err.toString() : String(err);
                    return {
                        send: false,
                        result: wrapResult(`*Input:* ${input}\n*Error*: ${error}`),
                    };
                }
            },
        });
    }
    pluginWillUnload() {
        powercord.api.settings.unregisterSettings("wolfram");
        powercord.api.commands.unregisterCommand("wolfram");
    }
};
//# sourceMappingURL=index.js.map