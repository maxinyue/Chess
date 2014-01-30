package cn.maxinyue.chess.resource;

import cn.maxinyue.chess.domain.Piece;
import cn.maxinyue.chess.facade.PieceFacade;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("piece")
@Produces(MediaType.APPLICATION_JSON)
public class PieceResource {

    @Inject
    private PieceFacade pieceFacade;

    @GET
    @Path("/chess")
    public List<Piece> random() {
        return pieceFacade.random();
    }

    public PieceFacade getPieceFacade() {
        return pieceFacade;
    }

    public void setPieceFacade(PieceFacade pieceFacade) {
        this.pieceFacade = pieceFacade;
    }
}