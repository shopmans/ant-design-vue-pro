<template>
  <div ref="farther">
    <page-header-wrapper
      style="position: fixed; z-index: 9; border-bottom: 1px solid #e8e8e8"
      :style="{ width: fartherWidth }"
    >
      <template slot="extra">
        <a-checkbox key="1" v-model="not_applicable" @change="naChange"> 不适用 </a-checkbox>
      </template>
    </page-header-wrapper>
    <br />
    <br />
    <br />
    <br />
    <a-card
      title="入厂检查表 Receivd Condition Checklist"
      :headStyle="{ fontWeight: 'bold' }"
      :bodyStyle="{ padding: '30px 30px' }"
    >
      <a-descriptions title="基本信息" :column="4">
        <a-descriptions-item label="工单号">{{ refData1.work_order_serial }}</a-descriptions-item>
        <a-descriptions-item label="合同号">{{ projectData.contract_serial }}</a-descriptions-item>
        <a-descriptions-item label="客户名称">{{ projectData.customer_name }}</a-descriptions-item>
        <a-descriptions-item label="位号">{{ refData1.tag }}</a-descriptions-item>
        <a-descriptions-item label="阀门序列号/批次号">{{ valveRefData.valve_serial }}</a-descriptions-item>
        <a-descriptions-item label="阀门型号">{{ valveRefData.valve_model }}</a-descriptions-item>
        <a-descriptions-item label="阀门尺寸">{{
          getValveSizeUnitText(valveRefData.valve_size, valveRefData.valve_size_unit)
        }}</a-descriptions-item>
        <a-descriptions-item label="执行机构型号">{{ actuRefData.actu_model }}</a-descriptions-item>
        <a-descriptions-item label="执行机构尺寸">{{ actuRefData.actu_size }}</a-descriptions-item>
      </a-descriptions>
      <br />

      <a-form @submit="handleSubmit" :form="form" class="form">
        <a-card title="执行人" :headStyle="{ fontWeight: 'bold' }">
          <!-- 执行人 -->
          <dispatchUser
            :disableAll="disableAll"
            v-if="showDispatchUser"
            :flowID="flow_id"
            :currentStep="current_step"
            :flag="'1'"
          />
          <!-- 工时 -->
          <a-row :gutter="8">
            <a-col :span="4">
              <a-form-item label="工时(min)">
                <a-input-number
                  :disabled="disableAll"
                  style="width: 100%"
                  :min="0"
                  v-decorator="['work_time', { rules: [] }]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item label="入厂检查日期">
                <a-date-picker
                  :disabled="disableAll"
                  style="width: 100%"
                  :format="'YYYY-MM-DD'"
                  v-decorator="['step_date', { rules: [] }]"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <br />
        <a-row :gutter="16">
          <!--=========================================== 阀体组件 ===========================================-->
          <template v-if="refData1.return_part === '1' || refData1.return_part === '3' || refData1.return_part === '4'">
            <a-col class="gutter-row" :span="12">
              <a-divider>阀体组件</a-divider>
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">铭牌内容正确<br />Nameplate Correct</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_nameplate_content_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_nameplate_content_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_nameplate_content_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_nameplate_content_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_nameplate_content_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">阀盖螺母/栓是否完好<br />Studs/Nut</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_studs_nut_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_studs_nut_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_studs_nut_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_studs_nut_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_intofc_studs_nut_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <!-- 行5 -->
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">法兰面是否损坏<br />Flange/End Connection</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_flange_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_flange_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_flange_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_flange_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_flange_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <!-- 行6 -->
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">阀体裂纹<br />Cracks on Body</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_cracks_on_body_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_cracks_on_body_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_cracks_on_body_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_cracks_on_body_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_cracks_on_body_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <!-- 行7 -->
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">阀盖裂纹<br />Cracks on Body</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_cracks_on_bonnet_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_cracks_on_bonnet_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_cracks_on_bonnet_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_cracks_on_bonnet_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_cracks_on_bonnet_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <!-- 行8 -->
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">填料压盖是否损坏<br />Packing Bonnet</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_packing_bonnet_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_packing_bonnet_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_packing_bonnet_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_packing_bonnet_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_packing_bonnet_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <!-- 行9 -->
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">流向指示箭头完好<br />Flow Direction Arrow</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_flow_direct_arrow_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_flow_direct_arrow_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_flow_direct_arrow_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_flow_direct_arrow_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_flow_direct_arrow_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <!-- 行10 -->
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">行程指示牌/指针完好<br />Indicator Disk/Scale</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_indicator_scale_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_indicator_scale_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_indicator_scale_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_indicator_scale_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_indicator_scale_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </template>
          <!--=========================================== 执行机构 ===========================================-->
          <template
            v-if="
              refData1.return_part === '2' ||
                refData1.return_part === '3' ||
                refData1.return_part === '4' ||
                refData1.return_part === '6'
            "
          >
            <a-col class="gutter-row" :span="12">
              <a-divider><div class="linehight">执行机构</div></a-divider>
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">铭牌内容正确<br />Nameplate Correct</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_act_nameplate_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_act_nameplate_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_act_nameplate_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_act_nameplate_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_act_nameplate_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">安全标志完好<br />Safety Tag Attached</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_act_safety_tag_attached_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_act_safety_tag_attached_yesno', 1)">
                          是
                        </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_act_safety_tag_attached_yesno', 2)">
                          否
                        </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_act_safety_tag_attached_yesno', 3)">
                          N/A
                        </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input
                        :disabled="disableAll"
                        v-decorator="['intofc_act_safety_tag_attached_memo', { rules: [] }]"
                      />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">排气帽完好<br />Vent cap Attached</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_act_vent_cap_attached_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_act_vent_cap_attached_yesno', 1)">
                          是
                        </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_act_vent_cap_attached_yesno', 2)">
                          否
                        </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_act_vent_cap_attached_yesno', 3)">
                          N/A
                        </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input
                        :disabled="disableAll"
                        v-decorator="['intofc_act_vent_cap_attached_memo', { rules: [] }]"
                      />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">膜盖螺母/栓完好<br />Bolts/Nuts</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_act_bolts_nuts_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_act_bolts_nuts_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_act_bolts_nuts_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_act_bolts_nuts_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_act_bolts_nuts_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <a-row>
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">支架是否断裂<br />Cracks on Yoke</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_act_cracks_on_yoke_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_act_cracks_on_yoke_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_act_cracks_on_yoke_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_act_cracks_on_yoke_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_act_cracks_on_yoke_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <a-row>
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">气管及接头完好<br />Tubing/Fittings</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_act_tubing_fittings_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_act_tubing_fittings_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_act_tubing_fittings_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_act_tubing_fittings_yesno', 3)">
                          N/A
                        </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input
                        :disabled="disableAll"
                        v-decorator="['intofc_act_tubing_fittings_memo', { rules: [] }]"
                      />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <a-row>
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">手轮是否完好<br />Handwheel</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_act_handwheel_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_act_handwheel_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_act_handwheel_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_act_handwheel_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_act_handwheel_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <a-row>
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">连接件/锁紧螺母完好<br />Stem Connector/Yoke Nut</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_act_stem_yoke_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_act_stem_yoke_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_act_stem_yoke_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_act_stem_yoke_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_act_stem_yoke_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </template>
          <!--=========================================== 定位器 ===========================================-->
          <template v-if="showPostion || refData1.return_part === '7'">
            <a-col class="gutter-row" :span="12">
              <a-divider>定位器</a-divider>
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">壳体裂纹<br />Cracks on Casing</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_cracks_on_casing_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_cracks_on_casing_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_cracks_on_casing_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_cracks_on_casing_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_cracks_on_casing_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">连接件完好<br />Mounting Parts</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_mounting_parts_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_mounting_parts_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_mounting_parts_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_mounting_parts_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_mounting_parts_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">铭牌/标识正确<br />Nameplate Correct</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_nameplate_logo_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_nameplate_logo_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_nameplate_logo_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_nameplate_logo_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_nameplate_logo_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">安装正确<br />Installation Correct</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_install_correct_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_install_correct_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_install_correct_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_install_correct_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_install_correct_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">气管及接头完好<br />Tubing/Fittings</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_tubing_fittings_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_tubing_fittings_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_tubing_fittings_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_tubing_fittings_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_tubing_fittings_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">压力表完好<br />Gauge</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_gauge_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_gauge_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_gauge_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_gauge_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_gauge_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">螺钉完好<br />Bolts</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_bolts_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_bolts_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_bolts_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_bolts_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_bolts_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="7" :offset="1">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">定位器是否带反馈<br />Whether with feedback</div>
                      <a-radio-group :disabled="disableAll" v-decorator="['intofc_feedback_yesno', {}]">
                        <a-radio :value="1" @click="twoClickClear('intofc_feedback_yesno', 1)"> 是 </a-radio>
                        <a-radio :value="2" @click="twoClickClear('intofc_feedback_yesno', 2)"> 否 </a-radio>
                        <a-radio :value="3" @click="twoClickClear('intofc_feedback_yesno', 3)"> N/A </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="14">
                  <div class="gutter-box">
                    <a-form-item>
                      <div class="linehight">备注<br />Remark</div>
                      <a-input :disabled="disableAll" v-decorator="['intofc_feedback_memo', { rules: [] }]" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </template>
          <!--=========================================== 其他附件 ===========================================-->
          <template v-if="showOthersalve">
            <a-col class="gutter-row" :span="12">
              <div class="gutter-box">
                <a-divider><div class="linehight">其他附件</div></a-divider>
                <a-row :gutter="16" v-if="showFilterValve">
                  <a-col class="gutter-row" :offset="2" :span="17">
                    <a-form-item>
                      <div class="linehight">过滤器\减压阀<br />Filter & Regulator</div>
                      <a-input-group :disabled="disableAll" compact>
                        <a-input
                          style="width: 260px"
                          v-decorator="['intofc_other_filter_begulator_memo', { rules: [] }]"
                        />
                        <a-select style="width: 25%" @change="otherFilterBegulatorChange">
                          <a-select-option v-for="item in otherFilterBegulator" :value="item" :key="item">
                            {{ item }}
                          </a-select-option>
                        </a-select>
                      </a-input-group>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="16" v-if="showElectValve">
                  <a-col class="gutter-row" :offset="2" :span="17">
                    <a-form-item>
                      <div class="linehight">电磁阀<br />Filter & Regulator</div>
                      <a-input-group :disabled="disableAll" compact>
                        <a-input style="width: 260px" v-decorator="['intofc_other_solenoid_memo', { rules: [] }]" />
                        <a-select style="width: 25%" @change="otherSolenoidChange">
                          <a-select-option v-for="item in otherFilterBegulator" :value="item" :key="item">
                            {{ item }}
                          </a-select-option>
                        </a-select>
                      </a-input-group>
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- <a-row :gutter="16">
                  <a-col class="gutter-row" :offset="2" :span="17">
                    <a-form-item>
                      <div class="linehight">位置变送器<br>Transmitter</div>
                      <a-input-group compact>
                        <a-input style="width:260px" v-decorator="[ 'intofc_other_transmitter_memo', {rules: []} ]" />
                        <a-select style="width: 25%" @change="otherTransmitterChange">
                          <a-select-option v-for="item in otherFilterBegulator" :value="item" :key="item">
                            {{ item }}
                          </a-select-option>
                        </a-select>
                      </a-input-group>
                    </a-form-item>
                  </a-col>
                </a-row> -->
                <!-- <a-row :gutter="16">
                  <a-col class="gutter-row" :offset="2" :span="17">
                    <div class="gutter-box">
                      <a-form-item>
                        <div class="linehight">I/P转换器<br>I/P Transducer</div>
                        <a-input-group compact>
                          <a-input style="width:260px" v-decorator="[ 'intofc_other_ip_transducer_memo', {rules: []} ]" />
                          <a-select style="width: 25%" @change="otherIpTransducerChange">
                            <a-select-option v-for="item in otherFilterBegulator" :value="item" :key="item">
                              {{ item }}
                            </a-select-option>
                          </a-select>
                        </a-input-group>
                      </a-form-item>
                    </div>
                  </a-col>
                </a-row> -->
                <a-row :gutter="16" v-if="showPointSwitch">
                  <a-col class="gutter-row" :offset="2" :span="17">
                    <div class="gutter-box">
                      <a-form-item>
                        <div class="linehight">位置开关<br />Limit Switch</div>
                        <a-input-group :disabled="disableAll" compact>
                          <a-input
                            style="width: 260px"
                            v-decorator="['intofc_other_limit_switch_memo', { rules: [] }]"
                          />
                          <a-select style="width: 25%" @change="otherLimitSwitchChange">
                            <a-select-option v-for="item in otherFilterBegulator" :value="item" :key="item">
                              {{ item }}
                            </a-select-option>
                          </a-select>
                        </a-input-group>
                      </a-form-item>
                    </div>
                  </a-col>
                </a-row>
                <a-row :gutter="16" v-if="showRetainingValve">
                  <a-col class="gutter-row" :offset="2" :span="17">
                    <div class="gutter-box">
                      <a-form-item>
                        <div class="linehight">保位/切换阀<br />Lockup/Trip Valve</div>
                        <a-input-group :disabled="disableAll" compact>
                          <a-input
                            style="width: 260px"
                            v-decorator="['intofc_other_lockup_trip_valve_memo', { rules: [] }]"
                          />
                          <a-select style="width: 25%" @change="otherLockupTripValveChange">
                            <a-select-option v-for="item in otherFilterBegulator" :value="item" :key="item">
                              {{ item }}
                            </a-select-option>
                          </a-select>
                        </a-input-group>
                      </a-form-item>
                    </div>
                  </a-col>
                </a-row>
                <!-- <a-row>
                  <a-col class="gutter-row" :offset="2" :span="17">
                    <div class="gutter-box">
                      <a-form-item>
                        <div class="linehight">旁路阀<br>Bypass Valve</div>
                        <a-input-group compact>
                          <a-input style="width:260px" v-decorator="[ 'intofc_other_bybass_valve_memo', {rules: []} ]" />
                          <a-select style="width: 25%" @change="otherBybassValveChange">
                            <a-select-option v-for="item in otherFilterBegulator" :value="item" :key="item">
                              {{ item }}
                            </a-select-option>
                          </a-select>
                        </a-input-group>
                      </a-form-item>
                    </div>
                  </a-col>
                </a-row> -->
                <a-row :gutter="16" v-if="showOthersalve">
                  <a-col class="gutter-row" :offset="2" :span="17">
                    <div class="gutter-box">
                      <a-form-item>
                        <div class="linehight">其他<br />other</div>
                        <a-input-group :disabled="disableAll" compact>
                          <a-input style="width: 260px" v-decorator="['intofc_other_other_memo', { rules: [] }]" />
                          <a-select style="width: 25%" @change="otherOtherChange">
                            <a-select-option v-for="item in otherFilterBegulator" :value="item" :key="item">
                              {{ item }}
                            </a-select-option>
                          </a-select>
                        </a-input-group>
                      </a-form-item>
                    </div>
                  </a-col>
                </a-row>
              </div>
            </a-col>
          </template>
        </a-row>
        <br />
        <!-- 行16 -->
        <!-- 行17 -->
        <!-- 行18 -->
        <!-- 行19 -->
        <!-- 行20 -->
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="22">
            <div class="gutter-box">
              <a-form-item>
                <div class="linehight">备注<br />Remark</div>
                <a-input :disabled="disableAll" v-decorator="['intofc_remark', { rules: [] }]" />
              </a-form-item>
            </div>
          </a-col>
        </a-row>

        <!-- 上传图片 -->
        <a-divider />
        <!-- headers 3代表图片 -->
        <div class="clearfix">
          <a-upload
            :disabled="disableAll"
            name="file"
            action="/api/base-info-upload"
            list-type="picture-card"
            :file-list="imgFileList"
            :before-upload="beforeUpload"
            @preview="handlePreview"
            @change="handleChange"
            :headers="{ QueueType: '3' }"
          >
            <div v-if="imgFileList.length < 80 && !isMobile">
              <a-icon type="plus" />
              <div class="ant-upload-text">上传照片</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>

        <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
          <a-button htmlType="submit" type="primary">保存</a-button>
          <a-button style="margin-left: 8px" @click="cancelSubmit" v-if="!isMobile">返回</a-button>
          <a-button style="margin-left: 38px" @click="handleStepDetail">{{ $t('menu.step.view') }}</a-button>
          <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
        </footer-tool-bar>
      </a-form>
    </a-card>

    <stepAllDetailModel ref="stepAllDetailModel" :flowId="flow_id" :currenStep="current_step" />
  </div>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'
import { baseMixin } from '@/store/app-mixin'
import { saveIntoFactoryCheck } from '@/api/intoFactoryCheck'
import pick from 'lodash.pick'
import { stepDone, queryStepData, getValveSizeUnitText, getOtherFilterBegulator } from '@/api/step'
import stepDetail from '../../modules/StepBaseInfo'
import stepAllDetailModel from '../../modules/StepAllDetailModel'
import dispatchUser from '../../modules/DispatchUser'
import moment from 'moment'

const intoFactoryFields = [
  'work_order_serial',
  'contract_serial',
  'customer_name',
  'intofc_valve_type',
  'intofc_valve_size',
  'intofc_valve_tag',
  'intofc_valve_serial',
  'intofc_actuator_type',
  'intofc_actuator_size',
  'intofc_nameplate_content_yesno',
  'intofc_nameplate_content_memo',
  'intofc_studs_nut_yesno',
  'intofc_intofc_studs_nut_memo',
  'intofc_mounting_parts_yesno',
  'intofc_mounting_parts_memo',
  'intofc_flange_yesno',
  'intofc_flange_memo',
  'intofc_nameplate_logo_yesno',
  'intofc_nameplate_logo_memo',
  'intofc_cracks_on_body_yesno',
  'intofc_cracks_on_body_memo',
  'intofc_install_correct_yesno',
  'intofc_install_correct_memo',
  'intofc_cracks_on_bonnet_yesno',
  'intofc_cracks_on_bonnet_memo',
  'intofc_tubing_fittings_yesno',
  'intofc_tubing_fittings_memo',
  'intofc_packing_bonnet_yesno',
  'intofc_packing_bonnet_memo',
  'intofc_gauge_yesno',
  'intofc_gauge_memo',
  'intofc_flow_direct_arrow_yesno',
  'intofc_flow_direct_arrow_memo',
  'intofc_bolts_yesno',
  'intofc_bolts_memo',
  'intofc_indicator_scale_yesno',
  'intofc_indicator_scale_memo',
  'intofc_act_nameplate_yesno',
  'intofc_act_nameplate_memo',
  'intofc_other_filter_begulator_yesno',
  'intofc_other_filter_begulator_memo',
  'intofc_act_safety_tag_attached_yesno',
  'intofc_act_safety_tag_attached_memo',
  'intofc_other_solenoid_yesno',
  'intofc_other_solenoid_memo',
  'intofc_act_vent_cap_attached_yesno',
  'intofc_act_vent_cap_attached_memo',
  'intofc_other_transmitter_yesno',
  'intofc_other_transmitter_memo',
  'intofc_act_bolts_nuts_yesno',
  'intofc_act_bolts_nuts_memo',
  'intofc_other_ip_transducer_yesno',
  'intofc_other_ip_transducer_memo',
  'intofc_act_cracks_on_yoke_yesno',
  'intofc_act_cracks_on_yoke_memo',
  'intofc_other_limit_switch_yesno',
  'intofc_other_limit_switch_memo',
  'intofc_act_tubing_fittings_yesno',
  'intofc_act_tubing_fittings_memo',
  'intofc_other_lockup_trip_valve_yesno',
  'intofc_other_lockup_trip_valve_memo',
  'intofc_act_handwheel_yesno',
  'intofc_act_handwheel_memo',
  'intofc_other_bybass_valve_yesno',
  'intofc_other_bybass_valve_memo',
  'intofc_act_stem_yoke_yesno',
  'intofc_act_stem_yoke_memo',
  'intofc_other_other_yesno',
  'intofc_other_other_memo',
  'intofc_remark',
  'intofc_cracks_on_casing_yesno',
  'intofc_cracks_on_casing_memo',
  'not_applicable',
  'work_time',
  'intofc_feedback_yesno',
  'intofc_feedback_memo',
  'step_date'
]

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export default {
  mixins: [baseMixin],
  components: {
    FooterToolBar,
    baseMixin,
    stepDetail,
    stepAllDetailModel,
    dispatchUser
  },
  data () {
    return {
      form: this.$form.createForm(this),
      flow_id: '',
      current_step: '',
      baseInfoData: null,
      loading: false,
      imageUrl: '',
      imgFileList: [],
      previewVisible: false,
      previewImage: '',
      refData1: {},
      valveRefData: {},
      actuRefData: {},
      projectData: {},
      showDispatchUser: false,
      not_applicable: false,
      otherFilterBegulator: getOtherFilterBegulator(),
      showPostion: false,
      showOthersalve: false,
      showElectValve: false,
      showPointSwitch: false,
      showRetainingValve: false,
      showFilterValve: false,
      fartherWidth: '',
      disableAll: false
    }
  },
  mounted () {
    // 防止表单未注册
    intoFactoryFields.forEach((v) => this.form.getFieldDecorator(v))
    // 修改数据
    const editData = this.$store.state.editStepData.stepEditData
    this.flow_id = editData.flow_id
    this.current_step = editData.current_step
    this.projectData = editData.project
    this.showDispatchUser = true
    // 供flutter刷新上传文件列表
    window.refreshUploads = this.refreshUploads

    // 读baseinfo
    queryStepData({ id: this.flow_id, current_step: '(start)' }).then((res) => {
      if (editData.step_data && editData.step_data.length > 0) {
        const intoFactoryData = JSON.parse(editData.step_data[0].JSON)
        this.form.setFieldsValue(pick(intoFactoryData, intoFactoryFields))
        this.not_applicable = intoFactoryData.not_applicable
        this.disableAll = this.not_applicable
        if (intoFactoryData.uploads) {
          this.imgFileList = intoFactoryData.uploads
          // 流程日期
          if (!intoFactoryData.step_date || intoFactoryData.step_date.length <= 0) {
            this.form.setFieldsValue(pick({ step_date: moment(new Date()).format('YYYY-MM-DD') }, ['step_date']))
          }
        }
      }

      res.result.step_data.forEach((e) => {
        // 查找 baseinfo
        if (e.DataNum === 1) {
          this.refData1 = JSON.parse(e.JSON)
        }
        // 查找阀
        if (e.DataNum === 2) {
          this.valveRefData = JSON.parse(e.JSON)
        }
        // 执行机构
        if (e.DataNum === 3) {
          this.actuRefData = JSON.parse(e.JSON)
        }
        // 附件
        if (e.DataNum === 4) {
          const slave = JSON.parse(e.JSON)
          if (slave.other_slave_select_area.indexOf('1') >= 0) {
            // 定位器
            this.showPostion = true
          }
          if (slave.other_slave_select_area.indexOf('6') >= 0) {
            this.showOthersalve = true
          }
          // 过滤减压阀
          if (slave.other_slave_select_area.indexOf('2') >= 0) {
            this.showFilterValve = true
          }
          // 电磁阀
          if (slave.other_slave_select_area.indexOf('3') >= 0) {
            this.showElectValve = true
          }
          // 位置开关
          if (slave.other_slave_select_area.indexOf('4') >= 0) {
            this.showPointSwitch = true
          }
          // 保位/切换阀
          if (slave.other_slave_select_area.indexOf('5') >= 0) {
            this.showRetainingValve = true
          }
        }
      })
    })

    // // 查询引用数据
    // getReferenceIntoFactoryCheck({ FlowID: this.flow_id }).then(res => {
    //   this.refData1 = JSON.parse(res.data[0])

    //   this.form.setFieldsValue(pick(editData.project, intoFactoryFields))
    //   // 入厂检查数据
    //   if (editData.step_data.length > 0) {
    //     const infoFactoryData = JSON.parse(editData.step_data[0].JSON)
    //     this.form.setFieldsValue(pick(infoFactoryData, intoFactoryFields))
    //     if (infoFactoryData.uploads) {
    //       this.imgFileList = infoFactoryData.uploads
    //     }
    //   }
    // })
    this.fartherWidth = this.$refs.farther.clientWidth + 50 + 'px'
    window.onresize = () => {
      this.fartherWidth = this.$refs.farther.clientWidth + 50 + 'px'
    }
  },
  watch: {
    fartherWidth: {
      handler (val) {
        this.fartherWidth = val
      }
    }
  },
  methods: {
    getValveSizeUnitText,
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.flow_id = this.flow_id
          values.current_step = this.current_step
          values.intofc_user_id = this.$store.state.user.info.id
          values.uploads = this.imgFileList
          values.not_applicable = this.not_applicable

          saveIntoFactoryCheck(values).then((res) => {
            this.$message.info('保存成功')
            // eslint-disable-next-line no-undef
            callFlutterBacktoList.postMessage('save_step_ok') // 告诉移动端vue页面本流程已经保存成功
          })
        }
      })
    },
    cancelSubmit () {
      this.$router.back(-1)
    },
    handleStepDetail () {
      // queryStepDataOnlyread({ id: this.flow_id, current_step: '(start)' }).then(res => {
      //   // 当前分页参数入栈，并设置分页参数为pageNum: 0  pageSize: 10
      //   this.pageDataStack.pushPageData(this.$store, true)
      //   this.$store.commit('SET_STEP_EDIT_DATA', res.result)
      //   this.$router.push({ name: 'allDetailStep', params: { flowID: this.flow_id, cancelButton: true } })
      // })
      this.$refs.stepAllDetailModel.showSetpDetailData(this.flow_id, this.current_step)
    },
    handleStepDone () {
      const letThis = this
      this.$confirm({
        title: '结束流程',
        content: '确定要结束流程？',
        okText: '确认',
        cancelText: '取消',
        onOk () {
          stepDone({ id: letThis.flow_id, current_step: letThis.current_step }).then((res) => {
            // 刷新表格
            letThis.$message.info('结束流程成功')
            letThis.$router.push({ path: '/step/steplist' })
          })
        }
      })
    },
    handleCancel () {
      this.previewVisible = false
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange (fileObj) {
      let fileList = [...fileObj.fileList]

      // 2. read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
          if (file.response.retCode !== 0) {
            this.$notification['error']({
              message: '错误',
              description: file.response.msg,
              duration: 3
            })
            file.status = 'error'
          } else {
            file.md5 = file.response.md5
            file.url = file.response.url
            file.queue_type = '3'
          }
        }

        if (!(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp')) {
          file.status = 'error'
        }
        return file
      })
      this.imgFileList = fileList
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp'
      if (!isJpgOrPng) {
        this.$message.error('只能上传图片文件!')
      }
      return isJpgOrPng
    },
    refreshUploads () {
      queryStepData({ id: this.flow_id, current_step: this.current_step }).then((res) => {
        if (res.result.step_data && res.result.step_data.length > 0) {
          const tmpData = JSON.parse(res.result.step_data[0].JSON)
          this.imgFileList = tmpData.uploads
          this.$message.info('上传照片成功')
        }
      })
    },
    naChange (e) {
      this.not_applicable = e.target.checked
      this.disableAll = e.target.checked
    },
    otherFilterBegulatorChange (val) {
      this.form.setFieldsValue(pick({ intofc_other_filter_begulator_memo: val }, intoFactoryFields))
    },
    otherSolenoidChange (val) {
      this.form.setFieldsValue(pick({ intofc_other_solenoid_memo: val }, intoFactoryFields))
    },
    otherTransmitterChange (val) {
      this.form.setFieldsValue(pick({ intofc_other_transmitter_memo: val }, intoFactoryFields))
    },
    otherIpTransducerChange (val) {
      this.form.setFieldsValue(pick({ intofc_other_ip_transducer_memo: val }, intoFactoryFields))
    },
    otherLimitSwitchChange (val) {
      this.form.setFieldsValue(pick({ intofc_other_limit_switch_memo: val }, intoFactoryFields))
    },
    otherLockupTripValveChange (val) {
      this.form.setFieldsValue(pick({ intofc_other_lockup_trip_valve_memo: val }, intoFactoryFields))
    },
    otherBybassValveChange (val) {
      this.form.setFieldsValue(pick({ intofc_other_bybass_valve_memo: val }, intoFactoryFields))
    },
    otherOtherChange (val) {
      this.form.setFieldsValue(pick({ intofc_other_other_memo: val }, intoFactoryFields))
    },
    twoClickClear (field, value) {
      if (this.form.getFieldValue(field) === value) {
        var tmpObj = {}
        tmpObj[field] = 0
        this.form.setFieldsValue(pick(tmpObj, intoFactoryFields))
      }
    }
  }
}
</script>

<style scoped>
.linehight {
  line-height: 20px;
  padding: 0;
  margin: 0;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
