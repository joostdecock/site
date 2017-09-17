---
layout: cards
title: Draft
action: app
permalink: /show-draft
crumbs:
  - /drafts|Drafts
nocomments: true
---
<div class="container" id="draft-container" >
    <div class="row owner-only mb-5" id="draft-header">
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

    <div class="row" style="background: #fff;">
        <div class="col-12">
            <h2>Notes</h2>
            <div class="notes">
                <div id="notes-inner"></div>
                <a href="#draft" class="owner-only update-bubble hover-shadow" id="update-notes" title="Edit draft notes"><i class="fa fa-pencil fa-2x" aria-hidden="true"></i></a>
            </div>
        </div>
    </div>

    <div class="row" style="background: #fff;">
        <div class="col-lg-8 mt-3" id="draft">
            <h2>Preview</h2>
            <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item"><a class="nav-link active" href="#draft-preview" role="tab" data-toggle="tab">Draft</a></li>
                <li class="nav-item"><a class="nav-link" href="#draft-comparison" role="tab" data-toggle="tab">Comparison</a></li>
                <li class="nav-item"><a class="nav-link" href="#draft-readme" role="tab" data-toggle="tab">README</a></li>
            </ul>
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="draft-preview">
                    <a href="#draft" id="link-preview" title="Open in a new window" target="_BLANK"><div class="drop-shadow svg-frame" id="svg-wrapper"></div></a>
                </div>
                <div role="tabpanel" class="tab-pane" id="draft-comparison">
                    <a href="#draft" id="compared-preview" title="Open in a new window" target="_BLANK"><div class="drop-shadow svg-frame" id="compared-wrapper"></div></a>
                </div>
                <div role="tabpanel" class="tab-pane" id="draft-readme">
                    <blockquote class="tip">
                        <h5>Before you cut into your fabric</h5>
                        <p>The vast majority of draft problems are due to incorrect measurements. That's why you get your draft, plus a <b>comparison</b>.</p>
                        <p>This comparison is a way to check whether things are <em>normal</em> without having to be familiar with the pattern.</p>
                        <h6>What should I look for?</h6>
                        <p>You see a bunch of standard sizes in varying colours, with your own draft laid on top of it in gray.</p>
                        <p>If yours looks significantly different, something is wrong.
                        Double-check your measurements, and if everything seems fine, set your draft to be <b>shared</b> and then <a target="_BLANK" href="#draft-readme" id="issue-link">report the problem</a>.</p>
                    </blockquote>
                </div>
            </div>
        </div>
        <div class="col-lg-4 mt-3">
            <h2>Download</h2>
                {% include download-draft.html 
                    format="svg"
                    class="card-black card-inverse"
                    title="SVG"
                    msg="Use the source Luke. Also allows editing in Inkscape or Illustrator."
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
            <p>
                Other formats:  
                <a class="download-draft" data-format="a2.pdf" style="color: #663f95; font-weight: bold;">A2 PDF</a>, 
                <a class="download-draft" data-format="a1.pdf" style="color: #663f95; font-weight: bold;">A1 PDF</a>, 
                <a class="download-draft" data-format="a0.pdf" style="color: #663f95; font-weight: bold;">A0 PDF</a>,  
                <a class="download-draft" data-format="pdf" style="color: #663f95; font-weight: bold;">Full-size PDF</a>,  
            </p>
        </div>
    </div>

    <div class="row" style="background: #fff;">
        <div class="col-12">
            <h2>Details</h2>
        </div>
    </div>
    <div class="row" style="background: #fff;">
        <div class="col-md-4 mb-5">
            <h3>Info</h3>
            <div id="draft-info">
                <table class="keyval">
                    <tr><td>Pattern</td><td nowrap><a id="pattern-link" href="#draft-container"></a></td></tr>
                    <tr class="owner-only"><td nowrap>Model</td><td><a id="model-link" href="#draft-container"></a></td></tr>
                    <tr><td>Created</td><td nowrap><span id="created" class="timeago"></span></td></tr>
                    <tr class="owner-only"><td nowrap>Shared</td><td><a id="shared-link" href="#draft-container" class="draft-settings"></a></td></tr>
                    <tr><td>Reference <sup><small>1</small></sup></td><td id="draft-handle" nowrap></td></tr>
                    <tr><td>Core replay <sup><small>2</small></sup></td><td id="draft-core-url" nowrap></td></tr>
                </table>
                <p id="fork-msg">
                    <br><small>(2) Replay the core API call that created this draft</small>
                </p>
            </div>
        </div>
        <div class="col-md-4 mb-5">
            <h3>Options</h3>
            <div class="m600">
                <table class="keyval" id="options-table"></table>
            </div>
        </div>
        <div class="col-md-4 mb-5">
            <h3>Measurements</h3>
            <div class="m600">
                <table class="keyval" id="measurements-table"></table>
            </div>
        </div>
    </div>
</div>
