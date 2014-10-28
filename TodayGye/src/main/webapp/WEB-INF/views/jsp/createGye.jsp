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
<title>Insert title here</title>
<script type="text/javascript" src='js/search.js'></script>
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
<link rel="stylesheet" href="<%=request.getContextPath() %>/resources/css/home.css" />
<script type='text/javascript' charset="utf-8" src='js/jquery-1.10.2.min.js'></script>
<script type='text/javascript' charset="utf-8" src='js/jquery-ui-1.10.3.custom.min.js'></script>
<script type='text/javascript' charset="utf-8" src='autocomplete/jquery.autocomplete.js'></script>
<script type='text/javascript' charset="utf-8" src='autocomplete/tsearch.js'></script>
<link rel="stylesheet" type="text/css" charset="utf-8" href="autocomplete/jquery.autocomplete.css" />
<link href="resources/css/main.css" rel="stylesheet" type="text/css">
<script type="text/javascript">
function checkForm(){
	if($('#gyeName').val() == ""){
		alert("계이름을 입력해 주세요!!");		
		$('#gyeName').focus();
		return false;
	}
	if($('#money').val() == ""){
		alert("금액을 입력해 주세요!!");
		$('#money').focus();
		return false;
	}
	alert("통과");
	document.createForm.submit();
}		
</script>
</head>
<body>
	<!-- 랩 시작 -->
	<div id="wrap">
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
				<div id="content">
					<form action="create.do" name="createForm" method="POST" >
						<table border="1" cellspacing="0" width="500" height="400" align="center">
							<caption>계 개설</caption>
								<tr height="50">
									<th>공개여부</th>
									<td>&nbsp&nbsp<input type="radio" name="openCheck" value="공개" checked="checked" />공개 <input type="radio" name="openCheck" value="비공개" />비공개
									</td>
								</tr>
								<tr height="50">
									<th width="120">계이름</th>
									<td>&nbsp&nbsp<input type="text" id="gyeName" name="gyeName" /></td>
								</tr>
								<tr height="50">
									<th width="120">인원수</th>
									<td>&nbsp&nbsp
										<select name="persons">
											<c:forEach var="index" begin="2" end="10" step="1">
							 					<option value="${index }">${index }</option>
											</c:forEach> 
										</select>
									</td>
								</tr>
								<tr height="50">
									<th width="120">금액</th>
									<td>&nbsp&nbsp<input type="text" size="" id="money" name="money" /></td>
								</tr>
								<tr height="50">
									<th width="120">주기</th>
									<td>&nbsp&nbsp
										<select name="cycle">
											<option value="30" selected>1달</option>
												<option value="60">2달</option>
												<option value="7">1주</option>
												<option value="14">2주</option>
										</select>
									</td>
								</tr>
						</table>
		<input type="button" value="개설하기"  onclick="checkForm()"/>&nbsp;&nbsp; <input type="reset"
			value="다시하기" />
	</form>
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
		<%@include file="/WEB-INF/views/jsp/include/footer2.jsp" %>
		<!-- 푸터 끝 -->

	</div>
	<!-- 랩 끝 -->

</body>
</html>