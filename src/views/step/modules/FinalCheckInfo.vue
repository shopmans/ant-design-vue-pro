<template>
  <div>
    <a-card title="最终检查" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <a-descriptions>
        <a-descriptions-item label="工作单号">{{ baseInfo.work_order_serial }}</a-descriptions-item>
        <a-descriptions-item label="维修合同号">{{ project.contract_serial }}</a-descriptions-item>
        <a-descriptions-item label="日期">{{ moment(project.date).format('YYYY-MM-DD HH:mm:ss') }}</a-descriptions-item>
        <a-descriptions-item label="客户名称">{{ project.customer_name }}</a-descriptions-item>
        <a-descriptions-item label="位号">{{ baseInfo.tag }}</a-descriptions-item>
        <a-descriptions-item label="序列号">{{ valveInfo.valve_serial }}</a-descriptions-item>
        <a-descriptions-item label="阀门型号">{{ valveInfo.valve_model }}</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px">检查实物</a-divider>
      <template v-for="(item,index) in finalCheckFieldsA">
        <!-- 判断是否存在值 -->
        <template v-if="finalCheckData[item]">
          <a-row :gutter="16" :key="item + index">
            <a-col :span="13">
              <a-descriptions size="small">
                <a-descriptions-item :label="finalCheckFieldsLabelA[index]"></a-descriptions-item>
              </a-descriptions>
            </a-col>
            <!-- 找到勾选的哪个东东 -->
            <a-col :span="6">
              <a-badge v-if="finalCheckData[item].indexOf('1')>=0" status="success" :offset="[-1,5]">是</a-badge>
              <a-badge v-else>是</a-badge>
              <a-badge v-if="finalCheckData[item].indexOf('2')>=0" status="success" :offset="[-1,5]" style="margin-left:15px;">否</a-badge>
              <a-badge v-else style="margin-left:15px;">否</a-badge>
              <a-badge v-if="finalCheckData[item].indexOf('3')>=0" status="success" :offset="[-1,5]" style="margin-left:15px;">不适用</a-badge>
              <a-badge v-else style="margin-left:15px;">不适用</a-badge>
            </a-col>
          </a-row>
        </template>
      </template>
      <a-divider style="margin-bottom: 32px">检查报告</a-divider>
      <template v-for="(item,index) in finalCheckFieldsB">
        <!-- 判断是否存在值 -->
        <template v-if="finalCheckData[item]">
          <a-row :gutter="16" :key="item + index">
            <a-col :span="13">
              <a-descriptions size="small">
                <a-descriptions-item :label="finalCheckFieldsLabelB[index]"></a-descriptions-item>
              </a-descriptions>
            </a-col>
            <!-- 找到勾选的哪个东东 -->
            <a-col :span="6">
              <a-badge v-if="finalCheckData[item].indexOf('1')>=0" status="success" :offset="[-1,5]">是</a-badge>
              <a-badge v-else>是</a-badge>
              <a-badge v-if="finalCheckData[item].indexOf('2')>=0" status="success" :offset="[-1,5]" style="margin-left:15px;">否</a-badge>
              <a-badge v-else style="margin-left:15px;">否</a-badge>
              <a-badge v-if="finalCheckData[item].indexOf('3')>=0" status="success" :offset="[-1,5]" style="margin-left:15px;">不适用</a-badge>
              <a-badge v-else style="margin-left:15px;">不适用</a-badge>
            </a-col>
          </a-row>
        </template>
      </template>
    </a-card>

    <br><br>

    <a-card :bordered="false" title="上传图片">
      <UploadImgRead ref="uploadImgRead" />
    </a-card>
  </div>
</template>

<script>
import UploadImgRead from '../modules/UploadImgRead'
import { queryStepDataOnlyread } from '@/api/step'
import { getFinalCheckFieldsLabelA, getFinalCheckFieldsA, getFinalCheckFieldsLabelB, getFinalCheckFieldsB } from '@/api/finalCheck'
import moment from 'moment'

export default {
  components: {
    UploadImgRead
  },
  methods: {
    moment
  },
  mounted () {
    if (!this.$store.state.editStepData.stepEditData || this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
      this.$message.warning('当前流程没有保存数据')
      return
    }
    this.finalCheckData = JSON.parse(this.$store.state.editStepData.stepEditData.step_data[0].JSON)
    this.$refs.uploadImgRead.imgFileList = this.finalCheckData.uploads

    queryStepDataOnlyread({ id: this.finalCheckData.flow_id, current_step: '(start)' }).then(res => {
      // 找到 baseInfo
      res.result.step_data.forEach(item => {
        if (item.DataNum === 1) {
          this.baseInfo = JSON.parse(item.JSON)
        }
          if (item.DataNum === 2) {
          this.valveInfo = JSON.parse(item.JSON)
        }
      })
      // 找到project
      this.project = res.result.project
    })
  },
  data () {
      return {
        baseInfo: {},
        project: {},
        valveInfo: {},
        finalCheckData: {},
        finalCheckFieldsLabelA: getFinalCheckFieldsLabelA(),
        finalCheckFieldsA: getFinalCheckFieldsA(),
        finalCheckFieldsLabelB: getFinalCheckFieldsLabelB(),
        finalCheckFieldsB: getFinalCheckFieldsB()
      }
    }
}
</script>

<style>

</style>
