<?php

namespace app\controller;

use app\model\VolunteerActivity;
use app\model\VolunteerActivityRegistration;
use think\Request;

class UserActivity
{
    protected $vlamodel;
    protected $vlarmodel;
    public function __construct()
    {
        $this->vlamodel = new VolunteerActivity();
        $this->vlarmodel = new VolunteerActivityRegistration();
    }
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index(Request $request)
    {
        $uid = $request->auth['user_id'];
        $page = $request->get('page') ?: 1;
        $limit = $request->get('limit') ?: 10;
        return egg_response($this->vlarmodel->getUserActivity($page,$limit,$uid));
    }

    public function searchKey(Request $request){
        $uid = $request->auth['user_id'];
        $keyword = $request->get('key');
        if (empty($keyword)){
            return egg_response($this->vlarmodel->getUserActivity(1,5,$uid));
        }
        return egg_response($this->vlarmodel->searchActivity($keyword,$uid));
    }
}