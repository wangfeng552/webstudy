import React, { Component } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
interface OrderProps {

}

interface OrderState {

}

class Order extends Component<OrderProps, OrderState> {
    state = { name: "" }
    render() {
        return (
            <PageHeaderWrapper>
            <div>
                <h3>

                    父组件
                </h3>

                {this.props.children}
            </div>
            </PageHeaderWrapper>
            )
    }
}

export default Order;