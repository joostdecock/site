---
layout: cards
title: Tiler
permalink: /tools/tiler
nocomments: true
action: tiler
---
<div class="container">
<div id="tile">
    <div class="paper">
    <div class="row">
    <div class="col-md-6 col-lg-6 col-xl-6">
    <img id="svg-img" src="/img/tiler.svg" alt="Visual representation of what the tiler does">
    </div>
    <div class="col">
        <div id="step1" class="mt-3">
            <h5>Select your SVG file</h5>
            <p>Click the button below to select your SVG file</p>
            <p><a href="#" class="btn btn-outline-primary btn-lg btn-block" id="svg-btn">Upload SVG</a></p>
        </div>
        <div id="step2" class="mt-3 hidden">
            <h5>Select the format you'd like to convert to</h5>
            <form id="form">
                <fieldset class="form-group px-5 mt-3" id="format">
                    <div class="form-check"><label class="form-check-label"><input class="form-check-input format" name="format" id="format-a4" value="A4" type="radio" checked="checked"> <b>A4</b></label></div>
                    <div class="form-check"><label class="form-check-label"><input class="form-check-input format" name="format" id="format-a3" value="A3" type="radio"> <b>A3</b></label></div>
                    <div class="form-check"><label class="form-check-label"><input class="form-check-input format" name="format" id="format-a2" value="A2" type="radio"> <b>A2</b></label></div>
                    <div class="form-check"><label class="form-check-label"><input class="form-check-input format" name="format" id="format-a1" value="A1" type="radio"> <b>A1</b></label></div>
                    <div class="form-check"><label class="form-check-label"><input class="form-check-input format" name="format" id="format-a0" value="A0" type="radio"> <b>A0</b></label></div>
                    <div class="form-check"><label class="form-check-label"><input class="form-check-input format" name="format" id="format-letter" value="Let" type="radio"> <b>Letter</b></label></div>
                    <div class="form-check"><label class="form-check-label"><input class="form-check-input format" name="format" id="format-tabloid" value="Tab" type="radio"> <b>Tabloid</b></label></div>
                    <div class="form-check"><label class="form-check-label"><input class="form-check-input format" name="format" id="format-pdf" value="pdf" type="radio"> <b>PDF</b> (do not tile)</label></div>
                    <div class="form-check"><label class="form-check-label"><input class="form-check-input format" name="format" id="format-ps" value="ps" type="radio"> <b>PostScript</b></label></div>
                </fieldset>
                <input class="hidden" id="file" name="file" type="file">
                <input class="hidden" id="svg" name="svg" type="hidden">
            <p><a href="#" class="btn btn-primary btn-lg btn-block" id="submit-btn">Submit</a></p> 
            </form>
        </div>
    </div>
    </div>
</div>
<div class="m600">
<blockquote class="tip">
<h5>About this tiler</h5>
<p>This page allows you to upload an SVG and have it converted to the format of your choice.</p>
<p>It also handles tiling for you so you can print your draft on your printer.</p>
<h5>What's the point?</h5>
<p>The drafts generated on this site are available in a variety of formats, including tiled PDFs that you can print.</p>
<p>But we also provide the SVG source code of your draft, which allows you to make changes to it.</p>
<p>If after making changes, you'd like to print your draft, you can use this tiler to convert it to the format of your choice.</p>
</blockquote>
</div>
</div>
