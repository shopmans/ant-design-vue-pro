// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout, AndroidLayout } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMapAndroid = [
  {
    path: '/',
    name: 'index',
    component: AndroidLayout,
    meta: { title: 'menu.home' },
    children: [
      // 工单
      {
        path: '/step',
        name: 'workorder',
        redirect: '/step/steplist/:pageNo([1-9]\\d*)?',
        component: RouteView,
        meta: { title: 'menu.workOrder', keepAlive: true, icon: 'snippets', permission: [ 'dashboard', 'repairWorkOrder' ] },
        children: [
          {
            path: '/step/steplist/:pageNo([1-9]\\d*)?',
            name: 'stepList',
            component: () => import('@/views/step/repair/StepList'),
            meta: { title: 'permissionid.repairWorkOrder', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/newstep',
            name: 'newStep',
            hidden: true,
            component: () => import('@/views/step/repair/start/StepForm'),
            meta: { title: '新建维修工单', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/start',
            name: 'editStep',
            hidden: true,
            component: () => import('@/views/step/repair/start/EditStartForm'),
            meta: { title: '', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/start-detail',
            name: 'detailStep',
            hidden: true,
            component: () => import('@/views/step/repair/start/StepDetail'),
            meta: { title: 'menu.workOrder.repair.workOrderDetail', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/upload/*',
            name: 'getUpload',
            hidden: true
          },
           // ================================== 移动端显示工单详细 ==============================
           {
            path: '/step/mobilestepdetail/:flowID',
            name: 'mobilestepdetail',
            hidden: true,
            component: () => import('@/views/step/modules/StepAllDetail'),
            meta: { title: '工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== Receipt ==============================
          {
            path: '/step/Receipt',
            name: 'editReceiptStep',
            hidden: true,
            component: () => import('@/views/step/repair/Receipt/EditReceiptForm'),
            meta: { title: '收货', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/receipt-detail',
            name: 'detailReceiptStep',
            hidden: true,
            component: () => import('@/views/step/repair/Receipt/ReceiptDetail'),
            meta: { title: '收货工单详情', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== IntoFactoryCheck ==============================
          {
            path: '/step/IntoFactoryCheck',
            name: 'intoFactoryCheck',
            hidden: true,
            component: () => import('@/views/step/repair/IntoFactoryCheck/EditIntoFactoryCheckForm'),
            meta: { title: '入厂检查', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/IntoFactoryCheck-detail',
            name: 'detailIntoFactoryCheck',
            hidden: true,
            component: () => import('@/views/step/repair/IntoFactoryCheck/IntoFactoryCheckDetail'),
            meta: { title: '入厂检查工单详情', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== PreRepairDiag ==============================
          {
            path: '/step/PreRepairDiag',
            name: 'preRepairDiag',
            hidden: true,
            component: () => import('@/views/step/repair/PreRepairDiag/EditPreRepairDiag'),
            meta: { title: '维修前诊断', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/PreRepairDiag-detail',
            name: 'preRepairDiagInfo',
            hidden: true,
            component: () => import('@/views/step/repair/PreRepairDiag/PreRepairDiagDetail'),
            meta: { title: '维修前测试详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== PreRepairTest ==============================
          {
            path: '/step/PreRepairTest',
            name: 'preRepairTest',
            hidden: true,
            component: () => import('@/views/step/repair/PreRepairTest/EditPreRepairTest'),
            meta: { title: '维修前测试', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/PreRepairTest-detail',
            name: 'preRepairTestDetail',
            hidden: true,
            component: () => import('@/views/step/repair/PreRepairTest/PreRepairTestDetail'),
            meta: { title: '维修前测试详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== TearDown ==============================
          {
            path: '/step/TearDown',
            name: 'tearDown',
            hidden: true,
            component: () => import('@/views/step/repair/TearDown/EditTearDown'),
            meta: { title: '拆解', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/TearDown-detail',
            name: 'tearDownDetail',
            hidden: true,
            component: () => import('@/views/step/repair/TearDown/TearDownDetail'),
            meta: { title: '拆解工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== Assessment ==============================
          {
            path: '/step/Assessment',
            name: 'assessment',
            hidden: true,
            component: () => import('@/views/step/repair/Assessment/EditAssessment'),
            meta: { title: '评估', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/Assessment-detail',
            name: 'AssessmentDetail',
            hidden: true,
            component: () => import('@/views/step/repair/Assessment/AssessmentDetail'),
            meta: { title: '评估工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== Repair ==============================
          {
            path: '/step/Repair',
            name: 'repair',
            hidden: true,
            component: () => import('@/views/step/repair/Repair/EditRepair'),
            meta: { title: '修理', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/Repair-detail',
            name: 'RepairDetail',
            hidden: true,
            component: () => import('@/views/step/repair/Repair/RepairDetail'),
            meta: { title: '维修工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== Assemble ==============================
          {
            path: '/step/Assemble',
            name: 'assemble',
            hidden: true,
            component: () => import('@/views/step/repair/Assemble/EditAssemble'),
            meta: { title: '组装', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/Assemble-detail',
            name: 'assembleDetail',
            hidden: true,
            component: () => import('@/views/step/repair/Assemble/AssembleDetail'),
            meta: { title: '组装', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== InstallActuator ==============================
          {
            path: '/step/InstallActuator',
            name: 'installActuator',
            hidden: true,
            component: () => import('@/views/step/repair/InstallActuator/EditInstallActuator'),
            meta: { title: '安装执行机构', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/InstallActuator-detail',
            name: 'installActuatorDetail',
            hidden: true,
            component: () => import('@/views/step/repair/InstallActuator/InstallActuatorDetail'),
            meta: { title: '安装执行机构工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== LeakPressureTest ==============================
          {
            path: '/step/LeakPressureTest',
            name: 'leakPressureTest',
            hidden: true,
            component: () => import('@/views/step/repair/LeakPressureTest/EditLeakPressureTest'),
            meta: { title: '测漏试压', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/LeakPressureTest-detail',
            name: 'leakPressureTestDetail',
            hidden: true,
            component: () => import('@/views/step/repair/LeakPressureTest/LeakPressureTestDetail'),
            meta: { title: '测漏试压工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== InstallAccessory ==============================
          {
            path: '/step/InstallSlave',
            name: 'installSlave',
            hidden: true,
            component: () => import('@/views/step/repair/InstallSlave/EditInstallSlave'),
            meta: { title: '安装附件', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/InstallSlave-detail',
            name: 'installSlaveDetail',
            hidden: true,
            component: () => import('@/views/step/repair/InstallSlave/InstallSlaveDetail'),
            meta: { title: '安装附件工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== Adjust ==============================
          {
            path: '/step/Adjust',
            name: 'adjust',
            hidden: true,
            component: () => import('@/views/step/repair/Adjust/EditAdjust'),
            meta: { title: '调校', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/Adjust-detail',
            name: 'adjustDetail',
            hidden: true,
            component: () => import('@/views/step/repair/Adjust/AdjustDetail'),
            meta: { title: '调校', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== AfterRepairDiag ==============================
          {
            path: '/step/AfterRepairDiag',
            name: 'afterRepairDiag',
            hidden: true,
            component: () => import('@/views/step/repair/AfterRepairDiag/EditAfterRepairDiag'),
            meta: { title: '维修后诊断', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/AfterRepairDiag-detail',
            name: 'afterRepairDiagInfo',
            hidden: true,
            component: () => import('@/views/step/repair/AfterRepairDiag/AfterRepairDiagDetail'),
            meta: { title: '维修后测试详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== RepairConfirm ===========================
          {
            path: '/step/RepairConfirm',
            name: 'repairConfirm',
            hidden: true,
            component: () => import('@/views/step/repair/RepairConfirm/EditRepairConfirm'),
            meta: { title: '维修确认', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/RepairConfirm-detail',
            name: 'repairConfirmDetail',
            hidden: true,
            component: () => import('@/views/step/repair/RepairConfirm/RepairConfirmDetail'),
            meta: { title: '维修确认工单', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== FinalCheck ==============================
          {
            path: '/step/FinalCheck',
            name: 'FinalCheck',
            hidden: true,
            component: () => import('@/views/step/repair/FinalCheck/EditFinalCheck'),
            meta: { title: '最终检查', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/FinalCheck-detail',
            name: 'finalCheckDetail',
            hidden: true,
            component: () => import('@/views/step/repair/FinalCheck/FinalCheckDetail'),
            meta: { title: '最终检查工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
           // ================================== PackingDelivery ==============================
           {
            path: '/step/PackingDelivery',
            name: 'PackingDelivery',
            hidden: true,
            component: () => import('@/views/step/repair/PackingDelivery/EditPackingDelivery'),
            meta: { title: '发货', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/PackingDelivery-detail',
            name: 'PackingDeliveryDetail',
            hidden: true,
            component: () => import('@/views/step/repair/PackingDelivery/PackingDeliveryDetail'),
            meta: { title: '发货工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== 定位器-LocatorIntoFactoryCheck ==============================
          {
            path: '/step/LocatorIntoFactoryCheck',
            name: 'locatorIntoFactoryCheck',
            hidden: true,
            component: () => import('@/views/step/locator/IntoFactoryCheck/EditIntoFactoryCheck'),
            meta: { title: '定位器入厂检查', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/LocatorIntoFactoryCheck-detail',
            name: 'locatorIntoFactoryCheck-detail',
            hidden: true,
            component: () => import('@/views/step/locator/IntoFactoryCheck/IntoFactoryCheckDetail'),
            meta: { title: '定位器入厂检查工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== 定位器-LocatorPreRepairTest ==============================
          {
            path: '/step/LocatorPreRepairTest',
            name: 'locatorPreRepairTest',
            hidden: true,
            component: () => import('@/views/step/locator/PreRepairTest/EditPreRepairTest'),
            meta: { title: '定位器维修前测试', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/LocatorPreRepairTest-detail',
            name: 'locatorPreRepairTest-detail',
            hidden: true,
            component: () => import('@/views/step/locator/PreRepairTest/PreRepairTestDetail'),
            meta: { title: '定位器维修前测试工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== 定位器-LocatorAssessment ==============================
          {
            path: '/step/LocatorAssessment',
            name: 'locatorAssessment',
            hidden: true,
            component: () => import('@/views/step/locator/Assessment/EditAssessment'),
            meta: { title: '定位器评估', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/LocatorAssessment-detail',
            name: 'locatorRepair-detail',
            hidden: true,
            component: () => import('@/views/step/locator/Assessment/AssessmentDetail'),
            meta: { title: '定位器评估工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== 定位器-Repair ==============================
          {
            path: '/step/LocatorRepair',
            name: 'locatorRepair',
            hidden: true,
            component: () => import('@/views/step/locator/Repair/EditRepair'),
            meta: { title: '定位器维修', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/LocatorRepair-detail',
            name: 'locatorRepair-detail',
            hidden: true,
            component: () => import('@/views/step/locator/Repair/RepairDetail'),
            meta: { title: '定位器维修工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== 定位器-Adjust ==============================
          {
            path: '/step/LocatorAdjust',
            name: 'locatorAdjust',
            hidden: true,
            component: () => import('@/views/step/locator/Adjust/EditAdjust'),
            meta: { title: '定位器调校', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/LocatorAdjust-detail',
            name: 'locatorAdjust-detail',
            hidden: true,
            component: () => import('@/views/step/locator/Adjust/AdjustDetail'),
            meta: { title: '定位器调校工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          }
        ]
      },
      // 用户管理
      // ================================== User ==============================
      {
        path: '/user',
        name: 'User',
        component: RouteView,
        meta: { title: 'menu.user', keepAlive: true, icon: 'user', permission: [ 'dashboard' ] },
        redirect: '/user/user-list',
        children: [
          {
            path: '/user/user-list',
            name: 'userList',
            component: () => import('@/views/user/UserList'),
            meta: { title: 'permissionid.user', keepAlive: false, permission: [ 'dashboard' ] }
          }
        ]
      },
      // 客户管理
      // ================================== User ==============================
      {
        path: '/customer',
        name: 'customer',
        component: RouteView,
        meta: { title: 'menu.customer', keepAlive: true, icon: 'idcard', permission: [ 'dashboard' ] },
        redirect: '/customer/customer-list',
        children: [
          {
            path: '/customer/customer-list',
            name: 'customerList',
            component: () => import('@/views/customer/CustomerList'),
            meta: { title: 'permissionid.customer', keepAlive: false, permission: [ 'dashboard' ] }
          }
        ]
      },
      // 权限管理
      // ================================== Role ==============================
      {
        path: '/permission',
        name: 'permission',
        component: RouteView,
        meta: { title: 'menu.permission', keepAlive: true, icon: 'unlock', permission: [ 'dashboard' ] },
        redirect: '/role/role-list',
        children: [
          {
            path: '/role/role-list',
            name: 'roleList',
            component: () => import('@/views/permission/RoleList'),
            meta: { title: 'permissionid.permission', keepAlive: false, permission: [ 'dashboard' ] }
          }
        ]
      }
      // dashboard
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   redirect: '/dashboard/workplace',
      //   component: RouteView,
      //   meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
      //   children: [
      //     {
      //       path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
      //       name: 'Analysis',
      //       component: () => import('@/views/dashboard/Analysis'),
      //       meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: [ 'dashboard' ] }
      //     },
      //     // 外部链接
      //     {
      //       path: 'https://www.baidu.com/',
      //       name: 'Monitor',
      //       meta: { title: 'menu.dashboard.monitor', target: '_blank' }
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'Workplace',
      //       component: () => import('@/views/dashboard/Workplace'),
      //       meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: [ 'dashboard' ] }
      //     }
      //   ]
      // },

      // // forms
      // {
      //   path: '/form',
      //   redirect: '/form/base-form',
      //   component: RouteView,
      //   meta: { title: '表单页', icon: 'form', permission: [ 'form' ] },
      //   children: [
      //     {
      //       path: '/form/base-form',
      //       name: 'BaseForm',
      //       component: () => import('@/views/form/basicForm'),
      //       meta: { title: '基础表单', keepAlive: true, permission: [ 'form' ] }
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'StepForm',
      //       component: () => import('@/views/form/stepForm/StepForm'),
      //       meta: { title: '分步表单', keepAlive: true, permission: [ 'form' ] }
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'AdvanceForm',
      //       component: () => import('@/views/form/advancedForm/AdvancedForm'),
      //       meta: { title: '高级表单', keepAlive: true, permission: [ 'form' ] }
      //     }
      //   ]
      // },

      // // list
      // {
      //   path: '/list',
      //   name: 'list',
      //   component: RouteView,
      //   redirect: '/list/table-list',
      //   meta: { title: '列表页', icon: 'table', permission: [ 'table' ] },
      //   children: [
      //     {
      //       path: '/list/table-list/:pageNo([1-9]\\d*)?',
      //       name: 'TableListWrapper',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('@/views/list/TableList'),
      //       meta: { title: '查询表格', keepAlive: true, permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'BasicList',
      //       component: () => import('@/views/list/BasicList'),
      //       meta: { title: '标准列表', keepAlive: true, permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/card',
      //       name: 'CardList',
      //       component: () => import('@/views/list/CardList'),
      //       meta: { title: '卡片列表', keepAlive: true, permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'SearchList',
      //       component: () => import('@/views/list/search/SearchLayout'),
      //       redirect: '/list/search/article',
      //       meta: { title: '搜索列表', keepAlive: true, permission: [ 'table' ] },
      //       children: [
      //         {
      //           path: '/list/search/article',
      //           name: 'SearchArticles',
      //           component: () => import('../views/list/search/Article'),
      //           meta: { title: '搜索列表（文章）', permission: [ 'table' ] }
      //         },
      //         {
      //           path: '/list/search/project',
      //           name: 'SearchProjects',
      //           component: () => import('../views/list/search/Projects'),
      //           meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
      //         },
      //         {
      //           path: '/list/search/application',
      //           name: 'SearchApplications',
      //           component: () => import('../views/list/search/Applications'),
      //           meta: { title: '搜索列表（应用）', permission: [ 'table' ] }
      //         }
      //       ]
      //     }
      //   ]
      // },

      // // profile
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   component: RouteView,
      //   redirect: '/profile/basic',
      //   meta: { title: '详情页', icon: 'profile', permission: [ 'profile' ] },
      //   children: [
      //     {
      //       path: '/profile/basic',
      //       name: 'ProfileBasic',
      //       component: () => import('@/views/profile/basic'),
      //       meta: { title: '基础详情页', permission: [ 'profile' ] }
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'ProfileAdvanced',
      //       component: () => import('@/views/profile/advanced/Advanced'),
      //       meta: { title: '高级详情页', permission: [ 'profile' ] }
      //     }
      //   ]
      // },

      // // result
      // {
      //   path: '/result',
      //   name: 'result',
      //   component: RouteView,
      //   redirect: '/result/success',
      //   meta: { title: '结果页', icon: 'check-circle-o', permission: [ 'result' ] },
      //   children: [
      //     {
      //       path: '/result/success',
      //       name: 'ResultSuccess',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
      //       meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
      //     },
      //     {
      //       path: '/result/fail',
      //       name: 'ResultFail',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
      //       meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
      //     }
      //   ]
      // },

      // // Exception
      // {
      //   path: '/exception',
      //   name: 'exception',
      //   component: RouteView,
      //   redirect: '/exception/403',
      //   meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
      //   children: [
      //     {
      //       path: '/exception/403',
      //       name: 'Exception403',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
      //       meta: { title: '403', permission: [ 'exception' ] }
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'Exception404',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
      //       meta: { title: '404', permission: [ 'exception' ] }
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'Exception500',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
      //       meta: { title: '500', permission: [ 'exception' ] }
      //     }
      //   ]
      // },

      // // account
      // {
      //   path: '/account',
      //   component: RouteView,
      //   redirect: '/account/center',
      //   name: 'account',
      //   meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
      //   children: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: () => import('@/views/account/center'),
      //       meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: () => import('@/views/account/settings/Index'),
      //       meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
      //       redirect: '/account/settings/base',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/account/settings/base',
      //           name: 'BaseSettings',
      //           component: () => import('@/views/account/settings/BaseSetting'),
      //           meta: { title: '基本设置', hidden: true, permission: [ 'user' ] }
      //         },
      //         {
      //           path: '/account/settings/security',
      //           name: 'SecuritySettings',
      //           component: () => import('@/views/account/settings/Security'),
      //           meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
      //         },
      //         {
      //           path: '/account/settings/custom',
      //           name: 'CustomSettings',
      //           component: () => import('@/views/account/settings/Custom'),
      //           meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           name: 'BindingSettings',
      //           component: () => import('@/views/account/settings/Binding'),
      //           meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'user' ] }
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           name: 'NotificationSettings',
      //           component: () => import('@/views/account/settings/Notification'),
      //           meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ] }
      //         }
      //       ]
      //     }
      //   ]
      // },

      // // other
      // {
      //   path: '/other',
      //   name: 'otherPage',
      //   component: RouteView,
      //   meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
      //   redirect: '/other/icon-selector',
      //   children: [
      //     {
      //       path: '/other/icon-selector',
      //       name: 'TestIconSelect',
      //       component: () => import('@/views/other/IconSelectorView'),
      //       meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
      //     },
      //     {
      //       path: '/other/list',
      //       component: RouteView,
      //       meta: { title: '业务布局', icon: 'layout', permission: [ 'dashboard' ] },
      //       redirect: '/other/list/tree-list',
      //       children: [
      //         {
      //           path: '/other/list/tree-list',
      //           name: 'TreeList',
      //           component: () => import('@/views/other/TreeList'),
      //           meta: { title: '树目录表格', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/edit-table',
      //           name: 'EditList',
      //           component: () => import('@/views/other/TableInnerEditList'),
      //           meta: { title: '内联编辑表格', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/user-list',
      //           name: 'UserList',
      //           component: () => import('@/views/other/UserList'),
      //           meta: { title: '用户列表', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/role-list',
      //           name: 'RoleList',
      //           component: () => import('@/views/other/RoleList'),
      //           meta: { title: '角色列表', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/system-role',
      //           name: 'SystemRole',
      //           component: () => import('@/views/role/RoleList'),
      //           meta: { title: '角色列表2', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/permission-list',
      //           name: 'PermissionList',
      //           component: () => import('@/views/other/PermissionList'),
      //           meta: { title: '权限列表', keepAlive: true }
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  },
  {
    path: '*', redirect: '/step/steplist', hidden: true
  }
]

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/project/project-list',
    children: [
      // 工程
      {
        path: '/project',
        name: 'project',
        redirect: '/project/project-list/:pageNo([1-9]\\d*)?',
        component: RouteView,
        meta: { title: 'permissionid.project', keepAlive: false, icon: 'project', permission: [ 'dashboard' ] },
        children: [
          {
            path: '/project/blank',
            name: 'blank',
            hidden: true,
            component: () => import('@/views/step/modules/blank'),
            meta: { title: '', keepAlive: false, permission: [ '' ] }
          },
          {
            path: '/project/new-project',
            name: 'newProject',
            component: () => import('@/views/project/CreateProject'),
            meta: { title: 'permissionid.new.project', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/project/project-list/:pageNo([1-9]\\d*)?',
            name: 'openProject',
            component: () => import('@/views/project/ProjectList'),
            meta: { title: 'permissionid.open.project', keepAlive: false, permission: [ 'dashboard' ], opt: 'open' }
          },
          {
            path: '/project/project-list/delete',
            name: 'delProject',
            component: () => import('@/views/project/DeleteProject'),
            meta: { title: 'permissionid.delete.project', keepAlive: false, permission: [ 'dashboard' ], opt: 'delete' }
          },
          {
            path: '/project/edit-project',
            name: 'editProject',
            hidden: true,
            component: () => import('@/views/project/modules/EditProject'),
            meta: { title: 'permissionid.edit.project', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/project/project-list/report',
            name: 'reportProject',
            component: RouteView,
            meta: { title: 'permissionid.report.project.report', keepAlive: false, permission: [ 'dashboard' ] },
            children: [
              {
                path: '/project/project-list/MProgress',
                name: 'MaintenanceProgressName',
                component: () => import('@/views/project/MaintenanceProgress'),
                meta: { title: 'maintenance.progress.report', keepAlive: false, permission: [ 'dashboard' ], opt: 'MaintenanceProgress' }
              },
              {
                path: '/project/project-list/MStatus',
                name: 'MaintenanceStatusName',
                component: () => import('@/views/project/MaintenanceStatus'),
                meta: { title: 'maintenance.status.report', keepAlive: false, permission: [ 'dashboard' ], opt: 'MaintenanceStatus' }
              },
              {
                path: '/project/project-list/MWorkHour',
                name: 'MaintenanceWorkHourName',
                component: () => import('@/views/project/MaintenanceWorkHour'),
                meta: { title: 'maintenance.working.hours.report', keepAlive: false, permission: [ 'dashboard' ], opt: 'MaintenanceWorkHour' }
              },
              {
                path: '/project/project-list/EnStatistic',
                name: 'EnStatisticName',
                component: () => import('@/views/project/EngineeringStatistic'),
                meta: { title: 'maintenance.engineering.statistic', keepAlive: false, permission: [ 'dashboard' ], opt: 'EngineeringStatistic' }
              }
            ]
          },
          // {
          //   path: '/project/project-list/Export',
          //   name: 'exportProject',
          //   component: () => import('@/views/project/ProjectExport'),
          //   meta: { title: 'permissionid.export.project', keepAlive: false, permission: [ 'dashboard' ], opt: 'export' }
          // },
          {
            path: '/project/project-detail',
            name: 'ProjectDetail',
            hidden: true,
            component: () => import('@/views/project/ProjectDetail'),
            meta: { title: 'menu.project.repairProjectDetail', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/project/project-description', // 查看工程所属工单汇总情况
            name: 'ProjectDescription',
            hidden: true,
            component: () => import('@/views/project/ProjectDescription'),
            meta: { title: 'menu.project.view.action.project.description', keepAlive: false, permission: [ 'dashboard' ] }
          }
        ]
      },
      // 工单
      {
        path: '/step',
        name: 'workorder',
        redirect: '/step/steplist',
        component: RouteView,
        meta: { title: 'menu.workOrder', keepAlive: true, icon: 'snippets', permission: [ 'dashboard', 'repairWorkOrder' ] },
        children: [
          { // 新建工单
            path: '/step/newstep',
            name: 'newStep',
            component: () => import('@/views/step/repair/start/StepForm'),
            meta: { title: 'app.flow.repair.start', keepAlive: false, permission: [ 'dashboard' ] }
          },
          { // 打开工单
            path: '/step/steplist',
            name: 'stepList',
            component: () => import('@/views/step/repair/StepList'),
            meta: { title: 'permissionid.repairWorkOrder', keepAlive: false, permission: [ 'dashboard' ], opt: 'open' }
          },
          { // 删除工单
            path: '/step/delete',
            name: 'deleteStep',
            component: () => import('@/views/step/repair/start/DeleteStep'),
            meta: { title: 'permissionid.repairWorkOrder.delete', keepAlive: false, permission: [ 'dashboard' ], opt: 'delete' }
          },
          { // 导出
            path: '/step/export',
            name: 'exportStep',
            component: () => import('@/views/step/repair/start/ExportStep'),
            meta: { title: 'permissionid.export.project', keepAlive: false, permission: [ 'dashboard' ], opt: 'export' }
          },
          { // 报表
            path: '/step/report',
            name: 'reportStep',
            component: () => import('@/views/step/repair/start/ReportStep'),
            meta: { title: 'permissionid.report.project', keepAlive: false, permission: [ 'dashboard' ], opt: 'report' }
          },
          // { // 已完工工单
          //   path: '/step/donesteplist',
          //   name: 'donesteplist',
          //   component: () => import('@/views/step/repair/StepListDone'),
          //   meta: { title: 'permissionid.repairWorkOrder.done', keepAlive: false, permission: [ 'dashboard' ] }
          // },
          {
            path: '/step/start',
            name: 'editStep',
            hidden: true,
            component: () => import('@/views/step/repair/start/EditStartForm'),
            meta: { title: '', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/start-detail',
            name: 'detailStep',
            hidden: true,
            component: () => import('@/views/step/repair/start/StepDetail'),
            meta: { title: 'menu.workOrder.repair.workOrderDetail', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/allDetailStep',
            name: 'allDetailStep',
            hidden: true,
            component: () => import('@/views/step/modules/StepAllDetail'),
            meta: { title: 'menu.workOrder.repair.workOrderDetail', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/upload/*',
            name: 'getUpload',
            hidden: true
          },
          // ================================== Receipt ==============================
          {
            path: '/step/Receipt',
            name: 'editReceiptStep',
            hidden: true,
            component: () => import('@/views/step/repair/Receipt/EditReceiptForm'),
            meta: { title: '收货', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/receipt-detail',
            name: 'detailReceiptStep',
            hidden: true,
            component: () => import('@/views/step/repair/Receipt/ReceiptDetail'),
            meta: { title: '收货工单详情', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== IntoFactoryCheck ==============================
          {
            path: '/step/IntoFactoryCheck',
            name: 'intoFactoryCheck',
            hidden: true,
            component: () => import('@/views/step/repair/IntoFactoryCheck/EditIntoFactoryCheckForm'),
            meta: { title: '入厂检查', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/IntoFactoryCheck-detail',
            name: 'detailIntoFactoryCheck',
            hidden: true,
            component: () => import('@/views/step/repair/IntoFactoryCheck/IntoFactoryCheckDetail'),
            meta: { title: '入厂检查工单详情', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== PreRepairDiag ==============================
          {
            path: '/step/PreRepairDiag',
            name: 'preRepairDiag',
            hidden: true,
            component: () => import('@/views/step/repair/PreRepairDiag/EditPreRepairDiag'),
            meta: { title: '维修前诊断', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/PreRepairDiag-detail',
            name: 'preRepairDiagInfo',
            hidden: true,
            component: () => import('@/views/step/repair/PreRepairDiag/PreRepairDiagDetail'),
            meta: { title: '维修前测试详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== PreRepairTest ==============================
          {
            path: '/step/PreRepairTest',
            name: 'preRepairTest',
            hidden: true,
            component: () => import('@/views/step/repair/PreRepairTest/EditPreRepairTest'),
            meta: { title: '维修前测试', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/PreRepairTest-detail',
            name: 'preRepairTestDetail',
            hidden: true,
            component: () => import('@/views/step/repair/PreRepairTest/PreRepairTestDetail'),
            meta: { title: '维修前测试详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== TearDown ==============================
          {
            path: '/step/TearDown',
            name: 'tearDown',
            hidden: true,
            component: () => import('@/views/step/repair/TearDown/EditTearDown'),
            meta: { title: '拆解', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/TearDown-detail',
            name: 'tearDownDetail',
            hidden: true,
            component: () => import('@/views/step/repair/TearDown/TearDownDetail'),
            meta: { title: '拆解工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== Assessment ==============================
          {
            path: '/step/Assessment',
            name: 'assessment',
            hidden: true,
            component: () => import('@/views/step/repair/Assessment/EditAssessment'),
            meta: { title: '评估', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/Assessment-detail',
            name: 'AssessmentDetail',
            hidden: true,
            component: () => import('@/views/step/repair/Assessment/AssessmentDetail'),
            meta: { title: '评估工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== Repair ==============================
          {
            path: '/step/Repair',
            name: 'repair',
            hidden: true,
            component: () => import('@/views/step/repair/Repair/EditRepair'),
            meta: { title: '修理', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/Repair-detail',
            name: 'RepairDetail',
            hidden: true,
            component: () => import('@/views/step/repair/Repair/RepairDetail'),
            meta: { title: '维修工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== Assemble ==============================
          {
            path: '/step/Assemble',
            name: 'assemble',
            hidden: true,
            component: () => import('@/views/step/repair/Assemble/EditAssemble'),
            meta: { title: '组装', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/Assemble-detail',
            name: 'assembleDetail',
            hidden: true,
            component: () => import('@/views/step/repair/Assemble/AssembleDetail'),
            meta: { title: '组装', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== InstallActuator ==============================
          {
            path: '/step/InstallActuator',
            name: 'installActuator',
            hidden: true,
            component: () => import('@/views/step/repair/InstallActuator/EditInstallActuator'),
            meta: { title: '安装执行机构', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/InstallActuator-detail',
            name: 'installActuatorDetail',
            hidden: true,
            component: () => import('@/views/step/repair/InstallActuator/InstallActuatorDetail'),
            meta: { title: '安装执行机构工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== LeakPressureTest ==============================
          {
            path: '/step/LeakPressureTest',
            name: 'leakPressureTest',
            hidden: true,
            component: () => import('@/views/step/repair/LeakPressureTest/EditLeakPressureTest'),
            meta: { title: '测漏试压', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/LeakPressureTest-detail',
            name: 'leakPressureTestDetail',
            hidden: true,
            component: () => import('@/views/step/repair/LeakPressureTest/LeakPressureTestDetail'),
            meta: { title: '测漏试压工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== InstallAccessory ==============================
          {
            path: '/step/InstallSlave',
            name: 'installSlave',
            hidden: true,
            component: () => import('@/views/step/repair/InstallSlave/EditInstallSlave'),
            meta: { title: '安装附件', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/InstallSlave-detail',
            name: 'installSlaveDetail',
            hidden: true,
            component: () => import('@/views/step/repair/InstallSlave/InstallSlaveDetail'),
            meta: { title: '安装附件工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== Adjust ==============================
          {
            path: '/step/Adjust',
            name: 'adjust',
            hidden: true,
            component: () => import('@/views/step/repair/Adjust/EditAdjust'),
            meta: { title: '调校', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/Adjust-detail',
            name: 'adjustDetail',
            hidden: true,
            component: () => import('@/views/step/repair/Adjust/AdjustDetail'),
            meta: { title: '调校', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== AfterRepairDiag ==============================
          {
            path: '/step/AfterRepairDiag',
            name: 'afterRepairDiag',
            hidden: true,
            component: () => import('@/views/step/repair/AfterRepairDiag/EditAfterRepairDiag'),
            meta: { title: '维修后诊断', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/AfterRepairDiag-detail',
            name: 'afterRepairDiagInfo',
            hidden: true,
            component: () => import('@/views/step/repair/AfterRepairDiag/AfterRepairDiagDetail'),
            meta: { title: '维修后测试详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== RepairConfirm ===========================
          {
            path: '/step/RepairConfirm',
            name: 'repairConfirm',
            hidden: true,
            component: () => import('@/views/step/repair/RepairConfirm/EditRepairConfirm'),
            meta: { title: '维修确认', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/RepairConfirm-detail',
            name: 'repairConfirmDetail',
            hidden: true,
            component: () => import('@/views/step/repair/RepairConfirm/RepairConfirmDetail'),
            meta: { title: '维修确认工单', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== FinalCheck ==============================
          {
            path: '/step/FinalCheck',
            name: 'FinalCheck',
            hidden: true,
            component: () => import('@/views/step/repair/FinalCheck/EditFinalCheck'),
            meta: { title: '最终检查', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/FinalCheck-detail',
            name: 'finalCheckDetail',
            hidden: true,
            component: () => import('@/views/step/repair/FinalCheck/FinalCheckDetail'),
            meta: { title: '最终检查工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== PackingDelivery ==============================
          {
            path: '/step/PackingDelivery',
            name: 'PackingDelivery',
            hidden: true,
            component: () => import('@/views/step/repair/PackingDelivery/EditPackingDelivery'),
            meta: { title: '发货', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/PackingDelivery-detail',
            name: 'PackingDeliveryDetail',
            hidden: true,
            component: () => import('@/views/step/repair/PackingDelivery/PackingDeliveryDetail'),
            meta: { title: '发货工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== Report ==============================
          {
            path: '/step/RepairReportImageList',
            name: 'RepairReportImageList',
            hidden: true,
            component: () => import('@/views/step/repair/Report/ReportRepairImage'),
            meta: { title: '阀维修报告图片', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/valveTestReportImageList',
            name: 'valveTestReportImageList',
            hidden: true,
            component: () => import('@/views/step/repair/Report/ReportValveTest'),
            meta: { title: '阀检测报告图片', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/localtorTestReportImageList',
            name: 'localtorTestReportImageList',
            hidden: true,
            component: () => import('@/views/step/locator/Report/ReportLocatorTest'),
            meta: { title: '定位器检测报告图片', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== 定位器-LocatorIntoFactoryCheck ==============================
          {
            path: '/step/LocatorIntoFactoryCheck',
            name: 'locatorIntoFactoryCheck',
            hidden: true,
            component: () => import('@/views/step/locator/IntoFactoryCheck/EditIntoFactoryCheck'),
            meta: { title: '定位器入厂检查', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/LocatorIntoFactoryCheck-detail',
            name: 'locatorIntoFactoryCheck-detail',
            hidden: true,
            component: () => import('@/views/step/locator/IntoFactoryCheck/IntoFactoryCheckDetail'),
            meta: { title: '定位器入厂检查工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== 定位器-LocatorPreRepairTest ==============================
          {
            path: '/step/LocatorPreRepairTest',
            name: 'locatorPreRepairTest',
            hidden: true,
            component: () => import('@/views/step/locator/PreRepairTest/EditPreRepairTest'),
            meta: { title: '定位器维修前测试', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/LocatorPreRepairTest-detail',
            name: 'locatorPreRepairTest-detail',
            hidden: true,
            component: () => import('@/views/step/locator/PreRepairTest/PreRepairTestDetail'),
            meta: { title: '定位器维修前测试工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== 定位器-LocatorAssessment ==============================
          {
            path: '/step/LocatorAssessment',
            name: 'locatorAssessment',
            hidden: true,
            component: () => import('@/views/step/locator/Assessment/EditAssessment'),
            meta: { title: '定位器评估', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/LocatorAssessment-detail',
            name: 'locatorRepair-detail',
            hidden: true,
            component: () => import('@/views/step/locator/Assessment/AssessmentDetail'),
            meta: { title: '定位器评估工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== 定位器-Repair ==============================
          {
            path: '/step/LocatorRepair',
            name: 'locatorRepair',
            hidden: true,
            component: () => import('@/views/step/locator/Repair/EditRepair'),
            meta: { title: '定位器维修', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/LocatorRepair-detail',
            name: 'locatorRepair-detail',
            hidden: true,
            component: () => import('@/views/step/locator/Repair/RepairDetail'),
            meta: { title: '定位器维修工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== 定位器-Adjust ==============================
          {
            path: '/step/LocatorAdjust',
            name: 'locatorAdjust',
            hidden: true,
            component: () => import('@/views/step/locator/Adjust/EditAdjust'),
            meta: { title: '定位器调校', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/LocatorAdjust-detail',
            name: 'locatorAdjust-detail',
            hidden: true,
            component: () => import('@/views/step/locator/Adjust/AdjustDetail'),
            meta: { title: '定位器调校工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          }
        ]
      },
      // 客户管理
      // ================================== User ==============================
      {
        path: '/customer',
        name: 'customer',
        component: RouteView,
        meta: { title: 'permissionid.customer', keepAlive: true, icon: 'idcard', permission: [ 'dashboard' ] },
        redirect: '/customer/customer-list',
        children: [
          {
            path: '/customer/customer-list',
            name: 'customerlist',
            component: () => import('@/views/customer/CustomerList'),
            meta: { title: 'permissionid.customer.name', keepAlive: false, permission: [ 'dashboard' ], opt: 'open' }
            // path: '/customer/customer-list',
            // name: 'customerList',
            // component: RouteView,
            // meta: { title: 'permissionid.customer.name', keepAlive: false, permission: [ 'dashboard' ] },
            // children: [
            //   { // 客户列表
            //     path: '/customer/customer-list',
            //     name: 'customerlist',
            //     component: () => import('@/views/customer/CustomerList'),
            //     meta: { title: 'permissionid.customer.list', keepAlive: false, permission: [ 'dashboard' ], opt: 'open' }
            //   },
            //   { // 添加客户
            //     path: '/customer/list/add',
            //     name: 'addCustomer',
            //     component: () => import('@/views/customer/list/AddCustomer'),
            //     meta: { title: 'permissionid.customer.add', keepAlive: false, permission: [ 'dashboard' ] }
            //   },
            //   { // 编辑客户
            //     path: '/customer/list/edit',
            //     name: 'editCustomer',
            //     component: () => import('@/views/customer/list/EditCustomer'),
            //     meta: { title: 'permissionid.customer.edit', keepAlive: false, permission: [ 'dashboard' ], opt: 'edit' }
            //   },
            //   { // 删除客户
            //     path: '/customer/list/delete',
            //     name: 'deleteCustomer',
            //     component: () => import('@/views/customer/list/DeleteCustomer'),
            //     meta: { title: 'permissionid.customer.delete', keepAlive: false, permission: [ 'dashboard' ], opt: 'delete' }
            //   },
            //   { // 导入
            //     path: '/customer/list/import',
            //     name: 'importCustomer',
            //     component: () => import('@/views/customer/list/ImportCustomer'),
            //     meta: { title: 'permissionid.import.project', keepAlive: false, permission: [ 'dashboard' ], opt: 'import' }
            //   },
            //   { // 导出
            //     path: '/customer/list/export',
            //     name: 'exportCustomer',
            //     component: () => import('@/views/customer/list/ExportCustomer'),
            //     meta: { title: 'permissionid.export.project', keepAlive: false, permission: [ 'dashboard' ], opt: 'export' }
            //   }
            // ]
          },
          { // installbasea
            path: '/customer/installbase-list',
            name: 'customerInstallbaseAdjustvalve',
            component: () => import('@/views/customer/installbase/adjustvalve/AdjustvalveList'),
            meta: { title: 'menu.customer.installbase', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // {
          //   path: '/customer/installbase-list',
          //   name: 'customerInstallbase',
          //   redirect: '/customer/installbase/adjustvalve-list',
          //   component: RouteView,
          //   meta: { title: 'menu.customer.installbase', keepAlive: false, permission: [ 'dashboard' ] },
          //   children: [
          //     {
          //       path: '/customer/installbase/adjustvalve-list',
          //       name: 'customerInstallbaseAdjustvalve',
          //       component: () => import('@/views/customer/installbase/adjustvalve/AdjustvalveList'),
          //       meta: { title: 'menu.customer.regulator.valve', keepAlive: false, permission: [ 'dashboard' ] }
          //     },
          //     {
          //       path: '/customer/installbase/onoffvalve-list',
          //       name: 'customerInstallbaseOnOffValveList',
          //       component: () => import('@/views/customer/installbase/onOffValve/OnOffValveList'),
          //       meta: { title: 'menu.customer.onoff.valve', keepAlive: false, permission: [ 'dashboard' ] }
          //     },
          //     {
          //       path: '/customer/installbase/regulator-list',
          //       name: 'customerInstallbaseRegulator',
          //       component: () => import('@/views/customer/installbase/regulator/RegulatorList'),
          //       meta: { title: 'menu.customer.regulator', keepAlive: false, permission: [ 'dashboard' ] }
          //     },
          //     {
          //       path: '/customer/installbase/ggc-list',
          //       name: 'customerInstallbaseGgc',
          //       component: () => import('@/views/customer/installbase/ggc/GgcList'),
          //       meta: { title: 'menu.customer.ggc', keepAlive: false, permission: [ 'dashboard' ] }
          //     },
          //     {
          //       path: '/customer/installbase/instrument-list',
          //       name: 'customerInstallbaseInstrument',
          //       component: () => import('@/views/customer/installbase/instrument/InstrumentList'),
          //       meta: { title: 'menu.customer.instrument', keepAlive: false, permission: [ 'dashboard' ] }
          //     }
          //   ]
          // },
          {
            path: '/customer/rspl-list',
            name: 'customerRsplbaseAdjustvalve',
            component: () => import('@/views/customer/rspl/adjustvalve/AdjustvalveList'),
            meta: { title: 'RSPL', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // {
          //   path: '/customer/rspl-list',
          //   name: 'customerrspl',
          //   component: () => import('@/views/customer/rspl/Rspl'),
          //   meta: { title: 'menu.customer.rspl', keepAlive: false, permission: [ 'dashboard' ] },
          //   children: [
          //     {
          //       path: '/customer/rspl/adjustvalve-list',
          //       name: 'customerRsplbaseAdjustvalve',
          //       component: () => import('@/views/customer/rspl/adjustvalve/AdjustvalveList'),
          //       meta: { title: 'menu.customer.regulator.valve', keepAlive: false, permission: [ 'dashboard' ] }
          //     },
          //     {
          //       path: '/customer/rspl/onoffvalve-list',
          //       name: 'customerRsplbaseOnOffValveList',
          //       component: () => import('@/views/customer/rspl/onOffValve/OnOffValveList'),
          //       meta: { title: 'menu.customer.onoff.valve', keepAlive: false, permission: [ 'dashboard' ] }
          //     },
          //     {
          //       path: '/customer/rspl/regulator-list',
          //       name: 'customerRsplbaseRegulator',
          //       component: () => import('@/views/customer/rspl/regulator/RegulatorList'),
          //       meta: { title: 'menu.customer.regulator', keepAlive: false, permission: [ 'dashboard' ] }
          //     },
          //     {
          //       path: '/customer/rspl/ggc-list',
          //       name: 'customerRsplbaseGgc',
          //       component: () => import('@/views/customer/rspl/ggc/GgcList'),
          //       meta: { title: 'menu.customer.ggc', keepAlive: false, permission: [ 'dashboard' ] }
          //     },
          //     {
          //       path: '/customer/rspl/instrument-list',
          //       name: 'customerRsplbaseInstrument',
          //       component: () => import('@/views/customer/rspl/instrument/InstrumentList'),
          //       meta: { title: 'menu.customer.instrument', keepAlive: false, permission: [ 'dashboard' ] }
          //     }
          //   ]
          // },
          {
            path: '/customer/repair-record-list',
            name: 'customerRepairRecord',
            component: RouteView,
            meta: { title: 'menu.customer.repair.record', keepAlive: false, permission: [ 'dashboard' ] },
            children: [
              {
                path: '/customer/repairrecord/project-list',
                name: 'customerRepairRecordProject',
                component: () => import('@/views/customer/repairRecord/project/ProjectList'),
                meta: { title: 'permissionid.project.list', keepAlive: false, permission: [ 'dashboard' ] }
              },
              {
                path: '/customer/repairrecord/order-list',
                name: 'customerRepairRecordOrder',
                component: () => import('@/views/customer/repairRecord/order/OrderList'),
                meta: { title: 'permissionid.repairWorkOrder.list', keepAlive: false, permission: [ 'dashboard' ] }
              }
            ]
          }
        ]
      },
      // 备品备件
      // ================================== 备品备件 ==============================
      {
        path: '/spareparts',
        name: 'spareparts',
        component: RouteView,
        meta: { title: 'menu.spare_parts', keepAlive: true, icon: 'idcard', permission: [ 'dashboard' ] },
        redirect: '/spareparts/valve-list',
        children: [
          { // 阀门
            path: '/spareparts/valve-list',
            name: 'sparepartsValve',
            component: RouteView,
            meta: { title: 'menu.spare_parts.valve', keepAlive: false, permission: [ 'dashboard' ] },
            children: [
              {
                path: '/spareparts/add-valve',
                name: 'addSparepartsValve',
                component: () => import('@/views/spareparts/AddValvePart'),
                meta: { title: 'menu.spare_parts.valve.add', keepAlive: false, permission: [ 'dashboard' ] }
              },
              {
                path: '/spareparts/import-valve',
                name: 'importSparepartsValve',
                component: () => import('@/views/spareparts/ImportValveList'),
                meta: { title: 'menu.spare_parts.valve.import', keepAlive: false, permission: [ 'dashboard' ], opt: 'import' }
              },
              {
                path: '/spareparts/valve-list',
                name: 'querySparepartsValve',
                component: () => import('@/views/spareparts/QueryValveList'),
                meta: { title: 'menu.spare_parts.valve.query', keepAlive: false, permission: [ 'dashboard' ], opt: 'query' }
              }
            ]
          },
          { // 备件
            path: '/spareparts/spareparts-list',
            name: 'sparepartsList',
            component: RouteView,
            meta: { title: 'menu.spare_parts.parts', keepAlive: false, permission: [ 'dashboard' ] },
            children: [
              {
                path: '/spareparts/add-item',
                name: 'addSpareparts',
                component: () => import('@/views/spareparts/AddItemPart'),
                meta: { title: 'menu.spare_parts.valve.add', keepAlive: false, permission: [ 'dashboard' ] }
              },
              {
                path: '/spareparts/import-item',
                name: 'importSpareparts',
                component: () => import('@/views/spareparts/ImportItemList'),
                meta: { title: 'menu.spare_parts.valve.import', keepAlive: false, permission: [ 'dashboard' ], opt: 'import' }
              },
              {
                path: '/spareparts/item-list',
                name: 'querySpareparts',
                component: () => import('@/views/spareparts/QueryItemList'),
                meta: { title: 'menu.spare_parts.valve.query', keepAlive: false, permission: [ 'dashboard' ], opt: 'query' }
              }
            ]
          }
        ]
      },
      // ================================== 参考资 料 ==============================
      { // 参考资料
        path: '/reference/list',
        name: 'reference',
        component: RouteView,
        meta: { title: 'menu.reference', keepAlive: false, icon: 'book', permission: [ 'dashboard' ] },
        children: [
          { // 测试标准
            path: '/reference/test-standard/list',
            name: 'testStandard',
            component: RouteView,
            meta: { title: 'menu.reference.test.standard', keepAlive: false, permission: [ 'dashboard' ] },
            children: [
              { // 调节阀
                path: '/reference/test-standard/control-valve/list',
                name: 'testStandardControlValve',
                component: RouteView,
                meta: { title: 'menu.customer.regulator.valve', keepAlive: false, permission: [ 'dashboard' ] },
                children: [
                  { // 添加
                    path: '/reference/test-standard/control-valve/list/add',
                    name: 'addTestStandardControlValve',
                    component: () => import('@/views/reference/test/control/Add'),
                    meta: { title: 'menu.reference.add', keepAlive: false, permission: [ 'dashboard' ], opt: 'add', type: 1 }
                  },
                  { // 打开查看
                    path: '/reference/test-standard/control-valve/list/open',
                    name: 'openTestStandardControlValve',
                    component: () => import('@/views/reference/test/control/Open'),
                    meta: { title: 'menu.reference.open', keepAlive: false, permission: [ 'dashboard' ], opt: 'open', type: 1 }
                  },
                  { // 删除
                    path: '/reference/test-standard/control-valve/list/delete',
                    name: 'deleteTestStandardControlValve',
                    component: () => import('@/views/reference/test/control/Del'),
                    meta: { title: 'menu.project.view.action.delete', keepAlive: false, permission: [ 'dashboard' ], opt: 'delete', type: 1 }
                  }
                ]
              },
              { // 开关阀
                path: '/reference/test-standard/onoff-valve/list',
                name: 'testStandardOnOffValve',
                component: RouteView,
                meta: { title: 'menu.customer.onoff.valve', keepAlive: false, permission: [ 'dashboard' ] },
                children: [
                  { // 添加
                    path: '/reference/test-standard/onoff-valve/list/add',
                    name: 'addTestStandardOnOffValve',
                    component: () => import('@/views/reference/test/offon/Add'),
                    meta: { title: 'menu.reference.add', keepAlive: false, permission: [ 'dashboard' ], opt: 'add', type: 2 }
                  },
                  { // 打开查看
                    path: '/reference/test-standard/onoff-valve/list/open',
                    name: 'openTestStandardOnOffValve',
                    component: () => import('@/views/reference/test/offon/Open'),
                    meta: { title: 'menu.reference.open', keepAlive: false, permission: [ 'dashboard' ], opt: 'open', type: 2 }
                  },
                  { // 删除
                    path: '/reference/test-standard/onoff-valve/list/delete',
                    name: 'deleteTestStandardOnOffValve',
                    component: () => import('@/views/reference/test/offon/Del'),
                    meta: { title: 'menu.project.view.action.delete', keepAlive: false, permission: [ 'dashboard' ], opt: 'delete', type: 2 }
                  }
                ]
              },
              { // 安全阀
                path: '/reference/test-standard/safety-valve/list',
                name: 'testStandardSafetyValve',
                component: RouteView,
                meta: { title: 'menu.customer.saftey.valve', keepAlive: false, permission: [ 'dashboard' ] },
                children: [
                  { // 添加
                    path: '/reference/test-standard/safe-valve/list/add',
                    name: 'addTestStandardSafeValve',
                    component: () => import('@/views/reference/test/safe/Add'),
                    meta: { title: 'menu.reference.add', keepAlive: false, permission: [ 'dashboard' ], opt: 'add', type: 3 }
                  },
                  { // 打开查看
                    path: '/reference/test-standard/safe-valve/list/open',
                    name: 'openTestStandardSafeValve',
                    component: () => import('@/views/reference/test/safe/Open'),
                    meta: { title: 'menu.reference.open', keepAlive: false, permission: [ 'dashboard' ], opt: 'open', type: 3 }
                  },
                  { // 删除
                    path: '/reference/test-standard/safe-valve/list/delete',
                    name: 'deleteTestStandardSafeValve',
                    component: () => import('@/views/reference/test/safe/Del'),
                    meta: { title: 'menu.project.view.action.delete', keepAlive: false, permission: [ 'dashboard' ], opt: 'delete', type: 3 }
                  }
                ]
              }
            ]
          },
          { // 操作手册
            path: '/reference/operation-manual/list',
            name: 'operationManual',
            component: RouteView,
            meta: { title: 'menu.operation.manual', keepAlive: false, permission: [ 'dashboard' ] },
            children: [
              { // 阀门
                path: '/reference/operation-manual/valve/list',
                name: 'operationManualValve',
                component: RouteView,
                meta: { title: 'menu.spare_parts.valve', keepAlive: false, permission: [ 'dashboard' ] },
                children: [
                  { // 添加
                    path: '/reference/operation-manual/valve/list/add',
                    name: 'addOperationManualValve',
                    component: () => import('@/views/reference/operation/valve/Add'),
                    meta: { title: 'menu.reference.add', keepAlive: false, permission: [ 'dashboard' ], opt: 'add', type: 4 }
                  },
                  { // 打开
                    path: '/reference/operation-manual/valve/list/open',
                    name: 'openOperationManualValve',
                    component: () => import('@/views/reference/operation/valve/Open'),
                    meta: { title: 'menu.reference.open', keepAlive: false, permission: [ 'dashboard' ], opt: 'open', type: 4 }
                  },
                  { // 删除
                    path: '/reference/operation-manual/valve/list/delete',
                    name: 'deleteOperationManualValve',
                    component: () => import('@/views/reference/operation/valve/Del'),
                    meta: { title: 'menu.project.view.action.delete', keepAlive: false, permission: [ 'dashboard' ], opt: 'delete', type: 4 }
                  }
                ]
              },
              { // 执行机构
                path: '/reference/operation-manual/actuator/list',
                name: 'operationManualActuator',
                component: RouteView,
                meta: { title: 'menu.spare_parts.valve.actuator', keepAlive: false, permission: [ 'dashboard' ] },
                children: [
                  { // 添加
                    path: '/reference/operation-manual/actuator/list/add',
                    name: 'addOperationManualActuator',
                    component: () => import('@/views/reference/operation/actuator/Add'),
                    meta: { title: 'menu.reference.add', keepAlive: false, permission: [ 'dashboard' ], opt: 'add', type: 5 }
                  },
                  { // 打开
                    path: '/reference/operation-manual/actuator/list/open',
                    name: 'openOperationManualActuator',
                    component: () => import('@/views/reference/operation/actuator/Open'),
                    meta: { title: 'menu.reference.open', keepAlive: false, permission: [ 'dashboard' ], opt: 'open', type: 5 }
                  },
                  { // 删除
                    path: '/reference/operation-manual/actuator/list/delete',
                    name: 'deleteOperationManualActuator',
                    component: () => import('@/views/reference/operation/actuator/Del'),
                    meta: { title: 'menu.project.view.action.delete', keepAlive: false, permission: [ 'dashboard' ], opt: 'delete', type: 5 }
                  }
                ]
              },
              { // 仪表附件
                path: '/reference/operation-manual/instrument/list',
                name: 'operationManualInstrument',
                component: RouteView,
                meta: { title: 'menu.customer.instrument', keepAlive: false, permission: [ 'dashboard' ] },
                children: [
                  { // 添加
                    path: '/reference/operation-manual/instrument/list/add',
                    name: 'addOperationManualInstrument',
                    component: () => import('@/views/reference/operation/instrument/Add'),
                    meta: { title: 'menu.reference.add', keepAlive: false, permission: [ 'dashboard' ], opt: 'add', type: 6 }
                  },
                  { // 打开
                    path: '/reference/operation-manual/instrument/list/open',
                    name: 'openOperationManualInstrument',
                    component: () => import('@/views/reference/operation/instrument/Open'),
                    meta: { title: 'menu.reference.open', keepAlive: false, permission: [ 'dashboard' ], opt: 'open', type: 6 }
                  },
                  { // 删除
                    path: '/reference/operation-manual/instrument/list/delete',
                    name: 'deleteOperationManualInstrument',
                    component: () => import('@/views/reference/operation/instrument/Del'),
                    meta: { title: 'menu.project.view.action.delete', keepAlive: false, permission: [ 'dashboard' ], opt: 'delete', type: 6 }
                  }
                ]
              }
            ]
          }
        ]
      },
      // 用户管理
      // ================================== User ==============================
      {
        path: '/user',
        name: 'User',
        component: RouteView,
        meta: { title: 'menu.user', keepAlive: true, icon: 'user', permission: [ 'dashboard' ] },
        redirect: '/user/user-list',
        children: [
          {
            path: '/user/user-list',
            name: 'userList',
            component: () => import('@/views/user/UserList'),
            meta: { title: 'permissionid.user', keepAlive: false, permission: [ 'dashboard' ] }
          }
        ]
      },
      // 权限管理
      // ================================== Role ==============================
      {
        path: '/permission',
        name: 'permission',
        component: RouteView,
        meta: { title: 'menu.permission', keepAlive: true, icon: 'unlock', permission: [ 'dashboard' ] },
        redirect: '/role/role-list',
        children: [
          {
            path: '/role/role-list',
            name: 'roleList',
            component: () => import('@/views/permission/RoleList'),
            meta: { title: 'permissionid.permission', keepAlive: false, permission: [ 'dashboard' ] }
          }
        ]
      }
      // dashboard
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   redirect: '/dashboard/workplace',
      //   component: RouteView,
      //   meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
      //   children: [
      //     {
      //       path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
      //       name: 'Analysis',
      //       component: () => import('@/views/dashboard/Analysis'),
      //       meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: [ 'dashboard' ] }
      //     },
      //     // 外部链接
      //     {
      //       path: 'https://www.baidu.com/',
      //       name: 'Monitor',
      //       meta: { title: 'menu.dashboard.monitor', target: '_blank' }
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'Workplace',
      //       component: () => import('@/views/dashboard/Workplace'),
      //       meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: [ 'dashboard' ] }
      //     }
      //   ]
      // },

      // // forms
      // {
      //   path: '/form',
      //   redirect: '/form/base-form',
      //   component: RouteView,
      //   meta: { title: '表单页', icon: 'form', permission: [ 'form' ] },
      //   children: [
      //     {
      //       path: '/form/base-form',
      //       name: 'BaseForm',
      //       component: () => import('@/views/form/basicForm'),
      //       meta: { title: '基础表单', keepAlive: true, permission: [ 'form' ] }
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'StepForm',
      //       component: () => import('@/views/form/stepForm/StepForm'),
      //       meta: { title: '分步表单', keepAlive: true, permission: [ 'form' ] }
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'AdvanceForm',
      //       component: () => import('@/views/form/advancedForm/AdvancedForm'),
      //       meta: { title: '高级表单', keepAlive: true, permission: [ 'form' ] }
      //     }
      //   ]
      // },

      // // list
      // {
      //   path: '/list',
      //   name: 'list',
      //   component: RouteView,
      //   redirect: '/list/table-list',
      //   meta: { title: '列表页', icon: 'table', permission: [ 'table' ] },
      //   children: [
      //     {
      //       path: '/list/table-list/:pageNo([1-9]\\d*)?',
      //       name: 'TableListWrapper',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('@/views/list/TableList'),
      //       meta: { title: '查询表格', keepAlive: true, permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'BasicList',
      //       component: () => import('@/views/list/BasicList'),
      //       meta: { title: '标准列表', keepAlive: true, permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/card',
      //       name: 'CardList',
      //       component: () => import('@/views/list/CardList'),
      //       meta: { title: '卡片列表', keepAlive: true, permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'SearchList',
      //       component: () => import('@/views/list/search/SearchLayout'),
      //       redirect: '/list/search/article',
      //       meta: { title: '搜索列表', keepAlive: true, permission: [ 'table' ] },
      //       children: [
      //         {
      //           path: '/list/search/article',
      //           name: 'SearchArticles',
      //           component: () => import('../views/list/search/Article'),
      //           meta: { title: '搜索列表（文章）', permission: [ 'table' ] }
      //         },
      //         {
      //           path: '/list/search/project',
      //           name: 'SearchProjects',
      //           component: () => import('../views/list/search/Projects'),
      //           meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
      //         },
      //         {
      //           path: '/list/search/application',
      //           name: 'SearchApplications',
      //           component: () => import('../views/list/search/Applications'),
      //           meta: { title: '搜索列表（应用）', permission: [ 'table' ] }
      //         }
      //       ]
      //     }
      //   ]
      // },

      // // profile
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   component: RouteView,
      //   redirect: '/profile/basic',
      //   meta: { title: '详情页', icon: 'profile', permission: [ 'profile' ] },
      //   children: [
      //     {
      //       path: '/profile/basic',
      //       name: 'ProfileBasic',
      //       component: () => import('@/views/profile/basic'),
      //       meta: { title: '基础详情页', permission: [ 'profile' ] }
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'ProfileAdvanced',
      //       component: () => import('@/views/profile/advanced/Advanced'),
      //       meta: { title: '高级详情页', permission: [ 'profile' ] }
      //     }
      //   ]
      // },

      // // result
      // {
      //   path: '/result',
      //   name: 'result',
      //   component: RouteView,
      //   redirect: '/result/success',
      //   meta: { title: '结果页', icon: 'check-circle-o', permission: [ 'result' ] },
      //   children: [
      //     {
      //       path: '/result/success',
      //       name: 'ResultSuccess',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
      //       meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
      //     },
      //     {
      //       path: '/result/fail',
      //       name: 'ResultFail',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
      //       meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
      //     }
      //   ]
      // },

      // // Exception
      // {
      //   path: '/exception',
      //   name: 'exception',
      //   component: RouteView,
      //   redirect: '/exception/403',
      //   meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
      //   children: [
      //     {
      //       path: '/exception/403',
      //       name: 'Exception403',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
      //       meta: { title: '403', permission: [ 'exception' ] }
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'Exception404',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
      //       meta: { title: '404', permission: [ 'exception' ] }
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'Exception500',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
      //       meta: { title: '500', permission: [ 'exception' ] }
      //     }
      //   ]
      // },

      // // account
      // {
      //   path: '/account',
      //   component: RouteView,
      //   redirect: '/account/center',
      //   name: 'account',
      //   meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
      //   children: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: () => import('@/views/account/center'),
      //       meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: () => import('@/views/account/settings/Index'),
      //       meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
      //       redirect: '/account/settings/base',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/account/settings/base',
      //           name: 'BaseSettings',
      //           component: () => import('@/views/account/settings/BaseSetting'),
      //           meta: { title: '基本设置', hidden: true, permission: [ 'user' ] }
      //         },
      //         {
      //           path: '/account/settings/security',
      //           name: 'SecuritySettings',
      //           component: () => import('@/views/account/settings/Security'),
      //           meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
      //         },
      //         {
      //           path: '/account/settings/custom',
      //           name: 'CustomSettings',
      //           component: () => import('@/views/account/settings/Custom'),
      //           meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           name: 'BindingSettings',
      //           component: () => import('@/views/account/settings/Binding'),
      //           meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'user' ] }
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           name: 'NotificationSettings',
      //           component: () => import('@/views/account/settings/Notification'),
      //           meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ] }
      //         }
      //       ]
      //     }
      //   ]
      // },

      // // other
      // {
      //   path: '/other',
      //   name: 'otherPage',
      //   component: RouteView,
      //   meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
      //   redirect: '/other/icon-selector',
      //   children: [
      //     {
      //       path: '/other/icon-selector',
      //       name: 'TestIconSelect',
      //       component: () => import('@/views/other/IconSelectorView'),
      //       meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
      //     },
      //     {
      //       path: '/other/list',
      //       component: RouteView,
      //       meta: { title: '业务布局', icon: 'layout', permission: [ 'dashboard' ] },
      //       redirect: '/other/list/tree-list',
      //       children: [
      //         {
      //           path: '/other/list/tree-list',
      //           name: 'TreeList',
      //           component: () => import('@/views/other/TreeList'),
      //           meta: { title: '树目录表格', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/edit-table',
      //           name: 'EditList',
      //           component: () => import('@/views/other/TableInnerEditList'),
      //           meta: { title: '内联编辑表格', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/user-list',
      //           name: 'UserList',
      //           component: () => import('@/views/other/UserList'),
      //           meta: { title: '用户列表', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/role-list',
      //           name: 'RoleList',
      //           component: () => import('@/views/other/RoleList'),
      //           meta: { title: '角色列表', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/system-role',
      //           name: 'SystemRole',
      //           component: () => import('@/views/role/RoleList'),
      //           meta: { title: '角色列表2', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/permission-list',
      //           name: 'PermissionList',
      //           component: () => import('@/views/other/PermissionList'),
      //           meta: { title: '权限列表', keepAlive: true }
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
