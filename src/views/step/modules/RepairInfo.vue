<template>
  <div>
    <a-tabs default-active-key="1">
      <!-- 阀维修内容 -->
      <a-tab-pane v-if="ValueRepairData && ValueRepairData.length > 0" key="1" tab="阀维修内容" :forceRender="true">
        <a-card>
          <template v-for="(item,index) in ValueRepairData">
            <!-- title 分隔线 -->
            <a-row :gutter="16" :key="item.field + index + 'title'">
              <a-col :lg="24" class="gutter-row" :span="6">
                <div class="gutter-box">
                  <a-divider>{{ item.title }}</a-divider>
                </div>
              </a-col>
            </a-row>
            <!-- 维修内容 -->
            <a-row :gutter="16" :key="item.field + index + 'content'">
              <a-col v-for="(contentItem,contentIndex) in item.content" class="gutter-row" :span="2" :key="item.field + 'value' + contentIndex">
                <a-row :gutter="16">{{ contentItem.repairContent }}</a-row>
                <a-row :gutter="16">{{ '人员: ' + contentItem.userName }}</a-row>
                <a-row :gutter="16">{{ '工时: ' + contentItem.workTime }}</a-row>
              </a-col>
            </a-row>
            <!-- 备注 -->
            <a-row :gutter="16" :key="item.field + index + 'memo'">
              <br>
              {{ '备注: ' + item.memo }}
            </a-row>
          </template>
        </a-card>
      </a-tab-pane>

      <!-- 执行机构维修内容 -->
      <a-tab-pane v-if="ActuatorRepairData && ActuatorRepairData.length > 0" key="2" tab="执行机构维修内容" :forceRender="true">
        <a-card>
          <template v-for="(item,index) in ActuatorRepairData">
            <!-- title 分隔线 -->
            <a-row :gutter="16" :key="item.field + index + 'title'">
              <a-col :lg="24" class="gutter-row" :span="6">
                <div class="gutter-box">
                  <a-divider>{{ item.title }}</a-divider>
                </div>
              </a-col>
            </a-row>
            <!-- 维修内容 -->
            <a-row :gutter="16" :key="item.field + index + 'content'">
              <a-col v-for="(contentItem,contentIndex) in item.content" class="gutter-row" :span="2" :key="item.field + 'value' + contentIndex">
                <a-row :gutter="16">{{ contentItem.repairContent }}</a-row>
                <a-row :gutter="16">{{ '人员: ' + contentItem.userName }}</a-row>
                <a-row :gutter="16">{{ '工时: ' + contentItem.workTime }}</a-row>
              </a-col>
            </a-row>
            <!-- 备注 -->
            <a-row :gutter="16" :key="item.field + index + 'memo'">
              <br>
              {{ '备注: ' + item.memo }}
            </a-row>
          </template>
        </a-card>
      </a-tab-pane>

      <!-- 附件维修内容 -->
      <a-tab-pane v-if="AccessariesRepairData && AccessariesRepairData.length > 0" key="3" tab="附件维修内容" :forceRender="true">
        <a-card>
          <template v-for="(item,index) in AccessariesRepairData">
            <!-- title 分隔线 -->
            <a-row :gutter="16" :key="item.field + index + 'title'">
              <a-col :lg="24" class="gutter-row" :span="6">
                <div class="gutter-box">
                  <a-divider>{{ item.title }}</a-divider>
                </div>
              </a-col>
            </a-row>
            <!-- 维修内容 -->
            <a-row :gutter="16" :key="item.field + index + 'content'">
              <a-col v-for="(contentItem,contentIndex) in item.content" class="gutter-row" :span="2" :key="item.field + 'value' + contentIndex">
                <a-row :gutter="16">{{ contentItem.repairContent }}</a-row>
                <a-row :gutter="16">{{ '人员: ' + contentItem.userName }}</a-row>
                <a-row :gutter="16">{{ '工时: ' + contentItem.workTime }}</a-row>
              </a-col>
            </a-row>
            <!-- 备注 -->
            <a-row :gutter="16" :key="item.field + index + 'memo'">
              <br>
              {{ '备注: ' + item.memo }}
            </a-row>
          </template>
        </a-card>
      </a-tab-pane>
    </a-tabs>

    <br><br>

    <!-- 更换零部件清单 -->
    <a-card title="更换零部件清单">
      <a-table
        :columns="getColumnsPurchasedArray()"
        :dataSource="purchasedParts"
        :pagination="false"
      ></a-table>
    </a-card>

    <br><br>

    <!-- 维修内容及结论 -->
    <a-card title="维修内容及结论">
      <a-textarea disabled rows="6" v-model="repairContentText" />
    </a-card>

    <br><br>
    <!-- 上传图片 -->
    <a-card :bordered="false" title="上传图片">
      <UploadImgRead ref="uploadImgRead" />
    </a-card>
  </div>
</template>

<script>
import { getValveASFields, getActuatorASFields, getAccessariesASFields, getRepairCheckBoxOptions } from '@/api/assessment'
import UploadImgRead from '../modules/UploadImgRead'
import { queryStepDataOnlyread, getColumnsPurchased } from '@/api/step'

export default {
    components: {
        UploadImgRead
    },
    mounted () {
      if (!this.$store.state.editStepData.stepEditData || this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
        this.$message.warning('当前流程没有保存数据')
        return
      }

      let hasData = false
      const repairData = JSON.parse(this.$store.state.editStepData.stepEditData.step_data[0].JSON)
      this.repairContentText = repairData.repair_content_text
      this.purchasedParts = repairData.purchased_parts
      this.getPurchasedData()

      // 提取维修数据
      this.ValveRepairFields.forEach(e => {
        this.repairCheckFields.forEach(k => {
          if (repairData['repair_user_' + e.state + '_' + k.value]) {
            const dataItem = {}
            dataItem.title = e.title
            dataItem.repairContent = k.label // 维修内容
            dataItem.userName = repairData['repair_user_' + e.state + '_' + k.value].label // 维修人员
            dataItem.workTime = ''
            dataItem.memo = ''
            dataItem.field = e.state
            if (repairData['repair_time_' + e.state + '_' + k.value]) {
              dataItem.workTime = repairData['repair_time_' + e.state + '_' + k.value]// 工时
            }

            this.ValueRepairData.push(dataItem)
            hasData = true
          }
        })
      })
      this.ActuatorRepairFields.forEach(e => {
        this.repairCheckFields.forEach(k => {
          if (repairData['repair_user_' + e.state + '_' + k.value]) {
            const dataItem = {}
            dataItem.title = e.title
            dataItem.repairContent = k.label // 维修内容
            dataItem.userName = repairData['repair_user_' + e.state + '_' + k.value].label // 维修人员
            dataItem.workTime = ''
            dataItem.memo = ''
            dataItem.field = e.state
            if (repairData['repair_time_' + e.state + '_' + k.value]) {
              dataItem.workTime = repairData['repair_time_' + e.state + '_' + k.value]// 工时
            }

            this.ActuatorRepairData.push(dataItem)
            hasData = true
          }
        })
      })
      this.AccessariesRepairFields.forEach(e => {
        this.repairCheckFields.forEach(k => {
          if (repairData['repair_user_' + e.state + '_' + k.value]) {
            const dataItem = {}
            dataItem.title = e.title
            dataItem.repairContent = k.label // 维修内容
            dataItem.userName = repairData['repair_user_' + e.state + '_' + k.value].label // 维修人员
            dataItem.workTime = ''
            dataItem.memo = ''
            dataItem.field = e.state
            if (repairData['repair_time_' + e.state + '_' + k.value]) {
              dataItem.workTime = repairData['repair_time_' + e.state + '_' + k.value]// 工时
            }

            this.AccessariesRepairData.push(dataItem)
            hasData = true
          }
        })
      })

      if (!hasData) {
        this.$message.info('没有执行数据')
        this.$router.push({ path: '/step/steplist' })
        return
      }

      // 查询出评估内容，取评估备注信息
      queryStepDataOnlyread({ id: repairData.flow_id, current_step: 'Assessment' }).then(res => {
        const assessmentData = JSON.parse(res.result.step_data[0].JSON)

        this.ValueRepairData.forEach(e => {
            if (assessmentData[e.field + '_memo']) {
                e.memo = assessmentData[e.field + '_memo']
            }
        })
        this.ActuatorRepairData.forEach(e => {
            if (assessmentData[e.field + '_memo']) {
                e.memo = assessmentData[e.field + '_memo']
            }
        })
        this.AccessariesRepairData.forEach(e => {
            if (assessmentData[e.field + '_memo']) {
                e.memo = assessmentData[e.field + '_memo']
            }
        })
      })
      this.ValueRepairData = magrinValveRepairData(this.ValueRepairData)
      this.ActuatorRepairData = magrinValveRepairData(this.ActuatorRepairData)
      this.AccessariesRepairData = magrinValveRepairData(this.AccessariesRepairData)
      this.$refs.uploadImgRead.imgFileList = repairData.uploads
    },
    data () {
      return {
        ValveRepairFields: getValveASFields(),
        ActuatorRepairFields: getActuatorASFields(),
        AccessariesRepairFields: getAccessariesASFields(),
        repairCheckFields: getRepairCheckBoxOptions(),
        ValueRepairData: [],
        ActuatorRepairData: [],
        AccessariesRepairData: [],
        repairContentText: '',
        purchasedParts: []
      }
    },
    methods: {
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
    }
}

function magrinValveRepairData (repairData) {
    // 按字段合并 阀维修
    const tmpRepairData = []
    repairData.forEach(e => {
        if (tmpRepairData.length <= 0) {
            const tmpObj = {}
            tmpObj.title = e.title
            tmpObj.memo = e.memo
            tmpObj.field = e.field
            tmpObj.content = []
            const content = {}
            content.repairContent = e.repairContent // 维修内容
            content.userName = e.userName // 维修人员
            content.workTime = e.workTime // 工时
            tmpObj.content.push(content)
            tmpRepairData.push(tmpObj)
        } else {
            for (var i = 0; i < tmpRepairData.length; i++) {
                const k = tmpRepairData[i]
                if (k.field === e.field) {
                    const content = {}
                    content.repairContent = e.repairContent // 维修内容
                    content.userName = e.userName // 维修人员
                    content.workTime = e.workTime // 工时
                    k.content.push(content)
                    break
                } else {
                    const tmpObj = {}
                    tmpObj.title = e.title
                    tmpObj.memo = e.memo
                    tmpObj.field = e.field
                    tmpObj.content = []
                    const content = {}
                    content.repairContent = e.repairContent // 维修内容
                    content.userName = e.userName // 维修人员
                    content.workTime = e.workTime // 工时
                    tmpObj.content.push(content)
                    tmpRepairData.push(tmpObj)
                    break
                }
            }
        }
    })

    return tmpRepairData
}
</script>

<style>

</style>
