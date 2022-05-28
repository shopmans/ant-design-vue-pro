<template>
  <div ref="farther">
    <page-header-wrapper style="position: fixed;z-index: 9;border-bottom: 1px solid #e8e8e8" :style="{width:fartherWidth}">
      <template slot="extra">
        <a-checkbox key="1" v-model="not_applicable" @change="naChange">
          不适用
        </a-checkbox>
      </template>
    </page-header-wrapper>
    <br>
    <br>
    <br>
    <br>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-tabs default-active-key="1" @change="tabChange">
        <!-- 阀维修内容 -->
        <a-tab-pane key="1" v-if="showValveForm" tab="阀维修内容" :forceRender="true">
          <a-card>
            <template slot="extra">
              <a-checkbox :disabled="isValveRepairTabDone" v-model="disableAll_1" @change="valveNa">
                不适用
              </a-checkbox>
            </template>
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
                <a-row :gutter="8" :key="assessmentData[field] + 'repair_content' + fieldIndex">
                  <template v-for="(check,index) in getValveRepairCheckList(field)">
                    <!-- 首先判断repair值是否存在 -->
                    <template v-if="assessmentData[field.state + '_repair'] && assessmentData[field.state + '_repair'].indexOf(check.value) >= 0">
                      <a-col class="gutter-row" :span="4" :key="assessmentData[field] + '_repair' + index">
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
                                :disabled="disableAll_1 || isValveRepairTabDone"
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
                            <a-form-item><a-input-number :disabled="disableAll_1 || isValveRepairTabDone" :min="0" style="width:100%;" v-decorator="[ 'repair_time_' + field.state + '_' + check.value, {rules: []} ]" placeholder="工时（分钟）" /></a-form-item>
                          </a-col>
                        </a-row>
                      </a-col>
                    </template>
                  </template>
                </a-row>
                <!-- 备注 -->
                <a-row :gutter="16" :key="assessmentData[field.state + '_state_memo']">
                  <a-col :span="4" class="gutter-row">
                    <span v-if="assessmentData[field.state + '_memo']">{{ '备注: ' + assessmentData[field.state + '_memo'] }}</span>
                  </a-col>
                </a-row>
              </template>
            </template>
            <!-- 文件上传 -->
            <br>
            <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
              <uploadImg ref="uploadImg1" :disableAll="disableAll_1 || isValveRepairTabDone" :isMobile="isMobile" :queueType="'3'" :flag="'1'" />
            </a-card>
          </a-card>
          <br>
          <a-card>
            <div style="float:right;">
              <a-button style="margin-right: 8px;" :disabled="disableAll_1 || isValveRepairTabDone" type="primary" @click="saveValveRepairTabDone">操作完毕</a-button>
              <a-button @click="editValveRepairTab">编辑</a-button>
            </div>
          </a-card>
        </a-tab-pane>
        <!-- 执行机构维修内容 -->
        <a-tab-pane key="2" v-if="showActuatorForm" tab="执行机构维修内容" :forceRender="true">
          <a-card>
            <template slot="extra">
              <a-checkbox :disabled="isActuatorRepairTabDone" v-model="disableAll_2" @change="actuatorNa">
                不适用
              </a-checkbox>
            </template>
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
                <a-row :gutter="8" :key="assessmentData[field] + 'repair_content' + fieldIndex">
                  <template v-for="(check,index) in getActuatorRepairCheckList(field)">
                    <!-- 首先判断repair值是否存在 -->
                    <template v-if="assessmentData[field.state + '_repair'] && assessmentData[field.state + '_repair'].indexOf(check.value) >= 0">
                      <a-col class="gutter-row" :span="4" :key="assessmentData[field] + '_repair' + index">
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
                                :disabled="disableAll_2 || isActuatorRepairTabDone"
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
                            <a-form-item><a-input-number :disabled="disableAll_2 || isActuatorRepairTabDone" :min="0" style="width:100%;" v-decorator="[ 'repair_time_' + field.state + '_' + check.value, {rules: []} ]" placeholder="工时（分钟）" /></a-form-item>
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
            <!-- 文件上传 -->
            <br>
            <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
              <uploadImg2 ref="uploadImg2" :disableAll="disableAll_2 || isActuatorRepairTabDone" :isMobile="isMobile" :queueType="'3'" :flag="'2'" />
            </a-card>
          </a-card>
          <br>
          <a-card>
            <div style="float:right;">
              <a-button style="margin-right: 8px;" :disabled="disableAll_1 || isActuatorRepairTabDone" type="primary" @click="saveActuatorRepairTabDone">操作完毕</a-button>
              <a-button @click="editActuatorRepairTab">编辑</a-button>
            </div>
          </a-card>
        </a-tab-pane>
        <!-- 附件维修内容 -->
        <a-tab-pane key="3" v-if="showSlaveForm" tab="附件维修内容" :forceRender="true">
          <a-card>
            <template slot="extra">
              <a-checkbox :disabled="isAccessoryRepairTabDone" v-model="disableAll_3" @change="accessoryNa">
                不适用
              </a-checkbox>
            </template>
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
                <a-row :gutter="8" :key="assessmentData[field] + 'repair_content' + fieldIndex">
                  <template v-for="(check,index) in getOtherRepairCheckList(field)">
                    <!-- 首先判断repair值是否存在 -->
                    <template v-if="assessmentData[field.state + '_repair'] && assessmentData[field.state + '_repair'].indexOf(check.value) >= 0">
                      <a-col class="gutter-row" :span="4" :key="assessmentData[field] + '_repair' + index">
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
                                :disabled="disableAll_3 || isAccessoryRepairTabDone"
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
                            <a-form-item><a-input-number :disabled="disableAll_3 || isAccessoryRepairTabDone" :min="0" style="width:100%;" v-decorator="[ 'repair_time_' + field.state + '_' + check.value, {rules: []} ]" placeholder="工时（分钟）" /></a-form-item>
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
            <!-- 文件上传 -->
            <br>
            <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
              <uploadImg3 ref="uploadImg3" :disableAll="disableAll_3 || isAccessoryRepairTabDone" :isMobile="isMobile" :queueType="'3'" :flag="'3'" />
            </a-card>
          </a-card>
          <br>
          <a-card>
            <div style="float:right;">
              <a-button style="margin-right: 8px;" :disabled="disableAll_3 || isAccessoryRepairTabDone" type="primary" @click="saveAccessoryRepairTabDone">操作完毕</a-button>
              <a-button @click="editAccessoryRepairTab">编辑</a-button>
            </div>
          </a-card>
        </a-tab-pane>
      </a-tabs>

      <br>
      <!-- 更换零部件清单 -->
      <a-card title="更换零部件清单" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-row class="form-row" :gutter="16">
          <a-table
            :columns="columnsPurchased"
            :dataSource="dataPurchased"
            :pagination="false"
          >
            <template v-for="(col, i) in ['purchased_part_no', 'purchased_part_name', 'purchased_part_number', 'purchased_part_qty', 'purchased_part_key_number', 'purchased_part_memo']" :slot="col" slot-scope="text, record">
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
                  <a :disabled="not_applicable" @click="saveRow(record)">添加</a>
                  <a-divider type="vertical" />
                  <a-popconfirm title="是否要删除此行？" @confirm="removeRow(record.key)">
                    <a :disabled="not_applicable">删除</a>
                  </a-popconfirm>
                </span>
                <span v-else>
                  <a :disabled="not_applicable" @click="saveRow(record)">保存</a>
                </span>
              </template>
              <span v-else>
                <a-popconfirm title="是否要删除此行？" @confirm="removeRow(record.key)">
                  <a :disabled="not_applicable">删除</a>
                </a-popconfirm>
                <a-divider type="vertical" />
                <a :disabled="not_applicable" @click="editRow(record)">编辑</a>
              </span>
            </template>
          </a-table>
          <a-row>
            <a-col :span="12"><a-button :disabled="not_applicable" style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newPartMember">新增部件</a-button></a-col>
            <a-col :span="12"><div class="upload-no-inline-block"><a-upload :disabled="not_applicable" accept=".xls,.xlsx" :before-upload="importExcel" :show-upload-list="false" className=".ant-upload.ant-upload-select"><a-button :disabled="not_applicable" style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus">Excel导入</a-button></a-upload></div></a-col>
          </a-row>
        </a-row>
      </a-card>
      <br>

      <a-card>
        <a-form-item label="维修内容及结论">
          <a-textarea
            :disabled="not_applicable"
            rows="6"
            v-decorator="[
              'repair_content_text',
              {rules: []}
            ]" />
        </a-form-item>
      </a-card>
      <br>

      <!-- 检测\维修 -->
      <a-card title="阀检测\维修" :headStyle="{fontWeight:'bold'}">
        <a-form-item>
          <a-radio-group :disabled="not_applicable" v-decorator="[ 'assessment_check_or_repair', {initialValue: 2, rules: [{ required: true, message: '请选择阀检测\\维修' }]} ]">
            <a-radio :value="1">检测</a-radio>
            <a-radio :value="2">维修</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-card>

      <!-- 页脚 -->
      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit" v-if="!isMobile" >返回</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">{{ $t("menu.step.view") }}</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>
    </a-form>

    <!-- 工单详细 -->
    <stepAllDetailModel ref="stepAllDetailModel" :currenStep="currentStep" :flowId="flowID" />
  </div>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'
import { baseMixin } from '@/store/app-mixin'
import pick from 'lodash.pick'
import stepDetail from '../../modules/StepBaseInfo'
import uploadImg from '../../modules/UploadImg'
import uploadImg2 from '../../modules/UploadImg2'
import uploadImg3 from '../../modules/UploadImg3'
import { stepDone, queryStepData, getColumnsPurchased } from '@/api/step'
import { getValveASFields, getActuatorASFields, getAccessariesASFields, getValvaRepairCheckFields,
getActuatorRepairCheckFields, getOtherRepairCheckFields } from '@/api/assessment'
import { fetch } from '../../../../utils/inputSearch'
import { saveRepairData } from '@/api/repair'
import stepAllDetailModel from '../../modules/StepAllDetailModel'
import XLSX from 'xlsx'
import { randomNum } from '@/api/utils'
import dispatchUser from '../../modules/DispatchUser'
import { getUserList } from '@/api/user'

const repairFields = []

export default {
    name: 'Repair',
    mixins: [baseMixin],
    components: {
        FooterToolBar,
        baseMixin,
        pick,
        stepDetail,
        uploadImg,
        uploadImg2,
        uploadImg3,
        stepAllDetailModel,
        dispatchUser
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            values.flow_id = this.flowID
            values.current_step = this.currentStep
            values.save_user_id = this.$store.state.user.info.id
            values.purchased_parts = this.dataPurchased
            values.not_applicable = this.not_applicable
            values.valve_not_applicable = this.disableAll_1
            values.actuator_not_applicable = this.disableAll_2
            values.accessaries_not_applicable = this.disableAll_3

            var tmpUpload = []
            // 阀门拆解
            if (this.$refs.uploadImg1) {
              this.$refs.uploadImg1.imgFileList.forEach(e => {
                tmpUpload.push(e)
              })
            }
            // 执行机构拆解
            if (this.$refs.uploadImg2) {
              this.$refs.uploadImg2.imgFileList.forEach(e => {
                tmpUpload.push(e)
              })
            }
            // 附件折解
            if (this.$refs.uploadImg3) {
              this.$refs.uploadImg3.imgFileList.forEach(e => {
                tmpUpload.push(e)
              })
            }
            values.uploads = tmpUpload
            // 标签操作完毕
            values.is_valve_repair_tab_done = this.isValveRepairTabDone
            values.is_actuator_repair_tab_done = this.isActuatorRepairTabDone
            values.is_accessory_repair_tab_done = this.isAccessoryRepairTabDone

            saveRepairData(values).then(res => {
              this.$message.info('保存成功')
              // eslint-disable-next-line no-undef
              callFlutterBacktoList.postMessage('save_step_ok') // 告诉移动端vue页面本流程已经保存成功
            })
          }
        })
      },
      cancelSubmit () {
        this.$router.back(-1)
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
        if (!values) { return false }
        // 维修字段最多11个
        for (var i = 1; i <= 11; i++) {
          const userFieldName = 'repair_user_' + repairItem.state + '_' + i
          const timeFieldName = 'repair_time_' + repairItem.state + '_' + i
          const userFieldHas = values.hasOwnProperty(userFieldName)
          const timeFieldHas = values.hasOwnProperty(timeFieldName)
          if (userFieldName.indexOf('repair_user_break') >= 0 || userFieldName.indexOf('repair_time_break') >= 0) {
            continue
          }

          // 检查维修字段是否有值
          if (userFieldHas) {
            if (values[userFieldName] === null) {
              this.$message.error('(' + repairItem.title + ') 存在人员字段未填写')
              return false
            }
          }

          if (timeFieldHas) {
            if (values[timeFieldName] === null) {
              this.$message.error('(' + repairItem.title + ') 存在工时字段未填写')
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
        const editData = [...this.dataPurchased]
        const { key } = record
        const target = editData.find(item => item.key === key)
        if (target) {
          target.editable = false
          target.isNew = false
          this.dataPurchased = editData
        }
      },
      removeRow (key) {
        const newData = this.dataPurchased.filter(item => item.key !== key)
        this.dataPurchased = newData
      },
      editRow (record) {
        const editData = [...this.dataPurchased]
        const { key } = record
        const target = editData.find(item => item.key === key)
        if (target) {
          target.editable = true
          target.isNew = false
          this.dataPurchased = editData
        }
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
      },
      importExcel (file) {
        // console.log(file)
        this.readExcel(file)
        return false
      },
      readExcel (file) { // 表格导入
          var that = this

          if (file.length <= 0) { // 如果没有文件名
            return false
          }

          const fileReader = new FileReader()
          fileReader.onload = (ev) => {
            try {
              const data = ev.target.result
              const workbook = XLSX.read(data, {
                  type: 'binary'
              })
              const wsname = workbook.SheetNames[0] // 取第一张表
              const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成json表格内容
              // console.log(ws)

              // 查找件号单元格并取得件号属性名称
              var keyNumberPropName = '' // 件号属性名称
              ws.forEach(wsItem => {
                for (var wsItemProp of Object.keys(wsItem)) {
                  if (wsItem[wsItemProp] === '零件号码') {
                    keyNumberPropName = wsItemProp
                    break
                  }
                }
              })
              if (keyNumberPropName.length !== 9) {
                this.$message.error('导入Excel文件没有找到“零件号码”单元格')
                return
              }

              var tmpDataItemArray = []
              for (let i = 9; i < ws.length; i++) {
                var tmpDataItem = []
                var tmpDataObject = ws[i]
                // 件号属性是否存在
                if (!tmpDataObject[keyNumberPropName]) {
                  continue
                }

                for (var key of Object.keys(tmpDataObject)) {
                  const tmpValue = tmpDataObject[key]
                  tmpDataItem.push(tmpValue === 'undefined' ? '' : tmpValue)
                }
                tmpDataItemArray.push(tmpDataItem)
              }
              console.log(tmpDataItemArray)

              // 合并导入数据，以件号为key
              var keyIndex = 2 // 件号index
              tmpDataItemArray.forEach(item => {
                // 在已有备件数据中查找相同件号
                var isFind = false
                var findIndex = 0
                for (var i = 0; i < that.dataPurchased.length; i++) {
                  if (item[keyIndex] === that.dataPurchased[i].purchased_part_key_number) {
                    isFind = true
                    findIndex = i
                    break
                  }
                }

                const memo = typeof item[5] === 'undefined' ? '' : item[5] + ''
                console.log(memo)
                if (isFind) {
                  that.dataPurchased[findIndex].purchased_part_key_number = item[4] + ''
                  that.dataPurchased[findIndex].purchased_part_number = item[2] + ''
                  that.dataPurchased[findIndex].purchased_part_name = item[1] + ''
                  that.dataPurchased[findIndex].purchased_part_qty = item[3] + ''
                  that.dataPurchased[findIndex].purchased_part_memo = memo
                } else {
                  that.dataPurchased.push({
                    key: randomNum(1000, 9999999) + '',
                    purchased_part_no: item[0] + '',
                    purchased_part_key_number: item[4] + '',
                    purchased_part_number: item[2] + '',
                    purchased_part_name: item[1] + '',
                    purchased_part_qty: item[3] + '',
                    purchased_part_memo: memo
                  })
                }
              })

              // console.log(that.dataPurchased)

              // that.peopleArr = [];//清空接收数据
              // if(that.peopleArr.length == 1 && that.peopleArr[0].roleName == "" && that.peopleArr[0].enLine == ""){
              //     that.peopleArr = [];
              // }
              // 重写数据
              // try {

              // } catch (err) {
              //     console.log(err)
              // }
            } catch (e) {
                return false
            }
          }
          fileReader.readAsBinaryString(file)
      },
      refreshUploads () {
        queryStepData({ id: this.flowID, current_step: this.currentStep }).then(res => {
          if (res.result.step_data && res.result.step_data.length > 0) {
            const tmpData = JSON.parse(res.result.step_data[0].JSON)
            this.refreshImageList(tmpData.uploads)
            this.$message.info('上传照片成功')
          }
        })
      },
      getCurrentImgFlag () {
        return this.currentImgFlag
      },
      naChange (e) {
        this.not_applicable = e.target.checked
        if (this.not_applicable) {
          this.disableAll_1 = true
          this.disableAll_2 = true
          this.disableAll_3 = true
        } else {
          this.disableAll_1 = false
          this.disableAll_2 = false
          this.disableAll_3 = false
        }
      },
      tabChange (activeKey) {
        this.currentImgFlag = activeKey
      },
      valveNa (e) {
        this.disableAll_1 = e.target.checked
        this.checkDiskableAll()
      },
      actuatorNa (e) {
        this.disableAll_2 = e.target.checked
        this.data_teardown_actuator_not_applicable = true
        this.checkDiskableAll()
      },
      accessoryNa (e) {
        this.disableAll_3 = e.target.checked
        this.data_teardown_accessory_not_applicable = true
        this.checkDiskableAll()
      },
      checkDiskableAll () {
        if (this.disableAll_1 && this.disableAll_2 && this.disableAll_3) {
          this.not_applicable = true
        } else {
          this.not_applicable = false
        }
      },
      refreshImageList (uploadFiles) {
        var imgList1 = []
        var imgList2 = []
        var imgList3 = []
        uploadFiles.forEach(e => {
          if (e.flag === '1') {
            imgList1.push(e)
          }
        })
        uploadFiles.forEach(e => {
          if (e.flag === '2') {
            imgList2.push(e)
          }
        })
        uploadFiles.forEach(e => {
          if (e.flag === '3') {
            imgList3.push(e)
          }
        })

        setTimeout(() => {
          repairFields.forEach(v => this.form.getFieldDecorator(v))
          if (this.$refs.uploadImg1) {
            this.$refs.uploadImg1.imgFileList = imgList1
          }
          if (this.$refs.uploadImg2) {
            this.$refs.uploadImg2.imgFileList = imgList2
          }
          if (this.$refs.uploadImg3) {
            this.$refs.uploadImg3.imgFileList = imgList3
          }
        }, 0)
      },
      getValveRepairCheckList (field) {
        return getValvaRepairCheckFields(field.state)
      },
      getActuatorRepairCheckList (field) {
        return getActuatorRepairCheckFields(field.state)
      },
      getOtherRepairCheckList (field) {
        return getOtherRepairCheckFields(field.state)
      },
      // 标签操作完毕
      saveValveRepairTabDone () { this.isValveRepairTabDone = true },
      editValveRepairTab () { this.isValveRepairTabDone = false },
      saveActuatorRepairTabDone () { this.isActuatorRepairTabDone = true },
      editActuatorRepairTab () { this.isActuatorRepairTabDone = false },
      saveAccessoryRepairTabDone () { this.isAccessoryRepairTabDone = true },
      editAccessoryRepairTab () { this.isAccessoryRepairTabDone = false }
    },
    mounted () {
      var tmpFields = []
      tmpFields.push('not_applicable')
      tmpFields.forEach(v => this.form.getFieldDecorator(v))
      // 生成维修字段数据
      repairFields.length = 0
      this.ValveRepairFields.forEach(e => {
        for (var i = 1; i <= 11; i++) { // 维修动作最大到11
          var user = 'repair_user_' + e.state + '_' + i
          var time = 'repair_time_' + e.state + '_' + i
          if (repairFields.indexOf(user) < 0) {
            repairFields.push(user)
          }
          if (repairFields.indexOf(time) < 0) {
            repairFields.push(time)
          }
        }
      })
      this.ActuatorRepairFields.forEach(e => {
        for (var i = 1; i <= 11; i++) { // 维修动作最大到11
          var user = 'repair_user_' + e.state + '_' + i
          var time = 'repair_time_' + e.state + '_' + i
          if (repairFields.indexOf(user) < 0) {
            repairFields.push(user)
          }
          if (repairFields.indexOf(time) < 0) {
            repairFields.push(time)
          }
        }
      })
      this.AccessariesRepairFields.forEach(e => {
        for (var i = 1; i <= 11; i++) { // 维修动作最大到11
          var user = 'repair_user_' + e.state + '_' + i
          var time = 'repair_time_' + e.state + '_' + i
          if (repairFields.indexOf(user) < 0) {
            repairFields.push(user)
          }
          if (repairFields.indexOf(time) < 0) {
            repairFields.push(time)
          }
        }
      })
      repairFields.push('repair_content_text')

      const editData = this.$store.state.editStepData.stepEditData
      this.flowID = editData.flow_id
      this.currentStep = editData.current_step
      this.showDispatchUser = true
      let repairData = null
      // 供flutter刷新上传文件列表
      window.refreshUploads = this.refreshUploads
      window.getCurrentImgFlag = this.getCurrentImgFlag

      if (editData.step_data.length > 0) {
        repairData = JSON.parse(editData.step_data[0].JSON)
      }

      // 查询出评估内容，没有评估内容的项则禁止输入
      queryStepData({ id: this.flowID, current_step: 'Assessment' }).then(res => {
        repairFields.forEach(v => this.form.getFieldDecorator(v))
        this.assessmentData = JSON.parse(res.result.step_data[0].JSON)
        // 已经保存了更换零部件表单
        if (!repairData || repairData.purchased_parts.length <= 0) {
          this.dataPurchased = this.assessmentData.purchased_parts
        } else {
          this.dataPurchased = repairData.purchased_parts
        }

        // 加载编辑数据
        if (repairData != null) {
          this.form.setFieldsValue(pick(repairData, repairFields))
          this.not_applicable = repairData.not_applicable
          // 标签操作完毕
          if (repairData.is_valve_repair_tab_done) {
            this.isValveRepairTabDone = repairData.is_valve_repair_tab_done
          }
          if (repairData.is_actuator_repair_tab_done) {
            this.isActuatorRepairTabDone = repairData.is_actuator_repair_tab_done
          }
          if (repairData.is_accessory_repair_tab_done) {
            this.isAccessoryRepairTabDone = repairData.is_accessory_repair_tab_done
          }
        }

        // 引用评估内容的备注
        if (repairData && repairData.repair_content_text) {
          this.form.setFieldsValue(pick({ repair_content_text: this.assessmentData.assessment_content }, ['repair_content_text']))
        }
        // 获取维修前测试中选中的维修项
        queryStepData({ id: this.flowID, current_step: '(start)' }).then(res => {
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

          if (repairData) {
            if (repairData.valve_not_applicable) {
              this.disableAll_1 = repairData.valve_not_applicable
            }
            if (repairData.actuator_not_applicable) {
              this.disableAll_2 = repairData.actuator_not_applicable
            }
            if (repairData.accessaries_not_applicable) {
              this.disableAll_3 = repairData.accessaries_not_applicable
            }
            this.refreshImageList(repairData.uploads)
          }
        })

        // 查找所有维修工程师
        getUserList({ pageSize: 99999999, pageNo: 1, position: '2' }).then(res => {
          if (res.result.data.length > 0) {
            res.result.data.forEach(e => {
              this.dispatchUserData.push({
                key: e.id,
                label: e.user_name
              })
            })
          }
        })

        // getStepUsers({ flow_id: this.flowID, current_step: this.currentStep, flag: '1' }).then(res => {
        //   if (res.result.data.length > 0) {
        //     res.result.data.forEach(e => {
        //       this.dispatchUserData.push({
        //         key: e.user_id,
        //         label: e.user_name
        //       })
        //     })
        //   }
        // })
      })
      this.fartherWidth = this.$refs.farther.clientWidth + 50 + 'px'
      window.onresize = () => {
        this.fartherWidth = this.$refs.farther.clientWidth + 50 + 'px'
      }
    },
    watch: {
      fartherWidth: {
        handler (val) {
          this.fartherWidth = val
        }
      }
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
        assessmentData: {},
        userData: {},
        showValveForm: false,
        showActuatorForm: false,
        showSlaveForm: false,
        dispatchUserData: [],
        columnsPurchased: getColumnsPurchased(),
        dataPurchased: [],
        showDispatchUser: false,
        not_applicable: false,
        baseInfo: {},
        disableAll_1: false,
        disableAll_2: false,
        disableAll_3: false,
        currentImgFlag: '1',
        isValveRepairTabDone: false,
        isActuatorRepairTabDone: false,
        fartherWidth: '',
        isAccessoryRepairTabDone: false
      }
    }
}

</script>

<style>
</style>
