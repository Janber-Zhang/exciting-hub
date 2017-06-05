jQuery(document).ready(function($) {
	console.log('lvjiabai1.info is a exciting website')
	$('.login_body_nav').on('click','a',function(e){        //切换登录/注册
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
	$('.submit_up').unbind().click(function(event) {        //注册
		event.stopPropagation();
		var userObj = {
			nickname   : $(this).parents('.data_box').find('.nickname').val(),
			accunt     : $(this).parents('.data_box').find('.accunt').val(),
			password   : $(this).parents('.data_box').find('.password').val()
		};
		console.log(userObj)
	});
	$('.submit_in').unbind().click(function(event) {        //登录
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
                                window.location.href='/';
                            }else{
                                console.warn('密码错误')
                            }
                        })
	});
});