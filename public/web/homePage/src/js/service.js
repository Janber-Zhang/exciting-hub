/**
 * Created by janber on 2017/08/06.
 */
 export default {
    /**
     * 获取应用数据
     * 
     */
     addAppRecord(param, cb){
      let params = {
        httpType      :    'post',
        serviceUrl    :    'smartapps/index/addrecord',
        apiModule     :    'newAPI',
        app_name      :    param.app_name,
        type          :    param.type,
        mine_record   :    param.mine_record,
        descr         :    param.descr
      };
      util.ajaxQuery(params,function(res){
        if(res.data.result){
          if(cb && typeof cb !== 'undefined'){
            cb(res.data)
          }
        }
      });
    },

    /**
     * 获取应用数据
     * 
     */
     getAppsRecords(param, cb){
      let params = {
        httpType      :    'get',
        serviceUrl    :    'smartapps/index/getapprecord',
        apiModule     :    'newAPI',
        app_name      :    param.app_name,
        type          :    param.type
      };
      util.ajaxQuery(params,function(res){
        if(res.data.result){
          if(cb && typeof cb !== 'undefined'){
            cb(res.data)
          }
        }
      });
    },

    /**
     * 保存聊天记录
     *
     */
     storeChatMsg(param, cb){
      let params = {
        httpType      :    'post',
        serviceUrl    :    'chat/index/storemsg',
        apiModule     :    'newAPI',
        msg           :    param.msg,
        room_id       :    param.room_id,
        user          :    param.user
      };
      util.ajaxQuery(params,function(res){
        if(res.data.result){
          if(cb && typeof cb !== 'undefined'){
            cb(res.data)
          }
        }
      });
    },

     /**
      * 获取聊天历史记录
      *
      */
      getMsyByRoom(param, cb){
        let params = {
          httpType      :    'get',
          serviceUrl    :    'chat/index/getmsg',
          apiModule     :    'newAPI',
          room_id       :    param.room_id
        }
        util.ajaxQuery(params, function(res){
          if (res.data.result) {
            if (cb && typeof cb !== 'undifined') {
              cb(res.data)
            }
          }
        });
      },




     /**
      * 获取豆瓣电影-搜索
      *
      */
      searchMovie(param, cb){
        let params = {
          httpType      :    'get',
          serviceUrl    :    'v2/movie/search',
          apiModule     :    'doubanAPI',
          q             :     encodeURIComponent(param.key)
        }
        util.ajaxQuery(params, function(res){
          if (cb && typeof cb !== 'undifined') {
              cb(res)
          }
        });
      },
      /**
      * 获取豆瓣电影-当前热映
      *
      */
      getNewMovieList(param, cb){
        let params = {
          httpType      :    'get',
          serviceUrl    :    'v2/movie/in_theaters',
          apiModule     :    'doubanAPI'
        }
        util.ajaxQuery(params, function(res){
          if (cb && typeof cb !== 'undifined') {
              cb(res)
          }
        });
      }
    }