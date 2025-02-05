<?php

namespace app\controller;

use app\service\UserSignService;
use think\facade\Db;
use think\Request;

class UserSign
{
    protected $signService;
    public function __construct(){
        $this->signService = new UserSignService();
    }
    /**
     * 查询是否可以报名
     */
    public function canSign(Request $request){
        $uid = $request->auth['user_id'];
        $aid = $request->param('activity_id');
        if(!$this->signService->checkDeadline($aid)){
            return fail(4001,"报名已截止");
        }
        if(!$this->signService->checkIsSign($aid,$uid)){
            return fail(4001,"已报名");
        }
        return egg_response(true);
    }
    public function sign(Request $request){
        $uid = $request->auth['user_id'];
        $aid = $request->param('activity_id');
        return egg_response($this->signService->registration($aid,$uid));
    }
    public function cancelSign(Request $request){
        $uid = $request->auth['user_id'];
        $aid = $request->param('activity_id');
        return egg_response($this->signService->cancel($aid,$uid));
    }
    public function codeDecode(Request $request){
        $uid = $request->auth['user_id'];
        $code = $request->param('code');
        $plaintext = base64_decode($code);
        if ($plaintext === false) {
            // 解码失败，返回错误
            return fail(412,'解码失败');
        }
        // 提取管理员id、活动id和有效期
        try {
            list($adminId, $activityId, $type, $expiration) = explode('.', $plaintext);
        } catch (\Throwable $e) {
            return fail(411,'错误二维码');
        }
        // 如果当前时间超过有效期，则返回空
        if ($expiration < time()) {
            return fail(410,"签到码已过期");
        }
        $msg = $this->signService->sign($uid, $adminId, $activityId, $type);
        $res = $this->signService->getSignInfo($activityId,$uid);
        $res['msg'] = $msg;
        $res['type'] = $type;
        return egg_response($res);
    }
}