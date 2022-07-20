import React, { Component } from 'react'
interface OrderProps {
    
}
 
interface OrderState {
    
}
 
class Order extends Component<OrderProps, OrderState> {
    state = { name:""  }
    render() { 
        return ( <div>
            父组件

            {this.props.children}
        </div> );
    }
}
 
export default Order;