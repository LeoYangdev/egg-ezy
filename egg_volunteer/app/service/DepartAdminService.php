<?php

namespace app\service;

use app\model\PermissionManagement;

class DepartAdminService
{
    protected $departAdminModel;
    public function __construct()
    {
        $this->departAdminModel = new PermissionManagement();
    }
    public function getAdminList($departId){
        return $this->departAdminModel->getAdminList($departId);
    }
    public function search($keyword,$departId){
        return $this->departAdminModel->searchByUserName($keyword,$departId);
    }
    public function add($departId,$userId){
        return $this->departAdminModel->addDepartmentAdmin($departId,$userId);
    }
    public function delete($departId,$userId){
        return $this->departAdminModel->deleteDepartmentAdmin($departId,$userId);
    }
}