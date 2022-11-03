import React from "react"
import {Avatar, Button} from "antd"
import {SmileTwoTone} from "@ant-design/icons"
import Title from "antd/es/typography/Title"

const HasLogin = props => {
    // 注销用户
    const logout = () => {
        fetch(
            "http://localhost:8081/logout",
            {
                method: "GET",
                mode: 'cors',
                // 携带cookie
                credentials: 'include',
            }).then(response => {
            return response.json()
        }).then(data => {})
        props.setIsLogin(false)
        // eslint-disable-next-line no-restricted-globals
        location.replace("http://localhost:3000")
    }

    return (
        <>
            <Avatar size={64} icon={<SmileTwoTone/>}/>
            <Title level={4}>已登录</Title>
            <Button onClick={logout}>注销</Button>
        </>
    )
}

export default HasLogin