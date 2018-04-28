<template>
  <section>
    <h1>{{ $t('freesewing') }} </h1>
    <h2>{{ $t('txt-slogan') }} </h2>
    <pre>
    {{ $store.state.user.loggedIn }}
    {{ $store.state.user.account.username }}
    </pre>
  </section>
</template>
