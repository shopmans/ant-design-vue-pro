<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <template v-if="optEngineeringStatistic">
        <div style="margin-bottom:20px;">
          列选择器：<a-select mode="tags" style="width: 90%" :default-value="columnsSelectDefault" @change="columsSelecthandleChange">
            <a-select-option v-for="item in enStatisticSelectColumns" :key="item.slotName">
              {{ $t(item.slotName) }}
            </a-select-option>
          </a-select>
        </div>
      </template>
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <!-- 工程编号 -->
            <a-col :md="4" :sm="24">
              <a-form-item :label="$t('menu.project.view.query.projectSerial')">
                <a-input v-model="queryParam.serial" placeholder=""/>
              </a-form-item>
            </a-col>
            <!-- 合同编号 -->
            <a-col :md="4" :sm="24">
              <a-form-item :label="$t('menu.project.view.query.contractSerial')">
                <a-input v-model="queryParam.contract_serial" placeholder=""/>
              </a-form-item>
            </a-col>
            <!-- 最终用户 -->
            <a-col :md="4" :sm="24">
              <a-form-item :label="$t('menu.customer.new.finallyUser')">
                <a-input v-model="queryParam.finally_user" placeholder=""/>
              </a-form-item>
            </a-col>
            <!-- 销售 -->
            <a-col :md="4" :sm="24">
              <a-form-item :label="$t('menu.project.view.table.column.sales')">
                <!-- <a-input v-model="queryParam.sales_name" placeholder=""/> -->
                <a-select
                  :default-active-first-option="false"
                  :filter-option="false"
                  :not-found-content="null"
                  style="width:100%;"
                  v-model="queryParam.sales_name"
                >
                  <a-select-option v-for="d in salesList" :key="d.key">
                    {{ d.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!-- 维修车间 -->
            <a-col :md="4" :sm="24">
              <a-form-item :label="$t('menu.project.detail.repairShop')">
                <a-select v-model="queryParam.repair_plan" :allowClear="true">
                  <a-select-option value="1">{{ $t('menu.project.detail.repairShop.item1') }}</a-select-option>
                  <a-select-option value="2">{{ $t('menu.project.detail.repairShop.item2') }}</a-select-option>
                  <a-select-option value="3">{{ $t('menu.project.detail.repairShop.item3') }}</a-select-option>
                  <a-select-option value="4">{{ $t('menu.project.detail.repairShop.item4') }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <!-- 工程状态 -->
              <a-col :md="4" :sm="24">
                <a-form-item :label="$t('menu.project.view.query.projectState')">
                  <a-select v-model="queryParam.state" :allowClear="true">
                    <a-select-option value="1">{{ $t('menu.project.view.query.projectState.item1') }}</a-select-option>
                    <a-select-option value="2">{{ $t('menu.project.view.query.projectState.item2') }}</a-select-option>
                    <a-select-option value="3">{{ $t('menu.project.view.query.projectState.item3') }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <!-- 阀门数量 -->
              <a-col :md="4" :sm="24">
                <a-form-item :label="$t('menu.project.new.valveNumber')">
                  <a-input v-model="queryParam.number" placeholder=""/>
                </a-form-item>
              </a-col>
              <!-- 开始-收货日期 -->
              <a-col :md="4" :sm="24">
                <a-form-item :label="$t('app.flow.repair.receipt.date.start')">
                  <a-date-picker v-model="queryParam.receipt_date_start" style="width: 100%" />
                </a-form-item>
              </a-col>
              <!-- 结束-收货日期 -->
              <a-col :md="4" :sm="24">
                <a-form-item :label="$t('app.flow.repair.receipt.date.end')">
                  <a-date-picker v-model="queryParam.receipt_date_end" style="width: 100%" />
                </a-form-item>
              </a-col>
              <!-- 开始-完工日期 -->
              <a-col :md="4" :sm="24">
                <a-form-item :label="$t('menu.project.detail.closeDate.start')">
                  <a-date-picker v-model="queryParam.close_date_start" style="width: 100%" />
                </a-form-item>
              </a-col>
              <!-- 结束-完工日期 -->
              <a-col :md="4" :sm="24">
                <a-form-item :label="$t('menu.project.detail.closeDate.end')">
                  <a-date-picker v-model="queryParam.close_date_end" style="width: 100%" />
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 4 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="startQuery">{{ this.$t('menu.project.view.query.query') }}</a-button>
                <a-button style="margin-left: 8px" @click="resetQuery">{{ this.$t('menu.project.view.query.reset') }}</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? this.$t('menu.project.view.query.collapse') : this.$t('menu.project.view.action.more') }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <!-- <template v-if="!optDelete">
        <div class="table-operator">
          <a-button type="primary" icon="plus" @click="handleAdd">{{ this.$t('menu.project.view.newproject') }}</a-button>
        </div>
      </template> -->

      <!----------------------------------------------------- 打开工程 -->
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        v-if="optOpen"
        :pagination="paginationOpt"
        :scroll="{x: 1400}"
      >
        <span slot="state" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="$t(statusMap[text].text)"></a-badge>
        </span>
        <span slot="date" slot-scope="text">
          {{ text | format }}
        </span>
        <span slot="total" slot-scope="text">
          {{ text | formatContractTotal }}
        </span>
        <span slot="receipt_date" slot-scope="text">
          {{ text | format }}
        </span>
        <span slot="close_date" slot-scope="text">
          {{ text | format }}
        </span>
        <span slot="repair_plan" slot-scope="text">
          {{ text | formatRepairPlan }}
        </span>

        <span slot="action" slot-scope="text, record">
          <!-- 查看 -->
          <a @click="handleDetail(record)">{{ $t('menu.project.view.action.description') }}</a>
          <a-divider type="vertical" />
          <!-- 编辑 -->
          <template v-if="statusMap[record.state].status === 'success'">
            <span>{{ $t('menu.user.manager.action.edit') }}</span>
          </template>
          <template v-else>
            <span><a @click="handleEdit(record)">{{ $t('menu.user.manager.action.edit') }}</a></span>
          </template>
          <!-- 工程详细 -->
          <a-divider type="vertical" />
          <a @click="handleDescription(record)">{{ $t('menu.project.view.action.project.description') }}</a>
          <!-- 操作 -->
          <!-- <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              {{ $t('menu.project.view.action.more') }} <a-icon type="down" />
            </a>
            <a-menu slot="overlay"> -->
          <!-- 维修进度报表 -->
          <!-- <a-menu-item >
                <a @click="progressReport(record)">{{ $t('maintenance.progress.report') }}</a>
              </a-menu-item> -->
          <!-- 维修状态报表 -->
          <!-- <a-menu-item >
                <a @click="statusReport(record)">{{ $t('maintenance.status.report') }}</a>
              </a-menu-item> -->
          <!-- 维修工时报表 -->
          <!-- <a-menu-item >
                <a @click="workingHoursReport(record)">{{ $t('maintenance.working.hours.report') }}</a>
              </a-menu-item> -->
          <!-- 删除 -->
          <!-- <a-menu-item>
                <a @click="handleDelete(record)">{{ $t('menu.project.view.action.delete') }}</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown> -->
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

      <!----------------------------------------------------- 删除工程 -->
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="deleteColumns"
        :data="loadData"
        v-if="optDelete"
        :pagination="paginationOpt"
        :scroll="{x: 1400}"
      >
        <span slot="state" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="$t(statusMap[text].text)"></a-badge>
        </span>
        <span slot="date" slot-scope="text">
          {{ text | format }}
        </span>
        <span slot="ex_open_date" slot-scope="text">
          {{ text | format }}
        </span>
        <span slot="ex_close_date" slot-scope="text">
          {{ text | format }}
        </span>
        <span slot="total" slot-scope="text">
          {{ text | formatContractTotal }}
        </span>
        <span slot="repair_plan" slot-scope="text">
          {{ text | formatRepairPlan }}
        </span>
        <span slot="receipt_date" slot-scope="text">
          {{ text | format }}
        </span>
        <span slot="close_date" slot-scope="text">
          {{ text | format }}
        </span>
        <span slot="action" slot-scope="text, record">
          <!-- 删除 -->
          <a @click="handleDelete(record)">{{ $t('menu.project.view.action.delete') }}</a>
        </span>
        <template v-for="(item, index) in deleteColumns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

      <!----------------------------------------------------- 维修进度报表 -->
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        v-if="optMaintenanceProgress"
        :pagination="paginationOpt"
        :scroll="{x: 1400}"
      >
        <span slot="state" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="$t(statusMap[text].text)"></a-badge>
        </span>
        <span slot="receipt_date" slot-scope="text">
          {{ text | format }}
        </span>
        <span slot="close_date" slot-scope="text">
          {{ text | format }}
        </span>
        <span slot="repair_plan" slot-scope="text">
          {{ text | formatRepairPlan }}
        </span>
        <span slot="action" slot-scope="text, record">
          <!-- 维修进度预览 progressReportRevice -->
          <a @click="progressReportRevice(record)">{{ $t('menu.review') }}</a>
          <!-- <a-divider type="vertical" /> -->
          <!-- 打印 -->
          <!-- <a @click="printProgress(record)">{{ $t('menu.project.view.action.print') }}</a> -->
          <a-divider type="vertical" />
          <!-- 维修进度报表 -->
          <a @click="progressReport(record)">{{ $t('permissionid.export.project') }}</a>
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

      <!----------------------------------------------------- 维修状态报表 -->
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        v-if="optMaintenanceStatus"
        :pagination="paginationOpt"
        :scroll="{x: 1400}"
      >
        <span slot="state" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="$t(statusMap[text].text)"></a-badge>
        </span>
        <span slot="receipt_date" slot-scope="text">
          {{ text | format }}
        </span>
        <span slot="close_date" slot-scope="text">
          {{ text | format }}
        </span>
        <span slot="repair_plan" slot-scope="text">
          {{ text | formatRepairPlan }}
        </span>
        <span slot="action" slot-scope="text, record">
          <!-- 维修状态报表 progressReportRevice -->
          <a @click="statusReportReview(record)">{{ $t('menu.review') }}</a>
          <a-divider type="vertical" />
          <!-- 维修状态报表 -->
          <a @click="statusReport(record)">{{ $t('permissionid.export.project') }}</a>
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

      <!----------------------------------------------------- 维修工时报表 -->
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        v-if="optMaintenanceWorkHour"
        :pagination="paginationOpt"
        :scroll="{x: 1400}"
      >
        <span slot="state" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="$t(statusMap[text].text)"></a-badge>
        </span>
        <span slot="receipt_date" slot-scope="text">
          {{ text | format }}
        </span>
        <span slot="close_date" slot-scope="text">
          {{ text | format }}
        </span>
        <span slot="repair_plan" slot-scope="text">
          {{ text | formatRepairPlan }}
        </span>
        <span slot="action" slot-scope="text, record">
          <!-- 维修工时报表 progressReportRevice -->
          <a @click="workingHoursReportReview(record)">{{ $t('menu.review') }}</a>
          <a-divider type="vertical" />
          <!-- 维修工时报表 -->
          <a @click="workingHoursReport(record)">{{ $t('permissionid.export.project') }}</a>
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

      <!----------------------------------------------------- 工程统计报表 -->
      <div v-if="optEngineeringStatistic" class="table-operator">
        <a-button type="primary" icon="plus" @click="handleExportProjectStatistic">{{ $t('permissionid.export.project') }}</a-button>
      </div>
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="enStatisticColumns"
        :data="loadData"
        v-if="optEngineeringStatistic"
        :pagination="paginationOpt"
        :scroll="{x: 1400}"
      >
        <span slot="state" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="$t(statusMap[text].text)"></a-badge>
        </span>
        <span slot="receipt_date" slot-scope="text">
          {{ text | format }}
        </span>
        <span slot="close_date" slot-scope="text">
          {{ text | format }}
        </span>
        <span slot="repair_plan" slot-scope="text">
          {{ text | formatRepairPlan }}
        </span>
        <template v-for="(item, index) in enStatisticColumns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>

      <!----------------------------------------------------- 工程导出 -->
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        v-if="optExport"
        :pagination="paginationOpt"
      >
        <span slot="state" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="$t(statusMap[text].text)"></a-badge>
        </span>
        <span slot="date" slot-scope="text">
          {{ text | format }}
        </span>
        <span slot="total" slot-scope="text">
          {{ text | formatContractTotal }}
        </span>
        <span slot="action" slot-scope="">
          <!-- 导出 -->
          {{ $t('permissionid.export.project') }}
        </span>
        <template v-for="(item, index) in columns" :slot="item.slotName">
          <span :key="index">{{ $t(item.slotName) }}</span>
        </template>
      </s-table>
    </a-card>
    <template v-if="visibleProgress">
      <div style="position:absolute;left: 0px; top: 0px;background-color:#efefef;width:90%;height:50px;">
        <div style="float:right;">
          <a-button key="back" style="height: 50px;background-color:#efefef;" @click="()=> { visibleProgress = false }">
            X
          </a-button>
        </div>
      </div>
      <div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:90%;height:80%;left: 0px;top: 48px;bottom: 0px;"></div>
    </template>
  </page-header-wrapper>
</template>

<script>
import LuckyExcel from 'luckyexcel'
// import axios from 'axios' projectProgressReportPdf
import XLSX from 'xlsx'
import moment from 'moment'
import { saveAs } from 'file-saver'
import { STable, Ellipsis } from '@/components'
import { getProjectList, deleteProject, formatTotal, editProject, newProject, projectProgressReport, projectStatusReport, projectWorktimeReport,
projectRepairPlan, projectState, downloadReport, exportProjectStatistic } from '@/api/project'
import EditProject from './modules/EditProject'
import { formatDateYMDZoneNull, getFlowNameByIndex, getFlowTotalcount } from '@/api/step'
import { deleteTmpReportFile } from '@/api/report'
import { getUserList } from '@/api/user'

const columns = [
  { // 工程编号
    slotName: 'menu.project.view.query.projectSerial',
    dataIndex: 'serial',
    scopedSlots: { customRender: 'serial', title: 'menu.project.view.query.projectSerial' },
    width: '10%'
  },
  { // 合同编号
    slotName: 'menu.project.view.query.contractSerial',
    dataIndex: 'contract_serial',
    scopedSlots: { customRender: 'contract_serial', title: 'menu.project.view.query.contractSerial' },
    width: '10%'
  },
  { // 最终用户
    slotName: 'menu.customer.new.finallyUser',
    dataIndex: 'finally_user',
    scopedSlots: { customRender: 'finally_user', title: 'menu.customer.new.finallyUser' },
    width: '20%'
  },
  { // 销售
    slotName: 'menu.customer.sales',
    dataIndex: 'sales_name',
    scopedSlots: { customRender: 'sales_name', title: 'menu.customer.sales' },
    width: '10%'
  },
  { // 维修车间
    slotName: 'menu.project.detail.repairShop',
    dataIndex: 'repair_plan',
    scopedSlots: { customRender: 'repair_plan', title: 'menu.project.detail.repairShop' },
    width: '10%'
  },
  { // 当前状态
    slotName: 'menu.project.current.state',
    dataIndex: 'state',
    scopedSlots: { customRender: 'state', title: 'menu.project.current.state' },
    width: '10%'
  },
  { // 阀门数量
    slotName: 'menu.project.new.valveNumber',
    dataIndex: 'number',
    scopedSlots: { customRender: 'number', title: 'menu.project.new.valveNumber' },
    width: '8%'
  },
  { // 收货日期
    slotName: 'app.flow.repair.receipt.date',
    dataIndex: 'receipt_date',
    scopedSlots: { customRender: 'receipt_date', title: 'app.flow.repair.receipt.date' },
    width: '10%'
  },
  { // 完工日期
    slotName: 'menu.project.detail.closeDate',
    dataIndex: 'close_date',
    scopedSlots: { customRender: 'close_date', title: 'menu.project.detail.closeDate' },
    width: '10%'
  },
  {
    slotName: 'menu.project.view.table.column.action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action', title: 'menu.project.view.table.column.action' },
    width: '10%',
    fixed: 'right'
  }
]

const deleteColumns = [
  { // 工程编号
    slotName: 'menu.project.view.query.projectSerial',
    dataIndex: 'serial',
    scopedSlots: { customRender: 'serial', title: 'menu.project.view.query.projectSerial' },
    width: '10%'
  },
  { // 合同编号
    slotName: 'menu.project.view.query.contractSerial',
    dataIndex: 'contract_serial',
    scopedSlots: { customRender: 'contract_serial', title: 'menu.project.view.query.contractSerial' },
    width: '10%'
  },
  { // 最终用户
    slotName: 'menu.customer.new.finallyUser',
    dataIndex: 'finally_user',
    scopedSlots: { customRender: 'finally_user', title: 'menu.customer.new.finallyUser' },
    width: '20%'
  },
  { // 销售
    slotName: 'menu.customer.sales',
    dataIndex: 'sales_name',
    scopedSlots: { customRender: 'sales_name', title: 'menu.customer.sales' },
    width: '10%'
  },
  { // 维修车间
    slotName: 'menu.project.detail.repairShop',
    dataIndex: 'repair_plan',
    scopedSlots: { customRender: 'repair_plan', title: 'menu.project.detail.repairShop' },
    width: '10%'
  },
  { // 当前状态
    slotName: 'menu.project.current.state',
    dataIndex: 'state',
    scopedSlots: { customRender: 'state', title: 'menu.project.current.state' },
    width: '10%'
  },
  { // 阀门数量
    slotName: 'menu.project.new.valveNumber',
    dataIndex: 'number',
    scopedSlots: { customRender: 'number', title: 'menu.project.new.valveNumber' },
    width: '8%'
  },
  { // 收货日期
    slotName: 'app.flow.repair.receipt.date',
    dataIndex: 'receipt_date',
    scopedSlots: { customRender: 'receipt_date', title: 'app.flow.repair.receipt.date' },
    width: '10%'
  },
  { // 完工日期
    slotName: 'menu.project.detail.closeDate',
    dataIndex: 'close_date',
    scopedSlots: { customRender: 'close_date', title: 'menu.project.detail.closeDate' },
    width: '10%'
  },
  {
    slotName: 'menu.project.view.table.column.action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action', title: 'menu.project.view.table.column.action' },
    width: '10%',
    fixed: 'right'
  }
]

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'warning',
    text: 'menu.project.view.table.column.state.item1'
  },
  2: {
    status: 'success',
    text: 'menu.project.view.table.column.state.item2'
  },
  3: {
    status: 'error',
    text: 'menu.project.view.table.column.state.item3'
  }
}

const enStatisticSelectColumns = [
  { // 工程编号
    slotName: 'menu.project.view.query.projectSerial',
    dataIndex: 'serial',
    scopedSlots: { customRender: 'serial', title: 'menu.project.view.query.projectSerial' },
    width: '10%'
  },
  { // 合同编号
    slotName: 'menu.project.view.query.contractSerial',
    dataIndex: 'contract_serial',
    scopedSlots: { customRender: 'contract_serial', title: 'menu.project.view.query.contractSerial' },
    width: '10%',
    visible: false
  },
  { // 最终用户
    slotName: 'menu.customer.new.finallyUser',
    dataIndex: 'finally_user',
    scopedSlots: { customRender: 'finally_user', title: 'menu.customer.new.finallyUser' },
    width: '20%',
    visible: false
  },
  { // 销售
    slotName: 'menu.customer.sales',
    dataIndex: 'sales_name',
    scopedSlots: { customRender: 'sales_name', title: 'menu.customer.sales' },
    width: '10%'
  },
  { // 维修车间
    slotName: 'menu.project.detail.repairShop',
    dataIndex: 'repair_plan',
    scopedSlots: { customRender: 'repair_plan', title: 'menu.project.detail.repairShop' },
    width: '10%'
  },
  { // 当前状态
    slotName: 'menu.project.current.state',
    dataIndex: 'state',
    scopedSlots: { customRender: 'state', title: 'menu.project.current.state' },
    width: '10%'
  },
  { // 阀门数量
    slotName: 'menu.project.new.valveNumber',
    dataIndex: 'number',
    scopedSlots: { customRender: 'number', title: 'menu.project.new.valveNumber' },
    width: '8%'
  },
  { // 收货日期
    slotName: 'app.flow.repair.receipt.date',
    dataIndex: 'receipt_date',
    scopedSlots: { customRender: 'receipt_date', title: 'app.flow.repair.receipt.date' },
    width: '10%'
  },
  { // 完工日期
    slotName: 'menu.project.detail.closeDate',
    dataIndex: 'close_date',
    scopedSlots: { customRender: 'close_date', title: 'menu.project.detail.closeDate' },
    width: '10%'
  }
]

const enStatisticColumns = [
  { // 工程编号
    slotName: 'menu.project.view.query.projectSerial',
    dataIndex: 'serial',
    scopedSlots: { customRender: 'serial', title: 'menu.project.view.query.projectSerial' },
    width: '10%'
  },
  { // 合同编号
    slotName: 'menu.project.view.query.contractSerial',
    dataIndex: 'contract_serial',
    scopedSlots: { customRender: 'contract_serial', title: 'menu.project.view.query.contractSerial' },
    width: '10%',
    visible: false
  },
  { // 最终用户
    slotName: 'menu.customer.new.finallyUser',
    dataIndex: 'finally_user',
    scopedSlots: { customRender: 'finally_user', title: 'menu.customer.new.finallyUser' },
    width: '20%',
    visible: false
  },
  { // 销售
    slotName: 'menu.customer.sales',
    dataIndex: 'sales_name',
    scopedSlots: { customRender: 'sales_name', title: 'menu.customer.sales' },
    width: '10%'
  },
  { // 维修车间
    slotName: 'menu.project.detail.repairShop',
    dataIndex: 'repair_plan',
    scopedSlots: { customRender: 'repair_plan', title: 'menu.project.detail.repairShop' },
    width: '10%'
  },
  { // 当前状态
    slotName: 'menu.project.current.state',
    dataIndex: 'state',
    scopedSlots: { customRender: 'state', title: 'menu.project.current.state' },
    width: '10%'
  },
  { // 阀门数量
    slotName: 'menu.project.new.valveNumber',
    dataIndex: 'number',
    scopedSlots: { customRender: 'number', title: 'menu.project.new.valveNumber' },
    width: '8%'
  },
  { // 收货日期
    slotName: 'app.flow.repair.receipt.date',
    dataIndex: 'receipt_date',
    scopedSlots: { customRender: 'receipt_date', title: 'app.flow.repair.receipt.date' },
    width: '10%'
  },
  { // 完工日期
    slotName: 'menu.project.detail.closeDate',
    dataIndex: 'close_date',
    scopedSlots: { customRender: 'close_date', title: 'menu.project.detail.closeDate' },
    width: '10%'
  }
]

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    EditProject,
    XLSX,
    LuckyExcel
  },
  mounted () {
    this.optOpen = false
    this.optDelete = false
    this.optMaintenanceProgress = false
    this.optMaintenanceStatus = false
    this.optMaintenanceWorkHour = false
    this.optEngineeringStatistic = false
    this.optExport = false

    // 打开项目
    if (this.$route.meta.opt === 'open') {
      this.optOpen = true
    }
    // 删除项目
    if (this.$route.meta.opt === 'delete') {
      this.optDelete = true
    }
    // 维修进度报表
    if (this.$route.meta.opt === 'MaintenanceProgress') {
      this.optMaintenanceProgress = true
    }
    // 维修状态报表
    if (this.$route.meta.opt === 'MaintenanceStatus') {
      this.optMaintenanceStatus = true
    }
    // 维修工时报表
    if (this.$route.meta.opt === 'MaintenanceWorkHour') {
      this.optMaintenanceWorkHour = true
    }
    // 工程统计
    if (this.$route.meta.opt === 'EngineeringStatistic') {
      this.optEngineeringStatistic = true
    }
    // 导出
    if (this.$route.meta.opt === 'export') {
      this.optExport = true
    }

    // 查找所有销售
    getUserList({ pageSize: 99999999, pageNo: 1, position: '1' }).then(res => {
      if (res.result.data.length > 0) {
        res.result.data.forEach(e => {
          this.salesList.push({
            key: e.id,
            label: e.user_name
          })
        })
      }
    })

    this.enStatisticColumns.length = 0
    columns.forEach(e => {
      if (e.dataIndex !== 'action') {
        this.columnsSelectDefault.push(e.slotName)
        this.enStatisticColumns.push(e)
        this.currentSelectColumns.push(e.dataIndex)
      }
    })

    // eslint-disable-next-line no-undef
    // $(function () {
    //         // eslint-disable-next-line no-undef
    //         luckysheet.create({
    //           container: 'luckysheet',
    //           lang: 'zh',
    //           showtoolbar: false,
    //           showsheetbar: false,
    //           showtoolbarConfig: {
    //             print: true
    //           }
    //         })
    //       })
  },
  data () {
    return {
      // create model
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 销售列表
      salesList: [],
      // 预览工程进度
      visibleProgress: false,
      // 预览工程头数据
      progressHeadData: {},
      progressData: [],
      // excel数据
      excelData: null,
      // 当前选中列
      currentSelectColumns: [],
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)

        // 销售查询条件id换名字
        var querySalesname = ''
        if (requestParameters.sales_name) {
          this.salesList.forEach(e => {
            if (e.key === requestParameters.sales_name) {
              querySalesname = e.label
            }
          })
        }
        if (querySalesname.length > 1) {
          requestParameters.sales_name = querySalesname
        }

        return getProjectList(requestParameters)
          .then(res => {
            console.log(res.result, 8888888888888)
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
      columns: columns,
      enStatisticColumns: enStatisticColumns,
      enStatisticSelectColumns: enStatisticSelectColumns,
      deleteColumns: deleteColumns,
      statusMap: statusMap,
      optDelete: false,
      optOpen: false,
      optExport: false,
      optMaintenanceProgress: false,
      optMaintenanceStatus: false,
      optMaintenanceWorkHour: false,
      optEngineeringStatistic: false,
      columnsSelectDefault: []
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    },
    format (val) {
      return formatDateYMDZoneNull(val, '+00:00')
    },
    formatContractTotal (val) {
      return formatTotal(val)
    },
    formatRepairPlan (val) {
      switch (val) {
      case '1':
          return '成都车间'
      case '2':
          return '榆林车间'
      case '3':
        return '用户现场'
      case '4':
        return '在线维修'
      }
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
        type: 'radio'
      }
    }
  },
  methods: {
    projectRepairPlan,
    projectState,
    getFlowNameByIndex,
    getFlowTotalcount,
    downloadReport,
    exportProjectStatistic,
    handleAdd () {
      this.mdl = null
      this.$refs.createModal.createProjectSerial()
      // this.$refs.createModal.createContractSerial()
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
    columsSelecthandleChange (val) {
      const columsList = val
      this.currentSelectColumns.length = 0
      if (columsList.length <= 0) { return }
      this.enStatisticColumns.length = 0
      columsList.forEach(newCol => {
        this.columns.forEach(orgCol => {
          if (newCol === orgCol.slotName) {
            this.enStatisticColumns.push(orgCol)
            this.currentSelectColumns.push(orgCol.dataIndex)
          }
        })
      })
    },
    handleDelete (record) {
      const letThis = this
      this.$confirm({
        title: this.$t('menu.project.view.action.delete'),
        content: this.$t('menu.project.delete.note.1') + record.serial + this.$t('menu.project.delete.note.2'),
        okText: this.$t('app.button.confirm'),
        cancelText: this.$t('app.button.cancel'),
        onOk () {
          deleteProject(record).then(res => {
              // 刷新表格
              letThis.$refs.table.refresh()
              letThis.$message.info(this.$t('menu.project.delete.successful'))
          })
        }
      })
    },
    handleEdit (record) {
      getProjectList({ id: record.id }).then(res => {
        if (res.result.data && res.result.data.length > 0) {
          this.$router.push({ name: 'editProject', params: res.result.data[0] })
          // this.$refs.createModal.editProject(res.result.data[0])
        }
      })
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          if (values.id) {
            // 修改 e.g.
            editProject(values).then(res => {
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info(this.$t('menu.user.manager.new.modifySuccessful'))
            })
          } else {
            // 新增
            values.create_user_id = this.$store.state.user.info.id
            newProject(values).then(res => {
              // 刷新表格
              this.$refs.table.refresh()
              this.$message.info(this.$t('menu.user.manager.new.newSuccessful'))

              // 重置表单数据
              form.resetFields()
            })
            this.confirmLoading = false
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    handleDetail (record) {
      getProjectList({ id: record.id })
      .then(res => {
        this.$store.commit('SET_DETAIL_DATA', res.result)
        this.$router.push({ path: '/project/project-detail' })
      })
    },
    handleDescription (record) {
      // 当前分页参数入栈，并设置分页为pageNum: 0  pageSize: 10
      this.pageDataStack.pushPageData(this.$store, true)

      this.$store.commit('SET_DETAIL_DATA', record)
      this.$router.push({ name: 'ProjectDescription' })
    },
    progressReport (record) {
      projectProgressReport(record).then(res => {
        const filename = res.replace('/api/report/download/', '')
        saveAs(res, filename)
        deleteTmpReportFile(filename)
        this.loading = false
        this.$message.info('报告生成完毕')
      })
    },
    progressReportRevice (record) {
      projectProgressReport(record).then(res => {
        const filename = res.replace('/api/report/download/', '')
        LuckyExcel.transformExcelToLuckyByUrl(res, filename, (exportJson) => {
          if (exportJson.sheets === null || exportJson.sheets.length === 0) {
            this.$message.warning('无法读取excel文件的内容，目前不支持xls文件，仅支持xlsx类型!')
            this.$nextTick(() => {
              window.luckysheet.create({
                container: 'luckysheet', // 设定DOM容器的id
                lang: 'zh', // 设定表格语言
                showinfobar: false
              })
            })
            return
          }
          this.visibleProgress = true
          window.luckysheet.destroy()
          this.$nextTick(() => {
            window.luckysheet.create({
              container: 'luckysheet', // luckysheet is the container id
              lang: 'zh', // 设定表格语言
              row: 100, // 默认500行
              showtoolbar: false,
              showinfobar: false,
              data: exportJson.sheets,
              title: exportJson.info.name
              // userInfo: exportJson.info.name.creator,
            })
          })
        })
      })
    },
    printProgress (record) {
      // var iframe = document.createElement('iframe')
      // iframe.style.border = '0px'
      // iframe.style.position = 'absolute'
      // iframe.style.width = '0px'
      // iframe.style.height = '0px'
      // iframe.style.right = '0px'
      // iframe.style.top = '0px'
      // iframe.setAttribute('src', '/api/report/download/2022032801-云南祥丰石化有限公司-PPR_2022_04_20_22_24_40.pdf')
      // iframe.onload = () => {
      //   debugger
      //     iframe.contentWindow.print()
      //     // setTimeout(() => {
      //     //     document.body.removeChild(iframe);
      //     // });
      // }
      // document.body.appendChild(iframe)

      // downloadReport(url.replace('/api', '')).then(res => {
      downloadReport('/report/download/2022032801-云南祥丰石化有限公司-PPR_2022_04_20_22_24_40.pdf').then(res => {
        const content = res
        this.xlxsUrl = window.URL.createObjectURL(
          new Blob([content], { type: 'application/pdf' })
        )
        window.open(this.xlxsUrl)

        // var date = new Date().getTime()
        // var ifr = document.createElement('iframe')
        // ifr.style.frameborder = 'no'
        // ifr.style.display = 'none'
        // ifr.style.pageBreakBefore = 'always'
        // ifr.setAttribute('id', 'printXls' + date)
        // ifr.setAttribute('name', 'printXls' + date)
        // ifr.src = this.xlxsUrl

        // document.body.appendChild(ifr)
        // 打印
        // var ordonnance = document.getElementById('printXls' + date).contentWindow
        // setTimeout(() => {
        //  ordonnance.print()
        // }, 100)
        // window.URL.revokeObjectURL(ifr.src) // 释放URL 对象
      })
      // projectProgressReportPdf(record).then(url => {
      //   // /api/report/download/2022030102-天津钢铁-PSR_2022_03_21_21_47_35.xlsx
      // })
    },
    statusReportReview (record) {
      projectStatusReport(record).then(res => {
        const filename = res.replace('/api/report/download/', '')
        LuckyExcel.transformExcelToLuckyByUrl(res, filename, (exportJson) => {
          if (exportJson.sheets === null || exportJson.sheets.length === 0) {
            this.$message.warning('无法读取excel文件的内容，目前不支持xls文件，仅支持xlsx类型!')
            this.$nextTick(() => {
              window.luckysheet.create({
                container: 'luckysheet', // 设定DOM容器的id
                lang: 'zh', // 设定表格语言
                showinfobar: false
              })
            })
            return
          }
          this.visibleProgress = true
          window.luckysheet.destroy()
          this.$nextTick(() => {
            window.luckysheet.create({
              container: 'luckysheet', // luckysheet is the container id
              lang: 'zh', // 设定表格语言
              row: 100, // 默认500行
              showtoolbar: false,
              showinfobar: false,
              data: exportJson.sheets,
              title: exportJson.info.name
              // userInfo: exportJson.info.name.creator,
            })
          })
        })
      })
    },
    statusReport (record) {
      projectStatusReport(record).then(res => {
        const filename = res.replace('/api/report/download/', '')
        saveAs(res, filename)
        deleteTmpReportFile(filename)
        this.loading = false
        this.$message.info('报告生成完毕')
      })
    },
    workingHoursReportReview (record) {
      projectWorktimeReport(record).then(res => {
        const filename = res.replace('/api/report/download/', '')
        LuckyExcel.transformExcelToLuckyByUrl(res, filename, (exportJson) => {
          if (exportJson.sheets === null || exportJson.sheets.length === 0) {
            this.$message.warning('无法读取excel文件的内容，目前不支持xls文件，仅支持xlsx类型!')
            this.$nextTick(() => {
              window.luckysheet.create({
                container: 'luckysheet', // 设定DOM容器的id
                lang: 'zh', // 设定表格语言
                showinfobar: false
              })
            })
            return
          }
          this.visibleProgress = true
          window.luckysheet.destroy()
          this.$nextTick(() => {
            window.luckysheet.create({
              container: 'luckysheet', // luckysheet is the container id
              lang: 'zh', // 设定表格语言
              row: 100, // 默认500行
              showtoolbar: false,
              showinfobar: false,
              data: exportJson.sheets,
              title: exportJson.info.name
              // userInfo: exportJson.info.name.creator,
            })
          })
        })
      })
    },
    workingHoursReport (record) {
      projectWorktimeReport(record).then(res => {
        const filename = res.replace('/api/report/download/', '')
        saveAs(res, filename)
        deleteTmpReportFile(filename)
        this.loading = false
        this.$message.info('报告生成完毕')
      })
    },
    handleExportProjectStatistic () {
      var requestParameters = Object.assign({}, this.queryParam)
      requestParameters.queryFieldList = this.currentSelectColumns
      console.log(requestParameters)
      exportProjectStatistic(requestParameters).then(res => {
        const filename = res.replace('/api/report/download/', '')
        saveAs(res, filename)
        deleteTmpReportFile(filename)
        this.loading = false
        this.$message.info('导出工程统计完毕')
      })
    }
  }
}
</script>
<style sceped>

.excelViewTable {
    table-layout: fixed !important;
    width: 100% !important;
    border-collapse:collapse;
    border:none;
    font-size:0.23rem;
}

.excelViewTd {
    width:1px;
    white-space:nowrap;
    word-break:keep-all;
    border:solid #676767 1px;
    text-align:center;
    white-space:pre-line;
    word-break:break-all !important;
    word-wrap:break-word !important;
    display:table-cell;
    vertical-align:middle !important;
    white-space: normal !important;
    height:auto;
    vertical-align:text-top;
    padding:2px 2px 0 2px;
    display: table-cell;
}
</style>
