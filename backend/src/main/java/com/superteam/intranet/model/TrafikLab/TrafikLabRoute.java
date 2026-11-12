package com.superteam.intranet.model.TrafikLab;

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
