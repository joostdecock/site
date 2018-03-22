<?php

$api = 'https://joost.core.freesewing.org/';
$canSample = ['measure','percent','angle'];

$dir = getcwd();
chdir($dir);

// Failure counter
$fail = 0;


// Loaded prefetched backend data
$json = json_decode(file_get_contents('./json/freesewing.json'), true);

// Handle command line arguments
array_shift($argv);
$only = false;

if(count($argv) > 0) {
    foreach($argv as $name) {
        if(isset($json['mapping']['handleToPattern'][$name])) $only[] = $json['mapping']['handleToPattern'][$name];
    }
}

// Iterate over patterns
foreach($json['patterns'] as $pName => $p) {
    if((is_array($only) && in_array($pName, $only)) || $only === false) {
        h1($pName);
        h2("Sampling options");
        $handle = $p['info']['handle'];
        foreach($p['options'] as $oName => $o) {
            if(in_array($o['type'], $canSample)) {
                p('Sampling '.$oName);
                $cmd = "wget \"$api?service=sample&pattern=$pName&mode=options&option=$oName\" -O ./img/patterns/$handle/options/$oName-sample.svg -q";
                shell_exec($cmd);
                ok();
            } else {
                p('Skipping '.$oName);
                ok();
            }
        }
    }
}

function test($cmd) 
{
    $dir = getcwd();
    chdir($dir);
    $fullCmd = "php index.php $cmd 2>scripts/test.log";
    exec($fullCmd, $output, $result);
    $errors = file_get_contents("scripts/test.log");
    if($result === 0 && strlen($errors) === 0) {
        ok();
        return 0;
    } else {
        if ($result === 0) warn();
        else ko();
        p("Error output:\n\n$errors");
        p("Please fix these.");
        p("Reproduce with this command:");
        h3("./freesewing $cmd 1>/dev/null");
        p();
        return 1;
    }
}
p("All done :)\n\n");

function h1($string)
{
    echo "\n\n\033[33m$string\033[0m";
    echo "\n\n\033[33m".str_pad('-', 72, '-')."\033[0m";
}

function h2($string)
{
    echo "\n\n\033[33m  $string\033[0m";
}

function h3($string)
{
    echo "\n\n\033[33m    $string\033[0m";
}

function p($string)
{
    echo "\n".str_pad('    '.$string, 69, ' ');
}

function ok()
{
    echo "\033[32m OK \033[0m";
}

function ko()
{
    echo "\033[31m Problem! \033[0m";
}

function warn()
{
    echo "\033[33m Warning \033[0m";
}
