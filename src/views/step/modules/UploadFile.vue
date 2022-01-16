<template>
  <div class="clearfix">
    <a-col :lg="6" :md="12" :sm="24">
      <a-upload
        :disabled="disableAll"
        action="/api/base-info-upload"
        :multiple="true"
        :file-list="fileLists"
        @change="fileListsChange"
        @preview="clickSerialCardFile"
        :remove="remove"
        :headers="{ QueueType: queueType }"
      >
        <a-button :disabled="disableAll" style="width:100%;"> <a-icon type="upload" /> 上传文件 </a-button>
      </a-upload>
    </a-col>
    <pdfView ref="pdf"></pdfView>
  </div>
</template>

<script>
import pdfView from '@/components/PdfView'

    function getBase64 (file) {
        return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
        })
    }

export default {
    components: {
        pdfView
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
        disableAll: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            previewVisible: false,
            previewImage: '',
            fileLists: []
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
        fileListsChange (info) {
            let fileList = [...info.fileList]

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
                    file.queue_type = '1'
                    var stateMD5List = this.$store.state.uploadFileMD5Store.uploadFileMD5
                    var bFind = false
                    for (var i = 0; i < stateMD5List.length; i++) {
                    if (stateMD5List[i].md5 === file.md5) {
                        bFind = true
                        break
                    }
                    }
                    if (!bFind) {
                    stateMD5List.push(file)
                    this.$store.commit('SET_UPLOAD_MD5', stateMD5List)
                    }
                }
                }
                return file
            })
        this.fileLists = fileList
        },
        remove (file) {
            var stateMD5List = this.$store.state.uploadFileMD5Store.uploadFileMD5
            for (var i = 0; i < stateMD5List.length; i++) {
                if (stateMD5List[i].md5 === file.md5) {
                    stateMD5List.splice(i, 1)
                    this.$store.commit('SET_UPLOAD_MD5', stateMD5List)
                    break
                }
            }
        },
        clickSerialCardFile (file) {
            this.$refs.pdf.show(file.url, file.name)
            return false
        }
    }
}

</script>

<style>

</style>
