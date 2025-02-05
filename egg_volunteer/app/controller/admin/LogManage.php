<?php

namespace app\controller\admin;

use app\model\ActivityLog;
use app\model\SystemLog;
use think\Request;

class LogManage
{
    protected $activityLogModel;
    protected $systemLogModel;
    public function __construct()
    {
        $this->activityLogModel = new ActivityLog();
        $this->systemLogModel = new SystemLog();
    }
    public function getSysLog(Request $request){
        $page = $request->get('page') ?: 1;
        $limit = $request->get('limit') ?: 10;
        return egg_response($this->systemLogModel->getSystemLog($page,$limit));
    }
    public function searchSysLog(Request $request){
        $keyword = $request->get('key');
        if (empty($keyword)){
            return egg_response($this->systemLogModel->getSystemLog());
        }
        return egg_response($this->systemLogModel->searchByName($keyword));
    }
    public function getActivityLog(Request $request){
        $page = $request->get('page') ?: 1;
        $limit = $request->get('limit') ?: 10;
        return egg_response($this->activityLogModel->getActivityLog($page,$limit));
    }
    public function searchActivityLog(Request $request){
        $keyword = $request->get('key');
        if (empty($keyword)){
            return egg_response($this->activityLogModel->getActivityLog());
        }
        return egg_response($this->activityLogModel->searchByName($keyword));
    }

}