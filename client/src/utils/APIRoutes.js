const host="http://localhost:5001";
const registerRoute=`${host}/api/auth/register`;
const loginRoute=`${host}/api/auth/login`;
const getContactsRoute=`${host}/api/auth/getcontacts`;
const searchUserRoute=`${host}/api/auth/searchContact`;
const addContactRoute=`${host}/api/auth/addContact`;
const deleteContactRoute=`${host}/api/auth/deleteContact`;
const sendMessageRoute=`${host}/api/messages/addmsg`
const getMessageRoute=`${host}/api/messages/getmsg`
const getRoomsRoute=`${host}/api/room/getroom`
const addRoomsRoute=`${host}/api/room/addroom`
const sendRoomMessageRoute=`${host}/api/roomMessages/addmsg`
const getRoomMessageRoute=`${host}/api/roomMessages/getmsg`
const botRoute=`${host}/api/chat/sndmsg`
export {registerRoute,loginRoute,getContactsRoute,searchUserRoute,addContactRoute
    ,deleteContactRoute,sendMessageRoute,getMessageRoute,getRoomsRoute,addRoomsRoute,sendRoomMessageRoute,getRoomMessageRoute,botRoute}