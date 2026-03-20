package com.rescuepaws.apigateway.config.config;
import com.rescuepaws.apigateway.security.JwtGatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityConfig {

    private final JwtGatewayFilter jwtGatewayFilter;

    public SecurityConfig(JwtGatewayFilter jwtGatewayFilter) {
        this.jwtGatewayFilter = jwtGatewayFilter;
    }

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("auth-service", r -> r.path("/api/auth/")
                        .uri("http://localhost:8081"))
                .route("dog-service", r -> r.path("/api/dogs/**")
                        .uri("http://localhost:8082"))
                .build();
    }

}
