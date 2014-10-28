<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page import="com.michiget.todaygye.utils.*"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>TodayGye - header</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">

<!-- Le styles -->

<link href="<%=request.getContextPath() %>/resources/assets/css/bootstrap.css" rel="stylesheet">
<link href="<%=request.getContextPath() %>/resources/css/header.css" rel="stylesheet">
<link href="<%=request.getContextPath() %>/resources/assets/css/bootstrap-responsive.css"
	rel="stylesheet">

<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
		<script src="../assets/js/html5shiv.js"></script>
		<![endif]-->

<!-- Fav and touch icons -->
<link rel="apple-touch-icon-precomposed" sizes="144x144"
	href="<%=request.getContextPath() %>/resources/assets/ico/apple-touch-icon-144-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="114x114"
	href="<%=request.getContextPath() %>/resources/assets/ico/apple-touch-icon-114-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="72x72"
	href="<%=request.getContextPath() %>/resources/assets/ico/apple-touch-icon-72-precomposed.png">
<link rel="apple-touch-icon-precomposed"
	href="<%=request.getContextPath() %>/resources/assets/ico/apple-touch-icon-57-precomposed.png">
<link rel="shortcut icon" href="<%=request.getContextPath() %>/resources/assets/ico/favicon.png">

<!-- formChech 자바스크립트 -->
<script type="text/javascript" src="<%=request.getContextPath() %>/resources/js/formCheck.js"></script>
</head>

<body>
	<div class="navbar navbar-inverse navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container">
				<button type="button" class="btn btn-navbar" data-toggle="collapse"
					data-target=".nav-collapse">
					<span class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="brand" href="/todaygye">TodayGye</a>
				<div class="nav-collapse collapse">
					<ul class="nav">
						<li class="active"><a href="/todaygye/gye/createForm.do">계 만들기</a></li>
						<li><a href="/todaygye/gye/listAll.do">계 목록</a></li>
						<li><a href="#contact">Contact</a></li>
						<li class="dropdown"><a href="#" class="dropdown-toggle"
							data-toggle="dropdown">Menu <b class="caret"></b></a>
							<ul class="dropdown-menu">
								<li><a href="#">Action</a></li>
								<li><a href="#">Another action</a></li>
								<li><a href="#">Something else here</a></li>
								<li class="divider"></li>
								<li class="nav-header">Nav header</li>
								<li><a href="#">Separated link</a></li>
								<li><a href="#">One more separated link</a></li>
							</ul></li>
					</ul>
					<form class="navbar-form pull-right">
						<input class="span2" type="text" placeholder="Search">
						<button type="submit" class="btn">Search</button>
						<a href="#join" class="btn" role="button" data-toggle="modal">Join</a>
						<c:choose>
						<c:when test="${loginCheck != 'true' }">
						
						<a href="#login" class="btn" role="button" data-toggle="modal">Login</a>
						</c:when>
						<c:otherwise>
						<a href="/todaygye/login/logOut.do" class="btn" role="button">Logout</a>
						</c:otherwise>
						</c:choose>
					</form>
				</div>
				<!--/.nav-collapse -->
			</div>
		</div>
	</div>

	<!-- 로그인 -->
	<div id="login" class="modal hide fade" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-header">
			<button class="close" type="button" data-dismiss="modal"
				aria-hidden="true">x</button>
			<h3 id="myModalLabel">Login</h3>
		</div>
		<div class="modal-body">
			<form action="/todaygye/login/loginCheck.do" method="POST"
				onsubmit="return formCheck();">
				<input type="hidden" name="orgLogin" value="a">
				<table>

					<tr>
						<th>
							<div class="input-group">
								<span class="input-group-addon">@</span> <input
									class="form-control" placeholder="Username" type="text"
									name="loginId" size="20">
							</div>
						</th>
					</tr>
					<tr>
						<th>
							<div class="input-group">
								<span class="input-group-addon">@</span> <input
									class="form-control" placeholder="Password" size="20"
									name="pass" type="password">
							</div>
						</th>
					</tr>

				</table>
				<ul>
					<li><input class="btn btn-primary btn-lg" type="submit"
						value="login" /></li>
				</ul>
			</form>
		</div>
	</div>
	<!-- 회원가입 -->
	<div id="join" class="modal hide fade" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-header">
			<button class="close" type="button" data-dismiss="modal"
				aria-hidden="true">x</button>
			<h3 id="myModalLabel">TodayJoin</h3>
		</div>
		<div class="modal-body">
			<form action="/todaygye/member/join.do" name="joinForm" method="POST"
				onsubmit="return joinFormCheck();">
				<table border="1" cellspacing="0" width="500" height="400"
					align="center">
					<tr height="35">
						<th width="120">이름</th>
						<td>&nbsp;&nbsp;<input type="text" name="NAME" /></td>
					</tr>
					<tr height="35">
						<th width="120">아이디</th>
						<td>&nbsp;&nbsp;<input type="text" name="USERID" /></td>
					</tr>
					<tr height="35">
						<th width="120">비밀번호</th>
						<td>&nbsp;&nbsp;<input type="password" name="PASS" /></td>
					</tr>
					<tr height="35">
						<th width="120">비밀번호확인</th>
						<td>&nbsp;&nbsp;<input type="password" name="passCheck" /></td>
					</tr>
					<tr height="35">
						<th width="120">비밀번호 찾기 질문</th>
						<td>&nbsp;&nbsp;<select name="PASSQUESTION" class="span1">
								<option value="">선택하세요</option>
								<option value="내가 좋아하는 게임은?">내가 좋아하는 게임은?</option>
								<option value="내가 좋아하는 만화 케릭터는?">내가 좋아하는 만화 케릭터는?</option>
								<option value="가장 기억에 남는 장소는?">가장 기억에 남는 장소는?</option>
								<option value="나의 보물 제1호는?">나의 보물 제1호는?</option>
								<option value="나의 출신 초등학교는?">나의 출신 초등학교는?</option>
								<option value="가장 기억에 남는 선생님 성함은?">가장 기억에 남는 선생님 성함은?</option>
								<option value="내가 존경하는 인물은?">내가 존경하는 인물은?</option>
								<option value="가장 생각나는 친구 이름은?">가장 생각나는 친구 이름은?</option>
								<option value="나의 출생지는?">나의 출생지는?</option>
								<option value="오래도록 기억하고 싶은 날짜는?">오래도록 기억하고 싶은 날짜는?</option>
								<option value="인상 깊게 읽은 책 이름은?">인상 깊게 읽은 책 이름은?</option>
								<option value="가장 좋아하는 영화 이름은?">가장 좋아하는 영화 이름은?</option>
								<option value="나의 노래방 18번은?">나의 노래방 18번은?</option>
								<option value="내 핸드폰 '0'번 혹은 '1'번에 등록된 사람은?">내 핸드폰 '0'번
									혹은 '1'번에 등록된 사람은?</option>
						</select></td>
					</tr>
					<tr height="35">
						<th width="120">비밀번호 찾기 답변</th>
						<td>&nbsp;&nbsp;<input type="text" size="" name="PASSREPLY" /></td>
					</tr>
					<tr height="35">
						<th>이메일</th>
						<td>&nbsp;&nbsp;<input type="text" class="span1"
							name="EMAIL1" />@ <input type="text" class="span2" name="EMAIL2" />&nbsp;
							<select name="EMAIL2" onchange="mail_sel()" class="span1">
								<option value="">직접입력</option>
								<option value="hanmail.net">hanmail.net</option>
								<option value="naver.com">naver.com</option>
								<option value="nate.com">nate.com</option>
						</select>
						</td>
					</tr>
					<tr height="35">
						<th width="120">연락처(자택/직장)</th>
						<td>&nbsp;&nbsp;<select name="PHONE1">
								<option value="02">02</option>
								<option value="031">031</option>
								<option value="032">032</option>
								<option value="033">033</option>
								<option value="041">041</option>
								<option value="042">042</option>
								<option value="043">043</option>
								<option value="044">044</option>
								<option value="051">051</option>
								<option value="052">052</option>
								<option value="053">053</option>
								<option value="054">054</option>
								<option value="055">055</option>
								<option value="061">061</option>
								<option value="062">062</option>
								<option value="063">063</option>
								<option value="064">064</option>
								<option value="070">070</option>
								<option value="030">030</option>
								<option value="050">050</option>
								<option value="0502">0502</option>
								<option value="0504">0504</option>
								<option value="0505">0505</option>
								<option value="0506">0506</option>
								<option value="연락처없음">연락처없음</option>
						</select>-<input type="text" name="PHONE2" />-<input type="text"
							name="PHONE3" /></td>
					</tr>
					<tr height="35">
						<th width="120">연락처(휴대폰)</th>
						<td>&nbsp;&nbsp;<select name="WIREAGENCY">
								<option value="SKT">SKT</option>
								<option value="KT">KT</option>
								<option value="LG U+">LG U+</option>
								<option value="휴대폰없음">휴대폰없음</option>
						</select>-<input type="text" name="SELLPHONE1" />-<input type="text"
							name="SELLPHONE2" />-<input type="text" name="SELLPHONE3" /></td>
					</tr>
					<tr height="35">
						<th width="120">주소</th>
						<td>&nbsp;&nbsp;<input type="text" name="ZIPCODE1" />-<input
							type="text" name="ZIPCODE2" />&nbsp;&nbsp;<input type="text"
							name="ADDRESS1" />-<input type="text" name="ADDRESS2" /></td>
					</tr>
					<tr height="35">
						<th width="120">계좌정보</th>
						<td>&nbsp;&nbsp;<select name="BANK">
								<option value="은행선택">은행선택</option>
								<option value="광주은행">광주은행</option>
								<option value="경남은행">경남은행</option>
								<option value="국민은행">국민은행</option>
								<option value="기업은행">기업은행</option>
								<option value="농협">농협</option>
								<option value="농협회원">농협회원</option>
								<option value="대구은행">대구은행</option>
								<option value="마을금고">마을금고</option>
								<option value="부산은행">부산은행</option>
								<option value="산업은행">산업은행</option>
								<option value="하나은행(구서울은행)">하나은행(구서울은행)</option>
								<option value="신한은행">신한은행</option>
								<option value="시티은행">시티은행</option>
								<option value="외환은행">외환은행</option>
								<option value="우체국">우체국</option>
								<option value="전북은행">전북은행</option>
								<option value="제일은행">제일은행</option>
								<option value="제주은행">제주은행</option>
								<option value="조흥은행">조흥은행</option>
								<option value="한미은행">한미은행</option>
								<option value="우리은행">우리은행</option>
								<option value="홍콩은행">홍콩은행</option>
								<option value="수협">수협</option>
								<option value="신협">신협</option>
								<option value="상호신용">상호신용</option>
						</select>&nbsp;<input type="text" name="ACCOUNT" /></td>
					</tr>
					<!-- 
					<tr height="35">
						<th>성별</th>
						<td>&nbsp;&nbsp;<input type="radio" name="gender" value="남자"
							checked="checked" />남자 <input type="radio" name="gender"
							value="여자" />여자
						</td>
					</tr>
					-->
				</table>
				<div class="modal-footer">
					<input class="btn btn-primary" type="submit" value="가입하기" />&nbsp;&nbsp;
					<input class="btn btn-primary" type="reset" value="다시하기" />
				</div>
			</form>
		</div>
	</div>
</body>
</html>