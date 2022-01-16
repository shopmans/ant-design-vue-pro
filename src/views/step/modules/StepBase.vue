<template>
  <div>
    <a-card title="维修工单基本信息" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <!-- 行1 -->
      <a-row class="form-row" :gutter="16">
        <a-divider orientation="left">1</a-divider>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="工程编号">
            <a-select
              ref="projectSelect"
              :disabled="selectDisabled"
              show-search
              :default-active-first-option="false"
              :show-arrow="false"
              :filter-option="false"
              :not-found-content="null"
              @search="handleSalesSearch"
              @change="projectSelectChange"
              v-decorator="[ 'project_id', {rules: [{ required: true, message: '请输入工程编号'}]} ]"
              v-if="showSerialValue"
            >
              <a-select-option v-for="d in projectSerialData" :value="d.value" :key="d.value">
                {{ d.text }}
              </a-select-option>
              <!-- <a-select-option value="2223333">
                scscscsc
              </a-select-option>
              <a-select-option value="497e6388-5266-41a4-80d9-ce6103261ae1">
                2223333
              </a-select-option> -->
            </a-select>
            <a-input v-if="!showSerialValue" v-decorator="[ 'project_serial', {rules: [{ }]} ]" disabled></a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="工单编号">
            <a-input :maxLength="14" v-decorator="[ 'work_order_serial', {rules: [{ message: '请输入工单编号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="最终用户">
            <a-input v-decorator="[ 'base_inf_finaluser', {rules: [{ message: '请输入位号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="生产部/分厂">
            <a-input v-decorator="[ 'factory_branch', {rules: [{whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="装置">
            <a-input v-decorator="[ 'base_device', {rules: [{whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="位号">
            <a-input v-decorator="[ 'tag', {rules: [{ message: '请输入位号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-row>
            <a-col :span="18">
              <a-form-item
                label="阀门序列号">
                <a-select
                  ref="valveSelect"
                  show-search
                  :default-active-first-option="false"
                  :show-arrow="false"
                  :filter-option="false"
                  :not-found-content="null"
                  @search="handleValveSearch"
                  @change="selectValveSerialChange"
                  v-decorator="[ 'valve_serial', {rules: [{ message: '请输入阀门序列号'}]} ]"
                  v-if="showValveSerialValue"
                >
                  <a-select-option v-for="d in valveSerialData" :key="d.value">
                    {{ d.text }}
                  </a-select-option>
                </a-select>
                <a-input v-if="!showValveSerialValue" v-decorator="[ 'valve_serial', {rules: [{ message: '请输入阀门序列号' }]} ]" @change="inputValveSerialChange"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <a-switch :checked="switchChecked" v-decorator="[ 'valve_serial_switch', {rules: [{ required: false }]} ]" style="margin-top:45px;margin-left:5px;" @change="valveSerialInputSwitch"></a-switch>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="批次号">
            <a-input v-decorator="[ 'batch_number', {rules: [{ message: '', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="设备类型">
            <a-select
              v-decorator="[
                'control_model',
                {initialValue: '1', rules: [{ message: '请选择现场拆装'}]}
              ]"
              :allowClear="true" >
              <a-select-option value="1">调节阀</a-select-option>
              <a-select-option value="2">开关阀</a-select-option>
              <a-select-option value="3">Ggc</a-select-option>
              <a-select-option value="4">仪表</a-select-option>
              <a-select-option value="5">调压器</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="工艺介质">
            <a-input-group compact>
              <a-input
                v-decorator="[
                  'process_medium',
                  {initialValue: '', rules: [{ message: '请输入工艺介质'}]}
                ]"
                style="width: 65%" />
              <a-select style="width: 35%" @change="selectProcessMediumChange" :allowClear="true">
                <a-select-option v-for="item in processMediumList" :value="item" :key="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-input-group>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="特殊应用">
            <a-select
              @change="repairSelectChange"
              v-decorator="[
                'spec_app',
                {initialValue: '', rules: []}
              ]"
              :allowClear="true" >
              <a-select-option value="1">氧阀</a-select-option>
              <a-select-option value="2">放空阀</a-select-option>
              <a-select-option value="3">防喘振阀</a-select-option>
              <a-select-option value="4">PDS阀</a-select-option>
              <a-select-option value="5">三偏心</a-select-option>
              <a-select-option value="6">锁渣阀</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <br>
      <br>
      <a-row :gutter="16">
        <a-divider orientation="left">2</a-divider>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="返厂部件">
            <a-select
              @change="repairSelectChange"
              v-decorator="[
                'return_part',
                {initialValue: '4', rules: [{required: true, message: '请选择返厂部件'}]}
              ]"
              :allowClear="true" >
              <a-select-option value="1">阀门</a-select-option>
              <a-select-option value="2">执行机构</a-select-option>
              <a-select-option value="3">阀门+执行机构</a-select-option>
              <a-select-option value="4">阀门+执行机构+附件</a-select-option>
              <a-select-option value="6">执行机构+附件</a-select-option>
              <a-select-option value="8">附件</a-select-option>
              <a-select-option value="5">零部件</a-select-option>
              <a-select-option value="7">定位器</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="维修部件">
            <a-select
              v-decorator="[
                'repair_part',
                {initialValue: '4', rules: [{ message: '请选择维修部件'}]}
              ]"
              :allowClear="true" >
              <a-select-option value="1">阀门</a-select-option>
              <a-select-option value="2">执行机构</a-select-option>
              <a-select-option value="3">阀门+执行机构</a-select-option>
              <a-select-option value="4">阀门+执行机构+附件</a-select-option>
              <a-select-option value="6">执行机构+附件</a-select-option>
              <a-select-option value="8">附件</a-select-option>
              <a-select-option value="5">零部件</a-select-option>
              <a-select-option value="7">定位器</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="收货日期">
            <a-date-picker
              style="width:100%;"
              valueFormat="YYYY-MM-DDTHH:mm:ssZ"
              v-decorator="[
                'receipt_date',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="要求完工日期">
            <a-date-picker
              style="width:100%;"
              valueFormat="YYYY-MM-DDTHH:mm:ssZ"
              v-decorator="[
                'requirst_done_date',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
      </a-row>

      <br>
      <br>
      <a-row :gutter="16">
        <a-divider orientation="left">3</a-divider>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="出入厂单据号码">
            <a-input v-decorator="[ 'receipt_number', {rules: [{ message: '请输入出入厂单据号码', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="序号">
            <a-input v-decorator="[ 'serial_number', {rules: [{ message: '请输入序号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
      </a-row>

      <br>
      <br>
      <a-row :gutter="16">
        <a-divider orientation="left">4</a-divider>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="预估检测费用">
            <a-input-number
              style="width:100%;"
              :min="0"
              :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
              :precision="2"
              v-decorator="[
                'estimate',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="现场拆装">
            <a-select
              v-decorator="[
                'disassembly',
                {rules: [{ message: '请选择现场拆装'}]}
              ]"
              :allowClear="true" >
              <a-select-option value="1">是</a-select-option>
              <a-select-option value="2">否</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <!-- <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="序列号">
            <a-input v-decorator="[ 'serial', {rules: [{ message: '请输入序列号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col> -->
      </a-row>

      <br>
      <br>
      <a-row :gutter="16">
        <a-divider orientation="left">5</a-divider>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="工时(min)">
            <a-input-number
              style="width:100%;"
              v-decorator="[
                'stepbase_total_minute',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="完成日期">
            <a-date-picker valueFormat="YYYY-MM-DDTHH:mm:ssZ" v-decorator="['stepbase_workerdone_date', {}]" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-col>
            <a-form-item
              label="故障现象及工作内容">
              <a-textarea
                rows="6"
                v-decorator="[
                  'content',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-col>
      </a-row>
      <!-- 行2 -->
      <a-row class="form-row" :gutter="16">
        <a-col>
          <a-card title="已购买备件清单" :headStyle="{fontWeight:'bold'}" >
            <!-- <a-descriptions title="">
              <a-descriptions-item label="工单号">{{ refData1.work_order_serial }}</a-descriptions-item>
              <a-descriptions-item label="合同号">{{ refData2.contract_serial }}</a-descriptions-item>
              <a-descriptions-item label="客户名称">{{ refData2.customer_name }}</a-descriptions-item>
              <a-descriptions-item label="执行机构型号"></a-descriptions-item>
              <a-descriptions-item label="阀门位号">{{ refData1.tag }}</a-descriptions-item>
              <a-descriptions-item label="序列号"></a-descriptions-item>
              <a-descriptions-item label="阀体型号"></a-descriptions-item>
            </a-descriptions>
            <a-divider style="margin-bottom: 32px">备件清单</a-divider> -->
            <a-row class="form-row" :gutter="16">
              <a-table
                :columns="columnsPurchased"
                :dataSource="dataPurchased"
                :pagination="false"
                :loading="memberLoading"
              >
                <template v-for="(col, i) in ['purchased_part_no', 'purchased_part_name', 'purchased_part_number', 'purchased_part_qty', 'purchased_part_key_number', 'purchased_part_memo']" :slot="col" slot-scope="text, record">
                  <a-input
                    :key="col"
                    v-if="record.editable"
                    style="margin: -5px 0"
                    :value="text"
                    :placeholder="columnsPurchased[i].title"
                    @change="e => handleChange(e.target.value, record.key, col)"
                  />
                  <template v-else>{{ text }}</template>
                </template>
                <!--  ssssssssssssssssssssssssss -->
                <!--  ssssssssssssssssssssssssss -->
                <!--  ssssssssssssssssssssssssss -->
                <!--  ssssssssssssssssssssssssss -->
                <!--  ssssssssssssssssssssssssss -->
                <template slot="operation" slot-scope="text, record">
                  <template v-if="record.editable">
                    <span v-if="record.isNew">
                      <a @click="saveRow(record)">添加</a>
                      <a-divider type="vertical" />
                      <a-popconfirm title="是否要删除此行？" @confirm="removeRow(record.key)">
                        <a>删除</a>
                      </a-popconfirm>
                    </span>
                    <span v-else>
                      <a @click="saveRow(record)">保存</a>
                    </span>
                  </template>
                  <span v-else>
                    <a-popconfirm title="是否要删除此行？" @confirm="removeRow(record.key)">
                      <a>删除</a>
                    </a-popconfirm>
                    <a-divider type="vertical" />
                    <a @click="editRow(record)">编辑</a>
                  </span>
                </template>
              </a-table>
              <a-row>
                <a-col :span="12"><a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newPartMember">新增部件</a-button></a-col>
                <a-col :span="12"><div class="upload-no-inline-block"><a-upload accept=".xls,.xlsx" :before-upload="importExcel" :show-upload-list="false" className=".ant-upload.ant-upload-select"><a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus">Excel导入</a-button></a-upload></div></a-col>
              </a-row>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
      <br>

      <!-- <a-row class="form-row" :gutter="16">
        <a-col>
          <a-card title="填料信息" :headStyle="{fontWeight:'bold'}" >
            <a-row class="form-row" :gutter="16">
              <a-table
                :columns="BaseFillerColumnNames()"
                :dataSource="baseFillerSource"
                :pagination="false"
                :loading="memberLoading"
              >
                <template v-for="(col, i) in BaseFillerColumns()" :slot="col" slot-scope="text, record">
                  <a-input
                    :key="col"
                    v-if="record.editable"
                    style="margin: -5px 0"
                    :value="text"
                    :placeholder="BaseFillerColumnNames()[i].title"
                    @change="e => handleBaseFillerChange(e.target.value, record.key, col)"
                  />
                  <template v-else>{{ text }}</template>
                </template>
                <template slot="operation" slot-scope="text, record">
                  <template v-if="record.editable">
                    <span v-if="record.isNew">
                      <a @click="saveBaseFillerRow(record)">添加</a>
                      <a-divider type="vertical" />
                      <a-popconfirm title="是否要删除此行？" @confirm="removeBaseFillerRow(record.key)">
                        <a>删除</a>
                      </a-popconfirm>
                    </span>
                    <span v-else>
                      <a @click="saveBaseFillerRow(record)">保存</a>
                    </span>
                  </template>
                  <span v-else>
                    <a-popconfirm title="是否要删除此行？" @confirm="removeBaseFillerRow(record.key)">
                      <a>删除</a>
                    </a-popconfirm>
                    <a-divider type="vertical" />
                    <a @click="editBaseFillerRow(record)">编辑</a>
                  </span>
                </template>
              </a-table>
              <a-row>
                <a-col :span="12"><a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newBaseFillerPartMember">新增部件</a-button></a-col>
                <a-col :span="12"><div class="upload-no-inline-block"><a-upload accept=".xls,.xlsx" :before-upload="importBaseFillerExcel" :show-upload-list="false" className=".ant-upload.ant-upload-select"><a-button disabled style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus">Excel导入</a-button></a-upload></div></a-col>
              </a-row>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
      <br><br>-->

      <!-- 行3 -->
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-upload
            action="/api/base-info-upload"
            :multiple="true"
            :file-list="specificationTableFileList"
            @change="specificationTableHandleChange"
            @preview="clickSerialCardFile"
            :remove="remove"
            :headers="{ QueueType: '1' }"
          >
            <a-button style="width:100%;"> <a-icon type="upload" /> 上传规格表 </a-button>
          </a-upload>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-upload
            action="/api/base-info-upload"
            :multiple="true"
            :file-list="serialCardFileList"
            @change="serialCardHandleChange"
            @preview="clickSerialCardFile"
            :remove="remove"
            :headers="{ QueueType: '2' }"
          >
            <a-button> <a-icon type="upload" /> 上传序列卡 </a-button>
          </a-upload>
        </a-col>
      </a-row>
      <div><br><br></div>
    </a-card>
    <pdfView ref="pdf"></pdfView>
  </div>
</template>

<script>
import { fetch } from '@/utils/inputSearch'
import DispatchUser from '@/views/step/modules/DispatchUser'
import { getColumnsPurchased, getWorkSerialSerial, getProcessMediumList, BaseFillerColumns, BaseFillerColumnNames, newBaseFillerColumns } from '@/api/step'
import { getProjectList } from '@/api/project'
import moment from 'moment'
import XLSX from 'xlsx'
import { querySparePartsBySerial } from '@/api/spareParts'
import pdfView from '@/components/PdfView'

export default {
    components: {
      XLSX,
      pdfView,
      DispatchUser
    },
    data () {
      return {
        specificationTableFileList: [], // 规格表
        serialCardFileList: [], // 序列卡
        projectSerialData: [],
        selectDisabled: false,
        showSerialValue: true,
        showValveSerialValue: true,
        ss: 'ddf',
        refData1: {},
        refData2: {},
        // 已购清单表
        columnsPurchased: this.getColumnsPurchasedArray(),
        dataPurchased: [],
        baseFillerSource: [],
        memberLoading: false,
        newWorkOrder: 1,
        valveSerialData: [],
        switchChecked: false,
        processMediumList: getProcessMediumList(),
        selectProjectItem: null,
        currentStep: '',
        flowID: ''
      }
    },
    mounted () {
      this.$on('baseHasEdit', function (item) {
        const baseInfo = item

        // 采购部件
        if (baseInfo.valve_purchased_parts) {
          this.dataPurchased = baseInfo.valve_purchased_parts
        }
        // 填料信息
        if (baseInfo.base_filler_data) {
          this.baseFillerSource = baseInfo.base_filler_data
        }

        // 禁用工程序号选择
        this.showSerialValue = false
        // 准备将上传文件信息保存至state
        var stateMD5List = this.$store.state.uploadFileMD5Store.uploadFileMD5
        if (!baseInfo.uploads) {
          return
        }
        baseInfo.uploads.forEach(element => {
          const upItem = {
            md5: element.md5,
            name: element.name,
            percent: element.percent,
            queue_type: element.queue_type,
            size: element.size,
            status: element.status,
            type: element.type,
            uid: element.uid,
            url: element.url
          }
          stateMD5List.push(upItem)
          // 规格表
          if (upItem.queue_type === '1') {
            this.specificationTableFileList.push(upItem)
          }
          // 序列卡
          if (element.queue_type === '2') {
            this.serialCardFileList.push(upItem)
          }
        })
        if (stateMD5List.length > 0) {
          this.$store.commit('SET_UPLOAD_MD5', stateMD5List)
        }
      })

      // 新建工单获取工单全局编号
      if (this.showSerialValue) {
        getWorkSerialSerial().then(res => {
          this.newWorkOrder = res
        })
      }
    },
    methods: {
      moment,
      BaseFillerColumns,
      BaseFillerColumnNames,
      newBaseFillerColumns,
      repairSelectChange (value) {
          this.$emit('repairSelectChange', value)
      },
      specificationTableHandleChange (info) {
        let fileList = [...info.fileList]

        // 2. read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
              if (file.response.retCode !== 0) {
                this.$notification['error']({
                  message: '错误',
                  description: file.response.msg,
                  duration: 3
                })
                file.status = 'error'
              } else {
                file.md5 = file.response.md5
                file.url = file.response.url
                file.queue_type = '1'
                var stateMD5List = this.$store.state.uploadFileMD5Store.uploadFileMD5
                var bFind = false
                for (var i = 0; i < stateMD5List.length; i++) {
                  if (stateMD5List[i].md5 === file.md5) {
                    bFind = true
                    break
                  }
                }
                if (!bFind) {
                  stateMD5List.push(file)
                  this.$store.commit('SET_UPLOAD_MD5', stateMD5List)
                }
              }
            }
            return file
        })
        this.specificationTableFileList = fileList
      },
      serialCardHandleChange (info) {
        let fileList = [...info.fileList]

        // 2. read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
              if (file.response.retCode !== 0) {
                this.$notification['error']({
                  message: '错误',
                  description: file.response.msg,
                  duration: 3
                })
                file.status = 'error'
              } else {
                file.md5 = file.response.md5
                file.url = file.response.url
                file.queue_type = '2'
                var stateMD5List = this.$store.state.uploadFileMD5Store.uploadFileMD5
                var bFind = false
                for (var i = 0; i < stateMD5List.length; i++) {
                  if (stateMD5List[i].md5 === file.md5) {
                    bFind = true
                    break
                  }
                }
                if (!bFind) {
                  stateMD5List.push(file)
                  this.$store.commit('SET_UPLOAD_MD5', stateMD5List)
                }
              }
            }
            return file
        })
        this.serialCardFileList = fileList
      },
      clickSerialCardFile (file) {
        if (!this.$store.state.app.isMobile) {
          window.open(file.url, '_blank')
          return
        }
        this.$refs.pdf.show(file.url, file.name)
        return false
      },
      remove (file) {
        var stateMD5List = this.$store.state.uploadFileMD5Store.uploadFileMD5
        for (var i = 0; i < stateMD5List.length; i++) {
          if (stateMD5List[i].md5 === file.md5) {
            stateMD5List.splice(i, 1)
            this.$store.commit('SET_UPLOAD_MD5', stateMD5List)
            break
          }
        }
      },
      handleSalesSearch (value) {
        fetch(value, data => (this.projectSerialData = data), this.$t('input.project.search'))
      },
      setTenProject (data) {
        this.projectSerialData = data
      },
      projectSelectChange (value) {
        // 获取select下拉文本
        var selectText = ''
        this.projectSerialData.forEach(e => {
          if (e.value === value) {
            selectText = e.text
          }
        })
        // 获取工程编号为标识的全局编号
        getWorkSerialSerial(selectText).then(res => {
          this.newWorkOrder = res
          let tmpOrder = this.newWorkOrder + ''
          if (tmpOrder.length === 2) {
            tmpOrder = '0' + tmpOrder
          } else if (tmpOrder.length === 1) {
            tmpOrder = '00' + tmpOrder
          }
          this.$emit('projectSelectChange', selectText + '-' + tmpOrder)
        })
        getProjectList({ id: value }).then(res => {
          if (res.result.data && res.result.data.length > 0) {
            const projectData = res.result.data[0]
            this.$emit('projectSelectChange', '+' + projectData.finally_user)
          }
        })
      },
      newPartMember () {
        const length = this.dataPurchased.length
        this.dataPurchased.push({
          key: length === 0 ? '1' : (parseInt(this.dataPurchased[length - 1].key) + 1).toString(),
          purchased_part_no: '',
          purchased_part_key_number: '',
          purchased_part_number: '',
          purchased_part_name: '',
          purchased_part_qty: '',
          purchased_part_memo: '',
          editable: true,
          isNew: true
        })
      },
      // ====================== 已购买备件清单
      handleChange (value, key, column) {
        const newData = [...this.dataPurchased]
        const target = newData.find(item => key === item.key)
        if (target) {
          target[column] = value
          this.dataPurchased = newData
        }
      },
      saveRow (record) {
        const editData = [...this.dataPurchased]
        const { key } = record
        const target = editData.find(item => item.key === key)
        if (target) {
          target.editable = false
          target.isNew = false
          this.dataPurchased = editData
        }
      },
      removeRow (key) {
        const newData = this.dataPurchased.filter(item => item.key !== key)
        this.dataPurchased = newData
      },
      editRow (record) {
        const editData = [...this.dataPurchased]
        const { key } = record
        const target = editData.find(item => item.key === key)
        if (target) {
          target.editable = true
          target.isNew = false
          this.dataPurchased = editData
        }
      },
      // ====================== 填料
      handleBaseFillerChange (value, key, column) {
        const newData = [...this.baseFillerSource]
        const target = newData.find(item => key === item.key)
        if (target) {
          target[column] = value
          this.baseFillerSource = newData
        }
      },
      saveBaseFillerRow (record) {
        const editData = [...this.baseFillerSource]
        const { key } = record
        const target = editData.find(item => item.key === key)
        if (target) {
          target.editable = false
          target.isNew = false
          this.baseFillerSource = editData
        }
      },
      removeBaseFillerRow (key) {
        const newData = this.baseFillerSource.filter(item => item.key !== key)
        this.baseFillerSource = newData
      },
      editBaseFillerRow (record) {
        const editData = [...this.baseFillerSource]
        const { key } = record
        const target = editData.find(item => item.key === key)
        if (target) {
          target.editable = true
          target.isNew = false
          this.baseFillerSource = editData
        }
      },
      newBaseFillerPartMember () {
        const length = this.baseFillerSource.length
        const key = length === 0 ? '1' : (parseInt(this.baseFillerSource[length - 1].key) + 1).toString()
        this.baseFillerSource.push(newBaseFillerColumns(key))
      },
      importBaseFillerExcel (file) {
        this.$message('格式待定')
      },
      // ============================== 填料 end
      getColumnsPurchasedArray () {
        return getColumnsPurchased()
      },
      importExcel (file) {
        // console.log(file)
        this.readExcel(file)
        return false
      },
      handleValveSearch (value) {
        this.valveSerialData.length = 0
        fetch(value, data => (this.valveSerialData = data), this.$t('input.valve.parts.search'))
      },
      selectValveSerialChange (value) {
        const that = this
        querySparePartsBySerial({ serial: value }).then(e => {
          e.valve_model = e.model
          e.valve_serial = e.serial
          that.$emit('selectValveSerialChange', e)
          this.$store.commit('VALVE_SERIAL', value)
        })
      },
      inputValveSerialChange (e) {
        this.$store.commit('VALVE_SERIAL', e.target.value)
      },
      valveSerialInputSwitch (checked) {
        this.showValveSerialValue = !checked
        this.switchChecked = checked
      },
      readExcel (file) { // 表格导入
          var that = this

          if (file.length <= 0) { // 如果没有文件名
            return false
          }

          const fileReader = new FileReader()
          fileReader.onload = (ev) => {
            try {
              const data = ev.target.result
              const workbook = XLSX.read(data, {
                  type: 'binary'
              })
              const wsname = workbook.SheetNames[0] // 取第一张表
              const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname], { defval: '' }) // 生成json表格内容
              // console.log(ws)

              // 查找件号单元格并取得件号属性名称
              var keyNumberPropName = '' // 件号属性名称
              ws.forEach(wsItem => {
                for (var wsItemProp of Object.keys(wsItem)) {
                  if (wsItem[wsItemProp] === '零件号码') {
                    keyNumberPropName = wsItemProp
                    break
                  }
                }
              })
              if (keyNumberPropName.length !== 9) {
                this.$message.error('导入Excel文件没有找到“零件号码”单元格')
                return
              }

              var tmpDataItemArray = []
              for (let i = 9; i < ws.length; i++) {
                var tmpDataItem = []
                var tmpDataObject = ws[i]
                // 件号属性是否存在
                if (!tmpDataObject[keyNumberPropName]) {
                  continue
                }

                for (var key of Object.keys(tmpDataObject)) {
                  const tmpValue = tmpDataObject[key]
                  tmpDataItem.push(tmpValue === 'undefined' ? '' : tmpValue)
                }
                tmpDataItemArray.push(tmpDataItem)
              }
              console.log(tmpDataItemArray)

              // 合并导入数据，以件号为key
              var nameIndex = 1 // 名称index
              var numIndex = 7 // 数量index
              var keyNumIndex = 8 // 件号index
              var memoIndex = 10 // 备注index
              var keyIndex = 5 // 零件号码index
              tmpDataItemArray.forEach(item => {
                // 在已有备件数据中查找相同件号
                var isFind = false
                var findIndex = 0
                for (var i = 0; i < that.dataPurchased.length; i++) {
                  if (item[keyIndex] === that.dataPurchased[i].purchased_part_number) {
                    isFind = true
                    findIndex = i
                    break
                  }
                }

                if (isFind) {
                  that.dataPurchased[findIndex].purchased_part_key_number = item[keyNumIndex] + '' // 零件号码
                  that.dataPurchased[findIndex].purchased_part_number = item[keyIndex] + '' // 件号
                  that.dataPurchased[findIndex].purchased_part_name = item[nameIndex] + '' // 名称
                  that.dataPurchased[findIndex].purchased_part_qty = item[numIndex] + '' // 数量
                  that.dataPurchased[findIndex].purchased_part_memo = item[memoIndex]
                } else {
                  that.dataPurchased.push({
                    key: randomNum(1000, 9999999) + '',
                    purchased_part_no: item[0] + '',
                    purchased_part_key_number: item[keyNumIndex] + '',
                    purchased_part_number: item[keyIndex] + '',
                    purchased_part_name: item[nameIndex] + '',
                    purchased_part_qty: item[numIndex] + '',
                    purchased_part_memo: item[memoIndex]
                  })
                }
              })

              // console.log(that.dataPurchased)

              // that.peopleArr = [];//清空接收数据
              // if(that.peopleArr.length == 1 && that.peopleArr[0].roleName == "" && that.peopleArr[0].enLine == ""){
              //     that.peopleArr = [];
              // }
              // 重写数据
              // try {

              // } catch (err) {
              //     console.log(err)
              // }
            } catch (e) {
                return false
            }
          }
          fileReader.readAsBinaryString(file)
      },
      selectProcessMediumChange (value) {
        this.$emit('selectInputChange', { process_medium: value })
      }
    }
}

function randomNum (minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10)
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
    default:
      return 0
  }
}

</script>

<style>
</style>
