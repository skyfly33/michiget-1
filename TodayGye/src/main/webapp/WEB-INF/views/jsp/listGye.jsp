<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page import="com.michiget.todaygye.utils.*"%>
<%-- <%@ page import="com.michiget.beans.UserInfo" %> --%>
<%
	CommonMap resultMap = (CommonMap) session.getAttribute("resultMap");
	String userId = session.getAttribute("userId").toString();
	String loginCheck = session.getAttribute("loginCheck").toString();
	if (resultMap != null && userId != null){
		System.out.println("list.jsp : Session ok!!");
		System.out.println("세션 id = " + userId);
	}
	else
		System.out.println("list.jsp : Session invalidated!!");

%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="<%=request.getContextPath() %>/resources/css/home.css" />
<title>Insert title here</title>
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
<script type="text/javascript">
	function page_move(s_page){
		var f=document.paging;
		f.page.value = s_page;
		f.action = "/todaygye/gye/listAll.do";
		f.method="post";
		f.submit();
	}
</script>
</head>
<body>
	<!-- 랩 시작 -->
	<div id="HNTS_wrap">
		<!-- 헤더 시작 -->
			<%@include file="/WEB-INF/views/jsp/include/header2.jsp" %>
		<!-- 헤더 끝 -->
		<!-- 컨테이너 시작 -->
		<div id="container">	
			<!-- 조건 영역 시작 -->
			<%-- <%@include file="/jsp/search/include/leftcsMenu.jsp" %> --%>
			<!-- 조건 영역 끝 -->
			<!-- 컨텐츠 영역 시작 -->
			<div id="content_wrap"> 
				<!-- 컨텐츠 시작 -->
				<div id="content_gye">
					<table class="gye_table" border="1">
	<thead>
				<th>계명</th>
				<th>공개여부</th>			
				<th>유저id</th>			
				<th>금액</th>
				<th>이메일</th>
				<th>ip</th>
				<th>aa</th>
			</tr>
		</thead> 
		<c:forEach items="${resultList }" var="resultList">
				<tr>
					<td>${resultList.GYENAME }</td>
					<td>${resultList.OPENCHECK }</td>
					<td>${resultList.USERID }</td>
					<td>${resultList.MONEY }</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
		</c:forEach>
	</table>
				</div>
				<!-- 컨텐츠 끝 -->
			</div>
			<!-- 컨텐츠 영역 끝 -->

			<!-- 검색어 및 즐겨찾기 영역 시작 -->
			<%-- <%@include file="/jsp/search/include/rightcsMenu.jsp" %> --%>
			<!-- 검색어 및 즐겨찾기 영역 끝 -->

		<!-- footer -->
		
			<div 
				class="page_gye">
				<form name="paging">
				<input type="hidden" name="page" />
					<c:if test="${page != 1 && page != 0}">
						<a href="javascript:page_move('${firstPage}');">처음</a>
					</c:if>
					<c:if test="${block != 1 && block !=0}">
						<a href="javascript:page_move('${startPage -1}');">이전</a>
					</c:if>
					<c:forEach step="1" begin="${startPage }" end="${endPage }" var="pagePrint">
								<c:if test="${pagePrint !=0 }">
								<c:choose>
									
									<c:when test="${pagePrint == page}">
									<a href="javascript:page_move('${pagePrint}');"><B>${pagePrint }</B></a>&nbsp;
									</c:when>
									<c:otherwise>
									<a href="javascript:page_move('${pagePrint}');">${pagePrint }</a>&nbsp;
									</c:otherwise>
									
								</c:choose>
								</c:if>
					</c:forEach>
					<c:if test="${block != totalBlock && totalBlock !=0}">
						<a href="javascript:page_move('${endPage +1}');">다음</a>
					</c:if>
					<c:if test="${page != pageCnt && pageCnt != 0}">
						<a href="javascript:page_move('${pageCnt}');">마지막</a>
					</c:if>
					</form>
			</div>
		
		<!-- footer end -->
		</div>
		<!-- 컨테이너 끝 -->

		<!-- 푸터 시작 -->
		<%@include file="/WEB-INF/views/jsp/include/footer2.jsp" %>
		<!-- 푸터 끝 -->

	</div>
	<!-- 랩 끝 -->

</body>
</html>