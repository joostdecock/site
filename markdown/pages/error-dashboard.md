---
layout: cards
title: Error dashboard
permalink: /error-dashboard
nopatronbanner: true
crumbs: false
action: errors
nocomments: true
---
<div class="container">
    <div class="m600 hidden failed-to-load-errors">
        <blockquote class="error">
            <h5>Failed to load recent errors</h5>
            <p>We were unable to load the recent errors from our backend.</p>
            <p>This is not supposed to happen. Please check <a href="/status">the status page</a>.</p>
        </blockquote>
    </div>
<div class="no-errors-loaded hidden">
{% include blockquote.html
  bg='#5cb85c'
  icon='thumbs-up'
  tcolor='#fff'
  icolor='#fff'
  content="<h5 class='display-3'>Everything is running smoothly</h5><p class='lead'>There are currently no new or open errors.</p><p class='text-right'><a href='/errors/all' class='mt-4 mb-1 btn btn-outline-white'>Show all errors for the last 28 days</a></p>"
%}
</div>
    <table id="errors" class="errors table errors-loaded hidden">
        <thead>
            <tr>
                <th class="text-center not-on-small">Status</th>
                <th>Count</th>
                <th>Level</th>
                <th>Error</th>
                <th>Type</th>
                <th class="not-on-small">Origin</th>
                <th class="not-on-small">Last seen</th>
            </tr>
        </thead>
    </table>
    <p class='text-right errors-loaded hidden'>
        <small>This table shows all <b>new</b> and <b>open</b> errors in the last 24 hours<br></small>
        <a href='/errors/all' class='mt-2 mb-1 btn btn-outline-primary'>Show all errors for the last 28 days</a>
    </p>
</div>
