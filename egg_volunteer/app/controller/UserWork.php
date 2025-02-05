<?php

namespace app\controller;
use app\model\WorkstudyActivity;
use app\model\WorkstudyActivityRegistration;
use think\Request;

class UserWork
{
    protected $workremodel;
    protected $workmodel;
    protected $approval;
    public function __construct()
    {
        $this->workremodel = new WorkstudyActivityRegistration();
        $this->workmodel = new WorkstudyActivity();
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
        return egg_response($this->workremodel->getUserWork($page,$limit,$uid));
    }

    public function searchKey(Request $request){
        $uid = $request->auth['user_id'];
        $keyword = $request->get('key');
        if (empty($keyword)){
            return egg_response($this->workremodel->getUserWork(1,5,$uid));
        }
        return egg_response($this->workremodel->searchWork($keyword,$uid));
    }
}