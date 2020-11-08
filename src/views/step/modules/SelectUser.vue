<template>
  <div>
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="false"
      :loading="memberLoading"
    >
      <template v-for="(col, i) in ['name', 'workId']" :slot="col" slot-scope="text, record">
        <a-input
          :key="col"
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          :placeholder="columns[i].title"
          @change="e => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>{{ text }}</template>
      </template>
      <template slot="operation" slot-scope="text, record">
        <template v-if="record.editable">
          <span v-if="record.isNew">
            <a @click="saveRow(record)">添加</a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
              <a>删除</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="saveRow(record)">保存</a>
            <a-divider type="vertical" />
            <a @click="cancel(record.key)">取消</a>
          </span>
        </template>
        <span v-else>
          <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </template>
    </a-table>
    <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember">新增成员</a-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      memberLoading: false,
      columns: [
          {
              title: '人员姓名',
              dataIndex: 'name',
              key: 'name',
              width: '40%',
              scopedSlots: { customRender: 'name' }
          },
          {
              title: '工号',
              dataIndex: 'workId',
              key: 'workId',
              width: '40%',
              scopedSlots: { customRender: 'workId' }
          },
          {
              title: '操作',
              key: 'action',
              scopedSlots: { customRender: 'operation' }
          }
      ],
      data: [
          {
              key: '1',
              name: '小明',
              workId: '001',
              editable: false
          },
          {
              key: '2',
              name: '李莉',
              workId: '002',
              editable: false
          }
      ]
    }
  },
  methods: {
    newMember () {
      const length = this.data.length
      this.data.push({
        key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
        name: '',
        workId: '',
        department: '',
        editable: true,
        isNew: true
      })
    },
    newPartMember () {
      const length = this.dataPurchased.length
      this.dataPurchased.push({
        key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
        purchased_part_no: '',
        purchased_part_key_number: '',
        purchased_part_number: '',
        purchased_part_name: '',
        purchased_part_qty: '',
        purchased_part_memo: '',
        editable: true,
        isNew: true
      })
    },
    remove (key) {
      const newData = this.data.filter(item => item.key !== key)
      this.data = newData
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.find(item => key === item.key)
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    saveRow (record) {
      this.memberLoading = true
      const { key, name, workId } = record
      if (!name || !workId) {
        this.memberLoading = false
        this.$message.error('请填写完整成员信息。')
        return
      }
      const target = this.data.find(item => item.key === key)
      target.editable = false
      target.isNew = false
      this.memberLoading = false
    }
  }
}
</script>

<style>

</style>
