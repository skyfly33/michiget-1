package com.michiget.todaygye.service.impl;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceAware;
import org.springframework.stereotype.Service;

import com.michiget.todaygye.dao.ICommonDAO;
import com.michiget.todaygye.service.ILoginService;
import com.michiget.todaygye.utils.CommonMap;

@Service("loginService")
public class LoginService implements ILoginService, MessageSourceAware {

	final static Logger logger = LoggerFactory.getLogger(LoginService.class);

	@Resource(name = "commonDao")
	private ICommonDAO commonDao;
	
	private MessageSource messageSource;

	public void setMessageSource(MessageSource messageSource) {
		this.messageSource = messageSource;
	}

	
	public CommonMap loginCheck(CommonMap loginMap) throws Exception {
		return commonDao.selectMap("login.getLoginId", loginMap);
	}


	
	
	
	
}
