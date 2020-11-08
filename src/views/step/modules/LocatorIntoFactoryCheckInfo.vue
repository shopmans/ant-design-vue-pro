<template>
  <a-card :bordered="false">
    <a-descriptions title="基本信息" :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
      <a-descriptions-item label="工单号">{{ refData1.work_order_serial }}</a-descriptions-item>
      <a-descriptions-item label="合同号">{{ projectData.contract_serial }}</a-descriptions-item>
      <a-descriptions-item label="客户名称">{{ projectData.customer_name }}</a-descriptions-item>
      <a-descriptions-item label="位号">{{ refData1.tag }}</a-descriptions-item>
      <a-descriptions-item label="阀门序列号">{{ valveRefData.valve_serial }}</a-descriptions-item>
      <a-descriptions-item label="阀门型号">{{ valveRefData.valve_model }}</a-descriptions-item>
      <a-descriptions-item label="阀门尺寸">{{ getValveSizeUnitText(valveRefData.valve_size, valveRefData.valve_size_unit) }}</a-descriptions-item>
      <a-descriptions-item label="执行机构型号">{{ actuRefData.actu_model }}</a-descriptions-item>
      <a-descriptions-item label="执行机构尺寸">{{ actuRefData.actu_size }}</a-descriptions-item>
    </a-descriptions>
    <a-divider><div class="linehight">定位器<br>Other Accessories</div></a-divider>
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="24" >
        <a-descriptions title="" :column="{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }">
          <a-descriptions-item label="">
            <div v-if="intoFactoryData.intofc_cracks_on_casing_yesno===2" class="red-circle"></div>
            <div v-if="intoFactoryData.intofc_cracks_on_casing_yesno===1" class="green-circle"></div>
            <div v-if="intoFactoryData.intofc_cracks_on_casing_yesno!==1 && intoFactoryData.intofc_cracks_on_casing_yesno!==2" class="white-circle"></div>
            壳体裂纹
            <span style="margin-left:10px;">{{ intoFactoryData.intofc_cracks_on_casing_memo }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="">
            <div v-if="intoFactoryData.intofc_nameplate_logo_yesno===2" class="red-circle"></div>
            <div v-if="intoFactoryData.intofc_nameplate_logo_yesno===1" class="green-circle"></div>
            <div v-if="intoFactoryData.intofc_nameplate_logo_yesno!==1 && intoFactoryData.intofc_nameplate_logo_yesno!==2" class="white-circle"></div>
            铭牌/标识完整
            <span style="margin-left:10px;">{{ intoFactoryData.intofc_nameplate_logo_memo }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="">
            <div v-if="intoFactoryData.intofc_gauge_yesno===2" class="red-circle"></div>
            <div v-if="intoFactoryData.intofc_gauge_yesno===1" class="green-circle"></div>
            <div v-if="intoFactoryData.intofc_gauge_yesno!==1 && intoFactoryData.intofc_gauge_yesno!==2" class="white-circle"></div>
            压力表完好
            <span style="margin-left:10px;">{{ intoFactoryData.intofc_gauge_memo }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="">
            <div v-if="intoFactoryData.intofc_bolts_yesno===2" class="red-circle"></div>
            <div v-if="intoFactoryData.intofc_bolts_yesno===1" class="green-circle"></div>
            <div v-if="intoFactoryData.intofc_bolts_yesno!==1 && intoFactoryData.intofc_bolts_yesno!==2" class="white-circle"></div>
            螺钉完好
            <span style="margin-left:10px;">{{ intoFactoryData.intofc_bolts_memo }}</span>
          </a-descriptions-item>
        </a-descriptions>
      </a-col>
    </a-row>
    <a-divider style="margin-bottom: 32px"/>
    <a-descriptions title="上传照片">
      <div class="clearfix">
        <a-upload
          name="file"
          action="/api/base-info-upload"
          list-type="picture-card"
          :file-list="imgFileList"
          @preview="handlePreview"
        >
        </a-upload>
        <a-modal :maskClosable="false" :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>
    </a-descriptions>
  </a-card>
</template>

<script>
import { queryStepDataOnlyread, getValveSizeUnitText } from '@/api/step'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default {
  data () {
    return {
      referenceData: {},
      projectData: {},
      workOrderSerial: '',
      imgFileList: [],
      previewVisible: false,
      previewImage: '',
      intoFactoryData: {},
      refData1: {},
      valveRefData: {},
      actuRefData: {}
    }
  },
  methods: {
    getValveSizeUnitText,
    handleCancel () {
      this.previewVisible = false
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    }
  },
  mounted () {
    if (!this.$store.state.editStepData.stepEditData || this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
      this.$message.warning('当前流程没有保存数据')
      return
    }
    this.projectData = this.$store.state.editStepData.stepEditData.project
    this.intoFactoryData = JSON.parse(this.$store.state.editStepData.stepEditData.step_data[0].JSON)
    if (this.intoFactoryData.uploads) {
        this.imgFileList = this.intoFactoryData.uploads
    }

    // 读baseinfo
    queryStepDataOnlyread({ id: this.intoFactoryData.flow_id, current_step: '(start)' }).then(res => {
      res.result.step_data.forEach(e => {
        // baseinfo
        if (e.DataNum === 1) {
          this.refData1 = JSON.parse(e.JSON)
        }
        // 阀
        if (e.DataNum === 2) {
          this.valveRefData = JSON.parse(e.JSON)
        }
        // 执行机构
        if (e.DataNum === 3) {
          this.actuRefData = JSON.parse(e.JSON)
        }
      })
    })

    // getReferenceIntoFactoryCheck({ FlowID: this.intoFactoryData.flow_id }).then(res => {
    //     for (var i = 0; i < res.data.length; i++) {
    //         const refData = JSON.parse(res.data[i])
    //         if (refData.work_order_serial !== undefined) {
    //             this.workOrderSerial = refData.work_order_serial
    //         }
    //     }
    // })
  }
}
</script>

<style  scoped>
    .red-circle{
        width: 10px;
        height: 10px;
        background-color: red;
        border-radius: 50%;
        display: inline-block;
        margin-right: 5px;
    }
    .green-circle{
        width: 10px;
        height: 10px;
        background-color: greenyellow;
        border-radius: 50%;
        display: inline-block;
        margin-right: 5px;
    }
    .white-circle{
        width: 10px;
        height: 10px;
        background-color: white;
        border-radius: 50%;
        display: inline-block;
        margin-right: 5px;
    }
</style>
