---
layout: cards
title: Status page
permalink: /status
action: status
---
<div class="container">
    <h2>Server status</h2>
    <p>Uptime: <span id="uptime"></span></p>
    <div class="row">
        <div class="col-md-4 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Memory</h4>
                    <div class="progress">
                        <div id="memory" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">Loading...</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Swap</h4>
                    <div class="progress">
                        <div id="swap" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">Loading...</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">CPU</h4>
                    <div class="progress">
                        <div id="cpu" class="progress-bar" role="progressbar" style="width: 0%; " aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">Loading...</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <h2>Counters</h2>
    <div class="row">
        <div class="col-md-4 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Users</h4>
                    <p class="counter" id="users"></p>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Models</h4>
                    <p class="counter" id="models"></p>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Drafts</h4>
                    <p class="counter" id="drafts"></p>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Patterns</h4>
                    <p class="counter" id="patterns"></p>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Showcases</h4>
                    <p class="counter" id="showcases">{{ site.showcases | size }}</p>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Comments</h4>
                    <p class="counter" id="comments"></p>
                </div>
            </div>
        </div>
    </div>
</div>
<style>
p.counter {
    font-size: 3rem;
    text-align: right;
    font-weight: bold;
}
</style>
