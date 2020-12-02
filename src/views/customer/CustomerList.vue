<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="18">
            <a-col :lg="6" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.query.businessCode')">
                <a-input v-model="queryParam.code" />
              </a-form-item>
            </a-col>
            <a-col :lg="6" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.query.companyType')">
                <a-select v-model="queryParam.class">
                  <a-select-option value="1">{{ $t('menu.customer.query.companyType.item1') }}</a-select-option>
                  <a-select-option value="2">{{ $t('menu.customer.query.companyType.item2') }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advancedQuery">
              <a-col :lg="6" :md="8" :sm="24">
                <a-form-item :label="$t('menu.project.view.query.customerName')">
                  <a-input v-model="queryParam.customer_name" />
                </a-form-item>
              </a-col>
              <a-col :lg="6" :md="8" :sm="24">
                <a-form-item :label="$t('menu.project.view.query.customerEnName')">
                  <a-input v-model="queryParam.customer_en_name" />
                </a-form-item>
              </a-col>
            </template>
            <a-col :lg="!advancedQuery && 6 || 24" :md="8" :sm="24">
              <span class="table-page-search-submitButtons" :style="advancedQuery && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh(true)">{{ $t('menu.project.view.query.query') }}</a-button>
                <a-button style="margin-left: 8px" @click="resetQuery">{{ $t('menu.project.view.query.reset') }}</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advancedQuery ? $t('menu.project.view.query.collapse') : $t('menu.project.view.query.unfold') }}
                  <a-icon :type="advancedQuery ? 'up' : 'down'"/>
                </a>
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
        <span slot="class" slot-scope="text">{{ $t(className[text]) }}</span>
        <span slot="group_name" slot-scope="text">{{ $t(groupName[text]) }}</span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">{{ $t('menu.user.manager.action.edit') }}</a>
          <a-divider type="vertical" />
          <a-popconfirm :title="$t('menu.customer.action.delete.note')" @confirm="handleDelete(record)">
            <a>{{ $t('menu.project.view.action.delete') }}</a>
          </a-popconfirm>
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

      <a-modal
        :title="$t('menu.project.view.table.column.action')"
        style="top: 20px;"
        :width="800"
        v-model="visible"
        :confirmLoading="confirmLoading"
        :maskClosable="false"
        @ok="handleAddUserOk"
      >
        <a-form class="permission-form" :form="form">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item :label="$t('menu.customer.query.companyType')">
                <a-select v-decorator="['class', { rules: [{}] }]" >
                  <a-select-option value="1">{{ $t('menu.customer.query.companyType.item1') }}</a-select-option>
                  <a-select-option value="2">{{ $t('menu.customer.query.companyType.item2') }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item :label="$t('menu.customer.query.businessCode')">
                <a-input v-decorator="['code', { rules: [{required: true, message: $t('menu.customer.new.businessCode.require')}] }]" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item :label="$t('menu.customer.new.group')">
                <a-select v-decorator="['group_name', { initialValue: '1', rules: [{required: true, message: $t('menu.customer.new.group.require')}] }]">
                  <a-select-option value="1">{{ $t('menu.customer.new.finallyUser') }}</a-select-option>
                  <a-select-option value="2">OEM</a-select-option>
                  <a-select-option value="3">EPC</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item :label="$t('menu.customer.new.companyName')">
                <a-input v-decorator="['customer_name', { rules: [{required: true, message: $t('menu.customer.new.companyName.require')}] }]" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item :label="$t('menu.customer.new.companyEnName')">
                <a-input v-decorator="['customer_en_name', { rules: [{required: false, message: $t('menu.customer.new.companyEnName.requir')}] }]" />
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
import pick from 'lodash.pick'
import { STable } from '@/components'
import { getCustomerList, deleteCustomer, modifyCustomer, addCustomer } from '@/api/customer'
// import { PERMISSION_ENUM } from '@/utils/helper/permission'

const columns = [
  {
    slotName: 'menu.customer.table.title.serial',
    dataIndex: 'serial',
    sorter: true,
    scopedSlots: { customRender: 'serial', title: 'menu.customer.table.title.serial' }
  },
  {
    slotName: 'menu.customer.query.companyType',
    dataIndex: 'class',
    scopedSlots: { customRender: 'class', title: 'menu.customer.query.companyType' }
  },
  {
    sorter: true,
    slotName: 'menu.customer.query.businessCode',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code', title: 'menu.customer.query.businessCode' }
  },
  {
    slotName: 'menu.project.view.query.customerName',
    dataIndex: 'customer_name',
    scopedSlots: { customRender: 'customer_name', title: 'menu.project.view.query.customerName' }
  },
  {
    slotName: 'menu.project.view.query.customerEnName',
    dataIndex: 'customer_en_name',
    scopedSlots: { customRender: 'customer_en_name', title: 'menu.project.view.query.customerEnName' }
  },
  {
    slotName: 'menu.customer.new.group',
    dataIndex: 'group_name',
    scopedSlots: { customRender: 'group_name', title: 'menu.customer.new.group' }
  },
  {
    slotName: 'menu.project.view.table.column.action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action', title: 'menu.project.view.table.column.action' }
  }
]

const className = {
    1: 'menu.customer.query.companyType.item1',
    2: 'menu.customer.query.companyType.item2'
}

const groupName = {
  1: 'menu.customer.new.finallyUser'
}

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
      advancedQuery: false,

      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: columns,
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)

        return getCustomerList(requestParameters)
        .then(res => {
            return res.result
        })
      },
      className: className,
      groupName: groupName
    }
  },
  filters: {
    classFilter (key) {
      return className[key]
    },
    groupNameFilter (key) {
        return groupName[key]
    }
  },
  methods: {
    handleAdd () {
      this.form.resetFields()
      this.addOrModify = true
      this.visible = true
    },
    resetQuery () {
        this.queryParam = {}
        this.$refs.table.refresh(true)
    },
    handleEdit (record) {
      this.addOrModify = false
      this.visible = true

      const userFields = ['id', 'class', 'code', 'group_name', 'customer_name', 'customer_en_name']
      userFields.forEach(v => this.form.getFieldDecorator(v))
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, userFields))
      })
    },
    toggleAdvanced () {
      this.advancedQuery = !this.advancedQuery
    },
    handleDelete (record) {
        deleteCustomer(record).then(res => {
            this.$refs.table.refresh()
            this.$message.info(this.$t('menu.user.manager.new.successful'))
        })
    },
    handleAddUserOk (e) {
      this.confirmLoading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
            if (values.id && values.id.length > 0) {
                modifyCustomer(values).then(res => {
                    this.visible = false
                    this.confirmLoading = false
                    // 重置表单数据
                    this.form.resetFields()
                    // 刷新表格
                    this.$refs.table.refresh()
                    this.$message.info(this.$t('menu.user.manager.new.modifySuccessful'))
                })
            } else {
                addCustomer(values).then(res => {
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
