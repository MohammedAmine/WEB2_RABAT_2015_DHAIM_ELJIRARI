/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ws.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author mohammedamine
 */
public class ContactsFacadeREST {
    @PersistenceContext(unitName = "AnnuairePU")
    private EntityManager em;

    protected EntityManager getEntityManager() {
        return em;
    }
    
}
