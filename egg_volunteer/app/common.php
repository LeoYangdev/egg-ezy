<?php
// 应用公共文件
use think\Response;

if (!function_exists('fail')){
    function fail($code = 401, $msg = ""){
        return Response::create([
            'code' => $code,
            'msg' => $msg
            ], 'json', 200);
    }
}
if (!function_exists('egg_response')){
    function egg_response($data, $code=200, $msg="成功"){
        return Response::create([
                'code' => $code,
                'msg' => $msg,
                'data' => $data
            ]
            , 'json', 200);
    }
}