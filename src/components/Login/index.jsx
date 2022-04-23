import React from "react"
import {Button, Form, Input} from "antd"

const Login = props => {
    // 登录成功
    const onFinish = (values) => {
        console.log('Success:', values)
        props.setIsLogin(true)
    }

    // 登录失败
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    return (
        <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} initialValues={{remember: true,}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
            <Form.Item label="Username" name="username" rules={[{required: true, message: '请输入用户名'}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{required: true, message: '请输入密码'}]}>
                <Input.Password/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16,}}>
                <Button type="primary" htmlType="submit">登陆</Button>
            </Form.Item>

        </Form>
    )
}

export default Login