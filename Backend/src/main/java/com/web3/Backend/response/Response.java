package com.web3.Backend.response;


import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Response {
    private String code;
    private String message;
    private Map<String, Object> data;

    public Response(String code, String message) {
        this.code = code;
        this.message = message;
        this.data = null;
    }
}