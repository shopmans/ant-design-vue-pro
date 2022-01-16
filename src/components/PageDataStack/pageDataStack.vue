<template>
  <div></div>
</template>

<script>
var pageDataStack = []

function pushPageData (store, clear) {
    pageDataStack.push({ pageNo: store.state.user.curPageNo, pageSize: store.state.user.curPageSize })
    if (clear) {
      store.commit('SET_CUR_PAGE_NO', 0)
      store.commit('SET_CUR_PAGE_SIZE', 10)
    }
}

function popPageData (store) {
    const pageData = pageDataStack.pop()
    store.commit('SET_CUR_PAGE_NO', pageData.pageNo)
    store.commit('SET_CUR_PAGE_SIZE', pageData.pageSize)
    console.log(pageData)
}

export default {
    pushPageData,
    popPageData
}
</script>

<style>

</style>
