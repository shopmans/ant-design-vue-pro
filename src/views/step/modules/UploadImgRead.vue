<template>
  <div class="clearfix">
    <viewer :images="images" class="viewer" ref="viewer">
      <div style="" v-for="src in images" :key="src">
        <div style="border:1px solid #C0C0C0;padding:5px;margin:5px;width:92px; height:92px;float:left;">
          <div style="float:left;position:relative; width:80px; height:80px; overflow:hidden;">
            <img style="position:absolute; left:50%; top:50%; transform:translate(-50%,-50%)" onload="(this.width>this.height)?this.style.height='80px':this.style.width='80px';" :src="src" >
          </div>
        </div>
      </div>
    </viewer>
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
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      imgFileList: [],
      images: []
    }
  },
  methods: {
    handleCancel () {
        this.previewVisible = false
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
      this.images.length = 0
      this.images.push(this.previewImage)
    },
    showFlagImage (flag) {
      this.images.length = 0
      for (var i = 0; i < this.imgFileList.length; i++) {
        if (this.imgFileList[i].url && this.imgFileList[i].flag === flag) {
          this.images.push(this.imgFileList[i].url)
        }
      }
    }
  },
  watch: {
    imgFileList: function (val, oldval) {
      for (var i = 0; i < val.length; i++) {
        if (val[i].url) {
          this.images.push(val[i].url)
        }
      }
    }
  }
}

</script>

<style>

</style>
