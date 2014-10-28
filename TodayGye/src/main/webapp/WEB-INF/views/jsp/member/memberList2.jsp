<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="com.michiget.todaygye.utils.*"%>
<%@ page session="true"%>
<%
	CommonMap resultMap = (CommonMap) session.getAttribute("resultMap");
	String userId = session.getAttribute("userId").toString();
	if (resultMap != null && userId != null)
		System.out.println("list.jsp : Session ok!!");
	else
		System.out.println("list.jsp : Session invalidated!!");
%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">
<link rel="stylesheet" href="<%=request.getContextPath() %>/resources/css/home.css" />
<!-- formChech 자바스크립트 -->
<script src="<%=request.getContextPath() %>/resources/assets/js/jquery.js"></script>
<script src="<%=request.getContextPath() %>/resources/assets/js/bootstrap-transition.js"></script>
<script src="<%=request.getContextPath() %>/resources/assets/js/bootstrap-alert.js"></script>
<script src="<%=request.getContextPath() %>/resources/assets/js/bootstrap-modal.js"></script>
<script src="<%=request.getContextPath() %>/resources/assets/js/bootstrap-dropdown.js"></script>
<script src="<%=request.getContextPath() %>/resources/assets/js/bootstrap-scrollspy.js"></script>
<script src="<%=request.getContextPath() %>/resources/assets/js/bootstrap-tab.js"></script>
<script src="<%=request.getContextPath() %>/resources/assets/js/bootstrap-tooltip.js"></script>
<script src="<%=request.getContextPath() %>/resources/assets/js/bootstrap-popover.js"></script>
<script src="<%=request.getContextPath() %>/resources/assets/js/bootstrap-button.js"></script>
<script src="<%=request.getContextPath() %>/resources/assets/js/bootstrap-collapse.js"></script>
<script src="<%=request.getContextPath() %>/resources/assets/js/bootstrap-carousel.js"></script>
<script src="<%=request.getContextPath() %>/resources/assets/js/bootstrap-typeahead.js"></script>
<script src="<%=request.getContextPath() %>/resources/assets/js/bootstrap-affix.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>resources/js/formCheck.js"></script>
<title>TodayGye - loginsuccess</title>
</head>
<body>
<%@include file="/WEB-INF/views/jsp/include/header2.jsp" %>
	<!-- container -->
	<div class="container">
		<!-- header -->
		<div id="header">
			<div class="page-header">
				<h1>
					회원 리스트&nbsp;&nbsp;<small>현재 님으로 로그인 하셨습니다.
					</small>
				</h1>
			</div>

			<ul class="nav nav-pills nav-justified navbar-static-top">
				<li class="active"><a href="/todaygye/list">회원리스트</a></li>
			</ul>
		</div>
		<!-- header end -->
		<!-- container -->
		<div id="container">
			<table class="table table-bordered table-hover">
				<thead>
					<tr class="danger">
						<th>번호</th>
						<th>아이디</th>
						<th>대화명</th>
						<th>통신사</th>
						<th>이메일</th>
						<th>ip</th>
						<th>가입일</th>
					</tr>
				</thead>
				<c:forEach items="${resultList }" var="resultList">
					<tbody>
						<tr>
							<td>${resultList.IDX }</td>
							<td class="success">${resultList.USERID }</td>
							<td>${resultList.NAME }</td>
							<td>${resultList.WIREAGENCY }</td>
							<td>${resultList.EMAIL1 }@${resultList.EMAIL2 }</td>
							<td>${resultList.REGIP }</td>
							<td>${resultList.REGDATE }</td>
						</tr>
					</tbody>
				</c:forEach>
			</table>
		</div>
		<!-- container end -->
		<!-- footer -->
		<div id="footer">
			<div 
				class="page_member">
				<ul>
					<c:if test="${page != 1 && page != 0}">
						<a href="/todaygye/member/listAll.do?page=${firstPage}">처음</a>
					</c:if>
					<c:if test="${block != 1 && block !=0}">
						<a href="/todaygye/member/listAll.do?page=${startPage -1}">이전</a>
					</c:if>
					<c:forEach step="1" begin="${startPage }" end="${endPage }" var="pagePrint">
								<c:if test="${pagePrint !=0 }">
								<c:choose>
									
									<c:when test="${pagePrint == page}">
									<a href="/todaygye/member/listAll.do?page=${pagePrint}"><B>${pagePrint }</B></a>&nbsp;
									</c:when>
									<c:otherwise>
									<a href="/todaygye/member/listAll.do?page=${pagePrint}">${pagePrint }</a>&nbsp;
									</c:otherwise>
									
								</c:choose>
								</c:if>
					</c:forEach>
					<c:if test="${block != totalBlock && totalBlock !=0}">
						<a href="/todaygye/member/listAll.do?page=${endPage +1}">다음</a>
					</c:if>
					<c:if test="${page != pageCnt && pageCnt != 0}">
						<a href="/todaygye/member/listAll.do?page=${pageCnt}">마지막</a>
					</c:if>
				</ul>
			</div>
		</div>
		<!-- footer end -->
	</div>
	<!-- container -->
	<%@include file="/WEB-INF/views/jsp/include/footer2.jsp" %>
</body>
</html>