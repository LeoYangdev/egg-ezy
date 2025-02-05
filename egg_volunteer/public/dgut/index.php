<?php
    header('Content-Type:application/json; charset=utf-8');
    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];
    $command = 'python test.py -u '.$username.' -p '.$password;
    $output = shell_exec($command);
    echo iconv("GBK", "UTF-8", $output);
?>