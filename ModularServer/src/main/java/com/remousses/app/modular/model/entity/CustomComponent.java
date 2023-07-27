package com.remousses.app.modular.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class CustomComponent {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@NotNull
	private String name;

	@NotNull
	private String type;

	@Column(name = "drop_point")
	private JsonNode dropPoint;

	@NotNull
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "pageId")
	private Page page;

	@OneToMany(mappedBy = "customComponent", orphanRemoval = true, cascade= CascadeType.ALL)
	private List<Attribute> attributes;
}
