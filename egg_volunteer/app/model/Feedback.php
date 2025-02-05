<?php
declare (strict_types = 1);

namespace app\model;

use think\Model;

/**
 * @mixin \think\Model
 */
class Feedback extends Model
{
    public function getAdminFeedback($page = 1, $limit = 10)
    {
        // 查询数据总数
        $total = $this->count();
        $totalPage = ceil($total / $limit);
        // 计算偏移量
        $offset = ($page - 1) * $limit;
        // 查询数据列表
        $feedback = $this->limit($offset, $limit)->order(['status'=>'asc','feedback_time'=>'desc'])->select();
        // 构造返回数据
        $data = [
            'total' => $totalPage,
            'page' => $page,
            'limit' => $limit,
            'data' => $feedback,
        ];
        return $data;
    }
}
