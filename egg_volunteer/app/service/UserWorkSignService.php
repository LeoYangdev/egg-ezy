<?php

namespace app\service;


use app\model\Approval;
use app\model\WorkstudyActivity;
use app\model\WorkstudyActivityRegistration;
use think\facade\Db;

class UserWorkSignService
{
    protected $workremodel;
    protected $workmodel;
    protected $approval;
    public function __construct()
    {
        $this->approval = new Approval();
        $this->workremodel = new WorkstudyActivityRegistration();
        $this->workmodel = new WorkstudyActivity();
    }
    public function checkDeadline($id){
        // 晚于截止时间返回false，不可报名
        $res = $this->workmodel->getByWorkStudyId($id);
        if(strtotime($res['deadline'])<strtotime(date('Y-m-d H:i:s'))){
            return false;
        }else{
            return true;
        }
    }
    public function checkIsSign($wid,$uid){
        // 已报名返回false，不可再报名
        $res = $this->workremodel->findUserSign($wid,$uid);
        if($res){
            if ($res['is_cancle']==0) return false;
            else return true;
        }else{
            return true;
        }
    }

    /**
     * 报名接口
     * @param $wid
     * @param $uid
     * @return string
     */
    public function registration($wid,$uid){
        // 查询是否已有报名记录并是否截止报名（ddl是截止时间）
        if(!$this->checkDeadline($wid)) return "报名已截止";
        // 有，改状态
        $res = $this->workremodel->findUserSign($wid,$uid);
        if($res){
            $workstudyid = $res['work_study_id'];
            if ($res['is_cancle']==1){
                $res = $res->save(['is_cancle'=>0]);
                $this->workmodel->where('work_study_id',$workstudyid)->update(['sign_person'=>Db::raw('sign_person + 1')]);
                return "报名成功";
            }else{
                return "请勿重复报名";
            }
        }else{
            // 无，则直接新增
            $this->workmodel->where('work_study_id',$wid)->update(['sign_person'=>Db::raw('sign_person + 1')]);
            $this->workremodel->save(['work_study_id'=>$wid,'user_id'=>$uid]);
            $newId = $this->workremodel->id;
            $this->approval->signApproval($newId,2);
            return '报名成功';
        }
    }
    /**
     * 取消报名
     */
    public function cancel($wid,$uid){
        $res = $this->workremodel->findUserSign($wid,$uid);
        if($res){
            $workstudyid = $res['work_study_id'];
            if($res['is_cancle']==0){
                $res->save(['is_cancle'=>1]);
                $this->workmodel->where('work_study_id',$workstudyid)->update(['sign_person'=>Db::raw('sign_person - 1')]);
                return true;
            }
            return "请勿重复取消！";
        }
        return "暂未报名该活动";
    }
}