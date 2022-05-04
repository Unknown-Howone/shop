import React from "react"
import {Upload, message,Button, Form, Input} from "antd"
import { UploadOutlined } from '@ant-design/icons'
import './index.css'

const AddGoods = () => {
    const onFinish = (values) => {
        console.log("Success:", values)
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo)
    }

    const prop = {
        name: 'file',
        action: '',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
            }
        },
    }

    return (
        <div id="addGoods">
            <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} initialValues={{remember: true,}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                {/*输入商品名称*/}
                <Form.Item label="商品名称" name="goodsName" rules={[{required: true, message: "请输入商品名称",},]}>
                    <Input/>
                </Form.Item>
                {/*输入商品金额*/}
                <Form.Item label="金额" name="price" rules={[{required: true, message: "请输入商品价格",},]}>
                    <Input.Password/>
                </Form.Item>
                {/*上传图片*/}
                <Form.Item wrapperCol={{offset: 8, span: 16,}}>
                    <Upload {...prop}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
                {/*提交按钮*/}
                <Form.Item wrapperCol={{offset: 8, span: 16,}}>
                    <Button type="primary" htmlType="submit">
                        添加
                    </Button>
                </Form.Item>

            </Form>
        </div>
    )
}

export default AddGoods