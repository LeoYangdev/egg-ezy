<?php

namespace app\controller\admin;

use app\Request;
use app\service\MessageService;

class MessageManage
{
    protected $messageService;
    public function __construct(){
        $this->messageService = new MessageService();
    }
    public function addMessage(Request $request){
        $uid = $request->auth['user_id'];
        $receiver_id = $request->param('receiver_id');
        $content = $request->param('content');
        $message_type = 1;
        $data = [
            'sender_id'=>$uid,
            'receiver_id'=>$receiver_id,
            'content'=>$content,
            'message_type'=>$message_type
        ];
        return egg_response($this->messageService->sendMessage($data));
    }
    public function getMessage(Request $request){
        $receiver_id = $request->auth['user_id'];
        return egg_response($this->messageService->getMessage($receiver_id));
    }
    public function getMessageDetail(Request $request){
        $receiver_id = $request->auth['user_id'];
        $message_id = $request->param('message_id');
        return egg_response($this->messageService->getMessageDetail($receiver_id,$message_id));
    }
    public function readMessage(Request $request){
        $receiver_id = $request->auth['user_id'];
        $message_id = $request->param('message_id');
        return egg_response($this->messageService->readMessage($receiver_id,$message_id));
    }
}