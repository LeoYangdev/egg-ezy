<?php

namespace app\service;

use app\model\Message;

class MessageService
{
    protected $messageModel;
    public function __construct()
    {
        $this->messageModel = new Message();
    }
    public function getMessage($user_id){
        return $this->messageModel->getMessageByUser($user_id);
    }
    public function getMessageDetail($user_id,$message_id){
        return $this->messageModel->getMessageDetail($user_id, $message_id);
    }
    public function sendMessage($data){
        return $this->messageModel->saveMessage($data);
    }
    public function readMessage($user_id,$message_id){
        return $this->messageModel->changeRead($user_id,$message_id);
    }
}