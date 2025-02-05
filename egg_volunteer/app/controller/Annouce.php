<?php

namespace app\controller;

use app\Request;
use app\service\AnnounceService;

class Annouce
{
    protected $annouceService;
    public function __construct()
    {
        $this->annouceService = new AnnounceService();
    }
    public function read(Request $request){
        $announcement_id = $request->param('announcement_id');
        $user_id = $request->auth['user_id'];
        $data = [
            'announcement_id'=>$announcement_id,
            'user_id'=>$user_id
        ];
        $this->annouceService->readUpdate($data);
    }
    public function getAnnouceList(Request $request){
        $uid = $request->auth['user_id'];
        $page = $request->get('page') ?: 1;
        $limit = $request->get('limit') ?: 10;
        return egg_response($this->annouceService->getAnnouceList($page,$limit,$uid));
    }
    public function getAnnouceInfo(Request $request){
        $uid = $request->auth['user_id'];
        $id = $request->param('id');
        return egg_response($this->annouceService->getAnnouceInfo($id,$uid));
    }
}