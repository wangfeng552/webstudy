import React, { Component } from 'react'
import {Button} from 'antd'
interface ChildUrlProps {
    userName: string;
    showName: () => void;
}

interface ChildUrlState {

}

function Warning(props: { warn: boolean }) {
    console.log(props)
    if (!props.warn) {
        return null
    }
    return (<div>警告</div>);
}

class ChildUrl extends Component<ChildUrlProps, ChildUrlState> {
    static defaultProps = {
        showName: () => { },
    };
    state = { name: "" }
    componentDidMount() {
        console.log(this);

    }
    chuandiName = (e:React.MouseEvent, age:number) => {
        console.log(e.target);
        console.log(age);
        this.props.showName()
    }
    render() {
        const { userName } = this.props
        let userMessage = '来消息了'
        return (
            <div>
                <Warning warn={true} />
                <div>我是父组件传过来的值：{userName}</div>
                <Button onClick={(e) => this.chuandiName(e, 12)}>触发父组件的方法</Button>
                {
                    userMessage && <div>有消息</div>
                }
            </div>
        );


    }
}

export default ChildUrl;