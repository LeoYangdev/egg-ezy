<?php
declare (strict_types=1);

namespace app\model;

use think\facade\Db;
use think\Model;

/**
 * @mixin \think\Model
 */
class Article extends Model
{
    public function getArticle($page = 1, $limit = 10)
    {
        // 构造查询
        $query = $this->alias('a')
            ->join('egg_user_profile p', 'a.author_id = p.user_id')
            ->join('egg_department d', 'p.department_id = d.department_id')
            ->field('a.*, p.name AS organizer, d.department_name AS organizer_department')
            ->order('a.create_time', 'desc');

        // 查询数据总数
        $total = $query->count();
        $totalPage = ceil($total / $limit);
        // 计算偏移量
        $offset = ($page - 1) * $limit;
        // 查询数据列表
        $articles = $query->limit($offset, $limit)->select();

        // 构造返回数据
        $data = [
            'total' => $totalPage,
            'page' => $page,
            'limit' => $limit,
            'data' => $articles,
        ];
        return $data;
    }

    /**
     * 通过id查询文章信息
     */
    public function findArticleById($id,$uid)
    {
        $res = $this->where("article_id", $id)->find();
        $profile = Db::table('egg_user_profile')->where('user_id', $res['author_id'])->find();
        $departname = Db::table('egg_department')->where('department_id', $profile['department_id'])
            ->field('department_name')->find();
        $res->organizer_department = $departname['department_name'];
        $res->organizer = $profile['name'];
        $res->like_count = Db::table('egg_like_record')->where('article_id',$id)->where('is_cancel',0)->count();
        $res->liked = Db::table('egg_like_record')
            ->where('article_id',$id)
            ->where('is_cancel',0)
            ->where('user_id',$uid)
            ->count();
        return $res;
    }

    public function postArticle($data)
    {
        $this->save($data);
        return true;
    }

    public function updateInfo($id, $data)
    {
        $this->where('article_id',$id)->save($data);
        return true;
    }
}
