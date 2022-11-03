import React, {useEffect, useState} from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import {Avatar, Divider, List, Skeleton, Statistic} from "antd"

const VipUsers = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const loadMoreData = () => {
        if (loading) {
            return
        }
        setLoading(true)
        fetch("http://localhost:8081/allVipUsers")
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

    return (
        <div
            id="scrollableDiv"
            style={{
                backgroundImage:"linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
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
                            {
                                item.credit >= 1000
                                    ?
                                    <Statistic title="积分" value={item.credit} valueStyle={{color:"red"}}/>
                                    :
                                    <Statistic title="积分" value={item.credit}/>
                            }
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    )
}

export default VipUsers