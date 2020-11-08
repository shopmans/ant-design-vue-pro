<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item :label="$t('menu.user.manager.query.jobNumber')">
                <a-input v-model="queryParam.job" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item :label="$t('menu.user.manager.query.userState')">
                <a-select v-model="queryParam.state" >
                  <a-select-option value="1">{{ $t('menu.user.manager.query.userState.item1') }}</a-select-option>
                  <a-select-option value="2">{{ $t('menu.user.manager.query.userState.item2') }}</a-select-option>
                </a-select>
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

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">{{ $t('menu.project.view.newproject') }}</a-button>
      </div>

      <s-table
        ref="table"
        rowKey="id"
        size="default"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
      >
        <span slot="state" slot-scope="text">
          <a-tag :color="text === '1' ? 'blue' : 'red'" slot="state" >{{ $t(state[text]) }}</a-tag>
        </span>
        <span slot="date" slot-scope="text">{{ text | moment }}</span>
        <span slot="position" slot-scope="text">{{ $t(position[text]) }}</span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">{{ $t('menu.user.manager.action.edit') }}</a>
          <a-divider type="vertical" />
          <a @click="handleDisableUser(record)">{{ record.state === '1' ? $t('menu.user.manager.query.userState.item2') : $t('menu.user.manager.action.enable') }}</a>
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
        :title="userModelTitle"
        style="top: 20px;"
        :width="800"
        v-model="visible"
        :maskClosable="false"
        :confirmLoading="confirmLoading"
        @ok="handleAddUserOk"
      >
        <a-form class="permission-form" :form="form">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item :label="$t('menu.user.manager.new.username')">
                <a-input v-decorator="['user_name', { rules: [{required: true, message: $t('menu.user.manager.new.username.require')}] }]" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item :label="$t('menu.user.manager.query.jobNumber')">
                <a-input v-decorator="['job', { rules: [{required: true, message: $t('menu.user.manager.query.jobNumber.require')}] }]" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item :label="$t('menu.user.manager.new.position')">
                <a-select v-decorator="['position', { rules: [{required: true, message: $t('menu.user.manager.new.position.require')}] }]" >
                  <a-select-option value="1">{{ $t('menu.project.view.table.column.sales') }}</a-select-option>
                  <a-select-option value="2">{{ $t('menu.user.manager.new.maintenanceEngineer') }}</a-select-option>
                  <a-select-option value="3">{{ $t('menu.user.manager.department') }}</a-select-option>
                  <a-select-option value="4">{{ $t('menu.user.manager.deputy') }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-divider></a-divider>
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item :label="$t('menu.user.manager.new.password')">
                <a-input-password v-decorator="['password', { rules: [{required: addOrModify, message: $t('menu.user.manager.new.password.require')}] }]" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item :label="$t('menu.user.manager.new.rePassword')">
                <a-input-password v-decorator="['password2', { rules: [{required: addOrModify, message: $t('menu.user.manager.new.rePassword.require')}] }]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item>
            <a-input hidden v-decorator="['id', {rules: []}]"></a-input>
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import md5 from 'md5'
import pick from 'lodash.pick'
import { STable } from '@/components'
import { getUserList, addUser, modifyUser, disableUser, deleteUser } from '@/api/user'
// import { PERMISSION_ENUM } from '@/utils/helper/permission'

const state = {
  1: 'menu.user.manager.query.userState.item1',
  2: 'menu.user.manager.query.userState.item2'
}

const position = {
  1: 'menu.project.view.table.column.sales',
  2: 'menu.user.manager.new.maintenanceEngineer'
}

const columns = [
  {
    sorter: true,
    dataIndex: 'date',
    slotName: 'menu.project.view.table.column.date',
    scopedSlots: { customRender: 'date', title: 'menu.project.view.table.column.date' }
  },
  {
    dataIndex: 'user_name',
    slotName: 'menu.user.manager.new.username',
    scopedSlots: { customRender: 'user_name', title: 'menu.user.manager.new.username' }
  },
  {
    dataIndex: 'job',
    slotName: 'menu.user.manager.query.jobNumber',
    scopedSlots: { customRender: 'job', title: 'menu.user.manager.query.jobNumber' }
  },
  {
    dataIndex: 'position',
    slotName: 'menu.user.manager.new.position',
    scopedSlots: { customRender: 'position', title: 'menu.user.manager.new.position' }
  },
  {
    dataIndex: 'state',
    slotName: 'menu.user.manager.query.userState',
    scopedSlots: { customRender: 'state', title: 'menu.user.manager.query.userState' }
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
    STable
  },
  data () {
    return {
      description: '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',
      confirmLoading: false,
      visible: false,
      form: this.$form.createForm(this),
      permissions: [],
      addOrModify: true,

      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)

        return getUserList(requestParameters)
        .then(res => {
            return res.result
        })
      },
      state: state,
      position: position,
      columns: columns,
      userModelTitle: ''
    }
  },
  filters: {
    statusFilter (key) {
      return state[key]
    },
    positionFilter (key) {
        return position[key]
    }
  },
  methods: {
    handleAdd () {
      this.form.resetFields()
      this.addOrModify = true
      this.visible = true
      this.userModelTitle = this.$t('menu.user.manager.new.createUser')
    },
    resetQuery () {
        this.queryParam = {}
        this.$refs.table.refresh(true)
    },
    handleEdit (record) {
      this.addOrModify = false
      this.visible = true
      this.userModelTitle = this.$t('menu.user.manager.new.editUser')

      const userFields = ['id', 'user_name', 'job', 'position']
      userFields.forEach(v => this.form.getFieldDecorator(v))
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, userFields))
      })
    },
    handleDelete (record) {
      deleteUser(record).then(res => {
        this.$refs.table.refresh()
        this.$message.info(this.$t('menu.user.manager.new.successful'))
      })
    },
    handleDisableUser (record) {
        disableUser(record).then(res => {
            this.$refs.table.refresh()
            this.$message.info(this.$t('menu.user.manager.new.successful'))
        })
    },
    handleAddUserOk (e) {
      this.confirmLoading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
            if (this.form.fieldsStore.getFieldValue('password') !== this.form.fieldsStore.getFieldValue('password2')) {
                this.$message.info(this.$t('menu.user.manager.new.passwordInconsistent'))
                this.confirmLoading = false
                return
            }

            if (values.id && values.id.length > 0) {
                if (values.password) {
                    values.password = md5(values.password)
                }
                modifyUser(values).then(res => {
                    this.visible = false
                    this.confirmLoading = false
                    // 重置表单数据
                    this.form.resetFields()
                    // 刷新表格
                    this.$refs.table.refresh()
                    this.$message.info(this.$t('menu.user.manager.new.modifySuccessful'))
                })
            } else {
                values.password = md5(values.password)
                addUser(values).then(res => {
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
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
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
