<template>
  <a-modal
    :width="pdfWidth"
    :visible="pdfShow"
    :title="pdfFilename"
    @ok="cancel"
    @cancel="cancel"
  >
    <pdf
      v-for="i in pdfNumPages"
      :key="i"
      :src="pdfUrl"
      :page="i"
    ></pdf>
  </a-modal>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf
  },
  data () {
    return {
      pdfNumPages: null,
      pdfUrl: null,
      pdfFilename: null,
      pdfShow: false,
      pdfWidth: 1024
    }
  },
  methods: {
    show (url, filename) {
      var loadingTask = pdf.createLoadingTask(url)
      loadingTask.promise.then(pdf => {
        this.pdfNumPages = pdf.numPages
        this.pdfUrl = url
        this.pdfFilename = filename
        this.pdfWidth = document.body.clientWidth - 50
        this.pdfShow = true
      }).catch(err => {
        console.error('pdf 加载失败', err)
      })
    },
    cancel () {
      this.pdfUrl = ''
      this.pdfShow = false
    }
  }
}
</script>

<style>

</style>
