package com.michiget.todaygye.utils;

import java.util.Collection;

public class CommonList extends java.util.ArrayList {

	private static final long serialVersionUID = -3769066081890880251L;
	public int totalRow = 0;
	public int page = 0;
	public int pageSize = 0;
	private CommonMap pageMap;
	
	/**
	 * 
	 */
	public CommonList() {
		super();
	}

	/**
	 * @param arg0
	 */
	public CommonList(int arg0) {
		super(arg0);
	}

	/**
	 * @param arg0
	 */
	public CommonList(Collection arg0) {
		super(arg0);
	}

	public CommonMap getMap( int idx ){
		return (CommonMap)super.get(idx);
	}
	
	public String toString(){
		String str = "totalRow=" + this.totalRow + ", page=" + this.page + ", pageSize=" + pageSize + "\n";
		str += super.toString();
		return str;
	}

	
	public int getTotalRow() {
		return totalRow;
	}

	public void setTotalRow(int totalRow) {
		this.totalRow = totalRow;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
}



