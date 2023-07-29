package com.remousses.app.modular;

import com.remousses.app.modular.component.ModelMapperCustomize;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.remousses.app.modular.model.entity")
@EnableJpaRepositories("com.remousses.app.modular.repository")
@ComponentScan(basePackages = { "com.remousses.app.modular" })
public class ModularApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(ModularApplication.class, args);
	}

	@SuppressWarnings("unused")
	@Bean
	public ModelMapperCustomize modelMapper() {
		return new ModelMapperCustomize();
	}
}
