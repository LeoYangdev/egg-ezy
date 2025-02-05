<?php

namespace app\service;

use app\model\Approval;
use app\model\VolunteerActivity;
use app\model\VolunteerActivityRegistration;

class ApprovalService
{
    protected $vlamodel;
    protected $vlarmodel;
    protected $approval;
    public function __construct()
    {
        $this->vlamodel = new VolunteerActivity();
        $this->vlarmodel = new VolunteerActivityRegistration();
        $this->approval = new Approval();
    }

    /**
     * 审核列表信息查询
     */
    public function getApproval($aid){
        $res = $this->vlamodel->findActivityById($aid);
        $res['signlist'] = $this->vlarmodel->getSignUser($aid);
        return $res;
    }
    public function checkApproval($rid,$type,$result,$adminId,$remarks){
        // approval表审核
        $res1 = $this->approval->doApproval($rid,$type,$result,$adminId,$remarks);
        // register表改状态
        $res2 = $this->vlarmodel->findUserRecordAndSave($rid,['status'=>$result],$result);
        return $res1==$res2;
    }
}