package cn.maxinyue.chess.resource;

import cn.maxinyue.chess.domain.ConnectMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Obama on 14-1-30.
 */
@ServerEndpoint(value = "/websocket", encoders = {ConnectMessage.ConnectMessageCoder.class}, decoders = {ConnectMessage.ConnectMessageCoder.class})
public class MessageEndpoint {

    Logger logger = LoggerFactory.getLogger(MessageEndpoint.class);
    private static Map<String, Session> connections = new ConcurrentHashMap<>();

    @OnMessage
    public void handleMessage(ConnectMessage message, Session session) throws IOException, EncodeException {
        switch (message.getMessageType()) {
            case LOGIN:
                addNewSession(message.getUser(), session);
                break;
            case LOGOUT:
                break;
            case INIT:
                sendInitChesses(message.getUser(), session);
                break;
            case PAIR:
                break;
        }
    }

    private void sendInitChesses(String user, Session session) {

    }

    private void addNewSession(String user, Session session) {
        if (connections.containsKey(user)) {
            connections.put(user, session);
        }
    }

    @OnOpen
    public void handleLogin(Session session) {
        logger.debug("connection opened!");
    }

    @OnClose
    public void handleLogout(Session session) {
        String user = null;
        for (String s : connections.keySet()) {
            if (session == connections.get(s)) {
                user = s;
                break;
            }
        }
        if (user != null) {
            connections.remove(user);
            logger.debug("user " + user + " has left the game rudely!");
        }
    }


}
