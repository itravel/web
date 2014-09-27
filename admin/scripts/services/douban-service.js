angular.module('admin').factory('DoubanService',function($q,DoubanActivityDao,ActivityDO){
	 /*******************豆瓣数据服务*************************/
	return {
        transform:function(douban,activity){
            activity.title = douban.title;
            activity.startTime = douban.startTime;
            activity.endTime = douban.endTime;
            activity.depart= douban.depart;
            activity.destination = douban.destination;
            activity.scenerySpot = douban.scenerySpot;
            activity.web = douban.url;
            activity.fee = douban.fee;
            activity.content = douban.content;
            return activity;
        },
	    getUneditData:function (current) {
	        var d = $q.defer();
	
	        DoubanActivityDao.getUnedit(current,1).success(function(data){
	            d.resolve(data);
	        }).error(function(data){
	            d.reject(data);
	        });
	
	        return d.promise;
	    },
	    getUneditDataPage: function(current,number){
	    	var d = $q.defer();
	    	
	        DoubanActivityDao.getUnedit(current,number).success(function(data){
	            d.resolve(data);
	        }).error(function(data){
	            d.reject(data);
	        });
	
	        return d.promise;
	    },
	    startDoubanEdit:function(doubanId,editor){
	    	var d = $q.defer();
	    	DoubanActivityDao.update({'id':doubanId,'editor':editor,'status':1}).success(function(data){
	            d.resolve(data);
	        }).error(function(data){
	        	alert(data)
	            d.reject(data);
	        });
	
	        return d.promise;
	    	
	    },
	    cancelDoubanEdit:function(doubanId,editor){
	    	var d = $q.defer();
	    	DoubanActivityDao.update({'id':doubanId,'editor':editor,'status':0}).success(function(data){
	            d.resolve(data);
	        }).error(function(data){
	        	alert(data)
	            d.reject(data);
	        });
	
	        return d.promise;
	
	    },
	    completeEdit:function(doubanId,editor){
	    	var d = $q.defer();
	    	DoubanActivityDao.update({'id':doubanId,'editor':editor,'status':4}).success(function(data){
	            d.resolve(data);
	        }).error(function(data){
	        	alert(data)
	            d.reject(data);
	        });
	
	        return d.promise;
	    }
	};
});