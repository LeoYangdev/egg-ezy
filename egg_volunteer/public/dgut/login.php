<?php

header('content-type:text/html;charset="utf-8";');

$post_data = file_get_contents('php://input');
$request = json_decode($post_data,true);
$username = $request['username'];
$password = $request['password'];

$responddata=[];
// 验证中央认证系统密码是否正确
include('./dgut_login.php');
$obj = new dgutuser($username,$password);
$res = $obj->login_session();
if($res == 0){
    $responddata['code'] = 404;
    $responddata['message'] = "中央认证不通过";
    echo json_encode($responddata);
    exit;
}
if($res == 1){
    $responddata['code'] = 200;
    $responddata['message'] = "中央认证通过";
    echo json_encode($responddata);
    exit;
}

?>