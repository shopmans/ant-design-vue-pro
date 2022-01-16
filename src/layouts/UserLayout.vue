<template>
  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <div class="container">
      <div class="top">
        <img src="~@/assets/sino.png" class="logo" alt="logo" style="width:150px;">
      </div>
      <div class="top">
        <div class="desc">
          维修服务管理系统
        </div>
      </div>

      <router-view />

      <div class="footer">
        <div class="copyright">
          Copyright &copy; 2020 SinoControls
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deviceMixin } from '@/store/device-mixin'
// import { getStepParameter } from '@/api/mGetParam'

export default {
  name: 'UserLayout',
  mixins: [deviceMixin],
  mounted () {
    // this.$cookies.set('sino_sr_server_mobile_session', 'MTYwNDI0MTE4NHxEdi1CQkFFQ180SUFBUkFCRUFBQV80WF9nZ0FCQm5OMGNtbHVad3dqQUNGemFXNXZYM055WDI5aGRYUm9NbDl6WlhKMlpYSmZiVzlpYVd4bFgzVnpaWElhS25ObGMzTnBiMjR1VFc5aWFXeGxWWE5sY2xObGMzTnBiMjdfaFFNQkFSRk5iMkpwYkdWVmMyVnlVMlZ6YzJsdmJnSF9oZ0FCQWdFR1JteHZkMGxFQVF3QUFRdERkWEp5Wlc1MFUzUmxjQUVNQUFBQU1fLUdNQUVrTXpNeU1XVTRaVFV0T1RVMk5TMDBOelEzTFdKaVpUa3ROemhsT0Rrd09XRTBPR1E0QVFkU1pXTmxhWEIwQUE9PXyPg_IDm6Si7DmGDo92L-34oXKaF3xc03YDqmBT7ZLTZg==', 'Sun, 08 Nov 2020 14:33:04 GMT')
    // document.cookie = 'sino_sr_server_mobile_session=MTYwNDI0MTE4NHxEdi1CQkFFQ180SUFBUkFCRUFBQV80WF9nZ0FCQm5OMGNtbHVad3dqQUNGemFXNXZYM055WDI5aGRYUm9NbDl6WlhKMlpYSmZiVzlpYVd4bFgzVnpaWElhS25ObGMzTnBiMjR1VFc5aWFXeGxWWE5sY2xObGMzTnBiMjdfaFFNQkFSRk5iMkpwYkdWVmMyVnlVMlZ6YzJsdmJnSF9oZ0FCQWdFR1JteHZkMGxFQVF3QUFRdERkWEp5Wlc1MFUzUmxjQUVNQUFBQU1fLUdNQUVrTXpNeU1XVTRaVFV0T1RVMk5TMDBOelEzTFdKaVpUa3ROemhsT0Rrd09XRTBPR1E0QVFkU1pXTmxhWEIwQUE9PXyPg_IDm6Si7DmGDo92L-34oXKaF3xc03YDqmBT7ZLTZg==; Expires=Sun, 08 Nov 2020 14:33:04 GMT; Max-Age=604800; Path=/; HttpOnly'
    document.body.classList.add('userLayout')
    // getStepParameter()
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      width: 100%;
      min-height: 100%;
      background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
      background-size: 100%;
      padding: 110px 0 144px;
      position: relative;

      a {
        text-decoration: none;
      }

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
  }
</style>
