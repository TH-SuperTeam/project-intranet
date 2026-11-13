package com.superteam.intranet.mapper;

public class WeatherCodeMapper {

    // Översätter SMHI:s väderkoder till svenska beskrivningar
    public static String toDescription(int code) {
        return switch (code) {
            case 1 -> "Klart";
            case 2 -> "Nästan klart";
            case 3 -> "Halvklart";
            case 4 -> "Molnigt";
            case 5 -> "Mycket molnigt";
            case 6 -> "Mulet";
            case 7 -> "Dimma";
            case 8 -> "Lätta regnskurar";
            case 9 -> "Regnskurar";
            case 10 -> "Kraftiga regnskurar";
            case 11 -> "Åskväder";
            case 12 -> "Lätt snöblandat regn";
            case 13 -> "Snöblandat regn";
            case 14 -> "Kraftigt snöblandat regn";
            case 15 -> "Lätta snöbyar";
            case 16 -> "Snöbyar";
            case 17 -> "Kraftiga snöbyar";
            case 18 -> "Lätt regn";
            case 19 -> "Regn";
            case 20 -> "Kraftigt regn";
            case 21 -> "Åska";
            case 22 -> "Lätt snöblandat regn";
            case 23 -> "Snöblandat regn";
            case 24 -> "Kraftigt snöblandat regn";
            case 25 -> "Lätt snöfall";
            case 26 -> "Snöfall";
            case 27 -> "Kraftigt snöfall";
            default -> "Okänt väder";
        };
    }
}
