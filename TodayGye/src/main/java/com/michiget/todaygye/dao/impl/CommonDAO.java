package com.michiget.todaygye.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.sql.SQLException;











import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

import com.michiget.todaygye.dao.ICommonDAO;
import com.michiget.todaygye.utils.CommonList;
import com.michiget.todaygye.utils.CommonMap;
import com.michiget.todaygye.vo.GyeInfo;
import com.michiget.todaygye.vo.UserInfo2;



@Repository("commonDao")
public class CommonDAO extends SqlSessionDaoSupport implements ICommonDAO{
	
	public CommonMap selectMapNoParam(String query) throws SQLException{
		return (CommonMap) getSqlSession().selectOne(query);
	}
	public CommonMap selectMap(String query, CommonMap rParam) throws SQLException{
		return (CommonMap) getSqlSession().selectOne(query, rParam);
	}
	
	
	// 로우 리스트 조회
	public CommonList selectLIstNoParam(String query) throws SQLException{
		CommonList returnList;
		List list = getSqlSession().selectList(query);
		
		if (list != null)		returnList = new CommonList(list);
		else					returnList = new CommonList();
		
		return returnList;
	}
	public CommonList selectList(String query, CommonMap rParam) throws SQLException{
		CommonList returnList;
		List list = getSqlSession().selectList(query, rParam);
		
		if (list != null)		returnList = new CommonList(list);
		else					returnList = new CommonList();
		
		return returnList;
	}
	
	public int insert(String query, GyeInfo gyeInfo) throws SQLException {
		int result = getSqlSession().insert(query, gyeInfo);
		System.out.println("마이바티스에서 리턴되는 int 값은 = " + result);
		return result;
	}
	
	// 입력
	public int insert(String query, CommonMap rParam) throws SQLException{
		int result = getSqlSession().insert(query, rParam);
		
		return result;
	}
	// 수정
	public int update(String query, CommonMap rParam) throws SQLException{
		int result = getSqlSession().update(query, rParam);
		return result;
	}
	// 삭제
	public int delete(String query, CommonMap rParam) throws SQLException{
		int result = getSqlSession().delete(query, rParam);
		return result;
	}
	
	public CommonList selectList(String query, GyeInfo gyeInfo)
			throws SQLException {
		CommonList returnList;
		List list = getSqlSession().selectList(query, gyeInfo);
		
		if (list != null)		returnList = new CommonList(list);
		else					returnList = new CommonList();
		
		return returnList;
	}
	
	public CommonList selectList(String query, int page) throws SQLException {
		CommonList returnList;
		List list = getSqlSession().selectList(query, page);
		
		if (list != null)		returnList = new CommonList(list);
		else					returnList = new CommonList();
		
		return returnList;
	}
	
	public int getTotalCnt(String query) throws SQLException {
		return (Integer) getSqlSession().selectOne(query);
	}
	public int insert(String query, UserInfo2 userInfo2) throws SQLException {
		return getSqlSession().insert(query, userInfo2);
	}
	
	
	

}
