<template>
  <v-menu nudge-right>
    <v-toolbar-title slot="activator">
      <v-btn large flat>
        <img class="mr-3" :src="'/icons/flags/'+$i18n.locale+'.svg'" />
        {{ localeName }}
        <v-icon>arrow_drop_down</v-icon>
      </v-btn>
    </v-toolbar-title>
    <v-list>
      <v-list-tile
        v-for="(locale, index) in $i18n.locales"
        :key="index" :to="switchLocalePath(locale.code)">
        <v-list-tile-action>
          <img :src="'/icons/flags/'+locale.code+'.svg'" />
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ locale.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'TheLanguageDropdownMenu',
  computed: {
    localeName () {
      const self = this
      for (let locale of this.$i18n.locales) {
        if(locale.code === self.$i18n.locale) {
          return locale.name
        }
      }
      return ''
    }
  }
}
</script>
