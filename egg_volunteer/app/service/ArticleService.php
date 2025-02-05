<?php

namespace app\service;

use app\model\Article;

class ArticleService
{
    protected $articlemodel;
    public function __construct()
    {
        $this->articlemodel = new Article();
    }
    public function getArticleList($page, $limit){
        return $this->articlemodel->getArticle($page, $limit);
    }
    public function getArticleInfo($id,$uid){
        return $this->articlemodel->findArticleById($id,$uid);
    }
    public function postArticle($data){
        return $this->articlemodel->postArticle($data);
    }
    public function updateArticle($id,$data){
        return $this->articlemodel->updateInfo($id,$data);
    }
    public function deleteArticle($id){
        return $this->articlemodel->where('article_id',$id)->delete();
    }
}