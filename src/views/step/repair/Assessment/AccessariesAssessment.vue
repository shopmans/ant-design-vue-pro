<template>
  <div>
    <a-card title="附件评估" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
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
import DispatchUser from '../../modules/DispatchUser'
import { getAccessariesASFields } from '@/api/assessment'

  const rowoptions = getAccessariesASFields()

export default {
    components: {
        AssessmentRow,
        DispatchUser
    },
    data () {
        return {
            rowoptions
        }
  }
}

// <!-- 行1 -->
//       <div class="linehight">Positioner（定位器）</div>
//       <a-row :gutter="16">
//         <a-col class="gutter-row" :span="6">
//           <a-form-item>
//             <a-radio-group v-decorator="['assessment_flanges_state', { }]">
//               <a-radio :value="1">
//                 良好
//               </a-radio>
//               <a-radio :value="2">
//                 损伤
//               </a-radio>
//               <a-radio :value="3">
//                 损坏
//               </a-radio>
//             </a-radio-group>
//           </a-form-item>
//         </a-col>
//         <a-col class="gutter-row" :span="18">
//           <a-form-item>
//             <a-checkbox-group name="assessment_flanges_repair" :options="checkBoxOptions" />
//           </a-form-item>
//         </a-col>
//       </a-row>
//       <!-- 行2 -->
//       <div class="linehight">Airset（减压阀）</div>
//       <a-row :gutter="16">
//         <a-col class="gutter-row" :span="6">
//           <a-form-item>
//             <a-radio-group v-decorator="['assessment_airset_state', { }]">
//               <a-radio :value="1">
//                 良好
//               </a-radio>
//               <a-radio :value="2">
//                 损伤
//               </a-radio>
//               <a-radio :value="3">
//                 损坏
//               </a-radio>
//             </a-radio-group>
//           </a-form-item>
//         </a-col>
//         <a-col class="gutter-row" :span="18">
//           <a-form-item>
//             <a-checkbox-group name="assessment_airset_repair" :options="checkBoxOptions" />
//           </a-form-item>
//         </a-col>
//       </a-row>
//       <!-- 行3 -->
//       <div class="linehight">Filter(过滤器）</div>
//       <a-row :gutter="16">
//         <a-col class="gutter-row" :span="6">
//           <a-form-item>
//             <a-radio-group v-decorator="['assessment_filter_state', { }]">
//               <a-radio :value="1">
//                 良好
//               </a-radio>
//               <a-radio :value="2">
//                 损伤
//               </a-radio>
//               <a-radio :value="3">
//                 损坏
//               </a-radio>
//             </a-radio-group>
//           </a-form-item>
//         </a-col>
//         <a-col class="gutter-row" :span="18">
//           <a-form-item>
//             <a-checkbox-group name="assessment_filter_repair" :options="checkBoxOptions" />
//           </a-form-item>
//         </a-col>
//       </a-row>
//       <!-- 行4 -->
//       <div class="linehight">Solenoid（电磁阀）</div>
//       <a-row :gutter="16">
//         <a-col class="gutter-row" :span="6">
//           <a-form-item>
//             <a-radio-group v-decorator="['assessment_solenoid_state', { }]">
//               <a-radio :value="1">
//                 良好
//               </a-radio>
//               <a-radio :value="2">
//                 损伤
//               </a-radio>
//               <a-radio :value="3">
//                 损坏
//               </a-radio>
//             </a-radio-group>
//           </a-form-item>
//         </a-col>
//         <a-col class="gutter-row" :span="18">
//           <a-form-item>
//             <a-checkbox-group name="assessment_solenoid_repair" :options="checkBoxOptions" />
//           </a-form-item>
//         </a-col>
//       </a-row>
//       <!-- 行5 -->
//       <div class="linehight">Transmitter(位置变送器）</div>
//       <a-row :gutter="16">
//         <a-col class="gutter-row" :span="6">
//           <a-form-item>
//             <a-radio-group v-decorator="['assessment_transmitter_state', { }]">
//               <a-radio :value="1">
//                 良好
//               </a-radio>
//               <a-radio :value="2">
//                 损伤
//               </a-radio>
//               <a-radio :value="3">
//                 损坏
//               </a-radio>
//             </a-radio-group>
//           </a-form-item>
//         </a-col>
//         <a-col class="gutter-row" :span="18">
//           <a-form-item>
//             <a-checkbox-group name="assessment_transmitter_repair" :options="checkBoxOptions" />
//           </a-form-item>
//         </a-col>
//       </a-row>
//       <!-- 行6 -->
//       <div class="linehight">I/P Transducer（电气转换器）</div>
//       <a-row :gutter="16">
//         <a-col class="gutter-row" :span="6">
//           <a-form-item>
//             <a-radio-group v-decorator="['assessment_ip_transducer_state', { }]">
//               <a-radio :value="1">
//                 良好
//               </a-radio>
//               <a-radio :value="2">
//                 损伤
//               </a-radio>
//               <a-radio :value="3">
//                 损坏
//               </a-radio>
//             </a-radio-group>
//           </a-form-item>
//         </a-col>
//         <a-col class="gutter-row" :span="18">
//           <a-form-item>
//             <a-checkbox-group name="assessment_ip_transducer_repair" :options="checkBoxOptions" />
//           </a-form-item>
//         </a-col>
//       </a-row>
//       <!-- 行7 -->
//       <div class="linehight">Limit Switch（位置开关）</div>
//       <a-row :gutter="16">
//         <a-col class="gutter-row" :span="6">
//           <a-form-item>
//             <a-radio-group v-decorator="['assessment_limit_switch_state', { }]">
//               <a-radio :value="1">
//                 良好
//               </a-radio>
//               <a-radio :value="2">
//                 损伤
//               </a-radio>
//               <a-radio :value="3">
//                 损坏
//               </a-radio>
//             </a-radio-group>
//           </a-form-item>
//         </a-col>
//         <a-col class="gutter-row" :span="18">
//           <a-form-item>
//             <a-checkbox-group name="assessment_limit_switch_repair" :options="checkBoxOptions" />
//           </a-form-item>
//         </a-col>
//       </a-row>
//       <!-- 行8 -->
//       <div class="linehight">Lockup/Trip Valve（保位/切换阀）</div>
//       <a-row :gutter="16">
//         <a-col class="gutter-row" :span="6">
//           <a-form-item>
//             <a-radio-group v-decorator="['assessment_lockup_trip_valve_state', { }]">
//               <a-radio :value="1">
//                 良好
//               </a-radio>
//               <a-radio :value="2">
//                 损伤
//               </a-radio>
//               <a-radio :value="3">
//                 损坏
//               </a-radio>
//             </a-radio-group>
//           </a-form-item>
//         </a-col>
//         <a-col class="gutter-row" :span="18">
//           <a-form-item>
//             <a-checkbox-group name="assessment_lockup_trip_valve_repair" :options="checkBoxOptions" />
//           </a-form-item>
//         </a-col>
//       </a-row>
//       <!-- 行9 -->
//       <div class="linehight">Handwheel（手轮）</div>
//       <a-row :gutter="16">
//         <a-col class="gutter-row" :span="6">
//           <a-form-item>
//             <a-radio-group v-decorator="['assessment_handwheel_state', { }]">
//               <a-radio :value="1">
//                 良好
//               </a-radio>
//               <a-radio :value="2">
//                 损伤
//               </a-radio>
//               <a-radio :value="3">
//                 损坏
//               </a-radio>
//             </a-radio-group>
//           </a-form-item>
//         </a-col>
//         <a-col class="gutter-row" :span="18">
//           <a-form-item>
//             <a-checkbox-group name="assessment_handwheel_repair" :options="checkBoxOptions" />
//           </a-form-item>
//         </a-col>
//       </a-row>

</script>

<style>
</style>
