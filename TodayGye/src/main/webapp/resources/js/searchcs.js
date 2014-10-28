//달력calendarUI	
var calendarUI = {
			pageNo: 1,
			articleCount: 10,
			pageIndexCount: 10,

			//달력 보이기 
			showCalendar: function(id) {
				jQuery("#" +id).focus();
			},
			
			//달력 지우기
			delCalendar: function() {
				hideCalenderDiv();
				//goDateRangeResults('custom','365');
			},
			
			searchGo: function(mode,range){
				
				var _startDt = jQuery("#directStartDate").val();
				var _endDt = jQuery("#directEndDate").val();	
				
				if(_startDt!=""&&_endDt!="" && (_startDt > _endDt )){
					alert("시작일이 종료일보다 클 수 없습니다.");
					return;
				}
				
				goDateRangeResults(mode,range);
				
				
			}
			
		};
	
	 //기본메소드 재설정(콜센터)
	   function initparam(){
		   $("input[name=v_searchCategory]").val("all");
		   $("input[name=v_searchSubCategory]").val("all");
//		   $("input[name=v_searchField]").val("title");
		   $("input[name=v_searchField]").val("all");
		//   $("input[name=v_searchRange]").val("365");
		   $("input[name=v_searchStartDate]").val("");
		   $("input[name=v_searchEndDate]").val("");
		   $("input[name=v_pageNo]").val("1");
		   $("input[name=v_searchSort]").val("default");
		   $("input[name=v_pageSize]").val("3");
		   $("input[name=v_reSearchQuery]").val("");
		   
		   //모든 UI 영역 의 이미지를 원래대로 바꾸어 놓는다.
		   // 업무 구분 default 화
				var subCategory=$("input[name=v_searchSubCategory]").val();
				var category=$("input[name=v_searchCategory]").val();
				leftMenuStatusChange(category,subCategory)

		   // 업무기간 default 화  
				$("#sort_B_date").find("a").each(function(){
					$(this).attr("class","");
				});
				var range= $("input[name=v_searchRange]").val();
				$("#"+range+"DateLink").attr("class","on")
				
					
//					setDateString("custom","365");
					setDefaultDateString();
					if(range=='all'){
						calendarUI.delCalendar();
					}
			
		   // 기간 default 화 
				var mode=   $("input[name=v_searchField]").val();
					$("#sort_B_field").find("a").each(function(){
						$(this).attr("class","");
					});
					$("#"+mode+"FieldLink").attr("class","on");
	   }
	   function initParamCategory(){
		   $("input[name=v_pageNo]").val("1");
		   $("input[name=v_pageSize]").val("10");
		   $("input[name=v_reSearchQuery]").val("");
		   
		   //모든 UI 영역 의 이미지를 원래대로 바꾸어 놓는다.
		   // 업무 구분 default 화
	   }
	   
	   function searchAjaxSequence(seq){
		   searchTypeSuccessCount=seq;
		   var _type= searchType[seq];
		   searchAjax(_type);
	   }
	   function wikiSearchAjax(){
		   $.post("/search.do?cmd=newTurnWikiRecommandSearch",{},
				   function(data,textStatus){
			   $("#recommandWiki").html(data);//검색결과 뿌려주기
		   }
				   );
	   }
		
		//기본 검색 메소드(콜센터용)
		function searchAjax(_type){
			hideNoResult();//noResultQuery
			var categoryVal=$("input[name=v_searchCategory]").val();
			if(categoryVal!="all"){
				
				$.each(searchType, function(index,value){
					var tempDiv="#"+value+"ResultDiv";
					$(tempDiv).html('').hide();
					
				});
			}
			var resultDiv="#"+_type+"ResultDiv";
			$(resultDiv).html('검색중 <img src="/img/ajax-loader_2.gif"/>');
			//leftMenuCountUpdateBefore(_type);
			if(checkNoResult()){// 검색효율성을 위해 pi 결과 항시 체크				
				jQuery.post(
						"/search.do?cmd="+_type+"Search",
						(
								$("#searchGNB").serialize()
						)
						,
						function(data, textStatus){
							
							if(textStatus == "success"){
								// 성공후에 해야할 것들
								$(resultDiv).show();
								$(resultDiv).html(data);//검색결과 뿌려주기

								if(categoryVal=='all'){//전체검색일경우
									searchTypeSuccessCount++;//성공플래그에다 더해준다.
									
									if(searchTypeSuccessCount>=searchType.length){
										searchTypeSuccessCount=0;
										// 화면전체 레이어 블록 처리 숨김
										windowViewBlockHide();
										
										
									}else{
										searchAjaxSequence(searchTypeSuccessCount);
									}
								}else {
									windowViewBlockHide();
									checkNoResult();
								}
							}
						}
						
					);
			}else{
				windowViewBlockHide();
			}
		
		}
		
	function checkNoResult(){ //콜센터 검색용
		var userGubun=$("#v_userGubun").val();
		var tempDiv="";	
		
//		searchType=	["knowledgeMap","prod","notice","event","doc","wiki","cop","qna","board"];
		
		if($("#category0").text()!='-'&&$("#category0").text()=='0'){//전체검색결과가 없을 경우
			$.each(searchType, function(index,value){
				tempDiv="#"+value+"ResultDiv";
				$(tempDiv).html('').hide();
				
			});
			showNoResult();
			return false;
		}else {//각 검색영역에서 검색결과가 없을 경우
			if($("#category1").text()!='-'&&$("#category1").text()=='0'){//지식맵 검색결과 없을 경우
				tempDiv=	"#"+searchType[0]+"ResultDiv";
				$(tempDiv).html('').hide();
				if($("input[name=v_searchCategory]").val()==searchType[0]){
					showNoResult();
					return false;
				}
				
			}
			if($("#category2").text()!='-'&&$("#category2").text()=='0'){//상품관 검색결과 없을 경우
				tempDiv=	"#"+searchType[1]+"ResultDiv";
				$(tempDiv).html('').hide();
				if($("input[name=v_searchCategory]").val()==searchType[1]){
					showNoResult();
					return false;
				}
				
			}
			if($("#category3").text()!='-'&&$("#category3").text()=='0'){//공지사항 검색결과 없을 경우
				tempDiv=	"#"+searchType[2]+"ResultDiv";
				$(tempDiv).html('').hide();
				if($("input[name=v_searchCategory]").val()==searchType[2]){
					showNoResult();
					return false;
				}
				
			}
			if($("#category4").text()!='-'&&$("#category4").text()=='0'){//이벤트 검색결과 없을 경우
				tempDiv=	"#"+searchType[3]+"ResultDiv";
				$(tempDiv).html('').hide();
				if($("input[name=v_searchCategory]").val()==searchType[3]){
					showNoResult();
					return false;
				}
				
			}
			if($("#category5").text()!='-'&&$("#category5").text()=='0'){//문서함 검색결과 없을 경우
				tempDiv=	"#"+searchType[4]+"ResultDiv";
				$(tempDiv).html('').hide();
				if($("input[name=v_searchCategory]").val()==searchType[4]){
					showNoResult();
					return false;
				}
				
			}
			if($("#category6").text()!='-'&&$("#category6").text()=='0'){//위키북 검색결과 없을 경우
				tempDiv=	"#"+searchType[5]+"ResultDiv";
				$(tempDiv).html('').hide();
				if($("input[name=v_searchCategory]").val()==searchType[5]){
					showNoResult();
					return false;
				}
				
			}
			if($("#category7").text()!='-'&&$("#category7").text()=='0'){//열린학습 검색결과 없을 경우
				tempDiv=	"#"+searchType[6]+"ResultDiv";
				$(tempDiv).html('').hide();
				if($("input[name=v_searchCategory]").val()==searchType[6]){
					showNoResult();
					return false;
				}
				
			}
			if($("#category8").text()!='-'&&$("#category8").text()=='0'){//Q&A 검색결과 없을 경우
				tempDiv=	"#"+searchType[7]+"ResultDiv";
				$(tempDiv).html('').hide();
				if($("input[name=v_searchCategory]").val()==searchType[7]){
					showNoResult();
					return false;
				}
				
			}
			if($("#category9").text()!='-'&&$("#category9").text()=='0'){//커뮤니티 게시물 검색결과 없을 경우
				tempDiv=	"#"+searchType[8]+"ResultDiv";
				$(tempDiv).html('').hide();
				if($("input[name=v_searchCategory]").val()==searchType[8]){
					showNoResult();
					return false;
				}
				
			}
			
			return true;
		}
	}
	//왼쪽 메뉴 마우스 오버아웃 효과
	function mouseOverOutEvent(){
		$("div .sort_A").find("ul").each(function (){
			$(this).find("a").each(function(){
				if($(this).attr("class")!="on"){
					$(this).mouseover(function(){
						$(this).attr("class","over");
						$(this).find("img").each(function(){
							var imgSrc=$(this).attr("src");
							$(this).attr("src",imgSrc.replace(".gif","_over.gif"));
						});
					}).mouseout(function (){
						$(this).attr("class","");
						$(this).find("img").each(function(){
							var imgSrc=$(this).attr("src");
							$(this).attr("src",imgSrc.replace("_over.gif",".gif"));
						});
					});
				}
			});
		});	
	}
	function autocompleteEvent(obj){
		//$("#query").search();
		//$("#query").focus();
		//$.Autocompleter.onChange(0, true);
	}
	//TimeLine 보이기 ,숨기기 
	function showTimeLine(){
		$("#timeLineDiv").show();
		$("#hideTimeLineText").show();
		$("#showTimeLineText").hide();
		//piSearchAjax('timeLine','flash');// 시계열 분석용 flash or chart
	}
	function hideTimeLine(){
		$("#timeLineDiv").hide();
		$("#hideTimeLineText").hide();
		$("#showTimeLineText").show();
	}
	//검색할 타입을 정의한다.	
	var searchType;
	function checkSearchType(){
		searchType=	["knowledgeMap","prod","notice","event","doc","wiki","cop","qna","board"];
	}
	
	var searchTypeSuccessCount=0;//검색할 타입의 success count 를 정의한다.
	
	function timeLineViewBlock(){
		$("#block_part").block({
			message:'분석중 <img src="/img/ajax-loader_2.gif"/>',
			overlayCSS:{
				opacity: 0.7,
				color: 'white',
				backgroundColor:'white',
				border:'1'
			},
			css: {  
				border: '1',
				padding: '15px',
				backgroundColor: 'white',
				'-webkit-border-radius': '10px', 
				'-moz-border-radius': '10px',   
				opacity: 1,
				color: 'black'
			}
			
		});
	}
	// 화면전체 레이어 블록 처리
	function windowViewBlock(){

				$.blockUI({ 
					message:'검색중 <img src="/img/029.gif"/>',
					overlayCSS:{
						opacity: 0.5,
						color: 'white',
						backgroundColor:'white',
						border:'1'
					},
					css: {  
						border: '1',
						padding: '15px',
						backgroundColor: 'white',
						'-webkit-border-radius': '10px', 
						'-moz-border-radius': '10px',   
						opacity: 1,
						color: 'black'
					}
				});
	};
	
	// 화면전체 레이어 블록 처리 숨김
	function windowViewBlockHide(){
		$.unblockUI();
		
		/**이벤트용 시작 
		var today=new Date();
		var todayStr=timeSt(today);
		var endDate="20130123";
		if((parseInt(endDate) - parseInt(todayStr) ) >= 0) 
			searchEvent();
		이벤트용 끝**/
	};
	function timeLineViewBlockHide(){
		// 화면 부분 블럭 해제
		$("#block_part").unblock();
		
	}
	
	function totalSearch(){
		
		// 화면전체 레이어 블록 처리
		if($("#v_query").val() != ""){
			// 결과내 재검색 체크
			if($("#v_reSearchFlag").is(":checked")){
				
				if($("#searchQuery").text()!=""){
					$("#v_reSearchQuery").val($("#searchQuery").text());
				}
				 $("input[name=v_pageNo]").val("1");// 페이징 무조건 1 
			}else{
				initparam();// 파라미터 정의 메소드
				
				//showSearchArea('date','custom','365');//기본검색조건 표시
				showSearchArea('date','all','all');//기본검색조건 표시
				showSearchArea('field','all','all');//기본검색조건 표시
				
				//class on 인것을 바꿔주고 자기것만 on 으로 
				$("#sort_B_date").find("a").each(function(){
					$(this).attr("class","");
				});
				//$("#365DateLink").attr("class","on");
				$("#allDateLink").attr("class","on");
				$('select[name=dateSelectBox]').val('0') ;
			}
			windowViewBlock();
		}else{
			alert('검색어를 입력해 주세요.');
			return;
		}
		$("#v_reSearchFlag").attr("checked",false);
		
		$("#v_query").blur();//자동완성창제거위해
		
		$.each(searchType, function(index,value){
		//	setTimeout(function(){
			//searchAjax(value);
			//alert('value')
			//},index*750);
		});
		
		piCategoryCountAjax();// 왼쪽 업무구분 카테고리 검색결과 Update
		
		$("#v_query").focus();//다시 포커싱한다.
		
		searchAjaxSequence(0);
		
	}
	
	function goCategorySearch(){
		var category = $("input[name=v_searchCategory]").val();
		if(category=='all'){
			totalSearch();
		}else{
			
			// 화면전체 레이어 블록 처리
			if($("#v_query").val() != ""){
				// 결과내 재검색 체크
				if($("#v_reSearchFlag").is(":checked")){
					
					if($("#searchQuery").text()!=""){
						$("#v_reSearchQuery").val($("#searchQuery").text());
					}
					 $("input[name=v_pageNo]").val("1");// 페이징 무조건 1 
				}else{
					initParamCategory();
				}
			}else{
				alert('검색어를 입력해 주세요.');
				return;
			}
			
			
			windowViewBlock();
			piCategoryCountAjax();// 왼쪽 업무구분 카테고리 검색결과 Update
			
			searchAjax(category);
			
		}
	}
	//검색결과 정렬
	function goSort(value){
		// 화면전체 레이어 블록 처리
		if($("#v_query").val() != ""){
			windowViewBlock();
		}else{
			alert('검색어를 입력해 주세요.');
			 showNoResult();
			return;
		}
		var category = $("input[name=v_searchCategory]").val();
		$("input[name=v_searchSort]").val(value);
		$("input[name=v_pageNo").val('1');
		searchAjax(category);
		
	}
	
	//검색결과 갯수 조정
	function changePageSize(){
		// 화면전체 레이어 블록 처리
		if($("#v_query").val() != ""){
			windowViewBlock();
		}else{
			alert('검색어를 입력해 주세요.');
			 showNoResult();
			return;
		}
		var category = $("input[name=v_searchCategory]").val();
		$("input[name=v_pageSize]").val($("#pageSizeSelector").val());
		$("input[name=v_pageNo]").val('1');
		searchAjax(category);
		
	}
	
	//검색결과 더보기
	function goMoreResults(category,subCategory){
		//현재 페이지의 검색결과를 지운다.
		// 화면전체 레이어 블록 처리
		if($("#v_query").val() != ""){
			windowViewBlock();
		}else{
			alert('검색어를 입력해 주세요.');
			 showNoResult();
			return;
		}
		showSearchArea('category',category,subCategory);//선택조건설정
		$("input[name=v_searchCategory]").val(category);
		$("input[name=v_searchSubCategory]").val(subCategory);
		$("input[name=v_pageNo]").val("1");
		$("input[name=v_pageSize]").val("10");
		searchAjax(category);
		leftMenuStatusChange(category,subCategory);
		
	}
	
	function showSearchArea(searchArea,str1,str2){
		//먼저 기존에 선택된 다른 영역이 있는지 확인한다.
		var areaFlag=false;//선택한 영역이 존재하는지 여부
		for(var i=1;i<=3;i++){
			$("div#s_SC").find('span.sc_'+i).each(function (){
				areaFlag=true;
				
			});
		
		}
		if(searchArea=='category'){
			showCategory(str1,str2,areaFlag);//	category,subCategory 
		}else if(searchArea=='date'){
			showDateRange(str1,str2,areaFlag);//all,7
		}else if(searchArea=='field'){
			showSearchField(str1,str2,areaFlag);//all, title,author....
		}
	}
	
	//왼쪽메뉴 카테고리영역 클릭시
	function goCategoryResults(category,subCategory){
		// 화면전체 레이어 블록 처리
		if($("#v_query").val() != ""){
			windowViewBlock();
		}else{
			alert('검색어를 입력해 주세요.');
			 showNoResult();
			return;
		}
		
		showSearchArea('category',category,subCategory);
			
		
		leftMenuStatusChange(category,subCategory);
		
		
		$("input[name=v_searchCategory]").val(category);
		$("input[name=v_searchSubCategory]").val(subCategory);
		$("input[name=v_pageNo]").val("1");
		if(category=='all'){
			
			$("input[name=v_pageSize]").val("3");
		}else{
			
			$("input[name=v_pageSize]").val("10");
		}
			
		
		//piSearchAjax('timeLine','flash');// 시계열 분석용 flash or chart
		if(category!='all'){//상세카테고리일경우
			searchAjax(category);
	
			
		}else{//전체일 경우 통합검색
			searchAjaxSequence(0);
			$.each(searchType, function(index,value){
				//setTimeout(function(){
				//searchAjax(value);
			//	},1000);
			});
		}
		
	}
	
	//왼쪽업무구분 선택시 이벤트 변경
	function leftMenuStatusChange(category,subCategory){
		var resultDiv="#"+category+"ResultDiv";
		//class on 인것을 "" 로 바꿔주고 이벤트 다시주기"
		$("div .sort_A").find("ul").each(function (){
		$(this).find("a").each(function(){
			if($(this).attr("class")=="on"){
				$(this).attr("class","");
				$(this).find("img").each(function(){
					var imgSrc=$(this).attr("src");
					$(this).attr("src",imgSrc.replace("_on.gif",".gif"));
				
				});
				$(this).mouseover(function(){
					$(this).attr("class","over");
					$(this).find("img").each(function(){
						var imgSrc=$(this).attr("src");
						$(this).attr("src",imgSrc.replace(".gif","_over.gif"));
					});
				}).mouseout(function (){
					$(this).attr("class","");
					$(this).find("img").each(function(){
						var imgSrc=$(this).attr("src");
						$(this).attr("src",imgSrc.replace("_over.gif",".gif"));
					});
				});
			}
		});
		});
		
		// 클릭한 자신의 class 및 이미지 변경
		var selfId="#"+subCategory+"Link";
		$(selfId).attr("class","on");
		$(selfId).find("img").each(function(){
			var imgSrc=$(this).attr("src");
			if(imgSrc.indexOf("_over.gif")>-1){
				imgSrc=imgSrc.replace("_over.gif","_on.gif");
			}else{
				imgSrc=imgSrc.replace(".gif","_on.gif");
			}
			if(category=='all'){
				imgSrc="/images/common/common/sort_01_on.gif";
			}
			$(this).attr("src",imgSrc);
			
		});
		// 자신의 이벤트 제거하기
		$(selfId).unbind('mouseover');
		$(selfId).unbind('mouseout');
		
		
		// 마지막으로 메인화면의 건수 변경
		changeTotalCountResult(subCategory);
	}
	
	function changeTotalCountResult(subCategory){ //콜센터용
		if(subCategory=='all'){
			$('#mainContentsCnt').text(tspTools.addCommas($("#category0").text()));
		}else if(subCategory=='knowledgeMap'){
			$('#mainContentsCnt').text(tspTools.addCommas($("#category1").text()));
		}else if(subCategory=='prod'){
			$('#mainContentsCnt').text(tspTools.addCommas($("#category2").text()));
		}else if(subCategory=='notice'){
			$('#mainContentsCnt').text(tspTools.addCommas($("#category3").text()));
		}else if(subCategory=='event'){
			$('#mainContentsCnt').text(tspTools.addCommas($("#category4").text()));
		}else if(subCategory=='doc'){
			$('#mainContentsCnt').text(tspTools.addCommas($("#category5").text()));
		}else if(subCategory=='wiki'){
			$('#mainContentsCnt').text(tspTools.addCommas($("#category6").text()));
		}else if(subCategory=='cop'){
			$('#mainContentsCnt').text(tspTools.addCommas($("#category7").text()));
		}else if(subCategory=='qna'){
			$('#mainContentsCnt').text(tspTools.addCommas($("#category8").text()));
		}else if(subCategory=='board'){
			$('#mainContentsCnt').text(tspTools.addCommas($("#category9").text()));
		}
		
	}
	// 페이징시 클릭이벤트
	function goPage(category,pageNum){
		// 화면전체 레이어 블록 처리
		if($("#v_query").val() != ""){
			windowViewBlock();
		}else{
			alert('검색어를 입력해 주세요.');
			 showNoResult();
			return;
		}
		$("input[name=v_searchCategory]").val(category);
		$("input[name=v_pageNo]").val(pageNum);
		searchAjax(category);
		
	}
	//선택한 영역(날짜) 선택 보여주기
	function showDateRange(_type,_range,flag){
		if(flag){//기존에 다른 선택영역이 있으면 추가
			
			$("div#s_SC").find('span.sc_2').each(function (){//추가하기전에 먼저 지우고
				$(this).remove();
			});
			
			//if(_type!='all'){//추가
			//$("#s_SC").show();
				var _text=getDateRangeText(_range);
				var _html='<span class="sc_2">'+_text+'<a href="javascript:releaseSearchArea(\'date\',\''+_type+'\',\''+_range+'\')"><img src="/images/common/btn/btn_del3.gif" alt="삭제" width="7" height="7" title="삭제" /></a></span>';
			        _html+=$("#SC_list").html()	;
			        $("#SC_list").html(_html);
			//}
		}else{//없으면 새로 셋팅
			//if(_range=='all'){
				$("#SC_list").html('');
				//$("#s_SC").hide();
			//}else{
				//$("#s_SC").show();
				var _text=getDateRangeText(_range);
				var _html='<span class="sc_2">'+_text+'<a href="javascript:releaseSearchArea(\'date\',\''+_type+'\',\''+_range+'\')"><img src="/images/common/btn/btn_del3.gif" alt="삭제" width="7" height="7" title="삭제" /></a></span>';
					$("#SC_list").html(_html);
			//}
		}
		
	}
	
	//선택한 영역(필드) 선택 보여주기
	function showSearchField(_type,_field,flag){
		
		if(flag){//기존에 다른 선택영역이 있으면 추가
			
			$("div#s_SC").find('span.sc_3').each(function (){//추가하기전에 먼저 지우고
				$(this).remove();
			});
			if(_type!='all'){//추가
				var _text=getFieldText(_field);
				var _html='<span class="sc_3">'+_text+'<a href="javascript:releaseSearchArea(\'field\',\''+_type+'\',\''+_field+'\')"><img src="/images/common/btn/btn_del3.gif" alt="삭제" width="7" height="7" title="삭제" /></a></span>';
			        _html+=$("#SC_list").html()	;
			        $("#SC_list").html(_html);
			}
		}else{//없으면 새로 셋팅
			if(_type=='all'){
				$("#SC_list").html('');
				//$("#s_SC").hide();
			}else{
				//$("#s_SC").show();
				var _text=getFieldText(_field);
				var _html='<span class="sc_3">'+_text+'<a href="javascript:releaseSearchArea(\'field\',\''+_type+'\',\''+_field+'\')"><img src="/images/common/btn/btn_del3.gif" alt="삭제" width="7" height="7" title="삭제" /></a></span>';
					$("#SC_list").html(_html);
			}
		}
		// 자기 class 
	}
	
	//선택한 영역 선택 보여주기
	function showCategory(category,subCategory,flag){
		
		if(flag){//기존에 다른 선택영역이 있으면 추가
			
			$("div#s_SC").find('span.sc_1').each(function (){//추가하기전에 먼저 지우고
				$(this).remove();
			});
			if(category!='all'){//추가
				var _text=getCategoryText(subCategory);
				var _html='<span class="sc_1">'+_text+'<a href="javascript:releaseSearchArea(\'gubun\',\''+category+'\',\''+subCategory+'\')"><img src="/images/common/btn/btn_del3.gif" alt="삭제" width="7" height="7" title="삭제" /></a></span>';
			        _html+=$("#SC_list").html()	;
			        $("#SC_list").html(_html);
			}
		}else{//없으면 새로 셋팅
			if(category=='all'){
				$("#SC_list").html('');
				//$("#s_SC").hide();
			}else{
				//$("#s_SC").show();
				var _text=getCategoryText(subCategory);
				var _html='<span class="sc_1">'+_text+'<a href="javascript:releaseSearchArea(\'gubun\',\''+category+'\',\''+subCategory+'\')"><img src="/images/common/btn/btn_del3.gif" alt="삭제" width="7" height="7" title="삭제" /></a></span>';
					$("#SC_list").html(_html);
			}
		}
		
	}
	
	//subCategory 값으로 선택한 category text 값 가지고 오기
	function getCategoryText(subCategory){
		var _text='';
		if(subCategory=='knowledgeMap') _text='지식맵';
		else if(subCategory=='prod') _text='상품관';
		else if(subCategory=='notice') _text='공지사항';
		else if(subCategory=='event') _text='이벤트';
		else if(subCategory=='doc') _text='문서함';
		else if(subCategory=='wiki') _text='위키북';
		else if(subCategory=='cop') _text='열린학습';
		else if(subCategory=='qna') _text='Q&A';
		else if(subCategory=='board') _text='커뮤니티게시물';
		return _text;
	}
	//date 값으로 선택한 date text 값 가지고 오기
	function getDateRangeText(_range){
		var _text='';
		if(_range=='7') _text='최근1주';
		else if(_range=='180') _text='최근6개월';
		else if(_range=='365') _text='최근1년';
		else if(_range=='all') _text='전체';
		else _text="사용자지정"
		return _text;
	}
	//field 값으로 선택한 field text 값 가지고 오기
	function getFieldText(_field){
		var _text='';
		if(_field=='title') _text='제목';
		else if(_field=='content') _text='내용';
		else if(_field=='author') _text='작성자';
		else _text="사용자지정"
		return _text;
	}
	//선택조건 x 선택시
	function releaseSearchArea(_type,category,subCategory){
		//현재검색한 페이지 내용 지운다
		
		//선택한 영역이 몇개 있는지 확인후 0보다 크면 선택영역조건남긴다.
		var areaCnt=0;
		for(var i=1;i<=3;i++){
			$("div#s_SC").find('span.sc_'+i).each(function (){
				areaCnt++;
				
				if(_type=='gubun'&&i==1){//업무구분 선택 해제시
					$(this).remove();
					areaCnt--;
					//initparam();
					goCategoryResults('all','all');
				}else if(_type=='date'&&i==2){//기간구분 선택 해제시
					$(this).remove();
					areaCnt--;
					if(category=='custom'&&subCategory=='365'){
						goDateRangeResults('all','all');// Default 전체
						
					}else{
						
						//gocsDateRangeResults('custom','365');//default 1년전
						goDateRangeResults('all','all');// Default 전체
					}
				}else if(_type=='field'&&i==3){//기간구분 선택 해제시
					$(this).remove();
					areaCnt--;
					goSearchFieldResults('all','all');
				}
				
				
			});
		}
		if(areaCnt==0){
			//$("#s_SC").hide();
		}
		
	}
	
	//왼쪽메뉴 날짜선택시 이벤트1
	function goDateRangeResults(mode,range){
		
		
		if(range!='direct'){
			$('select[name=dateSelectBox]').val('0') ;//기본select 값 변경
		}
		// 화면전체 레이어 블록 처리
		if($("#v_query").val() != ""){
			windowViewBlock();
		}else{
			 showNoResult();
			return;
		}
			showSearchArea('date',mode,range);
			
		
			//class on 인것을 바꿔주고 자기것만 on 으로 
			$("#sort_B_date").find("a").each(function(){
				$(this).attr("class","");
			});
			$("#"+range+"DateLink").attr("class","on")
			
			if(mode=='all'){
				setDefaultDateString();
				calendarUI.delCalendar();
			}else if (mode=='custom'){
				setDateString(mode,range);
				calendarUI.delCalendar();
			}else if (mode=="calendar"){
				setDateStringFromCalendar(mode);
			}else if (mode =='direct'){
			}
			$("input[name=v_pageNo]").val("1");
			piCategoryCountAjax();
			//piSearchAjax('timeLine','flash');// 시계열 분석용 flash or chart
			
			if($("input[name=v_searchCategory]").val()!='all'){//상세카테고리일경우
			
				searchAjax($("input[name=v_searchCategory]").val());
			
				
			}else{//전체일 경우 통합검색
				searchAjaxSequence(0);
				$.each(searchType, function(index,value){
				//	setTimeout(function(){
					//searchAjax(value);
				//	},1000);
				});
			}
	}
	function goSearchFieldResults(mode,fieldNm){
		// 화면전체 레이어 블록 처리
		if($("#v_query").val() != ""){
			windowViewBlock();
		}else{
			alert('검색어를 입력해 주세요.');
			 showNoResult();
			return;
		}		showSearchArea('field',mode,fieldNm);
		//현재 페이지의 검색결과를 지운다.
		
		//class on 인것을 바꿔주고 자기것만 on 으로 
		$("#sort_B_field").find("a").each(function(){
			$(this).attr("class","");
		});
		$("#"+mode+"FieldLink").attr("class","on");
		
	
		setFieldArea(fieldNm);
		
		$("input[name=v_pageNo]").val("1");
		//piSearchAjax('timeLine','flash');// 시계열 분석용 flash or chart
		piCategoryCountAjax();
		if($("input[name=v_searchCategory]").val()!='all'){//상세카테고리일경우
			
				searchAjax($("input[name=v_searchCategory]").val());
			
		}else{//전체일 경우 통합검색
			searchAjaxSequence(0);
			$.each(searchType, function(index,value){
			//	setTimeout(function(){
			//	searchAjax(value);
			//	},1000);
			});
		}
	}

	//왼쪽 검색결과값을 업무별로 나누고 해당 값들을 Update 해준다.
	function leftMenuCountUpdateAfter(_type){
		var subCategory =$("input[name=v_searchSubCategory]").val();
		if(_type=='newTurn'){
				$("#kmsTotalCnt").text ( $("#"+_type+"_outcome_list").attr('kmsTotalCnt'));// newTurn 전체개수 update
				$("#kmsMapCnt").text ( $("#"+_type+"_outcome_list").attr('kmsMapCnt'));// kmsMapCnt 개수 update
				$("#kmsFaqCnt").text ( $("#"+_type+"_outcome_list").attr('kmsFaqCnt'));// kmsFaqCnt 개수 update
				$("#kmsQnaCnt").text ( $("#"+_type+"_outcome_list").attr('kmsQnaCnt'));// kmsQnaCnt 개수 update
				$("#kmsWikiCnt").text ( $("#"+_type+"_outcome_list").attr('kmsWikiCnt'));// kmsWikiCnt 개수 update
			
		}else if(_type=='newTurnCoP'){
			$("#copTotalCnt").text ( $("#"+_type+"_outcome_list").attr('copTotalCnt'));// newTurn 전체개수 update
		}else if(_type=='hanaPortal'){
			$("#portalTotalCnt").text ( $("#"+_type+"_outcome_list").attr('portalTotalCnt'));// 하나포탈 전체개수 update
			$("#portalApprovalCnt").text ( $("#"+_type+"_outcome_list").attr('portalApprovalCnt'));// 전자결재 개수 update
			$("#portalBoardCnt").text ( $("#"+_type+"_outcome_list").attr('portalBoardCnt'));// 게시판 개수 update
		
		}
	}
	//검색하기전 기본값으로 돌려준다.
	function leftMenuCountUpdateBefore(_type){
		var subCategory =$("input[name=v_searchSubCategory]").val();
		if(_type=='newTurn'){
				
				$("#kmsTotalCnt").text ( '검색중..');// newTurn 전체개수 update
				$("#kmsMapCnt").text ( '검색중..');// kmsMapCnt 개수 update
				$("#kmsFaqCnt").text ( '검색중..');// kmsFaqCnt 개수 update
				$("#kmsQnaCnt").text ('검색중..');// kmsQnaCnt 개수 update
				$("#kmsWikiCnt").text ( '검색중..');// kmsWikiCnt 개수 update
		
		}else if(_type=='newTurnCoP'){
			$("#copTotalCnt").text ( '검색중..');// newTurn 전체개수 update
		}else if(_type=='hanaPortal'){
			$("#portalTotalCnt").text('검색중..');//하나포탈 전체개수 update
			$("#portalApprovalCnt").text('검색중..');//하나포탈 전체개수 update
			$("#portalBoardCnt").text('검색중..');//하나포탈 전체개수 update
		}
	}
	function addEffect(_type){
		if(_type=='newTurn'){
			//newTurn 검색시 mousein out function 설정
			$("div .txt_btn a").each(function(){
				if(	$(this).attr("class") =='mapInfo'){
					$(this).mouseover(function (){
					var liTag=	jQuery(this).parents("li");
					$(liTag).find(".tooltip").show();
					}).mouseout(function(){
						var liTag=	jQuery(this).parents("li");
						$(liTag).find(".tooltip").hide();	
					});
				}
				}) ;
		}//end if(_type=='newTurn')
	}
	function showNoResult(){
		$("#NoResultDiv").show();
		//hideTimeLine();
	}
	function hideNoResult(){
		$("#NoResultDiv").hide();
		//hideTimeLine()
		
	}
	
	function piCategoryCountAjax(){
		
		$("#category0").text('-');
		$("#category1").text('-');
		$("#category2").text('-');
		$("#category3").text('-');
		$("#category4").text('-');
		$("#category5").text('-');
		$("#category6").text('-');
		$("#category7").text('-');
		$("#category8").text('-');
		$("#category9").text('-');
		
		if($("#v_reSearchQuery").val()!=""){
			
			$("#searchQuery").text($("input[name=v_query]").val()+" + "+$("#v_reSearchQuery").val());
		}else{
			
			$("#searchQuery").text($("input[name=v_query]").val());
		}
		
		$("#noResultQuery").text($("input[name=v_query]").val());
		var subCategory = $("input[name=v_searchSubCategory]").val();
		hideNoResult();
		jQuery.post(
				"/piSearch.do?cmd=categorycsCountSearch",(
						$("#searchGNB").serialize()
						),
						function (data,textStatus){
						if(textStatus == "success"){
							if(data.category0!=undefined){//전체검색결과가 있을경우
								
								$("#category0").text(tspTools.addCommas(data.category0));
									// 전체 검색결과를 셋팅한다.
									//지식맵 검색결과 시작
									if(data.category1!=undefined){
										$("#category1").text(tspTools.addCommas(data.category1));
									}else{
										$("#category1").text('0');										
									}
									//지식맵 검색결과 끝
																	
									//상품관 검색결과 시작
									if(data.category2!=undefined){
										$("#category2").text(tspTools.addCommas(data.category2));
									}else{
										$("#category2").text('0');
									}
									//상품관 검색결과 끝
									
									//공지사항 검색결과 시작
									if(data.category3!=undefined){
										$("#category3").text(tspTools.addCommas(data.category3));
									}else{
										$("#category3").text('0');
									}
									//공지사항 검색결과 끝
									
									//이벤트 검색결과 시작
									if(data.category4!=undefined){
										$("#category4").text(tspTools.addCommas(data.category4));
									}else{
										$("#category4").text('0');
									}
									//이벤트 검색결과 끝
									
									//문서함 검색결과 시작
									if(data.category5!=undefined){
										$("#category5").text(tspTools.addCommas(data.category5));
									}else{
										$("#category5").text('0');
									}
									//문서함 검색결과 끝
									
									//위키북 검색결과 시작
									if(data.category6!=undefined){
										$("#category6").text(tspTools.addCommas(data.category6));
									}else{
										$("#category6").text('0');
									}
									//위키북 검색결과 끝
									
									//열린학습 검색결과 시작
									if(data.category7!=undefined){
										$("#category7").text(tspTools.addCommas(data.category7));
									}else{
										$("#category7").text('0');
									}
									//열린학습 검색결과 끝
									
									//Q&A 검색결과 시작
									if(data.category8!=undefined){
										$("#category8").text(tspTools.addCommas(data.category8));
									}else{
										$("#category8").text('0');
									}
									//Q&A 검색결과 끝
									
									//커뮤니티 게시물 검색결과 시작
									if(data.category9!=undefined){
										$("#category9").text(tspTools.addCommas(data.category9));
									}else{
										$("#category9").text('0');
									}
									//커뮤니티 게시물 검색결과 끝
									
							}else{// 검색결과가 없을 경우
								$("#category0").text('0');
								$("#category1").text('0');
								$("#category2").text('0');
								$("#category3").text('0');
								$("#category4").text('0');
								$("#category5").text('0');
								$("#category6").text('0');
								$("#category7").text('0');
								$("#category8").text('0');
								$("#category9").text('0');
							}
							
							// 전체 타이틀에 목록 건수 보여주기
							changeTotalCountResult(subCategory);
							
								// 검색로그 남기기
								var _category="";
								var _subcategory="";
								var _keyword="";
								var	_search_hit="";
								var _currPageNo="";
								_subcategory=getSubCategoryCodeByMethod($("#v_searchSubCategory").val()) ;
								_category=_subcategory.substring(0, 1);
								_keyword=tspTools.specialPatternChk($("#v_query").val());
								_search_hit=$("#category0").text().replace(eval(/,/gi), "");
								_currPageNo=$("#v_pageNo").val();
								if(_keyword.length>0){//키워드가 있을경우에 로그데이터를 남긴다.
									logData.searchLogDataInsert(_category,_subcategory,_keyword,_search_hit,_currPageNo);
								}
								
						
					}
				},"json"
		);
	}
	
	//검색메소드별로 subCategory 코드값 알아내기(콜센터용)
	// 서브카테고리 
	var searchMethodType=["all","knowledgeMap","prod","notice","event","doc","wiki","cop","qna","board"];
	var searchMethodCode=["0","1","2","3","4","5","6","7","8","9"];
	function getSubCategoryCodeByMethod(_type){
		var returnval="";
		$.each(searchMethodType, function(index,value){
			if(_type==value){
				returnval= searchMethodCode[index];
			}
			
		});
		return returnval;
	}
	function timeLineSetData(_chartType,data){
		$("#timeLineDivTemp").hide();
		$("#timeLineDiv").show();
		if(_chartType=="flash"){
			setTimeout(function(){
			var flashObjectId="Timeline_Chart";
			var startDate="";
			var endDate="";
			thisMovie(flashObjectId).setData(data);
			
			if($("input[name=v_searchRange]").val()!="all"){
				if($("input[name=v_searchStartDate]").val()!=""&&$("input[name=v_searchEndDate]").val()!=""){//시작 끝 날짜 모두존재할 경우
					
					startDate=($("input[name=v_searchStartDate]").val()).substr(0,6);
					endDate=($("input[name=v_searchEndDate]").val()).substr(0,6);
					if(parseInt(endDate) > parseInt( getDefaultPIEndMonthString())){
						endDate=getDefaultPIEndMonthString();
					}
					if(parseInt(startDate) < parseInt( getPIStartLimitMonthString() )){
						startDate=getPIStartLimitMonthString();
					}
					if(parseInt(endDate) >= parseInt( getPIStartLimitMonthString() ) && parseInt(endDate) <= parseInt( getDefaultPIEndMonthString() ) 
					&&parseInt(startDate) >= parseInt( getPIStartLimitMonthString() ) && parseInt(endDate) <= parseInt( getDefaultPIEndMonthString())		
					){
						//thisMovie(flashObjectId).setRange(startDate,endDate);	//날짜별로 변경해줘야 한다.
						thisMovie(flashObjectId).setRange(endDate,startDate);	//날짜별로 변경해줘야 한다.-->>순서변경으로 인해 시작날짜와 끝날짜를 바꿔준다
					}
					
					
				}else if($("input[name=v_searchStartDate]").val()!=""&&$("input[name=v_searchEndDate]").val()==""){//시작날짜만 있을경우
					startDate=($("input[name=v_searchStartDate]").val()).substr(0,6);
					endDate=getDefaultPIEndMonthString();
					if(parseInt(startDate) >= parseInt( getPIStartLimitMonthString() ) ) { 
						//thisMovie(flashObjectId).setRange(startDate,endDate);	//날짜별로 변경해줘야 한다.
						thisMovie(flashObjectId).setRange(endDate,startDate);	//날짜별로 변경해줘야 한다.-->>순서변경으로 인해 시작날짜와 끝날짜를 바꿔준다
					}
					
				}else if($("input[name=v_searchStartDate]").val()==""&&$("input[name=v_searchEndDate]").val()!=""){// 끝날짜만 있을경우
					startDate=getDefaultPIStartMonthString();
					endDate=($("input[name=v_searchEndDate]").val()).substr(0,6);
					if(parseInt(endDate) >= parseInt( getPIStartLimitMonthString() ) ){
						//start date 가 기본 Pi 검색 영역이전이면
						//thisMovie(flashObjectId).setRange(startDate,endDate);	//날짜별로 변경해줘야 한다.
						thisMovie(flashObjectId).setRange(endDate,startDate);	//날짜별로 변경해줘야 한다.-->>순서변경으로 인해 시작날짜와 끝날짜를 바꿔준다
					}
				}else{
					//startDate=getDefaultPIStartMonthString();
					//endDate=getDefaultPIEndMonthString();
				//	thisMovie(flashObjectId).setRange(endDate,startDate);
//					thisMovie(flashObjectId).setRange( getDefaultPIEndMonthString(),getDefaultPIStartMonthString());	//날짜별로 변경해줘야 한다.-->>순서변경으로 인해 시작날짜와 끝날짜를 바꿔준다
				}
			}else {
				//startDate=getDefaultPIStartMonthString();
			//	endDate=getDefaultPIEndMonthString();
			//	thisMovie(flashObjectId).setRange(endDate,startDate);
				//thisMovie(flashObjectId).setRange(getDefaultPIStartMonthString(), getDefaultPIEndMonthString());	//날짜별로 변경해줘야 한다.
				//thisMovie(flashObjectId).setRange( getDefaultPIEndMonthString(),getDefaultPIStartMonthString());	//날짜별로 변경해줘야 한다.-->>순서변경으로 인해 시작날짜와 끝날짜를 바꿔준다
				
			}
			}, 1000);
		}else{
			var xData=data.xData;
			var yData=data.yData;
			var xArray=new Array();
			var xParser=xData.split(",");
			var yArray=new Array();
			var yParser=yData.split(",");
			for(var i=0; i<xParser.length;i++){
				xArray.push(xParser[i]);
			}
			for(var i=0; i<yParser.length;i++){
				yArray.push( eval(yParser[i]));
			}
			
			timeLineChart(xArray,yArray);//highCharts 사용할 경우 이용
		}
	}
	//PI 검색 메소드
	function piSearchAjax(_type,_chartType){
		$("input[name=v_chartType]").val(_chartType);
		//$("#timeLineDivTemp").show();
		//$("#timeLineDiv").hide();
		timeLineViewBlock();
		jQuery.post(
				"/piSearch.do?cmd="+_type+"Search",(
						$("#searchGNB").serialize()
						)
						
						,
				
				function(data, textStatus){
					if(textStatus == "success"){
						$("#timeLineDivTemp").hide();
						$("#timeLineDiv").show();
					// 성공후에 해야할 것들
						if(_chartType=="flash"){
							setTimeout(function(){
							var flashObjectId="Timeline_Chart";
							var startDate="";
							var endDate="";
							thisMovie(flashObjectId).setData(data);
							
							if($("input[name=v_searchRange]").val()!="all"){
								if($("input[name=v_searchStartDate]").val()!=""&&$("input[name=v_searchEndDate]").val()!=""){//시작 끝 날짜 모두존재할 경우
									
									startDate=($("input[name=v_searchStartDate]").val()).substr(0,6);
									endDate=($("input[name=v_searchEndDate]").val()).substr(0,6);
									if(parseInt(endDate) > parseInt( getDefaultPIEndMonthString())){
										endDate=getDefaultPIEndMonthString();
									}
									if(parseInt(startDate) < parseInt( getPIStartLimitMonthString() )){
										startDate=getPIStartLimitMonthString();
									}
									if(parseInt(endDate) >= parseInt( getPIStartLimitMonthString() ) && parseInt(endDate) <= parseInt( getDefaultPIEndMonthString() ) 
									&&parseInt(startDate) >= parseInt( getPIStartLimitMonthString() ) && parseInt(endDate) <= parseInt( getDefaultPIEndMonthString())		
									){
										//thisMovie(flashObjectId).setRange(startDate,endDate);	//날짜별로 변경해줘야 한다.
										thisMovie(flashObjectId).setRange(endDate,startDate);	//날짜별로 변경해줘야 한다.-->>순서변경으로 인해 시작날짜와 끝날짜를 바꿔준다
									}
									
									
								}else if($("input[name=v_searchStartDate]").val()!=""&&$("input[name=v_searchEndDate]").val()==""){//시작날짜만 있을경우
									startDate=($("input[name=v_searchStartDate]").val()).substr(0,6);
									endDate=getDefaultPIEndMonthString();
									if(parseInt(startDate) >= parseInt( getPIStartLimitMonthString() ) ) { 
										//thisMovie(flashObjectId).setRange(startDate,endDate);	//날짜별로 변경해줘야 한다.
										thisMovie(flashObjectId).setRange(endDate,startDate);	//날짜별로 변경해줘야 한다.-->>순서변경으로 인해 시작날짜와 끝날짜를 바꿔준다
									}
									
								}else if($("input[name=v_searchStartDate]").val()==""&&$("input[name=v_searchEndDate]").val()!=""){// 끝날짜만 있을경우
									startDate=getDefaultPIStartMonthString();
									endDate=($("input[name=v_searchEndDate]").val()).substr(0,6);
									if(parseInt(endDate) >= parseInt( getPIStartLimitMonthString() ) ){
										//start date 가 기본 Pi 검색 영역이전이면
										//thisMovie(flashObjectId).setRange(startDate,endDate);	//날짜별로 변경해줘야 한다.
										thisMovie(flashObjectId).setRange(endDate,startDate);	//날짜별로 변경해줘야 한다.-->>순서변경으로 인해 시작날짜와 끝날짜를 바꿔준다
									}
								}else{
									
//									thisMovie(flashObjectId).setRange( getDefaultPIEndMonthString(),getDefaultPIStartMonthString());	//날짜별로 변경해줘야 한다.-->>순서변경으로 인해 시작날짜와 끝날짜를 바꿔준다
								}
							}else {
								
								//thisMovie(flashObjectId).setRange(getDefaultPIStartMonthString(), getDefaultPIEndMonthString());	//날짜별로 변경해줘야 한다.
								//thisMovie(flashObjectId).setRange( getDefaultPIEndMonthString(),getDefaultPIStartMonthString());	//날짜별로 변경해줘야 한다.-->>순서변경으로 인해 시작날짜와 끝날짜를 바꿔준다
								
							}
							}, 1000);
						}else{
							var xData=data.xData;
							var yData=data.yData;
							var xArray=new Array();
							var xParser=xData.split(",");
							var yArray=new Array();
							var yParser=yData.split(",");
							for(var i=0; i<xParser.length;i++){
								xArray.push(xParser[i]);
							}
							for(var i=0; i<yParser.length;i++){
								yArray.push( eval(yParser[i]));
							}
							
							timeLineChart(xArray,yArray);//highCharts 사용할 경우 이용
						}
						
						timeLineViewBlockHide();
					}
				},_chartType=="flash"?"text":"json"
				
			);
	}
	
	//클러스터링 검색 메소드
	var clusterMethod="clusterTag";// 'cluster' : 버블형 or 'clusterTag' : 태그 클라우드  
	function clusterSearchAjax(_type){
		$("#flex2").html('분석중 <img src="/img/ajax-loader_2.gif"/>');
		var clusterDiv="#"+_type;
		jQuery.post(
				"/clusterSearch.do?cmd="+_type+"Search",(
							$("#searchGNB").serialize()
						)
						,
						function(data, textStatus){
							if(textStatus == "success"){
								if($("#cluster_flex").css("display")=='block'){
									if(_type=='cluster'){
										//$("#FlashVarsTag").attr('value',data);
										//$('#FlashVars').attr('value',data);
										//setTimeout(function() {                
											thisMovie("Radial_Chart").setData(data);
										//}, 1000 ); 
										//alert($("#FlashVarsTag").attr('value'));
									}else if(_type=='clusterMake'){
										$('#cluster').html(data);
									}else{
										$(clusterDiv).html(data);
									}
								}else{
									if(_type=='cluster'){
										//thisMovie("Radial_Chart").setData("xmlData="+data);
									}else{
										$(clusterDiv).html(data);
										
									}
								}
								
								//thisMovie("Radial_Chart_Right").setData(data);
							}else{
								
							}
					} 
			,"html");
	}
	
	//클러스터링 콜백함수
	function radial_OnChange( keyword ) {
		$("#v_query").val(keyword);
		goCategorySearch();
//		document.getElementById("radial_OnChange_callback").value = keyword;
	}

	function showCluster(){
		if( $("#cluster_flex").css("display") == "none" ){
			         
			// get effect type from            
			var selectedEffect = "slide";             
			// most effect types need no options passed by default            
			var options = {direction:"right"};            // some effects have required parameters            
			          
			$( "#cluster_flex" ).effect( selectedEffect, options); 
			// run the effect            
			//$("#cluster_flex").show();
			// cluster , clusterTag
			//clusterSearchAjax('clusterTag');// 클러스터 검색결과 < 태그클라우드용>
			if(clusterMethod=='cluster'){
				
				clusterSearchAjax('clusterMake');// 클러스터 Object 만들어 주기 검색결과 < 버블형>
			}else{
				
				clusterSearchAjax('clusterTag');// 클러스터 검색결과 < 태그클라우드용>
			}
		}else{
			$("#cluster_flex").hide();
		}
	}
	
	function callback() {            
		setTimeout(function() {                
			$( "#cluster_flex" ).removeAttr( "style" ).hide().show();            
		}, 1000 );        
	}         
	function thisMovie(movieName) {
			return $("#"+movieName)[0];
	}
	function timeline_OnChange( startMonth, endMonth ) {
	// 콜백함수 구현해야함.
		var v_start='';
		var v_end='';
		if($("input[name=v_searchStartDate]").val()!=''){
			v_end = $("input[name=v_searchStartDate]").val().substr(0,6);
		}
		
		if($("input[name=v_searchEndDate]").val()!=''){
			v_start = $("input[name=v_searchEndDate]").val().substr(0,6);
		}	
		if(startMonth==v_start&&endMonth==v_end){
			
		}else{
			$("input[name=v_searchEndDate]").val(startMonth+'31');
			$("input[name=v_searchStartDate]").val(endMonth+'01');
			$("input[name=v_searchRange]").val('custom');
			goDateRangeResults('direct','');
		}
		
	}

	function timeLineChart(xData,yData){
		var chart;
		 var colors = Highcharts.getOptions().colors;
		  chart = new Highcharts.Chart({
	            chart: {
	                renderTo: 'timeLineDiv',
	                type: 'column',
	                margin: [ 0, 10, 0, 0]
	            },
	            title: {
	                text: null
	            },
	            subtitle: {
	                text: null
	            },
	            xAxis: {
	                categories:xData
	               
	            },
	            yAxis: {
	                min: 0,
	                title: {
	                    text: null
	                }
	            },
	            legend: {
	                layout: 'vertical',
	                backgroundColor: '#FFFFFF',
	                align: 'left',
	                verticalAlign: 'top',
	                x: 100,
	                y: 70,
	                floating: true,
	                shadow: true
	            },
	            tooltip: {
	                formatter: function() {
	                    return ''+
	                        this.x +': '+ this.y +' 건';
	                }
	            },
	            plotOptions: {
	                column: {
	                    pointPadding: 0.0,
	                    borderWidth: 0
	                }
	            },
	                series: [{
	                name: 'Tokyo',
	                data: yData,
	                color: colors[1]
					}]
	        });
		 
		 
	}
	//유사문서 클릭시 
	function suggestOnDocument(docRef,gubun,obj){
		var resultDiv="#"+docRef;
		jQuery.post(
				"/suggestOnDocument.do?cmd=getSuggestOnDocument",

				{
					docRef:docRef,
					gubun:gubun
				},
				function(data, textStatus){
					
					if(textStatus == "success"){
						// 성공후에 해야할 것들
						$(resultDiv).show();
						$(resultDiv).html(data);//검색결과 뿌려주기

						
					}
				}
				
			);
		
	}
	//유사문서 닫기 버튼 클릭시
	function closeSuggestOnDocument(){
		$('div .pop_wrap').each(function (){
			$(this).hide();
		});
	}
	//selectbox 날짜 선택시 이벤트
	function setCustomYear(_year){
		$("input[name=v_searchRange]").val("custom");
		if(parseInt(_year)>0){
			$("input[name=v_searchEndDate]").val(_year+'1231');	
			$("input[name=v_searchStartDate]").val(_year+'0101');
		}
	}
	function getDefaultPIStartMonthString(){//시작날짜가 없을 경우
		var today=new Date();
		dt =new Date(Date.parse(today)-365*1000*60*60*24);
		var yyyy=dt.getFullYear();
		
		return yyyy+'01';
		
	}
	function getDefaultPIEndMonthString(){//끝날짜가 없을 경우
		var today=new Date();
		var yyyy=today.getFullYear();
		var mm=today.getMonth()+1;
		
		return yyyy+''+addZero(mm);
		
	}
	function getPIStartLimitMonthString(){
		//60개월 전 yyyymmdd
		var today=new Date();
		var tempC=29;
		if(today.getFullYear()%4!=0){
			tempC=30
		}
			
		var dt=new Date(Date.parse(today)-(365*5-tempC)*1000*60*60*24);
		var yyyy=dt.getFullYear();
		var mm=dt.getMonth()+1;
		return yyyy+''+addZero(mm);
	}
	
	// 
	function setDefaultDateString(){
//		$("input[name=v_searchRange]").val("custom");
//		var today=new Date();
//		$("input[name=v_searchEndDate]").val(timeSt(today));
//		dt =new Date(Date.parse(today)-365*1000*60*60*24);
//		var yyyy=dt.getFullYear();
//		
//		$("input[name=v_searchStartDate]").val(yyyy+'0101');
		$("input[name=v_searchRange]").val('all');
		$("input[name=v_searchEndDate]").val('');
		$("input[name=v_searchStartDate]").val('');
		$("#directEndDate").val('');
		$("#directStartDate").val('');
	}
	// 조건별 날짜 yyyymmdd 형식으로 셋팅
	function setDateString(gubun,range){
		$("input[name=v_searchRange]").val(gubun);
		var loadDt=new Date();
		$("input[name=v_searchEndDate]").val(timeSt(loadDt));
		$("#directEndDate").val($("input[name=v_searchEndDate]").val());
		
		// 이전해 1월 1일 부터 셋팅
		if(range=='365'){
			var oneYearBefore=loadDt.getFullYear() -1;
			$("input[name=v_searchStartDate]").val(oneYearBefore+"0101");
			$("#directStartDate").val(oneYearBefore+"0101");
		}else{
			
			var dt;
			dt =new Date(Date.parse(loadDt)-eval(range)*1000*60*60*24);
			$("input[name=v_searchStartDate]").val(timeSt(dt));
			$("#directStartDate").val(timeSt(dt));
			
		}
		
		
	}
	// 달력으로 부터 날짜얻기 yyyymmdd 형식으로 셋팅
	function setDateStringFromCalendar(gubun){
		$("input[name=v_searchRange]").val(gubun);
		$("input[name=v_searchEndDate]").val($("#directEndDate").val());
		$("input[name=v_searchStartDate]").val($("#directStartDate").val());
	}
	function timeSt(dt){
		var d= new Date(dt);
		var yyyy=d.getFullYear();
		var mm=d.getMonth()+1;
		var dd=d.getDate();
		return yyyy+''+addZero(mm)+''+addZero(dd);
	}
	function addZero(n){
		return n<10?"0"+n:n;
	}
	// 직접입력 버튼 클릭시
	function showCalenderDiv(){
		//class on 인것을 바꿔주고 자기것만 on 으로 
		$("#sort_B_date").find("a").each(function(){
			$(this).attr("class","");
		});
		$("#directDateLink").attr("class","on");
		
		$("#select_date").show();
	}
	// 달력 닫기 버튼 클릭시
	function hideCalenderDiv(){
//		$("#directStartDate").val("");
//		$("#directEndDate").val("");
//		$("input[name=v_searchEndDate]").val($("#directEndDate").val());
//		$("input[name=v_searchStartDate]").val($("#directStartDate").val());
		//class on 인것을 바꿔주고 자기것만 on 으로 
	
		$("#select_date").hide();
	}
	//필드검색 영역 셋팅
	function setFieldArea(_fieldNm){
		var fieldName="all";
		if(_fieldNm=="title"){
			fieldName="DRETITLE";
		}else if(_fieldNm=="content"){
			fieldName="DRECONTENT";
			
		}else if(_fieldNm=="author"){
			fieldName="AUTHOR";
		}
		//$("input[name=v_searchField]").val(fieldName);
		$("input[name=v_searchField]").val(_fieldNm);
	}
	
	function searchTipLayer(){//검색 팁 버튼 눌렀을때 event
		if($("#searchTipLayer").css('display')=="none"){
			$("#searchTipLayer").fadeIn();
		}else{
			$("#searchTipLayer").fadeOut();
		}
	}
	function showSearchTip(){//검색팁눌렀을 때 event
		if($("#showSearchTip").attr("class")!="on"){
			$("#showSearchTip").attr("class","on");//팁은 class on 한다.
			$("#showSearchManual").attr("class","");//메뉴얼은 class '' 한다.
			
			$("#searchManualContent").hide(); // 메뉴얼 을 안보이게 하고 
			$("#searchTipContent").fadeIn();  // 팁내용을 보여준다
		}else {
			return;
		}
	}
	function showSearchManual(){//검색메뉴얼 눌렀을 때 event
		if($("#showSearchManual").attr("class")!="on"){
			$("#showSearchTip").attr("class","");//팁은 class on 한다.
			$("#showSearchManual").attr("class","on");//메뉴얼은 class '' 한다.
			
			$("#searchTipContent").hide(); // 팁내용은 안보이게 하고 
			$("#searchManualContent").fadeIn();  // 메뉴얼 내용을 보여준다 
		}else {
			return;
		}
	}
	function goNewTurnBanner(){
		var w = 1000;
		var h = 700;
		var xPos = (window.screen.availWidth - w)/2;
		var yPos = (window.screen.availHeight - h)/2;
		  
		win = window.open("http://km.hanafn.com:8208/pub/sso/login_exec.jsp?kcubelinkmode=30&kcubelinkmode_id=4562", "openEvent",'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,toolbar=no,resizable=yes,copyhistory=no,width=' + w + ',height=' + h + ',left='+ xPos +',top='+ yPos+'\'');

		win.focus();
	}
	