<?php
declare (strict_types = 1);

namespace app\controller;

use app\model\VolunteerActivity;
use think\Request;

class Activity
{
    protected $vlamodel;

    public function __construct()
    {
        $this->vlamodel = new VolunteerActivity();
    }
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index(Request $request)
    {
        $page = $request->get('page') ?: 1;
        $limit = $request->get('limit') ?: 10;
        return egg_response($this->vlamodel->getActivity($page,$limit));
    }

    public function searchKey(Request $request){
        $keyword = $request->get('key');
        if (empty($keyword)){
            return egg_response($this->vlamodel->getActivity());
        }
        return egg_response($this->vlamodel->searchByName($keyword));
    }

    /**
     * 显示创建资源表单页.
     *
     * @return \think\Response
     */
    public function create()
    {
        //
    }

    /**
     * 保存新建的资源
     *
     * @param  \think\Request  $request
     * @return \think\Response
     */
    public function save(Request $request)
    {
        //
    }

    /**
     * 显示指定的资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function read($id)
    {
        //
    }

    /**
     * 显示编辑资源表单页.
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * 保存更新的资源
     *
     * @param  \think\Request  $request
     * @param  int  $id
     * @return \think\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * 删除指定资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function delete($id)
    {
        //
    }
}
