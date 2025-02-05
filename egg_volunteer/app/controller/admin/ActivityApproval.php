<?php

namespace app\controller\admin;
use app\common\ActivityLog;
use app\service\ApprovalService;
use think\Request;

class ActivityApproval
{
    protected $approvalService;
    public function __construct()
    {
        $this->approvalService = new ApprovalService();
    }
    public function getUserSignUser(Request $request){
        $aid = $request->param('id');
        $res = $this->approvalService->getApproval($aid);
        return egg_response($res);
    }
    public function approval(Request $request){
        $uid = $request->auth['user_id'];
        $rid = $request->param('rid');
        $type = $request->param('type');
        $result = $request->param('result');
        $remarks = $request->param('remarks') ? $request->param('remarks'):'null';
        ActivityLog::log($uid, ActivityLog::OPERATION_TYPE_AUDIT, '审核活动报名'.$result, $rid);
        return egg_response($this->approvalService->checkApproval($rid,$type,$result,$uid,$remarks));
    }
}