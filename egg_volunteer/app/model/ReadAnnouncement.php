<?php
declare (strict_types = 1);

namespace app\model;

use think\Model;

/**
 * @mixin \think\Model
 */
class ReadAnnouncement extends Model
{
    // 已读通知公告接口
    public function readAnnouce($data){
        return $this->save($data);
    }
}
