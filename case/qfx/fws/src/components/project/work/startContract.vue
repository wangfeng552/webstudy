<template>
  <div class="bgfff">
    <div class="gd-box" v-if="type=='zero'">
      <div class="title">
        <i class="tit-fqht"></i>
        <span class="top-title describe">
        <el-input placeholder=发起合同 v-model="ticket_ji.title" :disabled='isDisabled'></el-input>
        </span>
      </div>
      <div class="content">
        <p class="fs14 fc5c5">合同签署流程：</p>
        <div class="sign-flow">
          <ul class="clearfix">
            <li>
              <i class="icon-step first-step"></i>
              <p class="step-content">
                服务商发出合同草案<br>企业确认合同草案
              </p>
            </li>
            <li>
              <i class="icon-step second-step"></i>
              <p class="step-content">
                服务商盖章寄送合同给企业<br>一式两份
              </p>
            </li>
            <li>
              <i class="icon-step third-step"></i>
              <p class="step-content">
                企业收到服务商寄送的合同<br>共两份
              </p>
            </li>
            <li>
              <i class="icon-step fourth-step"></i>
              <p class="step-content">
                企业盖章寄送合同给服务商<br>一份寄出，一份留底
              </p>
            </li>
          </ul>
        </div>
        <div class="input-item">
          <div class="chooose-file clearfix">
            <!--展示选择的文件 start =====-->
            <div  class="file-list">
              <ul>
                <li v-for="(item,i) in ticket.contract_attachments">
                  <i class="icon-file" :class="item.name | filterIconClass"></i>
                  <a :title="item.name" class="name">{{item.name}}</a>
                  <i class="icon-delete fr" v-if="!isDisabled" @click="removeFileLocal(i)"></i>
                </li>
              </ul>
            </div>
            <p class="grey-border" v-if="ticket_ji.contract_attachments.length"></p>
            <div class="tit clearfix">
              <div class="file-upload-work-nomal">
                <div class="file-note">{{fileSupportFormatGol}}</div>
                <file-upload :listAttachmentsId="listAttachmentsId"
                             v-if="ticket_ji.contract_attachments && hasRoot && isNotComplete && canOperation"
                             :isFileEmpty="isFileEmpty"></file-upload>
                <!--<el-upload-->
                <!--class="upload-demo"-->
                <!--ref="upload"-->
                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                <!--:on-change="changeFileContract"-->
                <!--:show-file-list="false"-->
                <!--:multiple="true"-->
                <!--:auto-upload="false">-->
                <!--<el-button type="text" v-if="ticket_ji.contract_attachments && hasRoot && isNotComplete && canOperation" slot="trigger"  class="upload-btn">{{ticket_ji.contract_attachments.length>0 ? '继续上传' :'选取文件'}}</el-button>-->
                <!--</el-upload>-->

              </div>
            </div>
            <!--end ==============================================-->
          </div>
          <p class="grey-border" v-if="hasRoot && isNotComplete && canOperation"></p>
          <div class="btn-box" v-if="hasRoot && isNotComplete && canOperation">
            <span class="custom-btn">
              <el-button  :disabled="isFileEmpty.isShow" @click='changeEventCancelStage'>取消</el-button>
            </span>
            <el-button  type="primary"
                        @click="changeStartContractSendOther"
                        :disabled="isFileEmpty.isShow">发送给企业</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--<p>发起合同</p>-->
    <!--观察者视角 start=========================-->
    <!-- one 线上 -->
    <div class="gd-box" v-if="type=='one' &&currentProject.source=='online' && !hasRoot" style="padding-bottom: 0px">
      <div class="title">
        <i class="tit-fqht"></i>
        <span class="describe">{{ticket.title}}</span>
      </div>
      <div class="content">
        <p class="fs14 fc5c5">合同签署流程：</p>
        <div class="sign-flow">
          <ul class="clearfix">
            <li>
              <i class="icon-step first-step"></i>
              <p class="step-content">
                服务商发出合同草案<br>企业确认合同草案
              </p>
            </li>
            <li>
              <i class="icon-step second-step"></i>
              <p class="step-content">
                服务商盖章寄送合同给企业<br>一式两份

              </p>
            </li>
            <li>
              <i class="icon-step third-step"></i>
              <p class="step-content">
                企业收到服务商寄送的合同<br>共两份
              </p>
            </li>
            <li>
              <i class="icon-step fourth-step"></i>
              <p class="step-content">
                企业盖章寄送合同给服务商<br>一份寄出，一份留底
              </p>
            </li>
          </ul>
        </div>
        <div class="input-item">
          <div class="chooose-file clearfix">
            <p class="not-upload">
              <i class="icon-notup"></i>
              <span>等待操作者发起合同草案</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--观察者视角 end=========================-->

    <!--<p>创建</p>-->
    <!-- one 线上 -->
    <div class="gd-box" v-if="type=='one' &&currentProject.source=='online' && hasRoot" style="padding-bottom: 0px">
      <div class="title">
        <i class="tit-fqht"></i>
        <span class="describe">{{ticket.title}}</span>
      </div>
      <div class="content">
        <p class="fs14 fc5c5">合同签署流程：</p>
        <div class="sign-flow">
          <ul class="clearfix">
            <li>
              <i class="icon-step first-step"></i>
              <p class="step-content">
                服务商发出合同草案<br>企业确认合同草案
              </p>
            </li>
            <li>
              <i class="icon-step second-step"></i>
              <p class="step-content">
                服务商盖章寄送合同给企业<br>一式两份

              </p>
            </li>
            <li>
              <i class="icon-step third-step"></i>
              <p class="step-content">
                企业收到服务商寄送的合同<br>共两份
              </p>
            </li>
            <li>
              <i class="icon-step fourth-step"></i>
              <p class="step-content">
                企业盖章寄送合同给服务商<br>一份寄出，一份留底
              </p>
            </li>
          </ul>
        </div>
        <!--蒙版 start ===== -->
        <div class="mask" v-if="currentProject.source=='offline'">
          <span>
            本项目为线下项目，请线下与企业确认合同并签署，然后开启下一步。
            请务必确保在“企业付款”前将双方已盖章的合同扫描件上传至平台。
          </span>
        </div>

        <div class="input-item">
          <div class="chooose-file clearfix">
            <!--展示选择的文件 start =====-->
            <div  class="file-list">
              <ul>
                <li v-for="(item,i) in ticket.contract_attachments">
                  <i class="icon-file" :class="item.name | filterIconClass"></i>
                  <a :title="item.name" class="name">{{item.name}}</a>
                  <i class="icon-delete fr" v-if="!isDisabled" @click="removeFileLocal(i)"></i>
                </li>
              </ul>
            </div>
            <p class="grey-border" v-if="ticket_ji.contract_attachments.length>0"></p>
            <div class="tit clearfix">
              <div class="file-upload-work-nomal">
                <div class="file-note">{{fileSupportFormatGol}}</div>
                <!--<el-upload-->
                <!--class="upload-demo"-->
                <!--ref="upload"-->
                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                <!--:on-change="changeFileContract"-->
                <!--:show-file-list="false"-->
                <!--:multiple="true"-->
                <!--:auto-upload="false">-->
                <!--<el-button type="text" v-if="ticket_ji.contract_attachments && hasRoot && isNotComplete && canOperation" slot="trigger"  class="upload-btn">{{ticket.contract_attachments.length>0 ? '继续上传' :'选取文件'}}</el-button>-->
                <!--</el-upload>-->

                <file-upload :listAttachmentsId="listAttachmentsId"
                             v-if="ticket_ji.contract_attachments && hasRoot && isNotComplete && canOperation"
                             :isFileEmpty="isFileEmpty"></file-upload>
              </div>
            </div>
            <!--end ==============================================-->
          </div>
          <p class="grey-border"></p>
          <div class="btn-box">
            <!--<span class="custom-btn">-->
            <!--<el-button>取消</el-button>-->
            <!--</span>-->
            <el-button  v-if="hasRoot && isNotComplete && canOperation"
                        type="primary"
                        :disabled="isFileEmpty.isShow"
                        @click="changeStartContractSendOther">发送给企业</el-button>
            <!--<el-button v-if="ticket.responsor" type="primary" @click="changeStartContractSendOther">发送给对方</el-button>-->
          </div>
        </div>
      </div>
    </div>

    <!-- 当状态 为 one 并且为线下项目的时候 -->
    <!-- one 线下 -->
    <div class="gd-box" v-if="type=='one' && currentProject.source=='offline'">
      <div class="title">
        <i class="tit-fqht"></i>
        <span class="describe">{{ticket.title}}</span>
        <!--<div class="status bg55b">-->
        <!--<i class="icon-status icon-yes"></i>-->
        <!--<span>企业已确认</span>-->
        <!--</div>-->
      </div>
      <div class="content">
        <p class="fs14 fc5c5">合同签署流程：</p>
        <div class="sign-flow">
          <ul class="clearfix">
            <li>
              <i class="icon-step first-step"></i>
              <p class="step-content">
                服务商发出合同草案<br>企业确认合同草案
              </p>
            </li>
            <li>
              <i class="icon-step second-step"></i>
              <p class="step-content">
                服务商盖章寄送合同给企业<br>一式两份

              </p>
            </li>
            <li>
              <i class="icon-step third-step"></i>
              <p class="step-content">
                企业收到服务商寄送的合同<br>共两份
              </p>
            </li>
            <li>
              <i class="icon-step fourth-step"></i>
              <p class="step-content">
                企业盖章寄送合同给服务商<br>一份寄出，一份留底
              </p>
            </li>
          </ul>
        </div>
        <!--蒙版 start ===== -->
        <div class="mask_super">
          <div class="mask_one" v-if="currentProject.source=='offline'">
          </div>
          <div class="mask-text" v-if="currentProject.source=='offline'">
            <span>本项目为线下项目，请线下与企业确认合同并签署，然后开启下一步。
              请务必确保在“企业付款”前将双方已盖章的合同扫描件上传至平台。</span></div>
          <div class="input-item">
            <div class="chooose-file clearfix">
              <!--展示选择的文件 start =====-->
              <div  class="file-list">
                <ul>
                  <li v-for="(item,i) in ticket.contract_attachments">
                    <i class="icon-file" :class="item.name | filterIconClass"></i>
                    <a :title="item.name" class="name">{{item.name}}</a>
                    <i class="icon-delete fr" v-if="!isDisabled" @click="removeFileLocal(i)"></i>
                  </li>
                </ul>
              </div>
              <p class="grey-border" v-if="ticket_ji.contract_attachments.length"></p>
              <div class="tit clearfix">
                <div class="file-upload-work-nomal">
                  <div class="file-note">{{fileSupportFormatGol}}</div>
                  <!--<el-upload-->
                  <!--class="upload-demo"-->
                  <!--ref="upload"-->
                  <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                  <!--:on-change="changeFileContract"-->
                  <!--:show-file-list="false"-->
                  <!--:multiple="true"-->
                  <!--:auto-upload="false">-->
                  <!--<el-button type="text" v-if="ticket_ji.contract_attachments && hasRoot && isNotComplete && canOperation" slot="trigger"  class="upload-btn">{{ticket.contract_attachments.length>0 ? '继续上传' :'选取文件'}}</el-button>-->
                  <!--</el-upload>-->
                  <file-upload :listAttachmentsId="listAttachmentsId"
                               v-if="ticket_ji.contract_attachments && hasRoot && isNotComplete && canOperation"
                               :isFileEmpty="isFileEmpty"></file-upload>
                </div>
              </div>
              <!--end ==============================================-->
            </div>
            <p class="grey-border"></p>
            <div class="btn-box">
              <!--<span class="custom-btn">-->
              <!--<el-button>取消</el-button>-->
              <!--</span>-->
              <el-button  v-if="hasRoot && isNotComplete && canOperation"
                          type="primary"
                          :disabled="isFileEmpty.isShow"
                          @click="changeStartContractSendOther">发送给企业</el-button>
              <!--<el-button v-if="ticket.responsor" type="primary" @click="changeStartContractSendOther">发送给对方</el-button>-->
            </div>
          </div>

          <span class="fs14 fc5c5">合同草案</span>
          <p class="grey-border"></p>
          <div class="file-list">
            <ul>
              <li v-for="(item,index) in ticket.contract_attachments">
                <i class="icon-file" :class="item.name | filterIconClass"></i>
                <a :title="item.name" class="name">{{item.name}}</a>
                <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a></span>
                <!--<span class="size">2.01MB</span>-->
                <!--<span class="date">2017-03-06</span>-->
                <!--<span class="file-preview">预览</span>-->
              </li>
            </ul>
          </div>
          <p class="grey-border"></p>
          <p class="fs14 fc5c5"><span class="mr20">快递信息</span>
            <span v-if="show_express_category">{{ticket.expressage.category}}</span>
            <span v-if="show_express_no">{{ticket.expressage.no}}</span>
            <span
              class="ml10 cp fc3c8"
              v-if="hasRoot && isNotCompleteProject && canOperation && !express"
              @click="express = !express">{{show_express_category ? "修改" : "填写" }}</span>
            <span class="express" v-show="express">
          <el-select v-model="currentExpressCa" placeholder="请选择" :disabled='isDisabledExpress'>
            <el-option
              v-for="item in listExpress"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
            <el-input v-model="currentExpressNo" placeholder="请输入内容" :disabled='isDisabledExpress'></el-input>
          <span class="cp fs14 fca9a ml10" @click="express=false">取消</span>
          <span class="cp fs14 fc3c8 ml10" @click="changeStartContractFixExpress">保存</span>
        </span>
          </p>

          <p class="grey-border"></p>
        </div>
        <!-- 年份 -->

        <p class="fs14 fc5c5" v-if="show_year"><span class="mr20">申报年份</span>
          <span v-if="ticket.year">{{ticket.year | formatDateYear}}</span>
          <span class="ml10 cp fc3c8"
                v-if="hasRoot && canOperation && fix_year == false"
                @click="fillInYear">{{ticket.year ? "修改" : "填写" }}
          </span>
          <span class="year" v-show="fix_year">
              <el-date-picker
                v-model="ticket.year"
                align="right"
                :editable="false"
                :picker-options="pickerOptions0"
                type="year"
                placeholder="选择年">
              </el-date-picker>
            <span class="cp fs14 fca9a ml10" @click="cancelFixYear">取消</span>
          <span class="cp fs14 fc3c8 ml10" @click="changeStartContractFixYear">保存</span>
          </span>
        </p>
        <p class="grey-border" v-if="show_year"></p>

        <p class="fs14 fc5c5 file-upload-start-contract-scan"><span>合同签署盖章扫描件</span>
          <!--<el-upload-->
          <!--class="upload-demo"-->
          <!--ref="upload"-->
          <!--action="https://jsonplaceholder.typicode.com/posts/"-->
          <!--:on-change="changeFileScan"-->
          <!--:show-file-list="false"-->
          <!--:multiple="true"-->
          <!--:auto-upload="false">-->
          <!--&lt;!&ndash;备注：此处特殊：&ndash;&gt;-->
          <!--<span  v-if="hasRoot && canOperation" slot="trigger" class="ml10 cp fc3c8">上传</span>-->
          <!--</el-upload>-->
          <file-upload
            :listAttachmentsId="listScanId"
            :isFileEmpty="isFileEmpty"
            @successFileQFX = "successFileQFX"
            v-if="hasRoot && canOperation && showScan"></file-upload>
        </p>
        <p class="grey-border"></p>
        <div class="file-list">
          <ul>
            <li v-for="(item ,index) in ticket.scan_contract_attachments">
              <i class="icon-file" :class="item.name | filterIconClass"></i>
              <a :title="item.name" class="name">{{item.name}}</a>
              <span class="delete" v-if="hasRoot && canOperation" @click="changeStartContractDeleteScan(index,item)">删除</span>
              <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a> </span>
              <!--<span class="name">{{item.name}}</span>-->
              <!--<span class="size">2.01MB</span>-->
              <!--<span class="date">2017-03-06</span>-->
              <!--<span class="file-preview">预览</span>-->
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!--<p>创建成功</p>-->
    <!--<div class="gd-box" >-->
    <div class="gd-box" v-if="type=='two'">
      <div class="title">
        <i class="tit-fqht"></i>
        <span class="describe">{{ticket.title}}</span>
        <span class="return" v-if="ticket.temporary && hasRoot && isNotComplete && canOperation" @click="changeStageDelete">撤回当前事项</span>
        <div class="status bgf1b">
          <i class="icon-status icon-having"></i>
          <span>等待企业确认</span>
        </div>
      </div>
      <div class="content">
        <p class="fs14 fc5c5">合同签署流程：</p>
        <div class="sign-flow">
          <ul class="clearfix">
            <li>
              <i class="icon-step first-step"></i>
              <p class="step-content">
                服务商发出合同草案<br>企业确认合同草案
              </p>
            </li>
            <li>
              <i class="icon-step second-step"></i>
              <p class="step-content">
                服务商盖章寄送合同给企业<br>一式两份

              </p>
            </li>
            <li>
              <i class="icon-step third-step"></i>
              <p class="step-content">
                企业收到服务商寄送的合同<br>共两份
              </p>
            </li>
            <li>
              <i class="icon-step fourth-step"></i>
              <p class="step-content">
                企业盖章寄送合同给服务商<br>一份寄出，一份留底
              </p>
            </li>
          </ul>
        </div>
        <span class="fs14 fc5c5">合同草案</span>
        <p class="grey-border"></p>

        <!--点击修改合同草案，之后样式变化成 上传的样式 start ===============================-->
        <div class="chooose-file clearfix" v-if="fix">
          <!--展示选择的文件 start =====-->
          <div  class="file-list">
            <ul>
              <li v-for="(item,i) in ticket.contract_attachments">
                <i class="icon-file" :class="item.name | filterIconClass"></i>
                <a :title="item.name" class="name">{{item.name}}</a>
                <i class="icon-delete fr" v-if="!isDisabled" @click="removeFileLocal(i)"></i>
              </li>
            </ul>
          </div>
          <p class="grey-border" v-if="ticket_ji.contract_attachments.length"></p>
          <div class="tit clearfix">
            <div class="file-upload-work-nomal">
              <div class="file-note">{{fileSupportFormatGol}}</div>
              <!--<el-upload-->
              <!--class="upload-demo"-->
              <!--ref="upload"-->
              <!--action="https://jsonplaceholder.typicode.com/posts/"-->
              <!--:on-change="changeFileContract"-->
              <!--:show-file-list="false"-->
              <!--:multiple="true"-->
              <!--:auto-upload="false">-->
              <!--<el-button type="text" v-if="ticket.contract_attachments && hasRoot && isNotComplete && canOperation" slot="trigger"  class="upload-btn">{{ticket.contract_attachments.length>0 ? '继续上传' :'选取文件'}}</el-button>-->
              <!--</el-upload>-->
              <file-upload :listAttachmentsId="listAttachmentsId"
                           v-if="ticket.contract_attachments && hasRoot && isNotComplete && canOperation"
                           :isFileEmpty="isFileEmpty"></file-upload>
            </div>
          </div>
          <!--end ==============================================-->
        </div>
        <!--点击修改合同草案，之后样式变化成 上传的样式 end ===============================-->
        <div class="file-list" v-else>
          <ul>
            <li v-for="(item,index) in ticket.contract_attachments">
              <i class="icon-file" :class="item.name | filterIconClass"></i>

              <a :title="item.name" class="name">{{item.name}}</a>

              <!--<span class="name">{{item.name}}</span>-->
              <!--<span class="size">{{item.file_size | byteConversion}}</span>-->
              <!--<span class="date">2017-03-06</span>-->
              <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a></span>


              <!--<span class="file-preview">预览</span>-->
            </li>
          </ul>
        </div>

        <p class="grey-border"></p>
        <div class="btn-box"  v-if="hasRoot && isNotComplete && canOperation">
          <el-button  type="primary"
                      @click="changeStartContractSendOther"
                      :disabled="isFileEmpty.isShow"
                      v-if="fix">发送给企业</el-button>
          <el-button type="primary" @click="fix = !fix" v-else>修改合同草案</el-button>
        </div>
      </div>
    </div>
    <!--<p>企业已确认</p>-->
    <!--<div class="gd-box" >-->
    <div class="gd-box" v-if="type=='three'">
      <div class="title">
        <i class="tit-fqht"></i>
        <span class="describe">{{ticket.title}}</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>企业已确认</span>
        </div>
      </div>
      <div class="content">
        <p class="fs14 fc5c5">合同签署流程：</p>
        <div class="sign-flow">
          <ul class="clearfix">
            <li>
              <i class="icon-step first-step"></i>
              <p class="step-content">
                服务商发出合同草案<br>企业确认合同草案
              </p>
            </li>
            <li>
              <i class="icon-step second-step"></i>
              <p class="step-content">
                服务商盖章寄送合同给企业<br>一式两份

              </p>
            </li>
            <li>
              <i class="icon-step third-step"></i>
              <p class="step-content">
                企业收到服务商寄送的合同<br>共两份
              </p>
            </li>
            <li>
              <i class="icon-step fourth-step"></i>
              <p class="step-content">
                企业盖章寄送合同给服务商<br>一份寄出，一份留底
              </p>
            </li>
          </ul>
        </div>

        <!--蒙版 start ===== -->
        <!--<div class="mask" v-if=true>-->
        <div class="mask" v-if="currentProject.source=='offline'">
        </div>
        <div class="mask-text" v-if="currentProject.source=='offline'">本项目为线下项目，请线下与企业确认合同并签署，然后开启下一步。
          请务必确保在“企业付款”前将双方已盖章的合同扫描件上传至平台。</div>
        <span class="fs14 fc5c5">合同草案</span>
        <p class="grey-border"></p>
        <div class="file-list">
          <ul>
            <li v-for="(item,index) in ticket.contract_attachments">
              <i class="icon-file" :class="item.name | filterIconClass"></i>
              <a :title="item.name" class="name">{{item.name}}</a>
              <span class="download"> <a class="fr" :download="item.name" :href="item.download_url">下载</a></span>
              <!--<span class="name">{{item.name}}</span>-->
              <!--<span class="size">2.01MB</span>-->
              <!--<span class="date">2017-03-06</span>-->
              <!--<span class="file-preview">预览</span>-->
            </li>
          </ul>
        </div>
        <p class="grey-border"></p>
        <p class="fs14 fc5c5"><span class="mr20">快递信息</span>
          <span v-if="show_express_category">{{ticket.expressage.category}}</span>
          <span v-if="show_express_no">{{ticket.expressage.no}}</span>
          <!--此处特殊：-->
          <span class="ml10 cp fc3c8"
                v-if="hasRoot && canOperation && !express"
                @click="express = !express">{{show_express_category ? "修改" : "填写" }}
          </span>
          <span class="express" v-show="express">
          <el-select v-model="currentExpressCa" placeholder="请选择" :disabled='isDisabledExpress'>
            <el-option
              v-for="item in listExpress"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
            <el-input type="number" v-model="currentExpressNo" placeholder="请输入内容" :disabled='isDisabledExpress'></el-input>
          <span class="cp fs14 fca9a ml10" @click="express=false">取消</span>
          <span class="cp fs14 fc3c8 ml10" @click="changeStartContractFixExpress">保存</span>
        </span>

        </p>
        <!-- 年份 -->
        <p class="grey-border" v-if="show_year"></p>
        <p class="fs14 fc5c5" v-if="show_year"><span class="mr20">申报年份</span>
          <span v-if="ticket.year">{{ticket.year | formatDateYear}}</span>
          <span class="ml10 cp fc3c8"
                v-if="hasRoot && canOperation && fix_year == false"
                @click="fillInYear">{{ticket.year ? "修改" : "填写" }}
          </span>
          <span class="year" v-show="fix_year">
              <el-date-picker
                v-model="ticket.year"
                align="right"
                :editable="false"
                :picker-options="pickerOptions0"
                type="year"
                placeholder="选择年">
              </el-date-picker>
            <span class="cp fs14 fca9a ml10" @click="cancelFixYear">取消</span>
          <span class="cp fs14 fc3c8 ml10" @click="changeStartContractFixYear">保存</span>
          </span>
        </p>

        <p class="grey-border"></p>

        <p class="fs14 fc5c5 file-upload-start-contract-scan"><span>合同签署盖章扫描件</span>
          <!--<el-upload-->
          <!--class="upload-demo"-->
          <!--ref="upload"-->
          <!--action="https://jsonplaceholder.typicode.com/posts/"-->
          <!--:on-change="changeFileScan"-->
          <!--:show-file-list="false"-->
          <!--:multiple="true"-->
          <!--:auto-upload="false">-->
          <!--<span  v-if="hasRoot && canOperation" slot="trigger" class="ml10 cp fc3c8">上传</span>-->
          <!--</el-upload>-->

          <file-upload v-if="hasRoot && canOperation && showScan"
                       :listAttachmentsId="listScanId"
                       @successFileQFX = "successFileQFX"
                       :isFileEmpty="isFileEmpty"></file-upload>

        </p>
        <p class="grey-border"></p>
        <div class="file-list">
          <ul>
            <li v-for="(item ,index) in ticket.scan_contract_attachments">
              <i class="icon-file" :class="item.name | filterIconClass"></i>
              <a :title="item.name" class="name">{{item.name}}</a>
              <span  class="delete" v-if="hasRoot && canOperation" @click="changeStartContractDeleteScan(index,item)">删除</span>
              <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a></span>
              <!--<span class="name">{{item.name}}</span>-->
              <!--<span class="size">2.01MB</span>-->
              <!--<span class="date">2017-03-06</span>-->
              <!--<span class="file-preview">预览</span>-->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import API from 'API/api'
  import {mapGetters} from 'vuex'
  import fileUpload from 'components/common/fileUpload'
  import {formatDate, currency, byteConversion,filterIconClass} from 'assets/js/filter'


  export default{
    components:{fileUpload},
    props: ['type','ticket','index','markShowYear'],
    watch:{
      'ticket.contract_attachments':{
        handler:function (val,oldVal) {
          if(!this.isEmpty(this.listAttachmentsId) && !this.isFileEmpty.isShow) this.listAttachmentsId = [];
        },
        deep:true
      },
      'ticket.scan_contract_attachments':{
        handler:function (val,oldVal) {
          if(!this.isEmpty(this.listScanId) && !this.isFileEmpty.isShow){
            this.listScanId = [];
            this.showScan = false;
            setTimeout(this.showScanChange,100);
          }
        },
        deep:true
      },
    },
    data(){
      return {
        showScan:true,
        my_title:'',
        input: '',
        textarea: '',
        radio: '',
        listExpress:["顺丰快递","圆通快递","圆通快递","申通快递","韵达快递","天天快递","汇通快递","德邦快递","宅急送","EMS","其他"],
        currentExpressCa:'',
        currentExpressNo:'',
        value: '',
        express: false,//快递信息修改
        fix_year: false, //年份修改
        yearCopy:'',
        fix:false,
        isFileEmpty:{isShow:false}, // 上传中禁止按钮提交
        listAttachmentsId:[],  // 上传七牛返回的ID
        listScanId:[],
        pickerOptions0: {
          disabledDate(time) {
//            var now = Date.now(); //这个是时间戳
            var now = new Date();
            var year = now.getFullYear();
            var start = new Date(2013,0,1); //一年的第一天
            var end   = new Date(year+3,11,30);// 一年的最后一天
            return (start.getTime() >=time.getTime()) || (end <= time.getTime())
          }
        },
      }
    },
    mounted(){
      // 有预设工单直接发起
      if( this.type == 'one' && !this.isEmpty(this.ticket_ji.contract_attachments) && this.ticket_ji.contract_attachments.length>0){
        if(this.hasRoot && this.canOperation && this.isNotComplete && this.currentProject.source=='online'){
          this.changeStartContractSendOther();
        }
      }
    },
    filters:{
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      },
      formatDateYear(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy')
      },
      currency(val){
        return currency(val)
      },
      byteConversion(val){
        return byteConversion(val)
      },
      filterIconClass(fileName){
        return filterIconClass(fileName)
      },
    },
    //计算属性
    computed:{
      ...mapGetters(["stepName","currentProject","hasRoot","currentStage"]),
      isDisabled(){
        if(this.hasRoot && this.canOperation && this.isNotComplete) return false
        else return true
      },
      isDisabledExpress(){
        if(this.hasRoot && this.canOperation) return false
        else return true
      },
      //阶段是否完成  ,如果状态是 complete 那么发送按钮是不显示的
      isNotComplete(){
        if(this.currentStage.status == 'complete'){
          return false;
        }else {
          return true;
        }
      },
      //是否可以操作 整个项目 停止 或则 关闭 返回 false finished
      canOperation(){
        if(this.currentProject.status == 'deny' || this.currentProject.status == 'stop' || this.currentProject.status == 'finished'){
          return false;
        }
        return true;
      },
      // 整个项目是否已经完成 完成了=false  没有完成  =true
      isNotCompleteProject(){
        if(this.currentProject.status == 'finished'){
          return false;
        }else {
          return true;
        }
      },
      show_express_category(){
        if(!this.isEmpty(this.ticket.expressage) && !this.isEmpty(this.ticket.expressage) && !this.isEmpty(this.ticket.expressage.category) &&this.ticket.expressage.category.length>0){
          return true;
        }else{
          return false;
        }
      },
      show_express_no(){
        if(!this.isEmpty(this.ticket.expressage) && !this.isEmpty(this.ticket.expressage) && !this.isEmpty(this.ticket.expressage.no) &&this.ticket.expressage.no.length>0){
          return true;
        }else{
          return false;
        }
      },
      show_year(){
        if(this.currentStage.category == 'contract' && 0 ==this.index && this.markShowYear) return true;
        return false;
      },
      ticket_ji(){
        var item = this.ticket;
        if(this.isEmpty(item.attachments)){
          item.attachments = [];
        }
        if(this.isEmpty(item.title)){
          this.$set(item,'title','');
        }
        if(this.isEmpty(item.content)){
          item.content = "";
        }
        if(this.isEmpty(item.contract_attachments)){
          item.contract_attachments = [];
        }
        return item;
      }
    },
    methods: {
      cancelFixYear(){
        this.fix_year = false;
        this.ticket.year =  this.yearCopy;
      },
      fillInYear(){
        this.fix_year = ! this.fix_year;
        if(this.fix_year)  this.yearCopy = this.ticket.year ;
        else this.ticket.year = this.yearCopy;
      },
      successFileQFX(){
        if(this.isFileEmpty.isShow == false) this.changeFileScan();
      },
      showScanChange(){
        this.showScan = true;
      },
      isEmpty(item){
        if(item == undefined || item == null){
          return true;
        }else {
          return false;
        }
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
      // 修改快递信息
      changeStartContractFixExpress(){
        //检查是否有填写
        if(this.currentExpressCa.length<1){
          this.showMessage("warning","请填写信息");
          return;
        }
        if(this.currentExpressNo.length<1){
          this.showMessage("warning","请填写信息");
          return;
        }
        if(this.currentExpressNo.length>20){
          this.showMessage("warning","请填写信息,快递号码必须少于20位");
          return;
        }
        if(this.isEmpty(this.ticket.expressage)){
          this.ticket.expressage = {};
        }
        this.ticket.expressage.category = this.currentExpressCa;
        this.ticket.expressage.no = this.currentExpressNo;
        //发送请求
        this.express = false;
        // 保存快递信息
        this.$emit('changeStartContractFixExpress',this.type,this.index,this.ticket);
      },
      //改变年份
      changeStartContractFixYear(){
        if(this.ticket.year.length<1){this.showMessage("warning","请填写年份");  return;}
        this.fix_year = false;
        // 保存快递信息
        var year = this.formatDateToStrGol(this.ticket.year,'yyyy');
        this.ticket.year = this.formatDateToStrGol(this.ticket.year,'yyyy');
        this.$emit('changeStartContractFixYear',this.type,this.index,this.ticket);
      },
      sendOther(){
        this.type = 'three';
      },
      fixOther(){
        this.type = 'one';
      },
      changeFileContract(file, fileLis){
        if(!this.verifyUpLoadTypeGol(file)) {
          this.showMessage("warning",this.fileUploadFailWaringwordsGol);
          return;
        }
        file.isOriginal = false;
        // 判断名字是否是一样的，为一样的那么就放进去，不是一样的就不放
//        this.ticket.contract_attachments.push(file);
        this.sortSameFile(file, this.ticket.contract_attachments);
      },
      //排除相同的文件
      sortSameFile(file,listFile){
        var mark = false;
        listFile.forEach(function (item,index) {
          if(file.name == item.name){
            mark = true;
          }
        })
        if(mark){
          this.showMessage("warning","不能添加相同的文件");
        }else {
          listFile.push(file);
        }
      },
      changeFileScan(){
        this.ticket.listScanId = this.listScanId;
        this.$emit('changeStartContractAddScan',this.type,this.index,this.ticket);
      },
      changeStartContractDeleteScan(index,item){
        var item =   this.ticket.scan_contract_attachments[index];
        if(item.id == undefined || item.id == null || item.id <0){ //直接删除
          this.ticket.scan_contract_attachments.splice(index,1);
        }else { //需要做网络请求去删除
          this.$emit('changeStartContractDeleteScan',this.type,this.index,this.ticket,item);
        }
      },
      //删除文件
      removeFileLocal(index){
        var item =  this.ticket.contract_attachments[index];
        if(this.isEmpty(item.id) || item.id <0){ //直接删除
          this.ticket.contract_attachments.splice(index,1);
        }else { //需要做网络请求去删除
          var file_id = item.id;
          if(this.isEmpty(file_id) || file_id <0 ){
            this.showMessage("warning","需要删除的附件不存在");
            return;
          }
          // DELETE /v1/supplier/attachments/{id} 删除附件
          this.$http.delete(API.serviceurl + 'supplier/attachments/'+file_id,
          ).then((res) => {
//            this.hiddenLoading();
            this.ticket.contract_attachments.splice(index,1);
          },(error)=>{
            this.showMessage("warning","请求失败");
            this.hiddenLoading();
          });
        }
      },
      changeStartContractSendOther(){
        if(!this.isEmpty(this.ticket.is_new) && this.ticket.is_new){
          this.fix = false;
          this.ticket.listAttachmentsId = this.listAttachmentsId;
          this.$emit('changeStartContractSendOther',this.type,this.index,this.ticket_ji);
        }else {
          if(this.ticket.contract_attachments.length < 1 && this.listAttachmentsId.length <1){
            this.showMessage("warning","请上传附件");
            return;
          }
          this.fix = false;
          this.ticket.listAttachmentsId = this.listAttachmentsId;
          this.$emit('changeStartContractSendOther',this.type,this.index,this.ticket);
        }
      },
      // 取消当前工单
      changeEventCancelStage(){
        this.$emit('changeEventCancelStage',this.type,this.index,this.ticket);
      },
      //修改草案
      changeStartContractFix(){
        this.$emit('changeStartContractFix',this.type,this.index,this.ticket);
      },
      changeStageDelete(){
        this.$confirm('确认是否撤销?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('changeStageDelete',this.type,this.index,this.ticket);
        }).catch(() => {
        });
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

  .gd-box{
    .express{
      margin-left: 0px;
    }
  }

  .fs14 {
    .upload-demo{
      display: inline-block;
    }
  }
  .content{
    position: relative;
    .mask_super {
      position: relative;

    }
    .mask-text{
      width:100%;
      height:100%;
      padding-top:5%;
      font-size:14px;
      position:absolute;
      z-index: 100;
      color: #FFFFFF;
      text-align: center;
      span {
        position: absolute;
        top:50%;
        left:50%;
        width:100%;
        margin-left:-50%;
        vertical-align: middle;
        display: inline-block;
      }
    }
    .mask{
      background-color: black;
      width: 100%;
      height:100%;
      position:absolute;
      z-index: 100;
      opacity: 0.8;
      left: -1px;
      top: -1px;
    }
    // type == one 也就是预设的时候的蒙版
    .mask_one {
      background-color: black;
      width: calc(100% + 42px);
      height:calc(100% + 20px);
      margin-left: -20px;
      margin-right: -20px;
      margin-top: -20px;
      position:absolute;
      z-index: 100;
      opacity: 0.8;
      left: -1px;
      top: -1px;
    }
  }
</style>
