---
permalink: /snippets/reset/form
---
<!-- Start of /snippets/reset/form -->
<form id="reset-form">
  <div class="form-group field-container">
    <input type="password" name="reset-password" class="field" id="password" placeholder="Password" required>
    <label class="floating-label">Password</label> 
    <input type="hidden" name="reset-handle" id="handle">
    <input type="hidden" name="reset-token" id="token">
  </div>
  <button type="submit" class="btn btn-primary btn-block btn-lg mt-4">Save password</button>
</form>
<!-- End of /snippets/reset/form -->
