import {Menu} from "antd"
import {AccountBookOutlined, UserOutlined, HeartOutlined} from "@ant-design/icons"
import React from "react"
import Sider from "antd/es/layout/Sider"
import Info from "../Info"
import './index.css'

const LeftSider = () => {
    const click = (e) => {
        const option = "#" + e.key
        document.querySelector(option).click()
    }

    return (
            <Sider>
                <Info/>
                <Menu theme="dark" mode="inline">
                    <Menu.SubMenu key="userMenu" title="用户管理" icon={<UserOutlined/>}>
                        <Menu.Item key="AllUsers" onClick={click}>
                            全体用户列表
                        </Menu.Item>
                        <Menu.Item key="VipUsers" onClick={click}>
                            会员用户列表
                        </Menu.Item>
                        <Menu.Item key="LockedUsers" onClick={click}>
                            冻结用户列表
                        </Menu.Item>
                    </Menu.SubMenu>

                    <Menu.SubMenu key="goodsMenu" title="商品管理" icon={<AccountBookOutlined/>}>
                        <Menu.Item key="SelectGoods" onClick={click}>
                            查看商品
                        </Menu.Item>
                        <Menu.Item key="AddGoods" onClick={click}>
                            添加商品
                        </Menu.Item>
                        <Menu.Item key="DeleteGoods" onClick={click}>
                            删除商品
                        </Menu.Item>
                        <Menu.Item key="UpdateGoods" onClick={click}>
                            更改商品
                        </Menu.Item>
                    </Menu.SubMenu>

                    <Menu.SubMenu key="DIYMenu" title="DIY管理" icon={<HeartOutlined/>}>
                        <Menu.Item key="Votes" onClick={click}>
                            查看DIY投票
                        </Menu.Item>
                        <Menu.Item key="AddDIY" onClick={click}>
                            添加DIY商品
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Sider>
    )
}

export default LeftSider
