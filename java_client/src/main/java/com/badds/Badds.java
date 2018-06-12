package com.badds;

import com.badds.request.HttpRequest;
import com.badds.response.BaddsResponse;
import com.google.gson.Gson;

import java.io.IOException;

public class Badds {
    private static final String URL = "http://badds.herokuapp.com/ads/ad/";

    private String apiKey;
    private Gson gson = new Gson();

    public Badds(String apiKey) {
        this.apiKey = apiKey;
    }

    public BaddsResponse getBadds(String spaceId) throws IOException {
        String response = new HttpRequest(URL)
                .prepare(HttpRequest.Method.POST)
                .withData("apikey=" + apiKey + "&space=" + spaceId)
                .sendAndReadString();

        return gson.fromJson(response, BaddsResponse.class);
    }
}
