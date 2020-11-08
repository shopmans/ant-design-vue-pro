<template>
  <div>
    <div id="printMe" ref="imgTransf">
      <div style="border:6px solid black;padding: 3px;border-radius: 15px;width:567px;height:354px;">
        <a-row>
          <a-col :span="12" style="margin-top:40px;">
            <span style="font-weight:bold;font-size:20px;">工单编号:{{ workOrder }}</span><br />
            <span style="font-weight:bold;font-size:20px;">客户名称:{{ customerName }}</span><br />
            <span style="font-weight:bold;font-size:20px;">位号:{{ tag }}</span><br />
            <span style="font-weight:bold;font-size:20px;">阀体型号:{{ valveModel }}</span><br />
            <span style="font-weight:bold;font-size:20px;">阀体尺寸:{{ valveSize }}</span><br />
            <span style="font-weight:bold;font-size:20px;">执行机构型号:{{ actuModel }}</span><br />
            <span style="font-weight:bold;font-size:20px;">执行机构尺寸:{{ actuSize }}</span><br />
          </a-col>
          <a-col :span="12" style="margin-top:40px;">
            <div align="center" id="qrcode"></div>
          </a-col>
        </a-row>
      </div>
      <!-- <a-descriptions :column="1" size="small" bordered>
        <a-descriptions-item label="工单编号">{{ workOrder }}</a-descriptions-item>
        <a-descriptions-item label="客户名称">{{ customerName }}</a-descriptions-item>
        <a-descriptions-item label="位号">{{ tag }}</a-descriptions-item>
        <a-descriptions-item label="阀体型号">{{ valveModel }}</a-descriptions-item>
        <a-descriptions-item label="阀体尺寸">{{ valveSize }}</a-descriptions-item>
        <a-descriptions-item label="执行机构型号">{{ actuModel }}</a-descriptions-item>
        <a-descriptions-item label="执行机构尺寸">{{ actuSize }}</a-descriptions-item>
      </a-descriptions> -->
    </div>
    <div>
      <a-button hidden ref="printQrcodeBtn" v-print="printObj"></a-button>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import html2canvas from 'html2canvas'

export default {
    mounted () {
        if (!this.$store.state.editStepData) {
          return
        }
        if (!this.$store.state.editStepData.stepEditData.step_data || !this.$store.state.editStepData.stepEditData.step_data.length || this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
          return
        }
        const stepData = this.$store.state.editStepData.stepEditData.step_data
        this.flowId = this.$store.state.editStepData.stepEditData.flow_id
        stepData.forEach(e => {
            switch (e.DataNum) {
                case 1: // baseInfo
                    const baseInfo = JSON.parse(e.JSON)
                    this.tag = baseInfo.tag.length <= 0 ? 'N/A' : baseInfo.tag
                    this.workOrder = baseInfo.work_order_serial.length <= 0 ? 'N/A' : baseInfo.work_order_serial
                    this.customerName = this.$store.state.editStepData.stepEditData.project.customer_name
                    break
                case 2: // valve
                    const valveData = JSON.parse(e.JSON)
                    this.valveModel = valveData.valve_model.length <= 0 ? 'N/A' : valveData.valve_model
                    this.valveSize = valveData.valve_size.length <= 0 ? 'N/A' : valveData.valve_size
                    break
                case 3: // actu
                    const actuData = JSON.parse(e.JSON)
                    this.actuModel = actuData.actu_model.length <= 0 ? 'N/A' : actuData.actu_model
                    this.actuSize = actuData.actu_size.length <= 0 ? 'N/A' : actuData.actu_size
                    break
            }
        })
        this.qrcode()
    },
    methods: {
        qrcode () {
            this.qrCode = new QRCode('qrcode', {
                width: 240,
                height: 240,
                text: this.$store.state.user.info.qrcodeUrl + '/api/qrcode?id=' + this.flowId
            })
        },
        printQrcode () {
            this.$refs.printQrcodeBtn.$el.click()
        },
        shotImage () {
          const imgHeight = window.document.querySelector('#printMe').offsetHeight // 获取DOM高度
          const imgWidth = window.document.querySelector('#printMe').offsetWidth // 获取DOM宽度
          const scale = window.devicePixelRatio // 获取设备像素比
          html2canvas(this.$refs.imgTransf, {
            backgroundColor: null, // 设置背景颜色
            useCORS: true, // 允许图片跨域
            scale: scale, // 缩放2倍，使得图片更加清晰
            width: imgWidth,
            height: imgHeight,
            imageTimeout: 5000, // 设置图片的超时，设置0为禁用
            proxy: '', // url代理，用于加载跨域图源，为空则不会加载
            ignoreElements: element => {
              // 用于忽略转换的图片中不需要的匹配元素，注意，为true才不会转换
              if (element.id === 'mytitle') {
                return true
              }
            }
          }).then(canvas => {
            this.imgURL = canvas.toDataURL('image/png')
            const img = new Image()
            img.src = this.imgURL
            const newWin = window.open('', '_blank')
            newWin.document.write(img.outerHTML)
            newWin.document.title = '二维码'
            newWin.document.close()
          })
        }
    },
    data () {
        return {
            qrCode: {},
            printObj: {
                id: 'printMe',
                popTitle: '　　',
                extraHead: '<meta http-equiv="Content-Language" content="zh-cn"/>'
            },
            workOrder: '',
            customerName: '',
            tag: '',
            valveModel: '',
            valveSize: '',
            actuModel: '',
            actuSize: '',
            flowId: '',
            imgURL: ''
        }
    }
}
</script>

<style>

</style>
