import React, { Component } from 'react'
interface ListProps {
    
}
 
interface ListState {
    
}

function NumberList (props:{numbers:number[]}){
    const items = props.numbers
    const listItems = items.map((item,index)=>{
        return <li key={item+index}>{item}</li>
    })
    return (
        <ul>
            {listItems}
        </ul>
    )
}

class Nk extends React.Component<ListProps, ListState>{
    render(){
        console.log(this.props);
        
        return (<h2>12344444</h2>)
    }
}
 
class List extends React.Component<ListProps, ListState> {

    render() { 
        const numbers = [1,2,3,4,5,6]
        const total = numbers.reduce((prev,current,index)=>{
            return prev + current
        },0)

        let domShow = null
        if(false){
            domShow = <Nk numbers={numbers} />
        }else{
            domShow =  <NumberList numbers={numbers} />
        }

        return ( <div>
            <div>
                {domShow}
                <div>总计：{total}</div>
                <div>JSX渲染</div>
                {
                    numbers.map((item,index)=>(<li key={index}>{item}</li>))
                }
                <div>footer</div>
            </div>
        </div> );
    }
}
 
export default List;