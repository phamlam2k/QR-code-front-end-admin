import { Input } from "antd"
import "./InputCommon.css"

const InputCommon = (props) => {
    return (
        <Input 
            className="input-common"
            {...props}
        />
    )
}

export default InputCommon
