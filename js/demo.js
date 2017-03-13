/*
 *       __                           _           
 *      / _|_ _ ___ ___ ________ __ _(_)_ _  __ _ 
 *     |  _| '_/ -_) -_|_-< -_) V  V / | ' \/ _` |
 *     |_| |_| \___\___/__|___|\_/\_/|_|_||_\__, |
 *                   freesewing.org         |___/ 
 *  
 */


/* This is the freesewing demo */


///////////////////
// Configuration //
///////////////////

// Set the location of the API you want to connect to.
var api = 'https://api.freesewing.org';


///////////////////////////////////////////////////////////////////////////
// Don't change things below this line unless you know what you're doing //
///////////////////////////////////////////////////////////////////////////


// Spinner markup
var spinner =  '<p id="spinner" class="text-center"><i class="fa fa-spinner fa-pulse fa-fw fa-5x mt-5" aria-hidden="true"></i></p>';
// Breadcrumb markup
var arrow =  '<i class="fa fa-arrow-right ml-2 mr-2" aria-hidden="true"></i>';

/** 
 * Everything with the class .demo-trigger will 
 * call this function onClick, passing itself to it
 *
 * @param object object The object that we clicked upon
 */
function demo(object) 
{
    // The data-method attribute tells us what to do
    var method = object.attr('data-method');

    // unload-service restores the demo to its initial state
    if(method == 'unload-service') unloadService();

    // load-service loads one of the four services
    if(method == 'load-service') loadService(object.attr('data-service'));

    // pattern-info is part of the info service
    if(method == 'pattern-info') patternInfo(object.attr('data-pattern'));

    // draft-form, sample-form, and compare-form bring up the initial service screen
    if(method == 'draft-form') loadServiceEntryScreen('draft', object.attr('data-pattern'));
    if(method == 'sample-form') loadServiceEntryScreen('sample', object.attr('data-pattern'));
    if(method == 'compare-form') loadServiceEntryScreen('compare', object.attr('data-pattern'));
    
    // draft-pattern, sample-pattern, and compare-pattern bring up the final result
    if(method == 'draft-pattern') loadDraft('draft', object.attr('data-pattern'));
    if(method == 'sample-pattern') loadSample(object.attr('data-pattern'), object.attr('data-type'), object.attr('data-option'));
    if(method == 'compare-pattern') loadDraft('compare', object.attr('data-pattern'));
}

/**
 * Restores the demo to its initial state
 */
function unloadService() 
{
    $('#demo').html('');
    $('#breadcrumbs').hide();
    $('#service-chooser').show();
}

/**
 * Brings up the initial screen for a service
 *
 * @param string service The name of the service to load
 */
function loadService(service) 
{
    // Get service chooser out of the way and set spinner
    $('#service-chooser').hide();
    setSpinner();

    // Update breadcrumbs with new data
    var path = {
        step1 : {
            'state' : 'active',
            'title' : service + ' demo',
            'attributes' : {
                'data-method' : 'load-service',
                'data-service' : service
            }
        }
    }
    setBreadCrumbs(path, 'breadcrumbs');

    // Load method specific to each service
    if(service == 'info') loadInfoService();
    if(service == 'draft') loadPatternList('draft');
    if(service == 'sample') loadPatternList('sample');
    if(service == 'compare') loadPatternList('compare');
}

/**
 * Contacts the info service and displays results
 */
function loadInfoService() 
{
    // URL to connect to
    var url = api+'/?service=info';

    // Connecting via AJAX
    $.getJSON(url, function( data ) {
        // Response loaded
        clearSpinner();
        $('#breadcrumbs').show();
        addTabs(['Response','JSON','Request'],'info');
        $('#infotab-0').append( "<h2>API Information</h2>");
        $('#infotab-0').append( "<h3>Services</h3><ul id='servicesul'></ul>");
        $.each( data['services'], function( key, val ) {
            $("#servicesul").append( "<li>" + val + "</li>" );
        });

        $('#infotab-0').append( "<h3>Channels</h3><ul id='channels'></ul>");
        $.each( data['channels'], function( key, val ) {
            $("#channels").append( "<li>" + key + "<ul id='channels-"+key+"'></ul></li>" );
            $.each( val, function( subkey, subval ) {
                $("#channels-"+key).append( "<li>" + subval + "</li>" );
            });
        });

        $('#infotab-0').append( "<h3>Themes</h3><ul id='themes'></ul>");
        $.each( data['themes'], function( key, val ) {
            $("#themes").append( "<li>" + key + "<ul id='themes-"+key+"'></ul></li>" );
            $.each( val, function( subkey, subval ) {
                $("#themes-"+key).append( "<li>" + subval + "</li>" );
            });
        });

        $('#infotab-0').append( "<h3>Patterns</h3><p>Click on a pattern name to drill deeper.</p><ul id='patterns'></ul>");
        $.each( data['patterns'], function( key, val ) {
            $("#patterns").append( "<li>" + key + "<ul id='patterns-"+key+"'></ul></li>" );
            $.each( val, function( subkey, subval ) {
                $("#patterns-"+key).append( "<li><a href='#' class='demo-trigger' data-method='pattern-info' data-pattern='" + subkey + "'>" + subval + "</a></li>" );
            });
        });

        $('#infotab-1').html("<pre class=\"highlight\"><code>"+JSON.stringify(data, null, '    ')+"</code></pre>");
        $('#infotab-2').html("<h2>Request URL</h2>");
        $('#infotab-2').append("<pre class=\"highlight\"><code>"+url+"</code></pre>");
        $('#infotab-2').append("<h3>Request parameters</h3>");
        $('#infotab-2').append("<pre class='highlight'><code class='highlighter-rouge'>service: info</code></pre>");
        scrollTo('#demo');
    });
}

/**
 * Contacts the info service and displays a pattern list
 *
 * Takes the service name to be able to set the right attributes
 * on the generated links to drive the demo
 *
 * @param string service The service name
 */
function loadPatternList(service) 
{
    // Set spinner
    setSpinner();
    
    // Connecting via AJAX
    $.getJSON(api+'/?service=info', function( data ) {
        // Response loaded
        clearSpinner();
        $('#breadcrumbs').show();
        $('#demo').html('<h2>Choose a pattern to ' + service +'</h2>');
        $('#demo').append( "<ul id='patterns'></ul>");
        $.each( data['patterns'], function( key, val ) {
            $("#patterns").append( "<li>" + key + "<ul id='patterns-"+key+"'></ul></li>" );
            $.each( val, function( subkey, subval ) {
                $("#patterns-"+key).append( "<li><a href='#' class='demo-trigger' data-method='"+service+"-form' data-pattern='" + subkey + "'>" + subval + "</a></li>" );
            });
        });
        scrollTo('#demo');
    });
}

/**
 * Contacts the info service and displays pattern details
 *
 * @param string pattern The name of the pattern
 */
function patternInfo(pattern) 
{
    // Set spinner
    setSpinner();

    // Update breadcrumbs
    var path = {
        step1 : {
            'state' : 'inactive',
            'title' : 'info demo',
            'attributes' : {
                'data-method' : 'load-service',
                'data-service' : 'info'
            }
        },
        step2 : {
            'state' : 'active',
            'title' : 'Pattern info',
            'attributes' : {
                'data-method' : 'pattern-info',
                'data-pattern' : pattern
            }
        }
    }
    setBreadCrumbs(path, 'breadcrumbs');

    // URL to connect to
    var url = api+'/?service=info&pattern='+pattern;

    // Connecting via AJAX
    $.getJSON(url, function( data ) {
        // Response loaded
        clearSpinner();
        addTabs(['Response','JSON','Request'],'info');
        $('#infotab-0').append( "<h2>"+data.info['name']+"</h2>");
        $('#infotab-0').append( "<h3>Pattern info</h3>");
        $('#infotab-0').append(divTh('Key','Value'));
        $.each( data['info'], function( key, val ) {
            $('#infotab-0').append(divTr(key,val));
        });

        $('#infotab-0').append( "<h3>Pattern parts</h3>");
        $('#infotab-0').append(divTh('Part','Title'));
        $.each( data['parts'], function( key, val ) {
            $('#infotab-0').append(divTr(key,val));
        });

        if (typeof data['languages'] !== 'undefined') {
            $('#infotab-0').append( "<h3>Languages</h3>");
            $('#infotab-0').append(divTh('Code','Language'));
            $.each( data['languages'], function( key, val ) {
                $('#infotab-0').append(divTr(key,val));
            });
        }

        $('#infotab-0').append( "<h3>Measurements</h3>");
        $('#infotab-0').append(divTh('Name','Default value in mm'));
        $.each( data['measurements'], function( key, val ) {
            $('#infotab-0').append(divTr(key,val));
        });

        $('#infotab-0').append("<h3>Options</h3>");
        $.each( data['options'], function( key, val ) {
            if(val['type'] == 'measure') values = "Expects a value between " + asCode(val['min']) + " and " + asCode(val['max']) + ", default is " + asCode(val['default']);
            if(val['type'] == 'percent') values = "Expects a value between " + asCode(0) + " and " + asCode(100) + ", default is " + asCode(val['default']);
            if(val['type'] == 'chooseOne') {
                values = "Expects one of:<ul> ";
                $.each(val['options'], function( subkey, subval ) { values = values + "<li>" + asCode(subkey) + " &raquo; " + subval + "</li>"; });
                values = values + "</ul>Default is " + asCode(val['default']);
            }
            $("#infotab-0").append(divTr(key,"A <b>" + val['type'] + "</b> option. " + values));
        });

        if (typeof data['inMemoryOf'] !== 'undefined') {
            $('#infotab-0').append( "<h3>Did you know?</h3><ul id='memp'></ul>");
            $('#infotab-0').append("<p>This pattern was named in memory of <a href='" +  data['inMemoryOf']['link'] + "' target='_BLANK'>" +  data['inMemoryOf']['name'] + "</a>.</p>");
        }

        $('#infotab-1').html("<pre class=\"highlight\"><code>"+JSON.stringify(data, null, '    ')+"</code></pre>");
        $('#infotab-2').html("<h3>Request URL</h3>");
        $('#infotab-2').html("<pre class=\"highlight\"><code>"+url+"</code></pre>");
        $('#infotab-2').append("<h3>Request parameters</h3>");
        $('#infotab-2').append("<pre class='highlight'><code class='highlighter-rouge'>service: info\npattern: "+pattern+"</code></pre>");
        scrollTo('#demo');
    });
}

/**
 * Loads the first screen for the draft/sample/compare service
 *
 * @param string service The name of the service 
 * @param string pattern The name of the pattern
 */
function loadServiceEntryScreen(service, pattern) 
{
    // Set spinner
    setSpinner();

    // Update breadcrumbs
    var path = {
        step1 : {
            'state' : 'inactive',
            'title' : service+' demo',
            'attributes' : {
                'data-method' : 'load-service',
                'data-service' : service
            }
        },
        step2 : {
            'state' : 'active',
            'title' : 'Pattern '+service+' details',
            'attributes' : {
                'data-method' : service+'-form',
                'data-pattern' : pattern
            }
        }
    }
    setBreadCrumbs(path, 'breadcrumbs');

    // Call service-specific method
    if(service == 'draft') loadDraftForm(pattern);
    else if(service == 'sample') loadSampleScreen(pattern);
    else if(service == 'compare') loadCompareForm(pattern);
}

/**
 * Loads pattern form for the draft service
 *
 * @param string pattern The name of the pattern
 */
function loadDraftForm(pattern) 
{
    // URL to connect to
    var url = api+'/?service=info&pattern='+pattern;

    // Connecting via AJAX
    $.getJSON(url, function( data ) {
        // Response loaded
        clearSpinner();
        $('#demo').append( "<h2>Drafting "+pattern+"</h2>");
        $('#demo').append( "<p>You can update the measurements, options, theme, and language below.</p>");
        $('#demo').append( "<p>When you're happy, click the submit bottom at the bottom of this form.</p>");
        $('#demo').append( '<form class="form" id="form"></form>');
        $('#form').append( "<h3>Your measurements</h3>");
        var model = data['models']['default']['model'];
        $.each( data['measurements'], function( key, val ) {
            $('#form').append(formField('input', key, data['measurements'][key], 'metric'));
        });
        $('#form').append( "<h3>Pattern options</h3>");
        $.each( data['options'], function( key, val ) {
            $('#form').append( formField(val['type'], key, val, 'metric'));
        });
        $('#form').append( "<h3>General options</h3>");
        var themes = [];
        $('#form').append(spinner);
        
        // We need the list of themes, getting it from info service via AJAX
        $.getJSON(api+'/?service=info', function( infodata ) {
            // Response loaded
            clearSpinner();
            $('#form').append( chooseThemeField(infodata['themes'],['Info','Compare','Sample']));
            $('#form').append( chooseOneField('language', {'options': data['languages'],'default': 'en'}));
            $('#form').append( "<a href='#' id='submit' class='btn btn-primary demo-trigger mt-5 btn-lg' data-method='draft-pattern' data-pattern='"+pattern+"'>Draft pattern</a>" );
            scrollTo('#demo');
        });
    });
}

/**
 * Loads the sample screen for a given pattern
 *
 * @param string pattern The name of the pattern
 */
function loadSampleScreen(pattern) 
{
    // URL to connect to
    var url = api+'/?service=info&pattern='+pattern;

    // Connecting via AJAX
    $.getJSON(url, function( data ) {
        // Repsonse loaded
        clearSpinner();
        $('#demo').append( "<h2>Sampling "+pattern+"</h2>");
        $('#demo').append( "<p>You can sample measurements or options with the links below.</p>");
        $('#demo').append( '<form class="form" id="form"></form>');
        $('#form').append( "<h3>Sample measurements</h3><ul id='mesul'></ul>");
        $.each( data['models']['groups'], function( key, val ) {
            $('#mesul').append( '<li><a href="#" class="demo-trigger" data-method="sample-pattern" data-type="measurements" data-option="'+key+'" data-pattern="'+pattern+'">'+key+'</a> ('+val.length+' models)</li>');
        });
        $('#form').append( "<h3>Sample options</h3><ul id='opsul'></ul>");
        $.each( data['options'], function( key, val ) {
            $('#opsul').append( '<li><a class="demo-trigger" href="#" data-method="sample-pattern" data-type="options" data-option="'+key+'" data-pattern="'+pattern+'">'+key+'</a></li>');
        });
        scrollTo('#demo');
    });
}

/**
 * Loads pattern form for the compare service
 *
 * @param string pattern The pattern name
 */
function loadCompareForm(pattern) 
{
    var url = api+'/?service=info&pattern='+pattern;

    // Connecting via AJAX
    $.getJSON(url, function( data ) {
        // Response loaded
        clearSpinner();
        $('#demo').append( "<h2>Comparing "+pattern+"</h2>");
        $('#demo').append( "<p>You can update the measurements, options, theme, and language below.</p>");
        $('#demo').append( "<p>When you're happy, click the submit bottom at the bottom of this form.</p>");
        $('#demo').append( '<form class="form" id="form"></form>');
        $('#form').append( "<h3>Your measurements</h3>");
        var model = data['models']['default']['model'];
        $.each( data['measurements'], function( key, val ) {
            $('#form').append(formField('input', key, data['measurements'][key], 'metric'));
        });
        $('#form').append( "<h3>Pattern options</h3>");
        $.each( data['options'], function( key, val ) {
            $('#form').append( formField(val['type'], key, val, 'metric'));
        });
        $('#form').append( "<input type='hidden' name='theme' value='Compare'>");
        $('#form').append( "<a href='#' id='submit' class='btn btn-primary demo-trigger mt-5 btn-lg' data-method='compare-pattern' data-pattern='"+pattern+"'>Compare pattern</a>" );
        scrollTo('#demo');
    });
}

/**
 * Loads the result for both draft and compare services
 *
 * @param string service Name of the service (draft of compare)
 * @param string pattern Name of the pattern
 */
function loadDraft(service, pattern) 
{
    // Storing form data before setting spinner as it will trash our form
    var formdata = $("#form").serialize();
    var postdata = $("#form").serializeArray();

    // Setting spinner
    setSpinner();

    // Updating breadcrumbs
    var path = {
        step1 : {
            'state' : 'inactive',
            'title' : service+' demo',
            'attributes' : {
                'data-method' : 'load-service',
                'data-service' : service
            }
        },
        step2 : {
            'state' : 'inactive',
            'title' : 'Pattern '+service+' details',
            'attributes' : {
                'data-method' : service+'-form',
                'data-pattern' : pattern
            }
        },
        step3 : {
            'state' : 'active',
            'title' : 'Results',
            'attributes' : {
                'data-method' : service+'-pattern',
                'data-pattern' : pattern
            }
        }
    }
    setBreadCrumbs(path, 'breadcrumbs');

    // Figure caption
    if(service == 'compare') {
        var msg = 'Your '+pattern+' draft compared to drafts for the standard model group';
    } else {
        var msg = 'Your rendered '+pattern+' draft';
    }

    // URL to connect to
    var url = api+'/?service='+service+'&pattern='+pattern+'&embedFluid=1';

    // Connecting via AJAX. dataType is html so we can inject SVG in pre tag
    $.ajax({
        type: "POST",
        url: url,
        dataType: "html",
        data: formdata,
        success: function(data) {
            // Response loaded
            addTabs(['Result','SVG','Request'],'info');
            if($('#theme').val() == 'Developer') {
                data = jQuery.parseJSON(data);
            }
            $('#infotab-0').html("<figure class='image' id='svg-image'><div class='drop-shadow'>"+data+"</div></figure>");
            $('#svg-image').append("<figcaption id='svg-caption'>"+msg+"&nbsp;</figcaption>");
            $('#svg-caption').append("<a href='"+api+"?service="+service+"&pattern="+pattern+"&"+formdata+"' target='_BLANK'><i class='fa fa-external-link' aria-hidden='true'></i></a>");
            $('#infotab-1').html("<pre class='highlight'><code class='highlighter-rouge' id='svg-source'></code></pre>");
            $('#svg-source').text(data);
            $('#infotab-2').html("<h2>Request URL</h2>");
            $('#infotab-2').append("<pre class='highlight'><code class='highlighter-rouge'>"+api+"/?service="+service+"&pattern="+pattern+"&embedFluid=1</code></pre>");
            $('#infotab-2').append("<h2>Request parameters</h2>");
            $('#infotab-2').append("<pre class='highlight'><code class='highlighter-rouge'>service: "+service+"\npattern:"+pattern+"\nembedFluid: 1</code></pre>");
            $('#infotab-2').append("<h2>POST data</h2>");
            $('#infotab-2').append("<pre class='highlight'><code class='highlighter-rouge' id='post-data'></code></pre>");
            $.each(postdata, function( key, obj ) {
                $('#post-data').append(obj.name+': '+obj.value+"\n");
            });
    
            // Clear spinner
            clearSpinner();
        }
    });
}

/**
 * Loads the result for the sample service
 *
 * @param string service Name of the service (draft of compare)
 * @param string pattern Name of the pattern
 */
function loadSample(pattern, type, option) 
{
    // Storing form data before setting spinner as it will trash our form
    var formparams = $("#form").serialize();
    var formdata = JSON.stringify($("#form").serializeArray(),null, '    ');
    
    // Setting spinner
    setSpinner();

    // Updating breadcrumbs
    var path = {
        step1 : {
            'state' : 'inactive',
            'title' : 'sample demo',
            'attributes' : {
                'data-method' : 'load-service',
                'data-service' : 'sample'
            }
        },
        step2 : {
            'state' : 'inactive',
            'title' : 'Pattern sample details',
            'attributes' : {
                'data-method' : 'sample-form',
                'data-pattern' : pattern
            }
        },
        step3 : {
            'state' : 'active',
            'title' : 'Results',
            'attributes' : {
                'data-method' : 'sample-pattern',
                'data-pattern' : pattern,
                'data-type' : type,
                'data-option' : option
            }
        }
    }
    setBreadCrumbs(path, 'breadcrumbs');

    // Figure caption
    if(type == 'measurements') {
        var postdata = {'mode': 'measurements', 'samplerGroup': option};
        var msg = 'The '+pattern+' pattern with measurements sampled across the '+option+' model group';
        var link = api+"?service=sample&pattern="+pattern+"&mode=measurements&samplerGroup="+option;
    } else {
        var postdata = {'mode': 'options', 'option': option};
        var msg = 'The '+pattern+' pattern with the '+option+' option sampled';
        var link = api+"?service=sample&pattern="+pattern+"&mode=options&option="+option;
    }
    
    // URL to connect to
    var url = api+'/?service=sample&pattern='+pattern+'&embedFluid=1';

    // Connecting via AJAX. dataType is html so we can inject SVG in pre tag
    $.ajax({
        type: "POST",
        url: url,
        dataType: "html",
        data: postdata,
        success: function(data) {
            // Response loaded
            addTabs(['Result','SVG','Request'],'info');
            if($('#theme').val() == 'Developer') {
                data = jQuery.parseJSON(data);
            }
            $('#infotab-0').html("<figure class='image' id='svg-image'><div class='drop-shadow'>"+data+"</div></figure>");
            $('#svg-image').append("<figcaption id='svg-caption'>"+msg+"&nbsp;</figcaption>");
            $('#svg-caption').append("<a href='"+link+"' target='_BLANK'><i class='fa fa-external-link' aria-hidden='true'></i></a>");
            $('#infotab-1').html("<pre class='highlight'><code class='highlighter-rouge' id='svg-source'></code></pre>");
            $('#svg-source').text(data);
            $('#infotab-2').html("<h3>Request URL</h3>");
            $('#infotab-2').append("<pre class='highlight'><code class='highlighter-rouge'>"+url+"</code></pre>");
            $('#infotab-2').append("<h3>Request parameters</h3>");
            $('#infotab-2').append("<pre class='highlight'><code class='highlighter-rouge'>service: sample\npattern:"+pattern+"\nembedFluid: 1</code></pre>");
            $('#infotab-2').append("<h3>POST data</h3>");
            $('#infotab-2').append("<pre class='highlight'><code class='highlighter-rouge' id='post-data'></code></pre>");
            $.each(postdata, function( key, value ) {
                $('#post-data').append(key+': '+value+"\n");
            });
            
            // Clear spinner
            clearSpinner();
        }
    });
}

/**
 * Sets the breadcrumbs based on the data you pass to it
 *
 * @param object path The breadcrumb data
 * @param id string The id of the element to inject the breadcrumbs in
 */
function setBreadCrumbs(path, id)
{
    $('#'+id).html(breadCrumb('Demo home','not-active',{'data-method': 'unload-service'}));
    $.each(path, function( step, data ) {
        var state = data.state;
        var title = data.title;
        var attributes = data.attributes;
        $('#'+id).append(arrow);
        $('#'+id).append(breadCrumb(title,state,attributes));
    });
}

/**
 * Generates and returns the HTML for a single breadcrumb
 *
 * @param string title Breadcrumb text
 * @param string state Only relevant when it's 'active'
 * @param object attributes Attributes to give the breadcrumb link
 *
 * @return string HTML markup for a breadcrumb
 */
function breadCrumb(title, state, attributes) 
{
    var button = "<a class='demo-trigger btn btn-sm mt-1 ";
    if(state == 'active') button = button + "btn-info";
    else button = button + "btn-primary";
    button = button + "' href='#' ";
    $.each( attributes, function( key, value ) {
        button = button + key + "='" + value + "' ";
    });
    button = button + ">" + title + "</a> ";
    return button;
}

/**
 * Creates tabs in #demo
 *
 * @param array tabs Tabs to add
 * @param string scope A string to add to the tab IDs
 */
function addTabs(tabs, scope) 
{
    var list = $('<ul class="nav nav-tabs" role="tablist"></ul>');
    var div = $('<div class="tab-content"></div>');
    var active = 'active';
    $.each( tabs, function( i, name ) {
        list.append('<li class="nav-item"><a class="nav-link '+active+'" href="#'+scope+'tab-'+i+'" role="tab" data-toggle="tab">'+name+'</a></li>');
        div.append('<div role="tabpanel" class="tab-pane '+active+'" id="'+scope+'tab-'+i+'"></div>');
        active = '';
    });
    $('#demo').append(list);
    $('#demo').append(div);
}

/**
 * Sets the spinner, clears the demo
 */
function setSpinner() 
{
    $('#demo').html(spinner);
}

/**
 * Removes the spinner
 */
function clearSpinner() {
    $('#spinner').remove();
}

/**
 * Generates a table row in divs because tables suck
 *
 * @param string key The key of the row
 * @param string val The value of the row
 *
 * @return string HTML for a key/value row
 */
function divTr(key,val) 
{
    var row = "<div class='row tr-keyval'><div class='col-5 col-md-4 col-lg-3 td-key'>"+key+"</div><div class='col-7 col-md-8 col-lg-9 td-val'>"+val+"</div></div>";
    return row;
}

/**
 * Generates a table heading row in divs because tables suck
 *
 * @param string key The key of the heading row
 * @param string val The value of the heading row
 *
 * @return string HTML for a key/value heading row
 */
function divTh(key,val) 
{
    var row = "<div class='row th-keyval'><div class='col-5 col-md-4 col-lg-3 th-key'>"+key+"</div><div class='col-7 col-md-8 col-lg-9 th-val'>"+val+"</div></div>";
    return row;
}

/**
 * Returns parameter formatted as code
 *
 * @param string code The string to format as code
 *
 * @return string The html-formatted code
 */
function asCode(code) 
{
    var code = "<code class='highlighter-rouge'>"+code+"</code>";
    return code;
}

/**
 * Returns a form field based on parameters
 *
 * @param string type One of 'percent','measure', or 'chooseOne'
 * @param string key The id/name of the input
 * @param string val The value of the input
 * @param string units Unused for now
 *
 * @return a HTML-formatted form field
 */
function formField(type, key, val, units) 
{
    if(type == 'chooseOne') return chooseOneField(key, val);
    else return inputField(key, val, units);
}

/**
 * Returns a form input based on parameters
 *
 * @param string key The id/name of the input
 * @param string val The value of the input
 * @param string units Unused for now
 *
 * @return a HTML-formatted input field
 */
function inputField(key, val, units) 
{
    if(units == 'imperial') {
        unitsShort = '"';
    } else {
        unitsShort = 'cm';
    }
    if (val instanceof Object) {
        if(val['type'] == 'percent') {
            attr = ' max="100" min="0" ';
            value = val['default'];
            unitsShort = '%';
        }
        else {
            ' max = "'+val['max']+'" min="'+val['min']+'" ';
            value = val['default']/10;
        }
    } else {
        attr = '';
        value = val/10;
    }
    return '\
                <div class="input-group">\
                    <span class="input-group-addon td-key">'+key+'</span>\
                    <input class="form-number form-control" id="'+key+'" name="'+key+'" value="'+value+'" type="number" '+attr+'>\
                    <span class="input-group-addon">'+unitsShort+'</span>\
                </div>';
}

/**
 * Returns a form select based on parameters
 *
 * @param string key The id/name of the input
 * @param string val The value of the input
 *
 * @return a HTML-formatted select
 */
function chooseOneField(key, val) 
{
    var options;
    var selectThis = val['default'];
    var selected = '';
    $.each( val['options'], function( opkey, opval ) {
        if(selectThis == opkey) selected = ' selected ';
        else  selected = '';
        options = options + "<option value=\"" + opkey + "\" " + selected + ">" + opval + "</option>\n";
    });
    return '\
                <div class="input-group">\
                    <span class="input-group-addon td-key">'+key+'</span>\
                    <select class="form-control" id="'+key+'" name="'+key+'">\
                    ' + options + '\
                    </select>\
                </div>';
}

/**
 * Returns a form select for themes
 *
 * This is different from chooseOneField() because it 
 * allows you to exclude themes that are not valid for 
 * the current context.
 *
 * @param object themes The list of themes
 * @param array exclude An array of themes to exclude from the select
 *
 * @return a HTML-formatted select
 */
function chooseThemeField(themes, exclude) {
    var options;
    $.each( themes, function( key, val ) {
        $.each( val, function( subkey, subval ) {
            if($.inArray(subval,exclude) == -1) options = options + "<option value=\"" + subval + "\">" + subval + "</option>\n";
        });
    });
    return '\
                <div class="input-group">\
                    <span class="input-group-addon td-key">theme</span>\
                    <select class="form-control" id="theme" name="theme">\
                    ' + options + '\
                    </select>\
                </div>';
}

/**
 * Makes the browser scroll to the element with the id target
 *
 * @param string target ID of the element to scroll to
 */
function scrollTo(target) 
{
    var scrollTarget = $(target);
    $('html,body').animate({scrollTop: scrollTarget.offset().top});
}
