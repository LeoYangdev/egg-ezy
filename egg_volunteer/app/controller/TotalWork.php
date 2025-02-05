<?php

namespace app\controller;

use app\model\Approval;
use app\model\WorkstudyActivity;
use app\model\WorkstudyActivityRegistration;
use think\Request;

class TotalWork
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
    public function index(Request $request)
    {
        $uid = $request->auth['user_id'];
        $page = $request->get('page') ?: 1;
        $limit = $request->get('limit') ?: 10;
        return egg_response($this->workremodel->TotalUserWork($page,$limit,$uid));
    }

    public function searchKey(Request $request){
        $uid = $request->auth['user_id'];
        $keyword = $request->get('key');
        if (empty($keyword)){
            return egg_response($this->workremodel->TotalUserWork(1,10,$uid));
        }
        return egg_response($this->workremodel->searchUserWorkTotal($keyword,$uid));
    }
}