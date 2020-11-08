<template>
  <div>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="阀门评估" :forceRender="true" v-if="ValveAS">
        <a-card>
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="4">
              <div class="gutter-box">
                <a-divider>状态</a-divider>
              </div>
            </a-col>
            <a-col class="gutter-row" :span="20">
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
                {{ field.title }}
              </a-row>
              <a-row :gutter="16" :key="assessmentData[field]">
                <!-- ####  状态列  #### -->
                <a-col :span="4">
                  <template>
                    {{ getAssessmentUnit(assessmentData[field.state + '_state']) }}
                  </template>
                </a-col>
                <!-- ####  评估列  #### -->
                <a-col :span="14">
                  <template v-for="check in repairCheckFields">
                    <!-- 首先判断repair值是否存在 -->
                    <template v-if="assessmentData[field.state + '_repair'] && assessmentData[field.state + '_repair'].indexOf(check.value) >= 0">
                      <a-badge status="success" :key="check.label" style="margin-left:15px;" :offset="[-1,5]">{{ check.label }}</a-badge>
                    </template>
                    <template v-else>
                      <a-badge :key="check.label" style="margin-left:15px;">{{ check.label }}</a-badge>
                    </template>
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
            <a-col class="gutter-row" :span="4">
              <div class="gutter-box">
                <a-divider>状态</a-divider>
              </div>
            </a-col>
            <a-col class="gutter-row" :span="20">
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
                {{ field.title }}
              </a-row>
              <a-row :gutter="16" :key="assessmentData[field]">
                <!-- ####  状态列  #### -->
                <a-col :span="4">
                  <template>
                    {{ getAssessmentUnit(assessmentData[field.state + '_state']) }}
                  </template>
                </a-col>
                <!-- ####  评估列  #### -->
                <a-col :span="14">
                  <template v-for="check in repairCheckFields">
                    <!-- 首先判断repair值是否存在 -->
                    <template v-if="assessmentData[field.state + '_repair'] && assessmentData[field.state + '_repair'].indexOf(check.value) >= 0">
                      <a-badge status="success" :key="check.label" style="margin-left:15px;" :offset="[-1,5]">{{ check.label }}</a-badge>
                    </template>
                    <template v-else>
                      <a-badge :key="check.label" style="margin-left:15px;">{{ check.label }}</a-badge>
                    </template>
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
      <a-tab-pane key="3" tab="附件功能测试" :forceRender="true" v-if="AccessoryAS">
        <a-card>
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="4">
              <div class="gutter-box">
                <a-divider>状态</a-divider>
              </div>
            </a-col>
            <a-col class="gutter-row" :span="20">
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
                {{ field.title }}
              </a-row>
              <a-row :gutter="16" :key="assessmentData[field]">
                <!-- ####  状态列  #### -->
                <a-col :lg="4">
                  <template>
                    {{ getAssessmentUnit(assessmentData[field.state + '_state']) }}
                  </template>
                </a-col>
                <!-- ####  评估列  #### -->
                <a-col :lg="14">
                  <template v-for="check in repairCheckFields">
                    <!-- 首先判断repair值是否存在 -->
                    <template v-if="assessmentData[field.state + '_repair'] && assessmentData[field.state + '_repair'].indexOf(check.value) >= 0">
                      <a-badge status="success" :key="check.label" style="margin-left:15px;" :offset="[-1,5]">{{ check.label }}</a-badge>
                    </template>
                    <template v-else>
                      <a-badge :key="check.label" style="margin-left:15px;">{{ check.label }}</a-badge>
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

    <br><br>

    <!-- 上传文件 -->
    <a-card :bordered="false" title="上传图片">
      <UploadImgRead ref="uploadImgRead" />
    </a-card>

  </div>
</template>

<script>
import { getValveASFields, getActuatorASFields, getAccessariesASFields, getRepairCheckBoxOptions, getAssessmentUnit,
getAssessmentCheckOrRepairUnit } from '@/api/assessment'
import UploadImgRead from '../modules/UploadImgRead'
import { getSelectRepairData } from '@/api/preRepairTest'
import { getColumnsPurchased } from '@/api/step'

export default {
    components: {
        UploadImgRead
    },
    methods: {
      getAssessmentUnit,
      getAssessmentCheckOrRepairUnit,
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
      this.assessmentData = JSON.parse(this.$store.state.editStepData.stepEditData.step_data[0].JSON)
      this.$refs.uploadImgRead.imgFileList = this.assessmentData.uploads
      this.purchasedParts = this.assessmentData.purchased_parts

      // 获取引用数据（维修前测试选择的维修东东）
      // 先选择了维修什么才需要评估
      getSelectRepairData({ FlowID: this.assessmentData.flow_id }).then(res => {
          // 阀门 "1"
          // 执行机构 "2"
          // 阀门+执行机构 "3"
          // 阀门+执行机构+附件 "4"
          // 零部件 "5"
          // 执行机构+附件 "6"
          switch (res.select_repair) { // 与 baseInfo 选择的维修部件下拉列表一致
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
            purchasedParts: []
        }
    }
}
</script>

<style>

</style>
