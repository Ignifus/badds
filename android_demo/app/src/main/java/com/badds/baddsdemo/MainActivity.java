package com.badds.baddsdemo;

import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;

import com.badds.Badds;

import java.io.InputStream;
import java.net.URL;

public class MainActivity extends Activity {

    private Bitmap bmp;
    private ImageView image;
    private String apiKey;
    private String spaceId;
    private Badds badds;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        image = (ImageView)findViewById(R.id.imageView);

        findViewById(R.id.getAd).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                apiKey = ((EditText) findViewById(R.id.apiKey)).getText().toString();
                spaceId = ((EditText) findViewById(R.id.spaceId)).getText().toString();

                new AsyncTask<Void, Void, Void>() {
                    @Override
                    protected Void doInBackground(Void... params) {
                        try {
                            badds = new Badds(apiKey);
                            String resource = badds.getBadds(spaceId).resource;

                            InputStream in = new URL(resource).openStream();

                            bmp = BitmapFactory.decodeStream(in);
                        } catch (Exception e) {
                            Log.e("badds.demo", "Error when fetching ad in space: " + spaceId, e);
                        }

                        return null;
                    }

                    @Override
                    protected void onPostExecute(Void result) {
                        if (bmp != null)
                            image.setImageBitmap(bmp);
                    }

                }.execute();
            }
        });
    }
}
