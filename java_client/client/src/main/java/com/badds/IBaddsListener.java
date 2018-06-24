package com.badds;

import com.badds.response.BaddsResponse;

public interface IBaddsListener {
    void onBaddsResponse(BaddsResponse response);
    void onBaddsResponseError(BaddsResponse response, Throwable e);
}
