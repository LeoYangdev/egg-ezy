<?php

namespace app\controller\admin;

use app\common\SystemLog;
use app\Request;
use app\service\UserService;

class UserManage
{
    protected $userService;
    public function __construct()
    {
        $this->userService = new UserService();
    }
    public function getUserList(Request $request){
        $page = $request->get('page') ?: 1;
        $limit = $request->get('limit') ?: 10;
        return egg_response($this->userService->getUser($page,$limit));
    }
    public function searchUser(Request $request){
        $keyword = $request->param('keyword');
        return egg_response($this->userService->searchByName($keyword));
    }
    public function detail(Request $request){
        $userId = $request->param('user_id');
        return egg_response($this->userService->getUserInfo($userId));
    }
    public function updateUserInfo(Request $request){
        $aid = $request->auth['user_id'];
        $uid = $request->param('user_id');
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
        $res = $this->userService->updateUserInfo($uid, $aid, $data);
        return egg_response($res);
    }
    public function toggleUserStatus(Request $request){
        $aid = $request->auth['user_id'];
        $uid = $request->param('user_id');
        $status = $request->param('status');
        SystemLog::log($request->auth['user_id'], SystemLog::OPERATION_TYPE_UPDATE, '更新用户'.$uid.'状态为'.$status, $uid);
        return egg_response($this->userService->changeUserStatus($uid,$aid,$status));
    }
}