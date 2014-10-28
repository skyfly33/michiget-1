<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
	<div class="container">
		<h1>
			"<%=userId%>" loginsuccess
		</h1>

		<form action="/todaygye/member/listAll.do" method="get">
			<ul>
				<li><input class="btn btn-primary" type="submit" value="회원리스트" /></li>
			</ul>
		</form>
	</div>
	<%@include file="/WEB-INF/views/jsp/include/footer2.jsp" %>
</body>
</html>