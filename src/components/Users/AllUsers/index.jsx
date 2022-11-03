import React, {useEffect, useState} from "react"
import {Avatar, Button, Divider, List, message, Skeleton} from "antd"
import InfiniteScroll from "react-infinite-scroll-component"

const AllUsers = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const loadMoreData = () => {
        if (loading) {
            return
        }
        setLoading(true)
        fetch("http://localhost:8081/allUsers")
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

    // 冻结用户
    const freeze = item => {
        return function () {
            fetch(
                "http://localhost:8081/freeze",
                {
                    method: "POST",
                    mode: 'cors',
                    // 携带cookie
                    credentials: 'include',
                    body:JSON.stringify(item)
                }).then(response => {
                return response.json()
            }).then(data => {
                // 冻结成功
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
        <div id="scrollableDiv" style={{
            backgroundImage:"linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
            height: "100vh",
            overflow: "auto",
            padding: "0 16px",
            border: "1px solid rgba(140, 140, 140, 0.35)"
        }}>
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={false}
                loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
                endMessage={<Divider plain>已加载所有用户</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                avatar={<Avatar src={"http://howone.vip:8080/static/%E5%A5%B6%E8%8C%B6/%E7%BA%A2%E8%8C%B6.jpeg"}/>}
                                title={<a href="javascript:;">{item.uname}</a>}
                                description={item.status===1?"状态:正常":"状态:冻结"}
                            />
                            <div>
                                {
                                    item.is_vip === 1
                                        ?<p style={{color:"red",display:"inline-block"}}>尊贵的会员</p>
                                        :<p style={{display:"inline-block"}}>非会员用户</p>
                                }
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                {
                                    item.status === 1
                                        ? <Button type="primary" onClick={freeze(item)}>冻结</Button>
                                        : <Button type="dashed" disabled>冻结</Button>
                                }
                            </div>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    )
}

export default AllUsers