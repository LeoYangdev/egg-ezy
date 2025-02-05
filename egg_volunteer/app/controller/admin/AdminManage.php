<?php

namespace app\controller\admin;

use app\Request;
use app\service\DepartAdminService;

class AdminManage
{
    protected $departAdminService;
    public function __construct()
    {
        $this->departAdminService = new DepartAdminService();
    }
    public function getAdminList(Request $request){
        $depart_id = $request->param('department_id');
        return egg_response($this->departAdminService->getAdminList($depart_id));
    }
    public function searchAdmin(Request $request){
        $keyword = $request->param('keyword');
        $departId = $request->param('department_id');
        return egg_response($this->departAdminService->search($keyword,$departId));
    }
    public function addAdmin(Request $request){
        $departId = $request->param('department_id');
        $user_id = $request->param('user_id');
        return egg_response($this->departAdminService->add($departId,$user_id));
    }
    public function deleteAdmin(Request $request){
        $departId = $request->param('department_id');
        $user_id = $request->param('user_id');
        return egg_response($this->departAdminService->delete($departId,$user_id));
    }
}