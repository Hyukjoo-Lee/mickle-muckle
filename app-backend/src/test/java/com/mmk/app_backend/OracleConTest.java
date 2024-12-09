package com.mmk.app_backend;

import java.sql.Connection;
import java.sql.DriverManager;
import org.junit.jupiter.api.Test;

public class OracleConTest {

    private static final String DRIVER = "oracle.jdbc.OracleDriver";
    private static final String URL = "jdbc:oracle:thin:@localhost:1521:ORCLCDB";
    private static final String USER = "micklemuckle";
    private static final String PW = "1234";

    @Test
    public void testCon() throws Exception {
        Class.forName(DRIVER);

        try (Connection con = DriverManager.getConnection(URL, USER, PW)) {
            System.out.println("DB 연결 성공: " + con);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}