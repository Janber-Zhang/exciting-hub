jQuery(document).ready(function($) {
	console.log('lvjiabai1.info is a exciting website')
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
		var account = $(this).val();
		console.log(account);
		axios.get('user/checkAccountExist.excited?account='+account).then((res) => {
			if (res.data.data) {
				$(this_).addClass('warn');
			} else {
				$(this_).removeClass('warn');
			}
		});
	});

	$('.submit_up').unbind().click(function(event) {                 //注册
		event.stopPropagation();
		if ($(this).parents('.data_box').find('.accunt').hasClass('warn')) {
			alert('账号已存在！')
			return
		}
		var userObj = {
			nickname   : $(this).parents('.data_box').find('.nickname').val(),
			account     : $(this).parents('.data_box').find('.accunt').val(),
			password   : $(this).parents('.data_box').find('.password').val()
		};
		if (!userObj.nickname) {
			console.log('请输入昵称')
			return
		}
		if (!userObj.account) {
			console.log('请输入账号')
			return
		}
		if (!userObj.password) {
			console.log('请输入密码')
			return
		}
		axios.post('/user/signup.excited',{
			account  : userObj.account,
			password : userObj.password,
			nickname : userObj.nickname
		}).then((res) => {
			if(res.data.result==='true'){
				console.log('注册成功')
				// window.location.href='/';
			}else{
				alert('操作失败')
			}
		})
	});

	$('.submit_in').unbind().click(function(event) {                 //登录
		event.stopPropagation();
		var userObj = {
			account     : $(this).parents('.data_box').find('.accunt').val(),
			password   : $(this).parents('.data_box').find('.password').val()
		};
		console.log(userObj)
		axios.post('/user/signin.excited',{
			account  : userObj.account,
			password : userObj.password
		}).then((res) => {
			if(res.data.result==='true'){
				console.log('登录成功')
				console.log(res)
				// window.location.href='/';
			}else{
				console.warn('密码错误')
			}
		})
	});
});