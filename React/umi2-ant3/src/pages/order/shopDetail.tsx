import React, { Component } from 'react'
import { Button } from 'antd'

// 引入建模的依赖
import BpmnModeler from 'bpmn-js/lib/Modeler'
import { xmlstr } from '../../utils/testxml'

// 添加了右侧的属性面板  type: camunda
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';

import styles from './style.less'

// 左侧工具栏及编辑节点的样式
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';

// BPMN国际化
import customTranslate from './js/customTranslate'
var customTranslateModule = {
    translate: ['value', customTranslate],
}

interface ShopDetailProps {

}

interface ShopDetailState {

}
let bpmnModeler: any = null
class ShopDetail extends Component<ShopDetailProps, ShopDetailState> {
    state = { name: '' }
    componentDidMount() {
        bpmnModeler = new BpmnModeler({
            container: '#container',
            height: '100vh',
            propertiesPanel: {
                parent: '#properties-panel'
            },
            additionalModules: [
                propertiesPanelModule,
                propertiesProviderModule,
                // 国际化
                customTranslateModule,
            ],
            moddleExtensions: {
                camunda: camundaModdleDescriptor
            }
        })
        this.createBpmnDiagram()
    }

    createBpmnDiagram = async () => {
        try {
            const result = await bpmnModeler.importXML(xmlstr)
        } catch (e) {
            console.log(e);

        }
    }
    render() {
        return (<div>
            <div
                id="container"
                className="canvas"
            ></div>
            <div
                id="properties-panel"
                className="properties-panel-parent"
                style={{ position: 'absolute', right: 0, top: 0, width: 300 }}
            ></div>
        </div>);
    }
}

export default ShopDetail;