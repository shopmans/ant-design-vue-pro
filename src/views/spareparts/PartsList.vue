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
        size="small"
        :columns="columns"
        :data="loadData"
        :scroll="{ x: 4300 }"
        bordered
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
        size="small"
        :columns="columns"
        :data="loadData"
        :scroll="{ x: 4300 }"
        bordered
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
    </a-card>

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
          <!-- 阀门型号 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.valve_model')">
              <a-input v-decorator="['valve_model', {}]" />
            </a-form-item>
          </a-col>
          <!-- 执行器型号 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.actuator_model')">
              <a-input v-decorator="['actuator_model', {}]" />
            </a-form-item>
          </a-col>
          <!-- 磅级 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.pound_class')">
              <a-input v-decorator="['pound_class', {}]" />
            </a-form-item>
          </a-col>
          <!-- 特殊阀内件 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.special_trims')">
              <a-input v-decorator="['special_trims', {}]" />
            </a-form-item>
          </a-col>
          <!-- 泄漏等级 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.leakage_level')">
              <a-input v-decorator="['leakage_level', {}]" />
            </a-form-item>
          </a-col>
          <!-- 用途 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.use')">
              <a-input v-decorator="['use', {}]" />
            </a-form-item>
          </a-col>
          <!-- 推荐维修等级 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_maintenance_level')">
              <a-input v-decorator="['recommended_maintenance_level', {}]" />
            </a-form-item>
          </a-col>
          <a-divider>{{ $t('menu.spare_parts.parts.packing') }}</a-divider>
          <!-- 推荐备件 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['packing_recommended_parts', {}]" />
            </a-form-item>
          </a-col>
          <!-- 推荐数量 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_number')">
              <a-input v-decorator="['packing_recommended_number', {}]" />
            </a-form-item>
          </a-col>
          <a-divider>{{ $t('menu.spare_parts.parts.gasket') }}</a-divider>
          <!-- 推荐备件 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['gasket_recommended_parts', {}]" />
            </a-form-item>
          </a-col>
          <!-- 推荐数量 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_number')">
              <a-input v-decorator="['gasket_recommended_number', {}]" />
            </a-form-item>
          </a-col>
          <a-divider>{{ $t('menu.spare_parts.parts.seatring') }}</a-divider>
          <!-- 推荐备件 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['seatring_recommended_parts', {}]" />
            </a-form-item>
          </a-col>
          <!-- 推荐数量 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['seatring_recommended_number', {}]" />
            </a-form-item>
          </a-col>
          <a-divider>{{ $t('menu.spare_parts.parts.spoolsstem') }}</a-divider>
          <!-- 推荐备件 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['spoolsstem_recommended_parts', {}]" />
            </a-form-item>
          </a-col>
          <!-- 推荐数量 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['spoolsstem_recommended_number', {}]" />
            </a-form-item>
          </a-col>
          <a-divider>{{ $t('menu.spare_parts.parts.bearing') }}</a-divider>
          <!-- 推荐备件 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['bearing_recommended_parts', {}]" />
            </a-form-item>
          </a-col>
          <!-- 推荐数量 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['bearing_recommended_number', {}]" />
            </a-form-item>
          </a-col>
          <a-divider>{{ $t('menu.spare_parts.parts.cage') }}</a-divider>
          <!-- 推荐备件 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['cage_recommended_parts', {}]" />
            </a-form-item>
          </a-col>
          <!-- 推荐数量 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['cage_recommended_number', {}]" />
            </a-form-item>
          </a-col>
          <a-divider>{{ $t('menu.spare_parts.parts.diaphragm') }}</a-divider>
          <!-- 推荐备件 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['diaphragm_recommended_parts', {}]" />
            </a-form-item>
          </a-col>
          <!-- 推荐数量 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['diaphragm_recommended_number', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-input hidden v-decorator="['id', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.memo')">
              <a-input v-decorator="['memo', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>

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
        <a-descriptions-item :label="$t('menu.spare_parts.valve.serial')">{{ showDescrptionDat.serial }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.spare_parts.valve.tag')">{{ showDescrptionDat.tag }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.spare_parts.valve.size')">{{ showDescrptionDat.size }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.spare_parts.valve.model')">{{ showDescrptionDat.valve_model }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.spare_parts.parts.actuator_model')">{{ showDescrptionDat.actuator_model }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.spare_parts.parts.pound_class')">{{ showDescrptionDat.pound_class }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.spare_parts.parts.special_trims')">{{ showDescrptionDat.special_trims }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.spare_parts.valve.leakage_level')">{{ showDescrptionDat.leakage_level }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.spare_parts.valve.use')">{{ showDescrptionDat.use }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.spare_parts.parts.recommended_maintenance_level')">{{ showDescrptionDat.recommended_maintenance_level }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions size="small" :title="$t('menu.spare_parts.parts.packing')">
        <a-descriptions-item :label="$t('menu.spare_parts.parts.recommended_parts')">{{ showDescrptionDat.packing_recommended_parts }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.spare_parts.parts.recommended_number')">{{ showDescrptionDat.packing_recommended_number }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions size="small" :title="$t('menu.spare_parts.parts.gasket')">
        <a-descriptions-item :label="$t('menu.spare_parts.parts.recommended_parts')">{{ showDescrptionDat.gasket_recommended_parts }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.spare_parts.parts.recommended_number')">{{ showDescrptionDat.gasket_recommended_number }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions size="small" :title="$t('menu.spare_parts.parts.seatring')">
        <a-descriptions-item :label="$t('menu.spare_parts.parts.recommended_parts')">{{ showDescrptionDat.seatring_recommended_parts }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.spare_parts.parts.recommended_number')">{{ showDescrptionDat.seatring_recommended_number }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions size="small" :title="$t('menu.spare_parts.parts.spoolsstem')">
        <a-descriptions-item :label="$t('menu.spare_parts.parts.recommended_parts')">{{ showDescrptionDat.spoolsstem_recommended_parts }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.spare_parts.parts.recommended_number')">{{ showDescrptionDat.spoolsstem_recommended_number }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions size="small" :title="$t('menu.spare_parts.parts.bearing')">
        <a-descriptions-item :label="$t('menu.spare_parts.parts.recommended_parts')">{{ showDescrptionDat.bearing_recommended_parts }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.spare_parts.parts.recommended_number')">{{ showDescrptionDat.bearing_recommended_number }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions size="small" :title="$t('menu.spare_parts.parts.cage')">
        <a-descriptions-item :label="$t('menu.spare_parts.parts.recommended_parts')">{{ showDescrptionDat.cage_recommended_parts }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.spare_parts.parts.recommended_number')">{{ showDescrptionDat.cage_recommended_number }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions size="small" :title="$t('menu.spare_parts.parts.diaphragm')">
        <a-descriptions-item :label="$t('menu.spare_parts.parts.recommended_parts')">{{ showDescrptionDat.diaphragm_recommended_parts }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.spare_parts.parts.recommended_number')">{{ showDescrptionDat.diaphragm_recommended_number }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions size="small">
        <a-descriptions-item :label="$t('menu.spare_parts.valve.memo')">{{ showDescrptionDat.memo }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import pick from 'lodash.pick'
import { STable } from '@/components'
import { partsList, deletePart, modifyParts, addParts, partsImport } from '@/api/spareParts'
import XLSX from 'xlsx'
// importPartsList
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
  { // 阀门型号
    dataIndex: 'valve_model',
    slotName: 'menu.spare_parts.parts.valve_model',
    scopedSlots: { customRender: 'valve_model', title: 'menu.spare_parts.parts.valve_model' }
  },
  { // 执行器型号
    dataIndex: 'actuator_model',
    slotName: 'menu.spare_parts.parts.actuator_model',
    scopedSlots: { customRender: 'actuator_model', title: 'menu.spare_parts.parts.actuator_model' }
  },
  { // 磅级
    dataIndex: 'pound_class',
    slotName: 'menu.spare_parts.parts.pound_class',
    scopedSlots: { customRender: 'pound_class', title: 'menu.spare_parts.parts.pound_class' }
  },
  { // 特殊阀内件
    dataIndex: 'special_trims',
    slotName: 'menu.spare_parts.parts.special_trims',
    scopedSlots: { customRender: 'special_trims', title: 'menu.spare_parts.parts.special_trims' }
  },
  { // 泄漏等级
    dataIndex: 'leakage_level',
    slotName: 'menu.spare_parts.valve.leakage_level',
    scopedSlots: { customRender: 'leakage_level', title: 'menu.spare_parts.valve.leakage_level' }
  },
  { // 用途
    dataIndex: 'use',
    slotName: 'menu.spare_parts.valve.use',
    scopedSlots: { customRender: 'use', title: 'menu.spare_parts.valve.use' }
  },
  { // 推荐维修等级
    dataIndex: 'recommended_maintenance_level',
    slotName: 'menu.spare_parts.parts.recommended_maintenance_level',
    scopedSlots: { customRender: 'recommended_maintenance_level', title: 'menu.spare_parts.parts.recommended_maintenance_level' }
  },
  { // 填料
    title: '1',
    children: [
      {
        title: '填料',
        children: [
          {
            dataIndex: 'packing_recommended_parts',
            title: '推荐备件'
          },
          {
            dataIndex: 'packing_recommended_number',
            title: '推荐数量'
          }
        ]
      }
    ]
  },
  { // 垫片
    title: '2',
    children: [
      {
        title: '垫片',
        children: [
          {
            dataIndex: 'gasket_recommended_parts',
            title: '推荐备件'
          },
          {
            dataIndex: 'gasket_recommended_number',
            title: '推荐数量'
          }
        ]
      }
    ]
  },
  { // 阀座环
    title: '3',
    children: [
      {
        title: '阀座环（碟板或阀球密封）',
        children: [
          {
            dataIndex: 'seatring_recommended_parts',
            title: '推荐备件'
          },
          {
            dataIndex: 'seatring_recommended_number',
            title: '推荐数量'
          }
        ]
      }
    ]
  },
  { // 阀芯阀杆组件
    title: '4',
    children: [
      {
        title: '阀芯阀杆组件',
        children: [
          {
            dataIndex: 'spoolsstem_recommended_parts',
            title: '推荐备件'
          },
          {
            dataIndex: 'spoolsstem_recommended_number',
            title: '推荐数量'
          }
        ]
      }
    ]
  },
  { // 阀芯密封环（轴承）
    title: '5',
    children: [
      {
        title: '阀芯密封环（轴承）',
        children: [
          {
            dataIndex: 'bearing_recommended_parts',
            title: '推荐备件'
          },
          {
            dataIndex: 'bearing_recommended_number',
            title: '推荐数量'
          }
        ]
      }
    ]
  },
  { // 阀笼
    title: '6',
    children: [
      {
        title: '阀笼',
        children: [
          {
            dataIndex: 'cage_recommended_parts',
            title: '推荐备件'
          },
          {
            dataIndex: 'cage_recommended_number',
            title: '推荐数量'
          }
        ]
      }
    ]
  },
  { // 执行机构膜片或维修包
    title: '7',
    children: [
      {
        title: '执行机构膜片或维修包',
        children: [
          {
            dataIndex: 'diaphragm_recommended_parts',
            title: '推荐备件'
          },
          {
            dataIndex: 'diaphragm_recommended_number',
            title: '推荐数量'
          }
        ]
      }
    ]
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

        return partsList(requestParameters)
        .then(res => {
          console.log(res.result)
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

      const fields = ['serial', 'tag', 'size', 'valve_model', 'actuator_model', 'pound_class', 'special_trims', 'leakage_level', 'use', 'recommended_maintenance_level',
                      'packing_recommended_parts', 'packing_recommended_number', 'gasket_recommended_parts', 'gasket_recommended_number', 'seatring_recommended_parts', 'seatring_recommended_number',
                      'spoolsstem_recommended_parts', 'spoolsstem_recommended_number', 'bearing_recommended_parts', 'bearing_recommended_number', 'cage_recommended_parts', 'cage_recommended_number',
                      'diaphragm_recommended_parts', 'diaphragm_recommended_number', 'memo']
      fields.forEach(v => this.form.getFieldDecorator(v))
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, fields))
      })
    },
    deleteRecord (record) {
        deletePart(record).then(res => {
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
              modifyParts(values).then(res => {
                  this.visible = false
                  // 重置表单数据
                  this.form.resetFields()
                  // 刷新表格
                  this.$refs.table.refresh()
                  this.$message.info(this.$t('menu.user.manager.new.successful'))
              })
          } else {
              addParts(values).then(res => {
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
          const wsname = workbook.SheetNames[1] // 取第二张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成json表格内容
          // console.log(ws)

          var tmpDataItemArray = []
          for (let i = 2; i < ws.length; i++) {
            var tmpDataItem = []
            var tmpDataObject = ws[i]
            // 序列号属性是否存在
            // if (!tmpDataObject[keySerialPropName]) {
            //   continue
            // }

            for (var key of Object.keys(tmpDataObject)) {
              tmpDataItem.push(tmpDataObject[key])
            }
            tmpDataItemArray.push(tmpDataItem)
          }
          // console.log(tmpDataItemArray)

          var tmpData = {}
          tmpData.parts_valve_list = []
          tmpDataItemArray.forEach(item => {
            tmpData.parts_valve_list.push({
              serial: item[7] + '',
              tag: item[8] + '',
              size: item[9] + '',
              valve_model: item[10] + '',
              actuator_model: item[11] + '',
              pound_class: item[12] + '',
              special_trims: item[13] + '',
              leakage_level: item[14] + '',
              use: item[15] + '',
              recommended_maintenance_level: item[16] + '',
              packing_recommended_parts: item[0] + '',
              packing_recommended_number: item[17] + '',
              gasket_recommended_parts: item[1] + '',
              gasket_recommended_number: item[18] + '',
              seatring_recommended_parts: item[2] + '',
              seatring_recommended_number: item[19] + '',
              spoolsstem_recommended_parts: item[3] + '',
              spoolsstem_recommended_number: item[20] + '',
              bearing_recommended_parts: item[4] + '',
              bearing_recommended_number: item[21] + '',
              cage_recommended_parts: item[5] + '',
              cage_recommended_number: item[22] + '',
              diaphragm_recommended_parts: item[6] + '',
              diaphragm_recommended_number: item[23] + '',
              memo: item[24] + ''
            })
          })

          if (tmpData.parts_valve_list.length > 0) {
            partsImport(tmpData).then(e => {
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
