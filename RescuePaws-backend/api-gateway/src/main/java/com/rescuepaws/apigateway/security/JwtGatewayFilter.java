package com.rescuepaws.apigateway.security;
import com.rescuepaws.apigateway.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class JwtGatewayFilter implements GlobalFilter {

    private final JwtUtil jwtUtil;

    public JwtGatewayFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        String path = exchange.getRequest().getURI().getPath();

        //  Allow auth endpoints (no JWT required)
        if (path.startsWith("/auth")) {
            return chain.filter(exchange);
        }

        // Get Authorization header
        String authHeader = exchange.getRequest().getHeaders().getFirst("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("Missing or invalid Authorization header");
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);

        try {
            //  Validate JWT
            Claims claims = jwtUtil.validateToken(token);

            String userId = claims.get("id").toString();
            String username = claims.get("username").toString();
            String email = claims.getSubject();
            String role = claims.get("role").toString();

            //  Add user info as prefixed headers
            var mutatedRequest = exchange.getRequest().mutate()
                    .header("X-UserId", userId)
                    .header("X-Username", username)
                    .header("X-Email", email)
                    .header("X-Role", role)
                    .build();

            //  Log headers for debugging
            mutatedRequest.getHeaders().forEach((k, v) -> System.out.println(k + " : " + v));


            //  Forward request to downstream service
            return chain.filter(exchange.mutate().request(mutatedRequest).build());

        } catch (Exception e) {
            System.out.println("JWT validation failed: " + e.getMessage());
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
    }
}