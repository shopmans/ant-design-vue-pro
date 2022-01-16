<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('menu.reference.filename')">
                <a-input v-model="queryParam.filename" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-button type="primary" @click="startQuery">{{ this.$t('menu.project.view.query.query') }}</a-button>
              <a-button style="margin-left: 8px" @click="resetQuery">{{ this.$t('menu.project.view.query.reset') }}</a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <template v-if="optAdd">
        <div class="table-operator">
          <a-upload
            action="/api/reference-file-upload"
            :multiple="true"
            :showUploadList="false"
            :file-list="referenceFileList"
            @change="referenceFileListChange"
            :headers="{ RefType: type, QueueType: '9'}"
          >
            <a-button style="width:100%;"> <a-icon type="upload" /> 上传资料 </a-button>
          </a-upload>
        </div>
      </template>

      <!----------------------------------------------------- 添加 -->
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
        v-if="optAdd"
      >
        <span slot="date" slot-scope="text">
          {{ text | format }}
        </span>
        <a slot="filename" :href="record.url" target="_blank" slot-scope="text,record">
          {{ text }}
        </a>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

      <!----------------------------------------------------- 打开 -->
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
        v-if="optOpen"
      >
        <span slot="date" slot-scope="text">
          {{ text | format }}
        </span>
        <a slot="filename" :href="record.url" target="_blank" slot-scope="text,record">
          {{ text }}
        </a>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

      <!----------------------------------------------------- 删除 -->
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
        v-if="optDelete"
      >
        <span slot="date" slot-scope="text">
          {{ text | format }}
        </span>
        <a slot="filename" :href="record.url" target="_blank" slot-scope="text,record">
          {{ text }}
        </a>
        <span slot="action" slot-scope="text, record">
          <a-popconfirm :title="$t('menu.reference.file.delete.confirm')" @confirm="deleteRecord(record)">
            <a>{{ $t('menu.project.view.action.delete') }}</a>
          </a-popconfirm>
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

    </a-card>
  </page-header-wrapper>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getTestValveList, deleteReferenceFile } from '@/api/ref'
import moment from 'moment'

const columns = [
  {
    slotName: 'menu.project.view.table.column.date',
    dataIndex: 'date',
    sorter: true,
    width: '15%',
    scopedSlots: { customRender: 'date', title: 'menu.project.view.table.column.date' }
  },
  {
    slotName: 'menu.reference.filename',
    dataIndex: 'filename',
    scopedSlots: { customRender: 'filename', title: 'menu.reference.filename' }
  },
  {
    slotName: 'menu.project.view.table.column.action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action', title: 'menu.project.view.table.column.action' }
  }
]

const columns1 = [
  {
    slotName: 'menu.project.view.table.column.date',
    dataIndex: 'date',
    sorter: true,
    width: '15%',
    scopedSlots: { customRender: 'date', title: 'menu.project.view.table.column.date' }
  },
  {
    slotName: 'menu.reference.filename',
    dataIndex: 'filename',
    scopedSlots: { customRender: 'filename', title: 'menu.reference.filename' }
  }
]

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis
  },
  mounted () {
    this.optOpen = false
    this.optDelete = false
    this.optAdd = false
    this.type = this.$route.meta.type
    // 1: 测试标准-调节阀
    // 2: 测试标准-开关阀

    // 新建
    if (this.$route.meta.opt === 'add') {
      this.optAdd = true
    }
    // 删除
    if (this.$route.meta.opt === 'delete') {
      this.optDelete = true
    }
    // 查询
    if (this.$route.meta.opt === 'open') {
      this.optOpen = true
    }

    if (!this.optDelete) {
      this.columns = columns1
    } else {
      this.columns = columns
    }
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
        requestParameters.type = this.type

        return getTestValveList(requestParameters)
          .then(res => {
            console.log(requestParameters)
            return res.result
        })
      },
      columns: columns,
      optDelete: false,
      optOpen: false,
      optAdd: false,
      type: 0,
      referenceFileList: []
    }
  },
  methods: {
    deleteRecord (record) {
      deleteReferenceFile(record.id).then(e => {
        this.$refs.table.refresh(true)
      })
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
    referenceFileListChange (fileObj) {
      var fileList = [...fileObj.fileList]

      fileList.map(file => {
        if (file.response) {
          if (file.response.retCode !== 200) {
              this.$notification['error']({
                message: '错误',
                description: file.response.msg,
                duration: 3
              })
              file.status = 'error'
          } else {
            this.$refs.table.refresh(true)
          }
        }
        return file
      })

      this.referenceFileList = fileList
      // this.$refs.table.refresh(true)
    }
  },
  filters: {
    format (val) {
      return moment(val).format('YYYY-MM-DD')
    }
  }
}
</script>
