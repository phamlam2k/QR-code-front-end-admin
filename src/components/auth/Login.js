import { Button, Form, Input, notification, Typography } from "antd"
import bg from "../../assets/background_login.png"
import bg_girl from "../../assets/background_girl_login.png"
import logo_usth from "../../assets/logo_usth.png"
import InputCommon from "../../common/InputCommon"
import './Login.css'
import { useHistory } from "react-router-dom"
import { useState } from "react"
import { API_LOGIN } from "../../config/endpointApi"
import axios from "axios"
import { ADMIN_SUBJECT } from "../../config/path"

const Login = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)

    const onFinish = (value) => {
        setLoading(true)
        
        axios.post(API_LOGIN, value)
            .then((res) => {
                if(res?.data?.code === 200){
                    if(res?.data?.data?.admin === 1 || res?.data?.data?.admin === 0){
                        notification.success({
                            message: res?.data?.message
                        })
                        
                        localStorage.setItem('user', JSON.stringify(res?.data?.data))
                        history.push(ADMIN_SUBJECT)
                    }else{
                        notification.error({
                            message: "Please choice another account!"
                        })
                        setLoading(false)
                    }
                }
                if(res.data.code === 500){
                    notification.error({
                        message: res.data.message
                    })
                    setLoading(false)
                }
            })
        }

    return (
        <div className="layout-login">
            <img src={bg} alt="" className="layout-login-image"/>
            <img src={bg_girl} alt="" className="layout-login-image-girl"/>
            <img src={logo_usth} alt="" className="layout-login-image-logo"/>
                <Form
                    onFinish={onFinish}
                    layout={"vertical"}
                    className="layout-login-form"
                >
                    <Typography className="layout-login-form-content">LOGIN!</Typography>
                    <Form.Item
                        name={"username"}
                        label={"Username"}
                        rules={[{
                            required: true,
                            message: "Please fill your input username"
                        }]}
                    >
                        <InputCommon 
                            size={"large"} 
                            placeholder={"Input student ID"} 
                        />
                    </Form.Item>
                    <Form.Item
                        name={"password"}
                        label={"Password"}
                        rules={[{
                            required: true,
                            message: "Please fill your input password"
                        }]}
                    >
                        <Input.Password 
                            placeholder={"Input password"}
                            size={"large"} 
                        />
                    </Form.Item>
                    <Typography>Forget password?</Typography>
                    <Button htmlType="submit" className="layout-login-form-button" loading={loading}>Sign in</Button>
                </Form>
        </div>
    )
}

export default Login
