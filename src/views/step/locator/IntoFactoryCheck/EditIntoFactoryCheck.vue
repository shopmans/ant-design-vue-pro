<template>
  <page-header-wrapper>
    <template slot="extra">
      <a-checkbox key="1" v-model="not_applicable" @change="naChange">
        不适用
      </a-checkbox>
    </template>
    <a-card title="入厂检查表 Receivd Condition Checklist" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <a-descriptions title="基本信息" :column="4">
        <a-descriptions-item label="工单号">{{ refData1.work_order_serial }}</a-descriptions-item>
        <a-descriptions-item label="合同号">{{ projectData.contract_serial }}</a-descriptions-item>
        <a-descriptions-item label="客户名称">{{ projectData.customer_name }}</a-descriptions-item>
        <a-descriptions-item label="位号">{{ refData1.tag }}</a-descriptions-item>
        <!-- <a-descriptions-item label="阀门序列号">{{ valveRefData.valve_serial }}</a-descriptions-item>
        <a-descriptions-item label="阀门型号">{{ valveRefData.valve_model }}</a-descriptions-item>
        <a-descriptions-item label="阀门尺寸">{{ getValveSizeUnitText(valveRefData.valve_size, valveRefData.valve_size_unit) }}</a-descriptions-item>
        <a-descriptions-item label="执行机构型号">{{ actuRefData.actu_model }}</a-descriptions-item>
        <a-descriptions-item label="执行机构尺寸">{{ actuRefData.actu_size }}</a-descriptions-item> -->
      </a-descriptions>

      <a-divider>定位器</a-divider>

      <a-form @submit="handleSubmit" :form="form" class="form">
        <!-- 行4 -->
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="4">
            <div class="gutter-box">
              <a-form-item>
                <div class="linehight">壳体裂纹<br>Cracks on Casing</div>
                <a-radio-group :disabled="not_applicable" v-decorator="['intofc_cracks_on_casing_yesno', { }]">
                  <a-radio :value="1">
                    是
                  </a-radio>
                  <a-radio :value="2">
                    否
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item>
                <div class="linehight">备注<br>Remark</div>
                <a-input :disabled="not_applicable" v-decorator="[ 'intofc_cracks_on_casing_memo', {rules: []} ]" />
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="4" :offset="2">
            <div class="gutter-box">
              <a-form-item>
                <div class="linehight">铭牌/标识完整<br>Nameplate Correct</div>
                <a-radio-group :disabled="not_applicable" v-decorator="['intofc_nameplate_logo_yesno', { }]">
                  <a-radio :value="1">
                    是
                  </a-radio>
                  <a-radio :value="2">
                    否
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item>
                <div class="linehight">备注<br>Remark</div>
                <a-input :disabled="not_applicable" v-decorator="[ 'intofc_nameplate_logo_memo', {rules: []} ]" />
              </a-form-item>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="4">
            <div class="gutter-box">
              <a-form-item>
                <div class="linehight">压力表完好<br>Gauge</div>
                <a-radio-group :disabled="not_applicable" v-decorator="['intofc_gauge_yesno', { }]">
                  <a-radio :value="1">
                    是
                  </a-radio>
                  <a-radio :value="2">
                    否
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item>
                <div class="linehight">备注<br>Remark</div>
                <a-input :disabled="not_applicable" v-decorator="[ 'intofc_gauge_memo', {rules: []} ]" />
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="4" :offset="2">
            <div class="gutter-box">
              <a-form-item>
                <div class="linehight">螺钉完好<br>Bolts</div>
                <a-radio-group :disabled="not_applicable" v-decorator="['intofc_bolts_yesno', { }]">
                  <a-radio :value="1">
                    是
                  </a-radio>
                  <a-radio :value="2">
                    否
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item>
                <div class="linehight">备注<br>Remark</div>
                <a-input :disabled="not_applicable" v-decorator="[ 'intofc_bolts_memo', {rules: []} ]" />
              </a-form-item>
            </div>
          </a-col>
        </a-row>

        <!-- 工时 -->
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="工时(min)">
              <a-input-number
                :disabled="not_applicable"
                style="width:100%;"
                :min="0"
                v-decorator="[
                  'localtor_intofactorycheck_total_minute',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 上传图片 -->
        <a-divider />
        <!-- headers 3代表图片 -->
        <div class="clearfix">
          <a-upload
            :disabled="not_applicable"
            name="file"
            action="/api/base-info-upload"
            list-type="picture-card"
            :file-list="imgFileList"
            :before-upload="beforeUpload"
            @preview="handlePreview"
            @change="handleChange"
            :headers="{ QueueType: '3' }"
          >
            <div v-if="imgFileList.length < 80 && !isMobile">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                上传照片
              </div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img :disabled="not_applicable" alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>

        <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
          <a-button htmlType="submit" type="primary">保存</a-button>
          <a-button style="margin-left: 8px" @click="cancelSubmit">返回</a-button>
          <a-button style="margin-left: 38px" @click="handleStepDetail">{{ $t("menu.step.view") }}</a-button>
          <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
        </footer-tool-bar>
      </a-form>
    </a-card>

    <stepAllDetailModel ref="stepAllDetailModel" :flowId="flow_id" :currenStep="current_step" />

  </page-header-wrapper>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'
import { baseMixin } from '@/store/app-mixin'
import { saveIntoFactoryCheck } from '@/api/intoFactoryCheck'
import pick from 'lodash.pick'
import { stepDone, queryStepData, getValveSizeUnitText } from '@/api/step'
import stepDetail from '../../modules/StepBaseInfo'
import stepAllDetailModel from '../../modules/StepAllDetailModel'

  const intoFactoryFields = ['work_order_serial', 'contract_serial', 'customer_name', 'intofc_valve_type', 'intofc_valve_size',
  'intofc_valve_tag', 'intofc_valve_serial', 'intofc_actuator_type', 'intofc_actuator_size', 'intofc_nameplate_content_yesno',
  'intofc_nameplate_content_memo', 'intofc_studs_nut_yesno', 'intofc_intofc_studs_nut_memo', 'intofc_mounting_parts_yesno',
  'intofc_mounting_parts_memo', 'intofc_flange_yesno', 'intofc_flange_memo', 'intofc_nameplate_logo_yesno', 'intofc_nameplate_logo_memo',
  'intofc_cracks_on_body_yesno', 'intofc_cracks_on_body_memo', 'intofc_install_correct_yesno', 'intofc_install_correct_memo',
  'intofc_cracks_on_bonnet_yesno', 'intofc_cracks_on_bonnet_memo', 'intofc_tubing_fittings_yesno', 'intofc_tubing_fittings_memo',
  'intofc_packing_bonnet_yesno', 'intofc_packing_bonnet_memo', 'intofc_gauge_yesno', 'intofc_gauge_memo', 'intofc_flow_direct_arrow_yesno',
  'intofc_flow_direct_arrow_memo', 'intofc_bolts_yesno', 'intofc_bolts_memo', 'intofc_indicator_scale_yesno', 'intofc_indicator_scale_memo',
  'intofc_act_nameplate_yesno', 'intofc_act_nameplate_memo', 'intofc_other_filter_begulator_yesno', 'intofc_other_filter_begulator_memo',
  'intofc_act_safety_tag_attached_yesno', 'intofc_act_safety_tag_attached_memo', 'intofc_other_solenoid_yesno', 'intofc_other_solenoid_memo',
  'intofc_act_vent_cap_attached_yesno', 'intofc_act_vent_cap_attached_memo', 'intofc_other_transmitter_yesno', 'intofc_other_transmitter_memo',
  'intofc_act_bolts_nuts_yesno', 'intofc_act_bolts_nuts_memo', 'intofc_other_ip_transducer_yesno', 'intofc_other_ip_transducer_memo',
  'intofc_act_cracks_on_yoke_yesno', 'intofc_act_cracks_on_yoke_memo', 'intofc_other_limit_switch_yesno', 'intofc_other_limit_switch_memo',
  'intofc_act_tubing_fittings_yesno', 'intofc_act_tubing_fittings_memo', 'intofc_other_lockup_trip_valve_yesno', 'intofc_other_lockup_trip_valve_memo',
  'intofc_act_handwheel_yesno', 'intofc_act_handwheel_memo', 'intofc_other_bybass_valve_yesno', 'intofc_other_bybass_valve_memo', 'intofc_act_stem_yoke_yesno',
  'intofc_act_stem_yoke_memo', 'intofc_other_other_yesno', 'intofc_other_other_memo', 'intofc_remark', 'intofc_cracks_on_casing_yesno', 'intofc_cracks_on_casing_memo',
  'localtor_intofactorycheck_total_minute']

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default {
  mixins: [baseMixin],
  components: {
    FooterToolBar,
    baseMixin,
    stepDetail,
    stepAllDetailModel
  },
  data () {
    return {
      form: this.$form.createForm(this),
      flow_id: '',
      current_step: '',
      baseInfoData: null,
      loading: false,
      imageUrl: '',
      imgFileList: [],
      previewVisible: false,
      previewImage: '',
      refData1: {},
      valveRefData: {},
      actuRefData: {},
      projectData: {},
      not_applicable: false
    }
  },
  mounted () {
    // 防止表单未注册
    intoFactoryFields.forEach(v => this.form.getFieldDecorator(v))
    // 修改数据
    const editData = this.$store.state.editStepData.stepEditData
    this.flow_id = editData.flow_id
    this.current_step = editData.current_step
    this.projectData = editData.project

    // 读baseinfo
    queryStepData({ id: this.flow_id, current_step: '(start)' }).then(res => {
      if (editData.step_data && editData.step_data.length > 0) {
        const intoFactoryData = JSON.parse(editData.step_data[0].JSON)
        this.form.setFieldsValue(pick(intoFactoryData, intoFactoryFields))
        if (intoFactoryData.uploads) {
          this.imgFileList = intoFactoryData.uploads
        }
        this.not_applicable = intoFactoryData.not_applicable
      }

      res.result.step_data.forEach(e => {
        // 查找 baseinfo
        if (e.DataNum === 1) {
          this.refData1 = JSON.parse(e.JSON)
        }
        // 查找阀
        if (e.DataNum === 2) {
          this.valveRefData = JSON.parse(e.JSON)
        }
        // 执行机构
        if (e.DataNum === 3) {
          this.actuRefData = JSON.parse(e.JSON)
        }
      })
    })
  },
  methods: {
    getValveSizeUnitText,
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.flow_id = this.flow_id
          values.current_step = this.current_step
          values.intofc_user_id = this.$store.state.user.info.id
          values.uploads = this.imgFileList
          values.not_applicable = this.not_applicable

          saveIntoFactoryCheck(values).then(res => {
            this.$message.info('保存成功')
          })
        }
      })
    },
    cancelSubmit () {
        this.$router.push({ path: '/step/steplist' })
    },
    handleStepDetail () {
      this.$refs.stepAllDetailModel.showSetpDetailData(this.flow_id, this.current_step)
    },
    handleStepDone () {
      const letThis = this
      this.$confirm({
        title: '结束流程',
        content: '确定要结束流程？',
        okText: '确认',
        cancelText: '取消',
        onOk () {
          stepDone({ id: letThis.flow_id, current_step: letThis.current_step }).then(res => {
              // 刷新表格
              letThis.$message.info('结束流程成功')
              letThis.$router.push({ path: '/step/steplist' })
          })
        }
      })
    },
    handleCancel () {
      this.previewVisible = false
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange (fileObj) {
      let fileList = [...fileObj.fileList]

      // 2. read from response and show file link
      fileList = fileList.map(file => {
          if (file.response) {
            if (file.response.retCode !== 0) {
              this.$notification['error']({
                message: '错误',
                description: file.response.msg,
                duration: 3
              })
              file.status = 'error'
            } else {
              file.md5 = file.response.md5
              file.url = file.response.url
              file.queue_type = '3'
            }
          }

          if (!(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp')) {
            file.status = 'error'
          }
          return file
      })
      this.imgFileList = fileList
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp'
      if (!isJpgOrPng) {
        this.$message.error('只能上传图片文件!')
      }
      return isJpgOrPng
    },
    naChange (e) {
      this.not_applicable = e.target.checked
    }
  }
}
</script>

<style scoped>
.linehight {
  line-height: 20px;
  padding: 0;
  margin:0
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

</style>
