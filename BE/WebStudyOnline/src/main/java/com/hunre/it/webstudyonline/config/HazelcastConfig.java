package com.hunre.it.webstudyonline.config;

import com.hazelcast.config.Config;
import com.hazelcast.config.MapConfig;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HazelcastConfig {

    @Bean(name = "hazelcastServerInstance")
    public HazelcastInstance hazelcastServerInstance() {
        Config config = new Config();
        MapConfig mapConfig = new MapConfig("otpCodes")
                .setTimeToLiveSeconds(60);
        config.addMapConfig(mapConfig);

        return Hazelcast.newHazelcastInstance(config);
    }
}
