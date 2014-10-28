package com.michiget.todaygye.service;

import com.michiget.todaygye.utils.CommonList;
import com.michiget.todaygye.utils.CommonMap;
import com.michiget.todaygye.vo.UserInfo2;

public interface IMemberService {
	
	public CommonList searchList(int  page) throws Exception;

	public int insert(UserInfo2 userInfo2) throws Exception;

}
