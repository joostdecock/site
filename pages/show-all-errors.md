---
layout: cards
title: All errors
permalink: /show-all-errors
nopatronbanner: true
crumbs:
  - /errors|Error dashboard
action: errors
nocomments: true
---
<div class="container">
    <div class="m600 hidden failed-to-load-errors">
        <blockquote class="error">
            <h5>Failed to load errors</h5>
            <p>We were unable to load the errors from our backend.</p>
            <p>This is not supposed to happen. Please check <a href="/status">the status page</a>.</p>
        </blockquote>
    </div>
    <table id="errors" class="errors table errors-loaded">
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
