<template>
  <page-header-wrapper>
    <a-row :gutter="[16,16]">
      <template v-for="(image,index) in valveTestImages">
        <a-col :span="6" :key="image.id + image.current_step + index">
          <a-card :title="getStepText(image.current_step)" :bordered="false">
            <a slot="extra"><a-switch v-model="image.use_report" :checked="image.use_report === '1'" /></a>
            <img
              slot="cover"
              :src="getImgUrl(image.md5, image.content_type)"
              @click="handlePreview(image.md5, image.content_type)"
            />
            <template slot="actions" class="ant-card-actions">
              <a-icon key="edit" type="edit" @click="editImgTitle(image.upload_file_flow_id)" />
              <a-icon key="number" type="number" @click="editImgSerialNumber(image.upload_file_flow_id)" />
              <a-popconfirm
                :title="$t('app.repair.report.delete.img')"
                :ok-text="$t('app.button.confirm')"
                :cancel-text="$t('app.button.cancel')"
                @confirm="deleteImg(image.upload_file_flow_id)"
                @cancel="deleteImgCancel"
              >
                <a-icon key="delete" type="delete"/>
              </a-popconfirm>
            </template>
            <a-card-meta :title="image.serial_number" :description="image.title.length <= 0 ? '-' : image.title"></a-card-meta>
          </a-card>
        </a-col>
      </template>
    </a-row>

    <!-- 图片预览 -->
    <viewer :images="images" class="viewer" ref="viewer">
      <img id="imgid56789" :src="previewImage" hidden />
    </viewer>

    <!-- 页脚 -->
    <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
      <a-button @click="getReport" type="primary">生成报告</a-button>
      <a-button style="margin-left: 8px" @click="cancelReport" >取消</a-button>
    </footer-tool-bar>

    <!-- 对话框 -->
    <a-modal :maskClosable="false" :visible="modelVisible" :title="modelTitle" @ok="modalHandleOk" @cancel="modalHandleCancel">
      <a-input :default-value="modelInputValue" v-model="modelInputValue"></a-input>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import FooterToolBar from '@/components/FooterToolbar'
import { baseMixin } from '@/store/app-mixin'
import { getRepairSplitValue, repairFlowStepValue, getCurrentStepMap, getFlowStepLog } from '@/api/step'
import { localtorTestReportImgList, saveUseReportImgFotLocatorTest } from '@/api/report'

export default {
  mixins: [baseMixin],
  components: {
      FooterToolBar
    },
  mounted () {
    getFlowStepLog({ FlowID: this.$route.params.id }).then(e => {
    // 检查流程是否存在LocatorAssessment
      let isLocatorAssessment = 0
      // 检查是否是定位器流程
      let isLocatorStep = -1
      const tmpList = e.FlowStepLogs
      tmpList.forEach(item => {
        if (item.current_step === 'LocatorAssessment') {
          isLocatorAssessment = 1
        }
        if (item.current_step === 'LocatorIntoFactoryCheck' && isLocatorStep < 0) {
          isLocatorStep = 1
        }
      })

      if (isLocatorStep < 0) {
          this.$message.info('工单流程不是定位器流程')
          this.$router.push({ path: '/step/steplist' })
          return
      }
      if (isLocatorAssessment === 0) {
        this.$message.info('工单流程没有完成评估不能出具检测报告')
        this.$router.push({ path: '/step/steplist' })
        return
      }

      localtorTestReportImgList(this.$route.params).then(e => {
      var testImages = e.result
      if (testImages.length <= 0) {
          this.$message.info('没有图片')
          return
      }
      for (var i = 0; i < testImages.length; i++) {
        testImages[i].stepValue = repairFlowStepValue(testImages[i].current_step)
        // 序号
        if (testImages[i].serial_number.length <= 0) {
          testImages[i].serial_number = i + 1 + ''
        }
        // 把 use_report 转换成bool
        if (testImages[i].use_report === '1') {
          testImages[i].use_report = true
        } else {
          testImages[i].use_report = false
        }
      }

      // 排序流程
      testImages.sort(compare('stepValue'))
      this.valveTestImages = testImages

      // 未知原因，页面第一次点击图片时不能显未，因此在此预先点击一次
      if (this.valveTestImages && this.valveTestImages.length > 0) {
        const url = this.getImgRealUrl(this.valveTestImages[0].md5, this.valveTestImages[0].content_type)
        this.previewImage = url
        this.images.length = 0
        this.images.push(url)
        document.getElementById('imgid56789').click()
      }
    })
    })
  },
  data () {
    return {
      valveTestImages: [],
      previewVisible: false,
      previewImage: '',
      images: [],
      modelTitle: '',
      modelVisible: false,
      modelInputValue: '',
      currentModelImgID: '',
      modelEditType: 0
    }
  },
  methods: {
    getRepairSplitValue,
    repairFlowStepValue,
    getCurrentStepMap,
    saveUseReportImgFotLocatorTest,
    getStepText (val) {
      const stepMap = getCurrentStepMap()
      return this.$t(stepMap[val].text)
    },
    getReport () {
      var tmpList = { use_report_images: [] }
      this.valveTestImages.forEach(item => {
        // 将false true 转成字符
        var tmpItem = { ...item }
        tmpItem.use_report = tmpItem.use_report ? '1' : ''
        tmpList.use_report_images.push(tmpItem)
      })
      saveUseReportImgFotLocatorTest(tmpList).then(res => {
        const content = res
        const blob = new Blob([content])
        const fileName = 'SinoLocatorTestReport_' + moment(new Date()).format('YYYY_MM_DD_HH_mm_ss') + '.xlsx'
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
        this.$message.info('报告生成完毕')
      })
    },
    cancelReport () {
      this.$router.push({ path: '/step/steplist' })
    },
    getImgUrl (md5, type) {
      if (type.indexOf('jpeg') >= 0) {
        return '/api/upload/' + md5 + '_t.jpg'
      }
      if (type.indexOf('png') >= 0) {
        return '/api/upload/' + md5 + '_t.png'
      }
      return ''
    },
    getImgRealUrl (md5, type) {
      if (type.indexOf('jpeg') >= 0) {
        return '/api/upload/' + md5 + '_r.jpg'
      }
      if (type.indexOf('png') >= 0) {
        return '/api/upload/' + md5 + '_r.png'
      }
      return ''
    },
    previewhandleCancel () {
        this.previewVisible = false
        this.previewImage = ''
    },
    handlePreview (md5, type) {
      let url = ''
      if (type.indexOf('jpeg') >= 0) {
        url = '/api/upload/' + md5 + '_r.jpg'
      }
      if (type.indexOf('png') >= 0) {
        url = '/api/upload/' + md5 + '_r.png'
      }

      this.previewImage = url
      this.images.length = 0
      this.images.push(url)
      document.getElementById('imgid56789').click()
    },
    modalHandleOk () {
      for (let i = 0; i < this.valveTestImages.length; i++) {
        const e = this.valveTestImages[i]
        if (e.upload_file_flow_id === this.currentModelImgID) {
          if (this.modelEditType === 1) {
            e.title = this.modelInputValue
          }
          if (this.modelEditType === 2) {
            e.serial_number = this.modelInputValue + ''
          }
          this.currentModelImgID = ''
          this.modelTitle = ''
          this.modelVisible = false
          return
        }
      }
    },
    modalHandleCancel () {
      this.currentModelImgID = ''
      this.modelVisible = false
    },
    editImgTitle (id) {
      for (let i = 0; i < this.valveTestImages.length; i++) {
        const e = this.valveTestImages[i]
        if (e.upload_file_flow_id === id) {
          this.currentModelImgID = id
          this.modelInputValue = e.title
          this.modelTitle = '编辑标注'
          this.modelVisible = true
          this.modelEditType = 1
          return
        }
      }
    },
    editImgSerialNumber (id) {
      for (let i = 0; i < this.valveTestImages.length; i++) {
        const e = this.valveTestImages[i]
        if (e.upload_file_flow_id === id) {
          this.currentModelImgID = id
          this.modelInputValue = e.serial_number
          this.modelTitle = '编辑序号'
          this.modelVisible = true
          this.modelEditType = 2
          return
        }
      }
    },
    deleteImgCancel () {},
    deleteImg (id) {
      for (let i = 0; i < this.valveTestImages.length; i++) {
        const e = this.valveTestImages[i]
        if (e.upload_file_flow_id === id) {
          this.currentModelImgID = ''
          this.modelInputValue = ''
          this.modelTitle = ''
          this.valveTestImages.splice(i, 1)
          return
        }
      }
    }
  }
}

// 定义一个比较器
function compare (propertyName) {
  return function (object1, object2) {
    var value1 = object1[propertyName]
    var value2 = object2[propertyName]
    if (value2 < value1) {
      return 1
    } else if (value2 > value1) {
      return -1
    } else {
    return 0
    }
  }
}

</script>

<style>

</style>
