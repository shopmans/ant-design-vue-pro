<template>
  <div>
    <div class="linehight">{{ rowoptions.title }}</div>
    <a-row :gutter="24">
      <a-col :span="4">
        <a-form-item>
          <a-select v-decorator="[ stateString, {}]">
            <a-select-option value="1">
              完好
            </a-select-option>
            <a-select-option value="2">
              损坏
            </a-select-option>
            <a-select-option value="3">
              螺栓损坏
            </a-select-option>
            <a-select-option value="4">
              气蚀
            </a-select-option>
            <a-select-option value="5">
              腐蚀
            </a-select-option>
            <a-select-option value="6">
              破裂
            </a-select-option>
            <a-select-option value="7">
              剪切
            </a-select-option>
            <a-select-option value="8">
              侵蚀
            </a-select-option>
            <a-select-option value="9">
              闪蒸
            </a-select-option>
            <a-select-option value="10">
              咬合(擦伤)
            </a-select-option>
            <a-select-option value="11">
              点蚀
            </a-select-option>
            <a-select-option value="12">
              水洗
            </a-select-option>
            <a-select-option value="13">
              磨损
            </a-select-option>
            <a-select-option value="14">
              N/A
            </a-select-option>
            <a-select-option value="15">
              Other
            </a-select-option>
          </a-select>
          <!-- <a-radio-group v-decorator="[stateString, { }]">
            <a-radio :value="1">
              良好
            </a-radio>
            <a-radio :value="2">
              损伤
            </a-radio>
            <a-radio :value="3">
              损坏
            </a-radio>
          </a-radio-group> -->
        </a-form-item>
      </a-col>
      <a-col :span="14">
        <a-form-item>
          <a-checkbox-group v-decorator="[repairString, { }]" :options="checkBoxOptions" />
        </a-form-item>
      </a-col>
      <a-col :span="6" >
        <a-form-item>
          <a-input placeholder="备注" v-decorator="[memoString, { }]" :options="checkBoxOptions" />
        </a-form-item>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getRepairCheckBoxOptions } from '@/api/assessment'

  const checkBoxOptions = getRepairCheckBoxOptions()

export default {
    props: {
        rowoptions: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            checkBoxOptions,
            stateString: '',
            repairString: '',
            memoString: ''
        }
    },
    mounted () {
        this.stateString = this.rowoptions.state + '_state'
        this.repairString = this.rowoptions.state + '_repair'
        this.memoString = this.rowoptions.state + '_memo'
    }
}
</script>

<style scoped>
.linehight {
  line-height: 15px;
  padding: 0;
  margin:0
}

</style>
