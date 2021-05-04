const {React} = require("powercord/webpack")
const {TextInput, SwitchItem} = require("powercord/components/settings")

module.exports = ({getSetting, updateSetting, toggleSetting}) => (
    <div>
        <TextInput
            note="Wolfram AppID used"
            defaultValue={getSetting("appID", "")}
            required={true}
            onChange={(val) => updateSetting("appID", val.endsWith("/") ? val.slice(0, -1) : val)}
        >
            Wolfram AppID
        </TextInput>
        <SwitchItem
            note="Whether the result is sent in chat by default or not."
            value={getSetting("send", false)}
            onChange={() => toggleSetting("send")}
        >
            Send Result
        </SwitchItem>
    </div>
)
