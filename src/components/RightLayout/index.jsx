import React from "react"
import {Layout} from "antd"
import {Content, Footer, Header} from "antd/es/layout/layout"
import {NavLink, Route, Routes} from "react-router-dom"
import AllUsers from "../Users/AllUsers"
import VipUsers from "../Users/VipUsers"
import LockedUsers from "../Users/LockedUsers"
import SelectGoods from "../Goods/SelectGoods"
import AddGoods from "../Goods/AddGoods"
import Votes from "../DIY/Votes"
import Material from "../DIY/Material"
import Index from "../Index"
import "./index.css"
import UpdateGoods from "../Goods/UpdateGoods"

const RightLayout = () => {
    return (
        <>
            <Layout>
                <Header id="header">
                    <div id="headerContent">
                        奶茶后台管理中心
                    </div>
                </Header>

                <Content style={{margin: "0 16px"}}>
                    <NavLink id={'index'} to={"/"}/>
                    <NavLink id={'AllUsers'} to={"/AllUsers"}/>
                    <NavLink id={'VipUsers'} to={"/VipUsers"}/>
                    <NavLink id={'LockedUsers'} to={"/LockedUsers"}/>
                    <NavLink id={'SelectGoods'} to={"/SelectGoods"}/>
                    <NavLink id={'UpdateGoods'} to={"/UpdateGoods"}/>
                    <NavLink id={'AddGoods'} to={"/AddGoods"}/>
                    <NavLink id={'Votes'} to={"/Votes"}/>
                    <NavLink id={'Material'} to={"/Material"}/>

                    <Routes>
                        <Route path={"/"} element={<Index/>} />
                        <Route path={"/AllUsers"} element={<AllUsers/>}/>
                        <Route path={"/VipUsers"} element={<VipUsers/>}/>
                        <Route path={"/LockedUsers"} element={<LockedUsers/>}/>
                        <Route path={"/SelectGoods"} element={<SelectGoods/>}/>
                        <Route path={"/UpdateGoods"} element={<UpdateGoods/>}/>
                        <Route path={"/AddGoods"} element={<AddGoods/>}/>
                        <Route path={"/Votes"} element={<Votes/>}/>
                        <Route path={"/Material"} element={<Material/>}/>
                    </Routes>
                </Content>

                <Footer style={{textAlign: "center",}}>
                    made by howone
                    @奶茶管理后台
                </Footer>
            </Layout>
        </>
    )
}

export default RightLayout