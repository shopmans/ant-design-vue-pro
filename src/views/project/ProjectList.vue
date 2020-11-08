<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item :label="$t('menu.project.view.query.projectSerial')">
                <a-input v-model="queryParam.serial" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item :label="$t('menu.project.view.query.contractSerial')">
                <a-input v-model="queryParam.contract_serial" placeholder=""/>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item :label="$t('menu.project.view.query.projectState')">
                  <a-select v-model="queryParam.state" default-value="0">
                    <a-select-option value="1">{{ $t("menu.project.view.query.projectState.item1") }}</a-select-option>
                    <a-select-option value="2">{{ $t("menu.project.view.query.projectState.item2") }}</a-select-option>
                    <a-select-option value="3">{{ $t("menu.project.view.query.projectState.item3") }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item :label="$t('menu.project.view.query.projectDate')">
                  <a-date-picker v-model="queryParam.date" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item :label="$t('menu.project.view.query.sales')">
                  <a-input v-model="queryParam.sales_name" placeholder=""/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item :label="$t('menu.project.view.query.customerName')">
                  <a-input v-model="queryParam.customer_name" placeholder=""/>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh(true)">{{ this.$t('menu.project.view.query.query') }}</a-button>
                <a-button style="margin-left: 8px" @click="resetQuery">{{ this.$t('menu.project.view.query.reset') }}</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? this.$t('menu.project.view.query.collapse') : this.$t('menu.project.view.query.unfold') }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">{{ this.$t('menu.project.view.newproject') }}</a-button>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
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
          <a @click="handleDetail(record)">{{ $t('menu.project.view.action.detail') }}</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">{{ $t('menu.user.manager.action.edit') }}</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">{{ $t('menu.project.view.action.delete') }}</a>
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

      <new-project
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getProjectList, deleteProject, formatTotal, editProject, newProject } from '@/api/project'
import NewProject from './modules/NewProject'

const columns = [
  {
    slotName: 'menu.project.view.table.column.date',
    dataIndex: 'date',
    sorter: true,
    scopedSlots: { customRender: 'date', title: 'menu.project.view.table.column.date' }
  },
  {
    slotName: 'menu.project.view.table.column.customerName',
    dataIndex: 'customer_name',
    scopedSlots: { customRender: 'customer_name', title: 'menu.project.view.table.column.customerName' }
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
  {
    slotName: 'menu.project.view.table.column.total',
    dataIndex: 'total',
    sorter: true,
    scopedSlots: { customRender: 'total', title: 'menu.project.view.table.column.total' }
  },
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
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    NewProject
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
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)

        return getProjectList(requestParameters)
          .then(res => {
            return res.result
          })
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
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    },
    formatContractTotal (val) {
      return formatTotal(val)
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
    handleAdd () {
      this.mdl = null
      this.visible = true
      this.$refs.createModal.createProjectSerial()
      // this.$refs.createModal.createContractSerial()
    },
    resetQuery () {
        this.queryParam = {}
        this.$refs.table.refresh(true)
    },
    kkkk (val) {
      return statusMap[val].text
    },
    handleDelete (record) {
      const letThis = this
      this.$confirm({
        title: this.$t('menu.project.view.action.delete'),
        content: this.$t('menu.project.delete.note.1') + record.serial + this.$t('menu.project.delete.note.2'),
        okText: this.$t('app.button.confirm'),
        cancelText: this.$t('app.button.cancel'),
        onOk () {
          deleteProject(record).then(res => {
              // 刷新表格
              letThis.$refs.table.refresh()
              letThis.$message.info(this.$t('menu.project.delete.successful'))
          })
        }
      })
    },
    handleEdit (record) {
      getProjectList({ id: record.id }).then(res => {
        if (res.result.data && res.result.data.length > 0) {
          this.visible = true
          console.log(res)
          this.$refs.createModal.editProject(res.result.data[0])
        }
      })
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          if (values.id) {
            // 修改 e.g.
            editProject(values).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info(this.$t('menu.user.manager.new.modifySuccessful'))
            })
          } else {
            // 新增
            values.create_user_id = this.$store.state.user.info.id
            newProject(values).then(res => {
              // 刷新表格
              this.$refs.table.refresh()
              this.$message.info(this.$t('menu.user.manager.new.newSuccessful'))

              this.visible = false
              // 重置表单数据
              form.resetFields()
            })
            this.confirmLoading = false
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
    }
  }
}
</script>
