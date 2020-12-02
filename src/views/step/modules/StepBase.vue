<template>
  <div>
    <a-card title="维修工单基本信息" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <!-- 行1 -->
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="工程编号">
            <a-select
              label-in-value
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
              <a-select-option v-for="d in projectSerialData" :key="d.value">
                {{ d.text }}
              </a-select-option>
            </a-select>
            <a-input v-if="!showSerialValue" v-decorator="[ 'project_serial', {rules: [{ }]} ]" disabled></a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="工单编号">
            <a-input v-decorator="[ 'work_order_serial', {rules: [{ message: '请输入工单编号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="位号">
            <a-input v-decorator="[ 'tag', {rules: [{ message: '请输入位号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
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
          <a-form-item
            label="返厂部件">
            <a-select
              v-decorator="[
                'return_part',
                {rules: [{ message: '请选择返厂部件'}]}
              ]" >
              <a-select-option value="1">阀门</a-select-option>
              <a-select-option value="2">执行机构</a-select-option>
              <a-select-option value="3">阀门+执行机构</a-select-option>
              <a-select-option value="4">阀门+执行机构+附件</a-select-option>
              <a-select-option value="6">执行机构+附件</a-select-option>
              <a-select-option value="5">零部件</a-select-option>
              <a-select-option value="7">定位器</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="维修部件">
            <a-select
              @change="repairSelectChange"
              v-decorator="[
                'repair_part',
                {rules: [{ required: true, message: '请选择维修部件'}]}
              ]" >
              <a-select-option value="1">阀门</a-select-option>
              <a-select-option value="2">执行机构</a-select-option>
              <a-select-option value="3">阀门+执行机构</a-select-option>
              <a-select-option value="4">阀门+执行机构+附件</a-select-option>
              <a-select-option value="6">执行机构+附件</a-select-option>
              <a-select-option value="5">零部件</a-select-option>
              <a-select-option value="7">定位器</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="现场拆装">
            <a-select
              v-decorator="[
                'disassembly',
                {rules: [{ message: '请选择现场拆装'}]}
              ]" >
              <a-select-option value="1">是</a-select-option>
              <a-select-option value="2">否</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="出入厂单据号码">
            <a-input v-decorator="[ 'receipt_number', {rules: [{ message: '请输入出入厂单据号码', whitespace: true}]} ]" />
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
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="序列号">
            <a-input v-decorator="[ 'serial', {rules: [{ message: '请输入序列号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="序号">
            <a-input v-decorator="[ 'serial_number', {rules: [{ message: '请输入序号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="控制方式">
            <a-select
              v-decorator="[
                'control_model',
                {rules: [{ message: '请选择现场拆装'}]}
              ]" >
              <a-select-option value="1">调节阀</a-select-option>
              <a-select-option value="2">开关阀</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="工艺介质">
            <a-select
              v-decorator="[
                'process_medium',
                {rules: [{ message: '请选择工艺介质'}]}
              ]" >
              <a-select-option value="1">水</a-select-option>
              <a-select-option value="2">锅炉给水</a-select-option>
              <a-select-option value="3">空气</a-select-option>
              <a-select-option value="4">蒸汽</a-select-option>
              <a-select-option value="5">氮气</a-select-option>
              <a-select-option value="6">天然气</a-select-option>
              <a-select-option value="7">氢气</a-select-option>
              <a-select-option value="8">氧气</a-select-option>
              <a-select-option value="9">氯气</a-select-option>
              <a-select-option value="10">热高分油</a-select-option>
              <a-select-option value="11">冷高分油</a-select-option>
              <a-select-option value="12">酸水</a-select-option>
              <a-select-option value="13">碱液</a-select-option>
              <a-select-option value="14">氯甲烷</a-select-option>
              <a-select-option value="15">导热油</a-select-option>
              <a-select-option value="16">原油</a-select-option>
              <a-select-option value="17">富胺液</a-select-option>
              <a-select-option value="18">凝液</a-select-option>
              <a-select-option value="19">液氨</a-select-option>
              <a-select-option value="20">黑水</a-select-option>
              <a-select-option value="21">灰水</a-select-option>
              <a-select-option value="22">合成气</a-select-option>
              <a-select-option value="23">甲醇</a-select-option>
              <a-select-option value="24">乙醇</a-select-option>
              <a-select-option value="25">乙二醇</a-select-option>
              <a-select-option value="26">碳氢化合物</a-select-option>
              <a-select-option value="27">甲烷</a-select-option>
              <a-select-option value="28">乙烷</a-select-option>
              <a-select-option value="29">丙烷</a-select-option>
            </a-select>
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
                      <a-divider type="vertical" />
                      <a @click="cancel(record.key)">取消</a>
                    </span>
                  </template>
                  <span v-else>
                    <a-popconfirm title="是否要删除此行？" @confirm="removeRow(record.key)">
                      <a>删除</a>
                    </a-popconfirm>
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

      <br><br>

      <!-- 行3 -->
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-upload
            action="/api/base-info-upload"
            :multiple="true"
            :file-list="specificationTableFileList"
            @change="specificationTableHandleChange"
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
            :remove="remove"
            :headers="{ QueueType: '2' }"
          >
            <a-button> <a-icon type="upload" /> 上传序列卡 </a-button>
          </a-upload>
        </a-col>
      </a-row>
      <div><br><br></div>
    </a-card>
  </div>
</template>

<script>
import { fetch } from '@/utils/inputSearch'
import { getColumnsPurchased, getWorkSerialSerial } from '@/api/step'
import moment from 'moment'
import XLSX from 'xlsx'

export default {
    components: {
      XLSX
    },
    data () {
      return {
        specificationTableFileList: [], // 规格表
        serialCardFileList: [], // 序列卡
        projectSerialData: [],
        selectDisabled: false,
        showSerialValue: true,
        ss: 'ddf',
        refData1: {},
        refData2: {},
        // 已购清单表
        columnsPurchased: this.getColumnsPurchasedArray(),
        dataPurchased: [],
        memberLoading: false,
        newWorkOrder: 1
      }
    },
    mounted () {
      this.$on('baseHasEdit', function (item) {
        const baseInfo = item

        // 采购部件
        if (baseInfo.valve_purchased_parts) {
          this.dataPurchased = baseInfo.valve_purchased_parts
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
      projectSelectChange (value) {
        let tmpOrder = this.newWorkOrder + ''
        if (tmpOrder.length === 2) {
          tmpOrder = '0' + tmpOrder
        } else if (tmpOrder.length === 1) {
          tmpOrder = '00' + tmpOrder
        }
        this.$emit('projectSelectChange', value.label.trim() + '-' + tmpOrder)
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
      handleChange (value, key, column) {
        const newData = [...this.dataPurchased]
        const target = newData.find(item => key === item.key)
        if (target) {
          target[column] = value
          this.dataPurchased = newData
        }
      },
      saveRow (record) {
        const { key } = record
        const target = this.dataPurchased.find(item => item.key === key)
        target.editable = false
        target.isNew = false
        this.memberLoading = false
      },
      removeRow (key) {
        const newData = this.dataPurchased.filter(item => item.key !== key)
        this.dataPurchased = newData
      },
      getColumnsPurchasedArray () {
        return getColumnsPurchased()
      },
      importExcel (file) {
        // console.log(file)
        this.readExcel(file)
        return false
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
              const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成json表格内容
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
              var keyIndex = 2 // 件号index
              tmpDataItemArray.forEach(item => {
                // 在已有备件数据中查找相同件号
                var isFind = false
                var findIndex = 0
                for (var i = 0; i < that.dataPurchased.length; i++) {
                  if (item[keyIndex] === that.dataPurchased[i].purchased_part_key_number) {
                    isFind = true
                    findIndex = i
                    break
                  }
                }

                const memo = typeof item[5] === 'undefined' ? '' : item[5] + ''
                console.log(memo)
                if (isFind) {
                  that.dataPurchased[findIndex].purchased_part_key_number = item[4] + ''
                  that.dataPurchased[findIndex].purchased_part_number = item[2] + ''
                  that.dataPurchased[findIndex].purchased_part_name = item[1] + ''
                  that.dataPurchased[findIndex].purchased_part_qty = item[3] + ''
                  that.dataPurchased[findIndex].purchased_part_memo = memo
                } else {
                  that.dataPurchased.push({
                    key: randomNum(1000, 9999999) + '',
                    purchased_part_no: item[0] + '',
                    purchased_part_key_number: item[4] + '',
                    purchased_part_number: item[2] + '',
                    purchased_part_name: item[1] + '',
                    purchased_part_qty: item[3] + '',
                    purchased_part_memo: memo
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
