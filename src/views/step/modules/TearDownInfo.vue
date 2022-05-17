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
    <a-tabs default-active-key="1" @change="handleTabChange">
      <!-- 阀门拆解 -->
      <a-tab-pane key="1" tab="阀门拆解" v-if="ValveTD">
        <a-card :bordered="false" :headStyle="{fontWeight:'bold'}">
          <a-row class="form-row" :gutter="16">
            <a-col :lg="6" :md="12" :sm="24">
              <a-descriptions title="">
                <a-descriptions-item label="工时(min)">{{ TearDownData.teardown_valve_total_minute }}</a-descriptions-item>
              </a-descriptions>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :span="24">
              <a-descriptions title="">
                <a-descriptions-item label="拆解工作及发现问题">{{ TearDownData.teardown_valve_content }}</a-descriptions-item>
              </a-descriptions>
            </a-col>
          </a-row>
        </a-card>
      </a-tab-pane>
      <!-- 执行机构拆解 -->
      <a-tab-pane key="2" tab="执行机构拆解" v-if="ActuatorTD">
        <a-card :bordered="false" title="" :headStyle="{fontWeight:'bold'}">
          <a-row class="form-row" :gutter="16">
            <a-col :lg="6" :md="12" :sm="24">
              <a-descriptions title="">
                <a-descriptions-item label="工时(min)">{{ TearDownData.teardown_actuator_total_minute }}</a-descriptions-item>
              </a-descriptions>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :span="24">
              <a-descriptions title="">
                <a-descriptions-item label="拆解工作及发现问题">{{ TearDownData.teardown_actuator_content }}</a-descriptions-item>
              </a-descriptions>
            </a-col>
          </a-row>
        </a-card>
      </a-tab-pane>
      <!-- 附件折解 -->
      <a-tab-pane key="3" tab="附件折解" v-if="AccessoryTD">
        <a-card :bordered="false" :headStyle="{fontWeight:'bold'}">
          <a-row class="form-row" :gutter="16">
            <a-col :lg="6" :md="12" :sm="24">
              <a-descriptions title="">
                <a-descriptions-item label="工时(min)">{{ TearDownData.teardown_accessory_total_minute }}</a-descriptions-item>
              </a-descriptions>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :span="24">
              <a-descriptions title="">
                <a-descriptions-item label="拆解工作及发现问题">{{ TearDownData.teardown_accessory_content }}</a-descriptions-item>
              </a-descriptions>
            </a-col>
          </a-row>
        </a-card>
      </a-tab-pane>
    </a-tabs>
    <br><br>
    <a-card title="适用" :headStyle="{fontWeight:'bold'}">
      <a-descriptions :column="4">
        <a-descriptions-item label="不适用" v-if="TearDownData.not_applicable">
          是
        </a-descriptions-item>
        <a-descriptions-item label="不适用" v-if="!TearDownData.not_applicable">
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
import { getStepUser, formatDateYMD, queryStepData } from '@/api/step'

export default {
    components: {
      UploadImgRead
    },
    data () {
      return {
        AccessoryTD: false,
        ActuatorTD: false,
        ValveTD: false,
        TearDownData: {},
        SeatLeakTestStdValue: '',
        stepUser: '',
        stepDoneDate: '',
        stepData: {},
        baseInfo: {}
      }
    },
    methods: {
      handleTabChange (activeKey) {
        // 上传图片的flag正好等于tab-panel的key
        this.$refs.uploadImgRead.showFlagImage(activeKey)
      }
    },
    mounted () {
      if (!this.$store.state.editStepData.stepEditData || this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
        this.$message.warning('当前流程没有保存数据')
        return
      }
      // 修改数据
      this.stepData = this.$store.state.editStepData.stepEditData
      this.TearDownData = JSON.parse(this.$store.state.editStepData.stepEditData.step_data[0].JSON)
      queryStepData({ id: this.$store.state.editStepData.stepEditData.flow_id, current_step: '(start)' }).then(res => {
        res.result.step_data.forEach(stepItem => {
          switch (stepItem.DataNum) {
            case 1: // 基本信息
              this.baseInfo = JSON.parse(stepItem.JSON)
              break
          }
        })
        this.stepUser = getStepUser(this.$store.state.editStepData.stepEditData.users)
        this.stepDoneDate = formatDateYMD(this.$store.state.editStepData.stepEditData.step_done_date)
        // 阀门 "1"
        // 执行机构 "2"
        // 阀门+执行机构 "3"
        // 阀门+执行机构+附件 "4"
        // 零部件 "5"
        // 执行机构+附件 "6"
        switch (this.baseInfo.repair_part) { // 与 baseInfo 选择的维修部件下拉列表一致
          case '1': { // 阀门维修
            this.ValveTD = true
            break
          }
          case '2': { // 执行机构维修
            this.ActuatorTD = true
            break
          }
          case '3': { // 阀门+执行机构
            this.ValveTD = true
            this.ActuatorTD = true
            break
          }
          case '4': { // 阀门+执行机构+附件
            this.ValveTD = true
            this.ActuatorTD = true
            this.AccessoryTD = true
            break
          }
          case '6': { // 执行机构+附件
            this.AccessoryTest = true
            this.ActuatorTD = true
            break
          }
        }

        this.$refs.uploadImgRead.imgFileList = this.TearDownData.uploads
        this.$nextTick(() => {
          this.$refs.uploadImgRead.showFlagImage('1')
        })
      })
  }
}
</script>

<style >
</style>
