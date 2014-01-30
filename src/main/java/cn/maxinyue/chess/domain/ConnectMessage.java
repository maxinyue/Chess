package cn.maxinyue.chess.domain;

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
        PAIR
    }

    private MessageType messageType;

    private String user;

    private String content;

    public MessageType getMessageType() {
        return messageType;
    }

    public void setMessageType(MessageType messageType) {
        this.messageType = messageType;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
