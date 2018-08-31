<template>
  <div class="service-add" @click="clickPage"  v-loading.body="loadingMark">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{path:'/system/servicePublish/1'}">服务发布</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.query.produceId>0 ? '编辑服务' : '新增服务'}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-body">
      <div style="margin-left: 10px">
        <el-steps :space="400" :active="stepActive" finish-status="success" :align-center=true :center=true>
          <el-step title="服务展示信息"></el-step>
          <el-step title="服务阶段"></el-step>
          <!--<el-step title="阶段操作"></el-step>-->
        </el-steps>
      </div>
      <p v-if="stepActive != 0" class="current_paoviders_g">服务机构<span v-if="current_providers">{{current_providers.name}}</span></p>
      <div class="step step_one" v-if="0 == stepActive">
        <div class="line">
          <span>服务机构</span>
          <span>{{serviceOrganization.name}}</span>
        </div>
        <div class="line">
          <span>服务分类</span>
          <span>
          <el-select v-model="currentServiceCategories" placeholder="请选择" size="small" @change="changeListServiceCategories">
            <el-option
              v-for="item in listServiceCategories"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
            </span>
        </div>
        <div class="line">
          <span>服务名称</span>
          <span style="width: 300px">
             <el-select v-model="currentServiceCategoriesName" placeholder="请选择" size="small">
            <el-option
              v-for="item in listServiceCategoriesName"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          </span>
        </div>
        <div class="line">
          <span>服务范围</span>
          <span>上海市</span>
        </div>
        <div class="line">
          <span>服务费用</span>
          <el-radio-group v-model="radioCharge">
            <span class="span_in_el"> <el-radio :label="3">申请后可见</el-radio></span>
            <span class="span_in_el" style="width: 250px">
              <el-radio :label="6">￥</el-radio>
            <input :disabled="radioCharge != 6"
                   type="number"
                   style="position: relative;top: -5px;height: 32px"
                   class="base_input"
                   @keyup.native="keyupNativeOne"
                   v-model="fee_value_start">
              <span style="font-size: 14px;display: inline-block;margin-left: 10px">起</span>
            </span>
            <span class="span_in_el" style="width: 200px">
              <el-radio :label="9">￥</el-radio>
            <input :disabled="radioCharge != 9" type="number" style="position: relative;top: -5px;height: 32px" class="base_input" v-model="fee_value_fixed">
            </span>
          </el-radio-group>
        </div>
        <div class="line">
          <span>适用对象</span>
          <el-radio-group v-model="need_auth">
              <span class="span_in_el">
            <el-radio :label=false>全部企业</el-radio>
              </span>
            <span class="span_in_el">
            <el-radio :label=true>认证企业</el-radio>
            </span>
          </el-radio-group>
        </div>
      </div>
      <div class="step step_two" v-if="1 == stepActive || 2 == stepActive">
        <!-- left menu start-->
        <div class=left>
          <draggable v-model="stagesStepTwo" @start="dragStart" @end="drag=false" :move="onMove">
            <div v-for="(item, index) in stagesStepTwo" style="position: relative" class="menu_parent">
              <div style="overflow: hidden;" @click.stop="clickMenuParent(index)" class="menu_parent_item " :class="{ bg_selected_blue: item.isActive}">
                <div v-if="item.name.length<1">
                  <input placeholder="增加阶段名称" :name="index" @keyup.enter="keyDown"
                         style="margin-left: 46px;margin-bottom: 0px;width: 168px;height: 34px;" @blur="blueLeave" v-on:focus.stop="focusAddName()"></input>
                </div>
                <div class="state_name" style="float: left;margin-left: 46px;margin-bottom: 15px" v-if="item.name.length>0">{{item.name}}</div>
                <div v-if="item.name.length>0 && item.isActive && currentStageDetailStepTwo.category != 'finished'" style="float: right " @click.stop="showMenu(index,item)" class="icon_menu">
                  <img src="../../../assets/images/serviceadd/left_menu_right.png" style="margin-top: -10px">
                </div>
                <!-- 增加阶段 弹出框 start-->
                <div class="show_menu" v-if="item.show">
                  <ul>
                    <li @click.stop="addSection(index)">
                    <span class="icon_menu icon_menu_add">
                      <img src="../../../assets/images/serviceadd/add_menu.png" style="margin-top: -20px">
                    </span>
                      <span class="icon">新增阶段</span>
                    </li>
                    <li @click.stop="addSectionChild(index)" :class="{ menu_unsected_font_color: item.category !='normal'}">
                    <span class="icon_menu icon_menu_add">
                      <img src="../../../assets/images/serviceadd/menu_child.png" style="margin-top: -20px">
                    </span>
                      <span class="icon">新增子阶段</span>
                    </li>
                    <li @click.stop="renameSection(index)"  :class="{ menu_unsected_font_color: item.category !='normal'}">
                    <span class="icon_menu icon_menu_add">
                       <img src="../../../assets/images/serviceadd/comment.png" style="margin-top: -20px">
                    </span>
                      <span class="icon">重命名</span>
                    </li>
                    <li @click.stop="removeSection(index)"  :class="{ menu_unsected_font_color: item.category !='normal'}">
                    <span class="icon_menu icon_menu_add">
                      <img src="../../../assets/images/serviceadd/delete.png" style="margin-top: -20px">
                    </span>
                      <span class="icon">删除</span>
                    </li>
                  </ul>
                </div>
                <!-- 增加阶段 弹出框 end-->
              </div>
              <!-- if has child show menus  isActive controll extend-->
              <draggable v-model="item.children">
                <div v-for="(obj, index1) in item.children" style="position: relative" class="menu_child" v-if="item.isActive"
                     @click.stop="clickMenuChild(index,index1)" :class="{ bg_selected_blue: obj.isActive }">
                  <div v-if="obj.name.length>0" class="icon_menu_left" style="margin-left: 60px">

                    <img src="../../../assets/images/serviceadd/left_menu_child_left.png">
                  </div>
                  <div v-if="obj.name.length<1"><input placeholder="增加子阶段名称" :name="index" :alt="index1"
                                                       @keyup.enter="keyDownChild" style="margin-left: 60px;width: 140px;height: 34px;float: left;margin-top: 8px" @blur="blueLeaveChild"  v-on:focus="focusAddName()"></input></div>

                  <div class="state_name" v-if="obj.name.length>0">{{obj.name}}</div>
                  <div v-if="obj.name.length>0 && obj.isActive " class="icon_menu" style="float: right ;"
                       @click.stop="showMenuRow(index,index1)">
                    <img src="../../../assets/images/serviceadd/left_menu_right.png">
                  </div>
                  <!-- 此处是增加子阶段 的 显示 的 弹出框 start-->
                  <div class="show_menu show_menu_child" v-if="obj.show">
                    <ul>
                      <li @click.stop="addRow(index,index1)">
                    <span class="icon_menu icon_menu_add">
                      <img src="../../../assets/images/serviceadd/add_menu.png" style="margin-top: -20px">
                    </span>
                        <span class="icon">新增阶段</span>
                      </li>
                      <li class="menu_unsected_font_color">
                    <span class="icon_menu icon_menu_add">
                      <img src="../../../assets/images/serviceadd/menu_child.png" style="margin-top: -20px">
                    </span>
                        <span class="icon">新增子阶段</span>
                      </li>
                      <li @click.stop="renameRow(index,index1)">
                    <span class="icon_menu icon_menu_add">
                        <img src="../../../assets/images/serviceadd/comment.png" style="margin-top: -20px">
                    </span>
                        <span class="icon">重命名</span>
                      </li>
                      <li @click.stop="removeRow(index,index1)">
                    <span class="icon_menu icon_menu_add">
                         <img src="../../../assets/images/serviceadd/delete.png" style="margin-top: -20px">
                    </span>
                        <span class="icon">删除</span>
                      </li>
                    </ul>
                  </div>
                  <!-- 此处是增加子阶段 的 显示 的 弹出框 end-->
                </div>
              </draggable>
            </div>
          </draggable>
        </div>
        <!-- left menu end-->
        <div class="right"  v-if="1 == stepActive && currentStageDetailStepTwo.category != 'finished' ">
          <div class="header" v-if="currentStagesStepTwo && currentStagesStepTwo.name"><span>{{currentStagesStepTwo.name}}</span></div>
          <div>
            <!--操作设置 或则 合同阶段与服务申请的 特殊的头-->
            <div class="operation_setting" v-if="currentStagesStepTwo.category =='normal' ">
              <div class="set_header"><span>&nbsp</span><span style="display: inline-block">操作设置</span></div>
              <!--操作设置-->
              <div class="operation_setting_middle">
                <ul v-if="currentStageDetailStepTwoJi.op_settings">
                  <li>
                    <!--<input class="css_base_check" type="checkbox" id="check1" v-model="currentStageDetailStepTwo.op_settings.audit">-->
                    <input class="css_base_check"
                           :disabled="currentStageDetailStepTwo.is_lock"
                           type="checkbox"
                           id="check1"
                           v-model="currentStageDetailStepTwoJi.op_settings.audit">

                    <span class="css_bass_check_span">启用内部审核流程（该阶段需要内部审核通过后才可以进行下一个阶段）</span>
                    <div v-if="currentStageDetailStepTwoJi.op_settings && currentStageDetailStepTwoJi.op_settings.audit" class="ch_peo">
                      <ul>
                        <li>
                          <span class="css_text_blue css_cursor_pointer" style="font-size: 14px" @click="chooseAudit">选择内审</span>
                        </li>
                        <li v-if="currentStageDetailStepTwo.audit_setting.id>0" class="ch_peo_item" style="font-size: 14px">
                          {{currentStageDetailStepTwo.audit_setting.name}}
                          <i class="icon_del css_text_del css_cursor_pointer" @click="deleteAuditOrOpeartion(1)">X</i>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <input :disabled="currentStageDetailStepTwo.is_lock"
                           class="css_base_check"
                           type="checkbox"
                           id="check1"
                           v-model="currentStageDetailStepTwo.op_settings.operation">
                    <!--<input class="css_base_check" type="checkbox" id="check1" v-model="currentStageDetailStepTwo.op_settings.operation">-->
                    <span class="css_bass_check_span">启用阶段完成变更操作者（进入下一个阶段时需要选择操作者）</span>
                    <div v-if="currentStageDetailStepTwoJi.op_settings.operation" class="ch_peo">
                      <ul>
                        <li>
                          <span class="css_text_blue css_cursor_pointer" style="font-size: 14px" @click="chooseOperation">选择操作人</span>
                        </li>
                        <li v-if="currentStageDetailStepTwo.operation_setting.id>0" class="ch_peo_item" style="font-size: 14px">
                          {{currentStageDetailStepTwo.operation_setting.name}}
                          <i class="icon_del css_text_del css_cursor_pointer" @click="deleteAuditOrOpeartion(2)">X</i>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <input class="css_base_check" type="checkbox" id="check1" v-model="currentStageDetailStepTwo.op_settings.comment">
                    <span class="css_bass_check_span">启用阶段评价（该阶段完成后进入下个阶段系统会发送评价让企业进行填写）</span>
                  </li>
                </ul>
              </div>
            </div>
            <!--合同阶段与服务申请 对应的部分 start  -->
            <div class="service_contract" v-if="currentStagesStepTwo.category == 'apply' || currentStagesStepTwo.category == 'contract'">
              <!--开始与关闭阶段-->
              <div class="service_contract_menu css_cursor_pointer" @click="changeLockState()">
                <span class="icon_menu">
                  <img src="../../../assets/images/serviceadd/right_jinyong.png" v-if="currentStageDetailStepTwo.is_lock">
                  <img src="../../../assets/images/serviceadd/right_qidong.png"  v-else>
                </span>
                <span  v-if="currentStageDetailStepTwo.is_lock">启动阶段</span>
                <span  v-else>禁用阶段</span>
              </div>
              <!--中间的 选择项目 start -->
              <div class="service_contract_middle">
                <ul v-if="currentStageDetailStepTwoJi.op_settings">
                  <li>
                    <input class="css_base_check"
                           :disabled="currentStageDetailStepTwo.is_lock"
                           type="checkbox"
                           id="check1"
                           v-model="currentStageDetailStepTwoJi.op_settings.audit">

                    <span class="css_bass_check_span">启用内部审核流程（该阶段需要内部审核通过后才可以进行下一个阶段）</span>

                    <div v-if="currentStageDetailStepTwoJi.op_settings && currentStageDetailStepTwoJi.op_settings.audit" class="ch_peo">
                      <ul>
                        <li>
                          <span class="css_text_blue css_cursor_pointer" @click="chooseAudit">选择内审</span>
                        </li>
                        <li v-if="currentStageDetailStepTwo.audit_setting.id>0" class="ch_peo_item">
                          {{currentStageDetailStepTwo.audit_setting.name}}
                          <i class="icon_del css_text_del css_cursor_pointer " @click="deleteAuditOrOpeartion(1)">X</i>
                        </li>
                      </ul>
                    </div>

                  </li>
                  <li>
                    <input :disabled="currentStageDetailStepTwo.is_lock"
                           class="css_base_check"
                           type="checkbox"
                           id="check1"
                           v-model="currentStageDetailStepTwo.op_settings.operation">
                    <span class="css_bass_check_span">启用阶段完成变更操作者（进入下一个阶段时需要选择操作者）</span>
                    <div v-if="currentStageDetailStepTwoJi.op_settings.operation" class="ch_peo">
                      <ul>
                        <li>
                          <span class="css_text_blue css_cursor_pointer" @click="chooseOperation">选择操作人</span>
                        </li>
                        <li v-if="currentStageDetailStepTwo.operation_setting.id>0" class="ch_peo_item">
                          {{currentStageDetailStepTwo.operation_setting.name}}
                          <i class="icon_del css_text_del css_cursor_pointer" @click="deleteAuditOrOpeartion(2)">X</i>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <input  :disabled="currentStageDetailStepTwo.is_lock" class="css_base_check" type="checkbox" id="check1" v-model="currentStageDetailStepTwo.op_settings.comment">
                    <span class="css_bass_check_span">启用阶段评价（该阶段完成后进入下个阶段系统会发送评价让企业进行填写)</span>
                  </li>
                  <li v-if="currentStageDetailStepTwo.category == 'contract'">
                    <input  :disabled="currentStageDetailStepTwo.is_lock" class="css_base_check" type="checkbox" id="check1" v-model="currentStageDetailStepTwo.op_settings.year">
                    <span class="css_bass_check_span">启用申报年份（启用后服务可以在企业确认合同草案后录入申报的年份）</span>
                  </li>
                </ul>
              </div>
              <!--中间的 选择项目 end -->
              <!--上传表单 or 上传文件的 部分-->

              <!--服务申请 对应的是表单-->
              <div v-if="currentStagesStepTwo.category == 'apply'" class="choose_form"  :class="{ css_opacity_dark:currentStageDetailStepTwo.is_lock }">
                <!--服务申请 对应的是表单-->
                <div  @click.stop="chooseForm()" class="css_cursor_pointer">
                   <span class="icon_menu">
                  <img src="../../../assets/images/serviceadd/right_choose_form.png">
                </span>
                  <span>选择表单</span>
                </div>

                <div class="choose_form_content">
                  <!--下面选择之后的 样式-->
                  <div v-if="currentProviderFormItem.name" class="flie_item" >
                  <span class="icon_menu">
                     <img src="../../../assets/images/serviceadd/text.png">
                  </span>
                    <span>
                    {{currentProviderFormItem.name}}
                  </span>
                    <span class="icon_menu css_cursor_pointer" @click="removeCurrentFormItem">
                     <img src="../../../assets/images/serviceadd/delete.png">
                  </span>
                  </div>
                </div>

              </div>
              <!--合同阶段 对应的是上传文件-->
              <div  v-else class="compact_stage">
                <div class="first">
                  <span>请上传合同文件，单个文件大小不能超过20MB，支持jpg、png、txt、doc、docx、xls、xlsx、ppt、pptx、pdf</span>
                </div>

                <div v-for="(item,i) in listFileContract" class="flie_item">
                <span class="icon_menu">
                <img src="../../../assets/images/serviceadd/text.png">
                </span>
                  <span>
                {{item.name}}
                </span>
                  <span class="icon_menu"  @click="removeInlistFileContract(i)">
                <img src="../../../assets/images/serviceadd/delete.png">
                </span>
                </div>
                <div style="margin: 0 auto;width: 80px;height: 50px">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :on-change="changeFileContract"
                    :show-file-list="false"
                    :auto-upload="false">
                    <el-button slot="trigger">选取文件</el-button>
                  </el-upload>
                </div>
              </div>

            </div>
          </div>
          <!--合同阶段与服务申请 对应的部分 end  -->

          <!--预设工单 start-->
          <div style="padding-bottom: 10px" v-if="currentStagesStepTwo.category == 'normal'" class="word_order_pre">
            <div class="set_header"><span>&nbsp</span><span style="display: inline-block">预设工单</span></div>
            <!--根据数据每块显示 每块的 内容 start -->
            <div>

              <!-- 如果 没有任何选择，那么展示固定的东西-->
              <div class="addType" v-if="arrayWorkOrder.length<1">
                <img src="../../../assets/images/create/lvsetishi.png" height="15" width="14">
                请从右选择添加工单
              </div>
              <draggable v-model="arrayWorkOrder">

                <div v-for="(work,index) in arrayWorkOrder"  v-bind:key="index">
                  <!--文件确认 start-->
                  <div class="work_order order_type_one"  v-if="work.category == 'affirm'">
                    <div>
                      <span style="float: left">文件确认</span><span style="float: right;margin-right: 10px" @click.stop="deletFile(index)">
                      <img src="../../../assets/images/serviceadd/right_cha_nomal.png">
                    </span>
                    </div>
                    <div class="work_order_title"><span>*</span><span>标题</span><span style="width: 70%"><input type="text" style="width: 100%" placeholder="请输入标题" v-model="work.title"></span></div>
                    <div class="work_order_content" style="height: auto"><span>内容</span> <span style="width: 70%;margin-left: 20px">
                      <textarea style="width: 100%"  v-model="work.content"></textarea>
                      <!--<el-input-->
                      <!--type="textarea"-->
                      <!--:rows="2"-->
                      <!--placeholder="请输入内容"-->
                      <!--v-model="textarea">-->
                      <!--</el-input>-->
                    </span></div>
                  </div>
                  <!--文件确认 end-->
                  <!--索要文件 start-->
                  <div class="work_order order_type_one" v-if="work.category == 'demand'">
                    <div>
                      <span style="float: left">索要文件</span>
                      <span style="float: right;margin-right: 10px" @click.stop="deletFile(index)">
                       <img src="../../../assets/images/serviceadd/right_cha_nomal.png">
                    </span>
                    </div>
                    <div class="work_order_title"><span>*</span><span>标题</span><span style="width: 70%"><input type="text" style="width: 100%" placeholder="请输入标题"  v-model="work.title"></span></div>
                    <div class="work_order_content" style="height: auto"><span>内容</span> <span style="width: 70%;margin-left: 20px">
                      <textarea style="width: 100%" v-model="work.content">多行内容</textarea>
                      <!--<el-input-->
                      <!--type="textarea"-->
                      <!--:rows="2"-->
                      <!--placeholder="请输入内容"-->
                      <!--v-model="textarea">-->
                      <!--</el-input>-->
                    </span></div>

                  </div>
                  <!--索要文件 end-->

                  <!--发起支付 start-->
                  <div class="work_order order_type_one" v-if="work.category == 'pay'">
                    <div>
                      <span style="float: left">发起支付</span><span style="float: right;margin-right: 10px" @click.stop="deletFile(index)">
                       <img src="../../../assets/images/serviceadd/right_cha_nomal.png">
                    </span>
                    </div>
                    <div class="work_order_title"><span>*</span><span>标题</span><span style="width: 70%"><input type="text" style="width: 100%" placeholder="请输入标题"  v-model="work.title"></span></div>
                    <div style="height: auto">
                      <span><el-radio class="radio" v-model="work.fee_type" label="fill">填写金额</el-radio></span>
                      <span><el-radio class="radio" v-model="work.fee_type" label="fixed">固定金额</el-radio></span>
                      <span><input class="base_input" type="number" style="height: 32px" v-model="work.fee_value" :disabled="work.fee_type == 'fill'">元</span>
                    </div>
                    <div class="work_order_content" style="height: auto"><span>内容</span> <span style="width: 70%"><textarea style="width: 100%" v-model="work.content"></textarea></span></div>
                  </div>
                  <!--发起支付 end-->

                  <!--发送文件 start-->
                  <div class="work_order order_type_one"v-if="work.category == 'transmit'">
                    <div>
                      <span style="float: left">发送文件</span><span style="float: right;margin-right: 10px" @click.stop="deletFile(index)">
                       <img src="../../../assets/images/serviceadd/right_cha_nomal.png">
                    </span>
                    </div>
                    <div class="work_order_title"><span>*</span><span>标题</span><span style="width: 70%"><input type="text" style="width: 100%" placeholder="请输入标题"  v-model="work.title"></span></div>
                    <div class="work_order_content" style="height: auto"><span>内容</span> <span style="width: 70%"><textarea style="width: 100%"  v-model="work.content">多行内容</textarea></span></div>
                    <div class="work_order_temp css_cursor_pointer" >
                      <div>
                        <el-upload
                          class="upload-demo"
                          ref="upload"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          :file-list="fileList"
                          :on-change="changeFileWorkTransmit"
                          :show-file-list="false"
                          :multiple="true"
                          :auto-upload="false">
                          <div slot="trigger">
                            <img src="../../../assets/images/down.png">
                            <span class="span_button_underline" style="margin-left: -10px;display: inline-block">上传文件</span>
                          </div>
                        </el-upload>
                      </div>
                    </div>
                    <div v-for="(item,i) in work.attachments" class="flie_item">
                <span class="icon_menu">
                <img src="../../../assets/images/serviceadd/text.png">
                </span>
                      <span>
                {{item.name}}
                </span>
                      <span class="icon_menu"  @click="removeInlistFileWork(i)">
                <img src="../../../assets/images/serviceadd/delete.png">
                </span>
                    </div>
                  </div>
                  <!--文件确认 end-->

                  <!--发送通知 start-->
                  <div class="work_order order_type_one" v-if="work.category == 'notify'">
                    <div>
                      <span style="float: left">发送通知</span><span style="float: right;margin-right: 10px" @click.stop="deletFile(index)">
                       <img src="../../../assets/images/serviceadd/right_cha_nomal.png">
                    </span>
                    </div>
                    <div class="work_order_title"><span>*</span><span>标题</span><span style="width: 70%"><input type="text" style="width: 100%" placeholder="请输入标题"  v-model="work.title"></span></div>
                    <div style="height: auto" >
                      <span style="margin-left: 0px;font-size: 14px">占位符</span>
                      <span class="css_cursor_pointer" @click.stop="addPerch(item,index)">
                            <img src="../../../assets/images/serviceadd/date.jpg" >
                     </span>
                      <span class="css_cursor_pointer" @click.stop="addPerchInput(item,index)">
                            <img src="../../../assets/images/serviceadd/beizhu.png" >
                     </span>
                    </div>
                    <div class="work_order_content" style="height: auto"><span>内容</span> <span style="width: 70%"><textarea style="width: 100%"  v-model="work.content"></textarea></span></div>
                  </div>
                  <!--发送通知 end-->

                  <!--发送表单 start-->
                  <div class="work_order order_type_one"  v-if="work.category == 'sendform'">
                    <div>
                      <span style="float: left">发送表单</span><span style="float: right;margin-right: 10px" @click.stop="deletFile(index)">
                      <img src="../../../assets/images/serviceadd/right_cha_nomal.png">
                    </span>
                    </div>
                    <div class="base_button_icon_text css_cursor_pointer"   @click.stop="chooseForm(index)">
                      <img src="../../../assets/images/serviceadd/right_choose_form.png">
                      <span>选择表单</span>
                    </div>

                    <!--下面选择之后的 样式-->
                    <!--<div v-for="(item,i) in 10" class="flie_item">-->
                    <!--<span class="icon_menu">-->
                    <!--<img src="../../../assets/images/serviceadd/text.png">-->
                    <!--</span>-->
                    <!--<span>-->
                    <!--文件名字.text-->
                    <!--</span>-->
                    <!--<span>-->
                    <!--100M-->
                    <!--</span>-->
                    <!--<span class="icon_menu">-->
                    <!--<img src="../../../assets/images/serviceadd/delete.png">-->
                    <!--</span>-->

                    <!--</div>-->

                    <div class="choose_form_content">
                      <!--下面选择之后的 样式-->
                      <div v-if="work.bind_form.name" class="flie_item" style="margin-left: 0px">
                  <span class="icon_menu">
                     <img src="../../../assets/images/serviceadd/text.png">
                  </span>
                        <span>
                    {{work.bind_form.name}}
                  </span>
                        <span class="icon_menu css_cursor_pointer" @click="removeWorkProviderForm(index)">
                     <img src="../../../assets/images/serviceadd/delete.png">
                  </span>
                      </div>
                    </div>


                  </div>
                  <!--发送表单 end-->

                </div>
              </draggable>

            </div>

            <!--根据数据每块显示 每块的 内容 end -->
          </div>
          <!--预设工单 end-->

        </div>

        <div class="right_step_three"  v-if="2 == stepActive">

          <div class="right_header_base" v-if="currentStagesStepTwo.name"><span style="line-height: 40px;margin-top: 0px">{{currentStagesStepTwo.name}}</span></div>

          <div class="audit" v-if="currentRightDetailStepThreeJi && currentRightDetailStepThreeJi.op_settings && currentRightDetailStepThreeJi.op_settings.audit">
            <div class="set_header_css" style="float: left"><span>&nbsp</span><span style="display: inline-block">内部审核流程</span></div>
            <span class="span_text_nomal">审核操作必须通过后才能进入下一个阶段；审核不通过，回退给操作发起者</span>
            <div class="line">
              <span style="width: 5px;color: red;margin-top: 4px;margin-right: -3px;display: inline-block">*</span>
              <span style="font-weight: 100;width: auto">
                内审名称
              </span>
              <span style="margin-left: 10px">
                <input type="text" class="base_input" v-model="currentRightDetailStepThree.audit_name">
              </span>
            </div>
            <!--选择操作者 start -->
            <div class="choose_operators" v-if="currentRightDetailStepThreeJi && currentRightDetailStepThreeJi.audit_settings" v-for="(obj,index4) in list_audit">
              <span class="operators_del" v-if="0 != index4" @click="deleteOperatorItem(obj,index4)">删除</span>
              <div class="operator_item operator_header">
                <div class="operator_left">
                  <div class="default xz-oper-edit" @click="addPeople(index4)">
                    名字
                  </div>
                  <i class="bi"></i>
                  <div class="li_text">
                    角色
                  </div>
                  <!--<ul>-->
                  <!--<li class="li_icon">-->
                  <!--<img src="../../../assets/images/serviceadd/person_2.jpg">-->
                  <!--</li>-->
                  <!--<li class="li_text">-->
                  <!--名字-->
                  <!--</li>-->
                  <!--</ul>-->
                </div>
              </div>
              <div v-for="(item,index) in currentRightDetailStepThreeJi.audit_settings" class="operator_item">
                <!--左侧 第一个 -->
                <div class="operator_left" v-if="0 == index">
                  <ul>
                    <li class="li_icon">
                      <img src="../../../assets/images/serviceadd/person_1.jpg">
                    </li>
                    <li>
                        <span class="span_button">
                         操作发起者
                        </span>
                    </li>
                  </ul>
                </div>
                <!--左侧  中间-->
                <div class="operator_left" v-if=" 0!= index && index!= currentRightDetailStepThreeJi.audit_settings.length-1">
                  <ul>
                    <li class="li_icon">
                      <img src="../../../assets/images/serviceadd/person_2.jpg">
                      <img class="css_cursor_pointer img_del" src="../../../assets/images/serviceadd/right_cha_nomal.png" style="width: 16px;height: 16px;margin-top: -50px" @click.stop="removeOperators(index,1)">
                    </li>
                    <li class="li_des">
                        <span class="li_des">
                          {{item.user_or_role_name}}
                          <!--企业部|小强-->
                           </span>
                    </li>
                    <li class="li_select">
                      <!--TODO 需要优化UI 饿了么的插件就是 坑啊-->
                      <select v-model="item.audit_type" class="css_base_select" style="width: 100%">
                        <option v-for="option in Listaudit_type" v-bind:value="option.value">
                          {{ option.label }}
                        </option>
                      </select>
                    </li>
                  </ul>
                </div>
                <!--左侧 最后一个-->
                <div class="operator_left" v-if="index == currentRightDetailStepThreeJi.audit_settings.length-1" @click="addOperator(1)">
                  <ul>
                    <li class="li_add" >
                      <img src="../../../assets/images/serviceadd/person_add.jpg">

                    </li>
                  </ul>
                </div>
                <!--右侧-->
                <div class="operator_right" v-if="index != currentRightDetailStepThreeJi.audit_settings.length-1">
                  <!--<div class="operator_right">-->
                  <img src="../../../assets/images/serviceadd/arrows.png">
                </div>

              </div>
            </div>

            <div class="add_audit">
              <el-button type="primary" @click="addOperatorItem">添加内部流程</el-button>
            </div>
            <!--选择操作者 end -->
          </div>
          <div class="operationer" v-if="currentRightDetailStepThreeJi && currentRightDetailStepThreeJi.op_settings && currentRightDetailStepThreeJi.op_settings.operation">
            <div class="set_header_css"><span>&nbsp</span><span style="display: inline-block">阶段完成变更操作者</span></div>
            <div class="operation_setting_middle">

              <li>
                <input  type="radio" name="picked" value="current" v-model="operation_value" class="css_base_check">
                <span class="css_bass_check_span">由当前操作者继续操作</span>
              </li>
              <li>
                <input type="radio" name="picked" value="principal" v-model="operation_value" class="css_base_check">
                <span class="css_bass_check_span">由项目主负责人进行操作</span>
              </li>
              <li>
                <input type="radio" name="picked" value="setting" v-model="operation_value" class="css_base_check">
                <span class="css_bass_check_span">预设变更流程</span>
              </li>
            </div>

            <!--选择操作者 start -->
            <!--<div class="choose_operators" v-if="currentRightDetailStepThreeJi && currentRightDetailStepThreeJi.operation &&  currentRightDetailStepThreeJi.operation=='setting'">-->
            <div class="choose_operators" v-if="operation_value == 'setting'">



              <div v-for="(item,index) in currentRightDetailStepThreeJi.operation_settings" class="operator_item">
                <!--左侧 第一个 -->
                <div class="operator_left" v-if="0 == index">
                  <ul>
                    <li class="li_icon">
                      <img src="../../../assets/images/serviceadd/person_1.jpg">
                    </li>
                    <li>
                        <span class="span_button">
                         操作发起者
                           </span>
                    </li>
                  </ul>
                </div>
                <!--左侧  中间-->
                <div class="operator_left" v-if=" 0!= index && index!= currentRightDetailStepThreeJi.operation_settings.length -1">
                  <ul>
                    <li class="li_icon">
                      <img src="../../../assets/images/serviceadd/person_2.jpg">
                      <img class="css_cursor_pointer" src="../../../assets/images/serviceadd/right_cha_nomal.png" style="width: 16px;height: 16px;margin-top: -50px" @click.stop="removeOperators(index,2)">
                    </li>
                    <li class="li_des">
                        <span class="li_des">
                         {{item.user_or_role_name}}
                           </span>
                    </li>
                    <li class="li_select span_button" >
                      {{item.name}}
                    </li>
                  </ul>
                </div>
                <!--左侧 最后一个-->
                <div class="operator_left" v-if="index == currentRightDetailStepThreeJi.operation_settings.length -1" @click="addOperator(2)">
                  <ul>
                    <li class="li_add" >
                      <img src="../../../assets/images/serviceadd/person_add.jpg">
                    </li>
                  </ul>
                </div>
                <!--右侧-->
                <div class="operator_right" v-if="index != currentRightDetailStepThreeJi.operation_settings.length -1">
                  <img src="../../../assets/images/serviceadd/arrows.png">
                </div>
              </div>
            </div>
            <!--选择操作者 end -->

          </div>
        </div>
      </div>
    </div>
    <div class="step_footer">
      <div><el-button  @click.stop="backStep()">返回</el-button></div>
      <!--<div><el-button type="primary" @click.stop="nextStep()" v-if="this.stepActive != 2">下一步</el-button></div>-->
      <div><el-button type="primary" @click.stop="nextStep()" v-if="this.stepActive < 1">下一步</el-button></div>

      <div><el-button  @click="releaseProduct(true)" type="primary" :disabled="loadingMark" v-if="this.stepActive == 1">发布</el-button></div>
      <div><el-button  @click="releaseProduct(false)"  type="primary" :disabled="loadingMark" v-if="this.stepActive == 1">保存</el-button></div>

      <div><el-button type="primary" @click.stop="nextStepRelease()" v-if="this.stepActive == 2">发布</el-button></div>
      <div class="save"><el-button type="primary" @click.stop="nextStepSave()" v-if="this.stepActive == 2">保存</el-button></div>
    </div>

    <!-- 弹出框 总汇 start -->
    <div>
      <!--选择表单 服务申请 右侧栏 点击 选择表单 start -->
      <el-dialog
        title="表单"
        :visible.sync="showChooseForm"
        size="small"
        :before-close="handleClose">
        <div style="margin-bottom: 10px">
          <span style="margin-left: 30px">表单名称</span>
          <input type="text" class="base_input" style="height: 36px;margin-left: 5px" v-model="providerFormsSelect.name">
          <span>表单类型</span>
          <span style="margin-left: 5px">
             <el-select v-model="providerFormsSelect.selectCategory" placeholder="问卷">
            <el-option
              v-for="item in providerFormsSelect.category"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
          </span>
          <span style="margin-left: 40px">
            <el-checkbox v-model="providerFormsSelect.selectCommon">通用</el-checkbox>
          </span>
          <span style="margin-left: 5px">
            <el-button type="primary" @click="queryProviderForms">查询</el-button>
          </span>
        </div>
        <!--表格主体 start -->
        <div>
          <el-table
            :data="provider_forms_step_two"
            height=542
          style="width: 100%"  @row-click="selectProviderForm">
          <el-table-column
            prop="name"
            label="表单名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="表单类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="service.name"
            label="服务内容">
          </el-table-column>
          </el-table>
        </div>
        <!--分页start ===-->
        <div class="pagination">
          <div class="block">
            <el-pagination
              :current-page.sync="pageIndexForms"
              :page-size="10"
              layout="total, prev, pager, next"
              :total="pageCountForms"
              @current-change="handlePagingForms"
            >
            </el-pagination>
          </div>
        </div>
        <!--分页end ===-->

        <!--表格主体 end -->
        <span slot="footer" class="dialog-footer">
    <el-button @click="showChooseForm = false">取 消</el-button>
    <el-button type="primary" @click="showChooseForm = false">确 定</el-button>
     </span>
      </el-dialog>
      <!--选择表单 end -->
    </div>

    <!--右侧 的悬停 按钮-->
    <div class="suspension" id="suspension" ref="yulan" v-if="stepActive == 1 && currentStageDetailStepTwo.category == 'normal'">
      <ul>
        <li>工单类型</li>
        <li class="danhang" @click="addFile(0)">
          <!--<img src="../../../assets/images/serviceadd/confirm_file.png">-->
          <img src="../../../assets/images/serviceadd/work_1.png" height="15" width="15">
          确认文件
        </li>
        <li class="duohang" @click="addFile(1)">
          <!--<img src="../../../assets/images/serviceadd/require_file.png" height="15" width="15">-->
          <img src="../../../assets/images/serviceadd/work_2.png" height="15" width="15">
          索要文件
        </li>
        <li class="radio" @click="addFile(2)">
          <img src="../../../assets/images/serviceadd/work_3.png" height="15" width="15">
          <!--<img src="../../../assets/images/serviceadd/send_pay.png" height="15" width="15">-->
          发起支付
        </li>
        <li class="check" @click="addFile(3)">
          <!--<img src="../../../assets/images/serviceadd/send_file.png" height="15" width="15">-->
          <img src="../../../assets/images/serviceadd/work_4.png" height="15" width="15">
          发送文件
        </li>
        <li class="xiala" @click="addFile(4)">
          <!--<img src="../../../assets/images/serviceadd/send_not.png">-->
          <img src="../../../assets/images/serviceadd/work_5.png" height="15" width="15">
          发送通知
        </li>
        <li class="date" @click="addFile(5)">
          <img src="../../../assets/images/serviceadd/work_6.png" height="15" width="15">
          <!--<img src="../../../assets/images/serviceadd/send_form.png" height="15" width="15">-->
          发送表单
        </li>
      </ul>

    </div>
    <!--选择操作者 的弹框-->
    <div class="pop_operator">
      <el-dialog
        title="人员选择"
        :visible.sync="dialogOperator"
        size="small"
        :before-close="handleClose">
        <!-- 选择人员自定义内容 start-->
        <div class="pop_operator_content">

          <div class="left_operator operator_item">
            <ul>
              <li v-for="(item ,index) in ListCategoryType" @click="chooseCategoryType(item,index)" :class="{ bg_selected_blue: currentCategoryType.index == index}">
                {{item.name}}
              </li>
            </ul>
          </div>
          <div class="min_operator operator_item" v-if="currentCategoryType.category == 'role' || currentCategoryType.category == 'member'">
            <div class="li_header">
              部门
            </div>
            <ul style="height: 152px;">
              <li v-for="(item,index) in listDepartments" @click="chooseRolesOrSuppliers(item,index)" :class="{ bg_selected_blue: currentDepartmentIndex == index}"> {{item}}</li>
            </ul>
          </div>
          <div class="right_operator operator_item" v-if="currentCategoryType.category == 'role' || currentCategoryType.category == 'member'">
            <div class="li_header">
              {{currentRoleName}}
            </div>
            <ul style="height: 152px;">
              <li v-if="currentRoleName == '角色'" v-for="(item,index) in listRoles" @click="chooseRoles(item,index)" :class="{ bg_selected_blue: currentRoles.index == index}">{{item.name}}</li>
              <li v-if="currentRoleName == '人员'" v-for="(item,index) in listSuppliers" @click="chooseSuppliers(item,index)" :class="{ bg_selected_blue: currentSuppliers.index == index}"> {{item.name}}</li>
            </ul>
          </div>

          <!---->
          <div class="other_operator operator_item" v-if="currentCategoryType.category == 'leader' || currentCategoryType.category == 'underling'">

            <span >{{currentCategoryType.category | filterTextOne}}</span> <br>
            <span >{{currentCategoryType.category | filterTextTwo}}</span>

          </div>

        </div>
        <!-- 选择人员自定义内容 end-->
        <span slot="footer" class="dialog-footer">
    <el-button @click="cancelOperator">取 消</el-button>
    <el-button type="primary" @click="commitOperator">确 定</el-button>
  </span>
      </el-dialog>

    </div>


    <!--弹框选人-->
    <!--<div v-if="stage_operations">-->
    <el-dialog title="选择人员" :visible.sync="markChoosePeople">
      <el-table
        ref="singleTable"
        :data="listOpenation"
        highlight-current-row
        @row-click="handleRowChange"
        style="width: 100%">
        <el-table-column
          property="nameShow"
          label="角色或人员">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="markChoosePeople = false">取 消</el-button>
        <!--<el-button type="primary" @click="clickChoosePeople">确 定</el-button>-->
  </span>
    </el-dialog>

    <!--弹框选择内审 和 操作人变跟-->
    <el-dialog title="选择内审和变更操作者" :visible.sync="markAuditOrOperation">
      <el-table
        ref="singleTable"
        :data="listAuditOrOpenation"
        height=356
      highlight-current-row
      @row-click="handleRowChangeAudit"
      style="width: 100%">
      <el-table-column
        property="name"
        label="名称">
      </el-table-column>
      </el-table>

      <div class="pagination">
        <div class="block">
          <el-pagination
            :current-page.sync="pageIndexAudit"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="pageCountAudit"
            @current-change="handlePagingAudit"
          >
          </el-pagination>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="markAuditOrOperation = false">取 消</el-button>
    <el-button type="primary" @click="clickChooseAuditOrOperation">确 定</el-button>
  </span>
    </el-dialog>
    <!-- 弹出框 总汇 end -->
  </div>
  </div>
</template>

<script>
  import mainPart from 'components/common/mainPart.vue'
  import topBar from 'components/common/topBar.vue'
  import draggable from 'vuedraggable'
  import API from 'API/config'
  import { Loading } from 'element-ui';
  import {mapGetters} from 'vuex'
  export default {
    components: {topBar, mainPart,draggable},
    watch:{
      radioCharge(curVal,oldVal){
        if(curVal == 3){
          this.fee_value_start = '';
          this.fee_value_fixed = '';
        }else if(curVal == 6){
          this.fee_value_fixed = '';
        }else if(curVal == 9){
          this.fee_value_start = '';
        }
      },
    },
    data(){
      return {
        // data 新加 start ==========================================================
        isEditingMenu:false,//是否在编辑中，左侧栏目

        pageIndexForms:1, //表单当前请求页面
        pageCountForms:0, //表单一共多少个

        pageIndexAudit:1,  //选择内审和变更操作者 当前页数
        pageCountAudit:0,  //选择内审和变更操作者 总页数

        indexMenu:{
          section:-100,
          row:-100
        },

        listAudits:[],
        listOperation:[],
        listAuditOrOpenation:[],
        markAuditOrOperation:false,
        currentAuditOrOperation:null,//当前选中的 内审或者人员选择
        indexAuditOrOperation:0, //1，代表内审，2代表操作人
        // data 新加 end  ==========================================================
        markChoosePeople:false,
        list_audit:[{},{}],
        audit_type_value:"",
        operation_value:"",
// base start  ===
        loadingMark: false, //整页loading
// base end  ===
//    step one data  start ====
        serviceOrganization:{},//服务机构
        listServiceCategories:[], //当前服务分类列表
        currentServiceCategories:"",//当前选中的服务分类
        listServiceCategoriesName:[],//当前服务名称
        currentServiceCategoriesName:"",//当前选中的服务名称
        markClearurrentServiceCategoriesName:false,
        need_auth:true, // 适用对象（false: 全部企业， true: 认证企业）
        fee_value_start:"",
        fee_value_fixed:"",
        produce_id_copy:0,
//    step one data  end ====
//    step two data  start ====
        stagesStepTwo:[],  // 存在于第二步的时候的 左侧栏数据，从原始的拿过来 需要做很多的处理
        stagesStepTwoCopy:undefined,//用于保存出错时，再次重新赋值
        leftMenuStepTwo:[], //当到达第三步骤的时候，先将第二步的左侧栏目 保存起来，返回的时候 再直接用

        currentStagesStepTwo: {},// 左侧栏 选中的 当前 数据
        currentStageDetailStepTwo:{
          op_settings:{
            audit:false,
            operation:false,
            comment:false,
            year:false
          }
        },//左侧栏选中对应的右侧 的详情数据
        provider_forms_step_two:[],//服务申请 右侧栏 点击 选择表单的列表数据源
        currentProviderFormItem:{},// 弹出框 选中的 表单的 一项
        providerFormsSelect:{
          name:"",
          category:[
            {
              id:0,
              value:"申请表" // apply
            },
            {
              id:1,
              value:"问卷调查" // question
            }
          ],
          selectCategory:0,// 选中的那一项
          selectCommon:false //通用的选项
        },//弹出框 表单 的想着项总会
        listFileContract:[],// 合同阶段的 上传的文件 数组，选择的文件数组
        currentProduct:{}, // 创建成功 返回的产品
        focusState:false,//标记input 事件 是否在 焦点  特殊用法
        nextClickMark:{
          section:-1,
          row:-1
        },
        // 用于 标识 选择文件的时候的 是 项目的 还是 工单的
        chooseFormIndex:-100,
//    step two data  end ====
        //step three data  start ===============================================
        last_audit_settings:{},
        leftMenuStepThree:[],
        currentLeftMenuStepThree:{},// 左侧当前 目录 ，当前选中的
        currentRightDetailStepThree:{
          id:-100,
          audit_name:"",// 内审名称
          operation:"",// 阶段变更操作者设置   current principal setting
          is_lock:false,
          op_settings:{
            audit:false,
            comment:false,
            operation:false
          },

          audit_settings:[
            {category:"", // 流程人员类型 leader  underling role menber
              audit_type:"", //   流程步骤类型 assigner auditor
              department:"",  // 部门 若有
              role_id:"",  // 角色ID
              user_id:"",  // 用户ID
              id:-100,
            },
            {category:"", // 流程人员类型 leader  underling role menber
              audit_type:"", //   流程步骤类型 assigner auditor
              department:"",  // 部门 若有
              role_id:"",  // 角色ID
              user_id:"",  // 用户ID
              id:-100,  // 如果大于 0 那么就是 自己的，不是原来的
            }
          ],
          operation_settings :[
            {category:"", // 流程人员类型 leader  underling role menber
              audit_type:"", //   流程步骤类型 assigner auditor
              department:"",  // 部门 若有
              role_id:"",  // 角色ID
              user_id:"",  // 用户ID
              id:-100,
            },
            {category:"", // 流程人员类型 leader  underling role menber
              audit_type:"", //   流程步骤类型 assigner auditor
              department:"",  // 部门 若有
              role_id:"",  // 角色ID
              user_id:"",  // 用户ID
              id:-100,  // 如果大于 0 那么就是 自己的，不是原来的
            }
          ],
          category:"",
          publish:false

        },
        ListCategoryType:[
          {
            category:"leader",
            name:"直属领导"
          },
          {
            category:"underling",
            name:"直属下属"
          },
          {
            category:"role",
            name:"固定角色"
          },
          {
            category:"member",
            name:"固定人员"
          }
        ],
        currentCategoryType:{},//当前选中的 类型
        listDepartments:[],// 部门列表
        currentDepartment:null,
        currentDepartmentindex:-100,
        listRoles:[],//角色列表
        listSuppliers:[],//员工列表

        currentRoles:{}, // 当前选中的 角色
        currentSuppliers:{},//当前选中的 员工
        dialogOperator:false,
        dialogOperatorIndex:0,
        Listaudit_type:[
          {
            label:"分配者",
            value:"assigner"
          },
          {
            label:"审核者",
            value:"auditor"
          }
        ],
        //  step three data  end =================================================

        // 工单文件类型
        arrayWorkOrder:[
        ],
        stepActive: 0,
        markStep: 1,
        radioCharge: 3,
        optionsClassifyValue: '',
        optionsServiceNameVal: '',
        // 需要自己 加 children
        modelStage: {
          name: "",
          isActive: false, // 当前这个 是否处在活跃状态 ，显示在样式上是 选中 选中变蓝
          show: false,
          category: "normal",
          rank: 0,
          id:0,
          parent_id:0
        },
        arrayOperationMenu: [
          {
            icon: '',
            name: "新增阶段"
          },
          {
            icon: '',
            name: "新增子阶段"
          },
          {
            icon: '',
            name: "重命名"
          },
          {
            icon: '',
            name: "删除"
          }
        ],
        showChooseForm:false
      }
    },
    filters: {
      filterRole(value) {
//          if(this.isEmpty( value.name))
        return "这部分是新加的" + value;
      },

      filterTextOne(value) {
        var text = "";
        if(value == "leader"){
          text = "该操作将由操作发起者的上级领导进行操作。";
        }else if(value == "underling"){
          text = "该操作将由操作发起者的直属下属进行操作。";
        }
        return text;
      },
      filterTextTwo(value) {
        var text = "";
        if(value == "leader"){
          text = "注：如上级领导大于1人，则由发起者在上级领导中进行选择。";
        }else if(value == "underling"){
          text = "注：如直属下属大于1人，则由发起者在直属下属中进行选择。";
        }
        return text;
      },
      filter_peration_settings(arraySetting,index){
        if(arraySetting.length - 2 == index){
          return "操作者";
        }else {
          return "分配者";
        }
      }
    },
    // 计算属性
    computed: {
      ...mapGetters(["current_providers"]),
      currentRoleName(){
        if(!this.isEmpty(this.currentCategoryType.name) &&  this.currentCategoryType.name == "固定人员"){
          return "人员";
        }else {
          return "角色";
        }
      },
      currentStageDetailStepTwoJi(){
        var obj = this.currentStageDetailStepTwo;
        if(this.isEmpty(obj.op_settings)){
          var op = {};
          op.audit = false;
          op.operation = false;
          op.comment = false;
          op.year = false;
          obj.op_settings = op;
        }

        //audit_setting
//        operation_setting
        if(this.isEmpty(obj.audit_setting)){
          obj.audit_setting = {};
          this.$set(this.currentStageDetailStepTwo.audit_setting,'id',-100);
          this.$set(this.currentStageDetailStepTwo.audit_setting,'name','');
        }
        if(this.isEmpty(obj.operation_setting)){
          obj.operation_setting = {};
          this.$set(this.currentStageDetailStepTwo.operation_setting,'id',-100);
          this.$set(this.currentStageDetailStepTwo.operation_setting,'name','');
        }
        // op_settings 里面的值有可能是空的
        if(this.isEmpty(obj.op_settings.audit)) obj.op_settings.audit = false;
        if(this.isEmpty(obj.op_settings.comment)) obj.op_settings.comment  = false;
        if(this.isEmpty(obj.op_settings.operation)) obj.op_settings.operation = false;
        if(this.isEmpty(obj.op_settings.year)) obj.op_settings.year = false;

        return obj;
      },
      // 计算属性 右侧 详情
      currentRightDetailStepThreeJi(){
        var item = {
          id:-100,
          audit_name:"",// 内审名称
          operation:"",// 阶段变更操作者设置   current principal setting
          is_lock:false,
          op_settings:{
            audit:false,
            comment:false,
            operation:false
          },

          audit_settings:[
            {category:"", // 流程人员类型 leader  underling role menber
              audit_type:"", //   流程步骤类型 assigner auditor
              department:"",  // 部门 若有
              role_id:"",  // 角色ID
              user_id:"",  // 用户ID
              id:-100,
              user_or_role_name:""
            },
            {category:"", // 流程人员类型 leader  underling role menber
              audit_type:"", //   流程步骤类型 assigner auditor
              department:"",  // 部门 若有
              role_id:"",  // 角色ID
              user_id:"",  // 用户ID
              id:-100,  // 如果大于 0 那么就是 自己的，不是原来的
              user_or_role_name:""
            }
          ],
          operation_settings :[
            {category:"", // 流程人员类型 leader  underling role menber
              audit_type:"", //   流程步骤类型 assigner auditor
              department:"",  // 部门 若有
              role_id:"",  // 角色ID
              user_id:"",  // 用户ID
              id:-100,
              user_or_role_name:""
            },
            {category:"", // 流程人员类型 leader  underling role menber
              audit_type:"", //   流程步骤类型 assigner auditor
              department:"",  // 部门 若有
              role_id:"",  // 角色ID
              user_id:"",  // 用户ID
              id:-100,  // 如果大于 0 那么就是 自己的，不是原来的
              user_or_role_name:""
            }
          ],
          category:"",
          publish:false
        };

        if(this.currentRightDetailStepThree){
          if(!this.isEmpty(this.currentRightDetailStepThree.id)){
            item.id = this.currentRightDetailStepThree.id;
          }
          if(!this.isEmpty(this.currentRightDetailStepThree.audit_name)){
            item.audit_name = this.currentRightDetailStepThree.audit_name;
          }
          if(!this.isEmpty(this.currentRightDetailStepThree.operation)){
            item.operation = this.currentRightDetailStepThree.operation;
          }
          if(!this.isEmpty(this.currentRightDetailStepThree.is_lock)){
            item.is_lock = this.currentRightDetailStepThree.is_lock;
          }
          if(!this.isEmpty(this.currentRightDetailStepThree.category)){
            item.category = this.currentRightDetailStepThree.category;
          }
          if(!this.isEmpty(this.currentRightDetailStepThree.op_settings)){
            item.op_settings = this.currentRightDetailStepThree.op_settings;
          }
          if(!this.isEmpty(this.currentRightDetailStepThree.audit_settings) && this.currentRightDetailStepThree.audit_settings.length>0){
            item.audit_settings.splice(1,1);
            var that = this;
            this.currentRightDetailStepThree.audit_settings.forEach(function (obj,index) {
              if(!that.isEmpty(obj.id) && obj.id > 0) {
                if(obj.category == "leader"){
                  obj.user_or_role_name = "直属领导";
                }else if(obj.category == "underling"){
                  obj.user_or_role_name = "直属下属";
                }else {
                  var str = obj.department +"|"+obj.user_or_role_name;
                  obj.user_or_role_name = str;
                }

              }
              item.audit_settings.push(obj);
            });
            item.audit_settings.push( {category:"", // 流程人员类型 leader  underling role menber
              audit_type:"", //   流程步骤类型 assigner auditor
              department:"",  // 部门 若有
              role_id:"",  // 角色ID
              user_id:"",  // 用户ID
              id:-100,
              user_or_role_name:""
            })
          }
          var that = this;
          if(!this.isEmpty(this.currentRightDetailStepThree.operation_settings ) && this.currentRightDetailStepThree.operation_settings.length>0){
            item.operation_settings.splice(1,1);
            var length1 =  this.currentRightDetailStepThree.operation_settings.length;
            this.currentRightDetailStepThree.operation_settings.forEach(function (obj,index) {
              item.operation_settings.push(obj);

              if(!that.isEmpty(obj.id) && obj.id > 0) {
                if(obj.category == "leader"){
                  obj.user_or_role_name = "直属领导";
                }else if(obj.category == "underling"){
                  obj.user_or_role_name = "直属下属";
                }else {
                  var str = obj.department +"|"+obj.user_or_role_name;
                  obj.user_or_role_name = str;
                }
              }

              if(index == length1-1){
                obj.name = "操作者";
              }else {
                obj.name = "分配者";
              }
            });
            item.operation_settings.push({category:"", // 流程人员类型 leader  underling role menber
              audit_type:"", //   流程步骤类型 assigner auditor
              department:"",  // 部门 若有
              role_id:"",  // 角色ID
              user_id:"",  // 用户ID
              id:-100,
              user_or_role_name:""
            })
          }
        }
        return item;
      }
    },
    // 生命周期方法
    mounted: function () {
      Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
      };
      Array.prototype.remove = function (obj) {
        for (var i = 0; i < this.length; i++) {
          var temp = this[i];
          if (!isNaN(obj)) {
            temp = i;
          }
          if (temp == obj) {
            for (var j = i; j < this.length; j++) {
              this[j] = this[j + 1];
            }
            this.length = this.length - 1;
          }
        }
      };
      window.addEventListener('scroll', this.scrollChange);
      // 说明是 编辑进来的
      if(!this.isEmpty(this.$route.query.produceId) && this.$route.query.produceId>0){ // 说明是 不是新建的进来的 是编辑进来的
        if(!this.isEmpty(this.$route.query.edit) && this.$route.query.edit>0){ // 说明是编辑中的编辑进来的
          // 网络请求 获取 第一步的 详情页面
          this.getStepOneDetail(this.$route.query.produceId);
        }else {
          // 网络请求  copy
          this.cloneProducts(this.$route.query.produceId)
        }
      }else {
        this.getServiceDel();
      }
      this.getServiceCategories();
    },
    // 自定义方法
    methods: {
      //分页  当前点击的 页数
      handlePagingForms(indexPage){
        this.pageIndexForms = indexPage;
        // 网络请求
        this.getProviderForms();
      },
      handlePagingAudit(indexPage){
        this.pageIndexAudit = indexPage;
        //网络请求
        if( this.indexAuditOrOperation == 1){ //内审
          this.netGetListAudits(1);
        }else if(this.indexAuditOrOperation == 2){ //变更操作者
          this.netGetListOperationSettings(1);
        }
      },

      // 切换的时候清除
      clearDataSwitch(){
        this.arrayWorkOrder = [];
//        this.currentStageDetailStepTwo.is_lock = true;
        this.currentStageDetailStepTwo.op_settings.audit = false;
        this.currentStageDetailStepTwo.op_settings.comment = false;
        this.currentStageDetailStepTwo.op_settings.operation = false;
        this.currentStageDetailStepTwo.op_settings.year = false;
      },
      keyupNativeOne(e){
//        e.target.value =  parseInt(e.target.value);
      },
      log(item){
        console.log(item);
      },
      // 提示框 总汇
      showMessage(type,str){
        if(type == null || type == undefined || type.length<1){
          this.$message(str);
        }else {
          if(type == "success"){
            this.$message({
              message: str,
              type: 'success'
            });
          }else if(type == "warning"){
            this.$message({
              message: str,
              type: 'warning'
            });
          }else if(type == "error"){
            this.$message.error(str);
          }else {
            this.$message(str);
          }
        }
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
      },
      // 新加的部分
      addPeople(index){
        if(0 != index){
          this.markChoosePeople = true;
        }
      },
      // 只有加
      changeFileContract(file, fileLis) {
        file.isOriginal = false;
        this.listFileContract.push(file);
//     this.listFileContract = fileLis;
      },
      changeFileWorkTransmit(file,files){
        file.isOriginal = false;
        this.listFileContract.push(file);
        // 找出 文件中的 那个
        this.arrayWorkOrder.forEach(function (item,index) {
          if(item.category == "transmit"){
            item.attachments.push(file);
          }
        });
      },
      // base method start ===
      showLoading(){
        this.loadingMark = true;
      },
      hiddenLoading(){
        this.loadingMark = false;
      },
      // 值为 空 true   不空 false
      isEmpty(item){
        if(item == undefined || item == null){
          return true;
        }else {
          return false;
        }
      },
      // base method end ===
//      网络请求 start
      // 获取服务商的详情
      getServiceDel:function () {
        var id_service = this.$route.params.id;
        this.$http.get(API.url+'/providers/'+id_service
        ).then((res)=>{
          this.serviceOrganization = res.body.provider;
        });
      },
      // 获取服务分类 list
      getServiceCategories:function () {
        var id_service = this.$route.params.id;
        this.$http.get(API.serviceurl+'/service_categories'
        ).then((res)=>{
          this.listServiceCategories = res.body.service_categories;
        });
      },
      // 获取服务名称 list (此处的数据是根据 上面的服务分类的id来获取的)
      getServiceCategoriesName:function (id) {
        this.$http.get(API.serviceurl+'/service_categories/'+id+'/services'
        ).then((res)=>{
          this.listServiceCategoriesName = res.body.services;
        });
      },
      // 处理第一部分的 详情的 数据，只有在 点击编辑回来的时候 才会 回来处理
      dealDataStepOneDetail(product){
        this.serviceOrganization.name = product.provider;  // 服务机构
        this.serviceOrganization.id = product.provider_id;  // 服务机构
        this.currentServiceCategoriesName =  product.service_id;// 服务分类
        this.currentServiceCategories =  product.service_category_id;// 服务名称
        this.getServiceCategoriesName(this.currentServiceCategories);
        if(this.$route.query.produceId>0){

          this.markClearurrentServiceCategoriesName = true;
        }
        // 服务费用
        if(product.fee_type == "apply"){
          this.radioCharge = 3;
        }else if(product.fee_type == "start"){
          this.radioCharge = 6;
          this.fee_value_start = product.fee_value;
        }else if(product.fee_type == "fixed"){
          this.radioCharge = 9;
          this.fee_value_fixed = product.fee_value;
        }
        this.need_auth = product.need_auth; // 适用对象
        this.produce_id_copy = product.id;
      },
      // 如果是  上架 下架的编辑 进来就需要去复制内容 POST /v1/admin/products/{id}/clone
      cloneProducts(product_id){
        this.showLoading();
        this.$http.post(API.url+'products/'+product_id+'/clone'
        ).then((res)=>{
          this.dealDataStepOneDetail(res.body.product);
          this.hiddenLoading();
        },(error)=>{
          this.showMessage("warning","拷贝失败，请检查或则联系开发人员");
          this.hiddenLoading();
          this.$router.go(-1);
        });
      },
      // 获取第一部分的 详细内容，在 编辑中 的编辑进来的时候 做的网络请求
      // // GET /v1/admin/products/{id} 商品详情
      getStepOneDetail(product_id){
        this.showLoading();
        this.$http.get(API.url+'products/'+product_id
        ).then((res)=>{
          // 一个个 赋值
          this.dealDataStepOneDetail(res.body.product);
          this.hiddenLoading();
        },(error)=>{
          this.showMessage("warning","拷贝失败，请检查或则联系开发人员");
          this.hiddenLoading();
          this.$router.go(-1);
        });
      },
      // 更新商品，上一页在点击编辑 进来的时候 ，那么 在点击 下一步的时候 ，此处调用的是此处的接口
      // PUT /v1/admin/products/{id}   更新商品
      updataProduct(product_id,callBack){
        // 此处需要 做验证
        var parm = {
          product:{
            provider_id:this.$route.params.id,
            service_category_id:this.currentServiceCategories,
            service_category_id:this.currentServiceCategories,
            service_id:this.currentServiceCategoriesName,
            province:"上海市",
            service_id:this.currentServiceCategoriesName,
            city:"上海市",
            need_auth:this.need_auth // 适用对象（false: 全部企业， true: 认证企业）
          }
        };
        if(this.radioCharge == 3){ //申请后可见
          parm.product.fee_type = "apply";
        }else if(this.radioCharge == 6){
          parm.product.fee_type = "start";
          parm.product.fee_value = this.fee_value_start;
        }else if(this.radioCharge == 9){
          parm.product.fee_type = "fixed";
          parm.product.fee_value = this.fee_value_fixed;
        }
        this.$http.put(API.url+'products/'+product_id, parm
        ).then((res)=>{
          // 此处拿到 stepTwo的 左侧栏目数据
          this.stagesStepTwo = res.body.product.stages;
          this.currentProduct = res.body.product;
          this.dealDataWithStates(this.stagesStepTwo);
          // 网络请求 ，右侧的内容
          this.getStagesDetail(this.currentStagesStepTwo.id);
          this.getProviderForms(this.serviceOrganization.id);
          callBack(true);
        },(error)=>{
          this.showMessage("warning","请求出错");
          callBack(false);
        })
      },
      // 提交数据 创建商品
      // POST /v1/admin/products
      postCreatServiceProducts:function (callBack) {
        // 此处需要 做验证
        var parm = {
          product:{
            provider_id:this.$route.params.id,
            service_category_id:this.currentServiceCategories,
            service_category_id:this.currentServiceCategories,
            service_id:this.currentServiceCategoriesName,
            province:"上海市",
            service_id:this.currentServiceCategoriesName,
            city:"上海市",
            need_auth:this.need_auth // 适用对象（false: 全部企业， true: 认证企业）
          }
        };
        if(this.radioCharge == 3){ //申请后可见
          parm.product.fee_type = "apply";
        }else if(this.radioCharge == 6){
          parm.product.fee_type = "start";
          parm.product.fee_value = this.fee_value_start;

        }else if(this.radioCharge == 9){
          parm.product.fee_type = "fixed";
          parm.product.fee_value = this.fee_value_fixed;
        }

        this.$http.post(API.url+'/products', parm
        ).then((res)=>{
          // 此处拿到 stepTwo的 左侧栏目数据
          this.stagesStepTwo = res.body.product.stages;
          this.currentProduct = res.body.product;
          this.dealDataWithStates(this.stagesStepTwo);
          // 网络请求 ，右侧的内容
          this.getStagesDetail(this.currentStagesStepTwo.id);
          this.getProviderForms(this.serviceOrganization.id);
          callBack(true);
        },(error)=>{
          this.showMessage("warning","请求出错");
          callBack(false);
        })
      },
      // 获取阶段的详情(点击左侧，获取右侧的详情)
      // GET /v1/admin/stages/{id} 阶段详情
      // 删除阶段  DELETE /v1/admin/stages/{id} (删除左侧栏的 栏目)
      deleteStage(current_id,callBack){
        this.showLoading();
        this.$http.delete(API.url+'stages/'+current_id
        ).then((res)=>{
          callBack(true);
          this.hiddenLoading();
        },(error)=>{
          this.hiddenLoading();
          callBack(false);
          this.showMessage("warning","请求出错");
        })
      },
      getStagesDetail:function (id,callBack) {
        this.$http.get(API.url+'stages/'+id
        ).then((res)=>{
          // 此处拿到 stepTwo的 左侧栏目数据
          // 数据赋值
          this.arrayWorkOrder = [];
          this.currentStageDetailStepTwo = res.body.stage;

          // 赋值当前的表单 服务申请
          // 表单 如果存在  服务申请
          if(res.body.stage.bind_form != undefined ){
            this.currentProviderFormItem = res.body.stage.bind_form;
          };
          // 当前附件   如果存在  合同阶段
          if(res.body.stage.attachments != undefined){
            this.listFileContract = res.body.stage.attachments;
            this.listFileContract.forEach(function (item) {
              item.isOriginal = true; // 是原来的，在删除的时候 需要 调用接口
            })
          }
          // 工单的处理  全部赋值给 arrayWorkOrder
          if(res.body.stage.tickets != undefined && res.body.stage.tickets != null){
            this.arrayWorkOrder = res.body.stage.tickets;
          }
          callBack(true);
          // 添加 参数 op_settings 中 false
          if(this.isEmpty(this.currentStageDetailStepTwo.op_settings)){
            this.currentStageDetailStepTwo.op_settings.audit_setting = {};
            this.$set(this.currentStageDetailStepTwo.audit_setting,'audit',false);
            this.$set(this.currentStageDetailStepTwo.audit_setting,'comment',false);
            this.$set(this.currentStageDetailStepTwo.audit_setting,'operation',false);
            this.$set(this.currentStageDetailStepTwo.audit_setting,'year',false);
          }

        },(error)=>{
          this.hiddenLoading();
          this.showMessage("warning","请求出错啦");
          callBack(false);
        }).catch((response)=>{
        });
      },
      // GET /v1/admin/provider_forms  服务申请 的右侧的选择表单 的弹框的 data
      getProviderForms:function () {
//        var provider_id = this.serviceOrganization.id;
//        var service_category_id = this.currentServiceCategories;
//        var service_id = this.currentServiceCategoriesName;
//        // 需要传递的 数据很多
//        // 1. q[provider_id_eq]
//        // 2. service_category_id
//        // 3. service_id
//        // 4. 如果选择了 通用 ，那么上面两个  就传空
//        // 5. 表单名称(若有) q[name_cont]
//        // 6. 表单类型 (若有) q[category_eq]
//        var strUrl = API.url+'/provider_forms?q[provider_id_eq]='+provider_id;
//        strUrl += ("&q[category_eq]="+ this.providerFormsSelect.selectCategory);
//        if(service_category_id>=0){
//          strUrl += ("&q[service_category_id]="+ service_category_id);
//        };
//
//        // 需要根据查询条件 来 查询表单的内容
//        if(this.providerFormsSelect.selectCommon){ //选择了通用
//          service_category_id = 0;
//        }else { // 没有选择 通用
//          if(service_id>0){
//            strUrl += ("&q[service_id]="+ service_id);
//          }
//        }
//        // 搜索的 文件名字
//        if(this.providerFormsSelect.name.length>0){
//          strUrl += ("&q[name_cont]="+ this.providerFormsSelect.name);
//        }
//        // 分页
//        strUrl += ("&page="+ this.pageIndexForms);

        var provider_id = this.serviceOrganization.id;
        var service_category_id = this.currentServiceCategories;
        var service_id = this.currentServiceCategoriesName;

        var parm ={params:{q:{}}};
        var strUrl = API.url+'provider_forms';

        //api修改
        var category = this.providerFormsSelect.selectCategory == 0 ? 'apply' : 'question';
//        parm.params.q.category_eq = this.providerFormsSelect.selectCategory;
        parm.params.q.category_eq = category;
        if(service_category_id>=0){
          parm.params.q.service_category_id = service_category_id;
        };
        if(this.providerFormsSelect.selectCommon){ //选择了通用
          service_category_id = 0;
          parm.params.q.service_category_id_eq = 0;
        }else { // 没有选择 通用
          if(service_id>0){
            parm.params.q.service_id = service_id;
          }
        }
        if(this.providerFormsSelect.name.length>0){
          parm.params.q.name_cont = this.providerFormsSelect.name;
        }
        parm.params.page = this.pageIndexForms;

        this.$http.get(strUrl,parm
        ).then((res)=>{
          // 此处拿到 服务申请 的右侧的选择表单 的弹框的 data
          // 数据赋值 total_count
          this.pageCountForms = res.body.total_count;
          this.provider_forms_step_two = res.body.provider_forms;
          this.provider_forms_step_two.forEach(function (item,index) {
            if(item.category == "apply"){
              item.category_name = "申请表";
            }else {
              item.category_name = "问卷调查";
            }
          });
        },(error)=>{
          this.hiddenLoading();
          this.showMessage("warning","请求出错啦");
        }).catch((response)=>{
//          console.log('getProviderForms');
//          console.log(response);
        });
      },
      // PUT /v1/admin/products/{id}/stages  左侧的栏目的更新 与 添加
      saveStateMenu(section,row){
        this.showLoading();
        var parm = {
          stages:[]
        };
        this.stagesStepTwo.forEach(function (item) {
          var obj = {};
          if(item.id >0){
            obj.id = item.id;
          }
          obj.name = item.name;
          if(item.parent_id >0){
            obj.parent_id = item.parent_id;
          };
          obj.children = [];
          // 如果有 child
          item.children.forEach(function (item1) {
            var obj1 = {};
            if(item1.id >0){
              obj1.id = item1.id;
            }
            obj1.name = item1.name;
            if(item1.parent_id >0){
              obj1.parent_id = item1.parent_id;
            };
            obj.children.push(obj1);
          });
          parm.stages.push(obj);
        });
        var id_current = this.currentProduct.id;
        this.$http.put(API.url+'products/'+id_current+"/stages",parm,
        ).then((res)=>{
          this.isEditingMenu = false; //不处于编辑中
          this.focusState = false;
          this.hiddenLoading();
          this.dealDataStatesAfterNetWork(res.body.stages);
          // 点击切换的时候，里面数据全部 清除，否则会验证，报错
          this.clearDataSwitch();
          this.getStageDetailAfterEditMenu();
          this.stagesStepTwoCopy = undefined;
        },(error)=>{
          this.showMessage("warning","请求出错");
          this.hiddenLoading();
          this.dealWithSaveStateMenuError();
        });
      },

      //1. 审核流程 list
      // GET /v1/admin/audit_settings 内审流程列表
      netGetListAudits(formPage){
        if(this.isEmpty(this.serviceOrganization.id) &&this.serviceOrganization.id > 0){
          this.showMessage("warning","服务商ID未获取，请检查或则联系开发人员");
          return;
        }
        var provider_id =  this.serviceOrganization.id;
        var parm = {};
        parm.provider_id = provider_id;
        parm.page = this.pageIndexAudit; //当前页数
        parm.per = 10;
        var item = {params:parm}
        var url = API.url+'audit_settings';
        this.$http.get(url,item
        ).then((res)=>{
          this.listAudits =  res.body.audit_settings;
          this.pageCountAudit = res.body.total_count;
          if(formPage == 1){ //说明是分页进来的
            this.listAuditOrOpenation = this.listAudits;
          }
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },
      //2. 变更操作者 list
      // GET /v1/admin/operation_settings 变更操作者列表
      netGetListOperationSettings(formPage){
        if(this.isEmpty(this.serviceOrganization.id) &&this.serviceOrganization.id > 0){
          this.showMessage("warning","服务商ID未获取，请检查或则联系开发人员");
          return;
        }
        var provider_id =  this.serviceOrganization.id;
        var parm = {};
        parm.provider_id = provider_id;
        parm.page = this.pageIndexAudit;
        parm.per = 10;
        var item = {params:parm}
        var url = API.url+'operation_settings';
        this.$http.get(url,item
        ).then((res)=>{
          this.listOperation =  res.body.operation_settings;
          this.pageCountAudit = res.body.total_count;
          if(formPage == 1){ //说明是分页进来的
            this.listAuditOrOpenation = this.listOperation;
          }
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },
      // 右侧 更新阶段 网络请求  PUT /v1/admin/stages/{id}
      saveStateDetail(id,callBack,publish){
        if(this.currentStageDetailStepTwo.category == 'finished'){
          callBack(true);
          return;
        }
//        var markError = false;
        var markError = {mark:false,msg:""};
        if(this.currentStagesStepTwo == undefined || this.currentStagesStepTwo == null || this.currentStagesStepTwo.id == undefined ||  this.currentStagesStepTwo.id == null){
          callBack(true);
          return;
        }
        // 做表单的验证
        // 1. 如果是 服务申请 表单必须有
        // 2. 工单的title 必须要有
        // 3. 如果是 支付 并且是固定金额 金额必须有
        // 4. 如果是表单，表单必须有
        // 用formData 传值
        var fd = new FormData();
        fd.append("id",this.$route.params.id);
        // 组织数据  start =====================
        // 此处需要的数据很多 ，一个一个弄
        var state = {};
        state.is_lock = this.currentStageDetailStepTwo.is_lock;// 是否启用
        fd.append("stage[is_lock]", this.currentStageDetailStepTwo.is_lock);
        //启用之后的 三个阶段
        if(this.isEmpty(this.currentStageDetailStepTwo.op_settings)){
          callBack(true);
          return;
        }
        if(!this.currentStageDetailStepTwo.is_lock){
          // 启用阶段 与 禁止阶段的 三个选项
          state.op_settings = this.currentStageDetailStepTwo.op_settings;
          fd.append("stage[op_settings][audit]", state.op_settings.audit);
          //此处需要判断 是否勾选
          if(state.op_settings.audit){ //勾选了内审，那么就一定要有id
            fd.append("stage[audit_setting_id]", this.currentStageDetailStepTwo.audit_setting.id);
            if(this.isEmpty(this.currentStageDetailStepTwo.audit_setting.id) || this.currentStageDetailStepTwo.audit_setting.id<0){
              this.showMessage("warning","请选择一个内审流程");
              return;
            }
          }
          fd.append("stage[op_settings][operation]", state.op_settings.operation);
          //此处需要判断 是否勾选
          if(state.op_settings.operation){ //勾选了操作人员，那么就一定要有id
            fd.append("stage[operation_setting_id]", this.currentStageDetailStepTwo.operation_setting.id);
            if(this.isEmpty(this.currentStageDetailStepTwo.operation_setting.id) || this.currentStageDetailStepTwo.operation_setting.id<0){
              this.showMessage("warning","请选择一个阶段操作变更");
              return;
            }
          }
          fd.append("stage[op_settings][comment]", state.op_settings.comment);
          //上传年份
          if(this.currentStageDetailStepTwo.category == 'contract'){
            if(!this.isEmpty(state.op_settings.year))  fd.append("stage[op_settings][year]", state.op_settings.year);
          }
        }
        // 服务申请 阶段 加的是选择表单
        if(this.currentStageDetailStepTwo.category == "apply"){
          if(!this.isEmpty(this.currentProviderFormItem) && !this.isEmpty(this.currentProviderFormItem.provider_form_id) && this.currentProviderFormItem.provider_form_id>=0){
            state.provider_form_id = this.currentProviderFormItem.provider_form_id;
            fd.append("stage[provider_form_id]", this.currentProviderFormItem.provider_form_id);
          }else { // 没有id
            if(!this.currentStageDetailStepTwo.is_lock){
              this.showMessage("warning","服务申请阶段必须选择表单");
              callBack(false);
              return;
            }
          }
        }
        // 合同 阶段  加的是附件
        if(this.currentStageDetailStepTwo.category == "contract"){
          var attachments = [];
          for(var i=0;i<this.listFileContract.length;i++){
            var obj = this.listFileContract[i];
            var item = {};
            item.name = obj.name;
            item.raw = obj.raw;
            if(item.raw != undefined || item.raw != null){
              fd.append("stage[attachments][][name]", item.name);
              fd.append("stage[attachments][][file]", item.raw);
            }
          }
        }
        // 如果是 nomal 的话，也就是工单
        if(this.currentStageDetailStepTwo.category == "normal"){
          var that = this;
          this.arrayWorkOrder.forEach(function (item) {
            // 没有标题
            if(that.isEmpty(item.title) || item.title.length<1){
              if(item.category != "sendform"){
                markError.mark = true;
                markError.msg = '标题是必填的，请检查';
              }
            }

            if( item.id != undefined && item.id != null && item.id>0){
              fd.append("tickets[][id]", item.id);
            }
            if(!that.isEmpty(item.category) && item.category.length>0){
              fd.append("tickets[][category]", item.category);
            }else {
              markError.mark = true;
              markError.msg = '工单的类型没有，请检查';
            }
//            if(item.category != "sendform" ){
//              if(!that.isEmpty(item.title) && item.title.length>0){
//                fd.append("tickets[][title]", item.title);
//              }else {
//                markError.mark = true;
//                markError.msg = '工单的标题必填，请检查';
//              }
//            }
//            兼容以前的老的发送表单工单，以前的是没有title
            if(item.category == "sendform"){
              //没有标题，或则标题为空，手动给他加上去
              if(that.isEmpty(item.title) || item.title.length<1) item.title = '发送表单';
            }
            if(!that.isEmpty(item.title) && item.title.length>0){
              fd.append("tickets[][title]", item.title);
            }else {
              markError.mark = true;
              markError.msg = '工单的标题必填，请检查';
            }

            if(item.content != undefined && item.content.length>0){
              fd.append("tickets[][content]", item.content);
            }
            // 填写固定金额
            if(item.category == "pay"){ // 发起支付才有
              fd.append("tickets[][fee_type]", item.fee_type);
              if(item.fee_type == "fixed"){
                fd.append("tickets[][fee_value]", item.fee_value);
                if(that.isEmpty(item.fee_value) || item.fee_value<=0){
                  markError.mark = true;
                  markError.msg = '您选择了固定金额，必须填写金额 必须是正整数，请检查';
                }
              }
            }
            // 绑定表单的 ID  发送表单
            if(item.category == "sendform"){
              if(!that.isEmpty(item.bind_form) && !that.isEmpty(item.bind_form.provider_form_id) && item.bind_form.provider_form_id >=0){
                fd.append("tickets[][provider_form_id]",item.bind_form.provider_form_id);
              }else {

                markError.mark = true;
                markError.msg = '发送表单的工单必须选择一个表单，请检查';
              }
//              if(item.bind_form.provider_form_id !=undefined && item.bind_form.provider_form_id != null){
//                fd.append("tickets[][provider_form_id]",item.bind_form.provider_form_id);
//              }
            }
            // 附件
            if(item.attachments !=undefined && item.attachments != null){
              item.attachments.forEach(function (obj) {
                if(obj.id != undefined && obj.id != null && obj.id > 0 ){
//                         fd.append("tickets[][attachments][][id]", obj.id);
                }else {
                  fd.append("tickets[][attachments][][file]", obj.raw);
                  fd.append("tickets[][attachments][][name]", obj.name);
                }
              });
            }
          });
        }
        // 组织数据  end =====================
        if(markError.mark){
          callBack(false);
          this.showMessage("warning",markError.msg);
          return;
        }
        //是否发布
        if(this.isEmpty(publish)){
          publish = false;
        }
        fd.append("publish",publish);
        // 当前左侧栏目的 id ，需要传递过来
        var id_current = this.currentStageDetailStepTwo.id;
        this.showLoading();
        this.$http.put(API.url+'stages/'+id_current,fd,
        ).then((res)=>{
          callBack(true);
          if(publish){
            this.$router.go(-1);
            this.$store.dispatch('get_type_service_add',0);
          }
          this.hiddenLoading();
        },(error)=>{
          this.showMessage("warning","请求出错");
          this.hiddenLoading();
          callBack(false);
        })
      },
      // 合同阶段的 删除 附件  DELETE /v1/admin/attachments/{id}
      deleteAttachments(id,callBack){
        this.showLoading();
        this.$http.delete(API.url+'attachments/'+id
        ).then((res)=>{
          callBack(true);
          this.hiddenLoading();
          this.listServiceCategoriesName = res.body.services;
        },(error)=>{
          this.showMessage("warning","请求出错");
          this.hiddenLoading();
          callBack(false);
        })
      },
      // 删除工单文件的 附件 ==
      deleteAttachmentsInWork(id,callBack){
        this.showLoading();
        this.$http.delete(API.url+'attachments/'+id
        ).then((res)=>{
          callBack(true);
          this.hiddenLoading();
        },(error)=>{
          callBack(false);
          this.hiddenLoading();
        });
      },
      // TODO 网络请求 删除工单 DELETE /v1/admin/tickets/{id}
      deleteWorkOrder(work_id,callBack){
        if(this.isEmpty(work_id)){
          this.showMessage("warning","工单ID不存在，请检查");
          return;
        }
        this.showLoading();
        this.$http.delete(API.url+'tickets/'+work_id
        ).then((res)=>{
          callBack(true);
          this.hiddenLoading();
        },(error)=>{
          this.showMessage("error","删除失败。请求出错，请联系开发人员");
          this.hiddenLoading();
          callBack(false);
        })
      },
      // 第二部分新加 start ==========================================================
      //选择 内审 点击事件
      chooseAudit(){
        this.listAuditOrOpenation = this.listAudits;
        this.markAuditOrOperation = true;
        this.indexAuditOrOperation = 1;
        this.pageIndexAudit = 1;
        this.netGetListAudits(1);
      },
      //选择 变更操作人的 点击事件
      chooseOperation(){
        this.listAuditOrOpenation = this.listOperation;
        this.markAuditOrOperation = true;
        this.indexAuditOrOperation = 2;
        this.pageIndexAudit = 1;
        this.netGetListOperationSettings(1);
      },
      // 点击选择 内审 和 操作人员 弹框的确定
      clickChooseAuditOrOperation(){
        this.markAuditOrOperation = false;

        if(this.indexAuditOrOperation == 1){
          this.currentStageDetailStepTwo.audit_setting.id = this.currentAuditOrOperation.id;
          this.currentStageDetailStepTwo.audit_setting.name = this.currentAuditOrOperation.name;
        }else {
          this.currentStageDetailStepTwo.operation_setting.id = this.currentAuditOrOperation.id;
          this.currentStageDetailStepTwo.operation_setting.name = this.currentAuditOrOperation.name;
        }
      },
      handleRowChangeAudit(row, event, column){
        this.currentAuditOrOperation = row;
      },
      deleteAuditOrOpeartion(mark){
        if(mark == 1){
          this.currentStageDetailStepTwo.audit_setting.id = -100;
          this.currentStageDetailStepTwo.audit_setting.name = '';
        }else {
          this.currentStageDetailStepTwo.operation_setting.id = -100;
          this.currentStageDetailStepTwo.operation_setting.name = '';
        }
      },
      publishAll(mark){
        var that = this;
        this.saveStateDetail(this.$route.params.id,function (callMark) {
          if(callMark && mark == false){ //保存
            that.$store.dispatch('get_type_service_add',2);
            that.$router.go(-1);
          }
        },mark);
      },
      // 发布产品(保存产品)
      releaseProduct(mark){
          //1. save left menu
        // 2. save stage detail
        this.showLoading();
        var parm = {stages:[] };
        this.stagesStepTwo.forEach(function (item) {
          var obj = {};
          if(item.id >0) obj.id = item.id;
          obj.name = item.name;
          if(item.parent_id >0)obj.parent_id = item.parent_id;
          obj.children = [];
          // 如果有 child
          item.children.forEach(function (item1) {
            var obj1 = {};
            if(item1.id >0)obj1.id = item1.id;
            obj1.name = item1.name;
            if(item1.parent_id >0) obj1.parent_id = item1.parent_id;
            obj.children.push(obj1);
          });
          parm.stages.push(obj);
        });
        var id_current = this.currentProduct.id;
        this.$http.put(API.url+'products/'+id_current+"/stages",parm,
        ).then((res)=>{
          this.isEditingMenu = false; //不处于编辑中
          this.focusState = false;
          this.hiddenLoading();
//          this.dealDataStatesAfterNetWork(res.body.stages);
//          // 点击切换的时候，里面数据全部 清除，否则会验证，报错
//          this.clearDataSwitch();
//          this.getStageDetailAfterEditMenu();
//          this.stagesStepTwoCopy = undefined;
          return true;
        },(error)=>{
          this.showMessage("warning","请求出错");
          this.hiddenLoading();
          this.dealWithSaveStateMenuError();
          return false;
        }).then((res)=>{
            if(res) this.publishAll(mark);
        });


      },
      // 第二部分新加 end ==========================================================
      // 网络请求 第三部分 start ====
      // DELETE /v1/admin/stage_settings/{id}  删除操作者

      deleteOperationer(oper_id,callBack){
        if(this.isEmpty(oper_id)){
          this.showMessage("warning","操作者 不存在，请检查");
          return;
        }
        this.showLoading();
        this.$http.delete(API.url+'stage_settings/'+oper_id
        ).then((res)=>{
          callBack(true);
          this.hiddenLoading();
        },(error)=>{
          this.showMessage("error","删除失败");
          this.hiddenLoading();
          callBack(false);
        })
      },

      // GET /v1/admin/products/{id}/stages  是否过滤
      getLeftMenu(isFilter){
        this.showLoading();
        var id =  this.currentProduct.id; // id 指的是申请成功的 id
        var url = API.url+'products/'+id+"/stages?filter="+isFilter
        this.$http.get(url
        ).then((res)=>{
          this.hiddenLoading();
          if(isFilter){
            // 赋值
            this.leftMenuStepThree = res.body.stages;
            // 处理数据 ，是否激活等 数据的 添加
            this.dealDataWithLeftMenuStepThree(this.leftMenuStepThree);
            // 网络请求 ，右侧的内容
            this.getStepThreeRightDetail(this.currentStagesStepTwo.id);
            this.getDepartments();// 获取弹出框 部门的 数据
          }else { // 第二步的 左侧栏目 请求
            this.stagesStepTwo = res.body.stages;
            this.dealDataWithStates(this.stagesStepTwo);
            this.getStagesDetail(this.currentStagesStepTwo.id);
            this.getDepartments();// 获取弹出框 部门的 数据
          }
        },(error)=>{
          this.showMessage("error","请求出错");
          this.hiddenLoading();
        });
      },
      // 第三部分 右侧详情的接口，跟第二部分是一样的 其实
      //  GET /v1/admin/stages/{id} 阶段详情  id 当前选中的 current的id
      getStepThreeRightDetail(id){
        // id 就是 左侧的 栏目的 id
        if(this.isEmpty(id)){
          this.showMessage("warning","找不到右侧栏目id，请检查");
          return;
        }
        this.showLoading();
        var url = API.url+'stages/'+id;
        this.$http.get(url
        ).then((res)=>{
          this.hiddenLoading();

          // 赋值操作 ，右侧
          this.currentRightDetailStepThree = res.body.stage;
          this.dealDataWithRightDetailStepThree();
        },(error)=>{
          this.showMessage("error","请求出错");
          this.hiddenLoading();
        })
      },
      // 获取部门列表 获取部门 的接口  GET /v1/admin/departments 获取部门列表 获取部门
      getDepartments(){
        // 服务商ID  this.serviceOrganization
        if(this.isEmpty(this.serviceOrganization.id) &&this.serviceOrganization.id > 0){
          this.showMessage("warning","服务商ID未获取，请检查或则联系开发人员");
          return;
        }
        this.showLoading();
        var url = API.url+'departments?provider_id='+this.serviceOrganization.id;
        this.$http.get(url
        ).then((res)=>{
          this.hiddenLoading();
          this.listDepartments = res.body.departments;
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
        // 获取员工 列表  3. 获取员工 PUT /v1/admin/stages/{id}/setting 阶段设置
      },
      // 获取角色 GET /v1/admin/roles
      getRoles(){
        // 服务商ID  this.serviceOrganization
        // 部门ID
        if(this.isEmpty(this.serviceOrganization.id)){
          this.showMessage("warning","服务商ID未获取，请检查或则联系开发人员");
          return;
        }
        if(this.isEmpty(this.currentDepartment) || this.currentDepartment.length < 0){
          this.showMessage("warning","当前 部门没有选中，请检查或则联系开发人员");
          return;
        }
        this.showLoading();
        var url = API.url+'roles?provider_id='+this.serviceOrganization.id+"&department="+this.currentDepartment;
        this.$http.get(url
        ).then((res)=>{
          this.hiddenLoading();
          this.listRoles = res.body.roles;
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },
      // 获取员工 列表 GET /v1/admin/suppliers 查询服务商员工
      getSuppliers(){
        // 服务商ID  this.serviceOrganization
        // 部门ID
        if(this.isEmpty(this.serviceOrganization.id)){
          this.showMessage("warning","服务商ID未获取，请检查或则联系开发人员");
          return;
        }
        if(this.isEmpty(this.currentDepartment) || this.currentDepartment.length < 0){
          this.showMessage("warning","当前 部门没有选中，请检查或则联系开发人员");
          return;
        }
        this.showLoading();
        var url = API.url+'suppliers?provider_id='+this.serviceOrganization.id+"&department="+this.currentDepartment;
        this.$http.get(url
        ).then((res)=>{
          this.hiddenLoading();
          this.listSuppliers = res.body.suppliers;
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },
      // 保存 PUT /v1/admin/stages/{id}/setting  阶段设置
      // mark = 1 保存  mark = 2 发布
      saveAll(mark,callBack){
        var errorMark = false;
        var id = this.currentRightDetailStepThree.id ; // 左侧栏目当前的保存
        var parm = {stage:{}};
        // 制造 数据 传递的 数据
        if(this.currentRightDetailStepThreeJi.op_settings.audit == true){  // 内部审核
          parm.stage.audit_name = this.currentRightDetailStepThreeJi.audit_name;
          if(this.isEmpty(parm.stage.audit_name) || parm.stage.audit_name.length <1){
            this.showMessage("warning","内审名称必须填写");
            callBack(false);
            return;
          }
          if( this.currentRightDetailStepThree.audit_settings.length < 1){
            this.showMessage("warning","请至少保证有一位操作人员");
            callBack(false);
            return;
          }
        };
        if(this.currentRightDetailStepThreeJi.op_settings.operation == true){
          if(this.operation_value == "setting"){
            if( this.currentRightDetailStepThree.operation_settings.length < 1){
              this.showMessage("warning","请至少保证有一位操作人员");
              callBack(false);
              return;
            }
          }
        }
        parm.stage.operation = this.operation_value;
        // audit_settings
        parm.stage.audit_settings = [];
        var that = this ;
        this.currentRightDetailStepThree.audit_settings.forEach(function (item,index) {
          var obj = {};
          if(!that.isEmpty(item.id)){
            obj.id = item.id;
          }
          obj.category = item.category;
          obj.audit_type = item.audit_type;
          if(that.isEmpty(obj.audit_type) || obj.audit_type.length < 1){
            that.showMessage("warning","操作人员流程饿分配与审核未选择，请检查或则联系开发人员");
            errorMark = true;

          };
          obj.department = item.department;
          if(item.category == "role"){ // 角色
            obj.role_id = item.role_id;
          }else if(item.category == "member"){ // 人员
            obj.user_id = item.user_id;
          }
          parm.stage.audit_settings.push(obj);
        });
        parm.stage.operation_settings = [];
        this.currentRightDetailStepThree.operation_settings.forEach(function (item,index) {
          // 一个一个往里面加
          var obj = {};
          if(!that.isEmpty(item.id)){
            obj.id = item.id;
          }
          obj.category = item.category;
          obj.audit_type = item.audit_type; // 流程步骤 TODO

          obj.department = item.department;
          if(item.category == "role"){ // 角色
            obj.role_id = item.role_id;
          }else if(item.category == "member"){ // 人员
            obj.user_id = item.user_id;
          }
          parm.stage.operation_settings.push(obj);
        });
        if(mark == 1){
          parm.publish = false;
        }else {
          parm.publish = true;
        }
        if(errorMark){
          callBack(false);
          return;
        }
        var url = API.url+"stages/"+id+"/setting";
        this.showLoading();
        this.$http.put(url,parm
        ).then((res)=>{
          this.hiddenLoading();
          this.listSuppliers = res.body.suppliers;
          this.hiddenLoading();
          callBack(true);
          if(2 == mark){
            //   TODO 需要跳转 到其他的地方
          }
        },(error)=>{
          this.hiddenLoading();
          callBack(false);
          this.showMessage("error","请求出错，请联系开发人员");
        })
      },
      // 网络请求 第三部分 end ====

//     网络请求 end
      // step one func  start ====
      changeListServiceCategories(event) {

        if(this.markClearurrentServiceCategoriesName == false){
          this.currentServiceCategoriesName = '';
        }
        this.markClearurrentServiceCategoriesName = false;
//        this.currentServiceCategoriesName = '';
        // 传过来的 id 再去网络请求
        this.getServiceCategoriesName(event);
      },
      //step one func  end ====

      // step two func  start =========================================
      // 增加图片
      addPic(e){
//        e.preventDefault();
//        var index_id = e.target.title;
//        $('#'+index_id).trigger('click');
//        return false;
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)return;
        var index = e.target.id;
        this.arrayWorkOrder[index].attachments.push(files[0]);
      },

      dealDataWithStates:function (stages) {
        // 默认选中第一个
        for(var i=0;i<stages.length;i++){
          var item = stages[i];
          this.$set(this.stagesStepTwo[i],'show',false);
          this.$set(this.stagesStepTwo[i],'isActive',false);
          item.show = false;
          item.isActive=false;
          // 默认选中第一个
          if(0 ==i){
            item.isActive=true;
            this.currentStagesStepTwo = item;
          }
          for(var j=0;j<item.children.length;j++){
            var obj = item.children[j];
            this.$set(this.stagesStepTwo[i].children[j],'show',false);
            this.$set(this.stagesStepTwo[i].children[j],'isActive',false);
            obj.show = false;
            obj.isActive=false;
          }
        }
      },
      // 增 删 改 之后 的数据
      dealDataStatesAfterNetWork(stages){
        for(var i=0;i<stages.length;i++){
          var item = stages[i];
          item.show = false;
          item.isActive=false;
          // 默认选中第一个
          if(0 ==i){
//            item.isActive=true;
            this.currentStagesStepTwo = item;
          }
          for(var j=0;j<item.children.length;j++){
            var obj = item.children[j];
            obj.show = false;
            obj.isActive=false;
          }
        }
        this.stagesStepTwo = stages;
      },
      // 处理第三步 的 右侧数据 ，加 operation
      dealDataWithRightDetailStepThree(){
        if(this.isEmpty(this.currentRightDetailStepThree.operation)) {
          this.currentRightDetailStepThree["operation"]="current"; // 暂时先添加着
//           this.currentRightDetailStepThree.$set('operation',"current");// 暂时先添加着
//           this.food.$set('count', 1)

        };
//        this.currentRightDetailStepThree["audit_settings"].insert(0,{id:-100});
//        this.currentRightDetailStepThree["audit_settings"].push({id:-100});

        this.operation_value = this.currentRightDetailStepThree.operation;

      },
      // 处理第三步拿到的 左侧栏目的 原始数据
      dealDataWithLeftMenuStepThree(stages) {
        // 默认选中第一个
        for(var i=0;i<stages.length;i++){
          var item = stages[i];
          item.show = false;
          item.isActive=false;
          // 默认选中第一个
          if(0 ==i){
            item.isActive=true;
//            this.currentLeftMenuStepThree = item;
            this.currentStagesStepTwo = item;
          }
          for(var j=0;j<item.children.length;j++){
            var obj = item.children[j];
            obj.show = false;
            obj.isActive=false;
            if(i == 0){
//              this.currentLeftMenuStepThree = obj;
              this.currentStagesStepTwo = obj;
            }
          }
        }
//        this.leftMenuStepTwo = this.cloneObj(this.stagesStepTwo);
        var item_all = [];
        // 全部赋值
        this.stagesStepTwo.forEach(function (item,index) {
          var obj = {};
          obj.category = item.category;
          obj.isActive = item.isActive;
          obj.name = item.name;
          obj.parent_id = item.parent_id;
          obj.rank = item.rank;
          obj.show = item.show;
          obj.created_at = item.created_at;
          obj.updated_at = item.updated_at;
          obj.children = [];
          obj.children.forEach(function (child,index1) {
            var obj1 = {};
            obj1.category = child.category;
            obj1.isActive = child.isActive;
            obj1.name = child.name;
            obj1.parent_id = child.parent_id;
            obj1.rank = child.rank;
            obj1.show = child.show;
            obj1.created_at = child.created_at;
            obj1.updated_at = child.updated_at;
            obj1.children = [];
            obj.children.push(obj1);
          })
          item_all.push(obj);
        });
        this.leftMenuStepTwo = item_all

        // 将左侧的 栏目的 数据源 换回来
        this.stagesStepTwo =  this.leftMenuStepThree;
      },
      // 处理 阶段详情的数据
      dealDataWithStateDetail:function (stageDetail) {
        // 一开始是 没有多选的，如果没有需要先手动加上去
        if(this.currentStageDetailStepTwo.op_settings == undefined || this.currentStageDetailStepTwo.op_settings == null) {
          this.currentStageDetailStepTwo.op_settings ={};
          this.currentStageDetailStepTwo.op_settings.audit = false;
          this.currentStageDetailStepTwo.op_settings.operation = false;
          this.currentStageDetailStepTwo.op_settings.comment = false;
        }
      },
      //改变 服务申请 的启动与 关闭状态
      changeLockState() {
        this.currentStageDetailStepTwo.is_lock = !this.currentStageDetailStepTwo.is_lock;
        if(this.currentStageDetailStepTwo.is_lock){
          // 如果锁起来了，那么清空下面的
//          this.currentStageDetailStepTwo.op_settings.forEach(function(item){
//            item.check = false;
//          });
          this.currentStageDetailStepTwo.op_settings.audit = false;
          this.currentStageDetailStepTwo.op_settings.operation = false;
          this.currentStageDetailStepTwo.op_settings.comment = false;
          // 去处已经选好的文件
          this.currentProviderFormItem = {};
        }
      },
      // 弹出框选择表单的点击事件
      selectProviderForm(row, event, column) {
        // 当前选中的表单里面的 那一个
        if(this.chooseFormIndex >= 0){  // 说明是文件 的选择 框
          var item = this.arrayWorkOrder[this.chooseFormIndex];
          item.bind_form = row;
          item.bind_form.provider_form_id = row.id;
          this.showChooseForm = false;
        }else {
          this.currentProviderFormItem = row;
          this.currentProviderFormItem.provider_form_id =  this.currentProviderFormItem.id;
          this.showChooseForm = false;
        }
      },
      // 删除当前 选中的 表单的 选择的那一项
      removeCurrentFormItem() {
        this.currentProviderFormItem = {};
      },
      // 弹出框，点击查询表单 将选择的参数全部带上
      queryProviderForms() {
        this.getProviderForms();
      },
      //删除 合同阶段选中的 当前的文件
      removeInlistFileContract(index){
        // 查看是否是 之前服务器上就有的
        var item = this.listFileContract[index];
        if (item.isOriginal){
          //调用接口删除 返回成功后删除
          var that = this;
          this.deleteAttachments(item.id,function (mark) {
            if(mark){
              that.listFileContract.splice(index,1);
            }
          });
        }else {
          this.listFileContract.splice(index,1);
        }
      },

      removeInlistFileWork(index){
        var listItem  = [];
        this.arrayWorkOrder.forEach(function (item,index) {
          if(item.category == "transmit"){
            listItem =  item.attachments
          }
        });
        // 查看是否是 之前服务器上就有的
        var item = listItem[index];
        if (!this.isEmpty(item.id) && item.id > 0){
          //调用接口删除 返回成功后删除
          var that = this;
          this.deleteAttachmentsInWork(item.id,function (mark) {
            if(mark){
              listItem.splice(index,1);
            }
          });
        }else {
          listItem.splice(index,1);
        }
      },
      //增加占位符
      addPerch(item,index){
        // [日期]
        var work = this.arrayWorkOrder[index];
        work.content += "[日期]";
      },

      addPerchInput(item,index){
        // [日期]
        var work = this.arrayWorkOrder[index];
        work.content += "[备注]";
      },
      // step two func  end ====
      // step three func start =========================================
      // 保存 服务
      nextStepSave(){
        //修改功能，3个步骤变为两个步骤
        var that = this;
        this.saveAll(1,function (mark) {
          if(mark == true){
            that.$router.go(-1);
          }
        });
      },
      // 发布 服务
      nextStepRelease(){
        var that = this;
        this.saveAll(2,function (mark) {
          // 返回成功
          if(mark == 1){
            that.$router.go(-1);
          }
        });
      },
      cancelOperator(){
        this.dialogOperator =false;
      },
      commitOperator(){
        this.dialogOperator =false;

        if(this.isEmpty(this.currentCategoryType.category) || this.currentCategoryType.category <1){
          return;
        }
        if(this.currentCategoryType.category == "role" ){ //如果是角色
          if(this.isEmpty(this.currentDepartment) || this.currentDepartment.length <1){
            return;
          }
          if(this.isEmpty(this.currentRoles.id) ||this.currentRoles.id <0){
            return;
          }
        }else if(this.currentCategoryType.category == "member"){
          if(this.isEmpty(this.currentDepartment) || this.currentDepartment.length <1){
            return;
          }
          if(this.isEmpty(this.currentSuppliers.id) ||this.currentSuppliers.id <0){
            return;
          }
        }

        // 选择相应的 内容
        if(this.dialogOperatorIndex == 1){ // 上面
          var item = {};
          item.category = this.currentCategoryType.category;
          item.department = this.currentDepartment;
          item.audit_type = "";
          item.user_or_role_name = "";

          if(this.currentCategoryType.category == "role" ){ //如果是角色
            item.role_id = this.currentRoles.id;
            item.user_or_role_name =  item.department + "|"+ this.currentRoles.name;
//            item.user_or_role_name =  this.currentRoles.name;

            if(item.department.length <1 || this.currentRoles.name.length<1){
              this.showMessage("warning","有未选择的 部门或则角色，请检查或则联系开发人员");
              return;
            }

          }else if(this.currentCategoryType.category == "member"){
            item.user_id = this.currentSuppliers.id;
            item.user_or_role_name =  item.department + "|"+ this.currentSuppliers.name;

            if(item.department.length <1 || this.currentSuppliers.name.length<1){
              this.showMessage("warning","有未选择的 部门或则人员，请检查或则联系开发人员");
              return;
            }

          }else if(this.currentCategoryType.category == "leader"){
            item.user_or_role_name = "直属领导";

          }else if(this.currentCategoryType.category == "underling"){
            item.user_or_role_name = "直属下属";
          }

          item.audit_type = "";


          this.currentRightDetailStepThree.audit_settings.push(item);

        }else { // 下面
          var item = {};
          item.category = this.currentCategoryType.category;
          item.department = this.currentDepartment;
          if(this.currentCategoryType.category == "role" ){ //如果是角色
            item.role_id = this.currentRoles.id;
            item.user_or_role_name =  item.department + "|"+ this.currentRoles.name;
            if(item.department.length <1 || this.currentRoles.name.length<1){
              this.showMessage("warning","有未选择的 部门或则角色，请检查或则联系开发人员");
              return;
            }
          }else if(this.currentCategoryType.category == "member"){
            item.user_id = this.currentSuppliers.id;
            item.user_or_role_name =  item.department + "|"+ this.currentSuppliers.name;
            if(item.department.length <1 || this.currentSuppliers.name.length<1){
              this.showMessage("warning","有未选择的 部门或则人员，请检查或则联系开发人员");
              return;
            }

          }else if(this.currentCategoryType.category == "leader"){
            item.user_or_role_name = "直属领导";

          }else if(this.currentCategoryType.category == "underling"){
            item.user_or_role_name = "直属下属";
          }
          this.currentRightDetailStepThree.operation_settings.push(item);
//        this.currentRightDetailStepThree.operation_settings.insert( this.currentRightDetailStepThree.operation_settings.length-2,item);
        }
      },
      chooseRoles(item,index){
        this.currentRoles = item;
        this.currentRoles.index = index;
      },
      chooseSuppliers(item,index){
        this.currentSuppliers = item;
        this.currentSuppliers.index = index;
      },
      // 选择 直属领导还是 下属领导等
      // 选择 直属领导还是 下属领导等
      chooseCategoryType(item,index){
        // 点击上面的 选择框 ，如果是 上一个是分配者 ，那么固定人员那边是不可选的

        if(!this.isEmpty(this.currentRightDetailStepThree.audit_settings) && this.currentRightDetailStepThree.audit_settings.length>0){
          var array_ad = this.currentRightDetailStepThree.audit_settings;
          var obj6 =  array_ad[array_ad.length-1];
          if(obj6.audit_type == "assigner"){
            if(index == 4){
              this.showMessage("warning","您上一个选择了 分配者，此处不可以选择 固定人员，请检查或则联系开发人员");
              return;
            }
          }
        }


        this.currentCategoryType = item;
        this.currentCategoryType.index = index;

        // 做 网络请求，看是 角色还是人员
//        if(this.currentRoleName == "角色"){
//          this.log("角色");
//          this.getRoles();
//        }else {
//          this.log("人员");
//          this.getSuppliers();
//        }
      },
      // 点击部门 下面 选择 请求角色 或则 人员
      chooseRolesOrSuppliers(item,index){
        this.currentDepartment = item;
        this.currentDepartmentIndex = index;
        if(this.currentRoleName == "角色"){
          this.getRoles(this.provider_id);
        }else {
          this.getSuppliers();
        }
      },
      // step three func end ===
      removeOperators(index,mark) {



        if(mark == 1){ // 上面
          var item =  this.currentRightDetailStepThree.audit_settings[index-1];
          if(!this.isEmpty(item.id) && item.id > 0){  // 需要网络请求 删除

            var that = this;
            this.deleteOperationer(item.id,function (mark) {
              if(mark == true){
                that.currentRightDetailStepThree.audit_settings.splice(index-1,1);
              }
            });
          }else {
            this.currentRightDetailStepThree.audit_settings.splice(index-1,1);
          }

        }else { // 下面的
          var item =  this.currentRightDetailStepThree.operation_settings[index-1];
          if(!this.isEmpty(item.id) && item.id > 0){  // 需要网络请求 删除
            var that = this;
            this.deleteOperationer(item.id,function (mark) {
              if(mark == true){
                that.currentRightDetailStepThree.operation_settings.splice(index-1,1);
              }
            });
          }else {
            this.currentRightDetailStepThree.operation_settings.splice(index - 1, 1);
          }
        }
      },
      // 清空弹框中所有的 选择人员
      clearAllOperator(){
        this.currentCategoryType = {};
        this.currentDepartment = null;
        this.currentDepartmentIndex = -100;

        this.currentRoles = {};
        this.currentSuppliers = {};

        this.currentCategoryType = {
          category:"leader",
          index:0,
          name:"直属领导"
        }

      },
      addOperator(index) {

        // 全部清空
        this.clearAllOperator();
        if(1 == index){
          // 需要判断 上一个 是否有选择
          if(this.currentRightDetailStepThreeJi.audit_settings.length > 2){
            var index5 = this.currentRightDetailStepThreeJi.audit_settings.length -2 ;
            var obj = this.currentRightDetailStepThreeJi.audit_settings[index5];
            this.last_audit_settings = obj;
            if(obj.audit_type.length<1){
              this.showMessage("warning","请选择操作者或则分配者，请检查或则联系开发人员");
              return;
            }
          }
        }
        this.dialogOperator = true;
        this.dialogOperatorIndex = index;
      },

      scrollChange: function () {
        this.scroll = document.body.scrollTop;
//        console.log(this.scroll);
        $("#suspension").css("top",this.scroll+400);
      },
      dragStart:function (evt) {
//        console.log(evt);
        return false;
      },
      onMove:function ({relatedContext, draggedContext}) {
        if(draggedContext.index == 0 || relatedContext.index== 0 || draggedContext.index == this.stagesStepTwo.length-1 || relatedContext.index == this.stagesStepTwo.length-1 ){
          return false;
        }else {
          return true;
        }
      },
      //添加文件 第二阶段的框框
      transformFileType(type){
        //  affirm: 0, demand: 1, pay: 2, transmit: 3, notify: 4, sendform: 5
        if(typeof(type) == "number" ){
          var item = "";
          if(type == 0){ item = "affirm"}
          else  if(type == 1){ item = "demand"}
          else  if(type == 2){ item = "pay"}
          else  if(type == 3){ item = "transmit"}
          else  if(type == 4){ item = "notify"}
          else  if(type == 5){ item = "sendform"}
          return item;
        }
        return "";
      },
      addFile(type) {
        var typeWork =  this.transformFileType(type);
        if(typeWork.length>0){
          var item = {};
          item.id = -100;
          item.category = typeWork;
          item.title = "";
          item.content = "";
          // 文件不一定有的
          item.attachments = [];
          // 绑定的表单 不一定有
//            item.provider_form_id = -100;
          // 自己定义的 需要改变
          item.bind_form = {};
          // 填写固定金额
          item.fee_type = "fill";
          item.fee_value = "";
          if(type == 5)item.title = "发送表单";
          this.arrayWorkOrder.push(item);
        }else {
          this.showMessage("warning","添加文件有错，请检查或则联系开发人员");
        }
      },
      deletFile(index) {
        var item =  this.arrayWorkOrder[index];

        if(!this.isEmpty(item.id) && item.id>0){
          // 如果是 请求回来的那么就 需要网络请求 删除
          var that = this;

          this.deleteWorkOrder(item.id,function (mark) {
            if(mark){
              that.arrayWorkOrder.splice(index, 1);
            }
          })
        }else {
          this.arrayWorkOrder.splice(index, 1);
        }
      },
      // 移除文件中的 表单
      removeWorkProviderForm(index){
        // 此处需要判断 是不是 从网络上拉取的，有网络请求 TODO
        var item =  this.arrayWorkOrder[index];
        if(item.id >= 0){ // 说明有绑定关系

        }else { // 直接删除
          item.bind_form = {};
        }
      },
      // 选择表单
      chooseForm(type) {

        if(type >= 0){
          this.showChooseForm = true;
          this.chooseFormIndex = type;
          this.pageIndexForms = 1;

        }else {
          this.chooseFormIndex = -100;
          if(this.currentStageDetailStepTwo.is_lock){
            return;
          }
          this.showChooseForm = true;
          this.pageIndexForms = 1;
        }
      },
      // 点击左侧栏目 第一层目录 点击事件
      clickMenuParent(index) {
        if(!this.isEmpty(this.currentStagesStepTwo) && !this.isEmpty(this.currentStagesStepTwo.section) &&this.currentStagesStepTwo.section== index){
          return;
        }
        this.focusState = false;
        var obj = this.stagesStepTwo[index];
        if( 2 == this.stepActive){
          // 1. 还是先保存 右侧的内容，然后再次执行
          var that = this;
          this.saveAll(1,function (netWork) {
            // 返回成功
            if(netWork){
              that.clearShowMenu();
              that.clearCurrentMenuIsActive();
              obj.isActive = !obj.isActive;
              that.currentStagesStepTwo = obj;
              that.currentStagesStepTwo.section = index;
              if (obj.children.length > 0) { // has child menu
                var obj_child = obj.children[0];
                obj_child.isActive = true;
                that.currentStagesStepTwo = obj_child;
                that.currentStagesStepTwo.section = index;
                that.currentStagesStepTwo.row = 0;
              }
              // 网络请求
              that.getStepThreeRightDetail(that.currentStagesStepTwo.id);
            }
          })
          return;
        };

        if (obj.name.length < 1) {
          return;
        }
        // 如果在编辑状态，直接返回
        if(this.isEditingMenu) {
          this.showMessage("warning","您正在编辑中");
          return
        }

        if(this.currentStagesStepTwo == undefined || this.currentStagesStepTwo == null){
          this.clearShowMenu();
          this.clearCurrentMenuIsActive();
          //1.如果有child ,那么默认 第一个child 选中
          // 2. 如果 没有child ，那么就选中此时的大的目
          obj.isActive = !obj.isActive;
          this.currentStagesStepTwo = obj;
          if (obj.children.length > 0) { // has child menu
            var obj_child = obj.children[0];
            obj_child.isActive = true;
            this.currentStagesStepTwo = obj_child;
          }
          //加 网络请求 具体的 点击了哪一项，请求右侧的数据
          this.getStagesDetail(this.currentStagesStepTwo.id);
          this.getProviderForms(this.serviceOrganization.id);
          return;
        }
        this.nextClickMark.section = index;
        // 2. 网络请求 右侧
        var that = this;
        this.saveStateDetail(this.$route.params.id,function (mark) {
          if(mark){
            that.clearShowMenu();
            that.clearCurrentMenuIsActive();
            //1.如果有child ,那么默认 第一个child 选中
            // 2. 如果 没有child ，那么就选中此时的大的目
            obj.isActive = !obj.isActive;
            that.currentStagesStepTwo = obj;
            that.currentStagesStepTwo.section = index;
            if (obj.children.length > 0) { // has child menu
              var obj_child = obj.children[0];
              obj_child.isActive = true;
              that.currentStagesStepTwo = obj_child;
              that.currentStagesStepTwo.section = index;
              that.currentStagesStepTwo.row = 0;
            }
            //加 网络请求 具体的 点击了哪一项，请求右侧的数据
            that.getStagesDetail(that.currentStagesStepTwo.id);
            that.getProviderForms(that.serviceOrganization.id);
          }
        });
      },
      clickMenuChild( section, row) {
        if(!this.isEmpty(this.currentStagesStepTwo) && !this.isEmpty(this.currentStagesStepTwo.section) &&this.currentStagesStepTwo.section== section){
          if(!this.isEmpty(this.currentStagesStepTwo) && !this.isEmpty(this.currentStagesStepTwo.row) &&this.currentStagesStepTwo.row== row){
            return;
          }
        }

        var item_par = this.stagesStepTwo[section];
        var item_ch = item_par.children[row];
        if(!this.isEmpty(item_ch.name) && item_ch.name.length < 1) return;

        if(this.isEditingMenu) {
          this.showMessage("warning","您正在编辑中");
          return
        }
        if( 2 == this.stepActive){
          var that = this;
          this.saveAll(1,function (netWork) {
            if(netWork){
              that.clearCurrentMenuIsActive(section,row);
              var obj = that.stagesStepTwo[section];
              var obj_child = obj.children[row];
              obj_child.isActive = !obj_child.isActive;
              that.currentStagesStepTwo = obj_child;
              that.currentStagesStepTwo.section = section;
              that.currentStagesStepTwo.row = row;
              // 网络请求
              that.getStepThreeRightDetail(that.currentStagesStepTwo.id);
            }
          })
          return;
        };
        if(this.focusState) return;
        // row
        this.nextClickMark.section = section;
        this.nextClickMark.section = row;
        var that = this;
        this.saveStateDetail(this.currentStagesStepTwo.id,function (mark) {
          if(mark){
            that.clearCurrentMenuIsActive(section,row);
            var obj = that.stagesStepTwo[section];
            var obj_child = obj.children[row];
            obj_child.isActive = !obj_child.isActive;
            that.currentStagesStepTwo = obj_child;
            that.currentStagesStepTwo.section = section;
            that.currentStagesStepTwo.row = row;
            //加 网络请求 具体的 点击了哪一项，请求右侧的数据
            that.getStagesDetail(that.currentStagesStepTwo.id);
            that.getProviderForms(that.serviceOrganization.id);
          }
        })
      },
      clickPage() {
        if (this.currentStagesStepTwo != undefined && this.currentStagesStepTwo != null) {
          this.currentStagesStepTwo.show = false;
        }
      },
      nextStep() {
        if(1 == this.stepActive){
          // 到达第二步骤
          // 1.保存当前页面的 右侧 数据
          // 2.成功之后  == 到达 第三步骤
          // 3.网络请求 (第三 步骤的)  a.左侧栏的 请求 b.右侧的数据  （左侧栏栏目的）
          // 本页的网络请求
          var that = this;
          this.saveStateDetail(1,function (mark) {
            if(mark){
              that.stepActive = 2;
              that.getLeftMenu(true);
            }
          });
        }else {
          if(0 == this.stepActive){
            // 此处需要做验证
            // 每一个需要选择
            if(this.isEmpty(this.currentServiceCategories) || this.currentServiceCategories.length<1){
              this.showMessage("warning","服务分类必须填写，请检查");
              return;
            }

            if(this.isEmpty(this.currentServiceCategoriesName) || this.currentServiceCategoriesName.length<1){
              this.showMessage("warning","服务名称必须填写，请检查");
              return;
            }
            if(this.radioCharge == 6){
              if(this.isEmpty(this.fee_value_start) || this.fee_value_start.length < 1 || this.fee_value_start<1){
                this.showMessage("warning","服务费用必须填写  必须是正整数，请检查");
                return;
              }
            }else if(this.radioCharge == 9){
              if(this.isEmpty(this.fee_value_fixed) || this.fee_value_fixed.length < 1 || this.fee_value_fixed<1){
                this.showMessage("warning","服务费用必须填写 必须是正整数，请检查");
                return;
              }
            }
            var that = this;
            if(!this.isEmpty(this.$route.query.produceId) && this.$route.query.produceId>0){ // 说明 不是新建的进来的 是编辑进来的
              this.updataProduct(this.produce_id_copy,function (mark) {
                if(mark){that.stepActive++; }
                // 获取 内审 和 操作人员 的列表
                that.netGetListAudits();
                that.netGetListOperationSettings();
              });
            }else {
              // 创建
              this.postCreatServiceProducts(function (val) {
                if(val){that.stepActive++;}
                that.netGetListAudits();
                that.netGetListOperationSettings();
              });
            }
          }else {
            if (this.stepActive++ > 2) this.stepActive = 0;
            that.netGetListAudits();
            that.netGetListOperationSettings();
          }
        }
      },
      backStep() {
        if(this.stepActive == 0){
          this.$router.go(-1);
          return;
        }
        if(2 == this.stepActive){
          this.stagesStepTwo  = this.leftMenuStepTwo;

          this.getLeftMenu(false);

          this.stepActive--
          return;
        }
        if (this.stepActive-- < 0) this.stepActive = 2;
      },
      //清除显示
      clearShowMenu:function () {
        if(this.currentStagesStepTwo != undefined && this.currentStagesStepTwo != null){
          this.currentStagesStepTwo.show = false;
        }
      },
      clearCurrentMenuIsActive:function (section,row) {
        // 点击了 子项目
        if(!this.isEmpty(section) && !this.isEmpty(row)){
          if(this.currentStagesStepTwo != undefined && this.currentStagesStepTwo != null){
            this.currentStagesStepTwo.isActive = false;
            return;
          }
        }


        if(this.currentStagesStepTwo != undefined && this.currentStagesStepTwo != null){
          this.currentStagesStepTwo.isActive = false;

          if(!this.isEmpty(this.currentStagesStepTwo.parent_id) && this.currentStagesStepTwo.parent_id>0){
            var id_par = this.currentStagesStepTwo.parent_id;
            this.stagesStepTwo.forEach(function (item) {
              if(id_par == item.id){
                item.isActive = false;
              }
            })
          }
        }
      },
      // type  增删改 123 addChild,是否是增加子目录  记录当前 section row(增删改查 之后的)
      dealWithIndexMenu(section,row,type,addChild){
        this.indexMenu.section = -100;
        this.indexMenu.row = -100;
        if(this.isEmpty(section) || this.isEmpty(row) || this.isEmpty(type) || section <0 || type<0)return;
        if(row<0){  // 父级操作
          switch(type) {
            case 1: //增
            {
              if(addChild){//增加子集
                var item = this.stagesStepTwo[section];
                this.indexMenu.row= item.children.length-1;
                this.indexMenu.section = section;
              }else { //增加父级
                this.indexMenu.section = section+1;
              }
            }
              break;
            case 2: // 删
            {
              this.indexMenu.section = section-1;
            }
              break;
            case 3: // 改
            {
              this.indexMenu.section = section;
            }
              break;
          }
        }else { // 子级操作
          switch(type) {
            case 1: //增
            {
              this.indexMenu.section = section;
              this.indexMenu.row = row+1;
            }
              break;
            case 2: // 删
            {
              this.indexMenu.section = section;
              var item = this.stagesStepTwo[section];
              if(item.children.length>0){ //代表里面还有
                if(row == 0)   this.indexMenu.row = 0;
                else  this.indexMenu.row = row-1;
              }else { //全部删除了，没有了

              }
            }
              break;
            case 3: // 改
            {
              this.indexMenu.section = section;
              this.indexMenu.row = row;
            }
              break;
          }
        }
      },
      getStageDetailAfterEditMenu(){
        var tagget_id = -100;
        var item = undefined;
        var item_ch = undefined;
        if(this.indexMenu.section >= 0) {
          item =  this.stagesStepTwo[this.indexMenu.section];
          item.isActive = true;
          tagget_id = item.id;
          this.currentStagesStepTwo = item;
        }
        if(!this.isEmpty(item) && this.indexMenu.row >= 0 ){
          item_ch = item.children[this.indexMenu.row];
          item_ch.isActive = true;
          tagget_id = item_ch.id;
          this.currentStagesStepTwo = item_ch;
        }
        if(tagget_id >= 0) {
          var that = this;
          this.getStagesDetail(tagget_id,function (mark) {
            if(mark){
              that.currentStagesStepTwo.section = that.indexMenu.section;
              that.currentStagesStepTwo.row = that.indexMenu.row;
            }
          });
        }
      },
      // when leftmenu save error deal data
      dealWithSaveStateMenuError(){
        if(!this.isEmpty(this.stagesStepTwoCopy)){
          this.stagesStepTwo = this.cloneObjGol(this.stagesStepTwoCopy);
        }
        this.stagesStepTwoCopy = undefined;
        this.isEditingMenu = false; //不处于编辑中
        this.focusState = false;
        for(var i=0;i<this.stagesStepTwo.length;i++){
          var item = this.stagesStepTwo[i];
          if(item.isActive) this.currentStagesStepTwo = item;
          for(var j=0;j<item.children.length;j++){
            var obj = item.children[j];
            if(obj.isActive) this.currentStagesStepTwo = obj;
          }
        }

      },
      // 点击事件，点击左侧栏第一层 右侧的图标 显示
      showMenu(val, obj) {
        if( 2 == this.stepActive) {
          return;
        }
        if(this.isEditingMenu) {
          this.showMessage("warning","您正在编辑，不可以再次点击编辑");
          return
        }
        this.clearShowMenu();
        this.stagesStepTwoCopy = this.cloneObjGol(this.stagesStepTwo);
        var item = this.stagesStepTwo[val];
        item.show = !item.show;
        this.currentStagesStepTwo = obj;
        this.$set(this.stagesStepTwo, val, this.stagesStepTwo[val]);
      },
      // 子阶段中 点击 展示的 弹框
      showMenuRow(section, row) {
        if( 2 == this.stepActive) {
          return;
        }
        if(this.isEditingMenu) {
          this.showMessage("warning","您正在编辑，不可以再次点击编辑");
          return
        }
        this.clearShowMenu();
        this.stagesStepTwoCopy = this.cloneObjGol(this.stagesStepTwo);
        var item = this.stagesStepTwo[section];
        var obj = item.children[row];
        obj.show = !obj.show;
        this.currentStagesStepTwo = obj;
      },
      addSection: function (index) {
        if(this.isEditingMenu) {
          this.showMessage("warning","您正在编辑，不可以再次点击编辑");
          return
        }
        this.isEditingMenu = true;
        // 隐藏
        var obj = this.stagesStepTwo[index];
        obj.show = false;
        var item = this.cloneObj(this.modelStage);
        item.children = [];
        this.stagesStepTwo.insert(index + 1, item);
        this.dealWithIndexMenu(index,-100,1,false);

      },
      // 增加子目录,直接放在最后一个
      addSectionChild: function (index) {
        if(this.isEditingMenu) {
          this.showMessage("warning","您正在编辑，不可以再次点击编辑");
          return
        }
        this.isEditingMenu = true;
        // 隐藏
        var obj = this.stagesStepTwo[index];
        //normal 的情况下 才会有效
        if(obj.category != "normal"){
          return;
        };
        obj.show = false;
        var item = this.cloneObj(this.modelStage);
        item.parent_id = obj.id;
        var obj = this.stagesStepTwo[index];
        obj.children.push(item);
        this.dealWithIndexMenu(index,-100,1,true);
      },
      // 重命名
      renameSection(index) {
        if(this.isEditingMenu) {
          this.showMessage("warning","您正在编辑，不可以再次点击编辑");
          return
        }
        this.isEditingMenu = true;
        // 隐藏
        var obj = this.stagesStepTwo[index];
        if(obj.category != "normal"){
          return;
        };
        obj.show = false;
        var item = this.stagesStepTwo[index];
        item.name = "";
        this.indexMenu.section = index;
        this.dealWithIndexMenu(index,-100,3,false);
      },
      // 删除 目录
      removeSection(index) {
        if(this.isEditingMenu) {
          this.showMessage("warning","您正在编辑，不可以再次点击编辑");
          return
        }
        var item = this.stagesStepTwo[index];
        if(item.category != "normal"){
          item.show = false;
          return;
        };
        if(item.children.length > 0){
          this.showMessage("warning","请先全部的 子目录，请检查或则联系开发人员");
          item.show = false;
          return;
        }
        this.isEditingMenu = true;
        // 网络请求
        var that = this;
        this.deleteStage(item.id,function (mark) {
          if(mark){
            // 必须先将 show 设置为 false
            item.show = false;
            that.stagesStepTwo.splice(index,1);
            that.currentStagesStepTwo = {};
            that.isEditingMenu = false;
            that.dealWithIndexMenu(index,-100,2,false);
            that.getStageDetailAfterEditMenu();
          }else {
            that.dealWithSaveStateMenuError();
          }
        })
      },
      //子目录中的增删改查
      addRow(section, row) {
        if(this.isEditingMenu) {
          this.showMessage("warning","您正在编辑，不可以再次点击编辑");
          return
        }
        this.isEditingMenu = true;

        var obj = this.stagesStepTwo[section];
        var obj1 = obj.children[row];
        obj1.show = false;
        var item = this.cloneObj(this.modelStage);
        obj.children.insert(row + 1, item);
        this.dealWithIndexMenu(section,row,1,false);
      },
      // 重命名 子目录
      renameRow(section, row) {
        if(this.isEditingMenu) {
          this.showMessage("warning","您正在编辑，不可以再次点击编辑");
          return
        }
        this.isEditingMenu = true;
        var item = this.stagesStepTwo[section];
        var obj = item.children[row];
        obj.name = "";
        obj.show = false;
        this.dealWithIndexMenu(section,row,3,false);
      },
      removeRow(section, row) {
        if(this.isEditingMenu) {
          this.showMessage("warning","您正在编辑，不可以再次点击编辑");
          return
        }
        this.isEditingMenu = true;
        var item = this.stagesStepTwo[section];
        var obj = item.children[row];
        // 网络请求
        var that = this;
        this.deleteStage(obj.id,function (mark) {
          that.isEditingMenu = false;
          if(mark){
            // 必须先将 show 设置为 false
            obj.show = false;
            item.children.splice(row,1);
            that.currentStagesStepTwo = {};
            that.dealWithIndexMenu(section,row,2,false);
            that.getStageDetailAfterEditMenu();
          }else {
            that.dealWithSaveStateMenuError();
          }
        })
      },
      keyDown(e) {
        //传过来的 index 为第一层 的index
        // 拿到输入框的名字 和 位置 添加 版本
        var index = e.target.name;
        var name = e.target.value;
        var obj = this.stagesStepTwo[index];
        obj.name = name;
      },
      // 失去焦点
      blueLeave(e) {
        //传过来的 index 为第一层 的index
        // 拿到输入框的名字 和 位置 添加 版本
        var index = e.target.name;
        var name = e.target.value;
        if(name.length<1){
          return;
        };
        var obj = this.stagesStepTwo[index];
        obj.name = name;
        // 网络请求 保存
        this.saveStateMenu(index);
      },
      // 第一层中增加子阶段
      keyDownChild(e) {
        //修改 子目录的名称
        var section = e.target.name;
        var name = e.target.value;
        var row = e.target.alt;
        var obj = this.stagesStepTwo[section];
        var item = obj.children[row];
        item.name = name;
      },
      focusAddName(){
        this.focusState = true;
      },
      // 失去焦点
      blueLeaveChild(e) {
        this.focusState = true;
        var section = e.target.name;
        var name = e.target.value;
        if(name.length<1){
          return;
        };
        var row = e.target.alt;
        var obj = this.stagesStepTwo[section];
        var item = obj.children[row];
        item.name = name;

        this.saveStateMenu(section,row);
      },
      //新增功能 ，删除当前的 一行操作
      deleteOperatorItem(item,index){
        this.list_audit.splice(index,1);
      },
      addOperatorItem(){
        this.list_audit.push({});
      },
      // 拷贝对象  深拷贝
      cloneObj: function (obj) {
        var o, i, j, k;
        if (typeof(obj) != "object" || obj === null)return obj;
        if (obj instanceof (Array)) {
          o = [];
          i = 0;
          j = obj.length;
          for (; i < j; i++) {
            if (typeof(obj[i]) == "object" && obj[i] != null) {
              o[i] = arguments.callee(obj[i]);
            }
            else {
              o[i] = obj[i];
            }
          }
        }
        else {
          o = {};
          for (i in obj) {
            if (typeof(obj[i]) == "object" && obj[i] != null) {
              o[i] = arguments.callee(obj[i]);
            }
            else {
              o[i] = obj[i];
            }
          }
        }
        return o;
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .current_paoviders_g {
    margin-left: 10px;
  }

  .state_name {
    max-width: 112px;
  }

  .el-step__title {
    margin-left: -50px!important;
  }
  .is-process {
    margin-left: -50px!important;
  }

  .css_text_blue{
    color: #3c8ced;
  }
  .css_text_del{
    color: red;
    font-weight: 800;
  }

  // 鼠标到达变小手
  .css_cursor_pointer{
    cursor: pointer;
  }
  //暗的 透明度降低
  .css_opacity_dark{
    opacity: 0.5;
  }
  .css_button_choose_file {

    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #1b1b1b;
    border: 1px solid #efefef;
    width: 180px;
    height: 30px;

  }

  .css_base_check {
    zoom: 150%;
    margin-top: 3px;
  }
  .css_bass_check_span {
    /*zoom: 150%;*/
    /*margin-left: 20px;*/
    font-family:MicrosoftYaHei;
    font-size:14px;
    color:#1b1b1b;
    /*line-height:14px;*/
    display: inline-block;
    margin-top: -5px;
  }

  // 基础的 selected 的 样式
  .css_base_select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding-left:5px;
    padding-right:14px;
    padding-left:5px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    min-height: 30px;
    background:url("http://static.bokao2o.com/images/s3backend/dp_arraw_small.png") no-repeat scroll right center transparent;
    min-width: 100px;
    margin-left: 20px;
  }



  // 字体的一般配置
  @mixin text_nomal {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #1b1b1b;
    text-align: left;
  }
  /*粗体*/
  @mixin base_font_bold{
    font-weight: 800;
  }
  @mixin  base_shadow {
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.3);
  }

  @mixin base_input {
    background:no-repeat 0 0 scroll ＃EEEEEE;
    border:1px solid #efefef;
    outline:medium;
    background:#ffffff;
    border-radius:3px;
  }
  /* 下划线 button*/
  .span_button_underline{
    font-family:MicrosoftYaHei;
    font-size:14px;
    color:#3c8ced;
    text-decoration: underline ;
  }
  /*选中的 蓝色的样式*/
  .bg_selected_blue {
    background:#3c8ced;
    color: white!important;
  }

  .base_input{
    background:no-repeat 0 0 scroll ＃EEEEEE;
    border:1px solid #efefef;
    outline:medium;
    background:#ffffff;
    border-radius:3px;
  }

  // 左侧 选择栏 不可选 状态样式  ，字体变灰
  .menu_unsected_font_color{
    color: #a9a9a9;
  }



  .service-add {
    /*min-height: 800px;*/
  }

  .bg_sected {
    background-color: #3c8ced;
  }

  .bg_unsected {
    background-color: #f5f5f5;
  }
  /*图文并列的 button样式*/
  .base_button_icon_text {
    span{
      font-family:MicrosoftYaHei;
      font-size:14px;
      color:#3c8ced;
      text-align:left;
      text-decoration:underline;
    }
  }

  .menu_parent {
    /*鼠标悬停 可以点击*/
    cursor: pointer;
    min-height: 50px;
    /*此处用法有些奇葩，后期需要改*/
    > div:nth-child(2) {
      border-top: 1px solid #e6e6e6;
    }
    .menu_child {
      cursor: pointer;
      border-bottom: 1px solid #e6e6e6;
      height: 50px;
      line-height: 50px;
      /*overflow: hidden;*/
      /*background-color: red;*/
      .icon_menu_left {
        @extend .icon_menu;
        margin-top: 0px!important;
      }
      > div {
        /*margin-top: 10px;*/
        float: left;
        height: 50px;
        /*background-color: red;*/
      }
    }
    > div:last-child {
      border-bottom: 0px solid #e6e6e6;
    }
    .menu_parent_item {
      height: 50px;
      > div{
        line-height: 50px;
      }
    }
  }

  .button_base {
    width: 100px;
    border-radius: 5px;
    font-weight: 400;
    background-color: white;
    height: 30px;
    margin-right: 30px;
  }

  .button_blue {
    @extend .button_base;
    background-color: #0a628f;
  }

  .icon_menu_add {
    margin-top: 12px !important;
    margin-left: 10px;
    margin-right: 10px !important;
  }

  .main-body {
    /*background-color: red;*/
    margin: 10px;
    padding: 10px;
  }

  .step_footer{
    overflow: hidden;
    /*background-color: red;*/
    width: 300px;
    margin: 0 auto;
    margin-bottom: 30px;
    div{
      float: right;
      margin-left: 30px;
      margin-right: 10px;
      /*width: 70px;*/
      &:first-child{
        float: left;
      }
    }
    .save {
      margin-right: 35px;
    }

  }

  .line {
    margin-top: 10px;
    margin-bottom: 30px;
    > span {
      display: inline-block;
      width: 90px;

      font-family:MicrosoftYaHei;
      font-size:14px;
      color:#1b1b1b;
      //      @include base_font_bold;

      &:first-child {
        width: 90px;
        margin-right: 10px;

        font-family:MicrosoftYaHei;
        font-size:14px;
        color:#5c5c5c;
      }
      &:nth-child(2) {
        width: 126px;
        margin-right: 10px;
      }

      input {
        height: 32px !important;
      }
    }
    .span_in_el {
      /*background-color: #0c57bd;*/
      display: inline-block;
      width: 126px;

    }
  }
  /*选择 操作者的 板块*/
  .choose_operators {

    position: relative;

    .operators_del{
      position: absolute;
      /*background-color: red;*/
      right: 10px;
      top:10px;
      color:red;
    }

    $width_item: 170px;
    /*height: 200px;*/
    display: -webkit-box;
    overflow-x: scroll;
    -webkit-overflow-scrolling:touch;
    border:1px solid #ccc;

    .operator_item {
      width: $width_item;
      /*height: 200px;*/
      /*height: 173px;*/
      /*background-color: red;*/
      height: auto;
      overflow: hidden;

      > div{
        float: left;
      }
      .operator_left {
        .li_icon {
          position: relative;
          margin-top: 15px;
          margin-left: 37px;
          img {
            width: 50px;
            height: 50px;
            &:first-child{
              margin-left: 20px;
            }
          }
          .img_del{
            position: absolute;
            width: 15px;
            height: 15px;
            left: 80px;
          }
        }
        .li_des {
          span{
            font-family:MicrosoftYaHei;
            font-size:14px;
            color:#1b1b1b;
            margin-left: 20px;
            margin-top: 10px;
            display: inline-block;
            margin-bottom: 10px;
            text-align: center;
            width: 100% !important;
          }
        }
        .li_select {
          width: 89px;
          height: 40px;
          margin-left: 20px;
        }
        .li_add {
          margin-top: 15px;
          img{
            /*margin-top: 44px;*/
          }
        }

        .icon {
          display: inline-block;
          width: 50px;
          height: 50px;
          border-radius: 25px;
          background-color: red;
          line-height: 50px;
          margin-left: 10px;
          margin-right: 10px;
          img {
            text-align: center;
            margin-left: 16px;
          }
        }
        .span_button {
          margin-top: 10px;
          margin-left: 15px;
          display: inline-block;
          border-radius: 3px;
          width: 90px;
          height: 30px;

          font-family:MicrosoftYaHei;
          font-size:14px;
          color:#3c6ea9;
          text-align: center;
          line-height: 30px;
          background:#e4f0ff;
          border-radius:4px;
          width:91px;
          height:31px;
          margin-left: 30px;
        }
      }
      .operator_right {
        height: 100%;
        text-align: center;
        vertical-align: middle;
        margin-left: -10px;
        margin-top: 30px;
        img{
          /*margin-top: 64px;*/
        }
      }
    }

    .default {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      border-radius: 30px;
      text-align: center;
      vertical-align: middle;
      line-height: 60px;
      color: #1b1b1b;
      margin: 0 auto;
      margin-top: 15px;
    }
    .add {
      cursor: pointer;
      border:1px dashed #a9a9a9;
      background-color: transparent;
      /*background: url("../images/add_person.png") center no-repeat;*/
      background: url("../../../assets/images/serviceadd/add_person.png") center no-repeat;
    }
    .add-no {
      border:1px dashed #a9a9a9;
      background-color: transparent;
      background: url("../../../assets/images/serviceadd/add_no.png") center no-repeat;
    }
    .finsh{
      border:0px dashed #a9a9a9 !important;
      background-color: transparent;
      color: black;
    }
    .xz-oper-edit{
      background:#fff !important;
      border:1px solid #d1d1d1;
      color: black !important;
      /*background: url("../images/add_no.png") center no-repeat;*/
    }
    .no-oper{
      background:#efefef;
      border:1px solid #d1d1d1;
    }
    .edit{
      background-color: #4688da;
      color: #fff;
    }
    .bi{
      cursor: pointer;
      width: 11px;
      height:11px;
      position: absolute;
      right: 15px;
      top: 60px;
      background: url("../../../assets/images/serviceadd/bi.jpg") 0 0 no-repeat;
      z-index: 5;
    }
    /*新增的功能*/
    .operator_header {
      width: auto ;
      min-width: 130px;
      border: 1px solid #efefef;
      .operator_left{
        position: relative;
        width: 100%;
        .li_text{
          margin-top: 10px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #1b1b1b;
          text-align: center;
        }
        ul{
          li{
            margin-left: 20px !important;
            margin-right: 20px !important;
            text-align: center;
            img{
              margin-left: 0px !important;
            }
          }
          .li_icon{

          }
          .li_text{
            margin-top: 10px;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: #1b1b1b;
          }
        }
      }
    }
  }

  /* 第二部*/
  .step_two {
    min-height: 500px;
    .middle_ul_li {
      /*height: 117px;*/
      min-height: 117px;
      border-top: 1px dashed  #efefef;
      border-bottom:1px dashed  #efefef;
      ul{
        li{
          margin-top: 12px;
          margin-left: 5px;
        }
      }
    }
    .set_header_css {
      height: 50px;
      line-height: 50px;
      span{
        display: inline-block;
        vertical-align: middle;
        &:first-child{
          background:#3c8ced;
          width:4px;
          height:16px;
          line-height: 16px;
        }
        &:last-child{
          margin-left:8px;
          font-family:MicrosoftYaHei-Bold;
          font-size:14px;
          color:#1b1b1b;
          @include base_font_bold;
          height:16px;
          line-height: 16px;
        }
      }
    }
    overflow: hidden;

    .left {
      box-shadow: 0 0 5px 0 rgba(0,0,0,0.3);
      float: left;
      margin-left: 10px;
      margin-bottom: 90px;
      .icon_menu {
        display: inline-block;
        height: 11px;
        width: 15px;
        vertical-align: middle;
        margin-top: 5px;
        margin-right: 5px;
      }

      /*第一层*/
      &:nth-child(1) {
        width: 218px;
        text-align: center;
        background-color: #f5f5f5;
        /*background-color: red;*/
        border: 1px solid #efefef;
        /*字体设置*/
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #1b1b1b;
        > div {
          border-bottom: 1px solid #e6e6e6;
          min-height: 50px;
          /*padding-top: 16px;*/

          &:last-child {
            /*div 中最后一个*/
            border-bottom: none;
            /*background-color: red;*/
          }
        }
      }
      &:nth-child(2) {
        background-color: red!important;
        background-color: #0b6fa2;
        float: right;
        width: calc(100% - 238px);
        min-height: 600px;
      }
      /*处理显示的内容*/
      .show_menu_child {
        left: 180px !important;
        top: 0px !important;
        box-shadow: 0 0 5px 0 rgba(0,0,0,0.3);
        z-index: 300;
      }

      .show_menu {
        box-shadow: 0 0 5px 0 rgba(0,0,0,0.3);
        width: 142px;
        /*height: 160px;*/
        position: absolute;
        left: 200px;
        top: 20px;
        z-index: 200;

        /*字体等样式*/
        @include text_nomal;
        ul {
          li {
            width: 142px;
            height: 34px;
            /*display: inline-block;*/
            background-color: white;
            line-height: 34px;
            overflow: hidden;
            span {
              display: inline-block;
              float: left;

              /*margin-left: 10px;*/
            }
          }
        }
      }
    }

    .right_header_base {
      height: 40px;
      background:#efefef;
      vertical-align: middle;
      padding-left: 16px;
      font-family:MicrosoftYaHei;
      font-size:16px;
      color:#1b1b1b;
      text-align:left;
      span {
        display: inline-block;
        /*line-height: 40px;*/
        vertical-align: middle;
        margin-top: -10px;
      }
    }

    /*右侧的样式*/
    .right {
      float: left;
      width: calc(100% - 300px);
      padding-left: 22px;
      padding-top: 20px;
      border:1px solid #efefef;
      .addType{
        font-size:14px;
        border:1px solid #d1d1d1;
        width:714px;
        height:97px;
        line-height: 97px;
        margin-left: 20px;
        color:#5c5c5c;
        text-align:center;
        img{
          vertical-align: sub;
        }
      }
      // 具体的文件
      .flie_item {
        margin-bottom:0px !important;
        height: auto!important;
        margin-left: 20px;
        margin-right: 30px;
        > span:nth-child(2){
          font-family:MicrosoftYaHei;
          font-size:14px;
          color:#1b1b1b;
          line-height:14px;
          text-align:left;
        }
        > span:nth-child(3){
          margin-left: 100px;
          font-family:MicrosoftYaHei;
          font-size:14px;
          color:#5c5c5c;
          text-align:left;
        }
        > span:last-child{
          float: right;
        }
      }
      /*工单 的 title的样式 *标题*/
      .work_order_title{
        margin-bottom: 0px;
        padding-top: 10px;
        min-height: 62px;
        span{
          margin-left: 0px!important;
        }
        span{
          &:first-child{
            color:red;
          }
          &:last-child{
            margin-left: 0px!important;
            font-family:MicrosoftYaHei;
            font-size:14px;
            text-align:left;
          }
          input{
            width: 70%;
            margin-left: 15px;
            height: 32px;
            @include base_input;
          }
        }
      }

      .work_order_content {
        span{
          margin-left: 0px!important;
          &:first-child{
            margin-left: 0px!important;
            font-family:MicrosoftYaHei;
            font-size:14px;
            text-align:left;
          }
        }
        textarea {
          @include base_input;
          margin-left: 20px;
          height: 62px;
        }
      }

      .work_order_temp {
        span {
          &:first-child{
            font-family:MicrosoftYaHei;
            font-size:14px;
            color:#1b1b1b;
            text-align:left;
            margin-left: 0px!important;
          }
          &:last-child{
            margin-left: 5px!important;
          }
        }
        img{
          margin-left:5px!important;
          &:last-child{
            margin-left:10px!important;
          }

        }

      }


      > div {
        margin-right: 22px;
        /*background-color: #0a6999;*/
      }

      .header {
        height: 40px;
        background:#efefef;
        vertical-align: middle;
        padding-left: 16px;
        font-family:MicrosoftYaHei;
        font-size:16px;
        color:#1b1b1b;
        text-align:left;
        span {
          display: inline-block;
          /*line-height: 40px;*/
          vertical-align: middle;
          margin-top: -12px;
        }
      }
      // 头部下面
      /*操作设置*/
      .operation_setting {
        .set_header {
          @extend .set_header_css;
        }
        /*此处可以继承下面的样式 后面再弄*/
        .operation_setting_middle{
          @extend .middle_ul_li;
        }
      }
      .service_contract {
        .service_contract_menu {
          margin-top: 10px;
          height: 50px;
          font-family:MicrosoftYaHei;
          font-size:14px;
          color:#3c8ced;
          text-align:left;
          span {
            display: inline-block;
            margin-top: 18px;
          }
        }
        .service_contract_middle {
          @extend .middle_ul_li;
          //新加的 选择人员的样式
          .ch_peo {
            ul{
              font-family: MicrosoftYaHei;
              font-size: 14px;
              color: #1b1b1b;
              overflow: hidden;
              li{
                /*float: left;*/
                position: relative;

                /*width: 80px;*/
                .icon_del {
                  width: 20px;
                  height: 20px;
                  top: 0px;
                  right: 0px;
                  /*position: absolute;*/
                  /*background-color: red;*/
                }
                .ch_peo_item {

                }
              }
            }
          }
        }
        .choose_form {
          /*opacity:0.5;*/
          font-family:MicrosoftYaHei;
          font-size:14px;
          color:#3c8ced;
          text-align:left;
          // 表单上传的 具体显示
          .choose_form_content {
            span {
              display: inline-block;
              margin-left: 10px;
              margin-top: 15px;
            }
            /*background-color: red;*/
            height: 40px;
            font-family:MicrosoftYaHei;
            font-size:14px;
            color:#1b1b1b;
            line-height:14px;
            text-align:left;
          }
          /*合同阶段*/

        }
        /*合同阶段的css*/
        .compact_stage {
          .first {
            font-family:MicrosoftYaHei;
            font-size:14px;
            color:#a9a9a9;
            letter-spacing:0;
            line-height:14px;
            text-align:left;
            margin: 0 auto;
            height: 40px;
            span{
              display: inline-block;
              margin-top: 13px;
              width: 100%;
              text-align: center;
            }
          }

          /*上传按钮*/
          .button_upload {
            /*background-color: red;*/
            width: 90px;
            margin: 0 auto;
            height: 80px;
            padding-top: 20px;
          }
        }
      }

      /* 预设工单 的 板块 */
      .word_order_pre {

        .set_header {
          @extend .set_header_css;
        }

        /*几种 工单类型的 表单*/
        .work_order {
          background:#ffffff;
          margin-top: 10px;
          border:1px solid #efefef;
          box-shadow: 0 0 5px 0 rgba(0,0,0,0.3);
          padding-bottom: 20px;

          /*头部蓝色区域*/
          > div{
            overflow: hidden;
            margin-bottom: 10px;
            height:39px;
            margin-left: 31px;
            span {
              margin-left: 10px;
              display: inline-block;
              margin-top: 10px;
            }
            &:nth-child(1){
              background:#d8eaff;
              margin-left: 0px;
            }
            &:last-child{
              margin-bottom: 10px;
            }
          }
        }
      }
    }
    .right_step_three {
      float: left;
      border:1px solid #efefef;
      /*height:811px;*/
      min-height: 811px;
      width: calc(100% - 300px);
      padding: 20px;

      .audit{
        width: 100%;
        /*height:354px;*/
        border-bottom:1px dashed #efefef;

        //新加的功能
        .add_audit {
          padding: 5px;
          border: 1px solid #efefef;
        }

        .span_text_nomal {
          font-family:MicrosoftYaHei;
          font-size:14px;
          color:#a9a9a9;
          text-align:left;
          height: 50px;
          line-height: 50px;
          margin-left: 10px;
        }
      }
      .operationer {
        width: 100%;
        /*height: 398px;*/

        .operation_setting_middle{
          @extend .middle_ul_li;
          border-top: 0px dashed  #efefef;
          border-bottom:0px dashed  #efefef;
        }

      }

    }
  }


  /*悬浮框 需要 不断的改变位置*/
  .suspension{
    width: 150px;
    background:#fff;
    position: absolute;
    /*left: 65%;*/
    right: 10px;
    top: 470px;
    z-index: 200;
    ul{
      padding: 0;
      margin: 0;
      box-shadow: 0 0 5px 0 rgba(0,0,0,0.3);
      li{
        padding-left: 10px;
        line-height: 40px;
        cursor: pointer;
        color: #3c8ced;
        &:hover{
          background: #f3f3f3;
        }
      }
      li:first-child{
        background: #3c8ced;
        color: #fff;
      }
    }
  }

  /*pop 选择操作人员*/
  .pop_operator_content {
    border: 1px solid #efefef;
    overflow: hidden;
    > div{
      width: 40%;
      &:first-child{
        width: 20%;
        /*background-color: #b2e2fa;*/
        border-bottom: 1px solid #efefef;
        ul{
          li{
            border-bottom: 1px solid #efefef;
            border-left: 0px solid #efefef!important;
            &:last-child{
              border-bottom: 0px solid #efefef;
            }
          }
        }
      }
    }
    .operator_item {
      float: left;
      ul{
        overflow-y: auto;
        max-height: 163px;
        border-left: 1px solid #efefef;
        li{
          height: 38px;
          font-family:MicrosoftYaHei;
          font-size:14px;
          color:#5c5c5c;
          letter-spacing:0;
          text-align: center;
          line-height: 38px;
        }
      }
      .li_header {
        font-family:MicrosoftYaHei;
        font-size:14px;
        color:#1b1b1b;
        letter-spacing:0;
        @include base_font_bold;
        /*background-color: rebeccapurple;*/
        text-align: center;
        height: 38px;
        line-height: 38px;
        background:#efefef;
      }
    }
    .other_operator {
      border-left: 1px solid #efefef;
      height: 153px;
      width: 79%;
      text-align: center;
      /*line-height: 70px;*/
      span{
        display: inline-block;
        margin-top: 40px;
        &:last-child{
          margin-top: 0px;
        }
      }
    }

  }



</style>
