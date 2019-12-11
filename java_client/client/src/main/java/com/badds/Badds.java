package com.badds;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;

import com.badds.request.HttpRequest;
import com.badds.response.BaddsResponse;
import com.google.gson.Gson;

import java.net.URL;

public class Badds {
    private static final String URL = "https://badds.geminis.dev/ads/ad/";

    private static final Gson gson = new Gson();

    private Activity activity;
    private IBaddsListener listener;
    private String apiKey;

    public Badds(Activity activity, IBaddsListener listener, String apiKey) {
        this.activity = activity;
        this.listener = listener;
        this.apiKey = apiKey;
    }

    @SuppressLint("StaticFieldLeak")
    public void getBadds(String spaceId) {
        new AsyncTask<Void, Void, Void>() {
            @Override
            protected Void doInBackground(Void... params) {
                BaddsResponse br = null;

                try {
                    String response = new HttpRequest(URL + "?apiKey=" + apiKey + "&space=" + spaceId)
                            .prepare(HttpRequest.Method.GET)
                            .sendAndReadString();

                    br = gson.fromJson(response, BaddsResponse.class);

                    if (br == null || br.error != null) {
                        listener.onBaddsResponseError(br, null);
                        return null;
                    }

                    br.image = BitmapFactory.decodeStream(new URL(br.resource).openStream());

                    BaddsResponse finalBr = br;
                    activity.runOnUiThread(() -> {
                        listener.onBaddsResponse(finalBr);
                    });
                } catch (Exception e) {
                    listener.onBaddsResponseError(br, e);
                }

                return null;
            }
        }.execute();
    }
}
