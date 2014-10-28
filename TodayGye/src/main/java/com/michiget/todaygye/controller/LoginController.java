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
		
		CommonMap resultMap = loginsv.loginCheck(new CommonMap(map));
		System.out.println("로그인 체크 값 = " + resultMap.get("LOGINCHECK"));
		if (resultMap.get("LOGINCHECK").toString().equals("true")) {
			logger.info("########################### 세션 값 : " + resultMap);	
			session.setAttribute("resultMap", resultMap);
			session.setAttribute("userId"   , resultMap.get("USERID"));
			session.setAttribute("name"     , resultMap.get("NAME"));
			session.setAttribute("check"    , resultMap.get("LOGINCHECK"));
			
			mav = new ModelAndView("login/loginsuccess");
		
		} else {
			resultMap.put("userId", map.get("userId"));			
			mav = new ModelAndView(new RedirectView("loginForm.do"), resultMap);
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

}