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
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="阀门评估" :forceRender="true" v-if="ValveAS">
        <a-card>
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="6">
              <div class="gutter-box">
                <a-divider>状态</a-divider>
              </div>
            </a-col>
            <a-col class="gutter-row" :span="18">
              <div class="gutter-box">
                <a-divider>维修动作</a-divider>
              </div>
            </a-col>
          </a-row>

          <!-- ==========================================  阀评估 -->
          <template v-for="field in ValveASFields">
            <!-- 首先确定是否有值 -->
            <template v-if="assessmentData[field.state + '_state']">
              <!-- 字段信息 -->
              <a-row :gutter="16" :key="assessmentData[field]">
                <a-col :span="6" :offset="1">
                  {{ field.title }}
                </a-col>
              </a-row>
              <a-row :gutter="16" :key="assessmentData[field]">
                <!-- ####  状态列  #### -->
                <a-col :span="6" :offset="1" >
                  <template>
                    {{ getValvaAssessmentUnit(field.state, assessmentData[field.state + '_state']) }}
                  </template>
                </a-col>
                <!-- ####  评估列  #### -->
                <a-col :span="9">
                  <template v-for="check in getValvaRepairCheckFields(field.state)">
                    <!-- 首先判断repair值是否存在 -->
                    <template v-if="assessmentData[field.state + '_repair'] && assessmentData[field.state + '_repair'].indexOf(check.value) >= 0">
                      <a-badge :key="check.label" style="margin-left:15px;" :offset="[-1,5]">{{ check.label }}</a-badge>
                    </template>
                    <!-- <template v-else>
                      <a-badge :key="check.label" style="margin-left:15px;">{{ check.label }}</a-badge>
                    </template> -->
                  </template>
                </a-col>
                <!-- 备注列 -->
                <a-col :span="6" >
                  <template v-if="assessmentData[field.state + '_memo']">
                    <a-badge :key="assessmentData[field]" >{{ '备注: ' + assessmentData[field.state + '_memo'] }}</a-badge>
                  </template>
                </a-col>
              </a-row>
            </template>
          </template>
        </a-card>
      </a-tab-pane>

      <!-- ==========================================  执行机构评估 -->
      <a-tab-pane key="2" tab="执行机构评估" :forceRender="true" v-if="ActuatorAS">
        <a-card>
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="6">
              <div class="gutter-box">
                <a-divider>状态</a-divider>
              </div>
            </a-col>
            <a-col class="gutter-row" :span="18">
              <div class="gutter-box">
                <a-divider>维修动作</a-divider>
              </div>
            </a-col>
          </a-row>

          <template v-for="field in ActuatorASFields">
            <!-- 首先确定是否有值 -->
            <template v-if="assessmentData[field.state + '_state']">
              <!-- 字段信息 -->
              <a-row :gutter="16" :key="assessmentData[field]">
                <a-col :span="6" :offset="1">
                  {{ field.title }}
                </a-col>
              </a-row>
              <a-row :gutter="16" :key="assessmentData[field]">
                <!-- ####  状态列  #### -->
                <a-col :span="6" :offset="1">
                  <template>
                    {{ getActuatorAssessmentUnit(field.state, assessmentData[field.state + '_state']) }}
                  </template>
                </a-col>
                <!-- ####  评估列  #### -->
                <a-col :span="9">
                  <template v-for="check in getActuatorRepairCheckFields(field.state)">
                    <!-- 首先判断repair值是否存在 -->
                    <template v-if="assessmentData[field.state + '_repair'] && assessmentData[field.state + '_repair'].indexOf(check.value) >= 0">
                      <a-badge :key="check.label" style="margin-left:15px;" :offset="[-1,5]">{{ check.label }}</a-badge>
                    </template>
                    <!-- <template v-else>
                      <a-badge :key="check.label" style="margin-left:15px;">{{ check.label }}</a-badge>
                    </template> -->
                  </template>
                </a-col>
                <!-- 备注列 -->
                <a-col :span="6" >
                  <template v-if="assessmentData[field.state + '_memo']">
                    <a-badge :key="assessmentData[field]" >{{ '备注: ' + assessmentData[field.state + '_memo'] }}</a-badge>
                  </template>
                </a-col>
              </a-row>
            </template>
          </template>
        </a-card>
      </a-tab-pane>

      <!-- ==========================================  附件评估 -->
      <a-tab-pane key="3" tab="附件评估" :forceRender="true" v-if="AccessoryAS">
        <a-card>
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="6">
              <div class="gutter-box">
                <a-divider>状态</a-divider>
              </div>
            </a-col>
            <a-col class="gutter-row" :span="18">
              <div class="gutter-box">
                <a-divider>维修动作</a-divider>
              </div>
            </a-col>
          </a-row>

          <template v-for="field in Accessaries">
            <!-- 首先确定是否有值 -->
            <template v-if="assessmentData[field.state + '_state']">
              <!-- 字段信息 -->
              <a-row :gutter="16" :key="assessmentData[field]">
                <a-col :span="6" :offset="1">
                  {{ field.title }}
                </a-col>
              </a-row>
              <a-row :gutter="16" :key="assessmentData[field]">
                <!-- ####  状态列  #### -->
                <a-col :span="6" :offset="1">
                  <template>
                    {{ getOtherAssessmentUnit(field.state, assessmentData[field.state + '_state']) }}
                  </template>
                </a-col>
                <!-- ####  评估列  #### -->
                <a-col :lg="9">
                  <template v-for="check in getOtherRepairCheckFields(field.state)">
                    <!-- 首先判断repair值是否存在 -->
                    <template v-if="assessmentData[field.state + '_repair'] && assessmentData[field.state + '_repair'].indexOf(check.value) >= 0">
                      <a-badge :key="check.label" style="margin-left:15px;" :offset="[-1,5]">{{ check.label }}</a-badge>
                    </template>
                  </template>
                </a-col>
                <!-- 备注列 -->
                <a-col :lg="6" >
                  <template v-if="assessmentData[field.state + '_memo']">
                    <a-badge :key="assessmentData[field]" >{{ '备注: ' + assessmentData[field.state + '_memo'] }}</a-badge>
                  </template>
                </a-col>
              </a-row>
            </template>
          </template>
        </a-card>
      </a-tab-pane>
    </a-tabs>

    <br><br>
    <!-- 评估内容及结论 -->
    <a-card :bordered="false" title="评估内容及结论">
      <a-descriptions title="">
        <a-descriptions-item label="评估内容及结论">{{ assessmentData.assessment_content }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br><br>

    <!-- 阀检测\维修 -->
    <a-card :bordered="false" title="阀检测\维修">
      <a-descriptions title="">
        <a-descriptions-item label="阀检测\维修">{{ getAssessmentCheckOrRepairUnit(assessmentData.assessment_check_or_repair) }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br><br>

    <!-- 建议更换零部件清单 -->
    <a-card title="建议更换零部件清单">
      <a-table
        :columns="getColumnsPurchasedArray()"
        :dataSource="purchasedParts"
        :pagination="false"
      ></a-table>
    </a-card>

    <br>

    <a-card title="工时" :headStyle="{fontWeight:'bold'}">
      <a-descriptions :column="4">
        <a-descriptions-item label="工时(min)">
          {{ assessmentData.work_time }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br>

    <a-card title="适用" :headStyle="{fontWeight:'bold'}">
      <a-descriptions :column="4">
        <a-descriptions-item label="不适用" v-if="assessmentData.not_applicable">
          是
        </a-descriptions-item>
        <a-descriptions-item label="不适用" v-if="!assessmentData.not_applicable">
          否
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br>

    <!-- 上传文件 -->
    <a-card :bordered="false" title="上传图片">
      <UploadImgRead ref="uploadImgRead" />
    </a-card>

  </div>
</template>

<script>
import { getValveASFields, getActuatorASFields, getAccessariesASFields, getRepairCheckBoxOptions, getActuatorAssessmentUnit,
getAssessmentCheckOrRepairUnit, getActuatorRepairCheckFields, getValvaAssessmentUnit, getValvaRepairCheckFields,
getOtherAssessmentUnit, getOtherRepairCheckFields } from '@/api/assessment'
import UploadImgRead from '../modules/UploadImgRead'
import { getColumnsPurchased, getStepUser, formatDateYMD, queryStepData } from '@/api/step'

export default {
    components: {
        UploadImgRead
    },
    methods: {
      getActuatorAssessmentUnit,
      getAssessmentCheckOrRepairUnit,
      getActuatorRepairCheckFields,
      getValvaAssessmentUnit,
      getValvaRepairCheckFields,
      getOtherAssessmentUnit,
      getOtherRepairCheckFields,
      getColumnsPurchasedArray () {
        // 删除“操作”列
        var tmpObj = getColumnsPurchased()
        return tmpObj.splice(0, tmpObj.length - 1)
      },
      getPurchasedData () {
        if (!this.purchasedParts) {
          return
        }
        let key = 1
        this.purchasedParts.forEach(e => {
          e.key = key
          key++
        })
        return this.purchasedParts
      }
    },
    mounted () {
      if (!this.$store.state.editStepData.stepEditData || this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
        this.$message.warning('当前流程没有保存数据')
        return
      }
      this.stepData = this.$store.state.editStepData.stepEditData
      this.assessmentData = JSON.parse(this.$store.state.editStepData.stepEditData.step_data[0].JSON)
      this.$refs.uploadImgRead.imgFileList = this.assessmentData.uploads
      this.purchasedParts = this.assessmentData.purchased_parts
      this.stepUser = getStepUser(this.$store.state.editStepData.stepEditData.users)
      this.stepDoneDate = formatDateYMD(this.$store.state.editStepData.stepEditData.step_done_date)

      // 获取引用数据（维修前测试选择的维修东东）
      // 先选择了维修什么才需要评估
      queryStepData({ id: this.assessmentData.flow_id, current_step: '(start)' }).then(res => {
        res.result.step_data.forEach(stepItem => {
          switch (stepItem.DataNum) {
            case 1: // 基本信息
              this.baseInfo = JSON.parse(stepItem.JSON)
              break
          }
        })
        // 阀门 "1"
        // 执行机构 "2"
        // 阀门+执行机构 "3"
        // 阀门+执行机构+附件 "4"
        // 零部件 "5"
        // 执行机构+附件 "6"
        switch (this.baseInfo.repair_part) { // 与 baseInfo 选择的维修部件下拉列表一致
          case '1': { // 阀门维修
            this.ValveAS = true
            break
          }
          case '2': { // 执行机构维修
            this.ActuatorAS = true
            break
          }
          case '3': { // 阀门+执行机构
            this.ValveAS = true
            this.ActuatorAS = true
            break
          }
          case '4': { // 阀门+执行机构+附件
            this.ValveAS = true
            this.ActuatorAS = true
            this.AccessoryAS = true
            break
          }
          case '6': { // 执行机构+附件
            this.AccessoryAS = true
            this.ActuatorAS = true
            break
          }
        }
      })
    },
    data () {
      return {
        assessmentData: {},
        ValveASFields: getValveASFields(),
        ActuatorASFields: getActuatorASFields(),
        Accessaries: getAccessariesASFields(),
        repairCheckFields: getRepairCheckBoxOptions(),
        AccessoryAS: false,
        ActuatorAS: false,
        ValveAS: false,
        purchasedParts: [],
        stepUser: '',
        stepDoneDate: '',
        stepData: {},
        baseInfo: {}
      }
    }
}
</script>

<style>

</style>
