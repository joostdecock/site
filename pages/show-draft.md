---
layout: cards
title: Draft
action: app
permalink: /show-draft
crumbs:
  - /drafts|Drafts
nocomments: true
---
<div class="container" id="draft-container">
    <div class="row owner-only" id="draft-header">
        <div class="col-xl-10 offset-xl-1 col-lg-12" id="draft-actions">
                    <div class="row mb-3">
                        <div class="col-lg-3 col-md-3 col-6">
                            <a href="#draft-container" id="fork-btn"     class="drop-shadow btn btn-block btn-info mt-3 modal light"><i class="fa fa-code-fork" aria-hidden="true"></i> Fork</a>
                        </div>
                        <div class="col-lg-3 col-md-3 col-6">
                            <a href="#draft-container" id="redraft-btn"  class="drop-shadow btn btn-block btn-info mt-3 modal light"><i class="fa fa-repeat" aria-hidden="true"></i> Redraft</a>
                        </div>
                        <div class="col-lg-3 col-md-3 col-6">
                            <a href="#draft-container" id="settings-btn" class="drop-shadow draft-settings btn btn-block btn-primary mt-3 modal light"><i class="fa fa-wrench" aria-hidden="true"></i> Settings</a>
                        </div>
                        <div class="col-lg-3 col-md-3 col-6">
                            <a href="#draft-container" id="delete-btn"   class="drop-shadow btn btn-block btn-danger mt-3 modal light"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a>
                        </div>
                    </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12" id="draft">
            <div id="accordion" role="tablist" aria-multiselectable="true" class="full-width">
                <div id="group-info" class="card">
                    <div class="card-header" role="tab" id="heading-info">
                        <h3 class="text-capitalize"><a data-toggle="collapse" data-parent="#accordion" href="#collapse-info" aria-expanded="false" aria-controls="collapse-info">Info</a></h3>
                    </div>
                    <div id="collapse-info" class="collapse show" role="tabpanel" aria-labeledby="heading-info" aria-expanded="false">
                        <div class="card-block" id="content-info">
                            <div id="draft-info" class="m600">
                                <table class="keyval">
                                    <tr><td>Pattern</td><td><a id="pattern-link" href="#draft-container"></a></td></tr>
                                    <tr class="owner-only"><td>Model</td><td><a id="model-link" href="#draft-container"></a></td></tr>
                                    <tr><td>Created</td><td><span id="created" class="timeago"></span></td></tr>
                                    <tr class="owner-only"><td>Shared</td><td><a id="shared-link" href="#draft-container" class="draft-settings"></a></td></tr>
                                    <tr><td>Reference</td><td id="draft-handle"></td></tr>
                                </table>
                                <p id="fork-msg"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="group-notes" class="card">
                    <div class="card-header" role="tab" id="heading-notes">
                        <h3 class="text-capitalize"><a data-toggle="collapse" data-parent="#accordion" href="#collapse-notes" aria-expanded="false" aria-controls="collapse-notes">Notes</a></h3>
                    </div>
                    <div id="collapse-notes" class="collapse" role="tabpanel" aria-labeledby="heading-notes" aria-expanded="false">
                        <div class="card-block" id="content-notes">
                            <div class="notes">
                                <div id="notes-inner"></div>
                                <a href="#draft" class="owner-only update-bubble hover-shadow" id="update-notes" title="Edit draft notes"><i class="fa fa-pencil fa-2x" aria-hidden="true"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="group-preview" class="card">
                    <div class="card-header" role="tab" id="heading-preview">
                        <h3 class="text-capitalize"><a data-toggle="collapse" data-parent="#accordion" href="#collapse-preview" aria-expanded="false" aria-controls="collapse-preview">Preview</a></h3>
                    </div>
                    <div id="collapse-preview" class="collapse" role="tabpanel" aria-labeledby="heading-preview" aria-expanded="false">
                        <div class="card-block" id="content-preview">
                            <a href="#draft" id="link-preview" title="Open in a new window" target="_BLANK"><div class="drop-shadow svg-frame" id="svg-wrapper"></div></a>
                        </div>
                    </div>
                </div>
                <div id="group-compared" class="card">
                    <div class="card-header" role="tab" id="heading-compared">
                        <h3 class="text-capitalize"><a data-toggle="collapse" data-parent="#accordion" href="#collapse-compared" aria-expanded="false" aria-controls="collapse-compared">Compare</a></h3>
                    </div>
                    <div id="collapse-compared" class="collapse" role="tabpanel" aria-labeledby="heading-compared" aria-expanded="false">
                        <div class="card-block" id="content-compared">
                            <blockquote class="tip m600 mt-2 mb-4">
                                <h5>About this comparison</h5>
                                <p>This comparison is a way to check whether things are <em>normal</em> without having to be familiar with the pattern.
                                You see a bunch of standard sizes, with your own draft laid on top of it.</p>
                                <p>If yours looks wildly different, something is wrong. Typically it's due to incorrect measurements.</p>
                            </blockquote>
                            <a href="#draft" id="compared-preview" title="Open in a new window" target="_BLANK"><div class="drop-shadow svg-frame" id="compared-wrapper"></div></a>
                        </div>
                    </div>
                </div>
                <div id="group-download" class="card">
                    <div class="card-header" role="tab" id="heading-download">
                        <h3 class="text-capitalize"><a data-toggle="collapse" data-parent="#accordion" href="#collapse-download" aria-expanded="false" aria-controls="collapse-download">Download</a></h3>
                    </div>
                    <div id="collapse-download" class="collapse" role="tabpanel" aria-labeledby="heading-download" aria-expanded="false">
                        <div class="card-block" id="content-download">
                            <div class="row">
                                {% include download-draft.html 
                                    format="svg"
                                    class="card-black card-inverse"
                                    title="SVG"
                                    msg="Use the source Luke. Also allows editing in Inkscape or Illustrator."
                                %}
                                {% include download-draft.html 
                                    format="pdf"
                                    class="card-primary card-inverse"
                                    title="PDF"
                                    msg="Full-size PDF for copyshop printing or just to look at because it's just so pretty."
                                %}
                                {% include download-draft.html 
                                    format="a4.pdf"
                                    class="card-primary card-inverse"
                                    title="A4 PDF"
                                    msg="The planet's most common printing format."
                                %}
                                {% include download-draft.html 
                                    format="a3.pdf"
                                    class="card-primary card-inverse"
                                    title="A3 PDF"
                                    msg="Twice the size, half the sticky-taping"
                                %}
                                {% include download-draft.html 
                                    format="letter.pdf"
                                    class="card-primary card-inverse"
                                    title="Letter PDF"
                                    msg="Weird paper sizes, coz 'merica yo!"
                                %}
                                {% include download-draft.html 
                                    format="tabloid.pdf"
                                    class="card-primary card-inverse"
                                    title="Tabloid PDF"
                                    msg="Twice the (weird) size, half the sticky-taping"
                                %}
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
