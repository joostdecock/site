<template>
  <section>
    <figure>
      <img :src="'/img/patterns/'+page.pattern+'/'+page.pattern+'.svg'" class="elevation-0 mt-3"/>
      <figcaption>{{ $t('patternLineDrawing', {pattern: $fs.ucfirst(page.pattern)}) }}</figcaption>
    </figure>
    <blockquote>
      <p>
        {{ $t('seeAlso') }}
        <nuxt-link :to="$fs.path('/docs/patterns/'+page.pattern+'/measurements')">{{ $t('requiredMeasurements') }}</nuxt-link>
        &amp;
        <nuxt-link :to="$fs.path('/docs/patterns/'+page.pattern+'/options')">{{ $t('patternOptions') }}</nuxt-link>
      </p>
    </blockquote>
  </section>
</template>

<script>
export default {
  name: 'FsDocsPatterns',
  props: {
    page: {
      type: Object,
      required: true
    }
  }
}
</script>
