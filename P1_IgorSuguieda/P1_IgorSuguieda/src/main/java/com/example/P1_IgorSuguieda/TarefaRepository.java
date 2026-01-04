package com.example.P1_IgorSuguieda;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Date;

public interface TarefaRepository extends CrudRepository<Tarefa, Integer>{


    List<Tarefa> findByTituloContainingIgnoreCase(String titulo);

    List<Tarefa> findByPrazoBefore(Date prazo);

    List<Tarefa> findByStatus(Boolean status);

    List<Tarefa> findByTituloContainingIgnoreCaseAndStatus(String titulo, Boolean status);

    List<Tarefa> findByTituloContainingIgnoreCaseAndPrazoBefore(String titulo, Date prazo);

    List<Tarefa> findByStatusAndPrazoBefore(Boolean status, Date prazo);

    List<Tarefa> findByTituloContainingIgnoreCaseAndStatusAndPrazoBefore(String titulo, Boolean status, Date prazo);
}