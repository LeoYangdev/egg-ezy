<?php

namespace app\controller;

use app\model\LikeRecord;
use app\Request;
use app\service\ArticleService;

class Article
{
    protected $articleService;
    protected $likeModel;
    public function __construct(){
        $this->articleService = new ArticleService();
        $this->likeModel = new LikeRecord();
    }
    public function getArticleList(Request $request){
        $page = $request->get('page') ?: 1;
        $limit = $request->get('limit') ?: 10;
        return egg_response($this->articleService->getArticleList($page,$limit));
    }
    public function getArticleInfo(Request $request){
        $uid = $request->auth['user_id'];
        $id = $request->param('id');
        return egg_response($this->articleService->getArticleInfo($id,$uid));
    }
    public function like(Request $request){
        $uid = $request->auth['user_id'];
        $id = $request->param('id');
        return egg_response($this->likeModel->likeChange($uid,$id));
    }
}