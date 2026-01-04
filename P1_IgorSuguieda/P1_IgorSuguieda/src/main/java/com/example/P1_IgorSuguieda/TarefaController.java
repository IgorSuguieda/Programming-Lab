package com.example.P1_IgorSuguieda;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
public class TarefaController {


    @Autowired
    TarefaRepository tarefaRepository;

    private static final String SESSION_FILTROS = "sessionFiltros";

    @GetMapping("/nova-tarefa")
    public String mostrarNovaFormTarefa(Tarefa tarefa) {
        return "nova-tarefa";
    }

    @PostMapping("/adicionar-tarefa")
    public String adicionarTarefa(@Valid Tarefa tarefa, BindingResult result) {

        if(result.hasErrors()) {
            return "nova-tarefa";
        }

        tarefaRepository.save(tarefa);
        return "redirect:/nova-tarefa";
    }

    @GetMapping(value = {"/index", "/"})    //model model tem a ver com o que vai ter no html
    public String apresentarListaTarefas(Model model, HttpServletRequest request) {


        Filtro sessionFiltros = (Filtro) request.getSession().getAttribute(SESSION_FILTROS);

        if(sessionFiltros == null || !(sessionFiltros.getFiltrarStatus()) && !(sessionFiltros.getTituloBool()) && !(sessionFiltros.getPrazoBool())) {
            model.addAttribute("lista_tarefas", tarefaRepository.findAll());
        }else{

            if(sessionFiltros.getFiltrarStatus() && sessionFiltros.getTituloBool() && sessionFiltros.getPrazoBool()) {
                model.addAttribute("lista_tarefas", tarefaRepository.findByTituloContainingIgnoreCaseAndStatusAndPrazoBefore
                        (sessionFiltros.getTitulo(), sessionFiltros.getStatus(), sessionFiltros.getPrazo()));
            }

            else if(sessionFiltros.getTituloBool() && sessionFiltros.getFiltrarStatus()){
                model.addAttribute("lista_tarefas", tarefaRepository
                            .findByTituloContainingIgnoreCaseAndStatus(sessionFiltros.getTitulo(), sessionFiltros.getStatus()));
            }
            else if(sessionFiltros.getTituloBool() && sessionFiltros.getPrazoBool()){
                model.addAttribute("lista_tarefas", tarefaRepository.findByTituloContainingIgnoreCaseAndPrazoBefore
                        (sessionFiltros.getTitulo(), sessionFiltros.getPrazo()));
            }
            else if(sessionFiltros.getFiltrarStatus() && sessionFiltros.getPrazoBool()){
                model.addAttribute("lista_tarefas", tarefaRepository.findByStatusAndPrazoBefore
                        (sessionFiltros.getStatus(), sessionFiltros.getPrazo()));
            }
            else if(sessionFiltros.getTituloBool()){
                model.addAttribute("lista_tarefas", tarefaRepository.findByTituloContainingIgnoreCase(sessionFiltros.getTitulo()));
            }
            else if(sessionFiltros.getFiltrarStatus() ){
                model.addAttribute("lista_tarefas", tarefaRepository.findByStatus(sessionFiltros.getStatus()));
            }
            else if(sessionFiltros.getPrazoBool()){

                model.addAttribute("lista_tarefas", tarefaRepository.findByPrazoBefore(sessionFiltros.getPrazo()));
            }
        }

        return "index";
    }

    @GetMapping("/editar/{id}")
    public String mostrarEditarTarefa(@PathVariable("id") int id, Model model){
        Tarefa tarefa = tarefaRepository.findById(id).orElseThrow(()->new IllegalArgumentException("Id da tarefa: "+id +"não foi encontrada"));

        model.addAttribute("tarefa", tarefa);
        return "atualizar-tarefa";
    }


    @PostMapping("/atualizar/{id}")
    public String atualizarTarefaBD(@PathVariable("id") int id, @Valid Tarefa tarefa, BindingResult result){
        if(result.hasErrors()) {
            return "atualizar-tarefa";
        }

        tarefaRepository.save(tarefa);
        return "redirect:/index";
    }

    @GetMapping("/remover/{id}")
    public String removerTarefa(@PathVariable ("id") int id){
        Tarefa tarefa = tarefaRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("A tarefa de id "+id+"não foi encontrada"));

        tarefaRepository.delete(tarefa);
        return "redirect:/index";
    }

    @GetMapping("filtro")
    public String mostrarFiltros(Filtro filtro){
        return "filtro";
    }
    @PostMapping("/criar-filtro")
    public String criarFiltro(@Valid Filtro filtro, BindingResult result, HttpServletRequest request){
        request.getSession().setAttribute(SESSION_FILTROS, filtro);

        return "redirect:/index";
    }

    @GetMapping("/remover-filtro")
    public String removerFiltro(@Valid Filtro filtro, BindingResult result, HttpServletRequest request){

        request.getSession().removeAttribute(SESSION_FILTROS);

        return "redirect:/index";
    }

}