package com.example.P1_IgorSuguieda;

import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

public class Filtro implements Serializable{
    private Boolean tituloBool;
    private Boolean prazoBool;
    private Boolean filtrarStatus;

    private String titulo;
    private Boolean status;

    @DateTimeFormat (pattern = "yyyy-MM-dd")
    private Date prazo;
    public Filtro(Boolean tituloBool, Boolean prazoBool, Boolean filtrarStatus, String titulo, Boolean status, Date prazo) {
        this.tituloBool = tituloBool;
        this.prazoBool = prazoBool;
        this.filtrarStatus = filtrarStatus;
        this.titulo = titulo;
        this.status = status;
        this.prazo = prazo;
    }

    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public Boolean getStatus() {
        return status;
    }
    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Date getPrazo() {
        return prazo;
    }

    public void setPrazo(Date prazo) {
        this.prazo = prazo;
    }

    public Boolean getPrazoBool() {
        return prazoBool;
    }
    public void setPrazoBool(Boolean prazoBool) {
        this.prazoBool = prazoBool;
    }

    public Boolean getTituloBool() {
        return tituloBool;
    }
    public void setTituloBool(Boolean tituloBool) {
        this.tituloBool = tituloBool;
    }

    public Boolean getFiltrarStatus() {
        return filtrarStatus;
    }
    public void setFiltrarStatus(Boolean filtrarStatus) {
        this.filtrarStatus = filtrarStatus;

    }


}
