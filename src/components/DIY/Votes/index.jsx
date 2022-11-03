import {Button, Divider, List, message, notification, Popconfirm, Skeleton, Statistic} from "antd"
import React, {useEffect, useState} from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import {CloseCircleOutlined, LockOutlined, PlayCircleTwoTone, UnlockOutlined} from "@ant-design/icons"

const Votes = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [showNameState,setShowNameState] = useState(false)

    const loadMoreData = () => {
        if (loading) {
            return
        }
        setLoading(true)
        fetch("http://localhost:8081/allVotes")
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

    // 结束投票
    const finish = () => {
        fetch(
            "http://localhost:8081/finish",
            {
                method: "GET",
                mode: "cors",
                // 携带cookie
                credentials: "include",
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

    // 切换名称显示
    const show = () => {
        // 如果当前正显示名字,则切换为隐藏
        if (showNameState) {
            setShowNameState(false)
            let p = document.querySelectorAll(".p")
            for (let i=0;i<p.length;i++) {
                p[i].innerHTML = "用户名称已隐藏"
            }
        } else {
            // 如果正隐藏，则显示名字
            setShowNameState(true)
            let btns = document.querySelectorAll(".names")
            for (let i=0;i<btns.length;i++) {
                btns[i].click()
            }
        }
    }

    // 获取具体原料名
    const showDetail = item => {
        return function () {
            fetch(
                "http://localhost:8081/detail",
                {
                    method: "POST",
                    mode: "cors",
                    // 携带cookie
                    credentials: "include",
                    body: JSON.stringify(item)
                }).then(response => {
                return response.json()
            }).then(data => {
                notification.open({
                    message: item.goods_name+"的原料如下:",
                    description: data.toString(),
                    onClick: () => {
                        // eslint-disable-next-line no-restricted-globals
                        location.replace("http://localhost:3000/Material")
                    },
                })
            })
        }
    }
    // 获取用户名
    const showName = item => {
        return function () {
            fetch(
                "http://localhost:8081/username",
                {
                    method: "POST",
                    mode: "cors",
                    // 携带cookie
                    credentials: "include",
                    body: JSON.stringify(item)
                }).then(response => {
                return response.json()
            }).then(data => {
                document.querySelector("#"+item.goods_name).innerHTML = "用户名称:" + data
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
            <div style={{backgroundImage: "linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%)"}}>
                <Button
                    onClick={show}
                    type={"primary"}
                    icon={showNameState?<CloseCircleOutlined/>:<PlayCircleTwoTone/>}
                    style={{
                        marginTop: "20px",
                        marginBottom: "20px",
                        width: "120px",
                        height: "50px",
                        position: "relative",
                        left: "40%"
                    }}>
                    {showNameState?"隐藏用户":"显示用户"}
                </Button>
                <Button
                    onClick={finish}
                    danger
                    type={"primary"}
                    style={{
                        marginTop: "20px",
                        marginBottom: "20px",
                        width: "100px",
                        height: "50px",
                        position: "relative",
                        left: "45%"
                    }}>
                    归档
                </Button>
            </div>
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={false}
                loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
                endMessage={<Divider plain>已加载所有投票情况</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <List.Item.Meta title={"DIY作品名:" + item.goods_name} description={"作者id:" + item.user_id}/>
                            <div style={{
                                height:"50px",
                                width:"150px",
                                position:"relative",
                                right:"700px",
                                backgroundImage: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
                                lineHeight:"50px",
                                textAlign:"center"
                            }}>
                                {
                                    showNameState ? <UnlockOutlined/> : <LockOutlined/>
                                }
                                <p style={{display:"inline-block"}} id={item.goods_name} className="p">用户名称已隐藏</p>
                            </div>
                            <div style={{display:"none"}}>
                                <Button onClick={showName(item)} className={"names"}>显示用户</Button>
                            </div>

                            <div style={{marginRight: "80px"}}>
                                <Button type="primary" onClick={showDetail(item)}>
                                    查看原料
                                </Button>
                            </div>
                            <Statistic title="投票数" value={item.votes}/>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    )
}

export default Votes