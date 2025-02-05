<?php

namespace app\controller\admin;

use app\common\SystemLog;
use app\Request;
use app\service\ArticleService;

class ArticleManage
{
    protected $articleService;
    public function __construct(){
        $this->articleService = new ArticleService();
    }
    public function post(Request $request){
        $uid = $request->auth['user_id'];
        $title = $request->param('title');
        $content = $request->param('content');
        $category = $request->param('category');

        $data = [
            'title'=>$title,
            'content'=>$content,
            'category'=>$category,
            'author_id'=>$uid
        ];
        SystemLog::log($request->auth['user_id'], SystemLog::OPERATION_TYPE_CREATE, '新增文章信息');
        return egg_response($this->articleService->postArticle($data));
    }
    public function update(Request $request){
        $id = $request->param('id');
        $title = $request->param('title');
        $content = $request->param('content');
        $category = $request->param('category');

        $data = [
            'title'=>$title,
            'content'=>$content,
            'category'=>$category,
        ];
        SystemLog::log($request->auth['user_id'], SystemLog::OPERATION_TYPE_UPDATE, '更新文章信息'.$id);
        return egg_response($this->articleService->updateArticle($id,$data));
    }
    public function delete(Request $request){
        $id = $request->param('id');
        SystemLog::log($request->auth['user_id'], SystemLog::OPERATION_TYPE_UPDATE, '删除文章'.$id);
        return egg_response($this->articleService->deleteArticle($id));
    }
}