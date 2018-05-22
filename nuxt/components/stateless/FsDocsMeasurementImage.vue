<template>
  <section>
    <div class="mb-3" v-if="onlyforbreasts==true">
      <blockquote class="tip">
        <h4>{{ $t('txt-breastMeasurement-title') }}</h4>
        <p>{{ $t('txt-breastMeasurement-text') }}</p>
      </blockquote>
      <img :src="'/img/measurements/withbreasts/'+measurement.toLowerCase()+'.svg'" class="with elevation-1" />
    </div>
    <v-tabs v-else color="primary" dark centered class="elevation-1 mb-3">
      <v-tab>{{ $t('withBreasts') }}</v-tab>
      <v-tab>{{ $t('withoutBreasts') }}</v-tab>
      <v-tab-item>
        <img :src="'/img/measurements/withbreasts/'+measurement.toLowerCase()+'.svg'" class="with" :class="(seated) ? 'seated' : ''" />
      </v-tab-item>
      <v-tab-item>
        <img :src="'/img/measurements/withoutbreasts/'+measurement.toLowerCase()+'.svg'" class="without" :class="(seated) ? 'seated' : ''"  />
      </v-tab-item>
    </v-tabs>
  </section>
</template>

<script>
export default {
  name: 'FsDocsMeasurementImage',
  props: {
    measurement: {
      type: String,
      required: true
    },
    onlyforbreasts: {
      type: Boolean,
      default: false
    },
    seated: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
img.with {
  background-image: url(/img/measurements/withbreasts/standing.jpg);
  background-size: cover;
}
img.with.seated {
  background-image: url(/img/measurements/withbreasts/seated.jpg);
}
img.without {
  background-image: url(/img/measurements/withoutbreasts/standing.jpg);
  background-size: cover;
}
img.without.seated {
  background-image: url(/img/measurements/withoutbreasts/seated.jpg);
}
</style>
