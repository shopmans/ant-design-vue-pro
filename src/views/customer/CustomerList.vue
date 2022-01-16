<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="18">
            <!-- 客户代码 -->
            <a-col :lg="4" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.query.businessCode')">
                <a-input v-model="queryParam.code" />
              </a-form-item>
            </a-col>
            <!-- 公司中文名称 -->
            <a-col :lg="4" :md="8" :sm="24">
              <a-form-item :label="$t('menu.project.view.query.customerName')">
                <a-input v-model="queryParam.customer_name" />
              </a-form-item>
            </a-col>
            <!-- 公司英文名称 -->
            <a-col :lg="4" :md="8" :sm="24">
              <a-form-item :label="$t('menu.project.view.query.customerEnName')">
                <a-input v-model="queryParam.customer_en_name" />
              </a-form-item>
            </a-col>
            <!-- 省 -->
            <a-col :lg="4" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.province')">
                <a-input v-model="queryParam.province" />
              </a-form-item>
            </a-col>
            <!-- 行业 -->
            <a-col :lg="4" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.industry')">
                <a-input v-model="queryParam.industry" />
              </a-form-item>
            </a-col>
            <template v-if="advancedQuery">
              <!-- 行业代码 -->
              <a-col :lg="4" :md="8" :sm="24">
                <a-form-item :label="$t('menu.customer.industry.code')">
                  <a-input v-model="queryParam.industry_code" />
                </a-form-item>
              </a-col>
              <!-- 销售 -->
              <a-col :lg="4" :md="8" :sm="24">
                <a-form-item :label="$t('menu.customer.sales')">
                  <a-input v-model="queryParam.sales" />
                </a-form-item>
              </a-col>
              <!-- 地址 -->
              <a-col :lg="4" :md="8" :sm="24">
                <a-form-item :label="$t('menu.customer.address')">
                  <a-input v-model="queryParam.address" />
                </a-form-item>
              </a-col>
              <!-- 所属集团 -->
              <a-col :lg="4" :md="8" :sm="24">
                <a-form-item :label="$t('menu.customer.group.owner')">
                  <a-input v-model="queryParam.group_owner" />
                </a-form-item>
              </a-col>
              <!-- 装置 -->
              <a-col :lg="4" :md="8" :sm="24">
                <a-form-item :label="$t('menu.customer.device')">
                  <a-input v-model="queryParam.device" />
                </a-form-item>
              </a-col>
              <!-- 投运时间 -->
              <a-col :lg="4" :md="8" :sm="24">
                <a-form-item :label="$t('menu.customer.operation.time')">
                  <a-input v-model="queryParam.operation_time" style="width: 100%" />
                </a-form-item>
              </a-col>
              <!-- 关健程度 -->
              <a-col :lg="4" :md="8" :sm="24">
                <a-form-item :label="$t('menu.customer.criticality')">
                  <a-input v-model="queryParam.criticality" />
                </a-form-item>
              </a-col>
              <!-- Installbase fishcer 数量 -->
              <a-col :lg="4" :md="8" :sm="24">
                <a-form-item :label="$t('menu.customer.installbase.fischer')">
                  <a-input v-model="queryParam.installbase_fisher" />
                </a-form-item>
              </a-col>
              <!-- Installbase isv 数量 -->
              <a-col :lg="4" :md="8" :sm="24">
                <a-form-item :label="$t('menu.customer.installbase.isv')">
                  <a-input v-model="queryParam.installbase_isv" />
                </a-form-item>
              </a-col>
              <!-- Installbase prv 数量 -->
              <a-col :lg="4" :md="8" :sm="24">
                <a-form-item :label="$t('menu.customer.installbase.prv')">
                  <a-input v-model="queryParam.installbase_prv" />
                </a-form-item>
              </a-col>
              <!-- Installbase prm 数量 -->
              <a-col :lg="4" :md="8" :sm="24">
                <a-form-item :label="$t('menu.customer.installbase.prm')">
                  <a-input v-model="queryParam.installbase_prm" />
                </a-form-item>
              </a-col>
              <!-- Installbase ggc 数量 -->
              <a-col :lg="4" :md="8" :sm="24">
                <a-form-item :label="$t('menu.customer.installbase.ggc')">
                  <a-input v-model="queryParam.installbase_ggc" />
                </a-form-item>
              </a-col>
              <!-- 公司类型 -->
              <a-col :lg="4" :md="8" :sm="24">
                <a-form-item :label="$t('menu.customer.query.companyType')">
                  <a-select v-model="queryParam.class" :allowClear="true">
                    <a-select-option value="1">{{ $t('menu.customer.query.companyType.item1') }}</a-select-option>
                    <a-select-option value="2">{{ $t('menu.customer.query.companyType.item2') }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <!-- 分组 -->
              <!-- <a-col :lg="4" :md="8" :sm="24">
                <a-form-item :label="$t('menu.customer.new.group')">
                  <a-select v-model="queryParam.group_name" :allowClear="true">
                    <a-select-option value="1">{{ $t('menu.customer.query.companyType.item1') }}</a-select-option>
                    <a-select-option value="2">{{ $t('menu.customer.query.companyType.item2') }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col> -->
            </template>
            <a-col :lg="!advancedQuery && 4 || 24" :md="8" :sm="24">
              <span class="table-page-search-submitButtons" :style="advancedQuery && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="startQuery">{{ $t('menu.project.view.query.query') }}</a-button>
                <a-button style="margin-left: 8px" @click="resetQuery">{{ $t('menu.project.view.query.reset') }}</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advancedQuery ? $t('menu.project.view.query.collapse') : $t('menu.project.view.action.more') }}
                  <a-icon :type="advancedQuery ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button icon="plus" @click="handleAdd">{{ $t('menu.project.view.newproject') }}</a-button>
        <a-upload accept=".xls,.xlsx" :before-upload="importExcel" :show-upload-list="false" ><a-button icon="plus">{{ $t('menu.spare_parts.excel_import') }}</a-button></a-upload>
        <a-button icon="minus" @click="exportExcel">{{ $t('menu.spare_parts.excel_export') }}</a-button>
      </div>

      <!-- <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">{{ $t('menu.project.view.newproject') }}</a-button>
      </div> -->

      <!-- ///////////////////////////////////////////////////// 客户列表 -->
      <s-table
        ref="table"
        rowKey="id"
        size="default"
        :columns="columnsNoAction"
        :data="loadData"
        v-if="optOpen"
        :pagination="paginationOpt"
        :scroll="{ x: 3500 }"
      >
        <span slot="class" slot-scope="text">{{ $t(className[text]) }}</span>
        <span slot="group_name" slot-scope="text">{{ $t(groupName[text]) }}</span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">{{ $t('menu.user.manager.modify') }}</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">{{ $t('menu.project.view.action.delete') }}</a>
        </span>
        <template v-for="(item, index) in columnsNoAction" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

      <!-- ///////////////////////////////////////////////////// 编辑客户 -->
      <s-table
        ref="table"
        rowKey="id"
        size="default"
        :columns="columns"
        :data="loadData"
        v-if="optEdit"
        :pagination="paginationOpt"
      >
        <span slot="class" slot-scope="text">{{ $t(className[text]) }}</span>
        <span slot="group_name" slot-scope="text">{{ $t(groupName[text]) }}</span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">{{ $t('menu.user.manager.action.edit') }}</a>
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

      <!-- ///////////////////////////////////////////////////// 删除客户 -->
      <s-table
        ref="table"
        rowKey="id"
        size="default"
        :columns="columns"
        :data="loadData"
        v-if="optDelete"
        :pagination="paginationOpt"
      >
        <span slot="class" slot-scope="text">{{ $t(className[text]) }}</span>
        <span slot="group_name" slot-scope="text">{{ $t(groupName[text]) }}</span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleDelete(record)">{{ $t('menu.project.view.action.delete') }}</a>
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

      <!-- ///////////////////////////////////////////////////// 导入 -->
      <s-table
        ref="table"
        rowKey="id"
        size="default"
        :columns="columns"
        :data="loadData"
        v-if="optImport"
        :pagination="paginationOpt"
      >
        <span slot="class" slot-scope="text">{{ $t(className[text]) }}</span>
        <span slot="group_name" slot-scope="text">{{ $t(groupName[text]) }}</span>
        <span slot="action" slot-scope="">
          导入
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

      <!-- ///////////////////////////////////////////////////// 导出 -->
      <s-table
        ref="table"
        rowKey="id"
        size="default"
        :columns="columns"
        :data="loadData"
        v-if="optExport"
        :pagination="paginationOpt"
      >
        <span slot="class" slot-scope="text">{{ $t(className[text]) }}</span>
        <span slot="group_name" slot-scope="text">{{ $t(groupName[text]) }}</span>
        <span slot="action" slot-scope="">
          导出
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

      <!-- <s-table
        ref="table"
        rowKey="id"
        size="default"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
      >
        <span slot="class" slot-scope="text">{{ $t(className[text]) }}</span>
        <span slot="group_name" slot-scope="text">{{ $t(groupName[text]) }}</span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">{{ $t('menu.user.manager.action.edit') }}</a>
          <a-divider type="vertical" />
          <a-popconfirm :title="$t('menu.customer.action.delete.note')" @confirm="handleDelete(record)">
            <a>{{ $t('menu.project.view.action.delete') }}</a>
          </a-popconfirm>
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table> -->

      <a-modal
        :title="$t('menu.project.view.table.column.action')"
        style="top: 20px;"
        :width="800"
        v-model="visible"
        :confirmLoading="confirmLoading"
        :maskClosable="false"
        @ok="handleAddUserOk"
      >
        <a-form class="permission-form" :form="form">
          <a-row :gutter="18">
            <!-- 客户代码 -->
            <a-col :lg="8" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.query.businessCode')">
                <a-input v-decorator="['code', { rules: [] }]" />
              </a-form-item>
            </a-col>
            <!-- 公司中文名称 -->
            <a-col :lg="8" :md="8" :sm="24">
              <a-form-item :label="$t('menu.project.view.query.customerName')">
                <a-input v-decorator="['customer_name', { rules: [{required: true, message: '请输入客户名称'}] }]" />
              </a-form-item>
            </a-col>
            <!-- 公司英文名称 -->
            <a-col :lg="8" :md="8" :sm="24">
              <a-form-item :label="$t('menu.project.view.query.customerEnName')">
                <a-input v-decorator="['customer_en_name', { rules: [] }]" />
              </a-form-item>
            </a-col>
            <!-- 省 -->
            <a-col :lg="8" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.province')">
                <a-input v-decorator="['province', { rules: [] }]" />
              </a-form-item>
            </a-col>
            <!-- 行业 -->
            <a-col :lg="8" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.industry')">
                <a-input v-decorator="['industry', { rules: [] }]" />
              </a-form-item>
            </a-col>
            <!-- 行业代码 -->
            <a-col :lg="8" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.industry.code')">
                <a-input v-decorator="['industry_code', { rules: [] }]" />
              </a-form-item>
            </a-col>
            <!-- 销售 -->
            <a-col :lg="8" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.sales')">
                <a-input v-decorator="['sales', { rules: [] }]" />
              </a-form-item>
            </a-col>
            <!-- 地址 -->
            <a-col :lg="8" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.address')">
                <a-input v-decorator="['address', { rules: [] }]" />
              </a-form-item>
            </a-col>
            <!-- 所属集团 -->
            <a-col :lg="8" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.group.owner')">
                <a-input v-decorator="['group_owner', { rules: [] }]" />
              </a-form-item>
            </a-col>
            <!-- 装置 -->
            <a-col :lg="8" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.device')">
                <a-input v-decorator="['device', { rules: [] }]" />
              </a-form-item>
            </a-col>
            <!-- 投运时间 -->
            <a-col :lg="8" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.operation.time')">
                <a-input v-decorator="['operation_time', { rules: [] }]" />
              </a-form-item>
            </a-col>
            <!-- 关健程度 -->
            <a-col :lg="8" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.criticality')">
                <a-input v-decorator="['criticality', { rules: [] }]" />
              </a-form-item>
            </a-col>
            <!-- Installbase fishcer 数量 -->
            <a-col :lg="8" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.installbase.fischer')">
                <a-input v-decorator="['installbase_fisher', { rules: [] }]" />
              </a-form-item>
            </a-col>
            <!-- Installbase isv 数量 -->
            <a-col :lg="8" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.installbase.isv')">
                <a-input v-decorator="['installbase_isv', { rules: [] }]" />
              </a-form-item>
            </a-col>
            <!-- Installbase prv 数量 -->
            <a-col :lg="8" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.installbase.prv')">
                <a-input v-decorator="['installbase_prv', { rules: [] }]" />
              </a-form-item>
            </a-col>
            <!-- Installbase prm 数量 -->
            <a-col :lg="8" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.installbase.prm')">
                <a-input v-decorator="['installbase_prm', { rules: [] }]" />
              </a-form-item>
            </a-col>
            <!-- Installbase ggc 数量 -->
            <a-col :lg="8" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.installbase.ggc')">
                <a-input v-decorator="['installbase_ggc', { rules: [] }]" />
              </a-form-item>
            </a-col>
            <!-- 公司类型 -->
            <a-col :lg="8" :md="8" :sm="24">
              <a-form-item :label="$t('menu.customer.query.companyType')">
                <a-select v-decorator="['class', { rules: [] }]" :allowClear="true">
                  <a-select-option value="1">{{ $t('menu.customer.query.companyType.item1') }}</a-select-option>
                  <a-select-option value="2">{{ $t('menu.customer.query.companyType.item2') }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item>
            <a-input hidden v-decorator="['id', {rules: []}]"></a-input>
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import XLSX from 'xlsx'
import pick from 'lodash.pick'
import { saveAs } from 'file-saver'
import { STable } from '@/components'
import { getCustomerList, deleteCustomer, modifyCustomer, addCustomer, importCustomers, exportCustomers } from '@/api/customer'
import { deleteTmpReportFile } from '@/api/report'
// import { PERMISSION_ENUM } from '@/utils/helper/permission'

const columns = [
  {
    slotName: 'menu.customer.table.title.serial',
    dataIndex: 'serial',
    sorter: true,
    scopedSlots: { customRender: 'serial', title: 'menu.customer.table.title.serial' }
  },
  {
    slotName: 'menu.customer.query.companyType',
    dataIndex: 'class',
    scopedSlots: { customRender: 'class', title: 'menu.customer.query.companyType' }
  },
  {
    sorter: true,
    slotName: 'menu.customer.query.businessCode',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code', title: 'menu.customer.query.businessCode' }
  },
  {
    slotName: 'menu.project.view.query.customerName',
    dataIndex: 'customer_name',
    scopedSlots: { customRender: 'customer_name', title: 'menu.project.view.query.customerName' }
  },
  {
    slotName: 'menu.project.view.query.customerEnName',
    dataIndex: 'customer_en_name',
    scopedSlots: { customRender: 'customer_en_name', title: 'menu.project.view.query.customerEnName' }
  },
  {
    slotName: 'menu.customer.new.group',
    dataIndex: 'group_name',
    scopedSlots: { customRender: 'group_name', title: 'menu.customer.new.group' }
  },
  {
    slotName: 'menu.project.view.table.column.action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action', title: 'menu.project.view.table.column.action' }
  }
]

const columnsNoAction = [
  // 客户代码
  {
    sorter: true,
    slotName: 'menu.customer.query.businessCode',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code', title: 'menu.customer.query.businessCode' },
    width: 200
  },
  // 用户名称
  {
    slotName: 'menu.project.view.query.customerName',
    dataIndex: 'customer_name',
    scopedSlots: { customRender: 'customer_name', title: 'menu.project.view.query.customerName' },
    width: 400
  },
  // 英文名
  {
    slotName: 'menu.project.view.query.customerEnName',
    dataIndex: 'customer_en_name',
    scopedSlots: { customRender: 'customer_en_name', title: 'menu.project.view.query.customerEnName' },
    width: 400
  },
  // 省份
  {
    slotName: 'menu.customer.province',
    dataIndex: 'province',
    scopedSlots: { customRender: 'province', title: 'menu.customer.province' }
  },
  // 行业
  {
    slotName: 'menu.customer.industry',
    dataIndex: 'industry',
    scopedSlots: { customRender: 'industry', title: 'menu.customer.industry' }
  },
  // 行业代码
  {
    slotName: 'menu.customer.industry.code',
    dataIndex: 'industry_code',
    scopedSlots: { customRender: 'industry_code', title: 'menu.customer.industry.code' }
  },
  // 销售
  {
    slotName: 'menu.customer.sales',
    dataIndex: 'sales',
    scopedSlots: { customRender: 'sales', title: 'menu.customer.sales' }
  },
  // 地址
  {
    slotName: 'menu.customer.address',
    dataIndex: 'address',
    scopedSlots: { customRender: 'address', title: 'menu.customer.address' }
  },
  // 所属集团
  {
    slotName: 'menu.customer.group.owner',
    dataIndex: 'group_owner',
    scopedSlots: { customRender: 'group_owner', title: 'menu.customer.group.owner' }
  },
  // 装置
  {
    slotName: 'menu.customer.device',
    dataIndex: 'device',
    scopedSlots: { customRender: 'device', title: 'menu.customer.device' }
  },
  // 投运时间
  {
    slotName: 'menu.customer.operation.time',
    dataIndex: 'operation_time',
    scopedSlots: { customRender: 'operation_time', title: 'menu.customer.operation.time' }
  },
  // 关键程度
  {
    slotName: 'menu.customer.criticality',
    dataIndex: 'criticality',
    scopedSlots: { customRender: 'criticality', title: 'menu.customer.criticality' }
  },
  // Installbase fishcer 数量
  {
    slotName: 'menu.customer.installbase.fischer',
    dataIndex: 'installbase_fisher',
    scopedSlots: { customRender: 'installbase_fisher', title: 'menu.customer.installbase.fischer' }
  },
  // Installbase isv 数量
  {
    slotName: 'menu.customer.installbase.isv',
    dataIndex: 'installbase_isv',
    scopedSlots: { customRender: 'installbase_isv', title: 'menu.customer.installbase.isv' }
  },
  // Installbase prv 数量
  {
    slotName: 'menu.customer.installbase.prv',
    dataIndex: 'installbase_prv',
    scopedSlots: { customRender: 'installbase_prv', title: 'menu.customer.installbase.prv' }
  },
  // Installbase prm 数量
  {
    slotName: 'menu.customer.installbase.prm',
    dataIndex: 'installbase_prm',
    scopedSlots: { customRender: 'installbase_prm', title: 'menu.customer.installbase.prm' }
  },
  // Installbase ggc 数量
  {
    slotName: 'menu.customer.installbase.ggc',
    dataIndex: 'installbase_ggc',
    scopedSlots: { customRender: 'installbase_ggc', title: 'menu.customer.installbase.ggc' }
  },
  // {
  //   slotName: 'menu.customer.table.title.serial',
  //   dataIndex: 'serial',
  //   sorter: true,
  //   scopedSlots: { customRender: 'serial', title: 'menu.customer.table.title.serial' }
  // },
  {
    slotName: 'menu.customer.query.companyType',
    dataIndex: 'class',
    scopedSlots: { customRender: 'class', title: 'menu.customer.query.companyType' }
  },
  // {
  //   slotName: 'menu.customer.new.group',
  //   dataIndex: 'group_name',
  //   scopedSlots: { customRender: 'group_name', title: 'menu.customer.new.group' }
  // }
  {
    slotName: 'menu.project.view.table.column.action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action', title: 'menu.project.view.table.column.action' }
  }
]

const className = {
    1: 'menu.customer.query.companyType.item1',
    2: 'menu.customer.query.companyType.item2'
}

const groupName = {
  1: 'menu.customer.new.finallyUser'
}

export default {
  name: 'TableList',
  components: {
    STable,
    XLSX
  },
  data () {
    return {
      description: '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',
      confirmLoading: false,
      visible: false,
      form: this.$form.createForm(this),
      permissions: [],
      addOrModify: true,
      advancedQuery: false,

      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: columns,
      columnsNoAction: columnsNoAction,
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        requestParameters.installbase_fisher = getNumber(requestParameters.installbase_fisher)
        requestParameters.installbase_isv = getNumber(requestParameters.installbase_isv)
        requestParameters.installbase_prv = getNumber(requestParameters.installbase_prv)
        requestParameters.installbase_prm = getNumber(requestParameters.installbase_prm)
        requestParameters.installbase_ggc = getNumber(requestParameters.installbase_ggc)

        return getCustomerList(requestParameters)
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
      className: className,
      groupName: groupName,
      optDelete: false,
      optOpen: false,
      optEdit: false,
      optExport: false,
      optImport: false
    }
  },
  mounted () {
    this.optOpen = false
    this.optDelete = false
    this.optEdit = false
    this.optExport = false
    this.optImport = false

    // 客户列表
    if (this.$route.meta.opt === 'open') {
      this.optOpen = true
    }
    // 删除客户
    if (this.$route.meta.opt === 'delete') {
      this.optDelete = true
    }
    // 编辑客户
    if (this.$route.meta.opt === 'edit') {
      this.optEdit = true
    }
    // 导出
    if (this.$route.meta.opt === 'export') {
      this.optExport = true
    }
    // 导入
    if (this.$route.meta.opt === 'import') {
      this.optImport = true
    }
  },
  filters: {
    classFilter (key) {
      return className[key]
    },
    groupNameFilter (key) {
        return groupName[key]
    },
    formatDate (val) {
      if (val.indexOf('0001-01-01') >= 0) {
        return ''
      }
      return moment(val).zone('+08:00').format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    handleAdd () {
      this.form.resetFields()
      this.addOrModify = true
      this.visible = true
    },
    startQuery () {
      this.$store.commit('SET_CUR_PAGE_NO', 0)
      this.$store.commit('SET_CUR_PAGE_SIZE', 10)
      this.$refs.table.refresh(true)
    },
    resetQuery () {
      this.$store.commit('SET_CUR_PAGE_NO', 0)
      this.$store.commit('SET_CUR_PAGE_SIZE', 10)
      this.queryParam = {}
      this.$refs.table.refresh(true)
    },
    handleEdit (record) {
      this.addOrModify = false
      this.visible = true

      const userFields = ['id', 'class', 'code', 'group_name', 'customer_name', 'customer_en_name', 'state', 'province', 'industry', 'industry_code', 'sales', 'address', 'group_owner', 'device', 'operation_time', 'criticality', 'installbase_fisher', 'installbase_isv', 'installbase_prv', 'installbase_prm', 'installbase_ggc']
      userFields.forEach(v => this.form.getFieldDecorator(v))
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, userFields))
      })
    },
    toggleAdvanced () {
      this.advancedQuery = !this.advancedQuery
    },
    handleDelete (record) {
      const letThis = this
      this.$confirm({
        title: this.$t('menu.project.view.action.delete'),
        content: this.$t('menu.project.delete.note.1') + record.customer_name + this.$t('menu.customer.delete.note.2'),
        okText: this.$t('app.button.confirm'),
        cancelText: this.$t('app.button.cancel'),
        onOk () {
          deleteCustomer(record).then(res => {
            letThis.$refs.table.refresh()
            letThis.$message.info(this.$t('menu.user.manager.new.successful'))
        })
        }
      })
    },
    handleAddUserOk (e) {
      this.confirmLoading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        values.installbase_fisher = getNumber(values.installbase_fisher)
        values.installbase_isv = getNumber(values.installbase_isv)
        values.installbase_prv = getNumber(values.installbase_prv)
        values.installbase_prm = getNumber(values.installbase_prm)
        values.installbase_ggc = getNumber(values.installbase_ggc)

        if (!err) {
          if (values.id && values.id.length > 0) {
            modifyCustomer(values).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              this.form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()
              this.$message.info(this.$t('menu.user.manager.new.modifySuccessful'))
            })
          } else {
            addCustomer(values).then(res => {
              // 刷新表格
              this.$refs.table.refresh()
              this.$message.info(this.$t('menu.user.manager.new.newSuccessful'))
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              this.form.resetFields()
            })

            this.confirmLoading = false
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    // 导入excel
    importExcel (file) {
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

          var tmpData = {}
          tmpData.customerList = []
          for (let i = 0; i < ws.length; i++) {
            var tmpDataObject = ws[i]

            tmpData.customerList.push({
              code: tmpDataObject['B'] + '',
              customer_name: tmpDataObject['C'] + '',
              customer_en_name: tmpDataObject['D'] + '',
              province: tmpDataObject['E'] + '',
              industry: tmpDataObject['F'] + '',
              industry_code: tmpDataObject['G'] + '',
              sales: tmpDataObject['H'] + '',
              address: tmpDataObject['I'] + '',
              group_owner: tmpDataObject['J'] + '',
              device: tmpDataObject['K'] + '',
              operation_time: tmpDataObject['L'] + '',
              criticality: tmpDataObject['M'] + '',
              installbase_fisher: getNumber(tmpDataObject['N']),
              installbase_isv: getNumber(tmpDataObject['O']),
              installbase_prv: getNumber(tmpDataObject['P']),
              installbase_prm: getNumber(tmpDataObject['Q']),
              installbase_ggc: getNumber(tmpDataObject['R'])
            })
          }

          if (tmpData.customerList.length > 0) {
            importCustomers(tmpData).then(e => {
              that.$refs.table.refresh()
              that.$message.success('导入数据成功')
            })
          }
        } catch (e) {
            return false
        }
      }
      fileReader.readAsBinaryString(file)
    },
    // 导出excel
    exportExcel () {
      var tmpQueryParam = { ...this.queryParam }
      tmpQueryParam.installbase_fisher = getNumber(tmpQueryParam.installbase_fisher)
      tmpQueryParam.installbase_isv = getNumber(tmpQueryParam.installbase_isv)
      tmpQueryParam.installbase_prv = getNumber(tmpQueryParam.installbase_prv)
      tmpQueryParam.installbase_prm = getNumber(tmpQueryParam.installbase_prm)
      tmpQueryParam.installbase_ggc = getNumber(tmpQueryParam.installbase_ggc)

      exportCustomers(tmpQueryParam).then(res => {
        const filename = res.replace('/api/report/download/', '')
        saveAs(res, filename)
        deleteTmpReportFile(filename)
        this.$message.info('导出客户数据完毕')
      })
    }
  }
}

function getNumber (d) {
  var tmp = Number(d)
  if (isNaN(tmp)) {
    return 0
  }
  return tmp
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
