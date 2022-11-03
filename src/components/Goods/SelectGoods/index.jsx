import React, {useEffect, useState} from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import {Avatar, Button, Divider, List, message, Skeleton} from "antd"

const SelectGoods = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const loadMoreData = () => {
        if (loading) {
            return
        }
        setLoading(true)
        fetch("http://localhost:8081/allGoods")
            .then(res => res.json())
            .then(body => {
                setData([...data, ...body])
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        loadMoreData()
    }, [])

    const del = item => {
        return function () {
            fetch(
                "http://localhost:8081/delGood",
                {
                    method: "POST",
                    mode: 'cors',
                    // 携带cookie
                    credentials: 'include',
                    body:JSON.stringify(item)
                }).then(response => {
                return response.json()
            }).then(data => {
                    if (data === "yes") {
                        // eslint-disable-next-line no-restricted-globals
                        location.reload()
                    } else if (data === "no_token" || data === "no") {
                        message.error("请登录")
                    }
            })
        }
    }

    const add = item => {
        return function () {
            fetch(
                "http://localhost:8081/unDelGood",
                {
                    method: "POST",
                    mode: 'cors',
                    // 携带cookie
                    credentials: 'include',
                    body:JSON.stringify(item)
                }).then(response => {
                return response.json()
            }).then(data => {
                if (data === "yes") {
                    // eslint-disable-next-line no-restricted-globals
                    location.reload()
                } else if (data === "no_token" || data === "no") {
                    message.error("请登录")
                }
            })
        }
    }

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
                                {
                                    item.is_add === 1
                                        ?
                                        <Button type="primary" danger onClick={del(item)} style={{marginRight:"20px"}}>下架</Button>
                                        :
                                        <div style={{position:"relative",left:"-20px"}}>
                                            <p style={{color:"red",display:"inline-block"}}>已下架,去上架——></p>
                                            &nbsp;
                                            &nbsp;
                                            &nbsp;
                                            <Button type="primary" onClick={add(item)}>上架</Button>
                                        </div>
                                }
                            </div>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    )
}

export default SelectGoods