
<template>
    <section>
        <fs-breadcrumbs>{{ $t('patrons') }}</fs-breadcrumbs>

        <v-container fluid grid-list-lg>
            <v-layout row wrap>
                <v-flex class="xs3" v-for="(patron, index) in patrons" :key="index" >
                    <v-card>
                        <v-card-media :src="patron.picture" :height="imageHeight">
                            <nuxt-link to="/" style="width: 100%; height: 100%" :title="$t('visitPatronProfile')"></nuxt-link>
                        </v-card-media>
                        <v-card-text>
                            <p class="mb-0 mt-0 thetitle">
                                {{ $t(
                                    'patronText',
                                    {
                                        username: patron.username,
                                        patronTier: patronGrade(patron),
                                        daysAgo: $fs.daysAgo(patron.since)
                                    })
                                }}
                            </p>
                        </v-card-text>
                        <img class="medal-corner" :src="medalUrl(patron)" />
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </section>
</template>

<script>

    import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'

    export default {
        layout: 'wide',
        components: {
            FsBreadcrumbs
        },
        asyncData: async function ({ app, route }) {
            let locale = ''
            if(route.path.substr(0,5) === '/patrons') {
                locale = 'en'
            }
            else {
                locale = route.path.substr(1).split('/').shift()
            }
            var list =  await app.$fs.loadPatrons()
            return { patrons: list }
        },
        methods: {
            patronGrade: function(patron) {
                switch(patron.tier) {
                    case '2': return this.$t('Powder Monkey'); break;
                    case '4': return this.$t('First Mate'); break;
                    case '8': return this.$t('Captain'); break;
                }
            },
            medalUrl: function(patron) {
                var base = '/img/patrons/medals/medal-';
                return base+patron.tier+'.svg';
            }
        },
        computed: {
            imageHeight () {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs': return '220px'
                    case 'sm': return '270px'
                    case 'md': return '270px'
                    case 'lg': return '270px'
                    case 'xl': return '270px'
                }
            }
        }
    }
</script>

<style scoped>
    img.medal-corner{
        max-width: 75px;
        max-height: 75px;
        margin: 0;
        position: absolute;
        left: -10px;
        top: -10px;
    }

    div.card__text{
        background-color: #292b2c;
        color: #fff;
        font-size: 0.7rem;
        padding: 8px;
    }

    @media (max-width: 600px) {
        p.thetitle {
            font-size: 0.6rem;
        }
    }
</style>
