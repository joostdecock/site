<template>
  <section>
    <ul class="breadcrumbs"> 
      <li>
        <nuxt-link :to="$fs.path('/')">
          <v-icon color="primary">home</v-icon>
        </nuxt-link>
      </li>
      <li><v-icon small slot="divider">chevron_right</v-icon></li>
      <li>{{ $t('patterns') }}</li>
    </ul>
    <ul class="quick-links">
    <li v-for="(namespace, index) in $fs.conf.namespaces" :key="index">
      <p><b>{{ index }}:</b> {{ ' '}}
      <span class="link-spacer ml-1" v-for="pattern in namespace" :key="pattern">
        <nuxt-link :to="$fs.path('/patterns/'+pattern)">{{ pattern }}</nuxt-link></span> 
      </p>
    </li>
    </ul>
    <v-container fluid grid-list-lg v-for="(namespace, index) in $fs.conf.namespaces" :key="index">
      <v-layout row wrap>
        <v-flex class="xs6 sm4 md4 lg3 xl2" v-for="pattern in namespace" :key="pattern" >
          <v-card>
            <nuxt-link :to="$fs.path('/patterns/'+pattern)" :title="pattern">
              <img :src="'/img/patterns/'+pattern+'/cover.jpg'" />
            </nuxt-link>	
            <v-card-text class="fs-nodeco">
              <h5 class="mb-0 mt-0 thetitle">
                <nuxt-link :to="$fs.path('/patterns/'+pattern)" :title="pattern">
                  {{ pattern[0].toUpperCase() + pattern.slice(1) }}
                </nuxt-link>	
              </h5>
              <p class="mb-0 mt-2">
                <nuxt-link :to="$fs.path('/patterns/'+pattern)" :title="pattern">
                  {{ $fs.conf.patterns[pattern].info.description }}
                </nuxt-link>	
              </p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  layout: 'wide',
}
</script>

<style scoped>
ul.quick-links li {
  list-style-type: none;
  text-transform: capitalize;
}
ul.quick-links li p i.icon {
  text-transform: none;
}
span.link-spacer {
  display: inline;
}
span.link-spacer:after {
  content: ', ';
}
ul.quick-links li p span:last-of-type:after {
  content: '';
}
ul.meta {
  margin-left: 0;
  margin-top: 10px;
  font-size: 80%;
}
ul.meta li {
  list-style-type: none;
  margin-bottom: 5px;
}
.input-group,
.input-group--slider {
  padding: 0;
}
</style>
