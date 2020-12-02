import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

const locale = {
  'input.user.search': '/api/user-input',
  'input.customer.search': '/api/customer-input',
  'input.project.search': '/api/input-project',
  'input.valve.parts.search': '/api/input-search-valve-parts/oo',
  'message': '-',
  'menu.home': '主页',
  'menu.dashboard': '仪表盘',
  'menu.dashboard.analysis': '分析页',
  'menu.dashboard.monitor': '监控页',
  'menu.dashboard.workplace': '工作台',
  'menu.report': '报告',

  'app.flow.repair.start': '新建工单',
  'app.flow.repair.receipt': '收货',
  'app.flow.repair.intoFactoryCheck': '入厂检查',
  'app.flow.repair.preRepairTest': '维修前测试',
  'app.flow.repair.tearDown': '拆解',
  'app.flow.repair.assessment': '评估',
  'app.flow.repair.repair': '修理',
  'app.flow.repair.assemble': '组装',
  'app.flow.repair.installActuator': '安装执行机构',
  'app.flow.repair.leakPressureTest': '测漏试压',
  'app.flow.repair.installSlave': '安装附件',
  'app.flow.repair.adjust': '调校',
  'app.flow.repair.RepairConfirm': '维修确认',
  'app.flow.repair.finalCheck': '最终检查',
  'app.repair.report.delete.img': '确定要删除这张照片吗?',

  'app.title': '赛来科技',
  'app.button.cancel': '取消',
  'app.button.confirm': '确定',
  'app.note.selectuser': '请选择人员',
  'app.table.title.name': '姓名',
  'app.table.title.jobNumber': '工号',
  'app.button.add': '加入',
  'app.login.welcome': '欢迎',
  'app.login.welcome.back': '，欢迎回来',
  'app.login.welcome.goodMorning': '早上好',

  'menu.project': '工程',
  'menu.project.new': '新建维修工程',
  'menu.project.edit': '编辑维修工程',
  'menu.project.new.valveNumber': '阀门数量',
  'menu.project.new.contractTotal': '合同金额',
  'menu.project.new.estWorkTime': '预计工时(人/天)',
  'menu.project.new.partsPurchaseNumber': '备件采购订单号',
  'menu.project.new.repairShop.require': '请选择维修车间',
  'menu.project.new.customerName.require': '请输入客户名称',
  'menu.project.new.salesName.require': '请输入销售名称',
  'menu.project.new.projectNumber.require': '请输入工程编号',
  'menu.project.new.valveNumber.require': '请输入阀门数量',
  'menu.project.new.contractTotal.require': '请输入合同金额',

  'menu.project.repairProjectDetail': '维修工程详情',
  'menu.project.detail.info': '工程信息',
  'menu.project.detail.serial': '工程序号',
  'menu.project.detail.estStartDate': '预计开工日期',
  'menu.project.detail.estCloseDate': '预计完工日期',
  'menu.project.detail.estWorkTime': '预计工时',
  'menu.project.detail.estMaterialCost': '预计材料费',
  'menu.project.detail.repairShop': '维修车间',
  'menu.project.detail.repairShop.item1': '成都车间',
  'menu.project.detail.repairShop.item2': '榆林车间',
  'menu.project.detail.repairNumber': '维修数量',
  'menu.project.detail.projectOwner': '工程创建者',
  'menu.project.detail.contractInfo': '合同信息',
  'menu.project.detail.contractNumber': '合同号',
  'menu.project.view.query.projectSerial': '工程编号',
  'menu.project.view.query.contractSerial': '合同编号',
  'menu.project.view.query.projectState': '工程状态',
    'menu.project.view.query.projectState.item1': '未完工',
    'menu.project.view.query.projectState.item2': '已完工',
    'menu.project.view.query.projectState.item3': '完工重开',
  'menu.project.view.query.projectDate': '工程日期',
  'menu.project.view.query.sales': '销售人员',
  'menu.project.view.query.customerName': '客户名称',
  'menu.project.view.query.customerEnName': '客户英文名称',
  'menu.project.view.query.query': '查询',
  'menu.project.view.query.reset': '重置',
  'menu.project.view.query.collapse': '收起',
  'menu.project.view.query.unfold': '展开',
  'menu.project.view.newproject': '新建',
  'menu.project.view.action.detail': '详细',
  'menu.project.view.action.delete': '删除',
  'menu.project.view.action.report': '报告',
  'menu.project.view.action.more': '更多',
  'menu.project.view.action.print': '打印',
  'menu.project.view.action.qrcode': '二维码',
  'menu.project.view.table.column.date': '日期',
  'menu.project.view.table.column.customerName': '客户名称',
  'menu.project.view.table.column.sales': '销售',
  'menu.project.view.table.column.contractNumber': '合同编号',
  'menu.project.view.table.column.projectNumber': '工程编号',
  'menu.project.view.table.column.total': '金额',
  'menu.project.view.table.column.state': '工程状态',
  'menu.project.view.table.column.action': '操作',
  'menu.project.view.table.column.state.item1': '未完工',
  'menu.project.view.table.column.state.item2': '已完工',
  'menu.project.view.table.column.state.item3': '完工重开',
  'menu.project.delete.note.1': '确定要删除 “',
  'menu.project.delete.note.2': '” 工程，同时会将工程下的所有工单信息一并删除？',
  'menu.project.delete.successful': '删除成功',

  'menu.workOrder': '工单',
  'menu.workOrder.repair.workOrderDetail': '工单详细',
  'menu.workOrder.workOrderList.query.date': '工单日期',
  'menu.workOrder.workOrderList.query.processStatus': '流程状态',
  'menu.workOrder.workOrderList.flow': '流程',
  'menu.workOrder.workOrderList.changeflow': '更改流程',
  'menu.workOrder.workOrderList.query.processStatus.item1': '未执行',
  'menu.workOrder.workOrderList.query.processStatus.item2': '正在处理',
  'menu.workOrder.workOrderList.query.processStatus.item3': '结束',
  'menu.workOrder.repair.workOrderList.action.dispatch': '派员',
  'menu.workOrder.repair.workOrderList.action.execution': '执行',
  'menu.workOrder.repair.workOrderList.title.workordernumber': '工单编号',
  'menu.workOrder.repair.workOrderList.title.currentFlow': '当前流程',
  'menu.workOrder.repair.workOrderList.title.operator': '操作人员',
  'menu.workOrder.upload.img': '上传照片',

  'menu.user': '用户',
  'menu.user.logout': '退出登录',
  'menu.user.logout.confirm': '确定要退出登录？',
  'menu.user.login.fail': '登录失败',
  'menu.user.login.username.password.fail': '用户名或密码不正确',
  'menu.user.auth.fail': '认证失败',
  'menu.user.change.password': '更改密码',
  'menu.user.change.old.password': '旧密码',
  'menu.user.change.new.password1': '新密码',
  'menu.user.change.new.password2': '重复密码',
  'menu.user.auth.fail.description': '用户身份认证失败',
  'menu.user.manager.query.jobNumber': '工号',
  'menu.user.manager.query.userState': '用户状态',
  'menu.user.manager.query.userState.item1': '正常',
  'menu.user.manager.query.userState.item2': '禁用',
  'menu.user.manager.action.edit': '编辑',
  'menu.user.manager.action.enable': '启用',
  'menu.user.manager.action.delete.confirm': '是否要删除此用户？',
  'menu.user.manager.new.createUser': '新建用户',
  'menu.user.manager.new.editUser': '编辑用户',
  'menu.user.manager.new.username': '用户名',
  'menu.user.manager.new.position': '职位',
  'menu.user.manager.new.password': '密码',
  'menu.user.manager.new.rePassword': '重复密码',
  'menu.user.manager.new.maintenanceEngineer': '维修工程师',
  'menu.user.manager.department': '部门经理',
  'menu.user.manager.deputy': '副总经理',
  'menu.user.manager.new.successful': '操作成功',
  'menu.user.manager.new.modifySuccessful': '修改成功',
  'menu.user.manager.modify': '修改',
  'menu.user.manager.new.newSuccessful': '新增成功',
  'menu.user.manager.new.passwordInconsistent': '两次输入密码不一致',
  'menu.user.manager.new.username.require': '请输入用户名',
  'menu.user.manager.query.jobNumber.require': '请输入工号',
  'menu.user.manager.new.position.require': '请输入职位',
  'menu.user.manager.old.password.require': '请输入旧密码',
  'menu.user.manager.new.password.require': '请输入密码',
  'menu.user.manager.new.rePassword.require': '再次输入密码',

  'menu.customer': '客户',
  'menu.customer.query.businessCode': '业务代码',
  'menu.customer.query.companyType': '公司类型',
  'menu.customer.query.companyType.item1': '科技',
  'menu.customer.query.companyType.item2': '机械',
  'menu.customer.action.delete.note': '是否要删除此客户？',
  'menu.customer.new.group': '分组',
  'menu.customer.new.finallyUser': '最终用户',
  'menu.customer.new.companyName': '公司名称',
  'menu.customer.new.companyEnName': '公司英文名称',
  'menu.customer.table.title.serial': '序号',
  'menu.customer.new.companyType.require': '请选择公司类型',
  'menu.customer.new.businessCode.require': '请输入业务代码',
  'menu.customer.new.group.require': '请选择公司分组',
  'menu.customer.new.companyName.require': '请输入公司名称',
  'menu.customer.new.companyEnName.require': '请输入公司英文名称',

  'menu.spare_parts': '备品备件',
  'menu.spare_parts.valve': '阀门',
  'menu.spare_parts.parts': '备件',
  'menu.spare_parts.valve.serial': '序列号',
  'menu.spare_parts.valve.tag': '位号',
  'menu.spare_parts.valve.size': '阀门尺寸',
  'menu.spare_parts.valve.model': '阀型',
  'menu.spare_parts.valve.actuator': '执行机构',
  'menu.spare_parts.valve.medium': '介质',
  'menu.spare_parts.valve.pressure_level': '压力等级',
  'menu.spare_parts.valve.body_material': '阀体材质',
  'menu.spare_parts.valve.stem_material': '阀杆材质',
  'menu.spare_parts.valve.spool_material': '阀芯材质',
  'menu.spare_parts.valve.seat_material': '阀座材质',
  'menu.spare_parts.valve.cage_material': '阀笼材质',
  'menu.spare_parts.valve.flow_characteristics': '流量特性',
  'menu.spare_parts.valve.leakage_level': '泄漏等级',
  'menu.spare_parts.valve.packing_type': '填料类型',
  'menu.spare_parts.valve.travel': '行程',
  'menu.spare_parts.valve.benchset': 'Benchset',
  'menu.spare_parts.valve.device': '装置',
  'menu.spare_parts.valve.use': '用途',
  'menu.spare_parts.valve.attachment': '附件',
  'menu.spare_parts.valve.order_number': '阀门订单号',
  'menu.spare_parts.valve.memo': '备注',
  'menu.spare_parts.excel_import': 'Excel导入',

  'menu.spare_parts.parts.valve_model': '阀门型号',
  'menu.spare_parts.parts.actuator_model': '执行机构型号',
  'menu.spare_parts.parts.pound_class': '磅级',
  'menu.spare_parts.parts.special_trims': '特殊阀内件',
  'menu.spare_parts.parts.recommended_maintenance_level': '推荐维修等级',
  'menu.spare_parts.parts.packing': '填料',
  'menu.spare_parts.parts.gasket': '垫片',
  'menu.spare_parts.parts.seatring': '阀座环',
  'menu.spare_parts.parts.spoolsstem': '阀芯阀杆',
  'menu.spare_parts.parts.bearing': '阀芯密封环',
  'menu.spare_parts.parts.cage': '阀笼',
  'menu.spare_parts.parts.diaphragm': '执行机构膜片',
  'menu.spare_parts.parts.recommended_parts': '推荐备件',
  'menu.spare_parts.parts.recommended_number': '推荐数量',

  'menu.repair.repairbefore.image.title': '维修前图片',
  'menu.repair.repairafter.image.title': '维修后图片',

  'menu.permission': '权限',
  'menu.permission.rolegroup': '用户组',
  'menu.permission.member': '成员',
  'menu.permission.role.manager.require': '请输入用户组',
  'menu.permission.role.manager.delete.confirm': '确定要删除用户组',
  'permissionid.project': '工程管理',
  'permissionid.repairWorkOrder': '维修工单列表',
  'permissionid.user': '用户管理',
  'permissionid.customer': '客户管理',
  'permissionid.permission': '权限管理',
  'permissionid.permission.set': '权限设置'
}

export default {
  ...components,
  ...locale
}
