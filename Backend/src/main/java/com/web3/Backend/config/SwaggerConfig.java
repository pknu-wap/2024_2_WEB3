package com.web3.Backend.config;



import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.responses.ApiResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .components(new Components()
                        .addResponses("defaultApiResponse", new ApiResponse()
                                .description("API 요청이 성공적으로 처리된 경우 반환되는 응답입니다."))
                        .addResponses("errorApiResponse", new ApiResponse()
                                .description("API 요청 처리 중 에러가 발생한 경우 반환되는 응답입니다. 에러 코드와 메시지가 포함됩니다.")));
    }
}