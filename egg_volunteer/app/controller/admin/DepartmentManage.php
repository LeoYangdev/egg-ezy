<?php

namespace app\controller\admin;

use app\common\SystemLog;
use app\Request;
use app\service\DepartmentService;

class DepartmentManage
{
    protected $departmentService;
    public function __construct(){
        $this->departmentService = new DepartmentService();
    }
    // 增加部门
    public function addDepartment(Request $request){
        $uid = $request->auth['user_id'];
        $deparmentname = $request->param('department_name');
        $data = [
            "department_name"=>$deparmentname
        ];
        SystemLog::log($request->auth['user_id'], SystemLog::OPERATION_TYPE_CREATE, '新增部门'.$deparmentname);
        return egg_response($this->departmentService->addDepartment($data));
    }
    // 删除部门
    public function deleteDepartment(Request $request){
        $deparmentid = $request->param('department_id');
        SystemLog::log($request->auth['user_id'], SystemLog::OPERATION_TYPE_DELETE, '删除部门'.$deparmentid);
        return egg_response($this->departmentService->deleteDepartment($deparmentid));
    }
    // 修改部门名称
    public function updateDepartment(Request $request){
        $deparmentid = $request->param('department_id');
        $deparmentname = $request->param('department_name');
        return egg_response($this->departmentService->updateDepartment($deparmentid,$deparmentname));
    }
    // 获取部门人员列表
    public function getDepartmentUser(Request $request){
        $id = $request->param('department_id');
        return egg_response($this->departmentService->getDepartmentUser($id));
    }
    // 获取部门信息列表
    public function departmentInfo(){
        return egg_response($this->departmentService->getDepatmentList());
    }
}