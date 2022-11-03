import React from "react"
import './index.css'
import {Button,message} from "antd"

const AddGoods = () => {
    // 上传商品信息到数据库,不包含商品图片
    const addGood = () => {
        let name = document.querySelector("#name").value
        let price = document.querySelector("#price").value
        let good = {
            "sname": name,
            "price": parseFloat(price),
            "picture": name + ".jpeg"
        }
        fetch(
            "http://localhost:8081/addGood",
            {
                method: "POST",
                mode: 'cors',
                // 携带cookie
                credentials: 'include',
                body:JSON.stringify(good)
            }).then(response => {
            return response.json()
        }).then(data => {
            // 添加成功
            if (data === "yes") {
                // eslint-disable-next-line no-restricted-globals
                location.reload()
            } else if (data === "no_token" || data === "no") {
                message.error("请登录")
            }
        })
    }

    // 上传图片
    const upload = () => {
        let file = document.querySelector("#file")
        const fd = new FormData()
        fd.append('file', file.files[0])
        fetch('http://howone.vip:8080/upload', {
            method: 'POST',
            body: fd,
        }).then(res => {
            return res.json()
        }).then(data => {
            // 上传成功
            if (data === "yes") {
                // eslint-disable-next-line no-restricted-globals
                message.success('上传图片成功')
            } else if (data === "no") {
                message.error("上传失败")
            }
        })
    }

    return (
        <div id="addGoods" style={{backgroundImage: "linear-gradient(135deg, #c3cfe2 0%, #f5f7fa 100%)"}}>
            <form>
                <input id="name" className="input" placeholder="商品名称" style={{width:"350px"}}/>
                <input id="price" className="input" placeholder="商品价格" style={{width:"350px"}}/>
                <input className="input" type="file" name="file" id="file"/>
                <Button style={{position:"relative",left:"50px"}} onClick={upload} danger type="primary">上传商品图片</Button>
                <br/>
                <Button onClick={addGood} type="primary" style={{position:"relative",left:"270px",top:"40px"}}>添加商品</Button>
            </form>
        </div>
    )
}

export default AddGoods