package cn.maxinyue.chess.domain;

import java.util.List;

/**
 * Created by Obama on 14-1-30.
 */
public class ConnectMessage {

    public static class ConnectMessageCoder extends
            JSONCoder<ConnectMessage> {
    }

    public static enum MessageType {
        LOGIN,
        INIT,
        LOGOUT,
        PAIR,
        TURN
    }

    private MessageType messageType;

    private String sender;

    private String reciever;

    private String content;

    private List<Piece> pieces;

    public MessageType getMessageType() {
        return messageType;
    }

    public void setMessageType(MessageType messageType) {
        this.messageType = messageType;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReciever() {
        return reciever;
    }

    public void setReciever(String reciever) {
        this.reciever = reciever;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<Piece> getPieces() {
        return pieces;
    }

    public void setPieces(List<Piece> pieces) {
        this.pieces = pieces;
    }
}
