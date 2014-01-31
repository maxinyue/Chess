package cn.maxinyue.chess.resource;

import cn.maxinyue.chess.domain.Piece;
import cn.maxinyue.chess.domain.Position;
import cn.maxinyue.chess.facade.PieceFacade;
import cn.maxinyue.chess.facade.PositionFacade;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Collections;
import java.util.List;

@Path("piece")
@Produces(MediaType.APPLICATION_JSON)
public class PieceResource {

    @Inject
    private PieceFacade pieceFacade;

    @Inject
    private PositionFacade positionFacade;

    @GET
    @Path("/chess")
    public List<Piece> random() {
        List<Piece> pieces= pieceFacade.getAllPieces();
        List<Position> positions= positionFacade.getAll();
        Collections.shuffle(positions);
        for(int i=0;i<pieces.size();i++){
            pieces.get(i).setPosition(positions.get(i));
        }
        return pieces;
    }

    public PieceFacade getPieceFacade() {
        return pieceFacade;
    }

    public void setPieceFacade(PieceFacade pieceFacade) {
        this.pieceFacade = pieceFacade;
    }

    public PositionFacade getPositionFacade() {
        return positionFacade;
    }

    public void setPositionFacade(PositionFacade positionFacade) {
        this.positionFacade = positionFacade;
    }
}