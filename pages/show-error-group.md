---
layout: cards
title: Error details
permalink: /show-error-group
nopatronbanner: true
crumbs:
  - /errors|Error dashboard
action: errors
---
<div class="container">
    <div class="m600 hidden failed-to-load-errors">
        <blockquote class="error">
            <h5>Failed to load this error group</h5>
            <p>We were unable to load this error group from our backend.</p>
            <p>This is not supposed to happen. Please check <a href="/status">the status page</a>.</p>
        </blockquote>
    </div>
    <div class="row">
        <div class="col-10 col-lg-11">
            <h3 id="error-group-title"></h3>
        </div>
        <div class="col-2 col-lg-1" id="error-type-icon">
        </div>
    </div>
    <div id="raw" class="highlighter-rouge"><pre class="highlight"><code id="error-group-raw"></code></pre></div>
    <div class="row mb-5">
        <div class="col-md-6" id="error-counters">
            <span class="error-count-new badge badge-pill badge-success"> new</span>  
            <span class="error-count-open badge badge-pill badge-info"> open</span>  
            <span class="error-count-muted badge badge-pill badge-warning">muted</span> 
            <span class="error-count-closed badge badge-pill badge-default">closed</span>
        </div>
        <div class="col-md-6 text-right">
            <small class="error-hash"></small>
            <div id="error-group-file"></div>
        </div>
    </div>

    <table id="errors" class="errors table">
        <thead>
            <tr>
                <th class="text-center">#</th>
                <th class="text-center">Status</th>
                <th>Host</th>
                <th>Time</th>
            </tr>
        </thead>
    </table>
</div>
