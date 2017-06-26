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
    <div id="model"></div>
    <div class="row">
        <div class="col-md-12">
            <h2>Notes</h2>
            <div class="notes">
                <div id="notes-inner"></div>
                <a href="#notes-inner"  class="poh update-bubble hover-shadow hashlink" id="update-notes" title="Edit model notes">
                    <svg class="icon pencil" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                        <path class="c1" d="M5,43l0,-6l2,-2l6,6l-2,2z"></path>
                        <path class="c2" d="M8,34l20,-20l6,6l-20,20z"></path>
                        <path class="c3" d="M29,13l6,-6l6,6l-6,6z"></path>
                    </svg>
                </a>
            </div>
            <h2>Measurements</h2>
            <div id="measurements"></div>
            <h2>Drafts</h2>
            <div id="drafts"></div>
            <hr class="mt-2">
            <h2>Danger zone</h2>
            <p>Remove this model all its data.</p>
            <p class="mt-2"><a href="#delete-btn" class="btn btn-danger hashlink" id="delete-btn" title="Delete this model">Delete this model</a></p>
        </div>
    </div>
</div>
