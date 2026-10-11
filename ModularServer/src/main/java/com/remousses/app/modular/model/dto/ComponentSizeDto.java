package com.remousses.app.modular.model.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ComponentSizeDto(
		@NotNull @Positive Double width,
		@NotNull @Positive Double height) {
}