---
layout: cards
title: Status page
permalink: /status
action: status
---
<div class="container">
    <p>Skip ahead to <a href="#counters">counters</a>, <a href="#code-base">code base</a>, or <a href="#server-status">server status</a></p>
    <h2 id="counters">Counters</h2>
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
    <h2 id="code-base">Code base</h2>
    <div class="row">
        <div class="col-md-4 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Site</h4>
                    <div id="site"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Data</h4>
                    <div id="data"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card hover-shadow">
                <div class="card-block">
                    <h4 class="card-title">Core</h4>
                    <div id="core"></div>
                </div>
            </div>
        </div>
    </div>
    <h2 id="server-status">Server status</h2>
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
</div>
<span id="branch" data-branch="{{ site.branch }}"></span>
