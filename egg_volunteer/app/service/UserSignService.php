<?php
declare (strict_types = 1);

namespace app\service;

use app\model\Approval;
use app\model\VolunteerActivity;
use app\model\VolunteerActivityRegistration;
use think\App;
use think\facade\Db;
use think\Service;

class UserSignService extends Service
{
    protected $vlar;
    protected $vla;
    protected $approval;
    public function __construct()
    {
        $this->approval = new Approval();
        $this->vlar = new VolunteerActivityRegistration();
        $this->vla = new VolunteerActivity();
    }
    public function checkDeadline($id){
        // 晚于截止时间返回false，不可报名
        $res = $this->vla->getByActivityId($id);
        if(strtotime($res['deadline'])<strtotime(date('Y-m-d H:i:s'))){
            return false;
        }else{
            return true;
        }
    }
    public function checkIsSign($aid,$uid){
        // 已报名返回false，不可再报名
        $res = $this->vlar->findUserSign($aid,$uid);
        if($res){
            if ($res['is_cancle']==0) return false;
            else return true;
        }else{
            return true;
        }
    }
    public function registration($aid,$uid){
        // 查询是否已有报名记录并是否截止报名（ddl是截止时间）
        if(!$this->checkDeadline($aid)) return "报名已截止";
        // 有，改状态
        $res = $this->vlar->findUserSign($aid,$uid);
        if($res){
            $activity_id = $res['activity_id'];
            if ($res['is_cancle']==1){
                $res = $res->save(['is_cancle'=>0]);
                $this->vla->where('activity_id',$activity_id)->update(['sign_person'=>Db::raw('sign_person + 1')]);
                return "报名成功";
            }else{
                return "请勿重复报名";
            }
        }else{
            // 无，则直接新增
            $this->vla->where('activity_id',$aid)->update(['sign_person'=>Db::raw('sign_person + 1')]);
            $this->vlar->save(['activity_id'=>$aid,'user_id'=>$uid]);
            $newId = $this->vlar->id;
            $this->approval->signApproval($newId,1);
            return '报名成功';
        }
    }
    /**
     * 取消报名
     */
    public function cancel($aid,$uid){
        $res = $this->vlar->findUserSign($aid,$uid);
        if($res){
            $activity_id = $res['activity_id'];
            if($res['is_cancle']==0){
                $res->save(['is_cancle'=>1]);
                $this->vla->where('activity_id',$activity_id)->update(['sign_person'=>Db::raw('sign_person - 1')]);
                return true;
            }
            return "请勿重复取消！";
        }
        return "暂未报名该活动";
    }
    public function sign($uid, $adminId, $activityId, $type){
        if ($type==1){
            //签到
            return $this->vlar->checkin($uid, $adminId, $activityId);
        }else{
            //签退
            return $this->vlar->checkout($uid, $adminId, $activityId);
        }
    }
    public function getSignInfo($aid,$uid){
        return $this->vlar->getSignInfo($aid,$uid);
    }
}
