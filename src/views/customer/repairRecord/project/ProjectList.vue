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
              <a-form-item :label="$t('menu.customer.new.finallyUser')">
                <a-input v-model="queryParam.finally_user" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('menu.project.view.query.contractSerial')">
                <a-input v-model="queryParam.contract_serial" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('menu.project.view.query.projectSerial')">
                <a-input v-model="queryParam.serial" placeholder=""/>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="6" :sm="24">
                <a-form-item :label="$t('menu.project.view.query.projectDate')">
                  <a-date-picker v-model="queryParam.date" style="width: 100%" />
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
        <span slot="state" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="$t(statusMap[text].text)"></a-badge>
        </span>
        <span slot="date" slot-scope="text">
          {{ text | format }}
        </span>
        <span slot="total" slot-scope="text">
          {{ text | formatContractTotal }}
        </span>

        <span slot="action" slot-scope="text, record">
          <!-- 详细 -->
          <a @click="handleDetail(record)">{{ $t('menu.project.view.action.detail') }}</a>
          <a-divider type="vertical" />
          <!-- 查看 -->
          <a-divider type="vertical" />
          <a @click="handleDescription(record)">{{ $t('menu.project.view.action.description') }}</a>
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getProjectList } from '@/api/project'
import { formatDateYMDNull } from '@/api/step'

const columns = [
  {
    slotName: 'menu.project.view.table.column.date',
    dataIndex: 'date',
    sorter: true,
    scopedSlots: { customRender: 'date', title: 'menu.project.view.table.column.date' }
  },
  {
    slotName: 'menu.customer.new.finallyUser',
    dataIndex: 'finally_user',
    scopedSlots: { customRender: 'finally_user', title: 'menu.customer.new.finallyUser' }
  },
  {
    slotName: 'menu.project.view.table.column.sales',
    dataIndex: 'sales_name',
    scopedSlots: { customRender: 'sales_name', title: 'menu.project.view.table.column.sales' }
  },
  {
    slotName: 'menu.project.view.table.column.contractNumber',
    dataIndex: 'contract_serial',
    scopedSlots: { customRender: 'contract_serial', title: 'menu.project.view.table.column.contractNumber' }
  },
  {
    slotName: 'menu.project.view.table.column.projectNumber',
    dataIndex: 'serial',
    scopedSlots: { customRender: 'serial', title: 'menu.project.view.table.column.projectNumber' }
  },
  // {
  //   slotName: 'menu.project.view.table.column.total',
  //   dataIndex: 'total',
  //   sorter: true,
  //   scopedSlots: { customRender: 'total', title: 'menu.project.view.table.column.total' }
  // },
  {
    slotName: 'menu.project.view.table.column.state',
    dataIndex: 'state',
    scopedSlots: { customRender: 'state', title: 'menu.project.view.table.column.state' }
  },
  {
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
  components: {
    STable,
    Ellipsis
  },
  data () {
    return {
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      fartherWidth: '',
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        return getProjectList(requestParameters)
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
      columns: columns,
      statusMap: statusMap
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    },
    format (val) {
      // return moment(val).format('YYYY-MM-DD HH:mm:ss')
      return formatDateYMDNull(val)
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
    handleAdd () {
      this.mdl = null
      this.visible = true
      this.$refs.createModal.createProjectSerial()
      // this.$refs.createModal.createContractSerial()
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
    kkkk (val) {
      return statusMap[val].text
    },
    handleDelete (record) {
    },
    handleEdit (record) {
      getProjectList({ id: record.id }).then(res => {
        if (res.result.data && res.result.data.length > 0) {
          this.visible = true
          this.$refs.createModal.editProject(res.result.data[0])
        }
      })
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        console.log(values)
        if (!errors) {
          if (values.id) {
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    handleDetail (record) {
      getProjectList({ id: record.id })
      .then(res => {
        this.$store.commit('SET_DETAIL_DATA', res.result)
        this.$router.push({ path: '/project/project-detail' })
      })
    },
    handleDescription (record) {
      // 当前分页参数入栈，并设置分页为pageNum: 0  pageSize: 10
      this.pageDataStack.pushPageData(this.$store, true)

      this.$store.commit('SET_DETAIL_DATA', record)
      this.$router.push({ name: 'ProjectDescription' })
    }
  }
}
</script>
