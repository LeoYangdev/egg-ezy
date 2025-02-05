<?php
declare (strict_types = 1);

namespace app\model;

use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\facade\Db;
use think\Model;

/**
 * @mixin \think\Model
 */
class VolunteerActivityRegistration extends Model
{
    public function findUserSign($aid,$uid){
        return $this->where("activity_id",$aid)->where("user_id",$uid)->find();
    }
    /**
     * 获取当前用户所报名的活动信息,包括审核信息
     */
    public function getUserActivity($page = 1, $limit = 10, $userid = null){
        // 查询数据总数
        $total = $this->where('user_id',$userid)->count();
        $totalPage = ceil($total / $limit);
        // 计算偏移量
        $offset = ($page - 1) * $limit;
        // 找到用户相关的报名活动
        $registrations = $this->where('user_id', $userid)->where('is_cancle', 0)->limit($offset, $limit)->order('create_time', 'asc')->select();
        // 获取报名活动的 ID 列表和对应的状态
        $activityIds = [];
        $statusMap = []; // 存储活动ID对应的状态
        foreach ($registrations as $registration) {
            $activityIds[] = $registration['activity_id'];
            $statusMap[$registration['activity_id']] = $registration['status'];
        }

        // 查询数据列表
        $works = Db::table('egg_volunteer_activity')
            ->whereIn('activity_id', $activityIds)->order('create_time', 'asc')
            ->select();

        $modifiedWorks = [];

        // 将状态信息与查询结果关联起来
        foreach ($works as $work) {
            $modifiedWork = $work;
            $modifiedWork['registerStatus'] = $statusMap[$work['activity_id']] ?? null;
            $modifiedWorks[] = $modifiedWork;
        }
        // 构造返回数据
        $data = [
            'total' => $totalPage,
            'page' => $page,
            'limit' => $limit,
            'data' => $modifiedWorks,
        ];
        return $data;

    }
    public function searchActivity($keyword, $userid = null){
        $total = 10;
        $limit = 10;
        $totalPage = ceil($total / $limit);
        $page = 1;
        // 找到用户相关的报名活动
        $registrations = $this->where('user_id', $userid)->where('is_cancle',0)->limit($limit)->order('create_time', 'asc')->select();
        // 获取报名活动的 ID 列表
        $activityIds = [];
        $statusMap = []; // 存储活动ID对应的状态
        foreach ($registrations as $registration) {
            $activityIds[] = $registration['activity_id'];
            $statusMap[$registration['activity_id']] = $registration['status'];
        }

        $works = Db::table('egg_volunteer_activity')
            ->where('activity_name', 'like', '%' . $keyword . '%')
            ->whereIn('activity_id', $activityIds)->order('create_time', 'asc')->select();
        $modifiedWorks = [];

        // 将状态信息与查询结果关联起来
        foreach ($works as $work) {
            $modifiedWork = $work;
            $modifiedWork['registerStatus'] = $statusMap[$work['activity_id']] ?? null;
            $modifiedWorks[] = $modifiedWork;
        }
        // 构造返回数据
        $data = [
            'total' => $totalPage,
            'page' => $page,
            'limit' => $limit,
            'data' => $modifiedWorks,
        ];
        return $data;
    }

    /**
     * 活动统计功能查询
     */
    public function TotalUserActivity($page = 1, $limit = 10, $userid = null){
        // 查询数据总数
        $total = $this->where('user_id',$userid)->where('status', 1)->where('is_cancle', 0)->count();
        $totalPage = ceil($total / $limit);
        // 计算偏移量
        $offset = ($page - 1) * $limit;
        // 找到用户相关的报名活动
        $registrations = $this->where('user_id', $userid)->where('status', 1)->where('is_cancle', 0)->limit($offset, $limit)->order('create_time', 'asc')->select();
        // 获取报名活动的 ID 列表和对应的状态
        $activityIds = [];
        $statusMap = []; // 存储活动ID对应的状态
        $durationMap = [];
        $totalduration = 0;
        foreach ($registrations as $registration) {
            $activityIds[] = $registration['activity_id'];
            $statusMap[$registration['activity_id']] = $registration['status'];
            if ($registration['check_in_status']!=1 || $registration['check_out_status']!=1){
                $durationMap[$registration['activity_id']] = 0;
            } else {
                // 将时间字符串转换为 Unix 时间戳
                $checkInTime = strtotime($registration['check_in_time']);
                $checkOutTime = strtotime($registration['check_out_time']);
                // 计算时间差并转换为分钟数
                $timeDifferenceInSeconds = $checkOutTime - $checkInTime;
                $timeDifferenceInMinutes = $timeDifferenceInSeconds / 60;
                $durationMap[$registration['activity_id']] = $timeDifferenceInMinutes;
                $totalduration += $timeDifferenceInMinutes;
            }
        }

        // 查询数据列表
        $works = Db::table('egg_volunteer_activity')
            ->whereIn('activity_id', $activityIds)->order('create_time', 'asc')
            ->select();

        $modifiedWorks = [];

        // 将状态信息与查询结果关联起来
        foreach ($works as $work) {
            $modifiedWork = $work;
            $modifiedWork['registerStatus'] = $statusMap[$work['activity_id']] ?? null;
            $modifiedWork['duration'] = $durationMap[$work['activity_id']];
            $modifiedWorks[] = $modifiedWork;
        }
        // 构造返回数据
        $data = [
            'total' => $totalPage,
            'page' => $page,
            'limit' => $limit,
            'data' => $modifiedWorks,
            'total_duration' => $totalduration,
            'total_num' => $total
        ];
        return $data;
    }
    public function searchUserActivityTotal($keyword, $userid = null){
        $total = 10;
        $limit = 10;
        $totalPage = ceil($total / $limit);
        $page = 1;
        // 找到用户相关的报名活动
        $registrations = $this->where('user_id', $userid)->where('is_cancle',0)->limit($limit)->order('create_time', 'asc')->select();
        // 获取报名活动的 ID 列表
        $activityIds = [];
        $statusMap = []; // 存储活动ID对应的状态
        $durationMap = [];
        foreach ($registrations as $registration) {
            $activityIds[] = $registration['activity_id'];
            $statusMap[$registration['activity_id']] = $registration['status'];
            if ($registration['check_in_status']!=1 || $registration['check_out_status']!=1){
                $durationMap[$registration['activity_id']] = 0;
            } else {
                // 将时间字符串转换为 Unix 时间戳
                $checkInTime = strtotime($registration['check_in_time']);
                $checkOutTime = strtotime($registration['check_out_time']);
                // 计算时间差并转换为分钟数
                $timeDifferenceInSeconds = $checkOutTime - $checkInTime;
                $timeDifferenceInMinutes = $timeDifferenceInSeconds / 60;
                $durationMap[$registration['activity_id']] = $timeDifferenceInMinutes;
            }
        }
        $works = Db::table('egg_volunteer_activity')
            ->where('activity_name', 'like', '%' . $keyword . '%')
            ->whereIn('activity_id', $activityIds)->order('create_time', 'asc')->select();

        $modifiedWorks = [];

        // 将状态信息与查询结果关联起来
        foreach ($works as $work) {
            $modifiedWork = $work;
            $modifiedWork['registerStatus'] = $statusMap[$work['activity_id']] ?? null;
            $modifiedWork['duration'] = $durationMap[$work['activity_id']];
            $modifiedWorks[] = $modifiedWork;
        }
        // 构造返回数据
        $data = [
            'total' => $totalPage,
            'page' => $page,
            'limit' => $limit,
            'data' => $modifiedWorks,
        ];
        return $data;
    }
    public function checkin($uid,$admin,$aid){
        // 是否已报名/已取消
        $res = $this->where('user_id',$uid)->where('activity_id',$aid)->find();
        $activity = Db::table('egg_volunteer_activity')->where('activity_id',$aid)->find();
        $now = date('Y-m-d H:i:s');
        if(strtotime($activity['start_time'])>strtotime($now)+7200){
            return "活动尚未开始，最多提前两小时签到";
        }
        if (strtotime($activity['start_time'])>strtotime($now)){
            $now = date('Y-m-d H:i:s',strtotime($activity['start_time']));
        }
        if(!$res || $res['is_cancle']==1){
            return "尚未报名或已取消报名！";
        }
        if($res['status']!=1){
            return "报名审核尚未通过！";
        }
        if($res['check_in_status']==1){
            return "请勿重复签到";
        }
        $data = [
            'check_in_status'=>1,
            'check_in_time'=>$now
        ];
        return $res->save($data);
    }
    public function checkout($uid,$admin,$aid){
        $res = $this->where('user_id',$uid)->where('activity_id',$aid)->find();
        $activity = Db::table('egg_volunteer_activity')->where('activity_id',$aid)->find();
        $now = date('Y-m-d H:i:s');
        if(strtotime($activity['end_time'])+7200<strtotime($now)){
            return "活动已结束超过两小时，无法签退";
        }
        if (strtotime($activity['end_time'])<strtotime($now)){
            $now = date('Y-m-d H:i:s',strtotime($activity['end_time']));
        }
        if(!$res || $res['is_cancle']==1){
            return "尚未报名或已取消报名！";
        }
        if ($res['check_in_status']==0){
            return "还未签到，请先签到";
        } elseif ($res['check_out_status']==1){
            return "请勿重复签退";
        }
        $data = [
            'check_out_status'=>1,
            'check_out_time'=>$now
        ];
        $now_timestamp = strtotime($now);
        $check_in_time_timestamp = strtotime($res['check_in_time']);
        $seconds_difference = $now_timestamp - $check_in_time_timestamp;
        $hours_difference = $seconds_difference / 3600;
        Db::table('egg_user_profile')->where('user_id',$uid)->update(['volunteer_hours'=>Db::raw('volunteer_hours+'.$hours_difference)]);
        return $res->save($data);
    }
    public function getSignInfo($aid, $uid){
        $activityInfo = Db::table('egg_volunteer_activity')->where('activity_id',$aid)->find();
        $signInfo = $this->where('activity_id',$aid)->where('user_id',$uid)
            ->field(['check_in_status','check_out_status','check_in_time','check_out_time'])->find();
        $activityInfo['sign']=$signInfo;
        return $activityInfo;
    }
    public function getSignUser($aid){
        $res = $this->where('activity_id',$aid)->where('is_cancle',0)->order('create_time','asc')->select();
        $userInfos = [];
        $usermodel = new User();
        foreach ($res as $user) {
            $userInfo = $usermodel->getUserInfo($user['user_id']);
            $userInfo['sign_time'] = $user['create_time'];
            $userInfo['register_status'] = $user['status'];
            $userInfo['rid'] = $user['registration_id'];
            $userInfos[] = $userInfo;
        }
        return $userInfos;
    }
    public function getAccessUser($aid){
        $res = $this->where('activity_id',$aid)->where('status',1)->where('is_cancle',0)->order('create_time','asc')->select();
        $userInfos = [];
        $usermodel = new User();
        foreach ($res as $user) {
            $userInfo = $usermodel->getUserInfo($user['user_id']);
            $userInfo['sign_time'] = $user['create_time'];
            $userInfo['register_status'] = $user['status'];
            $userInfo['rid'] = $user['registration_id'];
            $userInfos[] = $userInfo;
        }
        return $userInfos;
    }
    public function findUserRecordAndSave($id, $data, $result){
        $res = $this->where('registration_id',$id)->find();
        // 审核通过
        if($result==1){
            Db::table('egg_volunteer_activity')->where('activity_id',$res['activity_id'])->update(['access_person'=>Db::raw('access_person + 1')]);
        }
        // 撤销审核
        if($res['status']==1 && $result==0){
            Db::table('egg_volunteer_activity')->where('work_study_id',$res['work_study_id'])->update(['access_person'=>Db::raw('access_person - 1')]);
        }
        return $res->save($data);
    }
}
