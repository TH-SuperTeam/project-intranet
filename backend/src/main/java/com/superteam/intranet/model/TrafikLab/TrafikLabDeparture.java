package com.superteam.intranet.model.TrafikLab;

import java.time.LocalDateTime;

public class TrafikLabDeparture {
    private TrafikLabRoute route;
    private LocalDateTime scheduled;
    private LocalDateTime realtime;
    private boolean cancelled;
    private Integer delay;
    private boolean isRealtime;

    public TrafikLabRoute getRoute() {
        return route;
    }

    public void setRoute(TrafikLabRoute route) {
        this.route = route;
    }

    public LocalDateTime getScheduled() {
        return scheduled;
    }

    public void setScheduled(LocalDateTime scheduled) {
        this.scheduled = scheduled;
    }

    public LocalDateTime getRealtime() {
        return realtime;
    }

    public void setRealtime(LocalDateTime realtime) {
        this.realtime = realtime;
    }

    public boolean isCancelled() {
        return cancelled;
    }

    public void setCancelled(boolean cancelled) {
        this.cancelled = cancelled;
    }

    public Integer getDelay() {
        return delay;
    }

    public void setDelay(Integer delay) {
        this.delay = delay;
    }

    public boolean isRealtime() {
        return isRealtime;
    }

    public void setRealTime(boolean isRealtime) {
        this.isRealtime = isRealtime;
    }
}


