<?php

namespace app\service;

use app\model\Approval;
use app\model\WorkstudyActivity;
use app\model\WorkstudyActivityRegistration;

class WorkApprovalService
{
    protected $workmodel;
    protected $workremodel;
    protected $approval;
    public function __construct()
    {
        $this->workmodel = new WorkstudyActivity();
        $this->workremodel = new WorkstudyActivityRegistration();
        $this->approval = new Approval();
    }

    /**
     * 审核列表信息查询
     */
    public function getApproval($wid){
        $res = $this->workmodel->findWorkById($wid);
        $res['signlist'] = $this->workremodel->getSignUser($wid);
        return $res;
    }
    public function checkApproval($rid,$type,$result,$adminId,$remarks){
        // approval表审核
        $res1 = $this->approval->doApproval($rid,$type,$result,$adminId,$remarks);
        // register表改状态
        $res2 = $this->workremodel->findUserRecordAndSave($rid,['status'=>$result],$result);
        return $res1==$res2;
    }
}