<?php

namespace app\service;

use app\model\Announcement;
use app\model\ReadAnnouncement;

class AnnounceService
{
    protected $annouceModel;
    protected $readModel;
    public function __construct()
    {
        $this->annouceModel = new Announcement();
        $this->readModel = new ReadAnnouncement();
    }
    // 通知公告已读接口
    public function readUpdate($data){
        $this->readModel->readAnnouce($data);
    }
    public function getAnnouceList($page, $limit, $uid){
        return $this->annouceModel->getAnnouceList($page, $limit, $uid);
    }
    public function getAnnouceInfo($id,$uid){
        return $this->annouceModel->findAnnouceById($id,$uid);
    }
    public function postAnnouce($data){
        return $this->annouceModel->postAnnouce($data);
    }
    public function updateAnnouce($id,$data){
        return $this->annouceModel->updateInfo($id,$data);
    }
    public function deleteAnnouce($id){
        return $this->annouceModel->where('announcement_id',$id)->delete();
    }
}