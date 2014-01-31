package cn.maxinyue.chess.resource;

import cn.maxinyue.chess.domain.ChessBoard;
import cn.maxinyue.chess.facade.ChessBoardFacade;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("chessboard")
@Produces(MediaType.APPLICATION_JSON)
public class ChessBoardResource {

    @Inject
    private ChessBoardFacade chessBoardFacade;

    @GET
    @Path("/{id}")
    public ChessBoard getChessBoardById(@PathParam("id")String id) {
        return chessBoardFacade.getChessBoardById(id);
    }

    public ChessBoardFacade getChessBoardFacade() {
        return chessBoardFacade;
    }

    public void setChessBoardFacade(ChessBoardFacade chessBoardFacade) {
        this.chessBoardFacade = chessBoardFacade;
    }
}
