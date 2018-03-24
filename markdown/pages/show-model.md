---
layout: cards
title: Model
action: app
permalink: /show-model
crumbs:
  - /models|Your models
nocomments: true
---
<div class="container">
    <div id="model">
        <div class="col-xl-10 offset-xl-1 col-lg-12" id="model-actions">
            <div class="row mb-3">
                <div class="col-lg-3 col-md-3 col-6">
                    <a href="#model" id="clone-btn"  class="drop-shadow btn btn-block btn-info mt-3 modal light"><i class="fa fa-clone" aria-hidden="true"></i> Clone</a>
                </div>
                <div class="col-lg-3 col-md-3 col-6">
                    <a href="#model" id="export-btn"  class="drop-shadow btn btn-block btn-info mt-3 modal light"><i class="fa fa-suitcase" aria-hidden="true"></i> Export</a>
                </div>
                <div class="col-lg-3 col-md-3 col-6">
                    <a href="#model" id="settings-btn" class="drop-shadow draft-settings btn btn-block btn-primary mt-3 modal light"><i class="fa fa-wrench" aria-hidden="true"></i> Settings</a>
                </div>
                <div class="col-lg-3 col-md-3 col-6">
                    <a href="#model" id="delete-btn"   class="drop-shadow btn btn-block btn-danger mt-3 modal light"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a>
                </div>
            </div>
        </div>
    </div>
    <h2>Info</h2>
    <div class="row">
        <div class="col-md-4">
            <a href="#model" id="model-picture-link" target="_BLANK"><img class="w-100 drop-shadow" src="/img/logo/spinner.svg" alt="Model avatar" id="model-picture"></a>
        </div>
        <div class="col-md-8">
            <table class="keyval">
                <tr><td>Name</td><td id="model-name"></td></tr>
                <tr><td>Breasts</td><td id="model-breasts"></td></tr>
                <tr><td>Units</td><td id="model-units"></td></tr>
                <tr><td>Created</td><td><span id="model-created" class="timeago"></span></td></tr>
                <tr><td>Reference</td><td id="model-handle"></td></tr>
            </table>
        </div>
    </div>
    <h2>Notes</h2>
    <div class="notes">
        <div id="notes-inner"></div>
        <a href="#notes-inner"  class="poh update-bubble hover-shadow hashlink" id="update-notes" title="Edit model notes"><i class="fa fa-pencil fa-2x" aria-hidden="true"></i></a>
    </div>
    <h2>Measurements</h2>
    <div id="measurements"></div>
</div>
