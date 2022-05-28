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
            <a-col :md="8" :sm="24">
              <a-form-item :label="$t('menu.permission.rolegroup')">
                <a-input v-model="queryParam.role_name" />
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

      <!-- 角色列表 -->
      <s-table
        ref="table"
        rowKey="id"
        size="default"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
        :destroyOnClose="true"
        :confirmLoading="confirmLoading"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEditRole(record)">{{ $t('menu.user.manager.action.edit') }}</a>
          <a-divider type="vertical" />
          <a @click="handleEditMember(record)">{{ $t('menu.permission.member') }}</a>
          <a-divider type="vertical" />
          <a @click="handleQueryPermission(record)">{{ $t('menu.permission') }}</a>
          <a-divider type="vertical" />
          <a-popconfirm :title="$t('menu.permission.role.manager.delete.confirm')" @confirm="handleDeleteRole(record)">
            <a>{{ $t('menu.project.view.action.delete') }}</a>
          </a-popconfirm>
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>
    </a-card>

    <!-- 新增，修改用户组 -->
    <a-modal
      :title="$t('menu.project.view.table.column.action')"
      style="top: 20px;"
      :width="800"
      v-model="visible"
      :maskClosable="false"
      :confirmLoading="confirmLoading"
      @ok="handleAddRoleOk"
    >
      <a-form class="permission-form" :form="form">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item :label="$t('menu.permission.rolegroup')">
              <a-input v-decorator="['role_name', { rules: [{required: true, message: $t('menu.permission.role.manager.require')}] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item>
          <a-input hidden v-decorator="['id', {rules: []}]"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 成员 -->
    <a-modal
      :title="$t('menu.permission.member')"
      :width="800"
      v-model="memberVisible"
      @ok="memberCancel"
      @cancel="memberCancel"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <memberModel :roleID="roleID" />
    </a-modal>

    <!-- 角色权限 -->
    <a-modal
      :title="$t('permissionid.permission.set') + ' - ' + rolePermission.role_name"
      :width="800"
      v-model="rolePermissionVisible"
      @ok="rolePermissionOK"
      @cancel="rolePermissionCancel"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <template>
        <template v-for="(item,index) in rolePermission.role_permission">
          <a-row :gutter="24" :key="'row' + index">
            <a-col :span="8">
              {{ $t('permissionid.' + item.permission_id) }}
            </a-col>
            <a-col :span="16">
              <template v-for="(action,k) in item.actions">
                <a-checkbox v-model="action.has_action" :default-checked="action.has_action" :key="'check' + item.permission_id + k">{{ $t(action.title) }}</a-checkbox>
              </template>
            </a-col>
          </a-row>
          <a-divider :key="'divider' + index"></a-divider>
        </template>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { getRoleList, modifyRole, addRole, deleteRole, queryPermission, savePermission } from '@/api/permission'
import { STable } from '@/components'
import pick from 'lodash.pick'
import memberModel from './RoleMember'

const columns = [
  {
    dataIndex: 'role_name',
    slotName: 'menu.permission.rolegroup',
    scopedSlots: { customRender: 'role_name', title: 'menu.permission.rolegroup' }
  },
  {
    dataIndex: 'member',
    slotName: 'menu.permission.member',
    scopedSlots: { customRender: 'member', title: 'menu.permission.member' }
  },
  {
    dataIndex: 'action',
    slotName: 'menu.project.view.table.column.action',
    scopedSlots: { customRender: 'action', title: 'menu.project.view.table.column.action' }
  }
]

export default {
  name: 'RoleList',
  components: {
    STable,
    memberModel
  },
  methods: {
    resetQuery () {
        this.queryParam = {}
        this.$refs.table.refresh(true)
    },
    handleAdd () {
      this.form.resetFields()
      this.visible = true
    },
    handleEditRole (record) {
      this.visible = true

      const roleFields = ['id', 'role_name']
      roleFields.forEach(v => this.form.getFieldDecorator(v))
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, roleFields))
      })
    },
    handleDeleteRole (record) {
      deleteRole(record).then(res => {
        this.$refs.table.refresh()
        this.$message.info(this.$t('menu.user.manager.new.successful'))
      })
    },
    handleEditMember (record) {
      this.roleID = record.id
      this.memberVisible = true
    },
    handleQueryPermission (record) {
      queryPermission(record).then(res => {
        this.rolePermission = res
        this.rolePermissionVisible = true
        console.log(this.rolePermission)
      })
    },
    rolePermissionCancel () {
      this.rolePermissionVisible = false
      this.rolePermission = {}
    },
    rolePermissionOK () {
      savePermission(this.rolePermission).then(res => {
        this.rolePermissionVisible = false
        this.$message.info(this.$t('menu.user.manager.new.successful'))
      })
    },
    memberCancel () {
      this.roleID = ''
      this.memberVisible = false
      this.$refs.table.refresh()
    },
    handleAddRoleOk (e) {
      this.confirmLoading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
            if (values.id && values.id.length > 0) {
                modifyRole(values).then(res => {
                    this.visible = false
                    // 重置表单数据
                    this.form.resetFields()
                    // 刷新表格
                    this.$refs.table.refresh()
                    this.$message.info(this.$t('menu.user.manager.new.modifySuccessful'))
                })
            } else {
                addRole(values).then(res => {
                    // 刷新表格
                    this.$refs.table.refresh()
                    this.$message.info(this.$t('menu.user.manager.new.newSuccessful'))
                    this.visible = false
                    // 重置表单数据
                    this.form.resetFields()
                })

                this.confirmLoading = false
            }
            this.confirmLoading = false
        } else {
          this.confirmLoading = false
        }
      })
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
  data () {
    return {
      form: this.$form.createForm(this),
      confirmLoading: false,
      queryParam: {},
      visible: false,
      columns: columns,
      roleID: '',
      memberVisible: false,
      rolePermission: {},
      rolePermissionVisible: false,
      fartherWidth: '',
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)

        return getRoleList(requestParameters)
        .then(res => {
            return res.result
        })
      }
    }
  }
}

</script>

<style>

</style>
