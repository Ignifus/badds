package com.badds.baddsdemo;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.widget.EditText;
import android.widget.ImageView;

import com.badds.Badds;
import com.badds.IBaddsListener;
import com.badds.response.BaddsResponse;

public class MainActivity extends Activity implements IBaddsListener {

    private ImageView image;
    private String apiKey;
    private String spaceId;
    private Badds badds;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        image = findViewById(R.id.imageView);

        findViewById(R.id.getAd).setOnClickListener(v -> {
            apiKey = ((EditText) findViewById(R.id.apiKey)).getText().toString();
            spaceId = ((EditText) findViewById(R.id.spaceId)).getText().toString();

            badds = new Badds(this, this, apiKey);
            badds.getBadds(spaceId);
        });
    }

    @Override
    public void onBaddsResponse(BaddsResponse baddsResponse) {
        image.setImageBitmap(baddsResponse.image);
    }

    @Override
    public void onBaddsResponseError(BaddsResponse baddsResponse, Throwable throwable) {
        if (throwable != null)
            Log.e("badds.demo", "Error when fetching ad.", throwable);
        if (baddsResponse != null)
            Log.e("badds.demo", "Error in badds response: " + baddsResponse.error);
    }
}
