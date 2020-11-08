<template>
  <page-header-wrapper>
    <a-tabs default-active-key="1" >
      <a-tab-pane key="1" :tab="$t('menu.repair.repairbefore.image.title')">
        <a-row :gutter="[16,16]">
          <template v-for="(beforeImage,index) in repairBeforeImages">
            <a-col :span="6" :key="beforeImage.id + beforeImage.current_step + index">
              <a-card :title="getStepText(beforeImage.current_step)" :bordered="false">
                <a slot="extra"><a-switch v-model="beforeImage.use_report" :checked="beforeImage.use_report === '1'" /></a>
                <img
                  slot="cover"
                  :src="getImgUrl(beforeImage.md5, beforeImage.content_type)"
                  @click="handlePreview(beforeImage.md5, beforeImage.content_type)"
                />
                <template slot="actions" class="ant-card-actions">
                  <a-icon key="edit" type="edit" @click="editImgTitle(beforeImage.upload_file_flow_id)" />
                  <a-icon key="number" type="number" @click="editImgSerialNumber(beforeImage.upload_file_flow_id)" />
                  <a-popconfirm
                    :title="$t('app.repair.report.delete.img')"
                    :ok-text="$t('app.button.confirm')"
                    :cancel-text="$t('app.button.cancel')"
                    @confirm="deleteImg(beforeImage.upload_file_flow_id)"
                    @cancel="deleteImgCancel"
                  >
                    <a-icon key="delete" type="delete"/>
                  </a-popconfirm>
                </template>
                <a-card-meta :title="beforeImage.serial_number" :description="beforeImage.title.length <= 0 ? '-' : beforeImage.title">
                </a-card-meta>
              </a-card>
            </a-col>
          </template>
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="2" :tab="$t('menu.repair.repairafter.image.title')" force-render>
        <a-row :gutter="[16,16]">
          <template v-for="(afterImage,index) in repairAfterImages">
            <a-col :span="6" :key="afterImage.id + afterImage.current_step + index">
              <a-card :title="getStepText(afterImage.current_step)" :bordered="false">
                <a slot="extra"><a-switch v-model="afterImage.use_report" :checked="afterImage.use_report === '1'" /></a>
                <img
                  slot="cover"
                  :src="getImgUrl(afterImage.md5, afterImage.content_type)"
                  @click="handlePreview(afterImage.md5, afterImage.content_type)"
                />
                <template slot="actions" class="ant-card-actions">
                  <a-icon key="edit" type="edit" @click="editImgTitle(afterImage.upload_file_flow_id)" />
                  <a-icon key="number" type="number" @click="editImgSerialNumber(afterImage.upload_file_flow_id)" />
                  <a-popconfirm
                    :title="$t('app.repair.report.delete.img')"
                    :ok-text="$t('app.button.confirm')"
                    :cancel-text="$t('app.button.cancel')"
                    @confirm="deleteImg(afterImage.upload_file_flow_id)"
                    @cancel="deleteImgCancel"
                  >
                    <a-icon key="delete" type="delete"/>
                  </a-popconfirm>
                </template>
                <a-card-meta :title="afterImage.serial_number" :description="afterImage.title.length <= 0 ? '-' : afterImage.title">
                </a-card-meta>
              </a-card>
            </a-col>
          </template>
        </a-row>
      </a-tab-pane>
    </a-tabs>

    <!-- 图片预览 -->
    <viewer :images="images" class="viewer" ref="viewer">
      <img id="imgid567" :src="previewImage" hidden />
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
import { repairReportImgList, saveUseReportImg } from '@/api/report'

export default {
  mixins: [baseMixin],
  components: {
      FooterToolBar
    },
  mounted () {
    getFlowStepLog({ FlowID: this.$route.params.id }).then(e => {
      // 检查流程是否存在FinalCheck
      let isFinalCheck = 0
      // 检查是否是维修流程
      let isRepairStep = -1
      const tmpList = e.FlowStepLogs
      tmpList.forEach(item => {
        if (item.current_step === 'FinalCheck') {
          isFinalCheck = 1
        }
        if (item.current_step === 'IntoFactoryCheck' && isRepairStep < 0) {
          isRepairStep = 1
        }
      })

      if (isRepairStep < 0) {
        this.$message.info('工单不是维修流程')
        this.$router.push({ path: '/step/steplist' })
        return
      }
      if (isFinalCheck === 0) {
        this.$message.info('工单流程没有结束不能出具维修报告')
        this.$router.push({ path: '/step/steplist' })
        return
      }

      repairReportImgList(this.$route.params).then(e => {
        var repairImages = e.result
        if (repairImages.length <= 0) {
            this.$message.info('没有图片')
            return
        }
        for (var i = 0; i < repairImages.length; i++) {
          repairImages[i].stepValue = repairFlowStepValue(repairImages[i].current_step)
          // 序号
          if (repairImages[i].serial_number.length <= 0) {
            repairImages[i].serial_number = i + 1 + ''
          }
          // 把 use_report 转换成bool
          if (repairImages[i].use_report === '1') {
            repairImages[i].use_report = true
          } else {
            repairImages[i].use_report = false
          }
        }

        // 排序流程
        repairImages.sort(compare('stepValue'))
        const stepSplitValue = getRepairSplitValue()
        repairImages.forEach(item => {
          if (item.stepValue < stepSplitValue) {
            this.repairBeforeImages.push(item)
          } else {
            this.repairAfterImages.push(item)
          }
        })

        // 未知原因，页面第一次点击图片时不能显未，因此在此预先点击一次
        if (this.repairBeforeImages && this.repairBeforeImages.length > 0) {
          const url = this.getImgRealUrl(this.repairBeforeImages[0].md5, this.repairBeforeImages[0].content_type)
          this.previewImage = url
          this.images.length = 0
          this.images.push(url)
          document.getElementById('imgid567').click()
        }
      })
    })
  },
  data () {
    return {
      repairBeforeImages: [],
      repairAfterImages: [],
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
    repairReportImgList,
    getRepairSplitValue,
    repairFlowStepValue,
    getCurrentStepMap,
    saveUseReportImg,
    getStepText (val) {
      const stepMap = getCurrentStepMap()
      return this.$t(stepMap[val].text)
    },
    getReport () {
      var tmpList = { use_report_images: [] }
      this.repairBeforeImages.forEach(item => {
        // 将false true 转成字符
        var tmpItem = { ...item }
        tmpItem.use_report = tmpItem.use_report ? '1' : ''
        tmpList.use_report_images.push(tmpItem)
      })
      this.repairAfterImages.forEach(item => {
        // 将false true 转成字符
        var tmpItem = { ...item }
        tmpItem.use_report = tmpItem.use_report ? '1' : ''
        tmpList.use_report_images.push(tmpItem)
      })
      console.log(tmpList)
      saveUseReportImg(tmpList).then(res => {
        const content = res
        const blob = new Blob([content])
        const fileName = 'SinoRepairReport_' + moment(new Date()).format('YYYY_MM_DD_HH_mm_ss') + '.xlsx'
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
      document.getElementById('imgid567').click()
    },
    modalHandleOk () {
      for (let i = 0; i < this.repairBeforeImages.length; i++) {
        const e = this.repairBeforeImages[i]
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
      for (let i = 0; i < this.repairAfterImages.length; i++) {
        const e = this.repairAfterImages[i]
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
      for (let i = 0; i < this.repairBeforeImages.length; i++) {
        const e = this.repairBeforeImages[i]
        if (e.upload_file_flow_id === id) {
          this.currentModelImgID = id
          this.modelInputValue = e.title
          this.modelTitle = '编辑标注'
          this.modelVisible = true
          this.modelEditType = 1
          return
        }
      }
      for (let i = 0; i < this.repairAfterImages.length; i++) {
        const e = this.repairAfterImages[i]
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
      for (let i = 0; i < this.repairBeforeImages.length; i++) {
        const e = this.repairBeforeImages[i]
        if (e.upload_file_flow_id === id) {
          this.currentModelImgID = id
          this.modelInputValue = e.serial_number
          this.modelTitle = '编辑序号'
          this.modelVisible = true
          this.modelEditType = 2
          return
        }
      }
      for (let i = 0; i < this.repairAfterImages.length; i++) {
        const e = this.repairAfterImages[i]
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
      for (let i = 0; i < this.repairBeforeImages.length; i++) {
        const e = this.repairBeforeImages[i]
        if (e.upload_file_flow_id === id) {
          this.currentModelImgID = ''
          this.modelInputValue = ''
          this.modelTitle = ''
          this.repairBeforeImages.splice(i, 1)
          return
        }
      }
      for (let i = 0; i < this.repairAfterImages.length; i++) {
        const e = this.repairAfterImages[i]
        if (e.upload_file_flow_id === id) {
          this.currentModelImgID = ''
          this.modelInputValue = ''
          this.modelTitle = ''
          this.repairAfterImages.splice(i, 1)
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
