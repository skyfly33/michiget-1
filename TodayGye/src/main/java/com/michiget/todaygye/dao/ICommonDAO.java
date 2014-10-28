package com.michiget.todaygye.dao;

import java.sql.SQLException;
import java.util.ArrayList;

import com.michiget.todaygye.utils.CommonList;
import com.michiget.todaygye.utils.CommonMap;
import com.michiget.todaygye.vo.GyeInfo;
import com.michiget.todaygye.vo.UserInfo2;



public interface ICommonDAO {
	
	// 조회
	
	public CommonMap selectMap(String query, CommonMap rParam) throws SQLException;
	public int insert(String query, GyeInfo gyeInfo) throws SQLException;
	public int insert(String query, UserInfo2 userInfo2) throws SQLException;
	public int getTotalCnt(String query) throws SQLException;						
	public CommonList selectList(String query, GyeInfo gyeInfo) throws SQLException;
	public CommonList selectList(String query, CommonMap map) throws SQLException;
	public CommonList selectList(String query, int page) throws SQLException;
	
}
