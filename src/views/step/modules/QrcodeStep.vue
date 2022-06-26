<template>
  <div>
    <div id="printMe" ref="imgTransf" >
      <!-- 宽增加60 字体增到4号 -->
      <div style="border:3px solid black;padding: 3px;border-radius: 15px;width:627px;height:354px;">
        <a-row>
          <a-col :span="14" :class="customerName3.length > 0 ? 'threeLineCustomer' : 'twoLineCustomer'">
            <div style="font-weight:bold;font-size:24px;color:blank;">工单编号:{{ workOrder }}</div>
            <div style="font-weight:bold;font-size:24px;color:blank;position:relative;">
              <div>客户名称:{{ customerName1 }}</div>
              <div v-if="customerName2.length > 0" style="margin-left:105px;">{{ customerName2 }}</div>
              <div v-if="customerName3.length > 0" style="margin-left:105px;">{{ customerName3 }}</div>
            </div>
            <template v-if="tag !== 'N/A'">
              <div style="font-weight:bold;font-size:24px;color:blank;">位号:{{ tag }}</div>
            </template>
            <template v-else>
              <div style="font-weight:bold;font-size:24px;color:blank;">序列号:{{ serial }}</div>
            </template>
            <div style="font-weight:bold;font-size:24px;color:blank;">阀门型号:{{ valveModel }}</div>
            <div style="font-weight:bold;font-size:24px;color:blank;">阀体尺寸:{{ valveSize }}</div>
            <div style="font-weight:bold;font-size:24px;color:blank;">执行机构型号:{{ actuModel }}</div>
            <div style="font-weight:bold;font-size:24px;color:blank;">执行机构尺寸:{{ actuSize }}</div>
          </a-col>
          <a-col :span="10" style="margin-top:50px;">
            <div align="center" id="qrcode"></div>
          </a-col>
        </a-row>
      </div>
      <!-- <a-descriptions :column="1" size="small" bordered>
        <a-descriptions-item label="工单编号">{{ workOrder }}</a-descriptions-item> getValveSizeUnitText(ActuatorInfo.actu_size, ActuatorInfo.actu_size_unit)
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
import { getValveSizeUnitText } from '@/api/step'

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

        this.tag = 'N/A'
        this.serial = 'N/A'
        this.workOrder = 'N/A'
        this.customerName = 'N/A'
        this.valveModel = 'N/A'
        this.valveSize = 'N/A'
        this.actuModel = 'N/A'
        this.actuSize = 'N/A'

        stepData.forEach(e => {
            switch (e.DataNum) {
                case 1: // baseInfo
                    const baseInfo = JSON.parse(e.JSON)
                    this.tag = baseInfo.tag.length <= 0 ? 'N/A' : baseInfo.tag
                    this.serial = baseInfo.valve_serial.length <= 0 ? 'N/A' : baseInfo.valve_serial
                    this.workOrder = baseInfo.work_order_serial.length <= 0 ? 'N/A' : baseInfo.work_order_serial
                    this.customerName = this.$store.state.editStepData.stepEditData.project.customer_name
                    if (this.customerName.length > 16) {
                      this.customerName1 = this.customerName.substring(0, 8)
                      this.customerName2 = this.customerName.substring(8, 16)
                      this.customerName3 = this.customerName.substring(16, this.customerName.length)
                    } else if (this.customerName.length > 8) {
                      this.customerName1 = this.customerName.substring(0, 8)
                      this.customerName2 = this.customerName.substring(8, this.customerName.length)
                    } else {
                      this.customerName1 = this.customerName
                    }
                    break
                case 2: // valve
                    const valveData = JSON.parse(e.JSON)
                    this.valveModel = valveData.valve_model.length <= 0 ? 'N/A' : valveData.valve_model
                    this.valveSize = valveData.valve_size.length <= 0 ? 'N/A' : getValveSizeUnitText(valveData.valve_size, valveData.valve_size_unit)
                    break
                case 3: // actu
                    const actuData = JSON.parse(e.JSON)
                    this.actuModel = actuData.actu_model.length <= 0 ? 'N/A' : actuData.actu_model
                    this.actuSize = actuData.actu_size.length <= 0 ? 'N/A' : getValveSizeUnitText(actuData.actu_size, actuData.actu_size_unit)
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
            // this.$refs.printQrcodeBtn.$el.click()
            this.shotImage()
        },
        shotImage () {
          // const imgHeight = window.document.querySelector('#printMe').offsetHeight // 获取DOM高度
          // const imgWidth = window.document.querySelector('#printMe').offsetWidth // 获取DOM宽度
          // const scale = window.devicePixelRatio // 获取设备像素比
          // const scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 获取页面滚动高度

          html2canvas(document.getElementById('printMe'), {
            scrollX: 0,
            scrollY: 0,
            useCORS: true
          }).then(canvas => {
            this.imgURL = canvas.toDataURL('image/png')
            const img = new Image()
            img.src = this.imgURL
            const newWin = window.open('', '_blank')
            newWin.document.write(img.outerHTML)
            newWin.document.title = '二维码'
            newWin.document.close()
          })

          // html2canvas(this.$refs.imgTransf, {
          //   backgroundColor: null, // 设置背景颜色
          //   useCORS: true, // 允许图片跨域
          //   scale: scale, // 缩放2倍，使得图片更加清晰
          //   width: imgWidth,
          //   // height: imgHeight,
          //   dpi: window.devicePixelRatio,
          //   // windowWidth: 0, // 获取X方向滚动条内容
          //   // windowHeight: scrollTop, // 获取Y方向滚动条内容
          //   // x: 0,
          //   // y: -11,
          //   imageTimeout: 5000, // 设置图片的超时，设置0为禁用
          //   proxy: '', // url代理，用于加载跨域图源，为空则不会加载
          //   ignoreElements: element => {
          //     // 用于忽略转换的图片中不需要的匹配元素，注意，为true才不会转换
          //     if (element.id === 'mytitle') {
          //       return true
          //     }
          //   }
          // }).then(canvas => {
          //   this.imgURL = canvas.toDataURL('image/png')
          //   const img = new Image()
          //   img.src = this.imgURL
          //   const newWin = window.open('', '_blank')
          //   newWin.document.write(img.outerHTML)
          //   newWin.document.title = '二维码'
          //   newWin.document.close()
          // })
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
            customerName1: '',
            customerName2: '',
            customerName3: '',
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

<style scoped>
 .twoLineCustomer{
   margin-top:30px;
 }
 .threeLineCustomer{
   margin-top:10px;
 }
</style>
