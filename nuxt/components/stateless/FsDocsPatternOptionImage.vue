<template>
  <figure>
    <img :src="'/img/patterns/'+pattern+'/options/'+option.toLowerCase()+'.svg'" class="elevation-0"/>
    <figcaption>{{ $fs.pot(option, pattern, $i18n.locale) }}</figcaption>
  </figure>
</template>

<script>
export default {
  name: 'FsDocsPatternOptionImage',
  props: {
    pattern: {
      type: String,
      required: true
    },
    option: {
      type: String,
      required: true
    }
  }
}
</script>
