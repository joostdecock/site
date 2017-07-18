(function ($) {
    $(document).ready(function () {
        var page = window.location.pathname;
        var pHandle = page.split('/')[3].toLowerCase();
        $('#oc-right').append('<ul id="markdown-toc"></ul>');    
        // Load site data
        $.get('/json/freesewing.json', function( fsdata ) {
            var list = Object.keys(fsdata.patterns[fsdata.mapping.handleToPattern[pHandle]].measurements);
            // Clear spinner
            $('#measurements').html('');
            $.each(list.sort(), function(index, m){
                $('#markdown-toc').append('<li><a href="#'+m+'">'+m+'</a></li>');    
                $('#measurements').append('<h2 id="'+m+'">'+m+'</h2><div id="'+m+'-markup"></div>');    
                $('#'+m+'-markup').load('/components/measurements/'+m.toLowerCase());
            });
        });
    });
}(jQuery));
