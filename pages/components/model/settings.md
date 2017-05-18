---
permalink: /components/model/settings
---
<!-- Start of /components/model/settings -->
<div class="container">
<div class="row">
<div class="col-sm-8 offset-sm-2 col-md-6 offset-md-3 mt-2" id="settings-inner">
<h2>Model settings</h2>
<form id="settings-form">
    <!-- username -->
    <div class="input-group key-sm mt-4">
        <span class="input-group-addon td-key">Name</span>
        <input class="form-number form-control" id="name" name="name" value="" type="text">
    </div>
    <!-- units -->
    <div class="input-group key-toggle key-sm mt-4 mb-4">
        <span class="input-group-addon td-key">Units</span>
        <div class="toggle toggle-light" id="units-toggle"></div>
    </div>
    <input class="hidden" id="units" name="units" value="imperial" type="checkbox" checked="">
    <!-- body -->
    <div class="input-group key-toggle key-sm mt-4 mb-4">
        <span class="input-group-addon td-key">Shape</span>
        <div class="toggle toggle-light" id="body-toggle"></div>
    </div>
    <input class="hidden" id="body" name="body" value="female" type="checkbox" checked="">
    <!-- picture -->
        <div class="bg-thematic drop-shadow" id="picture-key" style="width: 100px; height: 100px; background-color: #fff; display: inline-block; margin-right: 1rem; float: left;"></div>
        <div style="display: inline-block; width: 250px;">
            <p id="picture-msg">This is the current model picture, click below to select a new one</p>
            <a class="btn btn-outline-primary" id="picture-btn" href="#">Change image</a>
            <input class="hidden" id="file" name="file" type="file">
            <input class="hidden" id="picture" name="picture" type="hidden">
        </div>
    <div id="loader" class=""><button type="submit" class="btn btn-primary btn-lg mt-5 btn-block disabled">Save settings</button></div>
</form>
</div>
</div>
</div>
<!-- End of /components/model/settings -->
