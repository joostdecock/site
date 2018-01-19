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
    <h3 class="errors-loaded">Recent errors</h3> 
    <table id="errors" class="errors table">
        <thead>
            <tr>
                <th class="text-center not-on-small">Status</th>
                <th>Count</th>
                <th>Level</th>
                <th>Error</th>
                <th>Type</th>
                <th class="not-on-small">Origin</th>
            </tr>
        </thead>
    </table>
</div>
