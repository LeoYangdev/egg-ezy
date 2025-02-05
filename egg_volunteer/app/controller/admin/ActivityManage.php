<?php

namespace app\controller\admin;

use app\common\ActivityLog;
use app\model\VolunteerActivity;
use app\model\VolunteerActivityRegistration;
use app\Request;
use think\Response;

class ActivityManage
{
    protected $activitymodel;
    protected $vlar;

    public function __construct()
    {
        $this->activitymodel = new VolunteerActivity();
        $this->vlar = new VolunteerActivityRegistration();
    }
    public function postActivity(Request $request){
        $uid = $request->auth['user_id'];
        $activityName = $request->param('activity_name');
        $activityPlace = $request->param('activity_place');
        $activityPic = $request->param('activity_pic');
        $needPerson = $request->param('need_person');
        $contactName = $request->param('contact_name');
        $contactPhone = $request->param('contact_phone');
        $limitation = $request->param('limitation');
        $deadline = $request->param('deadline');
        $guarantee = $request->param('guarantee');
        $requirement = $request->param('requirement');
        $detailInfo = $request->param('detail_info');
        $start_time = $request->param('start_time');
        $end_time = $request->param('end_time');

        $data = [
            'activity_name' => $activityName,
            'activity_place' => $activityPlace,
            'activity_pic' => $activityPic,
            'need_person' => $needPerson,
            'contact_name' => $contactName,
            'contact_phone' => $contactPhone,
            'limitation' => $limitation,
            'deadline' => $deadline,
            'guarantee' => $guarantee,
            'requirement' => $requirement,
            'detail_info' => $detailInfo,
            'organizer_id' => $uid,
            'start_time' =>$start_time,
            'end_time' =>$end_time
        ];
        $res = $this->activitymodel->postActivity($data);
        ActivityLog::log($request->auth['user_id'], ActivityLog::OPERATION_TYPE_ACTIVITY, '发布活动'.$activityName);
        return egg_response($res);
    }
    public function getActivityInfo(Request $request){
        $activity_id = $request->param('id');
        return egg_response($this->activitymodel->findActivityById($activity_id));
    }
    public function updateActivity(Request $request){
        $activity_id = $request->param('id');
        $activityName = $request->param('activity_name');
        $activityPlace = $request->param('activity_place');
        $activityPic = $request->param('activity_pic');
        $needPerson = $request->param('need_person');
        $contactName = $request->param('contact_name');
        $contactPhone = $request->param('contact_phone');
        $limitation = $request->param('limitation');
        $deadline = $request->param('deadline');
        $guarantee = $request->param('guarantee');
        $requirement = $request->param('requirement');
        $detailInfo = $request->param('detail_info');
        $start_time = $request->param('start_time');
        $end_time = $request->param('end_time');

        $data = [
            'activity_name' => $activityName,
            'activity_place' => $activityPlace,
            'activity_pic' => $activityPic,
            'need_person' => $needPerson,
            'contact_name' => $contactName,
            'contact_phone' => $contactPhone,
            'limitation' => $limitation,
            'deadline' => $deadline,
            'guarantee' => $guarantee,
            'requirement' => $requirement,
            'detail_info' => $detailInfo,
            'start_time' =>$start_time,
            'end_time' => $end_time
        ];
        ActivityLog::log($request->auth['user_id'], ActivityLog::OPERATION_TYPE_ACTIVITY, '更新活动'.$activity_id.$activityName);
        return egg_response($this->activitymodel->updateInfo($activity_id,$data));
    }
    public function deleteActivity(Request $request)
    {
        $activity_id = $request->param('id');
        ActivityLog::log($request->auth['user_id'], ActivityLog::OPERATION_TYPE_ACTIVITY, '删除活动'.$activity_id);
        return egg_response($this->activitymodel->where('activity_id',$activity_id)->delete());
    }
    public function codeGenerate(Request $request){
        $uid = $request->auth['user_id'];
        $activity_id = $request->param('id');
        $type = $request->param('type');
        // 生成加密字符串
        $encryptedData = base64_encode("$uid.$activity_id.$type." . (time() + 24 * 3600));
        ActivityLog::log($uid, ActivityLog::OPERATION_TYPE_ACTIVITY, '生成签到/签退二维码'.$type.'活动id'.$activity_id);
        return egg_response($encryptedData);
    }

    /**
     * 管理员签到签退操作，仅用户使用二维码签到
     * @param Request $request
     * @return Response
     */
    public function signIn(Request $request){
        $userid = $request->param('user_id');
        $adminid = $request->auth['user_id'];
        $activity_id = $request->param('activity_id');

        return egg_response($this->vlar->checkin($userid,$adminid,$activity_id));
    }
    public function signOut(Request $request){
        $userid = $request->param('user_id');
        $adminid = $request->auth['user_id'];
        $activity_id = $request->param('activity_id');

        return egg_response($this->vlar->checkout($userid,$adminid,$activity_id));
    }
    public function signUserList(Request $request){
        $activity_id = $request->param('activity_id');
        return egg_response($this->vlar->getAccessUser($activity_id));
    }
}