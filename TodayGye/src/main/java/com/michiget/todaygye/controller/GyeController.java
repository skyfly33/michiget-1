package com.michiget.todaygye.controller;

import java.util.ArrayList;
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
import com.michiget.todaygye.service.IGyeService;
import com.michiget.todaygye.utils.CommonList;
import com.michiget.todaygye.vo.GyeInfo;


	@Controller
	@RequestMapping("/gye/*")
	public class GyeController  implements MessageSourceAware{
		
		private static final Logger logger = LoggerFactory.getLogger(GyeController.class);

		@Resource(name = "commonDao")
		private ICommonDAO commonDao;
		
		@Resource(name = "gyeService")
		private IGyeService gyesv;

		private MessageSource messageSource;
		public void setMessageSource(MessageSource messageSource) {
			this.messageSource = messageSource;
		}
		
		// 로그인폼 처리
		@RequestMapping("create")
		public ModelAndView insertGye(HttpServletRequest request, HttpSession session, HttpServletResponse response, @ModelAttribute GyeInfo gyeInfo, @RequestParam Map<String, Object> map) throws Exception {
			System.out.println("url 요청 성공");
			System.out.println("loginCheck = " + session.getAttribute("loginCheck"));
			if (session.getAttribute("loginCheck") == null) {
				System.out.println("세션 없음");
				ModelAndView mav;
				mav = new ModelAndView("login/loginForm");
				return mav;
			}else {
			System.out.println("opencheck = " + gyeInfo.getOpenCheck());
			System.out.println("gyename = " + gyeInfo.getGyeName());
			System.out.println("persons = " + gyeInfo.getPersons());
			System.out.println("money = " + gyeInfo.getMoney());
			System.out.println("cycle = " + gyeInfo.getCycle());
			if(gyeInfo.getOpenCheck().equals("공개")){
				gyeInfo.setOpenCheck("Y");
			}else{
				gyeInfo.setOpenCheck("N");
			}
			gyeInfo.setUserId("defaultId");
			
			gyesv.insertGye(gyeInfo);
		
			ModelAndView mav = new ModelAndView("main");
			
			mav.addObject("gyeInfo", gyeInfo);
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
		
		// 로그인폼 처리
				@RequestMapping("createForm")
				public ModelAndView goCreateForm(HttpServletRequest request, HttpSession session, HttpServletResponse response, @ModelAttribute GyeInfo gyeInfo, @RequestParam Map<String, Object> map) throws Exception {
					System.out.println("createForm 요청 성공");
					System.out.println("loginCheck = " + session.getAttribute("loginCheck"));
					if (session.getAttribute("loginCheck") == null) {
						System.out.println("세션 없음");
						ModelAndView mav;
						mav = new ModelAndView("login/loginForm");
						return mav;
					}else {
					
				
					ModelAndView mav = new ModelAndView("createGye");
					
					
					return mav;
					}
				}
		
		@RequestMapping("listAll")
		public ModelAndView getGyeListAll(HttpServletRequest request, HttpSession session, HttpServletResponse response, @ModelAttribute GyeInfo gyeInfo, @RequestParam Map<String, Object> map) throws Exception {
			System.out.println("getGyeList 요청 성공");
			System.out.println("session loginCheck = " + session.getAttribute("loginCheck"));
			
			if (session.getAttribute("loginCheck") == null) {
				System.out.println("세션 없음");
				ModelAndView mav;
				mav = new ModelAndView("login/loginForm");
				return mav;
			}else {
			CommonList resultList = new CommonList();
			//ArrayList<GyeInfo> resultList = commonDao.select("gye.listAll");
			ModelAndView mav;
			int totalCnt = 0;
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
			
			totalCnt = commonDao.getTotalCnt("gye.totalCnt");
			resultList = gyesv.searchList(page);
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
			
			mav = new ModelAndView("listGye");
			mav.addObject("resultList" , resultList);
			mav.addObject("firstPage"  , firstPage);
			mav.addObject("block"      , block);
			mav.addObject("startPage"  , startPage);
			mav.addObject("endPage"    , endPage);
			mav.addObject("pageCnt"    , pageCnt);
			mav.addObject("totalBlock" , totalBlock);
			mav.addObject("page"       , page);
			
			mav.addObject("resultList", resultList);
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

	
	}
