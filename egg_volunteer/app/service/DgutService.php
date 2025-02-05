<?php

namespace app\service;

use app\model\Department;
use app\model\User;
use app\model\UserProfile;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class DgutService
{
    protected $departmentModel;
    protected $userModel;
    protected $userProfileModel;
    public function __construct()
    {
        $this->departmentModel = new Department();
        $this->userModel = new User();
        $this->userProfileModel = new UserProfile();
    }

    public function getDgutUserInfo($user,$password){
        $request_url = "http://localhost:8080/dgut/?username=" .$user."&password=".$password;
        try {
            $client = new  Client ();
            $res = $client->request('GET', $request_url, [
                // 'verify' => root_path() . '/cacert.pem',
                'headers' => [
                    'Accept' => 'application/json',
                ]
            ]);
            $res_body = (string)$res->getBody();
            $res_body = str_replace(array("\r\n", "\r", "\n"), "", $res_body);
            // 将单引号替换为双引号
            $json_string = str_replace("'", '"', $res_body);

            // 将 True 和 False 替换为 true 和 false
            $json_string = str_replace("True", "true", $json_string);
            $json_string = str_replace("False", "false", $json_string);

            // 将 JSON 字符串转换为 PHP 数组
            $data = json_decode($json_string, true);
            return ['code'=>200,'data'=>$data];
        } catch (GuzzleException $e) {
            return ['code' => 1002, 'msg' => '请求个人信息失败..'];
        }
    }
    public function updateUserInfo($uid, $user,$password){
        $res = $this->getDgutUserInfo($user,$password);
        if ($res['code']==1002){
            return $res;
        }
        // 密码加密保存把
        $userdata = [
            'dgut_id'=>$user,
            'dgut_password'=>base64_encode($password),
        ];
        $profile_data = $res['data'];
        $department = $profile_data['department'];
        // 遍历部门获取所属部门id
        $departments = $this->departmentModel->getDepartment();

        $matchedDepartmentId = null;
        foreach ($departments as $dept) {
            if ($dept['department_name'] == $department) {
                $matchedDepartmentId = $dept['department_id'];
                break;
            }
        }

        if ($matchedDepartmentId == null) {
            // 未找到匹配的部门ID
            $matchedDepartmentId = $this->departmentModel->insertGetId(['department_name'=>$department]);
        }
        $profile = [
            'name'=>$profile_data['commonName'],
            'phone'=>$profile_data['mobilePhone'],
            'birthday'=>$profile_data['birthDate'] ? date('Y-m-d', strtotime($profile_data['birthDate'])) : null,
            'idcard'=>$profile_data['idCard'],
            'gender'=>$profile_data['sex']==1?0:1,
            'user_type'=>$profile_data['studentType']=="本科生"?1:2,
            'department_id'=>$matchedDepartmentId,
        ];
        // 更新个人信息逻辑
        $this->userModel->where('user_id',$uid)->update($userdata);
        $this->userProfileModel->where('user_id',$uid)->update($profile);
        return true;
    }
}