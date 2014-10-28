package com.michiget.todaygye.utils;


import java.io.Reader;
import java.io.StringWriter;
import java.sql.Clob;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CommonMap extends java.util.HashMap {

	private static final long serialVersionUID = -3671210048221588090L;
	private final static Logger logger = LoggerFactory.getLogger(CommonMap.class);

	private NumberFormat nf = NumberFormat.getInstance();
	private NumberFormat cf = NumberFormat.getCurrencyInstance(Locale.KOREA);

	private boolean isSet = false;
	private HttpServletRequest request;
	
	public CommonMap() {
		super();
	}

	public CommonMap(int arg0) {
		super(arg0);
	}

	public CommonMap(int arg0, float arg1) {
		super(arg0, arg1);
	}

	public CommonMap(Map arg0) {
		super(arg0);
	}

	public void set() {
		this.isSet = true;
	}

	public boolean isSet() {
		return this.isSet;
	}

	public synchronized void addAll(Map map) {
		if (map == null) {
			return;
		}
		Iterator i$ = map.entrySet().iterator();
		do {
			if (!i$.hasNext()) {
				break;
			}
			java.util.Map.Entry entry = (java.util.Map.Entry) i$.next();
			Object value = entry.getValue();
			if (value != null) {
				Object toadd;
				if (value instanceof String[]) {
					String values[] = (String[]) (String[]) value;
					if (values.length > 1) {
						toadd = new ArrayList(Arrays.asList(values));
					} else if(values.length == 1) {
						toadd = values[0];
					} else {
						toadd = "";
					}
				} else {
					toadd = value;
				}
				super.put(((String)entry.getKey()), toadd);
			}
		} while (true);
	}
	
	// 공백 제거를 않함
	public synchronized String getStringNotTrim(String key){
		return getStringNotTrim(key, "");	
	}
	public synchronized String getStringNotTrim(String arg0, String def) {
		arg0 = ((String) arg0);
		String content = null;
		if (super.get(arg0) instanceof Clob) {
			try {
				Clob lob_data = (Clob)super.get(arg0);
				Reader in = lob_data.getCharacterStream();
				java.io.Writer sw = new StringWriter();
				char buffer[] = new char[4096];
				int n;
				while ((n = in.read(buffer)) != -1)
					sw.write(buffer, 0, n);
				content = sw.toString();
			} catch (Exception ex) {
				logger.error(CommonUtil.printStackTraceToString(ex));
			}
			content = content.replaceAll("&quot;","\"");
			return content;
		} else {
			if(this.get(arg0) == null){
				return def;
			}else{ 
				String str = String.valueOf(this.get(arg0));
				if (str.equals("")){
					str = def;
				}else{
					str = str.replaceAll("&quot;","\"");
				}
				return str;
			}
		}
	}
	
	// 공백을 제거
	public synchronized String getString(String key){
		return 	getString(key, "");	
	}
	public synchronized String getString(String arg0, String def) {
		arg0 = ((String) arg0);
		String content = null;
		if (super.get(arg0) instanceof Clob) {
			try {
				Clob lob_data = (Clob)super.get(arg0);
				Reader in = lob_data.getCharacterStream();
				java.io.Writer sw = new StringWriter();
				char buffer[] = new char[4096];
				int n;
				while ((n = in.read(buffer)) != -1)
					sw.write(buffer, 0, n);
				content = sw.toString();
			} catch (Exception ex) {
				logger.error(CommonUtil.printStackTraceToString(ex));
			}
			content = content.replaceAll("&quot;","\"");
			return content;
		} else {
			if(this.get(arg0) == null){
				return def;
			} else{ 
				String str = String.valueOf(this.get(arg0)).trim();
				if (str.equals("")){
					str = def;
				}else{
					str = str.replaceAll("&quot;","\"");
				}
				return str;
			}
		}
	}

	public synchronized int getInt(String key) {
		return getInt(key,0);
	}
	public synchronized int getInt(String key,int def) {
		Object obj = super.get(key);
		int ret = 0;
		
		if (obj instanceof java.lang.Number) {
			ret = ((Number) obj).intValue();
		} else {
			try {
				ret = Integer.parseInt(obj.toString());
			} catch (Exception ex) {
				ret = def;
			}
		}
		return ret;
	}
	
	public synchronized long getLong(String key) {
		return getLong(key, 0);
	}
	public synchronized long getLong(String key, long def) {
		Object obj = super.get(key);
		long ret = 0;
		
		if (obj instanceof java.lang.Number) {
			ret = ((Number) obj).longValue();
		} else {
			try {
				ret = Long.parseLong(obj.toString());
			} catch (Exception ex) {
				ret = def;
			}
		}
		return ret;		
	}
	
	public synchronized Long getLongL(String key) {
		return new Long(this.getLong(key));
	}
	
	public synchronized int[] getInts(String key) {
		int[] ints = null;
		try{
			String[] obj = (String[])super.get(key);
			ints = new int[obj.length];
			for(int i=0;i<obj.length;i++){				
				ints[i] = getInt(obj[i]);				
			}
		}catch(Exception e){
			logger.error(CommonUtil.printStackTraceToString(e));
		}
		return ints;		
	}

	public synchronized Integer getInteger(String key) {
		return new Integer(this.getInt(key));
	}

	public synchronized double getDouble(String key) {
		double ret = 0;
		Object obj = super.get(key);
		if (obj == null)
			return 0;
		try {
			ret = Double.parseDouble(obj.toString());
		} catch (Exception ex) {
			return 0;
		}
		return ret;
	}

	public synchronized String getPersent(String key) {
		String str = "";
		NumberFormat format = NumberFormat.getPercentInstance();
		double value = this.getDouble(key);
		str = format.format(value);
		return str;
	}

	public synchronized String getDateFormat(String key, String type) {
		String str = "";
		Object o = null;
		SimpleDateFormat in = new SimpleDateFormat("yyyyMMddkkmmss");
		SimpleDateFormat out = new SimpleDateFormat(type);

		o = this.get(key);
		if (o == null || o.toString().trim().equals(""))
			return "-";
		try {
			str = o instanceof String ? out.format(in.parse((String) o)) : out
					.format((Date) o);
		} catch (ParseException e) {
			logger.info("type=" + type + ",value=" + o);
			return "-";
		}
		return str;
	}

	public synchronized String getDateFormat(String key, String fType, String tType) {
		String str = "";
		String s = null;
		SimpleDateFormat in = new SimpleDateFormat(fType);
		SimpleDateFormat out = new SimpleDateFormat(tType);

		s = key;
		if (s.equals(""))
			return "-";
		try {
			str = out.format(in.parse(s));
		} catch (ParseException e) {
			logger.info("type=" + tType + ",value=" + s);
			return "-";
		}
		return str;
	}

	public synchronized String getNumberFormat(String key) {
		String str = "";
		str = nf.format(this.getDouble(key));
		return str;
	}

	public String getCurrencyFormat(String key) {
		String str = "";
		double d = this.getDouble(key);
		if (d == 0)
			return "-";
		str = cf.format(d);
		return str;
	}

	public synchronized Object put(Object arg0,Object arg1) {
		arg0 = (arg0);
		return super.put(arg0, arg1);
	}
	
	public synchronized HttpSession getSession(){
		return (HttpSession)this.get("sessionParam");
	}

	
	public synchronized HttpServletRequest getRequest() {
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}
	
	public String getImgName(String arg){
		String imgNm = getString(arg);
		if(!"".equals(imgNm)){
			imgNm = imgNm.substring(imgNm.lastIndexOf("/")+1,imgNm.length());
		}		
		return imgNm;
	}
	
	public CommonMap copyOf() {
		CommonMap map = new CommonMap();
		
		for (Object name : this.keySet()) {
			map.put(name, this.get(name));
		}
		
		return map;
	}
	
	public Object get(Object key, Object def) {
		Object v = get(key);
		return v == null ? def : v;
	}
	
	@SuppressWarnings("unchecked")
	public Object putNotEmpty(Object key, Object obj) {
		
		if (CommonUtil.isEmpty(obj))
			return obj;
	
		return super.put(key, obj);
	}
	
	@SuppressWarnings("unchecked")
	public Object putNotNull(Object key, Object obj) {
		
		if (obj == null)
			return obj;
		
		return super.put(key, obj);
	}
}
