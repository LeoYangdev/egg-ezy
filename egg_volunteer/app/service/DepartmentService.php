<?php

namespace app\service;

use app\model\Department;

class DepartmentService
{
    protected $departmentModel;
    public function __construct()
    {
        $this->departmentModel = new Department();
    }

    public function getDepatmentList(){
        return $this->departmentModel->getExistDepartment();
    }
    public function addDepartment($data){
        return $this->departmentModel->addDeparment($data);
    }
    public function deleteDepartment($id){
        return $this->departmentModel->deleteDepartment($id);
    }
    public function updateDepartment($id,$name){
        return $this->departmentModel->updateDepartment($id,$name);
    }
    public function getDepartmentUser($id){
        return $this->departmentModel->getDepartmentUser($id);
    }
}