import React from "react"
import {Button, Form, Input, message} from "antd"

const Login = props => {
    // checkAdmin 提交登录表单
    const checkAdmin = (values) => {
        fetch(
            "http://localhost:8081/adminLogin",
            {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(values)
            }).then(response => {
            return response.json()
        }).then(data => {
            if (data === "yes") {
                props.setIsLogin(true)
            } else if (data === "no") {
                message.error("请检查账号密码")
            } else {
                message.error("未知错误")
            }
        })
    }

    return (
        <Form name="basic" labelCol={{span: 8}} wrapperCol={{span: 16}} onFinish={checkAdmin}>
            <Form.Item label="Username" name="uname" rules={[{required: true, message: '请输入用户名'}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Password" name="passwd" rules={[{required: true, message: '请输入密码'}]}>
                <Input.Password/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">登陆</Button>
            </Form.Item>
        </Form>
    )
}

export default Login