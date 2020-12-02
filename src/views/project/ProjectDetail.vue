<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-descriptions :title="$t('menu.project.detail.info')">
        <a-descriptions-item :label="$t('menu.project.view.query.projectDate')">{{ formatDate(detailData.date) }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.detail.serial')">{{ detailData.serial }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.view.query.projectState')">{{ $t(projectState(detailData.state)) }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.detail.estStartDate')">{{ formatExDate(detailData.ex_open_date) }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.detail.estCloseDate')">{{ formatExDate(detailData.ex_close_date) }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.detail.estWorkTime')">{{ detailData.ex_working_hours }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.detail.estMaterialCost')">{{ detailData.ex_material_fee }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.detail.repairShop')">{{ $t(projectRepairPlan(detailData.repair_plan)) }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.detail.repairNumber')">{{ detailData.number }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.detail.projectOwner')">{{ detailData.create_user_name }}</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px"/>
      <a-descriptions :title="$t('menu.project.detail.contractInfo')">
        <a-descriptions-item :label="$t('menu.project.view.query.customerName')">{{ detailData.customer_name }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.customer.new.finallyUser')">{{ detailData.finally_user }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.view.table.column.sales')">{{ detailData.sales_name }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.detail.contractNumber')">{{ detailData.contract_serial }}</a-descriptions-item>
        <a-descriptions-item :label="$t('menu.project.view.table.column.total')">{{ formatContractTotal(detailData.total) }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <br>
    <a-button type="primary" @click="cancelDetail">{{ $t('app.button.cancel') }}</a-button>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { formatTotal } from '@/api/project'

export default {
  data () {
    return {
      detailData: {}
    }
  },
  mounted () {
    if (this.$store.state.user.detailData.data.length > 0) {
        this.detailData = this.$store.state.user.detailData.data[0]
    }
  },
  methods: {
    cancelDetail () {
        this.$router.push({ path: '/project/project-list' })
    },
    formatDate (val) {
      if (val === undefined || val.length <= 0) {
        return ''
      }
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    },
    formatExDate (val) {
      if (val === undefined || val.length <= 0) {
        return ''
      }
      return moment(val).format('YYYY-MM-DD')
    },
    projectState (val) {
        switch (val) {
            case '1':
                return 'menu.project.view.query.projectState.item1'
            case '2':
                return 'menu.project.view.query.projectState.item2'
            case '3':
                return 'menu.project.view.query.projectState.item3'
        }
    },
    projectRepairPlan (val) {
        switch (val) {
            case '1':
                return 'menu.project.detail.repairShop.item1'
            case '2':
                return 'menu.project.detail.repairShop.item2'
        }
    },
    formatContractTotal (val) {
      return formatTotal(val)
    }
  }
}
</script>

<style>

</style>
