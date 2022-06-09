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
          <a-row :gutter="8">
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('menu.maintenance.content')">
                <a-input v-model="queryParam.content" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="startQuery">{{ $t('menu.project.view.query.query') }}</a-button>
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
        rowKey="id"
        size="default"
        :columns="columns"
        :data="loadData"
      >
        <span slot="state" slot-scope="text">
          <a-tag :color="text === '1' ? 'blue' : 'red'" slot="state" >{{ $t(state[text]) }}</a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">{{ $t('menu.user.manager.action.edit') }}</a>
          <a-divider type="vertical" />
          <a-popconfirm :title="$t('menu.user.manager.action.delete.confirm')" @confirm="handleDelete(record)">
            <a>{{ $t('menu.project.view.action.delete') }}</a>
          </a-popconfirm>
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

      <a-modal
        :title="faultModelTitle"
        style="top: 20px;"
        :width="800"
        v-model="visible"
        :maskClosable="false"
        :confirmLoading="confirmLoading"
        @ok="handleFaultOk"
      >
        <a-form class="permission-form" :form="form">
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item :label="$t('menu.maintenance.content')">
                <a-input v-decorator="['content', { rules: [{required: true, message: $t('menu.maintenance.content')}] }]" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item :label="$t('menu.spare_parts.valve.memo')">
                <a-input v-decorator="['memo', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item>
            <a-input hidden v-decorator="['id', {rules: []}]"></a-input>
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
  </div>
</template>

<script>
import pick from 'lodash.pick'
import { STable, Ellipsis } from '@/components'
import { getMaintenanceContentList, addMaintenanceContent, modifyMaintenanceContent, delMaintenanceContent } from '@/api/maintenanceContent'

const state = {
  1: 'menu.user.manager.query.userState.item1',
  2: 'menu.user.manager.query.userState.item2'
}

const position = {
  1: 'menu.project.view.table.column.sales',
  2: 'menu.user.manager.new.maintenanceEngineer',
  3: 'menu.project.view.table.column.part.manager',
  4: 'menu.project.view.table.column.deputy.general.manager'
}

const columns = [
  {
    sorter: true,
    dataIndex: 'content',
    slotName: 'menu.maintenance.content',
    scopedSlots: { customRender: 'content', title: 'menu.maintenance.content' }
  },
  {
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
    Ellipsis
  },
  data () {
    return {
      description: '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',
      confirmLoading: false,
      visible: false,
      form: this.$form.createForm(this),
      permissions: [],
      addOrModify: true,
      state: state,
      position: position,
      columns: columns,
      faultModelTitle: '',

      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      fartherWidth: '',
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)

        return getMaintenanceContentList(requestParameters)
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
      this.form.resetFields()
      this.addOrModify = true
      this.visible = true
      this.faultModelTitle = this.$t('menu.fault.phenomenon.add')
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
      this.addOrModify = false
      this.visible = true
      this.faultModelTitle = this.$t('menu.fault.phenomenon.modify')

      const faultFields = ['id', 'date', 'content', 'memo']
      faultFields.forEach(v => this.form.getFieldDecorator(v))
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, faultFields))
      })
    },
    handleDelete (record) {
      delMaintenanceContent(record).then(res => {
        // 刷新表格
        this.$refs.table.refresh()
        this.$message.info(this.$t('menu.user.manager.new.successful'))
        this.visible = false
        this.confirmLoading = false
        // 重置表单数据
        this.form.resetFields()
      })
    },
    handleDisableUser (record) {
    },
    handleFaultOk (e) {
      this.confirmLoading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
            if (values.id && values.id.length > 0) {
              modifyMaintenanceContent(values).then(res => {
                  // 刷新表格
                  this.$refs.table.refresh()
                  this.$message.info(this.$t('menu.user.manager.new.modifySuccessful'))
                  this.visible = false
                  this.confirmLoading = false
                  // 重置表单数据
                  this.form.resetFields()
              })
            } else {
                addMaintenanceContent(values).then(res => {
                    // 刷新表格
                    this.$refs.table.refresh()
                    this.$message.info(this.$t('menu.user.manager.new.newSuccessful'))
                    this.visible = false
                    this.confirmLoading = false
                    // 重置表单数据
                    this.form.resetFields()
                })

                this.confirmLoading = false
            }
        } else {
          this.confirmLoading = false
        }
      })
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
