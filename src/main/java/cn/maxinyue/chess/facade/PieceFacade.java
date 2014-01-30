package cn.maxinyue.chess.facade;

import cn.maxinyue.chess.domain.Piece;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by Obama on 14-1-31.
 */
public class PieceFacade {

    @Inject
    private EntityManager entityManager;

    public List<Piece> random() {
        return entityManager.createQuery("select p from Piece p").getResultList();
    }

    public EntityManager getEntityManager() {
        return entityManager;
    }

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
}
