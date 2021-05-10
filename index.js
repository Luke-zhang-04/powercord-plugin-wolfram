"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("powercord/entities");
const Settings_1 = __importDefault(require("./Settings"));
const http_1 = __importDefault(require("powercord/http"));
const wrapResult = (str) => `――― **Wolfram Alpha** ―――\n${str}\n―――――――――――――`;
module.exports = class Wolfram extends entities_1.Plugin {
    async startPlugin() {
        let appID = this.settings.get("appID", undefined);
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
                var _a;
                if ((appID !== null && appID !== void 0 ? appID : (appID = this.settings.get("appID", undefined))) ===
                    undefined) {
                    return {
                        send: false,
                        result: "No App ID provided; set an App ID in settings.",
                    };
                }
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
                        const result = wrapResult(`*Input:* \`${input}\`\n*Output:* \`${res.body.toString()}\``);
                        return {
                            send: !isPrivate && shouldSend,
                            result,
                        };
                    }
                    return {
                        send: false,
                        result: wrapResult(`*Input:* ${input}\n*Error*: ${(_a = res.body.toString()) !== null && _a !== void 0 ? _a : "Unknown"}`),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFPQSxpREFBeUM7QUFDekMsMERBQWlDO0FBQ2pDLDBEQUFpQztBQUVqQyxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFLENBQUMsOEJBQThCLEdBQUcsaUJBQWlCLENBQUE7QUFHdEYsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLE9BQVEsU0FBUSxpQkFBTTtJQUN6QyxLQUFLLENBQUMsV0FBVztRQUNiLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFxQixPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUE7UUFFckUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFO1lBQy9DLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixLQUFLLEVBQUUsU0FBUztZQUNoQixNQUFNLEVBQUUsa0JBQVE7U0FDbkIsQ0FBQyxDQUFBO1FBRUYsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDO1lBQ25DLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLFdBQVcsRUFBRSx3Q0FBd0M7WUFDckQsS0FBSyxFQUFFLDBCQUEwQjtZQUNqQyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFOztnQkFDckIsSUFDSSxDQUFDLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxJQUFMLEtBQUssR0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBcUIsT0FBTyxFQUFFLFNBQVMsQ0FBQyxFQUFDO29CQUNyRSxTQUFTLEVBQ1g7b0JBQ0UsT0FBTzt3QkFDSCxJQUFJLEVBQUUsS0FBSzt3QkFDWCxNQUFNLEVBQUUsZ0RBQWdEO3FCQUMzRCxDQUFBO2lCQUNKO2dCQUVELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO29CQUN0QyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7Z0JBQ3RDLE1BQU0sU0FBUyxHQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtnQkFDN0UsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFFNUIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixPQUFPO3dCQUNILElBQUksRUFBRSxLQUFLO3dCQUNYLE1BQU0sRUFBRSw0QkFBNEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxzQ0FBc0M7cUJBQzFHLENBQUE7aUJBQ0o7Z0JBRUQsTUFBTSxHQUFHLEdBQUcsZ0RBQWdELEtBQUssTUFBTSxrQkFBa0IsQ0FDckYsS0FBSyxDQUNSLGVBQWUsQ0FBQTtnQkFFaEIsSUFBSTtvQkFDQSxNQUFNLEdBQUcsR0FBRyxNQUFNLGNBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7b0JBRS9CLElBQUksR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLEVBQUU7d0JBQ3ZCLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FDckIsY0FBYyxLQUFLLG1CQUFtQixHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQ2hFLENBQUE7d0JBRUQsT0FBTzs0QkFDSCxJQUFJLEVBQUUsQ0FBQyxTQUFTLElBQUksVUFBVTs0QkFDOUIsTUFBTTt5QkFDVCxDQUFBO3FCQUNKO29CQUVELE9BQU87d0JBQ0gsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsTUFBTSxFQUFFLFVBQVUsQ0FDZCxZQUFZLEtBQUssY0FBYyxNQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLG1DQUFJLFNBQVMsRUFBRSxDQUNwRTtxQkFDSixDQUFBO2lCQUNKO2dCQUFDLE9BQU8sR0FBRyxFQUFFO29CQUNWLE1BQU0sS0FBSyxHQUFHLEdBQUcsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUVqRSxPQUFPO3dCQUNILElBQUksRUFBRSxLQUFLO3dCQUNYLE1BQU0sRUFBRSxVQUFVLENBQUMsWUFBWSxLQUFLLGNBQWMsS0FBSyxFQUFFLENBQUM7cUJBQzdELENBQUE7aUJBQ0o7WUFDTCxDQUFDO1NBQ0osQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELGdCQUFnQjtRQUNaLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3BELFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3ZELENBQUM7Q0FDSixDQUFBIn0=