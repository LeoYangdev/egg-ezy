<?php
namespace app\controller;

use think\facade\Db;
use think\Request;
use app\model\Feedback as FeedbackModel;
use think\Response;

class Feedback
{
    protected $feedbackModel;

    public function __construct(FeedbackModel $feedbackModel)
    {
        $this->feedbackModel = $feedbackModel;
    }

    // 添加用户反馈
    public function addFeedback(Request $request)
    {
        $user_id = $request->auth['user_id'];
        $feedback_type = intval($request->param('feedback_type'));
        $feedback_title = $request->param('feedback_title');
        $feedback_content = $request->param('feedback_content');

        $data = [
            'user_id' => $user_id,
            'feedback_title' => $feedback_title,
            'feedback_type' => $feedback_type,
            'feedback_content' => $feedback_content,
            'feedback_time' => date('Y-m-d H:i:s'),
            'status' => 0
        ];
        $result = $this->feedbackModel->insert($data);
        if ($result) {
            return egg_response(['status' => true, 'msg' => '用户反馈添加成功']);
        } else {
            return fail(400, '用户反馈添加失败');
        }
    }

    // 删除用户反馈
    public function deleteFeedback(Request $request)
    {
        $feedback_id = $request->param('feedback_id');

        $result = $this->feedbackModel->where('feedback_id', $feedback_id)->delete();
        if ($result) {
            return egg_response(['status' => true, 'msg' => '用户反馈删除成功']);
        } else {
            return fail(400, '用户反馈删除失败');
        }
    }

    // 修改用户反馈
    public function updateFeedback(Request $request)
    {
        $user_id = $request->auth['user_id'];
        $feedback_id = $request->param('feedback_id');
        $remarks = $request->param('remarks');

        $data = [
            'handler_id'=>$user_id,
            'status' => 1,
            'handle_time' => date('Y-m-d H:i:s'),
            'remarks' => $remarks
        ];
        $result = $this->feedbackModel->where('feedback_id', $feedback_id)->update($data);
        if ($result) {
            return egg_response(['status' => true, 'msg' => '用户反馈更新成功']);
        } else {
            return fail(400, '用户反馈更新失败');
        }
    }

    // 查询用户反馈
    public function getFeedback(Request $request)
    {
        $user_id = $request->auth['user_id'];

        $feedback = $this->feedbackModel->limit(0, 10)->order(['status'=>'asc','feedback_time'=>'desc'])->where('user_id', $user_id)->select();
        if ($feedback) {
            return egg_response($feedback,200,'查询用户反馈成功');
        } else {
            return fail(400, '查询用户反馈失败');
        }
    }
    public function getAdminFeedbackList(Request $request){
        $page = $request->get('page') ?: 1;
        $limit = $request->get('limit') ?: 10;
        return egg_response($this->feedbackModel->getAdminFeedback($page,$limit),200,"查询用户反馈成功");
    }
    // 查询用户反馈详情
    public function getFeedbackDetail(Request $request)
    {
        $user_id = $request->auth['user_id'];
        $feedback_id = $request->param('feedback_id');

        $feedback = $this->feedbackModel->where('user_id', $user_id)->where('feedback_id',$feedback_id)->find();
        $profile = Db::table('egg_user_profile')->where('user_id',$feedback['handler_id'])->find();
        if ($feedback['handler_id'] != null){
            $departname = Db::table('egg_department')->where('department_id',$profile['department_id'])
                ->field('department_name')->find();
            $feedback->handler_department = $departname['department_name'];
            $feedback->handler = $profile['name'];
        }
        if ($feedback) {
            return egg_response($feedback,200,'查询用户反馈成功');
        } else {
            return fail(400, '查询用户反馈失败');
        }
    }
}
