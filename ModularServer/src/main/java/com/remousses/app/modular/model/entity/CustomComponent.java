package com.remousses.app.modular.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class CustomComponent {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;

	private String name;

	@Column(name = "drop_point")
	private JsonNode dropPoint;

	private String type;

	@ManyToOne
	@JoinColumn(name = "pageId")
	@JsonIgnore
	private Page page;

	@OneToMany(mappedBy = "customComponent", fetch = FetchType.EAGER, orphanRemoval = true, cascade= CascadeType.ALL)
	private List<Attribute> attributes;
}
