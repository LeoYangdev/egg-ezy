<?php

namespace app\controller;

use app\service\DgutService;
use think\Request;

class DgutAuth
{
    protected $dgutService;
    public function __construct()
    {
        $this->dgutService = new DgutService();
    }
    public function updateDguter(Request $request){
        $uid = $request->auth['user_id'];
        $user = $request->param('username');
        $password = $request->param('password');
        return egg_response($this->dgutService->updateUserInfo($uid,$user,$password));
    }
}