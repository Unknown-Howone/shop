import React from "react"
import {Layout} from "antd"
import {Content, Footer, Header} from "antd/es/layout/layout"
import {NavLink, Route, Routes} from "react-router-dom"
import AllUsers from "../Users/AllUsers"
import VipUsers from "../Users/VipUsers"
import LockedUsers from "../Users/LockedUsers"
import SelectGoods from "../Goods/SelectGoods"
import UpdateGoods from "../Goods/UpdateGoods"
import AddGoods from "../Goods/AddGoods"
import DeleteGoods from "../Goods/DeleteGoods"
import Votes from "../DIY/Votes"
import AddDIY from "../DIY/AddDIY"
import Index from "../Index"
import "./index.css"

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

                    <NavLink id={'AllUsers'} to={"/AllUsers"}/>
                    <NavLink id={'VipUsers'} to={"/VipUsers"}/>
                    <NavLink id={'LockedUsers'} to={"/LockedUsers"}/>
                    <NavLink id={'SelectGoods'} to={"/SelectGoods"}/>
                    <NavLink id={'AddGoods'} to={"/AddGoods"}/>
                    <NavLink id={'DeleteGoods'} to={"/DeleteGoods"}/>
                    <NavLink id={'UpdateGoods'} to={"/UpdateGoods"}/>
                    <NavLink id={'Votes'} to={"/Votes"}/>
                    <NavLink id={'AddDIY'} to={"/AddDIY"}/>

                    <Routes>
                        <Route path={"/"} element={<Index/>} />
                        <Route path={"/AllUsers"} element={<AllUsers/>}/>
                        <Route path={"/VipUsers"} element={<VipUsers/>}/>
                        <Route path={"/LockedUsers"} element={<LockedUsers/>}/>
                        <Route path={"/SelectGoods"} element={<SelectGoods/>}/>
                        <Route path={"/AddGoods"} element={<AddGoods/>}/>
                        <Route path={"/DeleteGoods"} element={<DeleteGoods/>}/>
                        <Route path={"/UpdateGoods"} element={<UpdateGoods/>}/>
                        <Route path={"/Votes"} element={<Votes/>}/>
                        <Route path={"/AddDIY"} element={<AddDIY/>}/>
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