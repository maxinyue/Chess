package cn.maxinyue.chess.facade;

import cn.maxinyue.chess.domain.Position;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

/**
 * Created by Obama on 14-1-31.
 */
public class PositionFacade {

    @Inject
    private EntityManager entityManager;

    public List<Position> getAll(){
        return entityManager.createQuery("select p from Position p").getResultList();
    }

    public EntityManager getEntityManager() {
        return entityManager;
    }

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
}
