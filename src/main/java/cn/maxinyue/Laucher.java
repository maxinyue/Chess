package cn.maxinyue;

import org.glassfish.embeddable.*;
import org.glassfish.embeddable.archive.ScatteredArchive;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;

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

    public void startServer() throws GlassFishException {
        glassfish.start();
    }

    public void deployServer() throws GlassFishException, IOException, URISyntaxException {
        Deployer deployer = glassfish.getDeployer();
        File archiveFile = new File(Laucher.class.getClassLoader().getResource("html").toURI()).getParentFile();
        logger.debug("file is " + archiveFile);
        ScatteredArchive archive = new ScatteredArchive("chess",
                ScatteredArchive.Type.WAR, archiveFile);
        archive.addClassPath(archiveFile);
        String appName = deployer.deploy(archive.toURI(), "--contextroot=chess");
    }

    public void stopServer() throws GlassFishException {
        glassfish.stop();
    }

    public static void main(String[] args) throws GlassFishException, IOException, URISyntaxException {
        Laucher laucher = new Laucher();
        laucher.startServer();
        laucher.deployServer();
    }

}
