import "./App.css"
import React from "react"
import {Layout} from "antd"
import LeftSider from "./components/LeftSider"
import RightLayout from "./components/RightLayout"

function App() {
    const [select,getSelect] = React.useState()

    return (
        <>
            <Layout style={{minHeight: "100vh"}}>
                <LeftSider select={select} getSelect={getSelect}/>
                <RightLayout select={select}/>
            </Layout>
        </>
    )
}

export default App
