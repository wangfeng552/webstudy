import React, { useContext } from 'react'
import {TestContext} from './hookParent'
const HookChild = ()=>{
    const value = useContext(TestContext);
    return (
        <div>
            {(() => console.log('Child1-render'))()}
            <h3>Child1-value: {value}</h3>
        </div>
    );
}

export default HookChild