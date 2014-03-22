package com.devart.happyshapes;

import java.io.*;

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

            if (action.equals("saveProfile")) {//in progress                
            	Key profileKey = KeyFactory.createKey("profiles", session.getId());
            	Entity profileEntity = new Entity("profiles", profileKey);
            	profileEntity.setProperty("profile", request.getParameter("profile"));
            	profileEntity.setProperty("location", request.getHeader("X-AppEngine-City"));
            	datastore.put(profileEntity);
                   

            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }
}
