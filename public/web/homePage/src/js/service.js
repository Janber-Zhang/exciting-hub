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

    }
}