<template>
  <pro-layout
    :title="$t('app.title')"
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    :logo="logoRender"
    :i18nRender="i18nRender"
    v-bind="settings"
  >
    <router-view />
  </pro-layout>
</template>

<script>
  // import { SettingDrawer, updateTheme } from '@ant-design-vue/pro-layout'
  import { getStepParameter } from '@/api/mGetParam'
  import { stepEdit } from '@/api/step'
  import { i18nRender } from '@/locales'
  import { mapState } from 'vuex'
  import { SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from '@/store/mutation-types'

  import defaultSettings from '@/config/defaultSettings'
  import RightContent from '@/components/GlobalHeader/RightContent'
  import GlobalFooter from '@/components/GlobalFooter'
  import LogoSvg from '../assets/logo.svg?inline'

  export default {
    name: 'AndroidLayout',
    components: {
      // SettingDrawer,
      RightContent,
      GlobalFooter
    },
    data () {
      return {
        // base
        menus: [],
        // 侧栏收起状态
        collapsed: false,
        settings: {
          // 布局类型
          layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
          // 定宽: true / 流式: false
          contentWidth: defaultSettings.layout === 'sidemenu' ? false : defaultSettings.contentWidth === 'Fixed',
          // 主题 'dark' | 'light'
          theme: defaultSettings.navTheme,
          // 主色调
          primaryColor: defaultSettings.primaryColor,
          fixedHeader: defaultSettings.fixedHeader,
          fixSiderbar: defaultSettings.fixSiderbar,
          colorWeak: defaultSettings.colorWeak,
          siderWidth: 0,
          breadcrumbRender: {},
          headerRender: {},
          footerRender: () => {},

          hideHintAlert: false,
          hideCopyButton: false,
          interval: 0
        },
        // 媒体查询
        query: {},

        // 是否手机模式
        isMobile: true
      }
    },
    computed: {
      ...mapState({
        // 动态主路由
        mainMenu: state => state.permission.addRouters
      })
    },
    created () {
      const routes = this.mainMenu.find(item => item.path === '/')
      this.menus = (routes && routes.children) || []
      // 处理侧栏收起状态
      this.$watch('collapsed', () => {
        this.$store.commit(SIDEBAR_TYPE, this.collapsed)
      })
      this.$watch('isMobile', () => {
      })
    },
    mounted () {
      const size = 0.65
      document.body.style.zoom = size
      document.body.style.cssText += '; -moz-transform: scale(' + size + ');-moz-transform-origin: 0 0;'
      // 直接指定为移动端
      this.$store.commit(TOGGLE_MOBILE_TYPE, true)
      // startStepPage 挂载到window上供flutter调用
      window.startStepPage = this.startStepPage
      // 移动端扫码查看工单视细数据
      window.viewStepDetail = this.viewStepDetail
      // eslint-disable-next-line no-undef
      callFlutterStartStepPage.postMessage('call from vue startsteppage')

      const userAgent = navigator.userAgent
      if (userAgent.indexOf('Edge') > -1) {
        this.$nextTick(() => {
          this.collapsed = !this.collapsed
          setTimeout(() => {
            this.collapsed = !this.collapsed
          }, 16)
        })
      }

      // first update color
      // updateTheme(this.settings.primaryColor)
    },
    methods: {
      i18nRender,
      handleMediaQuery (val) {
        this.query = val
        if (this.isMobile && !val['screen-xs']) {
          this.isMobile = false
          return
        }
        if (!this.isMobile && val['screen-xs']) {
          this.isMobile = false
          this.collapsed = false
          this.settings.contentWidth = false
          // this.settings.fixSiderbar = false
        }
      },
      handleCollapse (val) {
        this.collapsed = false
      },
      handleSettingChange ({ type, value }) {
        console.log('type', type, value)
        type && (this.settings[type] = value)
        switch (type) {
          case 'contentWidth':
            this.settings[type] = value === 'Fixed'
            break
          case 'layout':
            if (value === 'sidemenu') {
              this.settings.contentWidth = false
            } else {
              this.settings.fixSiderbar = false
              this.settings.contentWidth = true
            }
            break
        }
      },
      logoRender () {
        return <LogoSvg />
      },
      startStepPage (cookie) {
        document.cookie = cookie
        // this.$cookies.set('sino_sr_server_mobile_session', 'MTYwNDI0MTE4NHxEdi1CQkFFQ180SUFBUkFCRUFBQV80WF9nZ0FCQm5OMGNtbHVad3dqQUNGemFXNXZYM055WDI5aGRYUm9NbDl6WlhKMlpYSmZiVzlpYVd4bFgzVnpaWElhS25ObGMzTnBiMjR1VFc5aWFXeGxWWE5sY2xObGMzTnBiMjdfaFFNQkFSRk5iMkpwYkdWVmMyVnlVMlZ6YzJsdmJnSF9oZ0FCQWdFR1JteHZkMGxFQVF3QUFRdERkWEp5Wlc1MFUzUmxjQUVNQUFBQU1fLUdNQUVrTXpNeU1XVTRaVFV0T1RVMk5TMDBOelEzTFdKaVpUa3ROemhsT0Rrd09XRTBPR1E0QVFkU1pXTmxhWEIwQUE9PXyPg_IDm6Si7DmGDo92L-34oXKaF3xc03YDqmBT7ZLTZg==', 'Sun, 08 Nov 2020 14:33:04 GMT')

        // 获取移动端点击流程参数
        getStepParameter().then(res => {
          if (res.current_step_text === '(end)') {
            this.$router.push({ path: `/step/mobilestepdetail/${res.id}` })
          } else {
            // 获取流程数据
            stepEdit({ id: res.id, current_step: res.current_step_text }).then(stepData => {
              this.$store.commit('SET_UPLOAD_MD5', [])
              this.$store.commit('SET_STEP_EDIT_DATA', stepData.result)
              this.$router.push({ path: '/step/' + res.current_step_text })
            })
          }
        })
      },
      viewStepDetail (cookie, flowID) {
        document.cookie = cookie
        this.$router.push({ path: `/step/mobilestepdetail/${flowID}` })
      }
    }
  }

// document.cookie = 'sino_sr_server_mobile_session=MTU5ODIzNDgyM3xEdi1CQkFFQ180SUFBUkFCRUFBQV80WF9nZ0FCQm5OMGNtbHVad3dqQUNGemFXNXZYM055WDI5aGRYUm9NbDl6WlhKMlpYSmZiVzlpYVd4bFgzVnpaWElhS25ObGMzTnBiMjR1VFc5aWFXeGxWWE5sY2xObGMzTnBiMjdfZ3dNQkFSRk5iMkpwYkdWVmMyVnlVMlZ6YzJsdmJnSF9oQUFCQWdFR1JteHZkMGxFQVF3QUFRdERkWEp5Wlc1MFUzUmxjQUVNQUFBQVBQLUVPUUVrWTJZek5XWTBOMlF0TkRCa1ppMDBOREF5TFRobFltRXROVEUxTVRnME5tWTRObUU0QVJCSmJuUnZSbUZqZEc5eWVVTm9aV05yQUE9PXwU_x0yYKnIXr8s1Jndu1qWiMZqzEZH7S32fItbUjYjdw==; Expires=Mon, 31 Aug 2020 02:07:03 GMT; Max-Age=604800; Path=/; '
//  getStepParameter()
//   function openStepPage (model) {
//     if (!model) { return }
//     getStepParameter().then(res => {
//       // 获取流程数据
//       queryStepData({ id: res.id, current_step: res.current_step_text }).then(stepData => {
//         this.$store.commit('SET_UPLOAD_MD5', [])
//         this.$store.commit('SET_STEP_EDIT_DATA', stepData.result)
//         this.$router.push({ path: '/step/' + res.current_step_text })
//       })
//     })
//   }

</script>

<style lang="less">
@import "./BasicLayout.less";
</style>
