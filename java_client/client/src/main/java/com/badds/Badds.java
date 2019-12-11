package com.badds;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.util.Log;

import com.badds.request.HttpRequest;
import com.badds.response.BaddsResponse;
import com.google.gson.Gson;

import java.net.URL;

public class Badds {
    private static final String URL = "https://badds.hq.localhost/ads/ad/";

    private static final Gson gson = new Gson();

    private Activity activity;
    private IBaddsListener listener;
    private String apiKey;

    public Badds(Activity activity, IBaddsListener listener, String apiKey) {
        this.activity = activity;
        this.listener = listener;
        this.apiKey = apiKey;
    }

    private String appendQuery(String query, String key, String value) {
        if (value == null || value.isEmpty())
            return query;

        query += String.format("&%s=%s", key, value);
        return query;
    }

    @SuppressLint("StaticFieldLeak")
    public void getBadds(String spaceId, String age, String gender) {
        new AsyncTask<Void, Void, Void>() {
            @Override
            protected Void doInBackground(Void... params) {
                BaddsResponse br = null;

                if (URL.contains("localhost"))
                    HttpRequest.disableCertificateValidation();

                try {
                    String query = "";
                    query = appendQuery(query, "space", spaceId);
                    query = appendQuery(query, "age", age);
                    query = appendQuery(query, "gender", gender);

                    String url = String.format("%s?apiKey=%s%s", URL, apiKey, query);

                    Log.i("badds", url);

                    String response = new HttpRequest(url)
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
