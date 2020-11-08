<template>
  <div>
    <!-- 调节性 -->
    <a-card title="调节性" :headStyle="{fontWeight:'bold'}">
      <!-- 调节性 -->
      <a-table :columns="inputSignalColumns" :dataSource="inputSignalData" :pagination="false" bordered>
        <template slot="title">
          输入信号
        </template>
      </a-table>
    </a-card>

    <br>

    <!-- 死区 -->
    <a-card title="死区" :headStyle="{fontWeight:'bold'}">
      <a-table :columns="deadBandColumns" :dataSource="deadBandData" :pagination="false" bordered>
        <template slot="title">
          死区
        </template>
      </a-table>
      <br>
      <a-descriptions :column="4">
        <a-descriptions-item label="全开到全关(s)">
          {{ getValveHydrostaticTestTimeUnitText(adjustData.localtor_adjust_deadband_open_to_close, adjustData.localtor_adjust_deadband_open_to_close_unit) }}
        </a-descriptions-item>
        <a-descriptions-item label="全关到全开(s)">
          {{ getValveHydrostaticTestTimeUnitText(adjustData.localtor_adjust_deadband_close_to_open, adjustData.localtor_adjust_deadband_close_to_open_unit) }}
        </a-descriptions-item>
        <a-descriptions-item label="线性">
          {{ adjustData.localtor_adjust_deadband_linearity }}
        </a-descriptions-item>
        <a-descriptions-item label="回差">
          {{ adjustData.localtor_adjust_deadband_hysteresis }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br>

    <!-- 结论 -->
    <a-card title="结论" :headStyle="{fontWeight:'bold'}">
      <a-textarea disabled :rows="5" v-model="adjustData.localtor_adjust_conclustion" />
    </a-card>

    <br>

    <a-card title="工时" :headStyle="{fontWeight:'bold'}">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-descriptions title="工时(min)">
            <a-descriptions-item>
              {{ adjustData.localtor_adjust_total_minute }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
    </a-card>

    <br><br>

    <a-card :bordered="false" title="上传图片">
      <UploadImgRead ref="uploadImgRead" />
    </a-card>
  </div>
</template>

<script>
import UploadImgRead from '../modules/UploadImgRead'
  import { getValveHydrostaticTestTimeUnitText } from '@/api/step'
  import { getInputSignalColumns, getInputSignalData, getDeadBandColumns, getDeadBandData } from '@/api/adjust'

export default {
  components: {
    UploadImgRead
  },
  methods: {
    getValveHydrostaticTestTimeUnitText
  },
  mounted () {
    this.inputSignalColumns.pop()
    this.deadBandColumns.pop()
    if (!this.$store.state.editStepData.stepEditData || this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
      this.$message.warning('当前流程没有保存数据')
      return
    }
    this.adjustData = JSON.parse(this.$store.state.editStepData.stepEditData.step_data[0].JSON)
    this.$refs.uploadImgRead.imgFileList = this.adjustData.uploads
    this.inputSignalData = this.adjustData.inputSignalData
    this.deadBandData = this.adjustData.deadBandData
  },
  data () {
      return {
        adjustData: {},
        inputSignalColumns: getInputSignalColumns(),
        inputSignalData: getInputSignalData(),
        deadBandColumns: getDeadBandColumns(),
        deadBandData: getDeadBandData()
      }
    }
}
</script>

<style>

</style>
