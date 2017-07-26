jQuery(document).ready(function($) {
	console.log('lvjiabai1.info is an exciting website')
	$('.login_body_nav').on('click','a',function(e){                 //切换登录/注册
		e.stopPropagation();
		$(this).siblings('a').removeClass('active');
		$(this).addClass('active');
		if ($(this).hasClass('signin')) {
			$('.login_body_nav_slider').removeClass('right');
			$('.signin_box').show();
			$('.signup_box').hide();
		} else {
			$('.login_body_nav_slider').addClass('right');
			$('.signin_box').hide();
			$('.signup_box').show();
		}
	});

	$('#login .signup_box .accunt').unbind().blur(function(event) {  //检查账号是否存在
		var this_ = this;
		var param = {
			httpType      :    'get',
			serviceUrl    :    'users/user/checkexist',
			apiModule     :    'newAPI',
			account       :     $(this).val()
		}
		util.ajaxQuery(param,function(res){
			if (!res.data.result) {
				$(this_).addClass('warn');
			}
			else{
				$(this_).removeClass('warn');
			}
		});
	});

	$('.submit_up').unbind().click(function(event) {                 //注册
		event.stopPropagation();
		signup_(this);
	});
	$('.signup_box_warp .password').keyup(function(event){
		event.stopPropagation();
		if (event.keyCode == 13) {
			signup_(this);
		}
	});

	$('.submit_in').unbind().click(function(event) {                 //登录
		event.stopPropagation();
		login_(this);
	});
	$('.signin_box_warp .password').keyup(function(event) {
		event.stopPropagation();
		if (event.keyCode == 13) {
			login_(this);
		}
	});
	function login_ (this_) {            //登录方法
		var userObj = {
			account     : $(this_).parents('.data_box').find('.accunt').val(),
			password   : $(this_).parents('.data_box').find('.password').val()
		};
		var param = {
			httpType      :    'post',
			serviceUrl    :    'users/user/login',
			apiModule     :    'newAPI',
			account       :     userObj.account,
			password      :     userObj.password
		}
		util.ajaxQuery(param,function(res){
			if(res.data.result===true){
				console.log('登录成功');
				window.location.href='/';
			}else{
				$(this_).parents('.data_box').find('.tips').html('账号密码错误').addClass('warn');
			}
		});
	}
	function signup_ (this_){            //注册方法
		if ($(this_).parents('.data_box').find('.accunt').hasClass('warn')) {
			$(this_).parents('.data_box').find('.tips').html('账号已存在').addClass('warn');
			return
		}
		var userObj = {
			nickname   : $(this_).parents('.data_box').find('.nickname').val(),
			account     : $(this_).parents('.data_box').find('.accunt').val(),
			password   : $(this_).parents('.data_box').find('.password').val()
		};
		if (!userObj.nickname) {
			$(this_).parents('.data_box').find('.tips').html('请输入昵称').addClass('warn');
			return
		}
		if (!userObj.account) {
			$(this_).parents('.data_box').find('.tips').html('请输入账号').addClass('warn');
			return
		}
		if (!userObj.password) {
			$(this_).parents('.data_box').find('.tips').html('请输入密码').addClass('warn');
			return
		}
		var param = {
			httpType      :    'post',
			serviceUrl    :    'users/user/add',
			apiModule     :    'newAPI',
			account       :     userObj.account,
			password      :     userObj.password,
			nickname      :     userObj.nickname

		}
		util.ajaxQuery(param,function(res){
			if(res.data.result===true){
				console.log('注册成功')
				window.location.href='/';
			}else{
				alert('操作失败')
			}
		});
	}

});