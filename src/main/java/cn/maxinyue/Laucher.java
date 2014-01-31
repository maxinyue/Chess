package cn.maxinyue;

import cn.maxinyue.chess.util.DbMigration;
import org.glassfish.embeddable.*;
import org.glassfish.embeddable.archive.ScatteredArchive;
import org.h2.tools.Server;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.JarURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.sql.SQLException;
import java.util.Scanner;

/**
 * Created by Obama on 14-1-30.
 */
public class Laucher {

    Logger logger = LoggerFactory.getLogger(Laucher.class);

    private GlassFish glassfish;

    public Laucher() {
        try {
            init();
        } catch (GlassFishException e) {
            e.printStackTrace();
            System.exit(-1);
        }
    }

    private void init() throws GlassFishException {
        GlassFishProperties glassfishProperties = new GlassFishProperties();
        glassfishProperties.setPort("http-listener", 8085);
        glassfishProperties.setPort("https-listener", 8185);
        glassfish = GlassFishRuntime.bootstrap().newGlassFish(glassfishProperties);
    }

    public void startServer() throws GlassFishException, SQLException {
        Server server = Server.createTcpServer(new String[]{"-baseDir", "~/"});

        server.start();
        logger.debug("url is " + server.getURL());
        dbmigration();
        glassfish.start();
    }

    private void dbmigration() {
        DbMigration.migrate("org.h2.Driver", "jdbc:h2:tcp://localhost/~/test", "", "");
    }

    public void deployServer() throws GlassFishException, IOException, URISyntaxException {
        Deployer deployer = glassfish.getDeployer();
        URL url = Laucher.class.getClassLoader().getResource("html");
        File archiveFile = null;
        if (!url.toURI().isOpaque()) {
            archiveFile = new File(url.toURI());
        } else {
            archiveFile = new File(((JarURLConnection) (url.openConnection())).getJarFileURL().toURI());
        }
        System.out.println("archiveFile is " + archiveFile);
        ScatteredArchive archive = new ScatteredArchive("chess",
                ScatteredArchive.Type.WAR,archiveFile.getParentFile());
        if (!url.toURI().isOpaque()) {
            archive.addClassPath(archiveFile.getParentFile());
        } else {
            archive.addClassPath(archiveFile);
        }
        System.out.println("archive uri is " + archive.toURI());
        String appName = deployer.deploy(archive.toURI(), "--contextroot=chess");
    }

    public void stopServer() throws GlassFishException {
        glassfish.stop();
    }

    public static void main(String[] args) throws GlassFishException, IOException, URISyntaxException, SQLException {
        Laucher laucher = new Laucher();
        laucher.startServer();
        laucher.deployServer();
    }

}
