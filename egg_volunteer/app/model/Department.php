<?php
declare (strict_types = 1);

namespace app\model;

use think\facade\Db;
use think\Model;

/**
 * @mixin \think\Model
 */
class Department extends Model
{
    public function getDepartment(){
        return $this->select();
    }
    public function getExistDepartment(){
        return $this->where('department_name','<>','已删除部门')->select();
    }
    public function addDeparment($data){
        return $this->save($data);
    }
    public function deleteDepartment($id){
        return $this->where('department_id',$id)->update(['department_name'=>'已删除部门']);
    }
    public function updateDepartment($id,$name){
        return $this->where('department_id',$id)->update(['department_name'=>$name]);
    }
    public function getDepartmentUser($id){
        $user = new User();
        return $user->alias('u')->leftJoin('egg_user_profile up','u.user_id = up.user_id')->where('up.department_id',$id)->select();
    }
}
