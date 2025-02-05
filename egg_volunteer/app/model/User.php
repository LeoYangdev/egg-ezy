<?php

namespace app\model;

use Exception;
use Firebase\JWT\JWT as JWTUtil;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\Key;
use think\facade\Db;
use think\Model;

class User extends Model
{
    protected $pk = 'user_id';
    protected $hidden = ['dgut_password'];


    /**
     * 判断wxid是否存在，不存在则写入wxid，存在则返回userid
     * @param $oid
     * @return User|array|int|mixed|string|Model
     * @throws Exception
     */
    public function getUserIdByWxid($oid)
    {
        $uid = $this->where('user_wxid', $oid)->field(['user_id','status'])->findOrEmpty();
        if ($uid->isEmpty()) {
            $uid = $this->userInit($oid);
        }
        $permit = Db::table('egg_permission_management')->where('user_id',$uid['user_id'])
            ->field(['user_id','role'])->find();

        $permit['status'] = $uid['status'];
        return $permit;
    }
    /**
     * 用户初始化
     **/
    public function userInit($oid){
        Db::startTrans();
        try {
            // 向用户表插入数据
            $userId = $this->insertGetId(['user_wxid' => $oid]);
            $random = sprintf("%04d", rand(0, 9999));
            // 向 userprofile 表插入数据
            $userProfileData = ['user_id' => $userId, 'name' => '微信用户'.$random, 'department_id' => '999'];
            Db::table('egg_user_profile')->insert(
                $userProfileData
            );
            Db::table('egg_permission_management')->insert([
                'user_id'=>$userId
            ]);
            // 提交事务
            Db::commit();
        }catch (Exception $e){
            // 发生异常时回滚事务
            Db::rollback();
            throw new Exception($e->getMessage());
        }
        return ["user_id"=>$userId,"status"=>1];
    }

    // 定义与 UserProfile 模型的一对一关联关系
    public function profile()
    {
        return $this->hasOne('user_profile', 'user_id');
    }

    /**
     * 获取用户详情信息
     * @param $id
     * @return User|array|int|mixed|Model
     */
    public function getUserInfo($id)
    {
        $user = $this->where('user_id',$id)->hidden(['user_wxid','dgut_password'])->findOrEmpty();

        if ($user) {
            // 使用关联方法获取用户详细信息
            $profile = $user->profile;
            if (!is_null($profile['department_id'])) {
                $departname = Db::table('egg_department')->where('department_id',$user->profile->department_id)
                    ->field('department_name')->find();
                $role = Db::table('egg_permission_management')->where('user_id',$id)->field('role')->find();
                $user->profile->department_name = $departname['department_name'];
                $user->profile->role = $role['role'];
            }
            // 直接返回原始用户信息
            return $user;
        } else {
            return -1;
        }
    }

    public function getDgutUser($id){
        $user = $this->where('user_id',$id)->visible(['dgut_id','dgut_password'])->findOrEmpty();
        return $user;
    }
    public function getUser($page = 1, $limit = 10)
    {
        // 查询数据总数
        $total = $this->count();
        $totalPage = ceil($total / $limit);
        // 计算偏移量
        $offset = ($page - 1) * $limit;
        // 查询数据列表
        $users = $this->limit($offset, $limit)->order(['create_time'=>'desc'])
            ->with(['profile' => function($query) {
            $query->with('department');
        }])->select();
        // 构造返回数据
        $data = [
            'total' => $totalPage,
            'page' => $page,
            'limit' => $limit,
            'data' => $users,
        ];
        return $data;
    }
    public function searchByName($keyword)
    {
        $total = 10;
        $limit = 10;
        $totalPage = ceil($total / $limit);
        $page = 1;
        // $users1 = $this->alias('u')->leftJoin('egg_user_profile up','u.user_id = up.user_id')
        //     ->limit($limit)->where('up.name', 'like', '%' . $keyword . '%')->order(['u.create_time'=>'desc'])
        //     ->select();
        $users = $this->limit($limit)->order(['create_time'=>'desc'])
            ->with(['profile' => function($query) use ($keyword) {
                $query->where('name', 'like', '%' . $keyword . '%')->with('department');
            }])
            ->select();

        // 过滤掉profile为空的数据
        $filteredUsers = $users->filter(function($user) {
            return !empty($user['profile']);
        });

        // 构造返回数据
        $data = [
            'total' => $totalPage,
            'page' => $page,
            'limit' => $limit,
            'data' => $filteredUsers->toArray(),
        ];
        return $data;
    }
    public function updateUserStatus($userId,$adminId,$status){
        return $this->where('user_id',$userId)->update(["status"=>$status]);
    }
}