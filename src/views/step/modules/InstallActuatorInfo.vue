<template>
  <div>
    <a-card :bordered="false" title="执行信息">
      <a-descriptions title="">
        <a-descriptions-item label="执行人">{{ stepUser }}</a-descriptions-item>
        <a-descriptions-item label="结束日期">{{ stepDoneDate }}</a-descriptions-item>
        <a-descriptions-item label="总工时">{{ stepData.work_time_all }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <br>
    <a-card title="安装执行机构" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <a-row :gutter="16">
        <a-descriptions title="">
          <a-descriptions-item label="阀行程">
            {{ getValveSizeUnitText(valveData.valve_travel, valveData.valve_travel_unit) }}
          </a-descriptions-item>
          <a-descriptions-item label="故障失效">
            {{ getActuFailureUnit(actuData.actu_failure) }}
          </a-descriptions-item>
        </a-descriptions>
      </a-row>
      <a-divider></a-divider>
      <a-row>
        <a-descriptions>
          <a-descriptions-item label="阀门实际行程">
            {{ getValveSizeUnitText(installActuatorData.install_actuator_valve_real_travel, installActuatorData.install_actuator_valve_real_travel_unit) }}
          </a-descriptions-item>
          <a-descriptions-item label="阀门实际故障位置">
            {{ getInstallActuatorValveRealFailPointUnit(installActuatorData.install_actuator_valve_real_fail_point) }}
          </a-descriptions-item>
        </a-descriptions>
      </a-row>
    </a-card>

    <br>

    <a-card title="工时" :headStyle="{fontWeight:'bold'}">
      <a-descriptions :column="4">
        <a-descriptions-item label="工时(min)">
          {{ installActuatorData.install_actuator_total_minute }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br>

    <a-card title="适用" :headStyle="{fontWeight:'bold'}">
      <a-descriptions :column="4">
        <a-descriptions-item label="不适用" v-if="installActuatorData.not_applicable">
          是
        </a-descriptions-item>
        <a-descriptions-item label="不适用" v-if="!installActuatorData.not_applicable">
          否
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br>

    <a-card :bordered="false" title="上传图片">
      <UploadImgRead ref="uploadImgRead" />
    </a-card>
  </div>
</template>

<script>
  import UploadImgRead from '../modules/UploadImgRead'
  import { queryStepData, getValveSizeUnitText, getActuFailureUnit, getInstallActuatorValveRealFailPointUnit,
  getStepUser, formatDateYMD } from '@/api/step'

export default {
  components: {
    UploadImgRead
  },
  methods: {
    getValveSizeUnitText,
    getActuFailureUnit,
    getInstallActuatorValveRealFailPointUnit
  },
  mounted () {
    if (!this.$store.state.editStepData.stepEditData || this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
      this.$message.warning('当前流程没有保存数据')
      return
    }
    this.stepData = this.$store.state.editStepData.stepEditData
    this.installActuatorData = JSON.parse(this.$store.state.editStepData.stepEditData.step_data[0].JSON)
    this.$refs.uploadImgRead.imgFileList = this.installActuatorData.uploads
    this.stepUser = getStepUser(this.$store.state.editStepData.stepEditData.users)
    this.stepDoneDate = formatDateYMD(this.$store.state.editStepData.stepEditData.step_done_date)

    queryStepData({ id: this.installActuatorData.flow_id, current_step: '(start)' }).then(res => {
      const tmpStepDate = res.result.step_data
      if (tmpStepDate && tmpStepDate.length > 0) {
        tmpStepDate.forEach(e => {
          // 查找阀信息
          if (e.DataNum === 2) {
            this.valveData = JSON.parse(e.JSON)
          }
          // 查找执行机构信息
          if (e.DataNum === 3) {
            this.actuData = JSON.parse(e.JSON)
          }
        })
      }
    })
  },
  data () {
      return {
        installActuatorData: {},
        valveData: {},
        actuData: {},
        stepUser: '',
        stepDoneDate: '',
        stepData: {}
      }
    }
}
</script>

<style>

</style>
