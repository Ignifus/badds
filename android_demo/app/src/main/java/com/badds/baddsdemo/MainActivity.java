package com.badds.baddsdemo;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.RadioGroup;

import com.badds.Badds;
import com.badds.IBaddsListener;
import com.badds.response.BaddsResponse;
import com.google.firebase.analytics.FirebaseAnalytics;

public class MainActivity extends Activity implements IBaddsListener {

    private ImageView image;
    private String apiKey;
    private String spaceId;
    private Badds badds;

    private FirebaseAnalytics firebaseAnalytics;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        apiKey = "de9facb5e717fd7da1fc22c30b2b7eb91c97c964da8dbbcda3af8c6365aae062";
        spaceId = "6";

        firebaseAnalytics = FirebaseAnalytics.getInstance(this);

        image = findViewById(R.id.imageView);

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
    }

    @Override
    public void onBaddsResponseError(BaddsResponse baddsResponse, Throwable throwable) {
        if (throwable != null)
            Log.e("badds.demo", "Error when fetching ad.", throwable);
        if (baddsResponse != null)
            Log.e("badds.demo", "Error in badds response: " + baddsResponse.error);
    }
}
