<?php
declare (strict_types = 1);

namespace app\model;

use think\Model;

/**
 * @mixin \think\Model
 */
class Message extends Model
{
    // 根据消息id查询详细消息
    public function getMessageDetail($uid,$mid){
        $message = $this->where('receiver_id', $uid)->where('message_id',$mid)->find();
        $user = new User();
        $receiverInfo = $user->getUserInfo($message['sender_id']);
        // 将用户信息存储到消息对象中
        $message['sender_name'] = $receiverInfo['profile']['name'];
        $message['sender_department'] = $receiverInfo['profile']['department_name'];
        return $message;
    }
    // 根据用户id查询消息
    public function getMessageByUser($uid){
        $messages = $this->where('receiver_id', $uid)->select();
        $user = new User();
        foreach ($messages as $message) {
            $receiverInfo = $user->getUserInfo($message['sender_id']);
            // 将用户信息存储到消息对象中
            $message['sender_name'] = $receiverInfo['profile']['name'];
            $message['sender_department'] = $receiverInfo['profile']['department_name'];
        }
        return $messages;
    }
    // 添加新消息
    public function saveMessage($data){
        return $this->save($data);
    }

    public function changeRead($uid,$mid)
    {
        $message = $this->where('receiver_id', $uid)->where('message_id',$mid);
        return $message->update(['is_read'=>'1']);
    }
}
