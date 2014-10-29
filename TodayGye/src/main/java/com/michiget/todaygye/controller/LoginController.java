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
import com.michiget.todaygye.service.IGyeService;
import com.michiget.todaygye.service.ILoginService;
import com.michiget.todaygye.utils.CommonMap;
import com.michiget.todaygye.vo.GyeInfo;


@Controller
@RequestMapping("/login/*")
public class LoginController  implements MessageSourceAware{
	
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

	@Resource(name = "commonDao")
	private ICommonDAO commonDao;
	
	@Resource(name = "loginService")
	private ILoginService loginsv;

	private MessageSource messageSource;
	public void setMessageSource(MessageSource messageSource) {
		this.messageSource = messageSource;
	}
	
	// 로그인폼 처리
	@RequestMapping("loginCheck")
	public ModelAndView insertGye(HttpServletRequest request, HttpSession session, HttpServletResponse response, @RequestParam Map<String, Object> map) throws Exception {
		System.out.println("login 요청 성공");
		
		System.out.println("요청 id = " + map.get("loginId"));
		System.out.println("요청 pw = " + map.get("pass"));
		
		ModelAndView mav;
		int check_return = 0;
		if(request.getParameter("orgLogin") != null){ //로그인 버튼을 눌렀을때 
			System.out.println("orgLogin = " + request.getParameter("orgLogin"));
			if (request.getParameter("orgLogin").equals("a"))
				session.setAttribute("reason", null);
		}
		CommonMap resultMap = loginsv.loginCheck(new CommonMap(map));
	//System.out.println("resultMap = " + resultMap);
		if(resultMap != null){ //입력한 아이디로 조회되는 값이 있다면
			System.out.println("로그인 체크 값 = " + resultMap.get("LOGINCHECK"));
			if (resultMap.get("LOGINCHECK").toString().equals("true")) { //비밀번호 일치시
				logger.info("########################### 세션 값 : " + resultMap);	
				session.setAttribute("resultMap"     , resultMap);
				session.setAttribute("userId"        , resultMap.get("USERID"));
				session.setAttribute("name"          , resultMap.get("NAME"));
				session.setAttribute("loginCheck"    , resultMap.get("LOGINCHECK"));
				session.setMaxInactiveInterval(300);
				if(session.getAttribute("reason") != null){
					System.out.println("reason = " + session.getAttribute("reason"));
					if(session.getAttribute("reason").equals("createForm")){
						mav = new ModelAndView(new RedirectView("/todaygye/gye/createForm.do"));
						return mav;
					}
					if(session.getAttribute("reason").equals("gyeListAll")){
						mav = new ModelAndView(new RedirectView("/todaygye/gye/listAll.do"));
						return mav;
					}
				}
				mav = new ModelAndView("login/loginsuccess");
				
			} else { //비밀번호 불일치시
				resultMap.put("loginId", map.get("loginId"));			
				mav = new ModelAndView("login/loginForm");
				mav.addObject("loginCheck", resultMap.get("LOGINCHECK"));
			}
		}else { //존재하는 아이디 없을시
			//resultMap.put("loginId", map.get("loginId"));			
			mav = new ModelAndView("login/loginForm");
			mav.addObject("loginCheck", "fail");
		}
	
		
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
	
	@RequestMapping("loginForm")
	public ModelAndView goLogInForm(HttpServletRequest request, HttpSession session, HttpServletResponse response, @RequestParam Map<String, Object> map) throws Exception {
		System.out.println("loginForm 요청 성공");
		
		
		ModelAndView mav;
		
		//세션 무효화
		
		logger.info("테스트로 받아와본것 : " + map);
		mav = new ModelAndView("login/loginForm");
		//mav.addObject("loginCheck", "form");
		return mav;
	}
	
	@RequestMapping("logOut")
	public ModelAndView logOut(HttpServletRequest request, HttpSession session, HttpServletResponse response, @RequestParam Map<String, Object> map) throws Exception {
		System.out.println("logOut 요청 성공");
		
		
		ModelAndView mav;
		
		//세션 무효화
		if(session.getAttribute("loginCheck")!=null){
			session.invalidate();
			logger.info("세션무효");
		}else{
			logger.info("세션없음");
		}
		logger.info("테스트로 받아와본것 : " + map);
		mav = new ModelAndView(new RedirectView("/todaygye/"));
		return mav;
	}

}
