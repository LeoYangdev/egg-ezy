<?php

namespace app\controller;

use app\model\Approval;
use app\Request;

class ApprovalMessage
{
    protected $approvalModel;
    public function __construct()
    {
        $this->approvalModel = new Approval();
    }
    public function getApproval(Request $request){
        $uid = $request->auth['user_id'];
        return egg_response($this->approvalModel->getUserApprovalMessage($uid));
    }
}