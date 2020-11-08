<template>
  <page-header-wrapper>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" v-if="showValveForm" tab="阀维修内容" :forceRender="true">
          <a-card>
            <template v-for="(field,fieldIndex) in ValveRepairFields">
              <!-- 首先确定是否有值 -->
              <template v-if="assessmentData[field.state + '_state']">
                <!-- title 分隔线 -->
                <a-row :gutter="16" :key="assessmentData[field] + '_state' + fieldIndex">
                  <a-col :lg="24" class="gutter-row" :span="6">
                    <div class="gutter-box">
                      <a-divider>{{ field.title }}</a-divider>
                    </div>
                  </a-col>
                </a-row>
                <!-- 维修内容 -->
                <template v-if="!assessmentData[field.state + '_repair']">
                  没有维修动作
                </template>
                <a-row :gutter="16" :key="assessmentData[field] + 'repair_content' + fieldIndex">
                  <template v-for="(check,index) in repairCheckFields">
                    <!-- 首先判断repair值是否存在 -->
                    <template v-if="assessmentData[field.state + '_repair'] && assessmentData[field.state + '_repair'].indexOf(check.value) >= 0">
                      <a-col class="gutter-row" :span="2" :key="assessmentData[field] + '_repair' + index">
                        <!-- 维修内容标签  -->
                        <a-row :gutter="16">
                          <a-col class="gutter-row">
                            {{ check.label }}
                          </a-col>
                        </a-row>
                        <!-- 维修人员 -->
                        <a-row :gutter="16">
                          <a-col class="gutter-row">
                            <a-form-item>
                              <a-select
                                label-in-value
                                :default-active-first-option="false"
                                :show-arrow="false"
                                :filter-option="false"
                                :not-found-content="null"
                                style="width:100%;"
                                placeholder="维修人员"
                                v-decorator="[
                                  'repair_user_' + field.state + '_' + check.value,
                                  {rules: []}
                                ]"
                              >
                                <a-select-option v-for="d in dispatchUserData" :key="d.key">
                                  {{ d.label }}
                                </a-select-option>
                              </a-select>
                            </a-form-item>
                          </a-col>
                        </a-row>
                        <!-- 工时 -->
                        <a-row :gutter="16">
                          <a-col class="gutter-row">
                            <a-form-item><a-input-number :min="0" style="width:100%;" v-decorator="[ 'repair_time_' + field.state + '_' + check.value, {rules: []} ]" placeholder="工时（分钟）" /></a-form-item>
                          </a-col>
                        </a-row>
                      </a-col>
                    </template>
                  </template>
                </a-row>
                <!-- 备注 -->
                <a-row :gutter="16" :key="assessmentData[field.state + '_state_memo']">
                  <a-col class="gutter-row">
                    <span v-if="assessmentData[field.state + '_memo']">{{ '备注: ' + assessmentData[field.state + '_memo'] }}</span>
                  </a-col>
                </a-row>
              </template>
            </template>
          </a-card>
        </a-tab-pane>

        <a-tab-pane key="2" v-if="showActuatorForm" tab="执行机构维修内容" :forceRender="true">
          <a-card>
            <template v-for="(field,fieldIndex) in ActuatorRepairFields">
              <!-- 首先确定是否有值 -->
              <template v-if="assessmentData[field.state + '_state']">
                <!-- title 分隔线 -->
                <a-row :gutter="16" :key="assessmentData[field] + '_state' + fieldIndex">
                  <a-col :lg="24" class="gutter-row" :span="6">
                    <div class="gutter-box">
                      <a-divider>{{ field.title }}</a-divider>
                    </div>
                  </a-col>
                </a-row>
                <!-- 维修内容 -->
                <template v-if="!assessmentData[field.state + '_repair']">
                  没有维修动作
                </template>
                <a-row :gutter="16" :key="assessmentData[field] + 'repair_content' + fieldIndex">
                  <template v-for="(check,index) in repairCheckFields">
                    <!-- 首先判断repair值是否存在 -->
                    <template v-if="assessmentData[field.state + '_repair'] && assessmentData[field.state + '_repair'].indexOf(check.value) >= 0">
                      <a-col class="gutter-row" :span="2" :key="assessmentData[field] + '_repair' + index">
                        <!-- 维修内容标签  -->
                        <a-row :gutter="16">
                          <a-col class="gutter-row">
                            {{ check.label }}
                          </a-col>
                        </a-row>
                        <!-- 维修人员 -->
                        <a-row :gutter="16">
                          <a-col class="gutter-row">
                            <a-form-item>
                              <a-select
                                label-in-value
                                :default-active-first-option="false"
                                :show-arrow="false"
                                :filter-option="false"
                                :not-found-content="null"
                                style="width:100%;"
                                placeholder="维修人员"
                                v-decorator="[
                                  'repair_user_' + field.state + '_' + check.value,
                                  {rules: []}
                                ]"
                              >
                                <a-select-option v-for="d in dispatchUserData" :key="d.key">
                                  {{ d.label }}
                                </a-select-option>
                              </a-select>
                            </a-form-item>
                          </a-col>
                        </a-row>
                        <!-- 工时 -->
                        <a-row :gutter="16">
                          <a-col class="gutter-row">
                            <a-form-item><a-input-number :min="0" style="width:100%;" v-decorator="[ 'repair_time_' + field.state + '_' + check.value, {rules: []} ]" placeholder="工时（分钟）" /></a-form-item>
                          </a-col>
                        </a-row>
                      </a-col>
                    </template>
                  </template>
                </a-row>
                <!-- 备注 -->
                <a-row :gutter="16" :key="assessmentData[field.state + '_state_memo']">
                  <a-col class="gutter-row">
                    <span v-if="assessmentData[field.state + '_memo']">{{ '备注: ' + assessmentData[field.state + '_memo'] }}</span>
                  </a-col>
                </a-row>
              </template>
            </template>
          </a-card>
        </a-tab-pane>

        <a-tab-pane key="3" v-if="showSlaveForm" tab="附件维修内容" :forceRender="true">
          <a-card>
            <template v-for="(field,fieldIndex) in AccessariesRepairFields">
              <!-- 首先确定是否有值 -->
              <template v-if="assessmentData[field.state + '_state']">
                <!-- title 分隔线 -->
                <a-row :gutter="16" :key="assessmentData[field] + '_state' + fieldIndex">
                  <a-col :lg="24" class="gutter-row" :span="6">
                    <div class="gutter-box">
                      <a-divider>{{ field.title }}</a-divider>
                    </div>
                  </a-col>
                </a-row>
                <!-- 维修内容 -->
                <template v-if="!assessmentData[field.state + '_repair']">
                  没有维修动作
                </template>
                <a-row :gutter="16" :key="assessmentData[field] + 'repair_content' + fieldIndex">
                  <template v-for="(check,index) in repairCheckFields">
                    <!-- 首先判断repair值是否存在 -->
                    <template v-if="assessmentData[field.state + '_repair'] && assessmentData[field.state + '_repair'].indexOf(check.value) >= 0">
                      <a-col class="gutter-row" :span="2" :key="assessmentData[field] + '_repair' + index">
                        <!-- 维修内容标签  -->
                        <a-row :gutter="16">
                          <a-col class="gutter-row">
                            {{ check.label }}
                          </a-col>
                        </a-row>
                        <!-- 维修人员 -->
                        <a-row :gutter="16">
                          <a-col class="gutter-row">
                            <a-form-item>
                              <a-select
                                show-search
                                label-in-value
                                :default-active-first-option="false"
                                :show-arrow="false"
                                :filter-option="false"
                                :not-found-content="null"
                                @search="handleUserSearch"
                                style="width:100%;"
                                placeholder="维修人员"
                                v-decorator="[
                                  'repair_user_' + field.state + '_' + check.value,
                                  {rules: []}
                                ]"
                              >
                                <a-select-option v-for="d in dispatchUserData" :key="d.key">
                                  {{ d.label }}
                                </a-select-option>
                              </a-select>
                            </a-form-item>
                          </a-col>
                        </a-row>
                        <!-- 工时 -->
                        <a-row :gutter="16">
                          <a-col class="gutter-row">
                            <a-form-item><a-input-number :min="0" style="width:100%;" v-decorator="[ 'repair_time_' + field.state + '_' + check.value, {rules: []} ]" placeholder="工时（分钟）" /></a-form-item>
                          </a-col>
                        </a-row>
                      </a-col>
                    </template>
                  </template>
                </a-row>
                <!-- 备注 -->
                <a-row :gutter="16" :key="assessmentData[field.state + '_state_memo']">
                  <a-col class="gutter-row">
                    <span v-if="assessmentData[field.state + '_memo']">{{ '备注: ' + assessmentData[field.state + '_memo'] }}</span>
                  </a-col>
                </a-row>
              </template>
            </template>
          </a-card>
        </a-tab-pane>
      </a-tabs>

      <br><br>

      <!-- 更换零部件清单 -->
      <a-card title="更换零部件清单" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-row class="form-row" :gutter="16">
          <a-table
            :columns="columnsPurchased"
            :dataSource="dataPurchased"
            :pagination="false"
          >
            <template v-for="(col, i) in ['purchased_part_no', 'purchased_part_key_number', 'purchased_part_number', 'purchased_part_name', 'purchased_part_qty', 'purchased_part_memo']" :slot="col" slot-scope="text, record">
              <a-input
                :key="col"
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                :placeholder="columnsPurchased[i].title"
                @change="e => handleChange(e.target.value, record.key, col)"
              />
              <template v-else>{{ text }}</template>
            </template>
            <!--  ssssssssssssssssssssssssss -->
            <!--  ssssssssssssssssssssssssss -->
            <!--  ssssssssssssssssssssssssss -->
            <!--  ssssssssssssssssssssssssss -->
            <!--  ssssssssssssssssssssssssss -->
            <template slot="operation" slot-scope="record">
              <template v-if="record.editable">
                <span v-if="record.isNew">
                  <a @click="saveRow(record)">添加</a>
                  <a-divider type="vertical" />
                  <a-popconfirm title="是否要删除此行？" @confirm="removeRow(record.key)">
                    <a>删除</a>
                  </a-popconfirm>
                </span>
                <span v-else>
                  <a @click="saveRow(record)">保存</a>
                  <a-divider type="vertical" />
                  <a @click="cancel(record.key)">取消</a>
                </span>
              </template>
              <span v-else>
                <a-popconfirm title="是否要删除此行？" @confirm="removeRow(record.key)">
                  <a>删除</a>
                </a-popconfirm>
              </span>
            </template>
          </a-table>
          <a-row>
            <a-col :span="24"><a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newPartMember">新增部件</a-button></a-col>
          </a-row>
        </a-row>
      </a-card>

      <br><br>

      <a-card>
        <a-form-item label="维修内容及结论">
          <a-textarea
            rows="6"
            v-decorator="[
              'repair_content_text',
              {rules: []}
            ]" />
        </a-form-item>
      </a-card>

      <!-- 页脚 -->
      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit">取消</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">工单详细</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>
    </a-form>

    <br><br>

    <!-- 文件上传 -->
    <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <UploadImg ref="uploadImg" :QueueType="3" :isMobile="isMobile" />
    </a-card>

    <!-- 工单详细 -->
    <stepAllDetailModel ref="stepAllDetailModel" />
  </page-header-wrapper>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'
import { baseMixin } from '@/store/app-mixin'
import pick from 'lodash.pick'
import stepDetail from '../../modules/StepBaseInfo'
import UploadImg from '../../modules/UploadImg'
import { stepDone, queryStepData, getStepUsers, getColumnsPurchased } from '@/api/step'
import { getValveASFields, getRepairCheckBoxOptions, getActuatorASFields, getAccessariesASFields } from '@/api/assessment'
import { fetch } from '../../../../utils/inputSearch'
import { saveRepairData } from '@/api/repair'
import stepAllDetailModel from '../../modules/StepAllDetailModel'
import { getSelectRepairData } from '@/api/preRepairTest'

const repairFields = []

export default {
    name: 'Repair',
    mixins: [baseMixin],
    components: {
        FooterToolBar,
        baseMixin,
        pick,
        stepDetail,
        UploadImg,
        stepAllDetailModel
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            values.flow_id = this.flowID
            values.current_step = this.currentStep
            values.save_user_id = this.$store.state.user.info.id
            values.uploads = this.$refs.uploadImg.imgFileList
            values.purchased_parts = this.dataPurchased

            saveRepairData(values).then(res => {
              // 清空数据
              this.$store.commit('SET_STEP_EDIT_DATA', null)
              // 刷新表格
              this.$router.push({ path: '/step/steplist' })
              this.$message.info('保存成功')

              // 重置表单数据
              this.form.resetFields()
            })
          }
        })
      },
      cancelSubmit () {
        this.$router.push({ path: '/step/steplist' })
      },
      handleStepDetail () {
        this.$refs.stepAllDetailModel.showSetpDetailData(this.flowID, this.currentStep)
      },
      handleStepDone () {
        var check = false
        this.form.validateFields((err, values) => {
          if (!err) {
            if (!this.validateValveField(values)) {
              return
            }
            if (!this.validateActuatorField(values)) {
              return
            }
            if (!this.validateAccessariesField(values)) {
              return
            }
            check = true
          }
        })
        if (!check) { return }

        const letThis = this
        this.$confirm({
          title: '结束流程',
          content: '确定要结束流程？',
          okText: '确认',
          cancelText: '取消',
          onOk () {
            stepDone({ id: letThis.flowID, current_step: letThis.currentStep }).then(res => {
                // 刷新表格
                letThis.$message.info('结束流程成功')
                letThis.$router.push({ path: '/step/steplist' })
            })
          }
        })
      },
      handleUserSearch (value) {
        fetch(value, data => (this.userData = data), this.$t('input.user.search'))
      },
      validateValveField (values) {
        // 检查所有修理内容是否已填完整 -- 阀
        for (let i = 0; i < this.ValveRepairFields.length; i++) {
          const valveRepairItem = this.ValveRepairFields[i]
          if (!this.validateFieldImpl(values, valveRepairItem)) {
            return false
          }
        }
        return true
      },
      validateActuatorField (values) {
        // 检查所有修理内容是否已填完整 -- 执行机构
        for (let i = 0; i < this.ActuatorRepairFields.length; i++) {
          const valveRepairItem = this.ActuatorRepairFields[i]
          if (!this.validateFieldImpl(values, valveRepairItem)) {
            return false
          }
        }
        return true
      },
      validateAccessariesField (values) {
        // 检查所有修理内容是否已填完整 -- 附件
        for (let i = 0; i < this.AccessariesRepairFields.length; i++) {
          const valveRepairItem = this.AccessariesRepairFields[i]
          if (!this.validateFieldImpl(values, valveRepairItem)) {
            return false
          }
        }
        return true
      },
      validateFieldImpl (values, repairItem) {
        // (维修内容：抛光，电镀，车修 。。。。)
        for (let k = 0; k < this.repairCheckFields.length; k++) {
          const valveCheckItem = this.repairCheckFields[k]

          // 判断是否存在需要检查的项
          if (this.assessmentData[repairItem.state + '_repair'] && this.assessmentData[repairItem.state + '_repair'].indexOf(valveCheckItem.value) >= 0) {
            // 开始检查内容是否已填写
            // 1, 检查维修人员
            const userFieldName = 'repair_user_' + repairItem.state + '_' + valveCheckItem.value
            if (!values[userFieldName]) {
              this.$message.error('(' + repairItem.title + ' -  ' + valveCheckItem.label + ') 人员字段未填写')
              return false
            }
              // 2, 检查维修工时
              const timeFieldName = 'repair_time_' + repairItem.state + '_' + valveCheckItem.value
              if (!values[timeFieldName]) {
              this.$message.error('(' + repairItem.title + ' -  ' + valveCheckItem.label + ') 工时字段未填写')
              return false
            }
          }
        }

        return true
      },
      handleChange (value, key, column) {
        const newData = [...this.dataPurchased]
        const target = newData.find(item => key === item.key)
        if (target) {
          target[column] = value
          this.dataPurchased = newData
        }
      },
      saveRow (record) {
        const { key } = record
        const target = this.dataPurchased.find(item => item.key === key)
        target.editable = false
        target.isNew = false
      },
      removeRow (key) {
        const newData = this.dataPurchased.filter(item => item.key !== key)
        this.dataPurchased = newData
      },
      newPartMember () {
        const length = this.dataPurchased.length
        this.dataPurchased.push({
          key: length === 0 ? '1' : (parseInt(this.dataPurchased[length - 1].key) + 1).toString(),
          purchased_part_no: '',
          purchased_part_key_number: '',
          purchased_part_number: '',
          purchased_part_name: '',
          purchased_part_qty: '',
          purchased_part_memo: '',
          editable: true,
          isNew: true
        })
      }
    },
    async mounted () {
      // 生成维修字段数据
      repairFields.length = 0
      this.ValveRepairFields.forEach(e => {
        this.repairCheckFields.forEach(k => {
          repairFields.push('repair_user_' + e.state + '_' + k.value)
          repairFields.push('repair_time_' + e.state + '_' + k.value)
        })
      })
      this.ActuatorRepairFields.forEach(e => {
        this.repairCheckFields.forEach(k => {
          repairFields.push('repair_user_' + e.state + '_' + k.value)
          repairFields.push('repair_time_' + e.state + '_' + k.value)
        })
      })
      this.AccessariesRepairFields.forEach(e => {
        this.repairCheckFields.forEach(k => {
          repairFields.push('repair_user_' + e.state + '_' + k.value)
          repairFields.push('repair_time_' + e.state + '_' + k.value)
        })
      })
      repairFields.push('repair_content_text')

      const editData = this.$store.state.editStepData.stepEditData
      this.flowID = editData.flow_id
      this.currentStep = editData.current_step
      let repairData = null
      if (editData.step_data.length > 0) {
        repairData = JSON.parse(editData.step_data[0].JSON)
      }

      // 获取维修前测试中选中的维修项
      getSelectRepairData({ FlowID: this.flowID }).then(res => {
        // 阀门 "1"
        // 执行机构 "2"
        // 阀门+执行机构 "3"
        // 阀门+执行机构+附件 "4"
        // 零部件 "5"
        // 执行机构+附件 "6"
        switch (res.select_repair) { // 与 baseInfo 选择的维修部件下拉列表一致
          case '1': { // 阀门维修
            this.showValveForm = true
            break
          }
          case '2': { // 执行机构维修
            this.showActuatorForm = true
            break
          }
          case '3': { // 阀门+执行机构
            this.showValveForm = true
            this.showActuatorForm = true
            break
          }
          case '4': { // 阀门+执行机构+附件
            this.showValveForm = true
            this.showActuatorForm = true
            this.showSlaveForm = true
            break
          }
          case '6': { // 执行机构+附件
            this.AccessoryTest = true
            this.showActuatorForm = true
            break
          }
        }
      })

      getStepUsers({ flow_id: this.flowID, current_step: this.currentStep }).then(res => {
        if (res.result.data.length > 0) {
          res.result.data.forEach(e => {
            this.dispatchUserData.push({
              key: e.user_id,
              label: e.user_name
            })
          })
        }
      })

      // 查询出评估内容，没有评估内容的项则禁止输入
      await queryStepData({ id: this.flowID, current_step: 'Assessment' }).then(res => {
        repairFields.forEach(v => this.form.getFieldDecorator(v))
        this.assessmentData = JSON.parse(res.result.step_data[0].JSON)

        // 加载编辑数据
        if (repairData != null) {
          this.form.setFieldsValue(pick(repairData, repairFields))
          this.$refs.uploadImg.imgFileList = repairData.uploads
        }
      })

      if (repairData.purchased_parts && repairData.purchased_parts.length > 0) {
        this.dataPurchased = repairData.purchased_parts
        return
      }

      queryStepData({ id: this.flowID, current_step: 'Receipt' }).then(res => {
        const receiptData = JSON.parse(res.result.step_data[0].JSON)

        queryStepData({ id: this.flowID, current_step: '(start)' }).then(res => {
          res.result.step_data.forEach(e => {
            // 查找 baseinfo
            if (e.DataNum === 1) {
              const baseInfoData = JSON.parse(e.JSON)
              // 采购清单加checked属性
              baseInfoData.valve_purchased_parts.forEach(v => {
                receiptData.receipt_parts.forEach(k => {
                  if (v.key === k.key && k.check) {
                    this.dataPurchased.push(v)
                  }
                })
              })
            }
          })
        })
      })
    },
    data () {
      return {
        form: this.$form.createForm(this),
        AccessoryRepair: false,
        ActuatorRepair: false,
        ValveRepair: false,
        flowID: '',
        currentStep: '',
        baseInfoData: null,
        ValveRepairFields: getValveASFields(),
        ActuatorRepairFields: getActuatorASFields(),
        AccessariesRepairFields: getAccessariesASFields(),
        repairCheckFields: getRepairCheckBoxOptions(),
        assessmentData: {},
        userData: {},
        showValveForm: false,
        showActuatorForm: false,
        showSlaveForm: false,
        dispatchUserData: [],
        columnsPurchased: getColumnsPurchased(),
        dataPurchased: []
      }
    }
}

</script>

<style>
</style>
