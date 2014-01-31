package cn.maxinyue.chess.factory;

import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class MyEntityManagerFactory {

    public EntityManagerFactory entityManagerFactory=Persistence.createEntityManagerFactory("domain");

    @Produces
    public EntityManager getEntityManager() {
        return entityManagerFactory.createEntityManager();
    }
}
