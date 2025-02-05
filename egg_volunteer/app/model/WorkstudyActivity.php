<?php
declare (strict_types = 1);

namespace app\model;

use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\facade\Db;
use think\Model;

/**
 * @mixin \think\Model
 */
class WorkstudyActivity extends Model
{
    public function getWork($page = 1, $limit = 10)
    {
        // 查询数据总数
        $total = $this->count();
        $totalPage = ceil($total / $limit);
        // 计算偏移量
        $offset = ($page - 1) * $limit;
        // 查询数据列表
        try {
            $activities = $this->limit($offset, $limit)->order(['deadline'=>'desc','create_time'=>'desc'])->selectOrFail();
        } catch (DataNotFoundException|ModelNotFoundException $e) {
            return -1;
        }
        // 构造返回数据
        $data = [
            'total' => $totalPage,
            'page' => $page,
            'limit' => $limit,
            'data' => $activities,
        ];
        return $data;
    }

    /**
     * 根据工作名称模糊查询
     * @param $keyword
     * @return WorkstudyActivity[]|array|\think\Collection
     * @throws DataNotFoundException
     * @throws ModelNotFoundException
     * @throws \think\db\exception\DbException
     */
    public function searchByName($keyword)
    {
        $total = 10;
        $limit = 10;
        $totalPage = ceil($total / $limit);
        $page = 1;
        $activities = $this->limit($limit)->order(['deadline'=>'desc','create_time'=>'desc'])->where('job_name', 'like', '%' . $keyword . '%')->select();
        // 构造返回数据
        $data = [
            'total' => $totalPage,
            'page' => $page,
            'limit' => $limit,
            'data' => $activities,
        ];
        return $data;
    }
    /**
     * 通过id查询活动信息
     */
    public function findWorkById($id){
        $res = $this->where("work_study_id",$id)->find();
        $profile = Db::table('egg_user_profile')->where('user_id',$res['creator_id'])->find();
        $departname = Db::table('egg_department')->where('department_id',$profile['department_id'])
            ->field('department_name')->find();
        $res->organizer_department = $departname['department_name'];
        $res->organizer = $profile['name'];
        return $res;
    }
    /**
     * 发布工作
     */
    public function postWork($data){
        $this->save($data);
        return true;
    }
    public function updateInfo($id,$data){
        $this->findWorkById($id)->save($data);
        return true;
    }
}
