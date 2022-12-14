import React,{useEffect, useState} from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import {Avatar, Button, Divider, Input, List, Skeleton, Tooltip} from "antd"
import NumericInput from "../FormOfGood"
import FormOfGood from "../FormOfGood"

const UpdateGoods = () => {
    const [load, setLoad] = useState(false)
    const [data, setData] = useState([])

    const loadMoreData = () => {
        if (load) {
            return
        }
        setLoad(true)
        fetch("http://localhost:8081/allGoods")
            .then(res => res.json())
            .then(body => {
                setData([...data, ...body])
                setLoad(false)
            })
            .catch(() => {
                setLoad(false)
            })
    }

    useEffect(() => {
        loadMoreData()
    }, [])

    return (
        <div
            id="scrollableDiv"
            style={{
                height: "100vh",
                overflow: "auto",
                padding: "0 16px",
                border: "1px solid rgba(140, 140, 140, 0.35)",
            }}
        >
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={false}
                loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
                endMessage={<Divider plain>已加载所有商品</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                avatar={<Avatar src={"http://howone.vip:8080/static/奶茶/" + item.picture}/>}
                                title={<a href="javascript:;">{item.sname}</a>}
                                description={"¥" + item.price}
                            />
                            <div>
                                <FormOfGood item={item}/>
                            </div>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    )
}

export default UpdateGoods