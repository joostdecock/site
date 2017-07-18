var template = '<div class="result">'
template += '<div class="result-title"><a href="{{url}}" title="{{title}}">{{#namespace}}{{namespace}}::{{/namespace}}{{title}}</a></div>';
template += '<div class="result-url"><a href="{{url}}" title="{{url}}">{{url}}</a></div>';
template += '<div class="result-text">{{text}}</div>';
template += '<div class="result-hierarchy"><i class="fa fa-link" aria-hidden="true"></i>&nbsp;&nbsp;<a href="{{url}}{{css_selector_parent}}">{{unique_hierarchy}}</a></div>';
template += '<div>';

var search = instantsearch({
    appId: 'MA0Y5A2PF0',
    apiKey: '9209470ad243eee797156aa2874d886c',
    indexName: 'freesewing',
    urlSync: true
});

search.addWidget(
    instantsearch.widgets.searchBox({
        container: '#q',
        placeholder: 'Search',
        autofocus: true,
        poweredBy: true
    })
);

search.addWidget(
    instantsearch.widgets.hits({
        container: '#hits-container',
        templates: {
            empty: 'No results',
            item: template
        },
        hitsPerPage: 5
    })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination-container',
    maxPages: 20,
    // default is to scroll to 'body', here we disable this behavior
    scrollTo: false
  })
);

search.start();
