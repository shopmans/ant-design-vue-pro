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
              <a-form-item :label="$t('menu.project.view.query.customerName')">
                <a-input v-model="queryParam.customer_name" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('menu.spare_parts.valve.serial')">
                <a-input v-model="queryParam.serial" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('menu.spare_parts.valve.tag')">
                <a-input v-model="queryParam.tag" placeholder=""/>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="6" :sm="24">
                <a-form-item :label="$t('menu.workOrder.workOrderList.query.date')">
                  <a-date-picker v-model="queryParam.date" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-item :label="$t('menu.workOrder.repair.workOrderList.title.workordernumber')">
                  <a-input v-model="queryParam.work_order" placeholder=""/>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 6 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="startQuery">{{ this.$t('menu.project.view.query.query') }}</a-button>
                <a-button style="margin-left: 8px" @click="resetQuery">{{ this.$t('menu.project.view.query.reset') }}</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? this.$t('menu.project.view.query.collapse') : this.$t('menu.project.view.action.more') }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :pagination="paginationOpt"
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
            <a @click="report(record)">{{ $t('menu.project.view.action.report') }}</a>
          </template>
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

    </a-card>

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
        <a-select :default-value="selectFlowdefault" style="width: 240px" @change="selectFlowChange" :allowClear="true">
          <a-select-option v-for="(item,index) in selectFlowItems" :value="item.current_step" :key="index">{{ $t(currentStepMap[item.current_step].text) }}</a-select-option>
        </a-select>
      </a-card>
    </a-modal>

    <!-- 二维码 -->
    <a-modal
      :title="$t('menu.project.view.action.qrcode')"
      :width="680"
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
  </div>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getStepList, stepEdit, deleteStep, queryStepData, queryStepDataOnlyread, getCurrentStepMap, getFlowStepLog, changeFlow } from '@/api/step'
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
    dataIndex: 'customer_name',
    slotName: 'menu.project.view.query.customerName',
    scopedSlots: { customRender: 'customer_name', title: 'menu.project.view.query.customerName' }
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
    dataIndex: 'tag',
    slotName: 'menu.spare_parts.valve.tag',
    scopedSlots: { customRender: 'tag', title: 'menu.spare_parts.valve.tag' }
  },
  {
    dataIndex: 'current_step',
    slotName: 'menu.workOrder.repair.workOrderList.title.currentFlow',
    scopedSlots: { customRender: 'current_step', title: 'menu.workOrder.repair.workOrderList.title.currentFlow' }
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
      // 高级搜索 展开/关闭
      advanced: false,
      fartherWidth: '',
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        return getStepList(requestParameters)
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
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
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
    startQuery () {
      this.$store.commit('SET_CUR_PAGE_NO', 0)
      this.$store.commit('SET_CUR_PAGE_SIZE', 10)
      this.$refs.table.refresh(true)
    },
    resetQuery () {
      this.$store.commit('SET_CUR_PAGE_NO', 0)
      this.$store.commit('SET_CUR_PAGE_SIZE', 10)
      this.queryParam = {}
      this.$refs.table.refresh(true)
    },
    handleEdit (record) {
      stepEdit(record).then(res => {
        console.log(res)
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
  },
  watch: {
    fartherWidth: {
      handler (val) {
        this.fartherWidth = val
      }
    }
  },
  mounted () {
    this.fartherWidth = this.$refs.farther.clientWidth + 50 + 'px'
    window.onresize = () => {
      this.fartherWidth = this.$refs.farther.clientWidth + 50 + 'px'
    }
  }
}
</script>

<style>

</style>
