import antdEnUS from 'ant-design-vue/es/locale-provider/en_US'
import momentEU from 'moment/locale/eu'

const components = {
  antLocale: antdEnUS,
  momentName: 'eu',
  momentLocale: momentEU
}

const locale = {
  'message': '-',
  'menu.home': 'Home',
  'menu.dashboard': 'Dashboard',
  'menu.dashboard.analysis': 'Analysis',
  'menu.dashboard.monitor': 'Monitor',
  'menu.dashboard.workplace': 'Workplace',
  'menu.report': 'Report',
  'menu.review': 'Review',

  'app.flow.repair.start': 'Start',
  'app.flow.repair.query': 'Query',
  'app.flow.repair.receipt': 'Receipt',
  'app.flow.repair.receipt.date': 'Receipt Date',
  'app.flow.repair.receipt.date.start': 'Start Receipt Date',
  'app.flow.repair.receipt.date.end': 'End Receipt Date',
  'app.flow.repair.intoFactoryCheck': 'IntoFactoryCheck',
  'app.flow.repair.preRepairDiag': 'PreRepairDiag',
  'app.flow.repair.afterRepairDiag': 'AfterRepairDiag',
  'app.flow.repair.preRepairTest': 'PreRepairTest',
  'app.flow.repair.tearDown': 'TearDown',
  'app.flow.repair.assessment': 'Assessment',
  'app.flow.repair.repair': 'Repair',
  'app.flow.repair.assemble': 'Assemble',
  'app.flow.repair.installActuator': 'InstallActuator',
  'app.flow.repair.leakPressureTest': 'LeakPressureTest',
  'app.flow.repair.installSlave': 'InstallSlave',
  'app.flow.repair.adjust': 'Adjust',
  'app.flow.repair.RepairConfirm': 'RepairConfirm',
  'app.flow.repair.finalCheck': 'FinalCheck',
  'app.flow.repair.packingDelivery': 'PackingDelivery',
  'app.flow.repair.packingDelivery2': 'PackingDelivery',
  'app.repair.report.delete.img': 'Are you sure delete this image?',

  'app.title': 'Sino Controls',
  'app.button.cancel': 'Cancel',
  'app.button.confirm': 'OK',
  'app.note.selectuser': 'Please select personnel',
  'app.table.title.name': 'Name',
  'app.table.title.jobNumber': 'Job Number',
  'app.button.add': 'Add',
  'app.login.welcome': 'Welcome',
  'app.login.welcome.back': 'Welcome Back',
  'app.login.welcome.goodMorning': 'Good Morning',

  'menu.project': 'Project',
  'menu.project.new': 'New Maintenance Project',
  'menu.project.new.valveNumber': 'Number of valves',
  'menu.project.new.contractTotal': 'Contract amount',
  'menu.project.new.estWorkTime': 'Est Working Hours(Per/Day)',
  'menu.project.new.partsPurchaseNumber': 'Spare parts purchase number',
  'menu.project.new.repairShop.require': 'Please select a repair shop',
  'menu.project.new.customerName.require': 'Please enter customer name',
  'menu.project.new.salesName.require': 'Please enter the sales name',
  'menu.project.new.projectNumber.require': 'Please enter the project number',
  'menu.project.new.valveNumber.require': 'Please enter the number of valves',
  'menu.project.new.contractTotal.require': 'Please enter the contract amount',

  'menu.project.repairProjectDetail': 'Maintenance detailed',
  'menu.project.detail.info': 'Project Information',
  'menu.project.detail.serial': 'Project Serial',
  'menu.project.detail.estStartDate': 'Est Open Date',
  'menu.project.detail.estCloseDate': 'Est Close Date',
  'menu.project.detail.reqCloseDate': 'Req Close Date',
  'menu.project.detail.closeDate': 'Close Date',
  'menu.project.detail.closeDate.start': 'Start Close Date',
  'menu.project.detail.closeDate.end': 'End Close Date',
  'menu.project.detail.estWorkTime': 'Est Working Hours',
  'menu.project.detail.total.WorkTime': 'Total Working Hours',
  'menu.project.detail.estMaterialCost': 'Est Material Cost',
  'menu.project.detail.repairShop': 'Repair Shop',
  'menu.project.detail.repairShop.item1': 'ChengDu Workshop',
  'menu.project.detail.repairShop.item2': 'YuLin Workshop',
  'menu.project.detail.repairShop.item3': 'User Site',
  'menu.project.detail.repairShop.item4': 'Online Repair',
  'menu.project.detail.repairNumber': 'Repair Number',
  'menu.project.detail.projectOwner': 'Project Owner',
  'menu.project.detail.contractInfo': 'Contract Information',
  'menu.project.detail.contractNumber': 'Contract Number',
  'menu.project.view.query.projectSerial': 'Project Number',
  'menu.project.view.query.contractSerial': 'Contract Number',
  'menu.project.view.query.projectState': 'Project Status',
    'menu.project.view.query.projectState.item1': 'Unfinished',
    'menu.project.view.query.projectState.item2': 'Finished',
    'menu.project.view.query.projectState.item3': 'Reopen',
  'menu.project.view.query.projectDate': 'Project Date',
  'menu.project.view.query.sales': 'Sales',
  'menu.project.view.query.customerName': 'Customer Name',
  'menu.project.view.query.customerEnName': 'Customer English Name',
  'menu.project.view.query.query': 'Query',
  'menu.project.view.query.reset': 'Reset',
  'menu.project.view.query.collapse': 'Collapse',
  'menu.project.view.query.unfold': 'Unfold',
  'menu.project.view.newproject': 'New',
  'menu.project.view.action.detail': 'Detail',
  'menu.project.view.action.delete': 'Delete',
  'menu.project.view.action.description': 'View',
  'menu.project.view.action.project.description': 'Description',
  'menu.project.view.action.description.title': 'View Project',
  'menu.project.view.action.report': 'Report',
  'menu.project.view.action.more': 'More',
  'menu.project.view.action.print': 'Print',
  'menu.project.view.action.qrcode': 'Qrcode',
  'menu.project.view.table.column.date': 'Date',
  'menu.project.view.table.column.customerName': 'CustomerName',
  'menu.project.view.table.column.sales': 'Sales',
  'menu.project.view.table.column.contractNumber': 'Contract Number',
  'menu.project.view.table.column.projectNumber': 'Project Number',
  'menu.project.view.table.column.part.manager': 'Department manager',
  'menu.project.view.table.column.deputy.general.manager': 'Deputy General Manager',
  'menu.project.view.table.column.total': 'Total',
  'menu.project.view.table.column.state': 'Status',
  'menu.project.view.table.column.action': 'Action',
  'menu.project.view.table.column.state.item1': 'Unfinished',
  'menu.project.view.table.column.state.item2': 'Finished',
  'menu.project.view.table.column.state.item3': 'Reopen',
  'menu.project.delete.note.1': 'Are you sure you want to delete ? "',
  'menu.project.delete.note.2': '" At the same time, all the work order information under the project will be deleted',
  'menu.project.delete.successful': 'successfully deleted',
  'menu.project.current.state': 'Current State',
  'menu.project.principal1': 'Principal1',
  'menu.project.principal2': 'Principal2',
  'menu.project.principal3': 'Principal3',

  'menu.workOrder': 'Work Order',
  'menu.workOrder.repair.workOrderDetail': 'Work Order Description',
  'menu.workOrder.workOrderList.query.date': 'Work Order Date',
  'menu.workOrder.workOrderList.query.processStatus': 'Process Status',
  'menu.workOrder.workOrderList.flow': 'Flow',
  'menu.workOrder.workOrderList.changeflow': 'Change Flow',
  'menu.workOrder.workOrderList.query.processStatus.item1': 'Not performed',
  'menu.workOrder.workOrderList.query.processStatus.item2': 'Processing',
  'menu.workOrder.workOrderList.query.processStatus.item3': 'Done',
  'menu.workOrder.repair.workOrderList.action.dispatch': 'Dispatch',
  'menu.workOrder.repair.workOrderList.action.execution': 'Execution',
  'menu.workOrder.repair.workOrderList.title.workordernumber': 'Work Order',
  'menu.workOrder.repair.workOrderList.title.currentFlow': 'Current Flow',
  'menu.workOrder.repair.workOrderList.title.operator': 'Operator',
  'menu.workOrder.upload.img': 'Upload Image',

  'menu.user': 'User',
  'menu.user.logout': 'Logout',
  'menu.user.logout.confirm': 'Are you sure you want to log out?',
  'menu.user.login.fail': 'Login Fail',
  'menu.user.login.username.password.fail': 'Incorrect username or password',
  'menu.user.auth.fail': 'Unauthorized',
  'menu.user.change.password': 'Change Password',
  'menu.user.change.old.password': 'Old Password',
  'menu.user.change.new.password1': 'New Password',
  'menu.user.change.new.password2': 'Confrim Password',
  'menu.user.auth.fail.description': 'Authorization verification failed',
  'menu.user.manager': 'Uesr Manager',
  'menu.user.manager.query.jobNumber': 'Job Number',
  'menu.user.manager.query.userState': 'User Status',
  'menu.user.manager.query.userState.item1': 'Normal',
  'menu.user.manager.query.userState.item2': 'Disable',
  'menu.user.manager.action.edit': 'Edit',
  'menu.user.manager.action.enable': 'Enable',
  'menu.user.manager.action.delete.confirm': 'Do you want to delete this user?',
  'menu.user.manager.new.createUser': 'Create User',
  'menu.user.manager.new.editUser': 'Edit user',
  'menu.user.manager.new.username': 'User Name',
  'menu.user.manager.new.position': 'Position',
  'menu.user.manager.new.password': 'Password',
  'menu.user.manager.new.rePassword': 'Repeat password',
  'menu.user.manager.new.maintenanceEngineer': 'Maintenance Engineer',
  'menu.user.manager.department': 'Department Manager',
  'menu.user.manager.deputy': 'Deputy General Manager',
  'menu.user.manager.new.successful': 'Success',
  'menu.user.manager.new.modifySuccessful': 'Successful modified',
  'menu.user.manager.new.newSuccessful': 'Added successfully',
  'menu.user.manager.new.passwordInconsistent': 'Two passwords are inconsistent',
  'menu.user.manager.new.username.require': 'Please enter user name',
  'menu.user.manager.query.jobNumber.require': 'Please enter the job number',
  'menu.user.manager.new.position.require': 'Please enter a job title',
  'menu.user.manager.old.password.require': 'Please enter the old password',
  'menu.user.manager.new.password.require': 'Please enter the password',
  'menu.user.manager.new.rePassword.require': 'Enter password again',

  'menu.customer': 'Customer',
  'menu.customer.query.businessCode': 'Customer Code',
  'menu.customer.query.companyType': 'Company type',
  'menu.customer.query.companyType.item1': 'Technology',
  'menu.customer.query.companyType.item2': 'Mechanical',
  'menu.customer.action.delete.note': 'Do you want to delete this customer ?',
  'menu.customer.new.group': 'Group',
  'menu.customer.new.finallyUser': 'Finally User',
  'menu.customer.new.companyName': 'Company Name',
  'menu.customer.new.companyEnName': 'Company English Name',
  'menu.customer.table.title.serial': 'Serial',
  'menu.customer.new.companyType.require': 'Please select company type',
  'menu.customer.new.businessCode.require': 'Please enter the business code',
  'menu.customer.new.group.require': 'Please select company group',
  'menu.customer.new.companyName.require': 'Please enter company name',
  'menu.customer.new.companyEnName.require': 'Please enter the company English name',
  'menu.customer.delete.note.2': '" customer data?',
  'menu.customer.province': 'Province',
  'menu.customer.industry': 'industry',
  'menu.customer.industry.code': 'Industry Code',
  'menu.customer.sales': 'Sales',
  'menu.customer.address': 'Address',
  'menu.customer.group.owner': 'Group',
  'menu.customer.device': 'Device',
  'menu.customer.operation.time': 'Put into operation time',
  'menu.customer.criticality': 'Criticality',
  'menu.customer.installbase.fischer': 'FISCHER Number',
  'menu.customer.installbase.isv': 'ISV Number',
  'menu.customer.installbase.prv': 'PRV Number',
  'menu.customer.installbase.prm': 'PRM Number',
  'menu.customer.installbase.ggc': 'GGC Number',

  'menu.spare_parts': 'Spare Parts Manager',
  'menu.spare_parts.valve': 'Valve',
  'menu.spare_parts.parts': 'Parts',
  'menu.spare_parts.valve.serial': 'Serial',
  'menu.spare_parts.valve.tag': 'Tag',
  'menu.spare_parts.valve.size': 'Size',
  'menu.spare_parts.valve.model': 'Model',
  'menu.spare_parts.valve.actuator': 'Actuator',
  'menu.spare_parts.valve.medium': 'Medium',
  'menu.spare_parts.valve.pressure_level': 'Pressure Level',
  'menu.spare_parts.valve.body_material': 'Body Material',
  'menu.spare_parts.valve.stem_material': 'Stem Material',
  'menu.spare_parts.valve.spool_material': 'Spool Material',
  'menu.spare_parts.valve.seat_material': 'Seat Material',
  'menu.spare_parts.valve.cage_material': 'Cage Material',
  'menu.spare_parts.valve.flow_characteristics': 'Flow Characteristics',
  'menu.spare_parts.valve.leakage_level': 'Leakage Level',
  'menu.spare_parts.valve.packing_type': 'Packing Type',
  'menu.spare_parts.valve.travel': 'Travel',
  'menu.spare_parts.valve.benchset': 'Benchset',
  'menu.spare_parts.valve.device': 'Device',
  'menu.spare_parts.valve.use': 'Use',
  'menu.user.manager.modify': 'Modify',
  'menu.spare_parts.valve.attachment': 'Attachment',
  'menu.spare_parts.valve.order_number': 'Order Number',
  'menu.spare_parts.valve.memo': 'Memo',
  'menu.spare_parts.excel_import': 'Excel Import',
  'menu.spare_parts.excel_export': 'Excel Export',
  'menu.spare_parts.valve.add': 'Add Spare Parts',
  'menu.spare_parts.valve.query': 'Query Spare Parts',
  'menu.spare_parts.valve.import': 'Import Spare Parts',

  'menu.permission': 'Permission',
  'menu.permission.rolegroup': 'Role Group',
  'menu.permission.member': 'Member',
  'menu.permission.role.manager.require': 'Please enter user group',
  'menu.permission.role.manager.delete.confirm': 'Are you sure you want to delete the user group?',

  'permissionid.project': 'Project Manager',
  'permissionid.project.list': 'Project List',
  'permissionid.new.project': 'New Project',
  'permissionid.edit.project': 'Modify Project',
  'permissionid.open.project': 'Open Project',
  'permissionid.export.project': 'Export',
  'permissionid.import.project': 'Import',
  'permissionid.delete.project': 'Delete Project',
  'permissionid.report.project': 'Report',
  'permissionid.report.project.report': 'Project Report',
  'permissionid.repairWorkOrder': 'Open Work Order',
  'permissionid.repairWorkOrder.list': 'work order list',
  'permissionid.repairWorkOrder.done': 'Repair work order done',
  'permissionid.repairWorkOrder.delete': 'Delete work order',
  'permissionid.user': 'Uesr Manager',
  'permissionid.customer': 'Customer manager',
  'permissionid.customer.name': 'Customer list manager',
  'permissionid.customer.list': 'Customer list',
  'permissionid.customer.add': 'Add customer',
  'permissionid.customer.edit': 'Edit customer',
  'permissionid.customer.delete': 'Delete customer',
  'permissionid.permission': 'Permission Manager',
  'permissionid.permission.set': 'Permission Adjust',

  'layouts.usermenu.dialog.title': 'Message',
  'layouts.usermenu.dialog.content': 'Do you really log-out.',

  'menu.repair.repairbefore.image.title': 'Repair before picture',
  'menu.repair.repairafter.image.title': 'Repair after picture',

  'app.setting.pagestyle': 'Page style setting',
  'app.setting.pagestyle.light': 'Light style',
  'app.setting.pagestyle.dark': 'Dark style',
  'app.setting.pagestyle.realdark': 'RealDark style',
  'app.setting.themecolor': 'Theme Color',
  'app.setting.navigationmode': 'Navigation Mode',
  'app.setting.content-width': 'Content Width',
  'app.setting.fixedheader': 'Fixed Header',
  'app.setting.fixedsidebar': 'Fixed Sidebar',
  'app.setting.sidemenu': 'Side Menu Layout',
  'app.setting.topmenu': 'Top Menu Layout',
  'app.setting.content-width.fixed': 'Fixed',
  'app.setting.content-width.fluid': 'Fluid',
  'app.setting.othersettings': 'Other Settings',
  'app.setting.weakmode': 'Weak Mode',
  'app.setting.copy': 'Copy Setting',
  'app.setting.loading': 'Loading theme',
  'app.setting.copyinfo': 'copy success，please replace defaultSettings in src/models/setting.js',
  'app.setting.production.hint': 'Setting panel shows in development environment only, please manually modify',
  'menu.customer.installbase': 'Installbase',
  'menu.customer.rspl': 'RSPL',
  'menu.customer.repair.record': 'Repair Record',
  'menu.customer.regulator.valve': 'Regulator Valve',
  'menu.customer.onoff.valve': 'On-Off Valve',
  'menu.customer.saftey.valve': 'Safety Valve',
  'menu.customer.regulator': 'Regulator',
  'menu.customer.ggc': 'GGC',
  'menu.customer.instrument': 'Instrument',
  'menu.customer.instrument.attachment': 'Instrument',
  'menu.customer.installbase.factory': 'Factory',
  'menu.customer.installbase.brand': 'Brand',
  'import.data.options': 'Import data options',
  'maintenance.progress.report': 'Maintenance progress report',
  'maintenance.status.report': 'Maintenance status report',
  'maintenance.working.hours.report': 'Maintenance working hours report',
  'maintenance.engineering.statistic': 'Engineering Statistic',
  // 参考资料
  'menu.reference': 'Reference',
  'menu.reference.test.standard': 'Test Standard',
  'menu.operation.manual': 'Operation Manual',
  'menu.reference.add': 'Add',
  'menu.reference.open': 'Open',
  'menu.reference.filename': 'Filename',
  'menu.reference.file.delete.confirm': 'Do you want to delete this reference?',
  //
  'menu.step.view': 'View'
}

export default {
  ...components,
  ...locale
}
