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
        <v-flex class="xs12 sm6 xl3" v-for="pattern in namespace" :key="pattern" >
          <v-card>
            <nuxt-link :to="$fs.path('/patterns/'+pattern)" :title="pattern">
              <img :src="'/img/patterns/'+pattern+'/cover.jpg'" />
            </nuxt-link>	
            <v-card-text class="fs-nodeco">
              <h5 class="mb-0 mt-0 thetitle">
                <nuxt-link :to="$fs.path('/patterns/'+pattern)" :title="pattern">
                  {{ $fs.conf.patterns[pattern].info.name }}
                </nuxt-link>	
              </h5>
              <p class="mb-0 mt-2">
                <nuxt-link :to="$fs.path('/patterns/'+pattern)" :title="pattern">
                  {{ $fs.conf.patterns[pattern].info.description }}
                </nuxt-link>	
              </p>
              <v-progress-linear 
                :value="5*Object.keys($fs.conf.patterns[pattern].measurements).length" 
                height="2" 
                color="info">
              </v-progress-linear>
              <v-progress-linear 
                :value="2*Object.keys($fs.conf.patterns[pattern].options).length" 
                height="2" 
                color="success">
              </v-progress-linear>
              <v-progress-linear 
                :value="10*$fs.conf.patterns[pattern].info.level" 
                height="2" 
                color="error">
              </v-progress-linear>
               <v-slider label="level" value="50" color="error" readonly></v-slider>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <pre>
    {{ $fs.conf.patterns }}
    </pre>
  </section>
</template>

<script>
export default {
  layout: 'wide'
}
</script>

<style scoped>
ul.quick-links li {
  list-style-type: none;
  text-transform: capitalize;
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
</style>
