package com.michiget.todaygye.service.impl;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceAware;
import org.springframework.stereotype.Service;

import com.michiget.todaygye.dao.ICommonDAO;
import com.michiget.todaygye.service.ILoginService;
import com.michiget.todaygye.service.IMemberService;
import com.michiget.todaygye.utils.CommonList;
import com.michiget.todaygye.utils.CommonMap;
import com.michiget.todaygye.vo.UserInfo2;

@Service("memberService")
public class MemberService implements IMemberService, MessageSourceAware {

	final static Logger logger = LoggerFactory.getLogger(LoginService.class);

	@Resource(name = "commonDao")
	private ICommonDAO commonDao;
	
	private MessageSource messageSource;

	public void setMessageSource(MessageSource messageSource) {
		this.messageSource = messageSource;
	}

	public CommonList searchList(int page) throws Exception {
		return commonDao.selectList("member.listAll", page);
	}

	
	public int insert(UserInfo2 userInfo2) throws Exception {
		return commonDao.insert("member.insertMember", userInfo2);
	}

	

	
	
	
	
}