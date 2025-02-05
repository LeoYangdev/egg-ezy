<?php

namespace app\controller;

use app\model\Department;
use app\model\User as UserModel;
use app\model\UserProfile;
use app\Request;

class UserInfo
{
    protected $usermodel;
    protected $userprofilemodel;

    public function __construct()
    {
        $this->usermodel = new UserModel();
        $this->userprofilemodel = new UserProfile();
    }
    public function detail(Request $request){
        return egg_response($this->usermodel->getUserInfo($request->auth['user_id']));
    }
    public function departInfo(){
        $depart = new Department();
        return egg_response($depart->getDepartment());
    }
    public function updateUserInfo(Request $request){
        $uid = $request->auth['user_id'];
        $name = $request->param('name');
        $avatar = $request->param('avatar');
        $birthday = $request->param('birthday');
        $department_id = $request->param('department_id');
        $gender = $request->param('gender');
        $phone = $request->param('phone');
        $email = $request->param('email');
        $data = array_filter([
            'name' => $name,
            'avatar' => $avatar,
            'department_id' => $department_id,
            'birthday' => $birthday ? date('Y-m-d', strtotime($birthday)) : null,
            'phone' => $phone,
            'email' => $email
        ]);
        $data['gender'] = $gender;
        $res = $this->userprofilemodel->updateUserInfo($uid, $data);
        return egg_response($res);
    }
}