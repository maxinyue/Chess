package cn.maxinyue.chess.factory;

import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class MyEntityManagerFactory {

    @Produces
    public EntityManager getEntityManager() {
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("domain");
        return entityManagerFactory.createEntityManager();
    }
}
