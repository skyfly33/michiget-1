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
<link rel="stylesheet" href="<%=request.getContextPath() %>/resources/css/home.css" />
<script type="text/javascript" src="<%=request.getContextPath() %>/resources/js/formCheck.js"></script>
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
</script>
</head>
<body>
	<!-- 랩 시작 -->
	<div id="HNTS_wrap">
		<!-- 헤더 시작 -->
			<%@include file="/WEB-INF/views/jsp/include/header2.jsp" %>
		<!-- 헤더 끝 -->
		<!-- 컨테이너 시작 -->
		<div class="container">
		<div id="myCarousel" class="carousel slide">
			<ol class="carousel-indicators">
				<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
				<li data-target="#myCarousel" data-slide-to="1"></li>
				<li data-target="#myCarousel" data-slide-to="2"></li>
			</ol>
			<!-- Carousel items -->
			<div class="carousel-inner">
				<div class="active item">
					<img class="img-circle" src="<%=request.getContextPath() %>/resources/images/todaygye (1).jpg"
						alt="todaygye_logo" />
					<div class="container">
						<div class="carousel-caption">
							<h2>Hello TodayGye!</h2>
							<P>The time on the server is ${serverTime}.</P>
							<form action="/todaygye/login/loginForm.do" method="get">
								<ul>
									<li><input class="btn btn-primary" type="submit"
										value="LoginForm" /></li>
								</ul>
							</form>
						</div>
					</div>
				</div>
				<div class="item">
					<img class="img-circle" src="<%=request.getContextPath() %>/resources/images/todaygye (5).jpg"
						alt="todaygye_logo" />
					<div class="container">
						<div class="carousel-caption">
							<h2>Hello TodayGye!</h2>
							<P>The time on the server is ${serverTime}.</P>
							<form action="/todaygye/login/loginForm.do" method="get">
								<ul>
									<li><input class="btn btn-primary" type="submit"
										value="LoginForm" /></li>
								</ul>
							</form>
						</div>
					</div>
				</div>
				<div class="item">
					<img class="img-circle" src="<%=request.getContextPath() %>/resources/images/todaygye (6).jpg"
						alt="todaygye_logo" />
					<div class="container">
						<div class="carousel-caption">
							<h2>Hello TodayGye!</h2>
							<P>The time on the server is ${serverTime}.</P>
							<form action="/todaygye/login/loginForm.do" method="get">
								<ul>
									<li><input class="btn btn-primary" type="submit"
										value="LoginForm" /></li>
								</ul>
							</form>
						</div>
					</div>
				</div>
			</div>
			<!-- Carousel nav -->
			<a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
			<a class="carousel-control right" href="#myCarousel"
				data-slide="next">&rsaquo;</a>
		</div>
		<div class="row">
			<div class="span4">
				<img class="img-circle" src="<%=request.getContextPath() %>/resources/images/todaygye (2).jpg" alt="todaygye" />
				<h2>Gye1</h2>
				<p>Donec id elit non mi porta gravida at eget metus. Fusce
					dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
					ut fermentum massa justo sit amet risus. Etiam porta sem malesuada
					magna mollis euismod. Donec sed odio dui.</p>
				<p>
					<a class="btn" href="#">View details &raquo;</a>
				</p>
			</div>
			<div class="span4">
				<img class="img-circle" src="<%=request.getContextPath() %>/resources/images/todaygye (3).jpg" alt="todaygye" />
				<h2>Gye2</h2>
				<p>Donec id elit non mi porta gravida at eget metus. Fusce
					dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
					ut fermentum massa justo sit amet risus. Etiam porta sem malesuada
					magna mollis euismod. Donec sed odio dui.</p>
				<p>
					<a class="btn" href="#">View details &raquo;</a>
				</p>
			</div>
			<div class="span4">
				<img class="img-circle" src="<%=request.getContextPath() %>/resources/images/todaygye (4).jpg" alt="todaygye" />
				<h2>Gye3</h2>
				<p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
					egestas eget quam. Vestibulum id ligula porta felis euismod semper.
					Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
					nibh, ut fermentum massa justo sit amet risus.</p>
				<p>
					<a class="btn" href="#">View details &raquo;</a>
				</p>
			</div>
		</div>
		<div class="row">
			<div class="span6">
				<img class="img-circle" src="<%=request.getContextPath() %>/resources/images/todaygye (2).jpg" alt="todaygye" />
				<h2>Gye4</h2>
				<p>Donec id elit non mi porta gravida at eget metus. Fusce
					dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
					ut fermentum massa justo sit amet risus. Etiam porta sem malesuada
					magna mollis euismod. Donec sed odio dui.</p>
				<p>
					<a class="btn" href="#">View details &raquo;</a>
				</p>
			</div>
		
			<div class="span6">
				<img class="img-circle" src="<%=request.getContextPath() %>/resources/images/todaygye (4).jpg" alt="todaygye" />
				<h2>Gye5</h2>
				<p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
					egestas eget quam. Vestibulum id ligula porta felis euismod semper.
					Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
					nibh, ut fermentum massa justo sit amet risus.</p>
				<p>
					<a class="btn" href="#">View details &raquo;</a>
				</p>
			</div>
		</div>
		<div class="row">
			<div class="span3">
				<img class="img-circle" src="<%=request.getContextPath() %>/resources/images/todaygye (2).jpg" alt="todaygye" />
				<h2>Gye6</h2>
				<p>Donec id elit non mi porta gravida at eget metus. Fusce
					dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
					ut fermentum massa justo sit amet risus. Etiam porta sem malesuada
					magna mollis euismod. Donec sed odio dui.</p>
				<p>
					<a class="btn" href="#">View details &raquo;</a>
				</p>
			</div>
			<div class="span6">
				<img class="img-circle" src="<%=request.getContextPath() %>/resources/images/todaygye (3).jpg" alt="todaygye" />
				<h2>Gye7</h2>
				<p>Donec id elit non mi porta gravida at eget metus. Fusce
					dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
					ut fermentum massa justo sit amet risus. Etiam porta sem malesuada
					magna mollis euismod. Donec sed odio dui.</p>
				<p>
					<a class="btn" href="#">View details &raquo;</a>
				</p>
			</div>
			<div class="span3">
				<img class="img-circle" src="<%=request.getContextPath() %>/resources/images/todaygye (4).jpg" alt="todaygye" />
				<h2>Gye8</h2>
				<p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
					egestas eget quam. Vestibulum id ligula porta felis euismod semper.
					Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
					nibh, ut fermentum massa justo sit amet risus.</p>
				<p>
					<a class="btn" href="#">View details &raquo;</a>
				</p>
			</div>
		</div>
	</div>
		<!-- 컨테이너 끝 -->

		<!-- 푸터 시작 -->
		<%@include file="/WEB-INF/views/jsp/include/footer2.jsp" %>
		<!-- 푸터 끝 -->

	</div>
	<!-- 랩 끝 -->

</body>
</html>