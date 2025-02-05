<?php
declare (strict_types = 1);

namespace app\model;

use think\Model;

/**
 * @mixin \think\Model
 */
class UserProfile extends Model
{
    // 定义部门关联方法
    public function department()
    {
        return $this->belongsTo('Department', 'department_id', 'department_id');
    }
    /**
     * @param $id
     * @return User|array|mixed|Model
     */
    public function updateUserInfo($uid, $data)
    {
        $userprofile = $this->where('user_id',$uid)->find();
        $userprofile->save($data);
        return true;
    }
}
