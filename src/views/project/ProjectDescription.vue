<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-descriptions :title="$t('menu.project.detail.info')">
        <a-descriptions-item :label="$t('menu.project.view.query.customerName')">{{ record.customer_name }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.customer.new.finallyUser')">{{ record.finally_user }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.detail.contractNumber')">{{ record.contract_serial }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.view.query.projectDate')">{{ formatDateYMDNull(record.date) }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.detail.serial')">{{ record.serial }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.view.query.projectState')">{{ $t(projectState(record.state)) }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.detail.estStartDate')">{{ formatDateYMDNull(record.ex_open_date) }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.detail.estCloseDate')">{{ formatDateYMDNull(record.ex_close_date) }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.detail.estWorkTime')">{{ record.ex_working_hours }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.detail.estMaterialCost')">{{ record.ex_material_fee }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.detail.repairShop')">{{ $t(projectRepairPlan(record.repair_plan)) }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.detail.repairNumber')">{{ record.number }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.detail.projectOwner')">{{ record.create_user_name }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.view.table.column.sales')">{{ record.sales_name }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <br>
    <a-card>
      <div class="ant-descriptions-title">
        {{ $t('app.flow.repair.query') }}
      </div>
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('menu.workOrder.workOrderList.flow')">
                <a-select v-model="queryParam.current_step">
                  <a-select-option value="">None</a-select-option>
                  <a-select-option value="(start)">{{ $t('app.flow.repair.start') }}</a-select-option>
                  <a-select-option value="Receipt">{{ $t('app.flow.repair.receipt') }}</a-select-option>
                  <a-select-option value="IntoFactoryCheck">{{ $t('app.flow.repair.intoFactoryCheck') }}</a-select-option>
                  <a-select-option value="PreRepairDiag">{{ $t('app.flow.repair.preRepairDiag') }}</a-select-option>
                  <a-select-option value="PreRepairTest">{{ $t('app.flow.repair.preRepairTest') }}</a-select-option>
                  <a-select-option value="TearDown">{{ $t('app.flow.repair.tearDown') }}</a-select-option>
                  <a-select-option value="Assessment">{{ $t('app.flow.repair.assessment') }}</a-select-option>
                  <a-select-option value="Repair">{{ $t('app.flow.repair.repair') }}</a-select-option>
                  <a-select-option value="Assemble">{{ $t('app.flow.repair.assemble') }}</a-select-option>
                  <a-select-option value="InstallActuator">{{ $t('app.flow.repair.installActuator') }}</a-select-option>
                  <a-select-option value="LeakPressureTest">{{ $t('app.flow.repair.leakPressureTest') }}</a-select-option>
                  <a-select-option value="InstallSlave">{{ $t('app.flow.repair.installSlave') }}</a-select-option>
                  <a-select-option value="Adjust">{{ $t('app.flow.repair.adjust') }}</a-select-option>
                  <a-select-option value="AfterRepairDiag">{{ $t('app.flow.repair.afterRepairDiag') }}</a-select-option>
                  <a-select-option value="RepairConfirm">{{ $t('app.flow.repair.RepairConfirm') }}</a-select-option>
                  <a-select-option value="FinalCheck">{{ $t('app.flow.repair.finalCheck') }}</a-select-option>
                  <a-select-option value="PackingDelivery">{{ $t('app.flow.repair.packingDelivery') }}</a-select-option>
                  <a-select-option value="(end)">{{ $t('menu.workOrder.workOrderList.query.processStatus.item3') }}</a-select-option>
                  <!-- <a-select-option value="LocatorIntoFactoryCheck">{{ $t('app.flow.repair.intoFactoryCheck') }}</a-select-option>
                  <a-select-option value="LocatorPreRepairTest">{{ $t('app.flow.repair.preRepairTest') }}</a-select-option>
                  <a-select-option value="LocatorAssessment">{{ $t('app.flow.repair.assessment') }}</a-select-option>
                  <a-select-option value="LocatorRepair">{{ $t('app.flow.repair.repair') }}</a-select-option>
                  <a-select-option value="LocatorAdjust">{{ $t('app.flow.repair.adjust') }}</a-select-option> -->
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('menu.workOrder.repair.workOrderList.title.workordernumber')">
                <a-input v-model="queryParam.order" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('menu.spare_parts.valve.tag')">
                <a-input v-model="queryParam.tag" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="!false && 6 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :style="false && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh(true)">{{ this.$t('menu.project.view.query.query') }}</a-button>
                <a-button style="margin-left: 8px" @click="resetQuery">{{ this.$t('menu.project.view.query.reset') }}</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="flow_id"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
      >
        <span slot="date" slot-scope="text">
          {{ text | formatDate }}
        </span>
        <span slot="receipt_date" slot-scope="text">
          {{ text | formatDate }}
        </span>
        <span slot="req_workdone_date" slot-scope="text">
          {{ text | formatDate }}
        </span>
        <span slot="current_step" slot-scope="text">
          {{ $t(currentStepMap[text].text) }}
        </span>
        <span slot="action" slot-scope="text, record1">
          <a @click="handleDetail(record1)">{{ $t('menu.project.view.action.description') }}</a>
          <!-- <a-divider type="vertical" />
          <a @click="handleReport(record1)">{{ $t('menu.project.view.action.report') }}</a> -->
          <a-divider type="vertical" />
          <template v-if="record1.current_step !== '(end)'">
            <a @click="handleStepEdit(record1)">{{ $t('menu.workOrder.repair.workOrderList.action.execution') }}</a>
          </template>
          <template v-else>
            <span>{{ $t('menu.workOrder.repair.workOrderList.action.execution') }}</span>
          </template>
          <!-- <a-divider type="vertical" />
          <a @click="fillerInfo(record1)">填料</a> -->
          <a-divider type="vertical" />
          <a @click="deleteFlowStep(record1)">{{ $t('menu.project.view.action.delete') }}</a>
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>
      <br>
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAddOrder">{{ $t('app.flow.repair.start') }}</a-button>
      </div>
    </a-card>
    <br>
    <div style="float: right">
      <a-button type="primary" @click="cancelDetail">{{ $t('app.button.cancel') }}</a-button>
    </div>

    <!-- 报告 -->
    <report ref="reportModel" />

    <!-- 填料 -->
    <baseFiller ref="baseFiller" />
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { projectState, projectRepairPlan, queryProjectDescription } from '@/api/project'
import baseFiller from '@/views/project/modules/BaseFiller'
import { getCurrentStepMap, formatDateYMDNull, queryStepDataOnlyread, getWorkSerialSerial, deleteStep, stepEdit } from '@/api/step'
import report from '@/views/step/repair/Report/Report'

const columns = [
  { // 日期
    slotName: 'menu.project.view.table.column.date',
    dataIndex: 'date',
    scopedSlots: { customRender: 'date', title: 'menu.project.view.table.column.date' }
  },
  { // 工单
    slotName: 'menu.workOrder.repair.workOrderList.title.workordernumber',
    dataIndex: 'order',
    scopedSlots: { customRender: 'customer_name', title: 'menu.workOrder.repair.workOrderList.title.workordernumber' }
  },
  { // 位号
    slotName: 'menu.spare_parts.valve.tag',
    dataIndex: 'tag',
    scopedSlots: { customRender: 'tag', title: 'menu.spare_parts.valve.tag' }
  },
  { // 收货日期
    slotName: 'app.flow.repair.receipt.date',
    dataIndex: 'receipt_date',
    scopedSlots: { customRender: 'receipt_date', title: 'app.flow.repair.receipt.date' }
  },
  { // 要求完工日期
    slotName: 'menu.project.detail.reqCloseDate',
    dataIndex: 'req_workdone_date',
    scopedSlots: { customRender: 'req_workdone_date', title: 'menu.project.detail.reqCloseDate' }
  },
  { // 当前流程
    slotName: 'menu.workOrder.repair.workOrderList.title.currentFlow',
    dataIndex: 'current_step',
    scopedSlots: { customRender: 'current_step', title: 'menu.workOrder.repair.workOrderList.title.currentFlow' }
  },
  { // 总工时
    slotName: 'menu.project.detail.total.WorkTime',
    dataIndex: 'total_work_time',
    scopedSlots: { customRender: 'total_work_time', title: 'menu.project.detail.total.WorkTime' }
  },
  { // 操作
    slotName: 'menu.project.view.table.column.action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action', title: 'menu.project.view.table.column.action' }
  }
]

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'warning',
    text: 'menu.project.view.table.column.state.item1'
  },
  2: {
    status: 'success',
    text: 'menu.project.view.table.column.state.item2'
  },
  3: {
    status: 'error',
    text: 'menu.project.view.table.column.state.item3'
  }
}

export default {
  name: 'ProjectDescription',
  components: {
    STable,
    Ellipsis,
    report,
    baseFiller
  },
  methods: {
    formatDateYMDNull,
    projectState,
    projectRepairPlan,
    cancelDetail () {
      this.pageDataStack.popPageData(this.$store)
      // this.$router.push({ path: '/project/project-list' })
      this.$router.back(-1)
    },
    resetQuery () {
      this.queryParam = {}
      this.$refs.table.refresh(true)
    },
    handleDetail (record) {
      queryStepDataOnlyread({ id: record.flow_id, current_step: '(start)' }).then(res => {
        // 当前分页参数入栈，并设置分页参数为pageNum: 0  pageSize: 10
        this.pageDataStack.pushPageData(this.$store, true)
        this.$store.commit('SET_STEP_EDIT_DATA', res.result)
        this.$router.push({ name: 'allDetailStep', params: { flowID: record.flow_id, cancelButton: true } })
      })
    },
    handleReport (record) {
      record.id = record.flow_id
      console.log(record)
      this.$refs.reportModel.showModel(record)
    },
    handleAddOrder () {
      // 完工工程不能再新建工单
      if (this.record.state === '2') {
        this.$message.info('已完工工程不能新建工单')
        return
      }
      // 获取工程编号为标识的全局编号
      getWorkSerialSerial(this.record.serial.trim()).then(res => {
        let tmpOrder = res + ''
        if (tmpOrder.length === 2) {
          tmpOrder = '0' + tmpOrder
        } else if (tmpOrder.length === 1) {
          tmpOrder = '00' + tmpOrder
        }

        const newStepData = {
          projectId: this.record.id,
          projectSerial: this.record.serial.trim(),
          customerName: this.record.customer_name,
          orderSerial: this.record.serial.trim() + '-' + tmpOrder
        }

        console.log(newStepData)
        // 清空上传文件信息
        this.$store.commit('SET_UPLOAD_MD5', [])
        this.$router.push({ name: 'newStep', params: newStepData })
      })
    },
    deleteFlowStep (record) {
      console.log(record)
      const letThis = this
      this.$confirm({
        title: '删除',
        content: '确定要删除工单？',
        okText: '确认',
        cancelText: '取消',
        onOk () {
          deleteStep({ id: record.flow_id }).then(res => {
            // 刷新表格
            letThis.$refs.table.refresh()
            letThis.$message.info('删除成功')
          })
        }
      })
    },
    handleStepEdit (record) {
      stepEdit({ id: record.flow_id, current_step: record.current_step }).then(res => {
        console.log(res)
        this.$store.commit('SET_UPLOAD_MD5', [])
        this.$store.commit('SET_STEP_EDIT_DATA', res.result)
        this.$router.push({ path: '/step/' + res.result.path })
      })
    },
    fillerInfo (record) {
      const that = this
      queryStepDataOnlyread({ id: record.flow_id, current_step: '(start)' }).then(res => {
        res.result.step_data.forEach(e => {
          if (e.DataNum === 1) {
            const tmpData = JSON.parse(e.JSON)
            that.$refs.baseFiller.show(tmpData.base_filler_data)
          }
        })
      })
    }
  },
  filters: {
    formatDate (val) {
      if (val === undefined || val.length <= 0) {
        return ''
      }

      const dataResult = moment(val).zone('+08:00').format('YYYY-MM-DD')

      if (dataResult.indexOf('0001-01') >= 0) {
          return ''
      }

      return dataResult
    },
    formatExDate (val) {
      if (val === undefined || val.length <= 0) {
        return ''
      }
      return moment(val).zone('+08:00').format('YYYY-MM-DD')
    }
  },
  data () {
    return {
        record: {},
        columns: columns,
        statusMap: statusMap,
        currentStepMap: getCurrentStepMap(),
        // 查询参数
        queryParam: {},
        loadData: parameter => {
            const requestParameters = Object.assign({}, parameter, this.queryParam)
            this.record = this.$store.state.user.detailData
            requestParameters.projectId = this.record.id

            if (this.record === 'undefined') { return }
            return queryProjectDescription(requestParameters).then(res => {
                return res.result
            })
        }
    }
  }
}
</script>

<style>

</style>
