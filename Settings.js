"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const webpack_1 = require("powercord/webpack");
const settings_1 = require("powercord/components/settings");
const Settings = ({ getSetting, updateSetting, toggleSetting }) => (webpack_1.React.createElement(webpack_1.React.Fragment, null,
    webpack_1.React.createElement(settings_1.TextInput, { note: "Wolfram AppID used", defaultValue: getSetting("appID", ""), required: true, onChange: (val) => updateSetting("appID", val.endsWith("/") ? val.slice(0, -1) : val) }, "Wolfram AppID"),
    webpack_1.React.createElement(settings_1.SwitchItem, { note: "Whether the result is sent in chat by default or not.", value: getSetting("send", false), onChange: () => toggleSetting("send") }, "Send Result")));
exports.Settings = Settings;
exports.default = exports.Settings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvU2V0dGluZ3MudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU9BLCtDQUF1QztBQUN2Qyw0REFBbUU7QUFFNUQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxFQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRSxDQUFDLENBQ2pGO0lBQ0ksOEJBQUMsb0JBQVMsSUFDTixJQUFJLEVBQUMsb0JBQW9CLEVBQ3pCLFlBQVksRUFBRSxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUNyQyxRQUFRLEVBQUUsSUFBSSxFQUNkLFFBQVEsRUFBRSxDQUFDLEdBQVcsRUFBRSxFQUFFLENBQ3RCLGFBQWEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLG9CQUk5RDtJQUNaLDhCQUFDLHFCQUFVLElBQ1AsSUFBSSxFQUFDLHVEQUF1RCxFQUM1RCxLQUFLLEVBQUUsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFDaEMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsa0JBRzVCLENBQ2QsQ0FDTixDQUFBO0FBcEJZLFFBQUEsUUFBUSxZQW9CcEI7QUFFRCxrQkFBZSxnQkFBUSxDQUFBIn0=