<template>
  <div>
    <template v-if="rowoptions.state.indexOf('break') === 0">
      <a-divider v-if="getShowBreak(rowoptions)">{{ rowoptions.title }}</a-divider>
    </template>
    <template v-else>
      <template v-if="showOtherRow">
        <div class="linehight">{{ rowoptions.title }}</div>
        <a-row :gutter="24">
          <a-col :span="4">
            <a-form-item>
              <a-select :disabled="disableAll || isDone" v-decorator="[ stateString, {}]" :allowClear="true">
                <a-select-option v-for="item in getSelectItem(rowoptions.state)" :value="item.key" :key="item.key">
                  {{ item.text }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="14">
            <a-form-item>
              <a-checkbox-group :disabled="disableAll || isDone" v-decorator="[repairString, { }]" :options="getCheckBoxOptions(rowoptions.state)" />
            </a-form-item>
          </a-col>
          <a-col :span="6" >
            <a-form-item>
              <a-input :disabled="disableAll || isDone" placeholder="备注" v-decorator="[memoString, { }]" :options="checkBoxOptions" />
            </a-form-item>
          </a-col>
        </a-row>
      </template>
    </template>
  </div>
</template>

<script>
import { getOtherSlaveSelectArea } from '@/api/step'
import { isSelectAreaOtherAccessaries, getRepairCheckBoxOptions, getAssessmentSelectItem,
getCasingPistonSelectItem, getCasingPistonCheckBoxOptions, getActuatorSelectItem, getActuatorCheckBoxOptions,
getCylinderSelectItem, getCylinderCheckBoxOptions,
getDiaphramSelectItem, getDiaphramCheckBoxOptions,
getSpringSelectItem, getSpringCheckBoxOptions,
getStemShaftSelectItem, getStemShaftCheckBoxOptions,
getYokeSelectItem, getYokeCheckBoxOptions,
getSealsOringsSelectItem, getSealsOringsCheckBoxOptions,
getBushingSelectItem, getBushingCheckBoxOptions, getIpTransducerCheckBoxOptions,
getHandwheelSelectItem, getHandwheelCheckBoxOptions,
getBoltsSelectItem, getBoltsCheckBoxOptions, getValveBushingBearingSelectItem,
getClampCouplingSelectItem, getClampCouplingCheckBoxOptions,
getNameplateTaggingSelectItem, getNameplateTaggingCheckBoxOptions,
getValveSelectItem, getValveCheckBoxOptions, getValveCageGuideRetCheckBoxOptions,
getValvaStemShaftSelectItem, getValveStemShaftCheckBoxOptions,
getAccessariesSelectItem, getAccessariesCheckBoxOptions,
getOtherAccessariesSelectItem, getOtherAccessariesCheckBoxOptions,
getValveDefaultCheckBoxOptions, getValvePackingBoxCheckBoxOptions, getValvePackingBoxSelectItem,
getValveBoltCheckBoxOptions, getValveBoltSelectItem, getValvaDefaultSelectItem,
getFlangesSelectItem, getFlangCheckBoxOpions, getPositionerCheckBoxOptions,
getValveSeatSelectItem, getValvePlugBallDiscCheckBoxOptions } from '@/api/assessment'

export default {
  props: {
    rowoptions: {
        type: Object,
        default: null
    },
    selectArea: {
      type: Array,
      default: null
    },
    otherSelectArea: {
      type: Array,
      default: null
    },
    disableAll: {
      type: Boolean,
      default: false
    },
    isDone: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getOtherSlaveSelectArea,
    isSelectAreaOtherAccessaries,
    // ////////////////////////////////////////// 执行机购
    getActuatorSelectItem, // 维修动作 - Actuator（执行机构）
    getActuatorCheckBoxOptions, // 状态下拉选项 - Actuator（执行机构）
    getCasingPistonSelectItem, // 状态下拉选项 - Casing/Piston(膜盖/活塞)
    getCasingPistonCheckBoxOptions, // 维修动作  - Casing/Piston(膜盖/活塞)
    getCylinderSelectItem, // 状态下拉选项 - Cylinder(气缸)
    getCylinderCheckBoxOptions, // 维修动作  - Cylinder(气缸)
    getDiaphramSelectItem, // 状态下拉选项 - Diaphram (膜片)
    getDiaphramCheckBoxOptions, // 维修动作 - Diaphram (膜片)
    getSpringSelectItem, // 状态下拉选项 - spring(弹簧）
    getSpringCheckBoxOptions, // 维修动作 - spring(弹簧）
    getStemShaftSelectItem, // 状态下拉选项 - Stem/Shaft(推杆/轴)
    getStemShaftCheckBoxOptions, // 维修动作 - Stem/Shaft(推杆/轴)
    getYokeSelectItem, // 状态下拉选项 - Yoke(支架)
    getYokeCheckBoxOptions, // 维修动作 - Yoke(支架)
    getSealsOringsSelectItem, // 状态下拉选项 - Seals/Orings(密封件/O型环)
    getSealsOringsCheckBoxOptions, // 维修动作 - Seals/Orings(密封件/O型环)
    getBushingSelectItem, // 状态下拉选项 - Bushing/衬套
    getBushingCheckBoxOptions, // 维修动作 - Bushing/衬套
    getHandwheelSelectItem, // 状态下拉选项 - Handwheel（手轮机构）
    getHandwheelCheckBoxOptions, // 维修动作 - Handwheel（手轮机构）
    getBoltsSelectItem, // 状态下拉选项 - Bolts(螺栓)
    getBoltsCheckBoxOptions, // 维修动作 - Bolts(螺栓)
    getClampCouplingSelectItem, // 状态下拉选项 - Clamp/Coupling/level(夹块/联轴器/曲轴）
    getClampCouplingCheckBoxOptions, // 维修动作 - Clamp/Coupling/level(夹块/联轴器/曲轴）
    getNameplateTaggingSelectItem, // 状态下拉选项 - Nameplate/Tagging(铭牌/标示牌)
    getNameplateTaggingCheckBoxOptions, // 维修动作 - Nameplate/Tagging(铭牌/标示牌)
    // ////////////////////////////////////////// 阀
    getValveSelectItem, // 阀-状态下拉选项
    getValveCheckBoxOptions, // 阀-维修动作
    getFlangesSelectItem, // 阀-状态下拉-法兰
    getFlangCheckBoxOpions, // 阀-维修动作-法兰
    getValveSeatSelectItem, // 阀-状态下拉-阀座
    getValvaDefaultSelectItem, // 阀-状态下拉-默认评估
    getValvaStemShaftSelectItem, // 阀-状态下拉选项-Stem/Shaft（阀杆/轴）
    getValveStemShaftCheckBoxOptions, // 阀-维修动作-Stem/Shaft（阀杆/轴）
    getValveDefaultCheckBoxOptions, // 阀-维修动作-默认动作
    getValvePackingBoxSelectItem, // 阀-状态下拉-填料函
    getValvePackingBoxCheckBoxOptions, // 阀-维修动作-填料函
    getValveBoltSelectItem, // 阀-状态下拉-螺栓
    getValveBoltCheckBoxOptions, // 阀-维修动作-螺栓
    getValvePlugBallDiscCheckBoxOptions, // 阀门评估-维修动作-阀芯/球/蝶板
    getValveCageGuideRetCheckBoxOptions, // 阀门评估-维修动作-阀笼/导向/保持环
    getValveBushingBearingSelectItem, // 阀-状态下拉-衬套/轴承
    // ////////////////////////////////////////// 附件
    getPositionerCheckBoxOptions, // 状态下拉选项 - Positioner（定位器）
    getIpTransducerCheckBoxOptions, // 状态下拉选项 - I/P Transducer（电气转换器）
    getAccessariesSelectItem,
    getAccessariesCheckBoxOptions,
    getOtherAccessariesSelectItem,
    getOtherAccessariesCheckBoxOptions,
    // ///////////////////////////////////////////////////////////////////// 状态
    getSelectItem (row) {
      this.showOtherRow = true
      switch (row) {
        // ////////////////////////////////////////// 执行机购
        // Actuator（执行机构）
        case 'actuator': {
          return getActuatorSelectItem()
        }
        // Casing/Piston(膜盖/活塞)
        case 'actuator_casing_tiston': {
          return getCasingPistonSelectItem()
        }
        // Cylinder(气缸)
        case 'actuator_cylinder': {
          return getCylinderSelectItem()
        }
        // Diaphram (膜片)
        case 'actuator_diaphragm': {
          return getDiaphramSelectItem()
        }
        // spring(弹簧）
        case 'actuator_spring': {
          return getSpringSelectItem()
        }
        // Stem/Shaft(推杆/轴)
        case 'actuator_stem_shaft': {
          return getStemShaftSelectItem()
        }
        // Yoke（支架)
        case 'actuator_yoke': {
          return getYokeSelectItem()
        }
        // Seals/Orings(密封件/O型环)
        case 'actuator_seals_orings': {
          return getSealsOringsSelectItem()
        }
        // Bushing/衬套
        case 'actuator_bushing': {
          return getBushingSelectItem()
        }
        // Handwheel（手轮机构）
        case 'actuator_handwheel': {
          return getHandwheelSelectItem()
        }
        // Bolting（螺栓）
        case 'actuator_bolting': {
          return getBoltsSelectItem()
        }
        // Clamp/Coupling/level(夹块/联轴器/曲轴）
        case 'actuator_clamp_oupling': {
          return getClampCouplingSelectItem()
        }
        // Nameplate/Tagging(铭牌/标示牌)
        case 'actuator_tagging': {
          return getNameplateTaggingSelectItem()
        }
        // ////////////////////////////////////////// 阀
        case 'valve_body':
          return getValvaDefaultSelectItem()
        case 'valve_flanges':
        case 'valve_gasket_surface':
          return getFlangesSelectItem()
        case 'valve_seat_area':
          return getValveSeatSelectItem()
        case 'valve_bonnet':
          return getValvaDefaultSelectItem()
        case 'valve_packing_box':
          return getValvePackingBoxSelectItem()
        case 'valve_plug_ball_disc':
        case 'valve_cage_guide_ret':
        case 'valve_seat_ring':
        case 'valve_seal_piston_ring':
        case 'valve_stem_shaft': {
          return getValvaDefaultSelectItem()
        }
        case 'valve_bushing_bearing':
          return getValveBushingBearingSelectItem()
        // Bolting（螺栓）
        case 'valve_bolting': {
          return getValveBoltSelectItem()
        }
        // ////////////////////////////////////////// 附件
        case 'break3':
        case 'accessaries_positioner':
        case 'accessaries_amplifier':
        case 'accessaries_ip_transducer':
        case 'accessaries_pwb':
        case 'accessaries_housing':
        case 'accessaries_pressure_gauge':
        case 'accessaries_terminal':
        case 'accessaries_feedback': {
          if (this.selectArea.indexOf('1') >= 0) {
            return getAccessariesSelectItem()
          } else {
            this.showOtherRow = false
          }
          break
        }
        case 'accessaries_airset':
        case 'accessaries_solenoid':
        case 'accessaries_limitswitch':
        case 'accessaries_lockup_trip_valve':
        case 'accessaries_other': {
          // 其它附件已在新建工单处选择（selectarea）
          if (isSelectAreaOtherAccessaries(row, this.selectArea, getOtherSlaveSelectArea())) {
            return getOtherAccessariesSelectItem()
          }
          this.showOtherRow = false
          break
        }
      }

      return this.selectItems
    },
    // ///////////////////////////////////////////////////////////////////////////////// 维修动作
    getCheckBoxOptions (row) {
      switch (row) {
        // ////////////////////////////////////////// 执行机购
        // Actuator（执行机构）
        case 'actuator': {
          return getActuatorCheckBoxOptions()
        }
        // Casing/Piston(膜盖/活塞)
        case 'actuator_casing_tiston': {
          return getCasingPistonCheckBoxOptions()
        }
        // Cylinder(气缸)
        case 'actuator_cylinder': {
          return getCylinderCheckBoxOptions()
        }
        // Diaphram (膜片)
        case 'actuator_diaphragm': {
          return getDiaphramCheckBoxOptions()
        }
        // spring(弹簧）
        case 'actuator_spring': {
          return getSpringCheckBoxOptions()
        }
        // Stem/Shaft(推杆/轴)
        case 'actuator_stem_shaft': {
          return getStemShaftCheckBoxOptions()
        }
        // Yoke（支架)
        case 'actuator_yoke': {
          return getYokeCheckBoxOptions()
        }
        // Seals/Orings(密封件/O型环)
        case 'actuator_seals_orings': {
          return getSealsOringsCheckBoxOptions()
        }
        // Bushing/衬套
        case 'actuator_bushing': {
          return getBushingCheckBoxOptions()
        }
        // Handwheel（手轮机构）
        case 'actuator_handwheel': {
          return getHandwheelCheckBoxOptions()
        }
        // Bolting（螺栓）
        case 'actuator_bolting': {
          return getBoltsCheckBoxOptions()
        }
        // Clamp/Coupling/level(夹块/联轴器/曲轴）
        case 'actuator_clamp_oupling': {
          return getClampCouplingCheckBoxOptions()
        }
        // Nameplate/Tagging(铭牌/标示牌)
        case 'actuator_tagging': {
          return getNameplateTaggingCheckBoxOptions()
        }
        // ////////////////////////////////////////// 阀
        case 'valve_body':
          return getValveCheckBoxOptions()
        case 'valve_flanges':
        case 'valve_gasket_surface':
        case 'valve_seat_area':
          return getFlangCheckBoxOpions()
        case 'valve_bonnet':
          return getValveCheckBoxOptions()
        case 'valve_bolting':
          return getValveBoltCheckBoxOptions()
        case 'valve_packing_box':
          return getValvePackingBoxCheckBoxOptions()
        case 'valve_plug_ball_disc':
          return getValvePlugBallDiscCheckBoxOptions()
        case 'valve_cage_guide_ret':
          return getValveCageGuideRetCheckBoxOptions()
        case 'valve_seat_ring':
        case 'valve_seal_piston_ring':
          return getValvePlugBallDiscCheckBoxOptions()
        case 'valve_bushing_bearing': {
          return getValvePlugBallDiscCheckBoxOptions()
        }
        // Stem/Shaft（阀杆/轴）
        case 'valve_stem_shaft': {
          return getValveStemShaftCheckBoxOptions()
        }
        // ////////////////////////////////////////// 附件
        case 'accessaries_positioner':
          return getPositionerCheckBoxOptions()
        case 'accessaries_amplifier':
        case 'accessaries_pwb':
        case 'accessaries_housing':
        case 'accessaries_pressure_gauge':
        case 'accessaries_terminal':
        case 'accessaries_feedback': {
          if (this.selectArea.indexOf('1') >= 0) {
            return getOtherAccessariesCheckBoxOptions()
          }
          return
        }
        case 'accessaries_ip_transducer':
          return getIpTransducerCheckBoxOptions()
        // 其它附件
        case 'accessaries_airset':
        case 'accessaries_solenoid':
        case 'accessaries_lockup_trip_valve':
        case 'accessaries_other': {
          return getOtherAccessariesCheckBoxOptions()
        }
        case 'accessaries_limitswitch':
          return getPositionerCheckBoxOptions()
      }

      return this.checkBoxOptions
    },
    getShowBreak (opt) {
      if (opt.state.indexOf('break3') === 0) { // 定位器
        return this.selectArea.indexOf('1') >= 0
      }
      if (opt.state.indexOf('break6') === 0) { // 过滤减压阀
        return this.selectArea.indexOf('2') >= 0
      }
      if (opt.state.indexOf('break7') === 0) { // 电磁阀
        return this.selectArea.indexOf('3') >= 0
      }
      if (opt.state.indexOf('break8') === 0) { // 位置开关
        return this.selectArea.indexOf('4') >= 0
      }
      if (opt.state.indexOf('break9') === 0) { // 保位/切换阀
        return this.selectArea.indexOf('5') >= 0
      }
      if (opt.state.indexOf('break4') === 0) { // 其它附件
        return this.selectArea.indexOf('6') >= 0
      }

      return true
    }
  },
  mounted () {
    this.stateString = this.rowoptions.state + '_state'
    this.repairString = this.rowoptions.state + '_repair'
    this.memoString = this.rowoptions.state + '_memo'

    if (this.rowoptions.state === 'valve_stem_shaft') {
      this.selectItems.splice(15, 1)
      return
    }
    if (this.rowoptions.state === 'valve_bolting') {
      this.checkBoxOptions.splice(11, 1)
      this.selectItems.splice(14, 1)
      return
    }
    // checkbox
    this.checkBoxOptions.splice(11, 1)
    // 状态select
    this.selectItems.splice(14, 1)
    this.selectItems.splice(14, 1)
  },
  data () {
    return {
      checkBoxOptions: getRepairCheckBoxOptions(),
      stateString: '',
      repairString: '',
      memoString: '',
      selectItems: getAssessmentSelectItem(),
      showOtherRow: true
    }
  }
}
</script>

<style scoped>
.linehight {
  line-height: 15px;
  padding: 0;
  margin:0
}

</style>
