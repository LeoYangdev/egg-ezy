<?php

namespace app\controller;

use app\service\UserWorkSignService;
use think\Request;

class UserWorkSign
{
    protected $signWorkService;
    public function __construct(){
        $this->signWorkService = new UserWorkSignService();
    }
    public function canSign(Request $request){
        $uid = $request->auth['user_id'];
        $wid = $request->param('work_study_id');
        if(!$this->signWorkService->checkDeadline($wid)){
            return fail(4001,"报名已截止");
        }
        if(!$this->signWorkService->checkIsSign($wid,$uid)){
            return fail(4001,"已报名");
        }
        return egg_response(true);
    }
    public function sign(Request $request){
        $uid = $request->auth['user_id'];
        $wid = $request->param('work_study_id');
        return egg_response($this->signWorkService->registration($wid,$uid));
    }
    public function cancelSign(Request $request){
        $uid = $request->auth['user_id'];
        $wid = $request->param('work_study_id');
        return egg_response($this->signWorkService->cancel($wid,$uid));
    }
}