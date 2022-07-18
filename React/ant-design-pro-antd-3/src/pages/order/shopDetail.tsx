import React, { Component } from 'react'
import router, { RouteData } from 'umi/router'
interface ShopDetailProps {
    location:RouteData,
    match:any
}
 
interface ShopDetailState {
    
}
 
class ShopDetail extends Component<ShopDetailProps, ShopDetailState> {
    state = { n:null  }
    componentDidMount() { 
       const {location} = this.props
       console.log(this.props);
       console.log(this.props.match.params);
     }
    render() { 
        

        return ( <div>详情</div> );
    }
}
 
export default ShopDetail;