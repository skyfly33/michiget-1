package com.michiget.todaygye.service;

import com.michiget.todaygye.utils.CommonList;
import com.michiget.todaygye.vo.GyeInfo;

public interface IGyeService {

	//
	public void insertGye(GyeInfo gyeInfo) throws Exception;

	public CommonList searchList(int page) throws Exception;
	
}