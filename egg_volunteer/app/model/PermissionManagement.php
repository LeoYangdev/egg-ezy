<?php
declare (strict_types=1);

namespace app\model;

use think\facade\Db;
use think\Model;

/**
 * @mixin \think\Model
 */
class PermissionManagement extends Model
{
    // 获取部门管理员信息profile、部门名称、
    public function getAdminList($departId)
    {
        $res = $this->alias('p')
            ->leftJoin('user_profile u', 'p.user_id=u.user_id')
            ->leftJoin('department d', 'u.department_id = d.department_id')
            ->where('u.department_id', $departId)
            ->where('p.role', 'in', [1, 2])
            ->select();
        return $res;
    }

    public function searchByUserName($keyword, $departId)
    {
        $users = Db::table('egg_user_profile')->alias('u')
            ->limit(10)
            ->where('u.department_id', $departId)
            ->where('u.name', 'like', '%' . $keyword . '%')
            ->select();
        return $users;
    }
    public function addDepartmentAdmin($departId,$userId){
        $user = $this->alias('p')->leftJoin('user_profile u', 'p.user_id=u.user_id')
            ->where('u.department_id',$departId)
            ->where('p.user_id',$userId)
            ->update(['p.role'=>2]);
        return $user;
    }
    public function deleteDepartmentAdmin($departId,$userId){
        $user = $this->alias('p')->leftJoin('user_profile u', 'p.user_id=u.user_id')
            ->where('u.department_id',$departId)
            ->where('p.user_id',$userId)
            ->update(['p.role'=>0]);
        return $user;
    }
}
