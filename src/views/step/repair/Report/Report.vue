<template>
  <a-modal
    :title="$t('menu.report')"
    :visible="visible"
    :destroyOnClose="true"
    :maskClosable="false"
    @ok="okReport"
    @cancel="cancelReport"
  >
    <a-card>
      <a-radio-group v-model="reportType">
        <a-radio value="a">阀门维修报告</a-radio>
        <a-radio value="b">阀门检测报告</a-radio>
        <a-radio value="c">定位器检测报告</a-radio>
        <a-radio value="d">阀门维修流程报告</a-radio>
      </a-radio-group>
    </a-card>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { getvalveRepairProcessReport } from '@/api/report'

export default {
    mounted () {
    },
    methods: {
        showModel (record) {
            this.record = record
            this.visible = true
        },
        okReport () {
            switch (this.reportType) {
                case 'a': {
                    this.$router.push({ name: 'RepairReportImageList', params: this.record })
                    break
                }
                case 'b': {
                    this.$router.push({ name: 'valveTestReportImageList', params: this.record })
                    break
                }
                case 'c': {
                    this.$router.push({ name: 'localtorTestReportImageList', params: this.record })
                    break
                }
                case 'd': {
                    this.valveRepairProcess(this.record)
                    break
                }
                default: {
                    this.$message.info('请选择一项报告类型')
                }
            }
// repairReport(record).then(res => {
//         const content = res
//         const blob = new Blob([content])
//         const fileName = 'SinoRepairReport.xlsx'
//         if ('download' in document.createElement('a')) { // 非IE下载
//           const elink = document.createElement('a')
//           elink.download = fileName
//           elink.style.display = 'none'
//           elink.href = URL.createObjectURL(blob)
//           document.body.appendChild(elink)
//           elink.click()
//           URL.revokeObjectURL(elink.href) // 释放URL 对象
//           document.body.removeChild(elink)
//         } else { // IE10+下载
//           navigator.msSaveBlob(blob, fileName)
//         }
//       })
        },
        cancelReport () { this.visible = false },
        valveRepairProcess (record) {
            getvalveRepairProcessReport(record).then(res => {
                const content = res
                const blob = new Blob([content])
                const fileName = 'SinoValveRepairProcessReport_' + moment(new Date()).format('YYYY_MM_DD_HH_mm_ss') + '.xlsx'
                if ('download' in document.createElement('a')) { // 非IE下载
                    const elink = document.createElement('a')
                    elink.download = fileName
                    elink.style.display = 'none'
                    elink.href = URL.createObjectURL(blob)
                    document.body.appendChild(elink)
                    elink.click()
                    URL.revokeObjectURL(elink.href) // 释放URL 对象
                    document.body.removeChild(elink)
                } else { // IE10+下载
                    navigator.msSaveBlob(blob, fileName)
                }
                this.$message.info('报告生成完毕')
            })
        }
    },
    data () {
        return {
            record: {},
            visible: false,
            reportType: 'a'
        }
    }
}
</script>

<style>

</style>
