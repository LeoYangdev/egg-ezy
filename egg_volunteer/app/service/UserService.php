<?php

namespace app\service;

use app\model\User;
use app\model\UserProfile;

class UserService
{
    protected $userModel;
    protected $userProfileModel;
    public function __construct()
    {
        $this->userModel = new User();
        $this->userProfileModel = new UserProfile();
    }
    public function getUser($page,$limit){
        return $this->userModel->getUser($page,$limit);
    }
    public function searchByName($keyword){
        return $this->userModel->searchByName($keyword);
    }
    public function updateUserInfo($userId, $adminId, $data){
        // todo:做日志处理
        return $this->userProfileModel->updateUserInfo($userId,$data);
    }
    public function getUserInfo($user_id)
    {
        return $this->userModel->getUserInfo($user_id);
    }
    public function changeUserStatus($userId,$adminId,$status){
        return $this->userModel->updateUserStatus($userId,$adminId,$status);
    }
}