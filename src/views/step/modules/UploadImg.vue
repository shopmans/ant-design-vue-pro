<template>
  <div class="clearfix">
    <template v-if="!isMobile">
      <a-upload
        :disabled="disableAll"
        name="file"
        action="/api/base-info-upload"
        list-type="picture-card"
        :file-list="imgFileList"
        :before-upload="beforeUpload"
        @preview="handlePreview"
        @change="handleChange"
        :headers="{ QueueType: queueType, Flag: flag }"
      >
        <div v-if="imgFileList && !isMobile">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            上传照片
          </div>
        </div>
      </a-upload>
    </template>
    <template v-else>
      <a-upload
        :disabled="disableAll"
        name="file"
        action="/api/base-info-upload"
        list-type="picture"
        :file-list="imgFileList"
        :before-upload="beforeUpload"
        @preview="handlePreview"
        @change="handleChange"
        :headers="{ QueueType: queueType, Flag: flag }"
        class="upload-list-inline"
      >
        <a-button> <a-icon type="upload" /> upload </a-button>
      </a-upload>
    </template>
    <!-- 图片预览 -->
    <viewer :images="images" class="viewer" ref="viewer">
      <img id="imgid78567" :src="previewImage" hidden />
    </viewer>
    <!-- <a-modal :maskClosable="false" :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img :disabled="disableAll" alt="example" style="width: 100%" :src="previewImage" />
    </a-modal> -->
  </div>
</template>

<script>

    // function getBase64 (file) {
    //     return new Promise((resolve, reject) => {
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onload = () => resolve(reader.result)
    //     reader.onerror = error => reject(error)
    //     })
    // }

export default {
    mounted () {
    },
    props: {
        queueType: {
            type: String,
            default: ''
        },
        isMobile: {
            type: Boolean,
            default: false
        },
        flag: {
          type: String,
          default: '1'
        },
        disableAll: {
            type: Boolean,
            default: false
        },
        imgData: {
            type: Array,
            default: null
        }
    },
    watch: {
        imgData (val) {
            if (val != null) {
                this.imgFileList = val
            }
        }
    },
    data () {
        return {
            previewVisible: false,
            previewImage: '',
            imgFileList: [],
            images: []
        }
    },
    methods: {
        beforeUpload (file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp'

            if (!isJpgOrPng) {
                this.$message.error('只能上传图片文件!')
            }

            return isJpgOrPng
        },
        handleCancel () {
            this.previewVisible = false
        },
        async handlePreview (file) {
            // if (!file.url && !file.preview) {
            // file.preview = await getBase64(file.originFileObj)
            // }
            // this.previewImage = file.url || file.preview
            // this.previewVisible = true
            this.previewImage = file.url || file.preview
            this.images.length = 0
            this.images.push(this.previewImage)
            document.getElementById('imgid78567').click()
        },
        handleChange (fileObj) {
            let fileList = [...fileObj.fileList]

            // 2. read from response and show file link
            fileList = fileList.map(file => {
                if (file.response) {
                    if (file.response.retCode !== 0) {
                        this.$notification['error']({
                        message: '错误',
                        description: file.response.msg,
                        duration: 3
                        })
                        file.status = 'error'
                    } else {
                        file.md5 = file.response.md5
                        file.url = file.response.url
                        file.queue_type = file.response.queue_type
                        file.flag = file.response.flag
                    }
                }
                if (!(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp')) {
                    file.status = 'removed'
                }

                return file
            })

            const imgList = []
            fileList.map(file => {
                if (file.status !== 'removed') {
                    imgList.push(file)
                }
            })

            this.imgFileList = imgList
        }
    }
}

</script>

<style scoped>
.upload-list-inline >>> .ant-upload-list-item {
  float: left;
  width: 200px;
  margin-right: 8px;
}
.upload-list-inline >>> .ant-upload-animate-enter {
  animation-name: uploadAnimateInlineIn;
}
.upload-list-inline >>> .ant-upload-animate-leave {
  animation-name: uploadAnimateInlineOut;
}
</style>
