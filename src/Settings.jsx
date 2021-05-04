import {React} from "powercord/webpack"
import {TextInput, SwitchItem} from "powercord/components/settings"

export const Settings = ({getSetting, updateSetting, toggleSetting}) => (
    <>
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
    </>
)

export default Settings
