<template>
<!-- Footer -->
<footer class="text-center text-lg-start bg-dark text-white">
    <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css' rel='stylesheet'>
  <!-- Section: Social media -->
  <section
    class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
  >
    <!-- Left -->
    <div class="me-5 d-none d-lg-block">
      <img src="/images/logo.png" class="logo-img" alt="">
    </div>
    <!-- Left -->

    <!-- Right -->
    <div>
      <a href="https://www.facebook.com/Tocmanager" class="me-4 text-reset">
        <i class="fab fa-facebook-f"></i>
      </a>
      <!-- <a href="" class="me-4 text-reset">
        <i class="fab fa-google"></i>
      </a> -->
      <a href="https://www.linkedin.com/showcase/tocmanager" class="me-4 text-reset">
        <i class="fab fa-linkedin"></i>
      </a>
    </div>
    <!-- Right -->
  </section>
  <!-- Section: Social media -->


  <!-- Copyright -->
  <div class="text-center p-2" style="background-color: rgba(0, 0, 0, 0.05);">
    Copyright © 2022 - Tous droits réservés TocManager
  </div>
  <!-- Copyright -->
</footer>
<!-- Footer -->
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
.logo-img{
    width: 170px;
}

*{
  font-size: 12px;
}
</style>