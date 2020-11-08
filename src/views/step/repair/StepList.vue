<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('menu.workOrder.workOrderList.query.date')">
                <a-date-picker v-model="queryParam.date" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('menu.project.view.table.column.projectNumber')">
                <a-input v-model="queryParam.project_serial" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('menu.workOrder.workOrderList.query.processStatus')">
                <a-select v-model="queryParam.state" default-value="0">
                  <a-select-option value="1">{{ $t('menu.workOrder.workOrderList.query.processStatus.item1') }}</a-select-option>
                  <a-select-option value="2">{{ $t('menu.workOrder.workOrderList.query.processStatus.item2') }}</a-select-option>
                  <a-select-option value="3">{{ $t('menu.workOrder.workOrderList.query.processStatus.item3') }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <span class="table-page-search-submitButtons" >
                <a-button type="primary" @click="$refs.table.refresh(true)">{{ $t('menu.project.view.query.query') }}</a-button>
                <a-button style="margin-left: 8px" @click="resetQuery">{{ $t('menu.project.view.query.reset') }}</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">{{ $t('menu.project.view.newproject') }}</a-button>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
      >
        <span slot="date" slot-scope="text">
          {{ text | formatDate }}
        </span>
        <span slot="state" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="$t(statusMap[text].text)" />
        </span>
        <span slot="current_step" slot-scope="text">
          {{ $t(currentStepMap[text].text) }}
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleDescrption(record)">{{ $t('menu.project.view.action.detail') }}</a>
            <a-divider type="vertical" />
            <span v-if="record.current_step==='Assessment' || record.current_step==='FinalCheck' || record.current_step==='(end)'">{{ $t('menu.workOrder.repair.workOrderList.action.dispatch') }}</span>
            <a v-else @click="handleDispatchUser(record)">{{ $t('menu.workOrder.repair.workOrderList.action.dispatch') }}</a>
            <a-divider type="vertical" />
            <span v-if="record.current_step==='(end)'">{{ $t('menu.workOrder.repair.workOrderList.action.execution') }}</span>
            <a v-else @click="handleEdit(record)">{{ $t('menu.workOrder.repair.workOrderList.action.execution') }}</a>
          </template>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              {{ $t('menu.project.view.action.more') }} <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="adjustFlow(record)">{{ $t('menu.workOrder.workOrderList.flow') }}</a>
              </a-menu-item>
              <!-- v-if="$auth('table.disable')" -->
              <a-menu-item >
                <a @click="printStep(record)">{{ $t('menu.project.view.action.print') }}</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="deleteStep(record)">{{ $t('menu.project.view.action.delete') }}</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="report(record)">{{ $t('menu.project.view.action.report') }}</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

      <DispatchUserDialog
        ref="dispatchUser"
        :visible="visible"
        :flowID="flowID"
        :currentStep="currentStep"
        @cancel="handleCancel"
        @ok="handleCancel"
      />
    </a-card>

    <stepAllDetailModel
      @ok="() => { this.stepDetailvisible = false }"
      @cancel="() => { this.stepDetailvisible = false }"
      :visible="stepDetailvisible"
      ref="stepDetailModel" />

    <a-modal
      :title="$t('menu.workOrder.workOrderList.flow')"
      :width="800"
      :visible="visibleFlow"
      :destroyOnClose="true"
      :maskClosable="false"
      @ok="okFlow"
      @cancel="cancelFlow"
    >
      <a-card :title="$t('menu.workOrder.workOrderList.changeflow')">
        <a-select :default-value="selectFlowdefault" style="width: 240px" @change="selectFlowChange">
          <a-select-option v-for="(item,index) in selectFlowItems" :value="item.current_step" :key="index">{{ $t(currentStepMap[item.current_step].text) }}</a-select-option>
        </a-select>
      </a-card>
    </a-modal>

    <!-- 二维码 -->
    <a-modal
      :title="$t('menu.project.view.action.qrcode')"
      :width="620"
      :visible="visibleQrcode"
      :destroyOnClose="true"
      :maskClosable="false"
      @ok="qrcodePrint"
      @cancel="qrcodeCancel"
      :okText="$t('menu.project.view.action.print')"
    >
      <qrcode ref="qrcode" />
    </a-modal>
    <!-- 报告 -->
    <report ref="reportModel" />
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getStepList, stepEdit, deleteStep, queryStepData, queryStepDataOnlyread, getCurrentStepMap, getFlowStepLog, changeFlow } from '@/api/step'
import StepForm from './start/StepForm'
import DispatchUserDialog from '../modules/DispatchUserModel'
import stepAllDetailModel from '../modules/StepAllDetailModel'
import qrcode from '../modules/QrcodeStep'
import report from '@/views/step/repair/Report/Report'

const columns = [
  {
    slotName: 'menu.project.view.table.column.date',
    dataIndex: 'date',
    sorter: true,
    width: '200px',
    scopedSlots: { customRender: 'date', title: 'menu.project.view.table.column.date' }
  },
  {
    dataIndex: 'work_order',
    slotName: 'menu.workOrder.repair.workOrderList.title.workordernumber',
    scopedSlots: { customRender: 'work_order', title: 'menu.workOrder.repair.workOrderList.title.workordernumber' }
  },
  {
    dataIndex: 'work_serial',
    slotName: 'menu.spare_parts.valve.serial',
    scopedSlots: { customRender: 'work_order', title: 'menu.spare_parts.valve.serial' }
  },
  {
    dataIndex: 'current_step',
    slotName: 'menu.workOrder.repair.workOrderList.title.currentFlow',
    scopedSlots: { customRender: 'current_step', title: 'menu.workOrder.repair.workOrderList.title.currentFlow' }
  },
  {
    dataIndex: 'user_names',
    slotName: 'menu.workOrder.repair.workOrderList.title.operator',
    scopedSlots: { customRender: 'user_names', title: 'menu.workOrder.repair.workOrderList.title.operator' }
  },
  {
    dataIndex: 'state',
    slotName: 'menu.workOrder.workOrderList.query.processStatus',
    sorter: true,
    scopedSlots: { customRender: 'state', title: 'menu.workOrder.workOrderList.query.processStatus' }
  },
  {
    dataIndex: 'action',
    slotName: 'menu.project.view.table.column.action',
    scopedSlots: { customRender: 'action', title: 'menu.project.view.table.column.action' }
  }
]

const statusMap = {
  1: {
    status: 'error',
    text: 'menu.workOrder.workOrderList.query.processStatus.item1'
  },
  2: {
    status: 'warning',
    text: 'menu.workOrder.workOrderList.query.processStatus.item2'
  },
  3: {
    status: 'success',
    text: 'menu.workOrder.workOrderList.query.processStatus.item3'
  }
}

const currentStepMap = getCurrentStepMap()

export default {
  components: {
    STable,
    Ellipsis,
    StepForm,
    DispatchUserDialog,
    stepAllDetailModel,
    qrcode,
    report
  },
  data () {
    this.columns = columns
    return {
      // 派员model
      visible: false,
      flowID: '',
      currentStep: '',
      mdl: null,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)

        return getStepList(requestParameters)
          .then(res => {
            console.log(res.result)
            return res.result
          })
      },
      statusMap: statusMap,
      currentStepMap: currentStepMap,
      columns: columns,
      stepDetailvisible: false,
      visibleFlow: false,
      selectFlowItems: [],
      selectFlowdefault: '',
      selectValue: '',
      visibleQrcode: false,
      visibleReport: false,
      reportRecord: {}
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    },
    currentStepFilter (val) {
      return currentStepMap[val].text
    },
    formatDate (val) {
      return moment(val).zone('+08:00').format('YYYY-MM-DD HH:mm:ss')
    },
    dispatchUserFilter (record) {
      return record.current_step === 'Assessment'
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
        type: 'radio'
      }
    }
  },
  methods: {
    // 派员cancal
    handleCancel () {
      this.visible = false
      this.$refs.table.refresh()
    },
    handleAdd () {
      // 清空上传文件信息
      this.$store.commit('SET_UPLOAD_MD5', [])
      this.$router.push({ path: '/step/newstep' })
    },
    resetQuery () {
        this.queryParam = {}
        this.$refs.table.refresh(true)
    },
    handleEdit (record) {
      stepEdit(record).then(res => {
        this.$store.commit('SET_UPLOAD_MD5', [])
        this.$store.commit('SET_STEP_EDIT_DATA', res.result)
        this.$router.push({ path: '/step/' + res.result.path })
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    deleteStep (record) {
      const letThis = this
      this.$confirm({
        title: '删除',
        content: '确定要删除工单？',
        okText: '确认',
        cancelText: '取消',
        onOk () {
          deleteStep(record).then(res => {
              // 刷新表格
              letThis.$refs.table.refresh()
              letThis.$message.info('删除成功')
          })
        }
      })
    },
    report (record) {
      this.$refs.reportModel.showModel(record)
    },
    printStep (record) {
      queryStepDataOnlyread({ id: record.id, current_step: 'print' }).then(res => {
        this.$store.commit('SET_STEP_EDIT_DATA', res.result)
        this.visibleQrcode = true
      })
    },
    qrcodeCancel () {
      this.visibleQrcode = false
    },
    qrcodePrint () {
      this.$refs.qrcode.shotImage()
    },
    adjustFlow (record) {
      getFlowStepLog({ FlowID: record.id }).then(e => {
        if (e.FlowStepLogs.length > 0) {
          this.flowID = record.id
          this.selectFlowItems = e.FlowStepLogs
          this.selectFlowdefault = this.$t(currentStepMap[record.current_step].text)
          this.selectValue = record.current_step
          this.visibleFlow = true
        }
      })
    },
    okFlow () {
      changeFlow({ id: this.flowID, current_step: this.selectValue }).then(e => {
        this.$message.info('操作成功')
        this.visibleFlow = false
        this.$refs.table.refresh()
      })
    },
    cancelFlow () {
      this.visibleFlow = false
    },
    selectFlowChange (val) {
      this.selectValue = val
    },
    handleDescrption (record) {
      this.$store.commit('SET_UPLOAD_MD5', [])
      this.$store.commit('SET_STEP_EDIT_DATA', {})
      if (record.current_step === '(end)') {
        queryStepData({ id: record.id, current_step: '(start)' }).then(res => {
          this.$store.commit('SET_STEP_EDIT_DATA', res.result)
          this.stepDetailvisible = true
          this.$refs.stepDetailModel.showSetpDetailData(record.id, '(start)')
        })
      } else {
        queryStepData(record).then(res => {
          this.$store.commit('SET_STEP_EDIT_DATA', res.result)
          this.$router.push({ path: '/step/' + res.result.path + '-detail' })
        })
      }
    },
    handleDispatchUser (record) {
      queryStepData(record).then(res => {
        this.flowID = res.result.flow_id
        this.currentStep = res.result.current_step
        this.visible = true
      })
    }
  }
}
</script>

<style>

</style>
