import React from "react"
import {Avatar, Button} from "antd"
import {SmileTwoTone} from "@ant-design/icons"
import Title from "antd/es/typography/Title"

const HasLogin = props => {
    // 注销用户
    const leave = () => {
        props.setIsLogin(false)
    }

    return (
        <>
            <Avatar size={64} icon={<SmileTwoTone/>}/>
            <Title level={4}>已登录</Title>
            <Button onClick={leave}>注销</Button>
        </>
    )
}

export default HasLogin