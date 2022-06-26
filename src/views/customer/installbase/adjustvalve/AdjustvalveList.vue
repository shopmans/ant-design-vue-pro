<template>
  <div ref="farther">
    <page-header-wrapper style="position: fixed;z-index: 9;border-bottom: 1px solid #e8e8e8" :style="{width:fartherWidth}">
    </page-header-wrapper>
    <br>
    <br>
    <br>
    <br>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('menu.spare_parts.valve.serial')">
                <a-input v-model="queryParam.serial" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('menu.spare_parts.valve.tag')">
                <a-input v-model="queryParam.tag" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('menu.project.view.query.customerName')">
                <a-input v-model="queryParam.customerName" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">{{ $t('menu.project.view.query.query') }}</a-button>
                <a-button style="margin-left: 8px" @click="resetQuery">{{ $t('menu.project.view.query.reset') }}</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button icon="plus" @click="handleAdd">{{ $t('menu.project.view.newproject') }}</a-button>
        <a-button type="primary" icon="plus" @click="importExcel">{{ $t('menu.spare_parts.excel_import') }}</a-button>
        <a-upload hidden accept=".xls,.xlsx" :before-upload="importExcelImpl" :show-upload-list="false" ><a-button hidden id="importExcelButton"></a-button></a-upload>
      </div>

      <s-table
        ref="table"
        rowKey="ID"
        :columns="columns"
        :data="loadData"
        :scroll="{ x: 7500 }"
        :pagination="paginationOpt"
      >
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleDescrption(record)">{{ $t('menu.project.view.action.detail') }}</a>
            <a-divider type="vertical" />
            <a @click="handleEdit(record)">{{ $t('menu.user.manager.action.edit') }}</a>
            <a-divider type="vertical" />
            <a-popconfirm :title="$t('menu.user.manager.action.delete.confirm')" @confirm="deleteRecord(record)">
              <a>{{ $t('menu.project.view.action.delete') }}</a>
            </a-popconfirm>
          </template>
        </span>
        <span slot="Date" slot-scope="text">
          {{ text | format }}
        </span>
      </s-table>

      <!-- 修改 -->
      <a-modal
        :title="userModelTitle"
        style="top: 20px;"
        :width="1000"
        v-model="visible"
        :maskClosable="false"
        :confirmLoading="confirmLoading"
        @ok="handleAddOk"
      >
        <a-form class="permission-form" :form="form">
          <a-row :gutter="24">
            <!-- 客户名称 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.project.view.query.customerName')">
                <a-input v-decorator="['customer_name', { rules: [{}] }]" disabled />
              </a-form-item>
            </a-col>
            <!-- 生产部/分厂 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.customer.installbase.factory')">
                <a-input v-decorator="['factroy', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 装置 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.device')">
                <a-input v-decorator="['device', {}]" />
              </a-form-item>
            </a-col>
            <!-- 位号 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.tag')">
                <a-input v-decorator="['tag', { rules: [{required: true, message: $t('menu.spare_parts.valve.tag')}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀门品牌 -->
            <a-col :span="6">
              <a-form-item label="阀门品牌">
                <a-input v-decorator="['valve_brand', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀门种类 -->
            <a-col :span="6">
              <a-form-item label="阀门种类">
                <a-input v-decorator="['valve_class', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀类型 -->
            <a-col :span="6">
              <a-form-item label="阀类型">
                <a-input v-decorator="['valve_type', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀门序列号 -->
            <a-col :span="6">
              <a-form-item label="阀门序列号/批次号">
                <a-input v-decorator="['valve_serial', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀门型号 -->
            <a-col :span="6">
              <a-form-item label="阀门型号">
                <a-input v-decorator="['valve_model', { rules: [{required: true, message: $t('menu.spare_parts.valve.serial')}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀门尺寸 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.size')">
                <a-input v-decorator="['valve_size', {}]" />
              </a-form-item>
            </a-col>
            <!-- 执行机构品牌 -->
            <a-col :span="6">
              <a-form-item label="执行机构品牌">
                <a-input v-decorator="['actuator_brand', {}]" />
              </a-form-item>
            </a-col>
            <!-- 执行机构型号 -->
            <a-col :span="6">
              <a-form-item :label="$t('执行机构型号')">
                <a-input v-decorator="['actuator_model', {}]" />
              </a-form-item>
            </a-col>
            <!-- 执行机构尺寸 -->
            <a-col :span="6">
              <a-form-item :label="$t('执行机构尺寸')">
                <a-input v-decorator="['actuator_size', {}]" />
              </a-form-item>
            </a-col>
            <!-- 执行机构序列号 -->
            <a-col :span="6">
              <a-form-item label="执行机构序列号">
                <a-input v-decorator="['actuator_serial', {}]" />
              </a-form-item>
            </a-col>
            <!-- 压力等级 -->
            <a-col :span="6">
              <a-form-item label="压力等级">
                <a-input v-decorator="['pressure_level', {}]" />
              </a-form-item>
            </a-col>
            <!-- 连接形式 -->
            <a-col :span="6">
              <a-form-item label="连接形式">
                <a-input v-decorator="['connection_type', {}]" />
              </a-form-item>
            </a-col>
            <!-- 阀体材质 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.body_material')">
                <a-input v-decorator="['valve_material', {}]" />
              </a-form-item>
            </a-col>
            <!-- 阀杆材质 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.stem_material')">
                <a-input v-decorator="['valve_stem_material', {}]" />
              </a-form-item>
            </a-col>
            <!-- 阀芯材质 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.spool_material')">
                <a-input v-decorator="['valve_core_material', {}]" />
              </a-form-item>
            </a-col>
            <!-- 阀座材质 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.seat_material')">
                <a-input v-decorator="['valve_seat_material', {}]" />
              </a-form-item>
            </a-col>
            <!-- 阀笼材质 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.cage_material')">
                <a-input v-decorator="['cage_material', {}]" />
              </a-form-item>
            </a-col>
            <!-- 流量特性 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.flow_characteristics')">
                <a-input v-decorator="['flow_char', {}]" />
              </a-form-item>
            </a-col>
            <!-- 泄漏等级 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.leakage_level')">
                <a-input v-decorator="['leak_level', {}]" />
              </a-form-item>
            </a-col>
            <!-- 填料类型 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.packing_type')">
                <a-input v-decorator="['packing_type', {}]" />
              </a-form-item>
            </a-col>
            <!-- 行程 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.travel')">
                <a-input v-decorator="['travel', {}]" />
              </a-form-item>
            </a-col>
            <!-- Benchset -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.benchset')">
                <a-input v-decorator="['benchset', {}]" />
              </a-form-item>
            </a-col>
            <!-- 定位器 -->
            <a-col :span="6">
              <a-form-item label="定位器">
                <a-input v-decorator="['locator', {}]" />
              </a-form-item>
            </a-col>
            <!-- 其它附件 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.attachment')">
                <a-input v-decorator="['other_accessory', {}]" />
              </a-form-item>
            </a-col>
            <!-- 介质 -->
            <a-col :span="6">
              <a-form-item label="介质">
                <a-input v-decorator="['medium', {}]" />
              </a-form-item>
            </a-col>
            <!-- 工作温度 -->
            <a-col :span="6">
              <a-form-item label="工作温度">
                <a-input v-decorator="['work_temp', {}]" />
              </a-form-item>
            </a-col>
            <!-- 阀前压力P1 -->
            <a-col :span="6">
              <a-form-item label="阀前压力P1">
                <a-input v-decorator="['pressure_p1', {}]" />
              </a-form-item>
            </a-col>
            <!-- 阀前压力P2 -->
            <a-col :span="6">
              <a-form-item label="阀前压力P2">
                <a-input v-decorator="['pressure_p2', {}]" />
              </a-form-item>
            </a-col>
            <!-- 重要程度 -->
            <a-col :span="6">
              <a-form-item label="重要程度">
                <a-input v-decorator="['importance', {}]" />
              </a-form-item>
            </a-col>
            <!-- 阀门订单号 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.order_number')">
                <a-input v-decorator="['valve_order', {}]" />
              </a-form-item>
            </a-col>
            <!-- 备注 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.memo')">
                <a-input v-decorator="['memo', {}]" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <a-input hidden v-decorator="['ID', {}]" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <a-input hidden v-decorator="['customer_id', {}]" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
    </a-card>

    <!-- 详细 -->
    <a-modal
      :title="$t('menu.project.view.action.detail')"
      style="top: 20px;"
      :width="800"
      v-model="descVisible"
      :maskClosable="false"
      @ok="() => {descVisible =false}"
    >
      <a-descriptions size="small">
        <!-- 客户名称 -->
        <a-descriptions-item :label="$t('menu.project.view.query.customerName')">{{ showDescrptionDat.customer_name }}</a-descriptions-item>
        <!-- 生产部/分厂 -->
        <a-descriptions-item :label="$t('menu.customer.installbase.factory')">{{ showDescrptionDat.factory }}</a-descriptions-item>
        <!-- 装置 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.device')">{{ showDescrptionDat.device }}</a-descriptions-item>
        <!-- 位号 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.tag')">{{ showDescrptionDat.tag }}</a-descriptions-item>
        <!-- 品牌 -->
        <a-descriptions-item :label="$t('menu.customer.installbase.brand')">{{ showDescrptionDat.brand }}</a-descriptions-item>
        <!-- 序列号 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.serial')">{{ showDescrptionDat.serial }}</a-descriptions-item>
        <!-- 阀门尺寸 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.size')">{{ showDescrptionDat.size }}</a-descriptions-item>
        <!-- 阀型 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.model')">{{ showDescrptionDat.model }}</a-descriptions-item>
        <!-- 执行机构 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.actuator')">{{ showDescrptionDat.actuator }}</a-descriptions-item>
        <!-- 介质 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.medium')">{{ showDescrptionDat.medium }}</a-descriptions-item>
        <!-- 压力等级 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.pressure_level')">{{ showDescrptionDat.pressure_level }}</a-descriptions-item>
        <!-- 阀体材质 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.body_material')">{{ showDescrptionDat.body_material }}</a-descriptions-item>
        <!-- 阀杆材质 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.stem_material')">{{ showDescrptionDat.stem_material }}</a-descriptions-item>
        <!-- 阀芯材质 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.spool_material')">{{ showDescrptionDat.spool_material }}</a-descriptions-item>
        <!-- 阀座材质 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.seat_material')">{{ showDescrptionDat.seat_material }}</a-descriptions-item>
        <!-- 阀笼材质 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.cage_material')">{{ showDescrptionDat.cage_material }}</a-descriptions-item>
        <!-- 流量特性 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.flow_characteristics')">{{ showDescrptionDat.flow_characteristics }}</a-descriptions-item>
        <!-- 泄漏等级 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.leakage_level')">{{ showDescrptionDat.leakage_level }}</a-descriptions-item>
        <!-- 填料类型 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.packing_type')">{{ showDescrptionDat.packing_type }}</a-descriptions-item>
        <!-- 行程 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.travel')">{{ showDescrptionDat.travel }}</a-descriptions-item>
        <!-- Benchset -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.benchset')">{{ showDescrptionDat.benchset }}</a-descriptions-item>
        <!-- 用途 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.use')">{{ showDescrptionDat.use }}</a-descriptions-item>
        <!-- 附件 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.attachment')">{{ showDescrptionDat.attachment }}</a-descriptions-item>
        <!-- 阀门订单号 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.order_number')">{{ showDescrptionDat.order_number }}</a-descriptions-item>
        <!-- 备注 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.memo')">{{ showDescrptionDat.memo }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>

    <importValveData
      ref="createImportilModal"
      :visible="importVisible"
      @cancel="handleImportCancel"
      @ok="handleImportOK"
    />
  </div>
</template>

<script>
import moment from 'moment'
import pick from 'lodash.pick'
import { STable } from '@/components'
import { sparePartsList, deleteSparePart, modifySpareParts, addSpareParts, importPartsList } from '@/api/spareParts'
import { getInstallbaseCloumes, getInstallbaseFields } from '@/api/step'
import XLSX from 'xlsx'
import importValveData from './ImportValveData'

const state = {
  1: 'menu.user.manager.query.userState.item1',
  2: 'menu.user.manager.query.userState.item2'
}

const position = {
  1: 'menu.project.view.table.column.sales',
  2: 'menu.user.manager.new.maintenanceEngineer'
}

const columns = getInstallbaseCloumes()

export default {
  name: 'TableList',
  components: {
    STable,
    XLSX,
    importValveData
  },
  data () {
    return {
      description: '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',
      confirmLoading: false,
      visible: false,
      importVisible: false,
      descVisible: false,
      form: this.$form.createForm(this),
      permissions: [],
      addOrModify: true,
      fartherWidth: '',
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)

        return sparePartsList(requestParameters).then(res => {
          return res.result
        })
      },
      paginationOpt: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, // 默认当前页显示数据的大小
        total: 0, // 总数，必须先有
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '30', '50'],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.paginationOpt.defaultCurrent = 1
          this.paginationOpt.defaultPageSize = pageSize
          this.$refs.table.refresh(true)
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationOpt.defaultCurrent = current
          this.paginationOpt.defaultPageSize = size
          this.$refs.table.refresh(true)
        }
      },
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      state: state,
      position: position,
      columns: columns,
      userModelTitle: '',
      showDescrptionDat: {}
    }
  },
  filters: {
    statusFilter (key) {
      return state[key]
    },
    positionFilter (key) {
        return position[key]
    },
    format (val) {
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  mounted () {
    this.fartherWidth = this.$refs.farther.clientWidth + 50 + 'px'
    window.onresize = () => {
      this.fartherWidth = this.$refs.farther.clientWidth + 50 + 'px'
    }
  },
  watch: {
    fartherWidth: {
      handler (val) {
        this.fartherWidth = val
      }
    }
  },
  methods: {
    getInstallbaseFields,
    handleAdd () {
      this.form.resetFields()
      this.addOrModify = true
      this.visible = true
      this.userModelTitle = this.$t('menu.project.view.newproject')
    },
    resetQuery () {
        this.queryParam = {}
        this.$refs.table.refresh(true)
    },
    handleEdit (record) {
      this.addOrModify = false
      this.visible = true
      this.userModelTitle = this.$t('menu.user.manager.modify')

      const fields = getInstallbaseFields()

      fields.forEach(v => this.form.getFieldDecorator(v))
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, fields))
      })
    },
    deleteRecord (record) {
        deleteSparePart(record).then(res => {
            this.$refs.table.refresh()
            this.$message.info(this.$t('menu.user.manager.new.successful'))
        })
    },
    handleDescrption (record) {
      this.showDescrptionDat = record
      this.descVisible = true
    },
    handleAddOk (e) {
      this.confirmLoading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.ID && values.ID.length > 0) {
              modifySpareParts(values).then(res => {
                  this.visible = false
                  // 重置表单数据
                  this.form.resetFields()
                  // 刷新表格
                  this.$refs.table.refresh()
                  this.$message.info(this.$t('menu.user.manager.new.successful'))
              })
          } else {
              addSpareParts(values).then(res => {
                  // 刷新表格
                  this.$refs.table.refresh()
                  this.$message.info(this.$t('menu.user.manager.new.successful'))
                  this.visible = false
                  // 重置表单数据
                  this.form.resetFields()
              })
          }
        }

        this.confirmLoading = false
      })
    },
    importExcel () {
      this.importVisible = true
    },
    handleImportCancel () {
      this.importVisible = false
    },
    handleImportOK () {
      console.log(this.$refs.createImportilModal.selectCustomerId + '  ' + this.$refs.createImportilModal.dataOption)
      if (this.$refs.createImportilModal.selectCustomerId === 0) {
        this.$message.error('错误', '还未选择客户')
        return
      }
      // this.importVisible = false
      document.getElementById('importExcelButton').click()
    },
    importExcelImpl (file) { // 表格导入
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

          // 查找序列号单元格并取得件号属性名称
          if (ws[0]['8'] !== '阀门序列号') {
            this.$message.error('导入Excel文件没有找到“阀门序列号”单元格')
            return
          }

          // var fieldNameList = ['序号', '生产部/分厂', '装置', '位号', '阀门品牌', '阀门种类', '阀类型', '阀门序列号', '阀门型号', '阀门尺寸', '执行机构品牌', '执行机构型号', '执行机构尺寸', '执行机构序列号', '压力等级', '连接形式', '阀体材质', '阀杆材质', '阀芯材质', '阀座材质', '阀笼材质', '流量特性', '泄漏等级', '填料类型', '行程', 'Benchset', '定位器', '其它附件', '介质', '工作温度℃', '阀前压力P1', '阀后压力P2', '重要程度', '阀门订单号', '备注']
          var tmpDataItemArray = []
          for (let i = 1; i < ws.length; i++) { // 第一行是title
            var tmpDataItem = []
            var tmpDataObject = ws[i]

            for (let k = 2; k < 36; k++) { // 排除序号
              const tmpValue = tmpDataObject[k]
              if (tmpValue) {
                tmpDataItem.push(tmpValue)
              } else {
                tmpDataItem.push('')
              }
            }
            tmpDataItemArray.push(tmpDataItem)
          }

          var tmpData = {}
          tmpData.spare_parts_valve_list = []
          tmpDataItemArray.forEach(item => {
            tmpData.spare_parts_valve_list.push({
              factroy: item[0] + '',
              device: item[1] + '',
              tag: item[2] + '',
              valve_brand: item[3] + '',
              valve_class: item[4] + '',
              valve_type: item[5] + '',
              valve_serial: item[6] + '',
              valve_model: item[7] + '',
              valve_size: item[8] + '',
              actuator_brand: item[9] + '',
              actuator_model: item[10] + '',
              actuator_size: item[11] + '',
              actuator_serial: item[12] + '',
              pressure_level: item[13] + '',
              connection_type: item[14] + '',
              valve_material: item[15] + '',
              valve_stem_material: item[16] + '',
              valve_core_material: item[17] + '',
              valve_seat_material: item[18] + '',
              cage_material: item[19] + '',
              flow_char: item[20] + '',
              leak_level: item[21] + '',
              packing_type: item[22] + '',
              travel: item[23] + '',
              benchset: item[24] + '',
              locator: item[25] + '',
              other_accessory: item[26] + '',
              medium: item[27] + '',
              work_temp: item[28] + '',
              pressure_p1: item[29] + '',
              pressure_p2: item[30] + '',
              importance: item[31] + '',
              valve_order: item[32] + '',
              memo: item[33] + ''
            })
          })

          if (tmpData.spare_parts_valve_list.length > 0) {
            tmpData.customerId = this.$refs.createImportilModal.selectCustomerId
            tmpData.dataOption = this.$refs.createImportilModal.dataOption

            importPartsList(tmpData).then(e => {
              that.$refs.table.refresh()
              that.importVisible = false
              that.$message.success('导入数据成功')
            })
          }
        } catch (e) {
            return false
        }
      }
      fileReader.readAsBinaryString(file)
    }
  }
}
</script>

<style lang="less" scoped>
.permission-form {
  /deep/ .permission-group {
    margin-top: 0;
    margin-bottom: 0;
  }
}

</style>
