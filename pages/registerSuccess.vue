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
          style="width: 20%; margin-top: 5%"
          alt="Sample image"
        />
        <div class="text-center">
          <h1 style="font-size: xx-large">Inscription réussie</h1>
          <p>
            Vous pouvez vous connecter en cliquant sur ce bouton
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
  layout: "public",
};
</script>

<style scoped>

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
  padding: 100px 0;
}
@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}

</style>
