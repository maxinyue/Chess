package cn.maxinyue.chess.resource;

import cn.maxinyue.chess.domain.Piece;
import cn.maxinyue.chess.facade.ChessBoardFacade;
import cn.maxinyue.chess.facade.PieceFacade;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("chessboard")
@Produces(MediaType.APPLICATION_JSON)
public class ChessBoard {

    @Inject
    private ChessBoardFacade chessBoardFacade;

    @GET
    @Path("/{id}")
    public ChessBoard getChessBoardById(@PathParam("id")String id) {
        return chessBoardFacade.getChessBoardById(id);
    }
}
