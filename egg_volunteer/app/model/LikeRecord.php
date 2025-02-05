<?php
declare (strict_types=1);

namespace app\model;

use think\Model;

/**
 * @mixin \think\Model
 */
class LikeRecord extends Model
{
    // 点赞逻辑
    public function likeChange($uid, $aid)
    {
        // 没有数据的
        $res = $this->where('user_id', $uid)->where('article_id', $aid)->find();
        if ($res) {
            // 有数据的
            if ($res['is_cancel'] == 0) {
                return $this->where('user_id', $uid)->where('article_id', $aid)->update(['is_cancel' => 1]);
            } else {
                return $this->where('user_id', $uid)->where('article_id', $aid)->update(['is_cancel' => 0]);
            }
        } else {
            return $this->save(['user_id' => $uid, 'article_id' => $aid]);
        }
    }
}
