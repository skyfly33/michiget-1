package com.michiget.todaygye.service;

import com.michiget.todaygye.utils.CommonMap;

public interface ILoginService {
	//로그인 체크
	public CommonMap loginCheck(CommonMap loginMap) throws Exception;

}