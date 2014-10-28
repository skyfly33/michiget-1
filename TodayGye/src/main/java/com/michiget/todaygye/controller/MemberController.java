package com.michiget.todaygye.controller;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceAware;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.michiget.todaygye.dao.ICommonDAO;
import com.michiget.todaygye.service.ILoginService;
import com.michiget.todaygye.service.IMemberService;
import com.michiget.todaygye.utils.CommonList;
import com.michiget.todaygye.utils.CommonMap;
import com.michiget.todaygye.vo.UserInfo2;

@Controller
@RequestMapping("/member/*")
public class MemberController  implements MessageSourceAware{
	
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

	@Resource(name = "commonDao")
	private ICommonDAO commonDao;
	
	@Resource(name = "memberService")
	private IMemberService membersv;

	private MessageSource messageSource;
	public void setMessageSource(MessageSource messageSource) {
		this.messageSource = messageSource;
	}
	
	// 로그인폼 처리
	@RequestMapping("listAll")
	public ModelAndView memberList(HttpServletRequest request, HttpSession session, HttpServletResponse response, @RequestParam Map<String, Object> map) throws Exception {
		System.out.println("memberList 요청 성공");
		
		
		if (session.getAttribute("loginCheck") == null) {
			System.out.println("세션 없음");
			//session.setAttribute("reason", "memberListAll");
			ModelAndView mav;
			mav = new ModelAndView("login/loginForm");
			return mav;
		}else {
		
		ModelAndView mav;
		int totalCnt = 0;
		CommonList resultList = new CommonList();
		
		int pageCnt = 0;
		int page = 0;
		int firstPage = 1;
		if (request.getParameter("page") == null)
			page = 1;
		else
			page = Integer.parseInt(request.getParameter("page"));
		
		int limitPage = 10;
		int block = (int)(Math.ceil(page/(float)limitPage));
		
		int startPage = ((block - 1) * limitPage) + 1;
		int endPage = startPage + limitPage - 1;
		
		totalCnt = commonDao.getTotalCnt("member.totalCnt");
		resultList = membersv.searchList(page);
		if (totalCnt != 0) {
			
			if (totalCnt % limitPage == 0) {
				pageCnt = totalCnt / limitPage;

			} else {
				pageCnt = (totalCnt / limitPage) + 1;
				;
			}
		}
		int totalBlock = (int)Math.ceil(pageCnt/(float)limitPage);
		logger.info("########################### 토탈블럭 : " + totalBlock);
		if (endPage > pageCnt)
			endPage = pageCnt;

		
		/*if (map.get("page") != null) {
			page.put("page", map.get("page"));
			resultList = commonDao.selectList("member.listAll", page);
		} else {
			page.put("page", 0);
			resultList = commonDao.selectList("member.listAll", page);
		}*/
		
		mav = new ModelAndView("/member/memberList2");
		mav.addObject("resultList" , resultList);
		mav.addObject("firstPage"  , firstPage);
		mav.addObject("block"      , block);
		mav.addObject("startPage"  , startPage);
		mav.addObject("endPage"    , endPage);
		mav.addObject("pageCnt"    , pageCnt);
		mav.addObject("totalBlock" , totalBlock);
		mav.addObject("page"       , page);
		
		//세션 무효화
		/*if(session.getAttribute("loginCheck")!=null){
			session.invalidate();
			logger.info("세션무효");
		}else{
			logger.info("세션없음");
		}
		logger.info("테스트로 받아와본것 : " + map);
		mav.addObject("loginInfo", map);	*/	
		return mav;
		}
	}
	
	@RequestMapping("join")
	public ModelAndView memberInsert(HttpServletRequest request, HttpSession session, HttpServletResponse response, @ModelAttribute UserInfo2 userInfo2, @RequestParam Map<String, Object> map) throws Exception {
		System.out.println("memberInsert 요청 성공");
		
		
		ModelAndView mav;
		userInfo2.setREGIP(request.getRemoteAddr());
		userInfo2.setUSERGRADE("1");
		membersv.insert(userInfo2);
		
		/*if(userInfo2.getACCOUNT()==null){
			userInfo2.setACCOUNT("0");
		}*/
		
		mav = new ModelAndView(new RedirectView("/todaygye/"));
						
		return mav;
	}

}

