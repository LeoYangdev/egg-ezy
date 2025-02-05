<?php
declare (strict_types = 1);

namespace app\model;

use app\exception\ExceptionHandler;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\facade\Db;
use think\Model;

/**
 * @mixin \think\Model
 */
class VolunteerActivity extends Model
{
    protected $hiddenArray = ['start_time','contact_name','contact_phone','create_time','end_time','guarantee','other_req','update_time'];
    // 分页查询方法
    public function getActivity($page = 1, $limit = 10)
    {
        // 查询数据总数
        $total = $this->count();
        $totalPage = ceil($total / $limit);
        // 计算偏移量
        $offset = ($page - 1) * $limit;
        // 查询数据列表
        try {
            $works = $this->limit($offset, $limit)->order(['deadline'=>'desc','create_time'=>'desc'])
                ->hidden($this->hiddenArray)->selectOrFail();
        } catch (DataNotFoundException|ModelNotFoundException $e) {
            return -1;
        }
        // 构造返回数据
        $data = [
            'total' => $totalPage,
            'page' => $page,
            'limit' => $limit,
            'data' => $works,
        ];
        return $data;
    }

    /**
     * 根据活动名称模糊查询
     * @param $keyword
     * @return VolunteerActivity[]|array|\think\Collection
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
        $works = $this->limit($limit)->where('activity_name', 'like', '%' . $keyword . '%')->order(['deadline'=>'desc','create_time'=>'desc'])
            ->hidden($this->hiddenArray)->select();
        // 构造返回数据
        $data = [
            'total' => $totalPage,
            'page' => $page,
            'limit' => $limit,
            'data' => $works,
        ];
        return $data;
    }

    /**
     * 通过id查询活动信息
     */
    public function findActivityById($id){
        $res = $this->where("activity_id",$id)->find();
        $profile = Db::table('egg_user_profile')->where('user_id',$res['organizer_id'])->find();
        $departname = Db::table('egg_department')->where('department_id',$profile['department_id'])
            ->field('department_name')->find();
        $res->organizer_department = $departname['department_name'];
        $res->organizer = $profile['name'];
        return $res;
    }

    /**
     * 发布活动
     */
    public function postActivity($data){
        $this->save($data);
        return true;
    }
    public function updateInfo($id,$data){
        $this->findActivityById($id)->save($data);
        return true;
    }

}
