<template>
  <div>
    <a-card :bordered="false" title="执行信息">
      <a-descriptions title="">
        <a-descriptions-item label="执行人">{{ stepUser }}</a-descriptions-item>
        <a-descriptions-item label="结束日期">{{ stepDoneDate }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <br>
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
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <div class="gutter-box">
            <a-divider><div class="linehight">阀体组件<br>Actuator Assembly</div></a-divider>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <div class="gutter-box">
            <a-divider><div class="linehight">定位器<br>Other Accessories</div></a-divider>
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12" >
          <a-descriptions title="" :column="{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }">
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_nameplate_content_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_nameplate_content_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_nameplate_content_yesno!==1 && intoFactoryData.intofc_nameplate_content_yesno!==2" class="white-circle"></div>
              铭牌内容正确
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_nameplate_content_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_studs_nut_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_studs_nut_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_studs_nut_yesno!==1 && intoFactoryData.intofc_studs_nut_yesno!==2" class="white-circle"></div>
              阀盖螺母/栓是否完好
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_studs_nut_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_flange_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_flange_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_flange_yesno!==1 && intoFactoryData.intofc_flange_yesno!==2" class="white-circle"></div>
              法兰面是否损坏
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_flange_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_cracks_on_body_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_cracks_on_body_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_cracks_on_body_yesno!==1 && intoFactoryData.intofc_cracks_on_body_yesno!==2" class="white-circle"></div>
              阀体裂纹
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_cracks_on_body_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_cracks_on_bonnet_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_cracks_on_bonnet_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_cracks_on_bonnet_yesno!==1 && intoFactoryData.intofc_cracks_on_bonnet_yesno!==2" class="white-circle"></div>
              阀盖裂纹
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_cracks_on_bonnet_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_packing_bonnet_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_packing_bonnet_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_packing_bonnet_yesno!==1 && intoFactoryData.intofc_packing_bonnet_yesno!==2" class="white-circle"></div>
              填料压盖是否损坏
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_packing_bonnet_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_flow_direct_arrow_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_flow_direct_arrow_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_flow_direct_arrow_yesno!==1 && intoFactoryData.intofc_flow_direct_arrow_yesno!==2" class="white-circle"></div>
              流向指示箭头完好
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_flow_direct_arrow_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_indicator_scale_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_indicator_scale_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_indicator_scale_yesno!==1 && intoFactoryData.intofc_indicator_scale_yesno!==2" class="white-circle"></div>
              行程指示牌/指针完好
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_indicator_scale_memo }}</span>
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col class="gutter-row" :span="12" >
          <a-descriptions title="" :column="{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }">
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_cracks_on_casing_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_cracks_on_casing_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_cracks_on_casing_yesno!==1 && intoFactoryData.intofc_cracks_on_casing_yesno!==2" class="white-circle"></div>
              壳体裂纹
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_cracks_on_casing_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_mounting_parts_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_mounting_parts_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_mounting_parts_yesno!==1 && intoFactoryData.intofc_mounting_parts_yesno!==2" class="white-circle"></div>
              连接件完好
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_mounting_parts_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_nameplate_logo_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_nameplate_logo_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_nameplate_logo_yesno!==1 && intoFactoryData.intofc_nameplate_logo_yesno!==2" class="white-circle"></div>
              铭牌/标识正确
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_nameplate_logo_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_install_correct_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_install_correct_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_install_correct_yesno!==1 && intoFactoryData.intofc_install_correct_yesno!==2" class="white-circle"></div>
              安装正确
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_install_correct_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_tubing_fittings_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_tubing_fittings_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_tubing_fittings_yesno!==1 && intoFactoryData.intofc_tubing_fittings_yesno!==2" class="white-circle"></div>
              气管及接头完好
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_tubing_fittings_memo }}</span>
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
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <div class="gutter-box">
            <a-divider><div class="linehight">执行机构<br>Actuator Assembly</div></a-divider>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <div class="gutter-box">
            <a-divider><div class="linehight">其他附件<br>Other Accessories</div></a-divider>
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12" >
          <a-descriptions title="" :column="{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }">
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_act_nameplate_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_act_nameplate_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_act_nameplate_yesno!==1 && intoFactoryData.intofc_act_nameplate_yesno!==2" class="white-circle"></div>
              铭牌内容正确
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_act_nameplate_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_act_safety_tag_attached_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_act_safety_tag_attached_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_act_safety_tag_attached_yesno!==1 && intoFactoryData.intofc_act_safety_tag_attached_yesno!==2" class="white-circle"></div>
              安全标志完好
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_act_safety_tag_attached_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_act_vent_cap_attached_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_act_vent_cap_attached_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_act_vent_cap_attached_yesno!==1 && intoFactoryData.intofc_act_vent_cap_attached_yesno!==2" class="white-circle"></div>
              排气帽完好
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_act_vent_cap_attached_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_act_bolts_nuts_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_act_bolts_nuts_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_act_bolts_nuts_yesno!==1 && intoFactoryData.intofc_act_bolts_nuts_yesno!==2" class="white-circle"></div>
              膜盖螺母/栓完好
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_act_bolts_nuts_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_act_cracks_on_yoke_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_act_cracks_on_yoke_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_act_cracks_on_yoke_yesno!==1 && intoFactoryData.intofc_act_cracks_on_yoke_yesno!==2" class="white-circle"></div>
              支架是否断裂
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_act_cracks_on_yoke_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_act_tubing_fittings_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_act_tubing_fittings_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_act_tubing_fittings_yesno!==1 && intoFactoryData.intofc_act_tubing_fittings_yesno!==2" class="white-circle"></div>
              气管及接头完好
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_act_tubing_fittings_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_act_handwheel_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_act_handwheel_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_act_handwheel_yesno!==1 && intoFactoryData.intofc_act_handwheel_yesno!==2" class="white-circle"></div>
              手轮是否完好
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_act_handwheel_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_act_stem_yoke_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_act_stem_yoke_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_act_stem_yoke_yesno!==1 && intoFactoryData.intofc_act_stem_yoke_yesno!==2" class="white-circle"></div>
              连接件/锁紧螺母完好
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_act_stem_yoke_memo }}</span>
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-descriptions title="" :column="{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }">
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_other_filter_begulator_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_other_filter_begulator_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_other_filter_begulator_yesno!==1 && intoFactoryData.intofc_other_filter_begulator_yesno!==2" class="white-circle"></div>
              过滤器和减压阀
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_other_filter_begulator_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_other_solenoid_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_other_solenoid_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_other_solenoid_yesno!==1 && intoFactoryData.intofc_other_solenoid_yesno!==2" class="white-circle"></div>
              电磁阀
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_other_solenoid_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_other_transmitter_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_other_transmitter_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_other_transmitter_yesno!==1 && intoFactoryData.intofc_other_transmitter_yesno!==2" class="white-circle"></div>
              位置变送器
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_other_transmitter_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_other_ip_transducer_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_other_ip_transducer_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_other_ip_transducer_yesno!==1 && intoFactoryData.intofc_other_ip_transducer_yesno!==2" class="white-circle"></div>
              I/P转换器
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_other_ip_transducer_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_other_limit_switch_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_other_limit_switch_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_other_limit_switch_yesno!==1 && intoFactoryData.intofc_other_limit_switch_yesno!==2" class="white-circle"></div>
              位置开关
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_other_limit_switch_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_other_lockup_trip_valve_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_other_lockup_trip_valve_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_other_lockup_trip_valve_yesno!==1 && intoFactoryData.intofc_other_lockup_trip_valve_yesno!==2" class="white-circle"></div>
              保位/切换阀
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_other_lockup_trip_valve_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_other_bybass_valve_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_other_bybass_valve_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_other_bybass_valve_yesno!==1 && intoFactoryData.intofc_other_bybass_valve_yesno!==2" class="white-circle"></div>
              旁路阀
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_other_bybass_valve_memo }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="">
              <div v-if="intoFactoryData.intofc_other_other_yesno===2" class="red-circle"></div>
              <div v-if="intoFactoryData.intofc_other_other_yesno===1" class="green-circle"></div>
              <div v-if="intoFactoryData.intofc_other_other_yesno!==1 && intoFactoryData.intofc_other_other_yesno!==2" class="white-circle"></div>
              其他
              <span style="margin-left:10px;">{{ intoFactoryData.intofc_other_other_memo }}</span>
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
      <a-card :bordered="false" title="上传图片">
        <UploadImgRead ref="uploadImgRead" />
      </a-card>
    </a-card>
  </div>
</template>

<script>
import { queryStepDataOnlyread, getValveSizeUnitText, getStepUser, formatDateYMD } from '@/api/step'
import UploadImgRead from '../modules/UploadImgRead'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default {
  components: {
    UploadImgRead
  },
  data () {
    return {
      referenceData: {},
      projectData: {},
      workOrderSerial: '',
      previewVisible: false,
      previewImage: '',
      intoFactoryData: {},
      refData1: {},
      valveRefData: {},
      actuRefData: {},
      stepUser: '',
      stepDoneDate: ''
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
        this.$refs.uploadImgRead.imgFileList = this.intoFactoryData.uploads
    }
    this.stepUser = getStepUser(this.$store.state.editStepData.stepEditData.users)
    this.stepDoneDate = formatDateYMD(this.$store.state.editStepData.stepEditData.step_done_date)

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
