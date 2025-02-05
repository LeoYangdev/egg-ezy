<?php
declare (strict_types = 1);

namespace app\model;

use think\facade\Db;
use think\Model;

/**
 * @mixin \think\Model
 */
class WorkstudyActivityRegistration extends Model
{
    public function findUserSign($wid,$uid){
        return $this->where("work_study_id",$wid)->where("user_id",$uid)->find();
    }
    /**
     * 获取当前用户所报名的活动信息
     */
    public function getUserWork($page = 1, $limit = 10, $userid = null){
        // 查询数据总数
        $total = $this->count();
        $totalPage = ceil($total / $limit);
        // 计算偏移量
        $offset = ($page - 1) * $limit;
        // 找到用户相关的报名活动
        $registrations = $this->where('user_id', $userid)->where('is_cancle',0)->limit($offset, $limit)->order('create_time', 'asc')->select();
        // 获取报名活动的 ID 列表
        $activityIds = [];
        $statusMap = []; // 存储活动ID对应的状态
        foreach ($registrations as $registration) {
            $activityIds[] = $registration['work_study_id'];
            $statusMap[$registration['work_study_id']] = $registration['status'];
        }

        // 查询数据列表
        $works = Db::table('egg_workstudy_activity')
            ->whereIn('work_study_id', $activityIds)->order('create_time', 'asc')
            ->select();
        $modifiedWorks = [];

        // 将状态信息与查询结果关联起来
        foreach ($works as $work) {
            $modifiedWork = $work;
            $modifiedWork['registerStatus'] = $statusMap[$work['work_study_id']] ?? null;
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
    public function searchWork($keyword, $userid = null){
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
            $activityIds[] = $registration['work_study_id'];
            $statusMap[$registration['work_study_id']] = $registration['status'];
        }
        $works = Db::table('egg_workstudy_activity')
            ->where('job_name', 'like', '%' . $keyword . '%')
            ->whereIn('work_study_id', $activityIds)->order('create_time', 'asc')->select();
        $modifiedWorks = [];

        // 将状态信息与查询结果关联起来
        foreach ($works as $work) {
            $modifiedWork = $work;
            $modifiedWork['registerStatus'] = $statusMap[$work['work_study_id']] ?? null;
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
    public function TotalUserWork($page = 1, $limit = 10, $userid = null){
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
        $totalduration = 0;
        foreach ($registrations as $registration) {
            $activityIds[] = $registration['work_study_id'];
            $statusMap[$registration['work_study_id']] = $registration['status'];
        }

        // 查询数据列表
        $works = Db::table('egg_workstudy_activity')
            ->whereIn('work_study_id', $activityIds)->order('create_time', 'asc')
            ->select();

        $modifiedWorks = [];

        // 将状态信息与查询结果关联起来
        foreach ($works as $work) {
            $modifiedWork = $work;
            $modifiedWork['registerStatus'] = $statusMap[$work['work_study_id']] ?? null;
            // 将时间字符串转换为 Unix 时间戳
            $checkInTime = strtotime($modifiedWork['start_time']);
            $checkOutTime = strtotime($modifiedWork['end_time']);
            // 计算时间差并转换为分钟数
            $timeDifferenceInSeconds = $checkOutTime - $checkInTime;
            $timeDifferenceInMinutes = $timeDifferenceInSeconds / 60;
            $totalduration += $timeDifferenceInMinutes;
            $modifiedWork['duration'] = $timeDifferenceInMinutes;
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
    public function searchUserWorkTotal($keyword, $userid = null){
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
            $activityIds[] = $registration['work_study_id'];
            $statusMap[$registration['work_study_id']] = $registration['status'];
        }
        $works = Db::table('egg_workstudy_activity')
            ->where('job_name', 'like', '%' . $keyword . '%')
            ->whereIn('work_study_id', $activityIds)->order('create_time', 'asc')->select();

        $modifiedWorks = [];
        // 将状态信息与查询结果关联起来
        foreach ($works as $work) {
            $modifiedWork = $work;
            $modifiedWork['registerStatus'] = $statusMap[$work['work_study_id']] ?? null;
            // 将时间字符串转换为 Unix 时间戳
            $checkInTime = strtotime($modifiedWork['start_time']);
            $checkOutTime = strtotime($modifiedWork['end_time']);
            // 计算时间差并转换为分钟数
            $timeDifferenceInSeconds = $checkOutTime - $checkInTime;
            $timeDifferenceInMinutes = $timeDifferenceInSeconds / 60;
            $modifiedWork['duration'] = $timeDifferenceInMinutes;
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
    public function getSignUser($wid){
        $res = $this->where('work_study_id',$wid)->where('is_cancle',0)->order('create_time','asc')->select();
        $userInfos = [];
        $usermodel = new User();
        foreach ($res as $user) {
            $userInfo = $usermodel->getUserInfo($user['user_id']);
            $userInfo['register_status'] = $user['status'];
            $userInfo['rid'] = $user['registration_id'];
            $userInfos[] = $userInfo;
        }
        return $userInfos;
    }
    public function getAccessUser($wid){
        $res = $this->where('work_study_id',$wid)->where('status',1)->where('is_cancle',0)->order('create_time','asc')->select();
        $userInfos = [];
        $usermodel = new User();
        foreach ($res as $user) {
            $userInfo = $usermodel->getUserInfo($user['user_id']);
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
            Db::table('egg_workstudy_activity')->where('work_study_id',$res['work_study_id'])->update(['access_person'=>Db::raw('access_person + 1')]);
        }
        // 撤销审核
        if($res['status']==1 && $result==0){
            Db::table('egg_workstudy_activity')->where('work_study_id',$res['work_study_id'])->update(['access_person'=>Db::raw('access_person - 1')]);
        }
        return $res->save($data);
    }
}
