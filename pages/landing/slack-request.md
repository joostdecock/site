---
layout: cover
title: Join our Slack channel
tags: [slack]
permalink: /slack/
---
<div class="cover-body" markdown="1">
<h1 class="cover-heading" id="title">Join our Slack channel</h1>
The freesewing community on [Slack](http://slack.com) 
is the best place to ask questions, meet other freesewers, or just hang out and share a laugh.
{:.lead}

<form class="form" id="form">
  <label class="sr-only" for="inlineFormInput">Email</label>
  <input type="text" class="text-center form-control" id="email" placeholder="Your email address">
  <a href='#hamburger' id="submit" class="btn btn-lg btn-primary mt-4">Send me a Slack invite</a>
</form>

</div>
<script>
$(document).on('click', '#submit', function() { 
    $('#submit').html('<i class="fa fa-spinner fa-pulse fa-fw"></i>');
    var address = $('#email').val();
    $.ajax({
        type: "POST",
        url: 'http://bot.freesewing.org/slack/request/'+address,
        success: function(data) {
            $('#form').slideUp();
            $('#cancel').hide();
            $('#title').html('Great, now check your inbox');
            $('.lead').html("We've sent an email to "+address+" to confirm your address. As soon as you click the confirmation link within, we can get to work on your invite.");
            $('div.inner.cover').append("<a class='btn btn-lg btn-warning' href='/'>Back to the documentation</a>");
        
        }
    });
});
</script>
