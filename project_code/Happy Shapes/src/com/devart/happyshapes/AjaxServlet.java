package com.devart.happyshapes;

import java.io.*;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

/**
 *
 * @author iGRAPHiC
 */
public class AjaxServlet extends HttpServlet {


    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            HttpSession session = request.getSession();
            String action = request.getParameter("action");
            DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
            Date date = new Date();

            if (action.equals("saveProfile")) {//in progress                
            	Key profileKey = KeyFactory.createKey("profiles", session.getId());
            	Entity profileEntity = new Entity("profiles", profileKey);            	
            	profileEntity.setProperty("profile", request.getParameter("profile"));
            	profileEntity.setProperty("location", request.getHeader("X-AppEngine-City"));
            	profileEntity.setProperty("ip-address",  request.getRemoteAddr());
            	profileEntity.setProperty("date", date);            	
            	datastore.put(profileEntity);                   
            }else if (action.equals("sendFeedback")) {//in progress                
            	Key commentKey = KeyFactory.createKey("comments", session.getId());
            	Entity commentEntity = new Entity("comments", commentKey);            	
            	commentEntity.setProperty("name", request.getParameter("name"));
            	commentEntity.setProperty("email", request.getParameter("email"));
            	commentEntity.setProperty("comment", request.getParameter("comment"));
            	commentEntity.setProperty("location", request.getHeader("X-AppEngine-City"));
            	commentEntity.setProperty("ip-address",  request.getRemoteAddr());
            	commentEntity.setProperty("date", date);            	
            	datastore.put(commentEntity);                   
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }
}
