(function ($) {
    $(document).ready(function () {
        var page = window.location.pathname;
        var pHandle = page.split('/')[3].toLowerCase();
        $('#oc-right').append('<ul id="markdown-toc"></ul>');    
        // Load site data
        $.get('/json/freesewing.json', function( fsdata ) {
            var pattern = fsdata.patterns[fsdata.mapping.handleToPattern[pHandle]];
            // Clear spinner
            $('#options').html('');
            // Load content
            $.each(pattern.optiongroups, function(groupname, groupkeys){
                $('#markdown-toc').append('<li><a class="text-capitalize" href="#'+groupname+'"><b>'+groupname+'</b></a><ul id="group-'+groupname+'-toc"></ul></li>');    
                $('#options').append('<h2 id="'+groupname+'" class="text-capitalize">'+groupname+'</h2>');
                $.each(groupkeys, function(oindex, optionname){
                    var option = pattern.options[optionname];
                    $('#group-'+groupname+'-toc').append('<li><a href="#'+optionname+'">'+option.title+'</a></li>');    
                    $('#options').append('<h3 id="'+optionname+'">'+option.title+'</h3><div id="'+optionname+'-markup"></div>');
                    $.ajax({
                        // Fetching documentation for this option
                        url: '/components/pattern-options/'+pHandle.toLowerCase()+'/'+optionname.toLowerCase(),
                        method: 'GET',
                        dataType: 'html',
                        success: function(data) {
                            // add to page
                            $('#'+optionname+'-markup').html(data);
                        },
                        error: function(data) {
                            // show msg that we don't seem to have docs for this option 
                            var msg = '<blockquote class="error">';
                            msg += '<h5>This documentation is missing</h5>';
                            msg += '<p>We don\'t seem to have documentation for the <b>'+optionname+'</b> option. That shouldn\'t happen, so I encourage you to report this.<p>';
                            msg += '</blockquote>';
                            msg += '<blockquote class="link">';
                            msg += '<h5>Help us out and submit this report</h5>';
                            msg += '<p>Looks like you\'ve hit a snag. Those things happen, but you could help us prevent it from happening in the future.</p>';
                            msg += 'We have gathered all the info we need to investigate this, but we need you to take the last step of submitting the issue to GitHub.</p>';
                            msg += '<p>So would you do us a favor and report this? Thank you :)</p>';
                            msg += '<p><a target="_BLANK" class="btn btn-primary" ';
                            msg += 'href="https://github.com/freesewing/site/issues/new?title='+pHandle+' '+optionname+' option is undocumented';
                            msg += '&labels[]=documentation';
                            msg += '&body=The '+optionname+' option in group '+groupname+' of the '+name+' pattern (aka '+pHandle+') is undocumented.';
                            msg += '%0A%0AFeel free to include comments, but please keep the line above intact.">';
                            msg += 'Send report to GitHub</a></p>';
                            msg += '<p>PS: This will open a new window where you just have to click the <b>Submit new issue</b> button.</p></blockquote>';
                            $('#'+optionname+'-markup').html(msg);
                        },
                    }); 
                });
            });
        });
    });
}(jQuery));
