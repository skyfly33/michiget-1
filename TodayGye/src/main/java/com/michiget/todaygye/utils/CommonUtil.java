package com.michiget.todaygye.utils;

import java.security.Key;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CommonUtil {
	
	private final static Logger logger = LoggerFactory.getLogger(CommonUtil.class);

	/** 
	 *  
	 * @return String
	 */
	public static String getApiKey(){
		
		UUID uid = UUID.randomUUID();
		
		return splitByte(uid.toString(), 0, 13);
	}
	
	public static Key getKey(String keyValue) throws Exception {
        DESedeKeySpec desKeySpec = new DESedeKeySpec(keyValue.getBytes());
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DESede");
        Key key = keyFactory.generateSecret(desKeySpec);
        return key;
    }

	public static String Encode(String str){
		StringBuffer returnSb = null;
		try {
			Cipher cipher = Cipher.getInstance("TripleDES/ECB/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, getKey(CommonProp.key));
			byte[] plaintext = str.getBytes();
			byte[] ciphertext = cipher.doFinal(plaintext);
		   
			returnSb = new StringBuffer(ciphertext.length * 2);
			for(int i = 0; i < ciphertext.length; i++) {
			String hex = "0" + Integer.toHexString(0xff & ciphertext[i]); 
			returnSb.append(hex.substring(hex.length()-2));
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return returnSb.toString();
	}	
	
	public static String Decode(String inStr) {
		String text = null;
		try {
			byte[] b = new byte[inStr.length()/2];
			Cipher cipher = Cipher.getInstance("TripleDES/ECB/PKCS5Padding");
			cipher.init(Cipher.DECRYPT_MODE, getKey(CommonProp.key));
			for(int i = 0; i < b.length; i++) {
			b[i] = (byte)Integer.parseInt(inStr.substring(2*i, 2*i+2), 16);
			}
			byte[] decryptedText = cipher.doFinal(b);
			text = new String(decryptedText);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return text;
	}
	
	/**
	 * 
	 * @param str
	 * @param beginIndex
	 * @param endIndex
	 * @return String
	 */
	public static String splitByte(String str, int beginIndex, int endIndex) {
		  if (str==null) return "";
		  String returnStr = new String(str.getBytes(), beginIndex, endIndex - beginIndex); 
		 
		  return returnStr;
	} 
	
	/**
	 * 
	 * @return String
	 */
	public static String getNowday(){
		return new java.text.SimpleDateFormat("yyyyMMdd").format(new java.util.Date());
	}
	
	/**
	 * 
	 * @return String
	 */
	public static String getNowTime(){
		return new java.text.SimpleDateFormat("HHmmss").format(new java.util.Date());
	}
	
	/** 
	 *  
	 *  @param	str
	 *  @param	length
	 *  @param	car
	 *  @return	String
	 * */
	public static String RPad(String str, Integer length, char car){
		String resultStr = "";
		
		if (length > str.getBytes().length){
			resultStr = str + String.format("%" + (length - str.getBytes().length) + "s",  "").replace(" ", String.valueOf(car));
		}else{
			resultStr = str;
		}
		
		return resultStr;
	}
	
	/** 
	 *   
	 *  @param	str
	 *  @param	length
	 *  @param	car
	 *  @return	String
	 * */
	public static String LPad(String str, Integer length, char car){
		String resultStr = "";
	
		if (length > str.getBytes().length){
			resultStr = String.format("%" + (length - str.getBytes().length) + "s", "").replace(" ", String.valueOf(car)) + str;
		}else {
			resultStr = str;
		}
		
		return resultStr;
		
	}
	
	/**
	 *  
	 * @param obj
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static boolean isEmpty(Object obj) {
		
		if (obj == null) {
			return true;
		}
		else if (obj instanceof String) {
			return obj.toString().length() == 0;
		}
		else if (obj instanceof List) {
			return ((List)obj).isEmpty();
		}
		else if (obj instanceof Map) {
			return ((Map)obj).isEmpty();
		}
		else if (obj instanceof Object[]) {
			return ((Object[])obj).length == 0;
		}
		
		return false;
	}
	
	/**
	 * 
	 * @param e
	 * @return
	 */
	public static String printStackTraceToString(Throwable e) {
		StringBuffer sb = new StringBuffer();

		try {
			sb.append(e.toString());
			sb.append("\n");
			StackTraceElement element[] = e.getStackTrace();

			for (int idx = 0; idx < element.length; idx++) {
				sb.append("\tat ");
				sb.append(element[idx].toString());
				sb.append("\n");
			}
		} catch (Exception ex) {
			return e.toString();
		}
		return sb.toString();
	}	
	
	public static boolean isEmptyZero(Object obj) {
		
		if (!isEmpty(obj)) {
			if (obj instanceof Character) {
				return obj.toString().length() == 0;
			}
			return obj.equals(0);
		} else return true;
	}
			
	/*
	 * YYYYMMDD형태로 받은 날짜문자형을 YYYY-MM-DD형태로 바꿔준다.
	 */
	public static String searchDayCast(String ymd){
		return splitByte(ymd, 0, 4)+ "-" + splitByte(ymd, 4, 6) + "-" + splitByte(ymd, 6, 8);
	}
	
	public static String inputHyphen(String str){
		return splitByte(str, 0, 4)+ " - " + splitByte(str, 4, 8) + " - " + splitByte(str, 8, 12) + " - " + splitByte(str, 12, 16);
	}
	
	public static String inputHyphen2(String str){
		return splitByte(str, 0, 4)+ "-" + splitByte(str, 4, 8) + "-" + splitByte(str, 8, 12) + "-" + splitByte(str, 12, 16);
	}
	
	
	// ####년 01월 01일 00시 처리 않함..(매시10분에 배치가 돌고 10분 이하로 분을 빼야함 않그러면 큰일남!! 특정(파일 삭제 배치)를 위해 사용)
	// 다른거에 사용할때에는 다른걸로 추가 개발을 해야한다.
	public static Long beforMin(int min){
		Calendar t = Calendar.getInstance();
		String year = Integer.toString(t.get(Calendar.YEAR));					// 년
		String month = Integer.toString(t.get(Calendar.MONTH )+1);		// 월
		month = month.length() > 1 ? month : "0" + month;
		String date	= Integer.toString(t.get(Calendar.DATE));					// 일
		date = date.length() > 1 ? date : "0" + date;
		String hh = Integer.toString(t.get(Calendar.HOUR_OF_DAY));		// 시
		int mmInt = (t.get(Calendar.MINUTE)-min);								// 분
		mmInt = mmInt > 0 ? mmInt : 60+mmInt;
		String mm = Integer.toString(mmInt);
		mm = mm.length() > 1 ? mm : "0" + mm;
		
		return Long.parseLong(year + month + date + hh + mm);
	}
	
}
