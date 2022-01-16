<template>
  <div class="table-operator">
    <a-row class="form-row" :gutter="16">
      <a-col :lg="6" :md="12" :sm="24">
        <!-- <a-select
          show-search
          :default-active-first-option="false"
          :show-arrow="false"
          :filter-option="false"
          :not-found-content="null"
          @search="handleUserSearch"
          @select="handleSelect"
          style="width:100%;"
        >
          <a-select-option v-for="d in userData" :key="d.value">
            {{ d.text }}
          </a-select-option>
        </a-select> -->
        <a-select
          :disabled="disableAll"
          show-search
          :default-active-first-option="false"
          :filter-option="false"
          :not-found-content="null"
          @select="handleSelect"
          style="width:100%;"
        >
          <a-select-option v-for="d in userList" :key="d.id" :value="d.id">
            {{ d.user_name }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :lg="6" :md="12" :sm="24">
        <a-button :disabled="disableAll" type="primary" icon="plus" @click="handleAdd">{{ $t('app.button.add') }}</a-button>
      </a-col>
    </a-row>

    <s-table
      ref="stepUserTable"
      :data="loadData"
      :loading="false"
      :columns="columns"
      rowKey="id"
    >
      <span slot="action" slot-scope="text, record">
        <template>
          <a :disabled="disableAll" @click="deleteStep(record)">{{ $t('menu.project.view.action.delete') }}</a>
        </template>
      </span>
      <template v-for="(item, index) in columns" :slot="item.slotName">
        <span :key="index">{{ $t(item.slotName) }}</span>
      </template>
    </s-table>
  </div>

</template>

<script>
import { fetch } from '../../../utils/inputSearch'
import { getStepUsers, addStepUsers, delStepUsers } from '@/api/step'
import { getUserList } from '@/api/user'
import { STable, Ellipsis } from '@/components'
// import pick from 'lodash.pick'
// import { fetch } from '../../../utils/inputSearch'
// import SearchInput from '@/components/Flow/SearchInput'

const columns = [
  {
    dataIndex: 'user_name',
    slotName: 'app.table.title.name',
    scopedSlots: { customRender: 'user_name', title: 'app.table.title.name' }
  },
  {
    dataIndex: 'job',
    slotName: 'app.table.title.jobNumber',
    scopedSlots: { customRender: 'job', title: 'app.table.title.jobNumber' }
  },
  {
    dataIndex: 'action',
    slotName: 'menu.project.view.table.column.action',
    scopedSlots: { customRender: 'action', title: 'menu.project.view.table.column.action' }
  }
]

// 表单字段
// const fields = ['repair_plan', 'customer_id', 'sales_id', 'serial', 'number', 'total', 'ex_open_date', 'ex_working_hours', 'ex_material_fee', 'parts_order_no']

export default {
  components: {
      STable,
      Ellipsis
  },
  props: {
      flowID: {
          type: String,
          default: '',
          required: true
      },
      currentStep: {
          type: String,
          default: '',
          required: true
      },
      flag: {
          type: String,
          default: '',
          required: true
      },
      disableAll: {
        type: Boolean,
        default: false
      }
  },
  data () {
    this.format = 'YYYY-MM-DD'
    this.formLayout = {
      labelCol: {
        xs: { span: 1 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 1 },
        sm: { span: 13 }
      }
    }
    return {
      userData: {},
      selectUserID: '',
      columns: columns,
      userList: [],
      loadData: parameter => {
        if (this.flowID === undefined || this.currentStep === undefined) {
          return
        }
        return getStepUsers({ flow_id: this.flowID, current_step: this.currentStep, flag: this.flag }).then(res => {
          return res.result
        })
      }
    }
  },
  methods: {
    handleUserSearch (value) {
      fetch(value, data => (this.userData = data), this.$t('input.user.search'))
    },
    handleAdd () {
        // console.log(this.$store.state.user.detailData)
        const addUser = {
            user_id: this.selectUserID,
            flow_id: this.flowID,
            current_step: this.currentStep,
            flag: this.flag
        }
        if (this.selectUserID.length <= 0) {
          this.$message.info(this.$t('app.note.selectuser'))
          return
        }

        addStepUsers(addUser).then(res => {
          this.selectUserID = ''
            this.$refs.stepUserTable.refresh()
        })
    },
    handleSelect (value) {
        this.selectUserID = value
    },
    deleteStep (record) {
        delStepUsers(record).then(res => {
            this.$refs.stepUserTable.refresh()
        })
    }
  },
  mounted () {
    // 刷新执行人员下拉列表
    getUserList({ pageSize: 99999999, pageNo: 1, position: '2' }).then(e => {
      this.userList = e.result.data
    })
  }
}
</script>
