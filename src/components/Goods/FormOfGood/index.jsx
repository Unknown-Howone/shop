import {Button, Divider, Input, message, Tooltip} from "antd"
import React,{useState} from "react"
import "./index.css"

const formatNumber = (value) => new Intl.NumberFormat().format(value)

const NumericInput = (props) => {
    const { value, onChange } = props;

    const handleChange = (e) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;

        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            onChange(inputValue);
        }
    }

    const handleBlur = () => {
        let valueTemp = value;

        if (value.charAt(value.length - 1) === '.' || value === '-') {
            valueTemp = value.slice(0, -1);
        }

        onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    }
    const title = value ? (
        <span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
    ) : (
        'Input a number'
    )
    return (
        <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
            <Input
                {...props}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Input a number"
                maxLength={25}
            />
        </Tooltip>
    )
}

const FormOfGood = props => {
    const [value, setValue] = useState('')

    const update = () => {
        // 注意类型
        props.item.price = parseFloat(value)
        fetch(
            "http://localhost:8081/updatePrice",
            {
                method: "POST",
                mode: 'cors',
                // 携带cookie
                credentials: 'include',
                body:JSON.stringify(props.item)
            }).then(response => {
            return response.json()
        }).then(data => {
            // 更改成功
            if (data === "yes") {
                // eslint-disable-next-line no-restricted-globals
                location.reload()
            } else if (data === "no_token" || data === "no") {
                message.error("请登录")
            }
        })
    }

    return (
        <div>
            <NumericInput style={{width: 120,}} value={value} onChange={setValue}/>
            <Button type="primary" onClick={update} style={{marginLeft:"20px"}}>更改</Button>
        </div>
    )
}

export default FormOfGood