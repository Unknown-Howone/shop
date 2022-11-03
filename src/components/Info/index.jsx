import React, {useEffect} from "react"
import {Button, Drawer} from "antd"
import Login from "../Login"
import HasLogin from "../HasLogin"
import './index.css'

const Info = () => {
    // 登陆状态
    const [isLogin,setIsLogin] = React.useState(false)
    // 控制抽屉可不可见
    const [visible, setVisible] = React.useState(false)

    const showDrawer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }

    // 进入系统时尝试使用token来登录
    useEffect(()=>{
        fetch(
            "http://localhost:8081/tokenLogin",
            {
                method: "GET",
                mode: 'cors',
                // 携带cookie
                credentials: 'include',
            }).then(response => {
            return response.json()
        }).then(data => {
            if (data === "yes") {
                setIsLogin(true)
            } else if (data === "no") {
                setIsLogin(false)
            }
        })
    },[])

    return (
        <>
            <div id="logo">
                <Button type="primary" onClick={showDrawer} style={{width:"100%",height:"100%"}}>
                    管理员信息
                </Button>
            </div>
            <Drawer title="登陆" placement="left" onClose={onClose} visible={visible}>
                {/*根据登陆状态显示不同的组件*/}
                <div id={"loginContent"}>
                    {isLogin?<HasLogin setIsLogin={setIsLogin}/>:<Login setIsLogin={setIsLogin}/>}
                </div>
            </Drawer>
        </>
    )
}

export default Info