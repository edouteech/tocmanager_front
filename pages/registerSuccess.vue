<template>
  <div class="contain">
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
      rel="stylesheet"
    />

    <div class="container-fluid h-custom">
      <div class="row justify-content-center mt-8">
        <img
          src="/images/eff.jpg"
          class="img-fluid"
          style="width: 10%; margin-top: 5%"
          alt="Sample image"
        />
        <div class="text-center">
          <h1 style="font-size: xx-large">Inscription réussie</h1>
          <p>
            Votre inscription s'est bien passée. Merci de vous être inscrit!
          </p>
          <NuxtLink
            to="/login"
            class="btn btn-outline-primary btn-offer mx-auto mb-4"
            >Connectez-vous</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
};
</script>

<style scoped>
* {
  font-size: 12px;
}
/* .img-fluid { */
  /* width: 400px; */
  /* height: 80vh; */
/* } */
.input-field {
  border-radius: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #4343ff;
}

/* .alert{
    margin-top: -10px;
  } */

.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}
.h-custom {
  height: calc(100% - 73px);
}
@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}

@media screen and (max-width: 700px) {
  .img {
    display: none;
  }
}
</style>
