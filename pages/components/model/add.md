---
permalink: /components/model/add
---
<!-- Start of /components/model/add -->
<form id="new-model-form">
    <div class="panel-holder text-center">
        <div class="panel text-center" id="login-panel">
            <h4>Pick a name</h4>
            <!-- name -->
            <div class="input-group">
                <input class="form-text form-control text-center" id="name" name="name" value="" type="text" placeholder="Type your model name here">
            </div>
            <p class="mt-3"><a id="show-body-type" class="poh btn btn-primary">Continue &raquo;</a></p>
            <p>Naming your models makes it easier to tell them apart.</p>
        </div>
        <div class="panel text-center" id="recover-panel">
            <h4>Pick a shape<sup>*</sup></h4>
            <!-- body -->
            <div class="input-group key-toggle key-sm mt-4">
                <div class="toggle toggle-light text-center" style="margin: auto;" id="body-toggle"></div>
            </div>
            <input class="hidden" id="body" name="body" value="female" type="checkbox" checked="">
            <div id="loader" class=""><p><button type="submit" class="btn btn-primary mt-4 btn-block">Add model</button></p></div>
            <p>(*) Regardless of what gender you identify as, breasts require extra measurements. Hence why we ask.</p>
        </div>
    </div>
</form>
<!-- End of /components/model/add -->
