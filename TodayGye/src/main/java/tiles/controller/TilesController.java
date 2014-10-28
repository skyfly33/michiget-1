package tiles.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;


/**
 * view 호출 정의한 Control
 * cmd 이름으로 원하는 index.jsp 페이지 호출 (tilesConfig.xml, tilesSearchConfig.xml 에 정의된 id 값과 동일)
 * view.do?cmd=xxx  형태로 호출하면 된다.
 * 
 * keyId  세팅과 index.jsp 페이지 호출
 * 실행 순서 
 *  - 통계 관련 :  index.jsp >  staticTopbar.jsp > 해당 페이지
 *  - 그외 : 해당 index.jsp > 해당 페이지
 *  
 * @author 
 *
 */
public class TilesController extends AbstractController{
	
	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest req, HttpServletResponse res) throws Exception {
		ModelAndView mv = new ModelAndView();
		String cmd = (String)req.getParameter("cmd");
		mv.addObject("keyId", cmd);
		
		System.out.println("cmd = " + cmd);
		// 관리시스템 탭 타이틀 셋팅
		// 관리시스템 통계 관련은 statisticsService에서 세팅
		//String mainTitle = "";

		/*if(cmd.equals("homeIndex")){		// 관리시스템 - Home
			mainTitle = AdminPropertieManager.getProperty("maintitle.homeIndex");
		}else if(cmd.startsWith("static_cs")){		// 관리시스템 - 통계(콜센터용, 2013-04-08 add, hsj)
			cmd = "static_csindex";
		}else if(cmd.startsWith("static_")){		// 관리시스템 - 통계
			cmd = "static_index";
		}else if(cmd.equals("keyword_rank")){		// 관리시스템 - 인기 검색어 순위
			// 공사중
			mainTitle = AdminPropertieManager.getProperty("maintitle.keyword_rank");
		}else if(cmd.equals("managerMainIndex") || cmd.equals("managerMaincsIndex")){	// 관리시스템 - 사용자 관리 (콜센터용 분기추가, 2013-04-08, mod, hsj)
			mainTitle = AdminPropertieManager.getProperty("maintitle.managerMainIndex");
		}else if(cmd.equals("synonymsIndex")){	// 관리시스템 - 동의어 관리
			mainTitle = AdminPropertieManager.getProperty("maintitle.synonymsIndex");
		}else if(cmd.equals("searchTest")){	// 관리시스템 - 검색 테스트
			// 공사중
			mainTitle = AdminPropertieManager.getProperty("maintitle.searchTestIndex");
		}
		
		mv.addObject("mainTitle", new String(mainTitle.getBytes("ISO-8859-1"), "UTF-8"));
		// view 선택
*/		
		System.out.println("cmd = " + cmd);
		mv.setViewName(cmd);
		return mv;
	}
}
