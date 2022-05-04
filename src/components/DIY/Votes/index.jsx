import {Divider, List, Skeleton, Statistic} from "antd"
import React, {useEffect, useState} from "react"
import InfiniteScroll from "react-infinite-scroll-component"

const Votes = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const loadMoreData = () => {
        if (loading) {
            return
        }
        setLoading(true)
        fetch("https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo")
            .then(res => res.json())
            .then(body => {
                setData([...data, ...body.results])
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
                height: "100vh",
                overflow: "auto",
                padding: "0 16px",
                border: "1px solid rgba(140, 140, 140, 0.35)",
            }}
        >
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < 50}
                loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
                endMessage={<Divider plain>已加载所有用户</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <List.Item.Meta title={"DIY作品名:xxx"} description={"作者名:xxx"}/>
                            <Statistic title="投票数" value={10}/>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    )
}

export default Votes