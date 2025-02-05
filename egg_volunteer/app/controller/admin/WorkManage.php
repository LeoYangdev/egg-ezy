<?php

namespace app\controller\admin;

use app\common\ActivityLog;
use app\model\WorkstudyActivity;
use app\model\WorkstudyActivityRegistration;
use app\Request;

class WorkManage
{
    protected $workmodel;
    protected $workremodel;

    public function __construct()
    {
        $this->workmodel = new WorkstudyActivity();
        $this->workremodel = new WorkstudyActivityRegistration();
    }
    public function postWork(Request $request){
        $uid = $request->auth['user_id'];
        $job_name = $request->param('job_name');
        $job_place = $request->param('job_place');
        $job_pic = $request->param('job_pic');
        $need_person = $request->param('need_person');
        $contact_name = $request->param('contact_name');
        $contact_phone = $request->param('contact_phone');
        $description = $request->param('description');
        $start_time = $request->param('start_time');
        $end_time = $request->param('end_time');
        $deadline = $request->param('deadline');

        $data = [
            'job_name' => $job_name,
            'job_place' => $job_place,
            'job_pic' => $job_pic,
            'need_person' => $need_person,
            'contact_name' => $contact_name,
            'contact_phone' => $contact_phone,
            'description' => $description,
            'start_time' => $start_time,
            'end_time' => $end_time,
            'deadline' => $deadline,
            'creator_id' => $uid
        ];

        $res = $this->workmodel->postWork($data);
        ActivityLog::log($request->auth['user_id'], ActivityLog::OPERATION_TYPE_ACTIVITY, '发布工作'.$job_name);
        return egg_response($res);
    }
    public function getWorkInfo(Request $request){
        $work_id = $request->param('id');
        return egg_response($this->workmodel->findWorkById($work_id));
    }
    public function updateWork(Request $request){
        $work_study_id = $request->param('id');
        $job_name = $request->param('job_name');
        $job_place = $request->param('job_place');
        $job_pic = $request->param('job_pic');
        $need_person = $request->param('need_person');
        $contact_name = $request->param('contact_name');
        $contact_phone = $request->param('contact_phone');
        $description = $request->param('description');
        $start_time = $request->param('start_time');
        $end_time = $request->param('end_time');
        $deadline = $request->param('deadline');

        $data = [
            'job_name' => $job_name,
            'job_place' => $job_place,
            'job_pic' => $job_pic,
            'need_person' => $need_person,
            'contact_name' => $contact_name,
            'contact_phone' => $contact_phone,
            'description' => $description,
            'start_time' => $start_time,
            'end_time' => $end_time,
            'deadline' => $deadline,
        ];

        $res = $this->workmodel->updateInfo($work_study_id,$data);
        ActivityLog::log($request->auth['user_id'], ActivityLog::OPERATION_TYPE_ACTIVITY, '更新工作'.$work_study_id.$job_name);
        return egg_response($res);
    }
    public function deleteWork(Request $request)
    {
        $work_id = $request->param('id');
        ActivityLog::log($request->auth['user_id'], ActivityLog::OPERATION_TYPE_ACTIVITY, '删除工作'.$work_id);
        return egg_response($this->workmodel->where('work_study_id',$work_id)->delete());
    }
    public function signUserList(Request $request){
        $work_id = $request->param('work_study_id');
        return egg_response($this->workremodel->getAccessUser($work_id));
    }
}