<template>
  <div>
    <a-card title="附件功能测试" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <template slot="extra">
        <a-checkbox :disabled="isDone" v-model="local_not_applicable" @change="localNotApplicableChange">
          不适用
        </a-checkbox>
      </template>
      <!-- 行1 -->
      <a-row class="form-row" :gutter="16">
        <template v-if="selectArea.other_slave_select_area.indexOf('1')>=0">
          <a-col :lg="6" :md="12" :sm="24" v-if="baseInfo.control_model === '1'">
            <a-form-item>
              <div class="linehight">定位器(4mA 12mA 20mA)</div>
              <a-radio-group :disabled="disableAll || isDone" v-decorator="['accessory_locator_is_success', { } ]">
                <a-radio :value="1">
                  正常
                </a-radio>
                <a-radio :value="2">
                  异常
                </a-radio>
              <!-- <a-input v-decorator="[ 'accessory_test_locator', {rules: []} ]" /> -->
              </a-radio-group>
            </a-form-item>
          </a-col>
        </template>
        <template v-if="selectArea.other_slave_select_area.indexOf('2')>=0">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item>
              <div class="linehight">过滤减压阀</div>
              <a-radio-group :disabled="disableAll || isDone" v-decorator="['accessory_test_filter_reducing_valve_is_success', { } ]">
                <a-radio :value="1">
                  正常
                </a-radio>
                <a-radio :value="2">
                  异常
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </template>
        <template v-if="selectArea.other_slave_select_area.indexOf('3')>=0">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item>
              <div class="linehight">电磁阀</div>
              <a-radio-group :disabled="disableAll || isDone" v-decorator="['accessory_test_elec_valve_is_success', { } ]">
                <a-radio :value="1">
                  正常
                </a-radio>
                <a-radio :value="2">
                  异常
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </template>
        <template v-if="selectArea.other_slave_select_area.indexOf('4')>=0">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item>
              <div class="linehight">位置开关-开位</div>
              <a-radio-group :disabled="disableAll || isDone" v-decorator="['accessory_test_position_switch_is_success', { } ]" @change="onChange">
                <a-radio :value="1">
                  正常
                </a-radio>
                <a-radio :value="2">
                  异常
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item>
              <div class="linehight">位置开关-关位</div>
              <a-radio-group :disabled="disableAll || isDone" v-decorator="['accessory_test_position_switch_close_is_success', { } ]" @change="onChange">
                <a-radio :value="1">
                  正常
                </a-radio>
                <a-radio :value="2">
                  异常
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </template>
        <template v-if="selectArea.other_slave_select_area.indexOf('5')>=0">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item>
              <div class="linehight">保位/切换阀</div>
              <a-radio-group :disabled="disableAll || isDone" v-decorator="['accessory_test_retaining_valve_is_success', { } ]">
                <a-radio :value="1">
                  正常
                </a-radio>
                <a-radio :value="2">
                  异常
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item>
              <div class="linehight">保位/切换阀设定点</div>
              <a-input
                style="width:200px;"
                v-decorator="[
                  'accessory_test_retaining_valve_set_point',
                  {rules: []}
                ]">
                <a-select :disabled="disableAll || isDone" v-decorator="[ 'accessory_test_retaining_valve_set_point_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
                  <a-select-option value="1">
                    PSI
                  </a-select-option>
                  <a-select-option value="2">
                    BAR
                  </a-select-option>
                  <a-select-option value="3">
                    MPa
                  </a-select-option>
                </a-select>
              </a-input>
            </a-form-item>
          </a-col>
        </template>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">气动放大器</div>
            <a-radio-group :disabled="disableAll || isDone" v-decorator="['accessory_test_pneumatic_amplifier_is_success', { } ]">
              <a-radio :value="1">
                正常
              </a-radio>
              <a-radio :value="2">
                异常
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <template v-if="selectArea.other_slave_target.length>=0">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item>
              <div class="linehight">其它</div>
              <a-radio-group :disabled="disableAll || isDone" v-decorator="['accessory_test_other_is_success', { } ]">
                <a-radio :value="1">
                  正常
                </a-radio>
                <a-radio :value="2">
                  异常
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </template>
      </a-row>
      <a-divider></a-divider>
      <a-row class="form-row" :gutter="16">
        <a-card title="执行人" :headStyle="{fontWeight:'bold'}">
          <dispatchUser :disableAll="disableAll || isDone" :flowID="flowId" :currentStep="currentStep" :flag="'3'" />
        </a-card>
      </a-row>
      <a-row>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="测试日期">
            <a-date-picker :disabled="disableAll || isDone" valueFormat="YYYY-MM-DDTHH:mm:ssZ" v-decorator="['accessory_test_date', {}]" style="width: 90%" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">工时(min)</div>
            <a-input-number
              :disabled="disableAll || isDone"
              style="width:90%;"
              :min="0"
              v-decorator="[
                'accessory_test_active_total_minute',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="16">
        <a-col>
          <a-form-item>
            <div class="linehight">备注</div>
            <a-textarea
              :disabled="disableAll || isDone"
              rows="6"
              v-decorator="[
                'accessory_test_memo',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-card>
    <br>
    <a-card title="结论">
      <a-row class="form-row" :gutter="16">
        <a-col :span="24">
          <a-form-item>
            <div class="linehight"></div>
            <a-radio-group :disabled="disableAll || isDone" v-decorator="['prerepair_content_3', {rules: []}]">
              <a-radio :value="1">
                合格
              </a-radio>
              <a-radio :value="2" style="margin-left:50px;">
                不合格
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
    </a-card>
    <!-- 文件上传 -->
    <br>
    <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <uploadImg ref="uploadImg" :disableAll="disableAll || isDone" :isMobile="isMobile" :queueType="'3'" :flag="'2'" />
    </a-card>
    <br>
    <a-card>
      <div style="float:right;">
        <a-button style="margin-right: 8px;" :disabled="disableAll || isDone" type="primary" @click="doneTab">操作完毕</a-button>
        <a-button :disabled="disableAll" @click="editTab">编辑</a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
import dispatchUser from '@/views/step/modules/DispatchUser'
import uploadImg from '../../modules/UploadImg'

export default {
  props: {
    baseInfo: {
      type: Object,
      default: null
    },
    flowId: {
      type: String,
      default: null
    },
    currentStep: {
      type: String,
      default: null
    },
    selectArea: {
      type: Object,
      default: null
    },
    disableAll: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    isDone: {
      type: Boolean,
      default: false
    }
  },
  components: {
    dispatchUser,
    uploadImg
  },
  watch: {
    disableAll (val) {
      this.local_not_applicable = val
    }
  },
  mounted () {
    const editData = this.$store.state.editStepData.stepEditData
    const data = JSON.parse(editData.step_data[0].JSON)
    if (data.accessory_test_not_applicable === '1') {
      this.local_not_applicable = true
    }
  },
  methods: {
    onChange (e) {
      if (e.target.value === 2) {
        this.$emit('notOk')
      }
    },
    localNotApplicableChange (e) {
      var tmpValue = e.target.checked ? '1' : '0'
      this.$emit('setFieldValue', 'accessory_test_not_applicable', tmpValue)
    },
    getUploadImgData () {
      return this.$refs.uploadImg.imgFileList
    },
    setUploadImgData (data) {
      this.$refs.uploadImg.imgFileList = data
    },
    doneTab () { this.$emit('done') },
    editTab () { this.$emit('edit') }
  },
  data () {
    return {
      local_not_applicable: false
    }
  }
}
</script>

<style>

</style>
