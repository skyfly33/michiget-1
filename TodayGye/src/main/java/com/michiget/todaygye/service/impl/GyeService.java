package com.michiget.todaygye.service.impl;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceAware;
import org.springframework.stereotype.Service;

import com.michiget.todaygye.dao.ICommonDAO;
import com.michiget.todaygye.service.IGyeService;
import com.michiget.todaygye.utils.CommonList;
import com.michiget.todaygye.vo.GyeInfo;

@Service("gyeService")
public class GyeService implements IGyeService, MessageSourceAware {
	
	final static Logger logger = LoggerFactory.getLogger(GyeService.class);

	@Resource(name = "commonDao")
	private ICommonDAO commonDao;
	
	private MessageSource messageSource;

	public void setMessageSource(MessageSource messageSource) {
		this.messageSource = messageSource;
	}

	// 재발송 처리
	public void insertGye(GyeInfo gyeInfo) throws Exception{
		System.out.println("서비스로 넘어온 계명 = " + gyeInfo.getGyeName());
		 commonDao.insert("gye.insertGye", gyeInfo);
	}

	public CommonList searchList(int page) throws Exception {
		return commonDao.selectList("gye.listAll", page);
	}

}
