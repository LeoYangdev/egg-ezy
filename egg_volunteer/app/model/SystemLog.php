<?php
declare (strict_types = 1);

namespace app\model;

use think\Model;

/**
 * @mixin \think\Model
 */
class SystemLog extends Model
{
    public function getSystemLog($page = 1, $limit = 10)
    {
        // 查询数据总数
        $total = $this->count();
        $totalPage = ceil($total / $limit);
        // 计算偏移量
        $offset = ($page - 1) * $limit;
        // 查询数据列表
        $logs = $this->alias('s')
            ->join('egg_user_profile u', 'u.user_id = s.user_id')
            ->limit($offset, $limit)
            ->order(['operation_time'=>'desc'])
            ->field('s.*,u.name')
            ->select();
        // 构造返回数据
        $data = [
            'total' => $totalPage,
            'page' => $page,
            'limit' => $limit,
            'data' => $logs,
        ];
        return $data;
    }
    public function searchByName($keyword)
    {
        $total = 10;
        if ($keyword==null){
            $total = $this->count();
        }
        $limit = 10;
        $totalPage = ceil($total / $limit);
        $page = 1;
        $logs = $this->alias('s')
            ->join('egg_user_profile u', 'u.user_id = s.user_id')
            ->limit($limit)->where('s.operation_desc', 'like', '%' . $keyword . '%')->order(['operation_time'=>'desc'])
            ->field('s.*,u.name')
            ->select();
        // 构造返回数据
        $data = [
            'total' => $totalPage,
            'page' => $page,
            'limit' => $limit,
            'data' => $logs,
        ];
        return $data;
    }
}
