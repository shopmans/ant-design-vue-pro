<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('menu.spare_parts.valve.serial')">
                <a-input v-model="queryParam.serial" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('menu.spare_parts.valve.tag')">
                <a-input v-model="queryParam.tag" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('menu.project.view.query.customerName')">
                <a-input v-model="queryParam.customerName" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">{{ $t('menu.project.view.query.query') }}</a-button>
                <a-button style="margin-left: 8px" @click="resetQuery">{{ $t('menu.project.view.query.reset') }}</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button icon="plus" @click="handleAdd">{{ $t('menu.project.view.newproject') }}</a-button>
        <a-button type="primary" icon="plus" @click="importExcel">{{ $t('menu.spare_parts.excel_import') }}</a-button>
        <a-upload hidden accept=".xls,.xlsx" :before-upload="importExcelImpl" :show-upload-list="false" ><a-button hidden id="importExcelButton"></a-button></a-upload>
      </div>

      <s-table
        ref="table"
        rowKey="ID"
        :columns="columns"
        :data="loadData"
        :scroll="{ x: 9300 }"
        :pagination="paginationOpt"
      >
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleDescrption(record)">{{ $t('menu.project.view.action.detail') }}</a>
            <a-divider type="vertical" />
            <a @click="handleEdit(record)">{{ $t('menu.user.manager.action.edit') }}</a>
            <a-divider type="vertical" />
            <a-popconfirm :title="$t('menu.user.manager.action.delete.confirm')" @confirm="deleteRecord(record)">
              <a>{{ $t('menu.project.view.action.delete') }}</a>
            </a-popconfirm>
          </template>
        </span>
        <span slot="Date" slot-scope="text">
          {{ text | format }}
        </span>
      </s-table>

      <!-- 修改 -->
      <a-modal
        :title="userModelTitle"
        style="top: 20px;"
        :width="1000"
        v-model="visible"
        :maskClosable="false"
        :confirmLoading="confirmLoading"
        @ok="handleAddOk"
      >
        <a-form class="permission-form" :form="form">
          <a-row :gutter="24">
            <!-- 客户名称 -->
            <a-col :span="6">
              <a-form-item :label="$t('menu.project.view.query.customerName')">
                <a-input v-decorator="['customer_name', { rules: [{}] }]" disabled />
              </a-form-item>
            </a-col>
            <!-- 位号 -->
            <a-col :span="6">
              <a-form-item label="tag">
                <a-input v-decorator="['tag', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀门尺寸 -->
            <a-col :span="6">
              <a-form-item label="阀门尺寸">
                <a-input v-decorator="['valve_size', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀门型号 -->
            <a-col :span="6">
              <a-form-item label="阀门型号">
                <a-input v-decorator="['valve_model', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 执行器型号 -->
            <a-col :span="6">
              <a-form-item label="执行器型号">
                <a-input v-decorator="['actuator_model', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 执行器尺寸 -->
            <a-col :span="6">
              <a-form-item label="执行器尺寸">
                <a-input v-decorator="['actuator_size', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 填料备件包-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="填料备件包-推荐代码">
                <a-input v-decorator="['packing_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 填料备件包-数量 -->
            <a-col :span="6">
              <a-form-item label="填料备件包-数量">
                <a-input v-decorator="['packing_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 填料备件包1-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="填料备件包1-推荐代码">
                <a-input v-decorator="['packing1_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 填料备件包1-数量 -->
            <a-col :span="6">
              <a-form-item label="填料备件包1-数量">
                <a-input v-decorator="['packing1_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 填料备件包2-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="填料备件包2-推荐代码">
                <a-input v-decorator="['packing2_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 填料备件包2-数量 -->
            <a-col :span="6">
              <a-form-item label="填料备件包2-数量">
                <a-input v-decorator="['packing2_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 填料备件包3-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="填料备件包3-推荐代码">
                <a-input v-decorator="['packing3_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 填料备件包3-数量 -->
            <a-col :span="6">
              <a-form-item label="填料备件包3-数量">
                <a-input v-decorator="['packing3_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 填料备件包3-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="填料备件包3-推荐代码">
                <a-input v-decorator="['packing4_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 填料备件包3-数量 -->
            <a-col :span="6">
              <a-form-item label="填料备件包3-数量">
                <a-input v-decorator="['packing4_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 垫片-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="垫片-推荐代码">
                <a-input v-decorator="['gasket_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 垫片-数量 -->
            <a-col :span="6">
              <a-form-item label="垫片-数量">
                <a-input v-decorator="['gasket_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 垫片1-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="垫片1-推荐代码">
                <a-input v-decorator="['gasket1_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 垫片1-数量 -->
            <a-col :span="6">
              <a-form-item label="垫片1-数量">
                <a-input v-decorator="['gasket1_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 垫片2-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="垫片2-推荐代码">
                <a-input v-decorator="['gasket2_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 垫片2-数量 -->
            <a-col :span="6">
              <a-form-item label="垫片2-数量">
                <a-input v-decorator="['gasket2_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 垫片3-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="垫片3-推荐代码">
                <a-input v-decorator="['gasket3_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 垫片3-数量 -->
            <a-col :span="6">
              <a-form-item label="垫片3-数量">
                <a-input v-decorator="['gasket3_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 垫片4-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="垫片4-推荐代码">
                <a-input v-decorator="['gasket4_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 垫片4-数量 -->
            <a-col :span="6">
              <a-form-item label="垫片4-数量">
                <a-input v-decorator="['gasket4_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀座环1-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="阀座环1-推荐代码">
                <a-input v-decorator="['seatring1_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀座环1-数量 -->
            <a-col :span="6">
              <a-form-item label="阀座环1-数量">
                <a-input v-decorator="['seatring1_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀座环2-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="阀座环2-推荐代码">
                <a-input v-decorator="['seatring2_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀座环2-数量 -->
            <a-col :span="6">
              <a-form-item label="阀座环2-数量">
                <a-input v-decorator="['seatring2_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀座环3-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="阀座环3-推荐代码">
                <a-input v-decorator="['seatring3_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀座环3-数量 -->
            <a-col :span="6">
              <a-form-item label="阀座环3-数量">
                <a-input v-decorator="['seatring3_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀座环4-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="阀座环4-推荐代码">
                <a-input v-decorator="['seatring4_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀座环4-数量 -->
            <a-col :span="6">
              <a-form-item label="阀座环4-数量">
                <a-input v-decorator="['seatring4_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀芯阀杆1-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="阀芯阀杆1-推荐代码">
                <a-input v-decorator="['corestem1_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀芯阀杆1-数量 -->
            <a-col :span="6">
              <a-form-item label="阀芯阀杆1-数量">
                <a-input v-decorator="['corestem1_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀芯阀杆2-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="阀芯阀杆2-推荐代码">
                <a-input v-decorator="['corestem2_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀芯阀杆2-数量 -->
            <a-col :span="6">
              <a-form-item label="阀芯阀杆2-数量">
                <a-input v-decorator="['corestem2_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀芯阀杆3-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="阀芯阀杆3-推荐代码">
                <a-input v-decorator="['corestem3_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀芯阀杆3-数量 -->
            <a-col :span="6">
              <a-form-item label="阀芯阀杆3-数量">
                <a-input v-decorator="['corestem3_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀芯密封环1-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="阀芯密封环1-推荐代码">
                <a-input v-decorator="['corering1_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀芯密封环1-数量 -->
            <a-col :span="6">
              <a-form-item label="阀芯密封环1-数量">
                <a-input v-decorator="['corering1_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀芯密封环2-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="阀芯密封环2-推荐代码">
                <a-input v-decorator="['corering2_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀芯密封环2-数量 -->
            <a-col :span="6">
              <a-form-item label="阀芯密封环2-数量">
                <a-input v-decorator="['corering2_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀芯密封环3-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="阀芯密封环3-推荐代码">
                <a-input v-decorator="['corering3_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀芯密封环3-数量 -->
            <a-col :span="6">
              <a-form-item label="阀芯密封环3-数量">
                <a-input v-decorator="['corering3_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀笼1-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="阀笼1-推荐代码">
                <a-input v-decorator="['cage1_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="阀笼1-数量">
                <a-input v-decorator="['cage1_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 阀笼2-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="阀笼2-推荐代码">
                <a-input v-decorator="['cage2_recom_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="阀笼2-数量">
                <a-input v-decorator="['cage2_recom_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 执行机构膜片-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="执行机构膜片-推荐代码">
                <a-input v-decorator="['actuator_diaph_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="执行机构膜片-数量">
                <a-input v-decorator="['actuator_diaph_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <!-- 执行机构维修-推荐代码 -->
            <a-col :span="6">
              <a-form-item label="执行机构维修-推荐代码">
                <a-input v-decorator="['actuator_repair_code', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="执行机构维修-数量">
                <a-input v-decorator="['actuator_repair_num', { rules: [{}] }]" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <a-input hidden v-decorator="['ID', {}]" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <a-input hidden v-decorator="['customer_id', {}]" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
    </a-card>

    <!-- 详细 -->
    <a-modal
      :title="$t('menu.project.view.action.detail')"
      style="top: 20px;"
      :width="1000"
      v-model="descVisible"
      :maskClosable="false"
      @ok="() => {descVisible =false}"
    >
      <a-descriptions size="small">
        <a-descriptions-item label="客户名称">{{ showDescrptionDat.customer_name }}</a-descriptions-item>
        <a-descriptions-item label="序号">{{ showDescrptionDat.serial }}</a-descriptions-item>
        <a-descriptions-item label="位号">{{ showDescrptionDat.tag }}</a-descriptions-item>
        <a-descriptions-item label="阀门尺寸">{{ showDescrptionDat.valve_size }}</a-descriptions-item>
        <a-descriptions-item label="阀门型号">{{ showDescrptionDat.valve_model }}</a-descriptions-item>
        <a-descriptions-item label="执行器型号">{{ showDescrptionDat.actuator_model }}</a-descriptions-item>
        <a-descriptions-item label="执行器尺寸">{{ showDescrptionDat.actuator_size }}</a-descriptions-item>
        <a-descriptions-item label="填料备件包-推荐代码">{{ showDescrptionDat.packing_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="填料备件包-数量">{{ showDescrptionDat.packing_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="填料备件包1-推荐代码">{{ showDescrptionDat.packing1_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="填料备件包1-数量">{{ showDescrptionDat.packing1_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="填料备件包2-推荐代码">{{ showDescrptionDat.packing2_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="填料备件包2-数量">{{ showDescrptionDat.packing2_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="填料备件包3-推荐代码">{{ showDescrptionDat.packing3_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="填料备件包3-数量">{{ showDescrptionDat.packing3_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="填料备件包4-推荐代码">{{ showDescrptionDat.packing4_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="填料备件包4-数量">{{ showDescrptionDat.packing4_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="垫片-推荐代码">{{ showDescrptionDat.gasket_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="垫片-数量">{{ showDescrptionDat.gasket_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="垫片1-推荐代码">{{ showDescrptionDat.gasket1_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="垫片1-数量">{{ showDescrptionDat.gasket1_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="垫片2-推荐代码">{{ showDescrptionDat.gasket2_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="垫片2-数量">{{ showDescrptionDat.gasket2_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="垫片3-推荐代码">{{ showDescrptionDat.gasket3_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="垫片3-数量">{{ showDescrptionDat.gasket3_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="垫片4-推荐代码">{{ showDescrptionDat.gasket4_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="垫片4-数量">{{ showDescrptionDat.gasket4_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="阀座环1-推荐代码">{{ showDescrptionDat.seatring1_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="阀座环1-数量">{{ showDescrptionDat.seatring1_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="阀座环2-推荐代码">{{ showDescrptionDat.seatring2_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="阀座环2-数量">{{ showDescrptionDat.seatring2_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="阀座环3-推荐代码">{{ showDescrptionDat.seatring3_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="阀座环3-数量">{{ showDescrptionDat.seatring3_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="阀座环4-推荐代码">{{ showDescrptionDat.seatring4_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="阀座环4-数量">{{ showDescrptionDat.seatring4_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="阀芯阀杆1-推荐代码">{{ showDescrptionDat.corestem1_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="阀芯阀杆1-数量">{{ showDescrptionDat.corestem1_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="阀芯阀杆2-推荐代码">{{ showDescrptionDat.corestem2_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="阀芯阀杆2-数量">{{ showDescrptionDat.corestem2_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="阀芯阀杆3-推荐代码">{{ showDescrptionDat.corestem3_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="阀芯阀杆3-数量">{{ showDescrptionDat.corestem3_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="阀芯密封环1-推荐代码">{{ showDescrptionDat.corering1_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="阀芯密封环1-数量">{{ showDescrptionDat.corering1_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="阀芯密封环2-推荐代码">{{ showDescrptionDat.corering2_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="阀芯密封环2-数量">{{ showDescrptionDat.corering2_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="阀芯密封环3-推荐代码">{{ showDescrptionDat.corering3_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="阀芯密封环3-数量">{{ showDescrptionDat.corering3_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="阀笼1-推荐代码">{{ showDescrptionDat.cage1_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="阀笼1-数量">{{ showDescrptionDat.cage1_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="阀笼2-推荐代码">{{ showDescrptionDat.cage2_recom_code }}</a-descriptions-item>
        <a-descriptions-item label="阀笼2-数量">{{ showDescrptionDat.cage2_recom_num }}</a-descriptions-item>
        <a-descriptions-item label="执行机构膜片-推荐代码">{{ showDescrptionDat.actuator_diaph_code }}</a-descriptions-item>
        <a-descriptions-item label="执行机构膜片-数量">{{ showDescrptionDat.actuator_diaph_num }}</a-descriptions-item>
        <a-descriptions-item label="执行机构维修-推荐代码">{{ showDescrptionDat.actuator_repair_code }}</a-descriptions-item>
        <a-descriptions-item label="执行机构维修-数量">{{ showDescrptionDat.actuator_repair_num }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>

    <importRsplData
      ref="createImportilModal"
      :visible="importVisible"
      @cancel="handleImportCancel"
      @ok="handleImportOK"
    />
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import pick from 'lodash.pick'
import { STable } from '@/components'
import { partsList, deletePart, modifyParts, addParts, partsImport } from '@/api/spareParts'
import XLSX from 'xlsx'
import importRsplData from './ImportRsplData'

const state = {
  1: 'menu.user.manager.query.userState.item1',
  2: 'menu.user.manager.query.userState.item2'
}

const position = {
  1: 'menu.project.view.table.column.sales',
  2: 'menu.user.manager.new.maintenanceEngineer'
}

const columns = [
//   { // date
//     sorter: true,
//     dataIndex: 'Date',
//     slotName: 'menu.project.view.table.column.date',
//     scopedSlots: { customRender: 'Date', title: 'menu.project.view.table.column.date' },
//     width: 200
//   },
  { // 客户名称
    dataIndex: 'customer_name',
    slotName: 'menu.project.view.query.customerName',
    scopedSlots: { customRender: 'customer_name', title: 'menu.project.view.query.customerName' },
    width: 400
  },
  { // 位号
    sorter: true,
    dataIndex: 'tag',
    slotName: 'menu.spare_parts.valve.tag',
    scopedSlots: { customRender: 'tag', title: 'menu.spare_parts.valve.tag' },
    width: 200
  },
  { // 序号
    dataIndex: 'serial',
    slotName: '序号',
    scopedSlots: { customRender: 'serial', title: '序号' },
    width: 150
  },
  { // 阀门尺寸
    dataIndex: 'valve_size',
    slotName: '阀门尺寸',
    scopedSlots: { customRender: 'valve_size', title: '阀门尺寸' },
    width: 150
  },
  { // 阀门型号
    dataIndex: 'valve_model',
    slotName: '阀门型号',
    scopedSlots: { customRender: 'valve_model', title: '阀门型号' },
    width: 150
  },
  { // 执行器型号
    dataIndex: 'actuator_model',
    slotName: '执行器型号',
    scopedSlots: { customRender: 'actuator_model', title: '执行器型号' },
    width: 150
  },
  { // 执行器尺寸
    dataIndex: 'actuator_size',
    slotName: '执行器尺寸',
    scopedSlots: { customRender: 'actuator_size', title: '执行器尺寸' },
    width: 150
  },
  { // 填料备件包-推荐代码
    dataIndex: 'packing_recom_code',
    slotName: '填料备件包-推荐代码',
    scopedSlots: { customRender: 'packing_recom_code', title: '填料备件包-推荐代码' },
    width: 200
  },
  { // 填料备件包-数量
    dataIndex: 'packing_recom_num',
    slotName: '填料备件包-数量',
    scopedSlots: { customRender: 'packing_recom_num', title: '填料备件包-数量' },
    width: 150
  },
  { // 填料备件包1-推荐代码
    dataIndex: 'packing1_recom_code',
    slotName: '填料备件包1-推荐代码',
    scopedSlots: { customRender: 'packing1_recom_code', title: '填料备件包1-推荐代码' },
    width: 200
  },
  { // 填料备件包1-数量
    dataIndex: 'packing1_recom_num',
    slotName: '填料备件包1-数量',
    scopedSlots: { customRender: 'packing1_recom_num', title: '填料备件包1-数量' },
    width: 150
  },
  { // 填料备件包2-推荐代码
    dataIndex: 'packing2_recom_code',
    slotName: '填料备件包2-推荐代码',
    scopedSlots: { customRender: 'packing2_recom_code', title: '填料备件包-推荐代码' },
    width: 200
  },
  { // 填料备件包2-数量
    dataIndex: 'packing2_recom_num',
    slotName: '填料备件包2-数量',
    scopedSlots: { customRender: 'packing2_recom_num', title: '填料备件包2-数量' },
    width: 150
  },
  { // 填料备件包3-推荐代码
    dataIndex: 'packing3_recom_code',
    slotName: '填料备件包3-推荐代码',
    scopedSlots: { customRender: 'packing3_recom_code', title: '填料备件包3-推荐代码' },
    width: 200
  },
  { // 填料备件包3-数量
    dataIndex: 'packing3_recom_num',
    slotName: '填料备件包3-数量',
    scopedSlots: { customRender: 'packing3_recom_num', title: '填料备件包3-数量' },
    width: 150
  },
  { // 填料备件包4-推荐代码
    dataIndex: 'packing4_recom_code',
    slotName: '填料备件包4-推荐代码',
    scopedSlots: { customRender: 'packing4_recom_code', title: '填料备件包4-推荐代码' },
    width: 200
  },
  { // 填料备件包4-数量
    dataIndex: 'packing4_recom_num',
    slotName: '填料备件包4-数量',
    scopedSlots: { customRender: 'packing4_recom_num', title: '填料备件包4-数量' },
    width: 150
  },
  { // 垫片-推荐代码
    dataIndex: 'gasket_recom_code',
    slotName: '垫片-推荐代码',
    scopedSlots: { customRender: 'gasket_recom_code', title: '垫片-推荐代码' },
    width: 150
  },
  { // 垫片1-推荐代码
    dataIndex: 'gasket1_recom_num',
    slotName: '垫片1-推荐代码',
    scopedSlots: { customRender: 'gasket1_recom_num', title: '垫片1-推荐代码' },
    width: 150
  },
  { // 垫片2-推荐代码
    dataIndex: 'gasket2_recom_code',
    slotName: '垫片2-推荐代码',
    scopedSlots: { customRender: 'gasket2_recom_code', title: '垫片2-推荐代码' },
    width: 150
  },
  { // 垫片2-数量
    dataIndex: 'gasket2_recom_num',
    slotName: '垫片2-数量',
    scopedSlots: { customRender: 'gasket2_recom_num', title: '垫片2-数量' },
    width: 150
  },
  { // 垫片3-推荐代码
    dataIndex: 'gasket3_recom_code',
    slotName: '垫片3-推荐代码',
    scopedSlots: { customRender: 'gasket3_recom_code', title: '垫片3-推荐代码' },
    width: 150
  },
  { // 垫片3-数量
    dataIndex: 'gasket3_recom_num',
    slotName: '垫片3-数量',
    scopedSlots: { customRender: 'gasket3_recom_num', title: '垫片3-数量' },
    width: 150
  },
  { // 垫片4-推荐代码
    dataIndex: 'gasket4_recom_code',
    slotName: '垫片4-推荐代码',
    scopedSlots: { customRender: 'gasket4_recom_code', title: '垫片4-推荐代码' },
    width: 150
  },
  { // 垫片4-数量
    dataIndex: 'gasket4_recom_num',
    slotName: '垫片4-数量',
    scopedSlots: { customRender: 'gasket4_recom_num', title: '垫片4-数量' },
    width: 150
  },
  { // 阀座环1-推荐代码
    dataIndex: 'seatring1_recom_code',
    slotName: '阀座环1-推荐代码',
    scopedSlots: { customRender: 'seatring1_recom_code', title: '阀座环1-推荐代码' },
    width: 150
  },
  { // 阀座环1-数量
    dataIndex: 'seatring1_recom_num',
    slotName: '阀座环1-数量',
    scopedSlots: { customRender: 'seatring1_recom_num', title: '阀座环1-数量' },
    width: 150
  },
  { // 阀座环2-推荐代码
    dataIndex: 'seatring2_recom_code',
    slotName: '阀座环2-推荐代码',
    scopedSlots: { customRender: 'seatring2_recom_code', title: '阀座环2-推荐代码' },
    width: 150
  },
  { // 阀座环2-数量
    dataIndex: 'seatring2_recom_num',
    slotName: '阀座环2-数量',
    scopedSlots: { customRender: 'seatring2_recom_num', title: '阀座环2-数量' },
    width: 150
  },
  { // 阀座环3-推荐代码
    dataIndex: 'seatring3_recom_code',
    slotName: '阀座环3-推荐代码',
    scopedSlots: { customRender: 'seatring3_recom_code', title: '阀座环3-推荐代码' },
    width: 150
  },
  { // 阀座环3-数量
    dataIndex: 'seatring3_recom_num',
    slotName: '阀座环3-数量',
    scopedSlots: { customRender: 'seatring3_recom_num', title: '阀座环3-数量' },
    width: 150
  },
  { // 阀座环4-推荐代码
    dataIndex: 'seatring4_recom_code',
    slotName: '阀座环4-推荐代码',
    scopedSlots: { customRender: 'seatring4_recom_code', title: '阀座环4-推荐代码' },
    width: 150
  },
  { // 阀座环4-数量
    dataIndex: 'seatring4_recom_num',
    slotName: '阀座环4-数量',
    scopedSlots: { customRender: 'seatring4_recom_num', title: '阀座环4-数量' },
    width: 150
  },
  { // 阀芯阀杆1-推荐代码
    dataIndex: 'corestem1_recom_code',
    slotName: '阀芯阀杆1-推荐代码',
    scopedSlots: { customRender: 'corestem1_recom_code', title: '阀芯阀杆1-推荐代码' },
    width: 200
  },
  { // 阀芯阀杆1-数量
    dataIndex: 'corestem1_recom_num',
    slotName: '阀芯阀杆1-数量',
    scopedSlots: { customRender: 'corestem1_recom_num', title: '阀芯阀杆1-数量' },
    width: 150
  },
  { // 阀芯阀杆2-推荐代码
    dataIndex: 'corestem2_recom_code',
    slotName: '阀芯阀杆2-推荐代码',
    scopedSlots: { customRender: 'corestem2_recom_code', title: '阀芯阀杆2-推荐代码' },
    width: 200
  },
  { // 阀芯阀杆2-数量
    dataIndex: 'corestem2_recom_num',
    slotName: '阀芯阀杆2-数量',
    scopedSlots: { customRender: 'corestem2_recom_num', title: '阀芯阀杆2-数量' },
    width: 150
  },
  { // 阀芯阀杆3-推荐代码
    dataIndex: 'corestem3_recom_code',
    slotName: '阀芯阀杆3-推荐代码',
    scopedSlots: { customRender: 'corestem3_recom_code', title: '阀芯阀杆3-推荐代码' },
    width: 200
  },
  { // 阀芯阀杆3-数量
    dataIndex: 'corestem3_recom_num',
    slotName: '阀芯阀杆3-数量',
    scopedSlots: { customRender: 'corestem3_recom_num', title: '阀芯阀杆3-数量' },
    width: 150
  },
  { // 阀芯密封环1-推荐代码
    dataIndex: 'corering1_recom_code',
    slotName: '阀芯密封环1-推荐代码',
    scopedSlots: { customRender: 'corering1_recom_code', title: '阀芯密封环1-推荐代码' },
    width: 200
  },
  { // 阀芯密封环1-数量
    dataIndex: 'corering1_recom_num',
    slotName: '阀芯密封环1-数量',
    scopedSlots: { customRender: 'corering1_recom_num', title: '阀芯密封环1-数量' },
    width: 150
  },
  { // 阀芯密封环2-推荐代码
    dataIndex: 'corering2_recom_code',
    slotName: '阀芯密封环2-推荐代码',
    scopedSlots: { customRender: 'corering2_recom_code', title: '阀芯密封环2-推荐代码' },
    width: 200
  },
  { // 阀芯密封环2-数量
    dataIndex: 'corering2_recom_num',
    slotName: '阀芯密封环2-数量',
    scopedSlots: { customRender: 'corering2_recom_num', title: '阀芯密封环2-数量' },
    width: 150
  },
  { // 阀芯密封环3-推荐代码
    dataIndex: 'corering3_recom_code',
    slotName: '阀芯密封环3-推荐代码',
    scopedSlots: { customRender: 'corering3_recom_code', title: '阀芯密封环3-推荐代码' },
    width: 200
  },
  { // 阀芯密封环3-数量
    dataIndex: 'corering3_recom_num',
    slotName: '阀芯密封环3-数量',
    scopedSlots: { customRender: 'corering3_recom_num', title: '阀芯密封环3-数量' },
    width: 150
  },
  { // 阀笼1-推荐代码
    dataIndex: 'cage1_recom_code',
    slotName: '阀笼1-推荐代码',
    scopedSlots: { customRender: 'cage1_recom_code', title: '阀笼1-推荐代码' },
    width: 150
  },
  { // 阀笼1-数量
    dataIndex: 'cage1_recom_num',
    slotName: '阀笼1-数量',
    scopedSlots: { customRender: 'cage1_recom_num', title: '阀笼1-数量' },
    width: 150
  },
  { // 阀笼2-推荐代码
    dataIndex: 'cage2_recom_code',
    slotName: '阀笼2-推荐代码',
    scopedSlots: { customRender: 'cage2_recom_code', title: '阀笼2-推荐代码' },
    width: 150
  },
  { // 阀笼2-数量
    dataIndex: 'cage2_recom_num',
    slotName: '阀笼2-数量',
    scopedSlots: { customRender: 'cage2_recom_num', title: '阀笼2-数量' },
    width: 150
  },
  { // 执行机构膜片-推荐代码
    dataIndex: 'actuator_diaph_code',
    slotName: '执行机构膜片-推荐代码',
    scopedSlots: { customRender: 'actuator_diaph_code', title: '执行机构膜片-推荐代码' },
    width: 200
  },
  { // 执行机构膜片-数量
    dataIndex: 'actuator_diaph_num',
    slotName: '执行机构膜片-数量',
    scopedSlots: { customRender: 'actuator_diaph_num', title: '执行机构膜片-数量' },
    width: 150
  },
  { // 执行机构维修-推荐代码
    dataIndex: 'actuator_repair_code',
    slotName: '执行机构维修-推荐代码',
    scopedSlots: { customRender: 'actuator_repair_code', title: '执行机构维修-推荐代码' },
    width: 200
  },
  { // 执行机构维修-数量
    dataIndex: 'actuator_repair_num',
    slotName: '执行机构维修-数量',
    scopedSlots: { customRender: 'actuator_repair_num', title: '执行机构维修-数量' },
    width: 150
  },
  {
    dataIndex: 'action',
    slotName: 'menu.project.view.table.column.action',
    scopedSlots: { customRender: 'action', title: 'menu.project.view.table.column.action' }
  }
]

export default {
  name: 'TableList',
  components: {
    STable,
    XLSX,
    importRsplData
  },
  data () {
    return {
      description: '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',
      confirmLoading: false,
      visible: false,
      importVisible: false,
      descVisible: false,
      form: this.$form.createForm(this),
      permissions: [],
      addOrModify: true,
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)

        return partsList(requestParameters)
        .then(res => {
            return res.result
        })
      },
      paginationOpt: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, // 默认当前页显示数据的大小
        total: 0, // 总数，必须先有
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '30', '50'],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.paginationOpt.defaultCurrent = 1
          this.paginationOpt.defaultPageSize = pageSize
          this.$refs.table.refresh(true)
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationOpt.defaultCurrent = current
          this.paginationOpt.defaultPageSize = size
          this.$refs.table.refresh(true)
        }
      },
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      state: state,
      position: position,
      columns: columns,
      userModelTitle: '',
      showDescrptionDat: {}
    }
  },
  filters: {
    statusFilter (key) {
      return state[key]
    },
    positionFilter (key) {
        return position[key]
    },
    format (val) {
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    handleAdd () {
      this.form.resetFields()
      this.addOrModify = true
      this.visible = true
      this.userModelTitle = this.$t('menu.project.view.newproject')
    },
    resetQuery () {
        this.queryParam = {}
        this.$refs.table.refresh(true)
    },
    handleEdit (record) {
      this.addOrModify = false
      this.visible = true
      this.userModelTitle = this.$t('menu.user.manager.modify')
      const fields = ['ID', 'customer_id', 'customer_name', 'serial', 'tag', 'valve_size', 'valve_model', 'actuator_model',
                      'actuator_size', 'packing_recom_code', 'packing_recom_num', 'packing1_recom_code', 'packing1_recom_num',
                      'packing2_recom_code', 'packing2_recom_num', 'packing3_recom_code', 'packing3_recom_num', 'packing4_recom_code',
                      'packing4_recom_num', 'gasket_recom_code', 'gasket_recom_num', 'gasket1_recom_code', 'gasket1_recom_num',
                      'gasket2_recom_code', 'gasket2_recom_num', 'gasket3_recom_code', 'gasket3_recom_num', 'gasket4_recom_code',
                      'gasket4_recom_num', 'seatring1_recom_code', 'seatring1_recom_num', 'seatring2_recom_code', 'seatring2_recom_num',
                      'seatring3_recom_code', 'seatring3_recom_num', 'seatring4_recom_code', 'seatring4_recom_num', 'corestem1_recom_code',
                      'corestem1_recom_num', 'corestem2_recom_code', 'corestem2_recom_num', 'corestem3_recom_code', 'corestem3_recom_num',
                      'corering1_recom_code', 'corering1_recom_num', 'corering2_recom_code', 'corering2_recom_num', 'corering3_recom_code',
                      'corering3_recom_num', 'cage1_recom_code', 'cage1_recom_num', 'cage2_recom_code', 'cage2_recom_num', 'actuator_diaph_code',
                      'actuator_diaph_num', 'actuator_repair_code', 'actuator_repair_num']

      fields.forEach(v => this.form.getFieldDecorator(v))
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, fields))
      })
    },
    deleteRecord (record) {
        deletePart(record).then(res => {
            this.$refs.table.refresh()
            this.$message.info(this.$t('menu.user.manager.new.successful'))
        })
    },
    handleDescrption (record) {
      this.showDescrptionDat = record
      this.descVisible = true
    },
    handleAddOk (e) {
      this.confirmLoading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.ID && values.ID.length > 0) {
              modifyParts(values).then(res => {
                  this.visible = false
                  // 重置表单数据
                  this.form.resetFields()
                  // 刷新表格
                  this.$refs.table.refresh()
                  this.$message.info(this.$t('menu.user.manager.new.successful'))
              })
          } else {
              addParts(values).then(res => {
                  // 刷新表格
                  this.$refs.table.refresh()
                  this.$message.info(this.$t('menu.user.manager.new.successful'))
                  this.visible = false
                  // 重置表单数据
                  this.form.resetFields()
              })
          }
        }

        this.confirmLoading = false
      })
    },
    importExcel () {
      this.importVisible = true
    },
    handleImportCancel () {
      this.importVisible = false
    },
    handleImportOK () {
      console.log(this.$refs.createImportilModal.selectCustomerId + '  ' + this.$refs.createImportilModal.dataOption)
      if (this.$refs.createImportilModal.selectCustomerId === 0) {
        this.$message.error('错误', '还未选择客户')
        return
      }
      // this.importVisible = false
      document.getElementById('importExcelButton').click()
    },
    importExcelImpl (file) { // 表格导入
      var that = this

      if (file.length <= 0) { // 如果没有文件名
        return false
      }

      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
              type: 'binary'
          })
          const wsname = workbook.SheetNames[0] // 取第一张表
          const sheet2JSONOpts = {
            header: 'A',
            range: 2,
            /** Default value for null/undefined values */
            defval: ''// 给defval赋值为空的字符串
          }
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname], sheet2JSONOpts) // 生成json表格内容
          // console.log(ws)

          // 查找序列号单元格并取得件号属性名称
          if (ws.length <= 0) {
            this.$message.error('导入无效的RSPL文件')
            return
          }

          var tmpData = {}
          tmpData.parts_valve_list = []
          for (let i = 0; i < ws.length; i++) {
            var tmpDataObject = ws[i]

            tmpData.parts_valve_list.push({
            tag: tmpDataObject['B'] + '',
            serial: tmpDataObject['C'] + '',
            valve_size: tmpDataObject['D'] + '',
            valve_model: tmpDataObject['E'] + '',
            actuator_model: tmpDataObject['F'] + '',
            actuator_size: tmpDataObject['G'] + '',
            packing_recom_code: tmpDataObject['H'] + '',
            packing_recom_num: tmpDataObject['I'] + '',
            packing1_recom_code: tmpDataObject['J'] + '',
            packing1_recom_num: tmpDataObject['K'] + '',
            packing2_recom_code: tmpDataObject['L'] + '',
            packing2_recom_num: tmpDataObject['M'] + '',
            packing3_recom_code: tmpDataObject['N'] + '',
            packing3_recom_num: tmpDataObject['O'] + '',
            packing4_recom_code: tmpDataObject['P'] + '',
            packing4_recom_num: tmpDataObject['Q'] + '',
            gasket_recom_code: tmpDataObject['R'] + '',
            gasket_recom_num: tmpDataObject['S'] + '',
            gasket1_recom_code: tmpDataObject['T'] + '',
            gasket1_recom_num: tmpDataObject['U'] + '',
            gasket2_recom_code: tmpDataObject['V'] + '',
            gasket2_recom_num: tmpDataObject['W'] + '',
            gasket3_recom_code: tmpDataObject['X'] + '',
            gasket3_recom_num: tmpDataObject['Y'] + '',
            gasket4_recom_code: tmpDataObject['Z'] + '',
            gasket4_recom_num: tmpDataObject['AA'] + '',
            seatring1_recom_code: tmpDataObject['AB'] + '',
            seatring1_recom_num: tmpDataObject['AC'] + '',
            seatring2_recom_code: tmpDataObject['AD'] + '',
            seatring2_recom_num: tmpDataObject['AE'] + '',
            seatring3_recom_code: tmpDataObject['AF'] + '',
            seatring3_recom_num: tmpDataObject['AG'] + '',
            seatring4_recom_code: tmpDataObject['AH'] + '',
            seatring4_recom_num: tmpDataObject['AI'] + '',
            corestem1_recom_code: tmpDataObject['AJ'] + '',
            corestem1_recom_num: tmpDataObject['AK'] + '',
            corestem2_recom_code: tmpDataObject['AL'] + '',
            corestem2_recom_num: tmpDataObject['AM'] + '',
            corestem3_recom_code: tmpDataObject['AN'] + '',
            corestem3_recom_num: tmpDataObject['AO'] + '',
            corering1_recom_code: tmpDataObject['AP'] + '',
            corering1_recom_num: tmpDataObject['AQ'] + '',
            corering2_recom_code: tmpDataObject['AR'] + '',
            corering2_recom_num: tmpDataObject['AS'] + '',
            corering3_recom_code: tmpDataObject['AT'] + '',
            corering3_recom_num: tmpDataObject['AU'] + '',
            cage1_recom_code: tmpDataObject['AV'] + '',
            cage1_recom_num: tmpDataObject['AW'] + '',
            cage2_recom_code: tmpDataObject['AX'] + '',
            cage2_recom_num: tmpDataObject['AY'] + '',
            actuator_diaph_code: tmpDataObject['AZ'] + '',
            actuator_diaph_num: tmpDataObject['BA'] + '',
            actuator_repair_code: tmpDataObject['BB'] + '',
            actuator_repair_num: tmpDataObject['BC'] + ''
            })
          }

          if (tmpData.parts_valve_list.length > 0) {
            tmpData.customerId = this.$refs.createImportilModal.selectCustomerId
            tmpData.dataOption = this.$refs.createImportilModal.dataOption

            partsImport(tmpData).then(e => {
              that.$refs.table.refresh()
              that.importVisible = false
              that.$message.success('导入数据成功')
            })
          }
        } catch (e) {
            return false
        }
      }
      fileReader.readAsBinaryString(file)
    }
  }
}
</script>

<style lang="less" scoped>
.permission-form {
  /deep/ .permission-group {
    margin-top: 0;
    margin-bottom: 0;
  }
}

</style>
