package com.example.P1_IgorSuguieda;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
public class Tarefa {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank (message = "Titulo da tarefa é obrigatório")
    private String titulo;
    private String descricao;

    @DateTimeFormat (pattern = "yyyy-MM-dd")
    private Date prazo;

    private Boolean status;

    public int getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public Date getPrazo(){
        return this.prazo;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setPrazo(Date prazo){
        this.prazo = prazo;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
