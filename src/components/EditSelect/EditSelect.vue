<template>
  <a-select
    show-search
    :allowClear="true"
    :value="myValue"
    optionLabelProp="children"
    :autoClearSearchValue="false"
    :default-active-first-option="false"
    :show-arrow="true"
    :filter-option="true"
    :not-found-content="null"
    @search="handleSearch"
    @blur="handleBlur"
    @change="handleChange"
  >
    <a-select-option v-for="item in typeData" :key="item">
      {{ item }}
    </a-select-option>
  </a-select>
</template>

<script>

export default {
  components: {
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
        myValue: '',
        myValueLast: ''
    }
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: String
    },
    typeData: {
      type: Array,
      default: null
    }
  },
  methods: {
     handleSearch (v) {
       this.handleChange(v)
     },
     handleChange (v) {
         this.myValue = v
       // this.value = (!isNaN(value) && value !== '') ? this.typeData[value].work_type : value
     },
     handleBlur (value) {
        this.myValue = value
     }
  },
  watch: {
    // 监听数据变化，及时提交给父组件
    myValue: {
      deep: true,
      immediate: true,
      handler: function (newV, oldV) {
        // 向父组件更新
        if (this.myValueLast === newV) { return }
        this.$emit('change', this.myValue)
        this.myValueLast = this.myValue
      }
    },
    value: {
      deep: true,
      handler: function (newV, oldV) {
        console.log('mmmm ====', newV)
        this.myValue = this.value
      }
    }
  }
}
</script>

<style>

</style>
