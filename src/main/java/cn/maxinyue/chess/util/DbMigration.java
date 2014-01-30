package cn.maxinyue.chess.util;

import com.googlecode.flyway.core.Flyway;

import java.util.Properties;

/**
 * Created by Obama on 14-1-31.
 */
public class DbMigration {
    public static void migrate(String driver, String url, String user, String password) {
        Flyway flyway = init(driver, url, user, password);
        flyway.clean();
        flyway.init();
        flyway.migrate();
    }

    public static Flyway init(String driver, String url, String user, String password) {
        Properties properties = new Properties();
        properties.put("flyway.driver", driver);
        properties.put("flyway.url", url);
        properties.put("flyway.user", user);
        properties.put("flyway.password", password);
        Flyway flyway = new Flyway();
        flyway.configure(properties);
        return flyway;
    }

    public static Flyway migrateNotClean(String driver, String url, String user, String password) {
        Flyway flyway = init(driver, url, user, password);
        flyway.init();
        flyway.migrate();
        return flyway;
    }

    public static Flyway clean(String driver, String url, String user, String password) {
        Flyway flyway = init(driver, url, user, password);
        flyway.clean();
        return flyway;
    }
}
