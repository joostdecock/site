<template>
  <section class="container">
      <h1>Freesewing.org v2</h1>
      <h2>A port of the freesewing site to Nuxt</h2>
      <ul>
          <li><router-link to="/blog">Blog index</router-link></li> 
      </ul>
  </section>
</template>

<style>
.container {
  max-width: 800px;
  padding: 2rem;
  margin: 3rem auto;
  font-size: 140%;
  line-height: 1.5;
}
h1 {
  margin: 2rem auto;
    font-size: 3rem;
    font-weight: 100;
    line-height: 1.1;
}
</style>
