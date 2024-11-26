<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <main>
      <div class="container">
        <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <span class="fs-4"><i class='bx bxs-institution bx-tada'></i> Election présidentielle 2024</span>
          </a>
              <ul class="nav nav-pills">
                <li class="nav-item">
                  <RouterLink to="/" class="nav-link" aria-current="page">Home</RouterLink>
                </li>
                <li  class="nav-item">
                  <RouterLink to="/candidat" class="nav-link">Candidats</RouterLink>
                </li>
                <li  class="nav-item">
                  <RouterLink to="/"class="nav-link">Voter</RouterLink>
                </li>
              </ul>
        </header>
      </div>
    </main>
  </header>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-12">
        <RouterView />
      </div>
    </div>
  </div>

</template>
