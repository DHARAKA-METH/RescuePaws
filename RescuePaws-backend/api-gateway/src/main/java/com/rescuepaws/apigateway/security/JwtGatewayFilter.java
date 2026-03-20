package com.rescuepaws.apigateway.security;
import com.rescuepaws.apigateway.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.cloud.gateway.filter.GatewayFilter;
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
        String authHeader = exchange.getRequest()
                .getHeaders()
                .getFirst("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);

        try {

            Claims claims = jwtUtil.validateToken(token);

            String userId = claims.get("id").toString();
            String username = claims.get("username").toString();
            String email = claims.getSubject();
            String role = claims.get("role").toString();

            // Add user data as headers (instead of request.setAttribute)
            var mutatedRequest = exchange.getRequest().mutate()
                    .header("userId", userId)
                    .header("username", username)
                    .header("email", email)
                    .header("role", role)
                    .build();

            return chain.filter(exchange.mutate().request(mutatedRequest).build());


        } catch (Exception e) {

            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
    }
}





