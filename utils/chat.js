const mongoose = require('mongoose')
const Chat = require('../Model/Chat');
const { v4: uuidv4 } = require('uuid');

const get_messages = async (object, callback) => {
    try {
        const message = await Chat.find({
            $or: [
                { $and: [{ sender_id: object.sender_id }, { receiver_id: object.receiver_id }] },
                { $and: [{ sender_id: object.receiver_id }, { receiver_id: object.sender_id }] },
            ]
        }).sort({ createdAt: -1 })
        console.log("Messages :", message)
        callback(message)
    } catch (error) {
        callback(error)
    }
}

const send_message = async (object, callback) => {
    try {
        const findchat = await Chat.findOne({ $or: [{ $and: [{ sender_id: object.sender_id }, { receiver_id: object.receiver_id }] }, { $and: [{ sender_id: object.receiver_id }, { receiver_id: object.sender_id }] }] })
        if (findchat) {
            var documents_chat = new Chat({ sender_id: object.sender_id, file: object?.file, receiver_id: object.receiver_id, group_id: findchat.group_id, message: object.message });
        } else {
            var documents_chat = new Chat({ sender_id: object.sender_id, file: object?.file, receiver_id: object.receiver_id, group_id: uuidv4(), message: object.message });
        }
        await documents_chat.save();
        // await documents_chat.populate("sender_id", "basics.name imageName");
        // await documents_chat.populate("receiver_id", "basics.name imageName");
        callback(documents_chat);
    } catch (error) {
        callback(error);
    }
}


module.exports = {
    get_messages,
    send_message,
}