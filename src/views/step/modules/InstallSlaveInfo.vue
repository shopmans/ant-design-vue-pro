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
    <a-card title="安装附件" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <a-descriptions title="">
        <a-descriptions-item label="故障位置">
          {{ getValvePushDoneUnit(actuData.actu_failure) }}
        </a-descriptions-item>
      </a-descriptions>
      <br>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-descriptions title="安装附件日期">
            <a-descriptions-item>
              {{ installSlaveData.install_slave_date | moment }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="8">
          <a-descriptions title="工时(min)">
            <a-descriptions-item>
              {{ installSlaveData.install_slave_total_minute }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
    </a-card>

    <br>

    <a-card title="配制气源管" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <a-descriptions title="">
        <a-descriptions-item label="故障位置">
          {{ getValvePushDoneUnit(actuData.actu_failure) }}
        </a-descriptions-item>
      </a-descriptions>
      <br>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-descriptions title="安装气源管日期">
            <a-descriptions-item>
              {{ installSlaveData.install_source_date | moment }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="8">
          <a-descriptions title="工时(min)">
            <a-descriptions-item>
              {{ installSlaveData.install_source_total_minute }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
    </a-card>

    <br>

    <a-card title="适用" :headStyle="{fontWeight:'bold'}">
      <a-descriptions :column="4">
        <a-descriptions-item label="不适用" v-if="actuData.not_applicable">
          是
        </a-descriptions-item>
        <a-descriptions-item label="不适用" v-if="!actuData.not_applicable">
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
import { queryStepDataOnlyread, getValveSizeUnitText, getValvePushDoneUnit, getStepUser, formatDateYMD } from '@/api/step'

export default {
  components: {
    UploadImgRead
  },
  mounted () {
    if (!this.$store.state.editStepData.stepEditData || this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
      this.$message.warning('当前流程没有保存数据')
      return
    }
    this.stepData = this.$store.state.editStepData.stepEditData
    this.installSlaveData = JSON.parse(this.$store.state.editStepData.stepEditData.step_data[0].JSON)
    this.$refs.uploadImgRead.imgFileList = this.installSlaveData.uploads
    const editData = this.$store.state.editStepData.stepEditData
    this.stepUser = getStepUser(this.$store.state.editStepData.stepEditData.users)
    this.stepDoneDate = formatDateYMD(this.$store.state.editStepData.stepEditData.step_done_date)

    queryStepDataOnlyread({ id: editData.flow_id, current_step: '(start)' }).then(res => {
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
  methods: {
    getValveSizeUnitText,
    getValvePushDoneUnit
  },
  data () {
      return {
        installSlaveData: {},
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
