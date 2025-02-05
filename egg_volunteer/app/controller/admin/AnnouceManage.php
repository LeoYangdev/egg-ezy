<?php

namespace app\controller\admin;

use app\common\SystemLog;
use app\Request;
use app\service\AnnounceService;

class AnnouceManage
{
    protected $annouceService;
    public function __construct()
    {
        $this->annouceService = new AnnounceService();
    }
    public function post(Request $request){
        $uid = $request->auth['user_id'];
        $title = $request->param('title');
        $content = $request->param('content');
        $priority = $request->param('priority');
        $data = [
            'title'=>$title,
            'content'=>$content,
            'author_id'=>$uid,
            'priority'=>$priority
        ];
        SystemLog::log($request->auth['user_id'], SystemLog::OPERATION_TYPE_CREATE, '发布公告'.$title);
        return egg_response($this->annouceService->postAnnouce($data));
    }
    public function update(Request $request){
        $id = $request->param('id');
        $title = $request->param('title');
        $content = $request->param('content');
        $priority = $request->param('priority');
        $data = [
            'title'=>$title,
            'content'=>$content,
            'priority'=>$priority
        ];
        SystemLog::log($request->auth['user_id'], SystemLog::OPERATION_TYPE_UPDATE, '更新公告'.$id);
        return egg_response($this->annouceService->updateAnnouce($id,$data));
    }
    public function delete(Request $request){
        $id = $request->param('id');
        SystemLog::log($request->auth['user_id'], SystemLog::OPERATION_TYPE_DELETE, '删除公告'.$id);
        return egg_response($this->annouceService->deleteAnnouce($id));
    }
}