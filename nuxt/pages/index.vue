<template>
  <section>
    <h1>{{ $t('freesewing') }} </h1>
    <h2>{{ $t('txt-slogan') }} </h2>
    {{ $fs.path('/go/to') }}
    <pre>
    {{ $fs.conf.namespaces }}
    </pre>
  </section>
</template>

<script>
export default {
}
</script>
