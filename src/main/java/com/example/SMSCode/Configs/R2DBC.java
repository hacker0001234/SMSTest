package com.example.SMSCode.Configs;

import io.r2dbc.spi.ConnectionFactories;
import io.r2dbc.spi.ConnectionFactory;
import io.r2dbc.spi.ConnectionFactoryOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.r2dbc.core.DatabaseClient;

import static io.r2dbc.spi.ConnectionFactoryOptions.*;

@Configuration
public class R2DBC {

    @Bean
    public ConnectionFactory factory(){
        ConnectionFactoryOptions options = ConnectionFactoryOptions.builder()
                .option(DRIVER,"mysql")
                .option(HOST,"localhost")
                .option(PORT,3306)
                .option(USER, "root")
                .option(PASSWORD,"20090620")
                .option(DATABASE,"test")
                .option(SSL,false)
                .build();

        ConnectionFactory connectionFactory = ConnectionFactories.get(options);
        return connectionFactory;
    }
    @Bean
    public DatabaseClient databaseClient(ConnectionFactory connectionFactory){
        return DatabaseClient.create(connectionFactory);
    }
}
