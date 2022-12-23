<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-white shadow">
        <div class="container">
            <NuxtLink to="/login">
                <img src="/images/logo.png" class="logo-img" alt="">
            </NuxtLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- <ul class="navbar-nav ms-auto mb-2 mb-lg-0"></ul> -->
            <ul class="navbar-nav m-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <NuxtLink to="/login" class="nav-link">Connexion</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/register" class="nav-link">Inscription</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/abonnement" class="nav-link">Nos offres</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/landing_page" class="nav-link">Informations</NuxtLink>
                </li>
                <!-- <li class="nav-item">
                    <NuxtLink to="/contact" class="nav-link">Contact Us</NuxtLink>
                </li> -->
                <!-- <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Autres
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">Contactez nous</a></li>
                    <li><a class="dropdown-item" href="#">A propos de nous</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#">Aide</a></li>
                </ul>
                </li> -->
                <!-- <li class="nav-item">
                <a class="nav-link disabled">Disabled</a>
                </li> -->
            </ul>
            <!-- <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form> -->
            </div>
        </div>
    </nav>
  </div>
</template>

<script>
export default {
    name: 'AppHeader'

}
</script>

<style>
.logo-img{
    width: 170px;
}
</style>