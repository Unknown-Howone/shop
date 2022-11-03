import React, {useEffect, useState} from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import {Avatar, Button, Divider, List, Skeleton} from "antd"

const Material = () => {
    const [load, setLoad] = useState(false)
    const [data, setData] = useState([])

    const loadMoreData = () => {
        if (load) {
            return
        }
        setLoad(true)
        fetch("http://localhost:8081/material")
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

    const updateName = (item) => {
        return function () {
            item.mname = document.querySelector("#" + item.mname).value
            fetch("http://localhost:8081/u", {
                method: "POST",
                mode: "cors",
                credentials: "include",
                body: JSON.stringify(item),
            }).then(res => {
                return res.json()
            }).then(data => {
                // eslint-disable-next-line no-restricted-globals
                location.reload()
            })
        }
    }

    return (
        <div
            id="scrollableDiv"
            style={{
                backgroundColor: "lightyellow",
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
                endMessage={<Divider plain>已加载所有原料</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                avatar={<Avatar src={"http://howone.vip:8080/static/原料/" + item.picture}/>}
                                title={<a href="#">{item.mname}</a>}
                                description={"原料ID:" + item.id}
                            />
                            <input type="text" id={item.mname.toString()}/>
                            <div>
                                <Button type={"primary"} onClick={updateName(item)}>更改</Button>
                            </div>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    )
}

export default Material