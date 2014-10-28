<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%-- <%@ page import="com.michiget.beans.UserInfo" %> --%>
<%@ page session="true" %>
<%
	/* UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
	String loginId = session.getAttribute("loginId").toString();
	if (userInfo != null && loginId != null)
		System.out.println("session ok!!");
	else
		System.out.println("session invalidated!!!!"); */

%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src='js/search3.js'></script>
<script type='text/javascript' charset="utf-8"
	src='autocomplete/jquery.min.js'></script>
<script type='text/javascript' charset="utf-8"
	src='autocomplete/jquery.autocomplete.js'></script>
<script type='text/javascript' charset="utf-8"
	src='autocomplete/tsearch.js'></script>
<link rel="stylesheet" type="text/css" charset="utf-8"
	href="autocomplete/jquery.autocomplete.css" />
<link href="resources/css/main.css" rel="stylesheet" type="text/css">
<script type="text/javascript">
</script>
</head>
<body>
	<!-- 랩 시작 -->
	<div id="HNTS_wrap">
		<!-- 헤더 시작 -->
			<%@include file="/WEB-INF/views/jsp/include/header.jsp" %>
		<!-- 헤더 끝 -->
		<!-- 컨테이너 시작 -->
		<div id="container">	
			<!-- 조건 영역 시작 -->
			<%-- <%@include file="/jsp/search/include/leftcsMenu.jsp" %> --%>
			<!-- 조건 영역 끝 -->
			<!-- 컨텐츠 영역 시작 -->
			<div id="content_wrap"> 
				<!-- 컨텐츠 시작 -->
				<div id="content">
					
		<table border="1" cellspacing="0" width="500" height="400"
			align="center">
			마이페이지
		</table>
		
	
				</div>
				<!-- 컨텐츠 끝 -->
			</div>
			<!-- 컨텐츠 영역 끝 -->

			<!-- 검색어 및 즐겨찾기 영역 시작 -->
			<%-- <%@include file="/jsp/search/include/rightcsMenu.jsp" %> --%>
			<!-- 검색어 및 즐겨찾기 영역 끝 -->

		</div>
		<!-- 컨테이너 끝 -->

		<!-- 푸터 시작 -->
		<%-- <%@include file="/jsp/search/include/searchcsFooter.jsp" %> --%>
		<!-- 푸터 끝 -->

	</div>
	<!-- 랩 끝 -->

</body>
</html>