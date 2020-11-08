<template>
  <div class="clearfix">
    <a-upload
      name="file"
      action="/api/base-info-upload"
      list-type="picture-card"
      :file-list="imgFileList"
      :before-upload="beforeUpload"
      @preview="handlePreview"
      @change="handleChange"
      :headers="{ QueueType: queueType }"
    >
      <div v-if="imgFileList.length < 80 && !isMobile">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          上传照片
        </div>
      </div>
    </a-upload>
    <a-modal :maskClosable="false" :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>

    function getBase64 (file) {
        return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
        })
    }

export default {
    props: {
        queueType: {
            type: String,
            default: ''
        },
        isMobile: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            previewVisible: false,
            previewImage: '',
            imgFileList: []
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
            if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
            }
            this.previewImage = file.url || file.preview
            this.previewVisible = true
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
                        file.queue_type = '3'
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

<style>

</style>
