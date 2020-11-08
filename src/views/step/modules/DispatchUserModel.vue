<template>
  <a-modal
    :title="$t('menu.workOrder.repair.workOrderList.action.dispatch')"
    :width="800"
    style="height:600px"
    :visible="visible"
    :destroyOnClose="true"
    :maskClosable="false"
    @ok="() => { $emit('cancel') }"
    @cancel="() => { $emit('cancel') }"
  >
    <DispatchUser :flowID="flowID" :currentStep="currentStep" />
  </a-modal>

</template>

<script>
import DispatchUser from './DispatchUser'

export default {
    components: {
        DispatchUser
    },
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        flowID: {
            type: String,
            default: '',
            required: true
        },
        currentStep: {
            type: String,
            default: '',
            required: true
        }
    }
}
</script>
