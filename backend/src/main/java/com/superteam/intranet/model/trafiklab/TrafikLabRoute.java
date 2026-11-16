package com.superteam.intranet.model.trafiklab;

public class TrafikLabRoute {
    private String designation;
    private TrafikLabDestination destination;

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public TrafikLabDestination getDestination() {
        return destination;
    }

    public void setDestination(TrafikLabDestination destination) {
        this.destination = destination;
    }
}
