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
            meta: { title: '编辑收货工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑入厂检查工单', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/IntoFactoryCheck-detail',
            name: 'detailIntoFactoryCheck',
            hidden: true,
            component: () => import('@/views/step/repair/IntoFactoryCheck/IntoFactoryCheckDetail'),
            meta: { title: '入厂检查工单详情', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== PreRepairTest ==============================
          {
            path: '/step/PreRepairTest',
            name: 'preRepairTest',
            hidden: true,
            component: () => import('@/views/step/repair/PreRepairTest/EditPreRepairTest'),
            meta: { title: '编辑维修前测试工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑拆解工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑评估工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑修理工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑组装工单', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/Assemble-detail',
            name: 'assembleDetail',
            hidden: true,
            component: () => import('@/views/step/repair/Assemble/AssembleDetail'),
            meta: { title: '编辑组装工单', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== InstallActuator ==============================
          {
            path: '/step/InstallActuator',
            name: 'installActuator',
            hidden: true,
            component: () => import('@/views/step/repair/InstallActuator/EditInstallActuator'),
            meta: { title: '编辑安装执行机构工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑测漏试压工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑安装附件工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑调校工单', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/Adjust-detail',
            name: 'adjustDetail',
            hidden: true,
            component: () => import('@/views/step/repair/Adjust/AdjustDetail'),
            meta: { title: '编辑调校工单', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== RepairConfirm ===========================
          {
            path: '/step/RepairConfirm',
            name: 'repairConfirm',
            hidden: true,
            component: () => import('@/views/step/repair/RepairConfirm/EditRepairConfirm'),
            meta: { title: '编辑维修确认工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑最终检查工单', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/FinalCheck-detail',
            name: 'finalCheckDetail',
            hidden: true,
            component: () => import('@/views/step/repair/FinalCheck/FinalCheckDetail'),
            meta: { title: '最终检查工单详细', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== 定位器-LocatorIntoFactoryCheck ==============================
          {
            path: '/step/LocatorIntoFactoryCheck',
            name: 'locatorIntoFactoryCheck',
            hidden: true,
            component: () => import('@/views/step/locator/IntoFactoryCheck/EditIntoFactoryCheck'),
            meta: { title: '编辑定位器入厂检查工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑定位器维修前测试工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑定位器评估工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑定位器维修工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑定位器调校工单', keepAlive: false, permission: [ 'dashboard' ] }
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
        meta: { title: 'menu.project', keepAlive: true, icon: 'project', permission: [ 'dashboard' ] },
        children: [
          {
            path: '/project/project-list/:pageNo([1-9]\\d*)?',
            name: 'projectList',
            component: () => import('@/views/project/ProjectList'),
            meta: { title: 'permissionid.project', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/project/project-detail',
            name: 'ProjectDetail',
            hidden: true,
            component: () => import('@/views/project/ProjectDetail'),
            meta: { title: 'menu.project.repairProjectDetail', keepAlive: false, permission: [ 'dashboard' ] }
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
          {
            path: '/step/steplist',
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
          // ================================== Receipt ==============================
          {
            path: '/step/Receipt',
            name: 'editReceiptStep',
            hidden: true,
            component: () => import('@/views/step/repair/Receipt/EditReceiptForm'),
            meta: { title: '编辑收货工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑入厂检查工单', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/IntoFactoryCheck-detail',
            name: 'detailIntoFactoryCheck',
            hidden: true,
            component: () => import('@/views/step/repair/IntoFactoryCheck/IntoFactoryCheckDetail'),
            meta: { title: '入厂检查工单详情', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== PreRepairTest ==============================
          {
            path: '/step/PreRepairTest',
            name: 'preRepairTest',
            hidden: true,
            component: () => import('@/views/step/repair/PreRepairTest/EditPreRepairTest'),
            meta: { title: '编辑维修前测试工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑拆解工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑评估工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑修理工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑组装工单', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/Assemble-detail',
            name: 'assembleDetail',
            hidden: true,
            component: () => import('@/views/step/repair/Assemble/AssembleDetail'),
            meta: { title: '编辑组装工单', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== InstallActuator ==============================
          {
            path: '/step/InstallActuator',
            name: 'installActuator',
            hidden: true,
            component: () => import('@/views/step/repair/InstallActuator/EditInstallActuator'),
            meta: { title: '编辑安装执行机构工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑测漏试压工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑安装附件工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑调校工单', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/Adjust-detail',
            name: 'adjustDetail',
            hidden: true,
            component: () => import('@/views/step/repair/Adjust/AdjustDetail'),
            meta: { title: '编辑调校工单', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // ================================== RepairConfirm ===========================
          {
            path: '/step/RepairConfirm',
            name: 'repairConfirm',
            hidden: true,
            component: () => import('@/views/step/repair/RepairConfirm/EditRepairConfirm'),
            meta: { title: '编辑维修确认工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑最终检查工单', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/step/FinalCheck-detail',
            name: 'finalCheckDetail',
            hidden: true,
            component: () => import('@/views/step/repair/FinalCheck/FinalCheckDetail'),
            meta: { title: '最终检查工单详细', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑定位器入厂检查工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑定位器维修前测试工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑定位器评估工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑定位器维修工单', keepAlive: false, permission: [ 'dashboard' ] }
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
            meta: { title: '编辑定位器调校工单', keepAlive: false, permission: [ 'dashboard' ] }
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
      // 备品备件
      // ================================== 备品备件 ==============================
      {
        path: '/spareparts',
        name: 'spareparts',
        component: RouteView,
        meta: { title: 'menu.spare_parts', keepAlive: true, icon: 'idcard', permission: [ 'dashboard' ] },
        redirect: '/spareparts/valve-list',
        children: [
          {
            path: '/spareparts/valve-list',
            name: 'sparepartsValveList',
            component: () => import('@/views/spareparts/ValveList'),
            meta: { title: 'menu.spare_parts.valve', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/spareparts/spareparts-list',
            name: 'sparepartsList',
            component: () => import('@/views/spareparts/PartsList'),
            meta: { title: 'menu.spare_parts.parts', keepAlive: false, permission: [ 'dashboard' ] }
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
