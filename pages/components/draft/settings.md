---
permalink: /components/draft/settings
---
<!-- Start of /components/draft/settings -->
<div class="container">
<div class="row">
<div class="col-sm-10 offset-sm-1 col-md-8 offset-md-2 mt-2" id="settings-inner">
<h2>Draft settings</h2>
<form id="settings-form">
    <!-- name -->
    <div class="input-group key-sm mt-4">
        <span class="input-group-addon td-key">Name</span>
        <input class="form-number form-control" id="name" name="name" value="" type="text">
    </div>
    <!-- shared -->
    <div class="input-group key-toggle key-sm mt-4 mb-4">
        <span class="input-group-addon td-key">Share</span>
        <div class="toggle toggle-light" id="shared-toggle"></div>
    </div>
    <input class="hidden" id="shared" name="shared" value="1" type="checkbox" checked="">
    <div id="loader" class=""><button type="submit" class="btn btn-primary btn-lg mt-5 btn-block disabled">Save settings</button></div>
</form>
</div>
</div>
</div>
<!-- End of /components/draft/settings -->
