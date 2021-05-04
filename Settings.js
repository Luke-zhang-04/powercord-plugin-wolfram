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
//# sourceMappingURL=Settings.js.map