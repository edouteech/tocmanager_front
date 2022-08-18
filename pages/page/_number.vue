<template>
  <section id="prev-next">
  <nuxt-link :to="prevLink">Prev page</nuxt-link>
  <nuxt-link v-if="nextPage" :to="`/page/${pageNo + 1}`">Next page</nuxt-link>
</section>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const pageNo = parseInt(params.number)
    const tenPosts = await $content()
      .only(['author', 'createdAt', 'description', 'path', 'title'])
      .sortBy('createdAt', 'desc')
      .limit(10)
      .skip(9 * (pageNo - 1))
      .fetch()

    if (!tenPosts.length) {
      return error({ statusCode: 404, message: 'No posts found!' })
    }

    const nextPage = tenPosts.length === 10
    const posts = nextPage ? tenPosts.slice(0, -1) : tenPosts
    return { nextPage, posts, pageNo }
  },
  computed: {
    prevLink() {
      return this.pageNo === 2 ? '/' : `/page/${this.pageNo - 1}`
    }
  }
}
</script>

<style>

</style>