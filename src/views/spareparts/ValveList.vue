<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item :label="$t('menu.spare_parts.valve.serial')">
                <a-input v-model="queryParam.serial" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item :label="$t('menu.spare_parts.valve.tag')">
                <a-input v-model="queryParam.tag" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">{{ $t('menu.project.view.query.query') }}</a-button>
                <a-button style="margin-left: 8px" @click="resetQuery">{{ $t('menu.project.view.query.reset') }}</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator" v-if="optImport">
        <a-upload accept=".xls,.xlsx" :before-upload="importExcel" :show-upload-list="false" ><a-button type="primary" icon="plus">{{ $t('menu.spare_parts.excel_import') }}</a-button></a-upload>
      </div>

      <!-- 导入 -->
      <s-table
        ref="table"
        rowKey="ID"
        size="default"
        :columns="columns"
        :data="loadData"
        :scroll="{ x: 4300 }"
        v-if="optImport"
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

      <!-- 查询 -->
      <s-table
        ref="table"
        rowKey="ID"
        size="default"
        :columns="columns"
        :data="loadData"
        :scroll="{ x: 4300 }"
        v-if="optQuery"
        :pagination="paginationOpt"
      >
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleDescrption(record)">{{ $t('menu.project.view.action.detail') }}</a>
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
            <!-- 序列号 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.serial')">
                <a-input v-decorator="['serial', { rules: [{required: true, message: $t('menu.spare_parts.valve.serial')}] }]" />
              </a-form-item>
            </a-col>
            <!-- 位号 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.tag')">
                <a-input v-decorator="['tag', { rules: [{required: true, message: $t('menu.spare_parts.valve.tag')}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀门尺寸 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.size')">
                <a-input v-decorator="['size', {}]" />
              </a-form-item>
            </a-col>
            <!-- 阀型 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.model')">
                <a-input v-decorator="['model', {}]" />
              </a-form-item>
            </a-col>
            <!-- 执行机构 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.actuator')">
                <a-input v-decorator="['actuator', {}]" />
              </a-form-item>
            </a-col>
            <!-- 介质 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.medium')">
                <a-input v-decorator="['medium', {}]" />
              </a-form-item>
            </a-col>
            <!-- 压力等级 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.pressure_level')">
                <a-input v-decorator="['pressure_level', {}]" />
              </a-form-item>
            </a-col>
            <!-- 阀体材质 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.body_material')">
                <a-input v-decorator="['body_material', {}]" />
              </a-form-item>
            </a-col>
            <!-- 阀杆材质 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.stem_material')">
                <a-input v-decorator="['stem_material', {}]" />
              </a-form-item>
            </a-col>
            <!-- 阀芯材质 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.spool_material')">
                <a-input v-decorator="['spool_material', {}]" />
              </a-form-item>
            </a-col>
            <!-- 阀座材质 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.seat_material')">
                <a-input v-decorator="['seat_material', {}]" />
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
                <a-input v-decorator="['flow_characteristics', {}]" />
              </a-form-item>
            </a-col>
            <!-- 泄漏等级 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.leakage_level')">
                <a-input v-decorator="['leakage_level', {}]" />
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
            <!-- 装置 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.device')">
                <a-input v-decorator="['device', {}]" />
              </a-form-item>
            </a-col>
            <!-- 用途 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.use')">
                <a-input v-decorator="['use', {}]" />
              </a-form-item>
            </a-col>
            <!-- 附件 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.attachment')">
                <a-input v-decorator="['attachment', {}]" />
              </a-form-item>
            </a-col>
            <!-- 阀门订单号 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.spare_parts.valve.order_number')">
                <a-input v-decorator="['order_number', {}]" />
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
                <a-input hidden v-decorator="['id', {}]" />
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
        <!-- 序列号 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.serial')">{{ showDescrptionDat.serial }}</a-descriptions-item>
        <!-- 位号 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.tag')">{{ showDescrptionDat.tag }}</a-descriptions-item>
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
        <!-- 装置 -->
        <a-descriptions-item :label="$t('menu.spare_parts.valve.device')">{{ showDescrptionDat.device }}</a-descriptions-item>
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
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import pick from 'lodash.pick'
import { STable } from '@/components'
import { sparePartsList, importPartsList, deleteSparePart, modifySpareParts, addSpareParts } from '@/api/spareParts'
import XLSX from 'xlsx'

const state = {
  1: 'menu.user.manager.query.userState.item1',
  2: 'menu.user.manager.query.userState.item2'
}

const position = {
  1: 'menu.project.view.table.column.sales',
  2: 'menu.user.manager.new.maintenanceEngineer'
}

const columns = [
  { // date
    sorter: true,
    dataIndex: 'Date',
    slotName: 'menu.project.view.table.column.date',
    scopedSlots: { customRender: 'Date', title: 'menu.project.view.table.column.date' }
  },
  { // 序列号
    sorter: true,
    dataIndex: 'serial',
    slotName: 'menu.spare_parts.valve.serial',
    scopedSlots: { customRender: 'serial', title: 'menu.spare_parts.valve.serial' }
  },
  { // 位号
    sorter: true,
    dataIndex: 'tag',
    slotName: 'menu.spare_parts.valve.tag',
    scopedSlots: { customRender: 'tag', title: 'menu.spare_parts.valve.tag' }
  },
  { // 阀门尺寸
    sorter: true,
    dataIndex: 'size',
    slotName: 'menu.spare_parts.valve.size',
    scopedSlots: { customRender: 'size', title: 'menu.spare_parts.valve.size' }
  },
  { // 阀型
    dataIndex: 'model',
    slotName: 'menu.spare_parts.valve.model',
    scopedSlots: { customRender: 'model', title: 'menu.spare_parts.valve.model' }
  },
  { // 执行机构
    dataIndex: 'actuator',
    slotName: 'menu.spare_parts.valve.actuator',
    scopedSlots: { customRender: 'actuator', title: 'menu.spare_parts.valve.actuator' }
  },
  { // 介质
    dataIndex: 'medium',
    slotName: 'menu.spare_parts.valve.medium',
    scopedSlots: { customRender: 'medium', title: 'menu.spare_parts.valve.medium' }
  },
  { // 压力等级
    dataIndex: 'pressure_level',
    slotName: 'menu.spare_parts.valve.pressure_level',
    scopedSlots: { customRender: 'pressure_level', title: 'menu.spare_parts.valve.pressure_level' }
  },
  { // 阀体材质
    dataIndex: 'body_material',
    slotName: 'menu.spare_parts.valve.body_material',
    scopedSlots: { customRender: 'body_material', title: 'menu.spare_parts.valve.body_material' }
  },
  { // 阀杆材质
    dataIndex: 'stem_material',
    slotName: 'menu.spare_parts.valve.stem_material',
    scopedSlots: { customRender: 'stem_material', title: 'menu.spare_parts.valve.stem_material' }
  },
  { // 阀芯材质
    dataIndex: 'spool_material',
    slotName: 'menu.spare_parts.valve.spool_material',
    scopedSlots: { customRender: 'spool_material', title: 'menu.spare_parts.valve.spool_material' }
  },
  { // 阀座材质
    dataIndex: 'seat_material',
    slotName: 'menu.spare_parts.valve.seat_material',
    scopedSlots: { customRender: 'seat_material', title: 'menu.spare_parts.valve.seat_material' }
  },
  { // 阀笼材质
    dataIndex: 'cage_material',
    slotName: 'menu.spare_parts.valve.cage_material',
    scopedSlots: { customRender: 'cage_material', title: 'menu.spare_parts.valve.cage_material' }
  },
  { // 流量特性
    dataIndex: 'flow_characteristics',
    slotName: 'menu.spare_parts.valve.flow_characteristics',
    scopedSlots: { customRender: 'flow_characteristics', title: 'menu.spare_parts.valve.flow_characteristics' }
  },
  { // 泄漏等级
    dataIndex: 'leakage_level',
    slotName: 'menu.spare_parts.valve.leakage_level',
    scopedSlots: { customRender: 'leakage_level', title: 'menu.spare_parts.valve.leakage_level' }
  },
  { // 填料类型
    dataIndex: 'packing_type',
    slotName: 'menu.spare_parts.valve.packing_type',
    scopedSlots: { customRender: 'packing_type', title: 'menu.spare_parts.valve.packing_type' }
  },
  { // 行程
    dataIndex: 'travel',
    slotName: 'menu.spare_parts.valve.travel',
    scopedSlots: { customRender: 'travel', title: 'menu.spare_parts.valve.travel' }
  },
  { // Benchset
    dataIndex: 'benchset',
    slotName: 'menu.spare_parts.valve.benchset',
    scopedSlots: { customRender: 'benchset', title: 'menu.spare_parts.valve.benchset' }
  },
  { // 装置
    dataIndex: 'device',
    slotName: 'menu.spare_parts.valve.device',
    scopedSlots: { customRender: 'device', title: 'menu.spare_parts.valve.device' }
  },
  { // 用途
    dataIndex: 'use',
    slotName: 'menu.spare_parts.valve.use',
    scopedSlots: { customRender: 'use', title: 'menu.spare_parts.valve.use' }
  },
  { // 附件
    dataIndex: 'attachment',
    slotName: 'menu.spare_parts.valve.attachment',
    scopedSlots: { customRender: 'attachment', title: 'menu.spare_parts.valve.attachment' }
  },
  { // 阀门订单号
    dataIndex: 'order_number',
    slotName: 'menu.spare_parts.valve.order_number',
    scopedSlots: { customRender: 'order_number', title: 'menu.spare_parts.valve.order_number' }
  },
  { // 备注
    dataIndex: 'memo',
    slotName: 'menu.spare_parts.valve.memo',
    scopedSlots: { customRender: 'memo', title: 'menu.spare_parts.valve.memo' }
  },
  {
    dataIndex: 'action',
    slotName: 'menu.project.view.table.column.action',
    scopedSlots: { customRender: 'action', title: 'menu.project.view.table.column.action' }
  }
]

export default {
  name: 'TableList',
  components: {
    STable,
    XLSX
  },
  mounted () {
    this.optImport = false
    this.optQuery = false

    // 查询
    if (this.$route.meta.opt === 'import') {
      this.optImport = true
    }
    // 导入
    if (this.$route.meta.opt === 'query') {
      this.optQuery = true
    }
  },
  data () {
    return {
      description: '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',
      confirmLoading: false,
      visible: false,
      descVisible: false,
      form: this.$form.createForm(this),
      permissions: [],
      addOrModify: true,
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)

        return sparePartsList(requestParameters)
        .then(res => {
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
      showDescrptionDat: {},
      optImport: false,
      optQuery: false
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
  methods: {
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

      const fields = ['id', 'serial', 'tag', 'size', 'model', 'actuator', 'medium', 'pressure_level', 'body_material', 'stem_material', 'spool_material', 'seat_material', 'cage_material', 'flow_characteristics', 'leakage_level', 'packing_type', 'travel', 'benchset', 'device', 'use', 'attachment', 'order_number', 'memo']
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
          if (values.id && values.id.length > 0) {
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
    importExcel (file) { // 表格导入
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
          var keySerialPropName = '' // 件号属性名称
          ws.forEach(wsItem => {
            for (var wsItemProp of Object.keys(wsItem)) {
              if (wsItem[wsItemProp] === '序列号') {
                keySerialPropName = wsItemProp
                break
              }
            }
          })
          if (keySerialPropName.length === '') {
            this.$message.error('导入Excel文件没有找到“序列号”单元格')
            return
          }

          var tmpDataItemArray = []
          for (let i = 1; i < ws.length; i++) {
            var tmpDataItem = []
            var tmpDataObject = ws[i]
            // 序列号属性是否存在
            if (!tmpDataObject[keySerialPropName]) {
              break
            }

            for (var key of Object.keys(tmpDataObject)) {
              tmpDataItem.push(tmpDataObject[key])
            }
            tmpDataItemArray.push(tmpDataItem)
          }
          console.log(tmpDataItemArray)

          var tmpData = {}
          tmpData.spare_parts_valve_list = []
          tmpDataItemArray.forEach(item => {
            tmpData.spare_parts_valve_list.push({
              serial: item[0] + '',
              tag: item[1] + '',
              size: item[2] + '',
              model: item[3] + '',
              actuator: item[4] + '',
              medium: item[5] + '',
              pressure_level: item[6] + '',
              body_material: item[7] + '',
              stem_material: item[8] + '',
              spool_material: item[9] + '',
              seat_material: item[10] + '',
              cage_material: item[11] + '',
              flow_characteristics: item[12] + '',
              leakage_level: item[13] + '',
              packing_type: item[14] + '',
              travel: item[15] + '',
              benchset: item[16] + '',
              device: item[17] + '',
              use: item[18] + '',
              attachment: item[19] + '',
              order_number: item[20] + '',
              memo: item[21] + ''
            })
          })

        if (tmpData.spare_parts_valve_list.length > 0) {
            importPartsList(tmpData).then(e => {
              that.$refs.table.refresh()
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
