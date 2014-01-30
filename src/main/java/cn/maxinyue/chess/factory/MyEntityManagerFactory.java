package cn.maxinyue.chess.factory;

import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;

/**
 * Created by Obama on 14-1-31.
 */
public class MyEntityManagerFactory {

    @Produces
    public EntityManager getEntityManager() {
        return Persistence.createEntityManagerFactory("domain").createEntityManager();
    }
}
