package com.badds.baddsdemo;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;

import com.badds.Badds;
import com.badds.IBaddsListener;
import com.badds.response.BaddsResponse;
import com.google.firebase.analytics.FirebaseAnalytics;

public class MainActivity extends Activity implements IBaddsListener {

    private ImageView image;
    private TextView adText;
    private String apiKey;
    private String spaceId;
    private Badds badds;

    private FirebaseAnalytics firebaseAnalytics;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        apiKey = "8130f9ae0daf24586228cf87398d8aa85ed5b6c954e43671dec17ca9bce6d392";
        spaceId = "1";

        firebaseAnalytics = FirebaseAnalytics.getInstance(this);

        image = findViewById(R.id.imageView);
        adText = findViewById(R.id.adText);

        image.setOnClickListener(v -> {
            String url = (String)v.getTag();

            Intent intent = new Intent();
            intent.setAction(Intent.ACTION_VIEW);
            intent.addCategory(Intent.CATEGORY_BROWSABLE);

            intent.setData(Uri.parse(url));

            startActivity(intent);
        });

        findViewById(R.id.getAd).setOnClickListener(v -> {
            try {
                int genderId = ((RadioGroup) findViewById(R.id.gender)).getCheckedRadioButtonId();
                String gender = ((RadioButton) findViewById(genderId)).getText().toString();

                int ageId = ((RadioGroup) findViewById(R.id.age)).getCheckedRadioButtonId();
                String age = ((RadioButton) findViewById(ageId)).getText().toString();

                badds = new Badds(this, this, apiKey);
                badds.getBadds(spaceId, gender, getAge(age));
            } catch(NullPointerException e) { }
        });
    }

    private String getAge(String age) {
        if (age.contains("<"))
            return "13";
        if (age.contains(">"))
            return "51";

        String[] a = age.split("-");
        int total = Integer.valueOf(a[0]) + Integer.valueOf(a[1]);

        return String.valueOf(Math.round(total / 2));
    }

    @Override
    public void onBaddsResponse(BaddsResponse baddsResponse) {
        image.setImageBitmap(baddsResponse.image);
        image.setTag(baddsResponse.link != null ? baddsResponse.link : "https://badds.geminis.dev");
        adText.setText(baddsResponse.text);
    }

    @Override
    public void onBaddsResponseError(BaddsResponse baddsResponse, Throwable throwable) {
        if (throwable != null)
            Log.e("badds.demo", "Error when fetching ad.", throwable);
        if (baddsResponse != null)
            Log.e("badds.demo", "Error in badds response: " + baddsResponse.error);
    }
}
