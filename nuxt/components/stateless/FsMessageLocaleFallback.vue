<template>
  <blockquote class="i18n warning">
    <h3>
      {{ $t('thisContentIsNotAvailableInLanguage') }}
   </h3>
    <p>
      {{ $t('txt-contentNotTranslated') }}
      {{ $t('txt-contentLocaleFallback') }}
    </p>
  </blockquote>
</template>
