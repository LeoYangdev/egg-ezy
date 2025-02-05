<?php
declare (strict_types = 1);

namespace app\model;

use think\facade\Db;
use think\Model;

/**
 * @mixin \think\Model
 */
class Approval extends Model
{
    private function sortByApprovalTime($a, $b) {
        $timeA = strtotime($a['approval_time']);
        $timeB = strtotime($b['approval_time']);

        if ($timeA === $timeB) {
            return 0;
        }

        return ($timeA > $timeB) ? -1 : 1;
    }
    public function signApproval($rid, $type){
        $data = [
            'registration_id'=>$rid,
            'activity_type'=>$type,
            'admin_id'=>0,
            'approval_result'=>0
        ];
        $this->save($data);
    }
    public function doApproval($rid,$type,$result,$adminId,$remarks){
        // $res = $this->where('registration_id',$rid)->where('activity_type',$type)->find();
        $data = [
            'registration_id'=>$rid,
            'activity_type'=>$type,
            'admin_id'=>$adminId,
            'approval_result'=>$result,
            'remarks'=>$remarks
        ];
        return $this->save($data);
    }

    /**
     * 只能返回十条审核信息
     * @param $uid
     * @return mixed
     */
    public function getUserApprovalMessage($uid){
        $res_volunteer = $this->alias('a')
            ->join('egg_volunteer_activity_registration var','var.registration_id=a.registration_id')
            ->join('egg_user_profile u','u.user_id=a.admin_id')
            ->join('egg_volunteer_activity va', 'var.activity_id=va.activity_id')
            ->field('var.user_id, u.name AS adminer, a.*, va.activity_name')
            ->order('approval_time','desc')
            ->limit(5)
            ->where('var.user_id',$uid)
            ->where('a.activity_type',1)
            ->select();
        $res_work = $this->alias('a')
            ->join('egg_workstudy_activity_registration war','war.registration_id=a.registration_id')
            ->join('egg_user_profile u','u.user_id=a.admin_id')
            ->join('egg_workstudy_activity wa', 'war.work_study_id=wa.work_study_id')
            ->field('war.user_id, u.name AS adminer, a.*, wa.job_name')
            ->order('approval_time','desc')
            ->limit(5)
            ->where('war.user_id',$uid)
            ->where('a.activity_type',2)
            ->select();

        $result = array_merge($res_volunteer->toArray(), $res_work->toArray());
        // 使用 usort 函数对结果数组进行排序
        usort($result, array($this,'sortByApprovalTime'));
        return $result;
    }
}
