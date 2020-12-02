
const repairPartComboboxText = {
    '1': '阀门',
    '2': '执行机构',
    '3': '阀门+执行机构',
    '4': '阀门+执行机构+附件',
    '6': '执行机构+附件',
    '5': '零部件',
    '7': '定位器'
}

// 现场拆装
const disassemblyComboboxText = {
    '1': '是',
    '2': '否'
}

export function getRepairPartComboboxText (val) {
    return repairPartComboboxText[val]
}

export function getDisassemblyComboboxText (val) {
    return disassemblyComboboxText[val]
}
