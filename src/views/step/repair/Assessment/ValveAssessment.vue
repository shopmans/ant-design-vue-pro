<template>
  <div>
    <a-card title="阀门评估" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
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
      <template v-for="item in rowoptions">
        <AssessmentRow :rowoptions="item" :key="item.state" />
      </template>
    </a-card>
    <br><br>
  </div>
</template>

<script>
import AssessmentRow from '../../modules/AssessmentRow'
import { getValveASFields } from '@/api/assessment'

const rowoptions = getValveASFields()

export default {
    components: {
        AssessmentRow
    },
    data () {
        return {
            rowoptions
        }
  }
}

</script>

<style>
</style>
