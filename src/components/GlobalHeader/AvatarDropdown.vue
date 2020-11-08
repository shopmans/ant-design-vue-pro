<template>
  <div>
    <a-dropdown v-if="currentUser && currentUser.name" placement="bottomRight">
      <span class="ant-pro-account-avatar">
        <a-avatar size="small" src="" class="antd-pro-global-header-index-avatar" />
        <span>{{ currentUser.name }}</span>
      </span>
      <template v-slot:overlay>
        <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
          <a-menu-item key="logout" @click="handleLogout">
            <a-icon type="logout" />
            {{ $t("menu.user.logout") }}
          </a-menu-item>
          <a-menu-item key="changePwd" @click="handleChangePassword">
            <a-icon type="lock" />
            {{ $t("menu.user.change.password") }}
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <span v-else>
      <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
    </span>
    <!-- 退出登录确认对话框 -->
    <a-modal v-model="visible" :title="$t('menu.user.logout')" @ok="logoutHandleOk">
      <p>{{ $t('menu.user.logout.confirm') }}</p>
    </a-modal>

    <!-- 更改密码对话框 -->
    <a-modal v-model="changePwdVisible" :maskClosable="false" :title="$t('menu.user.change.password')" @ok="changePwdHandleOk">
      <a-form :form="form">
        <a-form-item :label="$t('menu.user.change.old.password')">
          <a-input-password v-decorator="[ 'old_password', {rules: [{ required: true, message: $t('menu.user.manager.old.password.require')}]} ]" />
        </a-form-item>
        <a-form-item :label="$t('menu.user.change.new.password1')">
          <a-input-password v-decorator="[ 'new_password1', {rules: [{ required: true, message: $t('menu.user.manager.new.password.require')}]} ]" />
        </a-form-item>
        <a-form-item :label="$t('menu.user.change.new.password2')">
          <a-input-password v-decorator="[ 'new_password2', {rules: [{ required: true, message: $t('menu.user.manager.new.rePassword.require')}]} ]" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { changePassword } from '@/api/user'
import md5 from 'md5'

export default {
  name: 'AvatarDropdown',
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      changePwdVisible: false
    }
  },
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleToCenter () {
      this.$router.push({ path: '/account/center' })
    },
    handleToSettings () {
      this.$router.push({ path: '/account/settings' })
    },
    handleLogout (e) {
      this.visible = true
    },
    handleChangePassword () {
      this.changePwdVisible = true
    },
    changePwdHandleOk (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.old_password = md5(values.old_password)
          values.new_password1 = md5(values.new_password1)
          values.new_password2 = md5(values.new_password2)

          changePassword(values).then(res => {
            this.changePwdVisible = false
            this.form.resetFields()
            this.$message.info('密码更改成功')
          })

          // values.flow_id = this.flowID
          // values.current_step = this.currentStep
          // values.save_user_id = this.$store.state.user.info.id
          // values.uploads = this.$refs.uploadImg.imgFileList

          // saveAssembleData(values).then(res => {
          //   // 清空数据
          //   this.$store.commit('SET_STEP_EDIT_DATA', null)
          //   // 刷新表格
          //   this.$router.push({ path: '/step/steplist' })
          //   this.$message.info('保存成功')

          //   // 重置表单数据
          //   this.form.resetFields()
          // })
        }
      })
    },
    logoutHandleOk () {
      return this.$store.dispatch('Logout').then(e => {
        window.location.reload()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
