$(function () {
  var w = window;
  w.CHAT = {
    init: function(roomId,userName) {           //初始化链接
          // ---------创建连接-----------
          var socket = io();
          // 加入房间
          socket.on('connect', function () {
            socket.emit('join', userName);
          });
          // 监听消息
          socket.on('msg', function (userName, msg) {
            console.log(msg) 
          });
          // 监听系统消息
          socket.on('sys', function (sysMsg, users) {
            console.log(sysMsg)
          });
        },
    sendMsg: function(){                         //发送消息
      socket.send(msg);
    },
    leaveRoom: function() {                      //离开房间
      socket.emit('leave');
    }

  }
});