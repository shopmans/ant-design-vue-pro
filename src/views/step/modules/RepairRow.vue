<template>
  <div>
    <a-row :gutter="16">
      <a-divider>{{ titleString }}</a-divider>
      <a-col class="gutter-row" :span="2">
        <div class="linehight">抛光</div>
      </a-col>
      <a-col class="gutter-row" :span="2">
        <div class="linehight">校直</div>
      </a-col>
      <a-col class="gutter-row" :span="2">
        <div class="linehight">研磨</div>
      </a-col>
      <a-col class="gutter-row" :span="2">
        <div class="linehight">焊补</div>
      </a-col>
      <a-col class="gutter-row" :span="2">
        <div class="linehight">电镀</div>
      </a-col>
      <a-col class="gutter-row" :span="2">
        <div class="linehight">喷涂</div>
      </a-col>
      <a-col class="gutter-row" :span="2">
        <div class="linehight">车修</div>
      </a-col>
      <a-col class="gutter-row" :span="2">
        <div class="linehight">磨修</div>
      </a-col>
      <a-col class="gutter-row" :span="2">
        <div class="linehight">喷砂</div>
      </a-col>
      <a-col class="gutter-row" :span="2">
        <div class="linehight">喷漆</div>
      </a-col>
      <a-col class="gutter-row" :span="2">
        <div class="linehight">更换</div>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <template v-for="item in 11">
        <a-col class="gutter-row" :span="2" :key="item">
          <a-form-item><a-input v-decorator="[ 'repair_user_' + nameString + '_' + item, {rules: []} ]" placeholder="维修人员" /></a-form-item>
        </a-col>
      </template>
    </a-row>
    <a-row :gutter="16">
      <template v-for="item in 11">
        <a-col class="gutter-row" :span="2" :key="item">
          <a-form-item><a-input-number :min="0" style="width:100%;" v-decorator="[ 'repair_time_' + nameString + '_' + item, {rules: []} ]" placeholder="工时（分钟）" /></a-form-item>
        </a-col>
      </template>
    </a-row>
  </div>
</template>

<script>
export default {
    props: {
        rowoptions: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            nameString: '',
            titleString: ''
        }
    },
    mounted () {
        this.nameString = this.rowoptions.name
        this.titleString = this.rowoptions.title
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
