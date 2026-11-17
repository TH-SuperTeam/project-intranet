
package com.superteam.intranet.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ClassroomRequest(

        @NotBlank(message = "Klassrummets namn krävs")
        @Size(max = 100, message = "Klassrummets namn får vara max 100 tecken")
        String name

) {
}
