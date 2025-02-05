<?php
declare (strict_types = 1);

namespace app\model;

use think\facade\Db;
use think\Model;

/**
 * @mixin \think\Model
 */
class Announcement extends Model
{
    // 获取通知列表
    public function getAnnouceList($page = 1, $limit = 10, $uid=null){
        // 构造查询
        $query = $this->alias('a')
            ->join('egg_user_profile p', 'a.author_id = p.user_id')
            ->join('egg_department d', 'p.department_id = d.department_id')
            ->field('a.*, p.name AS publisher, d.department_name AS publisher_department')
            ->order(['a.priority'=>'desc','a.create_time'=>'desc']);

        // 查询数据总数
        $total = $query->count();
        $totalPage = ceil($total / $limit);
        // 计算偏移量
        $offset = ($page - 1) * $limit;
        // 查询数据列表
        $announcements = $query->limit($offset, $limit)->select();

        // 遍历结果集，查询每个通知的已读状态
        foreach ($announcements as $announcement) {
            $readStatus = Db::table('egg_read_announcement')
                ->where('announcement_id', $announcement['announcement_id'])
                ->where('user_id', $uid)
                ->find();

            if ($readStatus) {
                $announcement['is_read'] = true;
            } else {
                $announcement['is_read'] = false;
            }
        }
        // 构造返回数据
        $data = [
            'total' => $totalPage,
            'page' => $page,
            'limit' => $limit,
            'data' => $announcements,
        ];
        return $data;
    }

    // 新增通知公告
    public function postAnnouce($data)
    {
        $this->save($data);
        return true;
    }
    // 修改通知公告
    public function updateInfo($id, $data)
    {
        $this->where('announcement_id',$id)->save($data);
        return true;
    }
    // 获取通知公告详情
    public function findAnnouceById($id, $uid)
    {
        $res = $this->where("announcement_id", $id)->find();
        $profile = Db::table('egg_user_profile')->where('user_id', $res['author_id'])->find();
        $departname = Db::table('egg_department')->where('department_id', $profile['department_id'])
            ->field('department_name')->find();
        $res->publisher_department = $departname['department_name'];
        $res->publisher = $profile['name'];
        $readStatus = Db::table('egg_read_announcement')
            ->where('announcement_id', $id)
            ->where('user_id', $uid)
            ->find();
        $is_read = null;
        if ($readStatus) {
            $is_read = true;
        } else {
            $is_read = false;
        }
        $res->is_read = $is_read;
        return $res;
    }
}
