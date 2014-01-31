package cn.maxinyue.chess.facade;

import cn.maxinyue.chess.domain.ChessBoard;
import cn.maxinyue.chess.resource.ChessBoardResource;

import javax.inject.Inject;
import javax.persistence.EntityManager;

/**
 * Created by Obama on 14-1-31.
 */
public class ChessBoardFacade {

    @Inject
    private EntityManager entityManager;

    public ChessBoard getChessBoardById(String id) {
        return entityManager.find(ChessBoard.class, id);
    }

    public EntityManager getEntityManager() {
        return entityManager;
    }

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
}
