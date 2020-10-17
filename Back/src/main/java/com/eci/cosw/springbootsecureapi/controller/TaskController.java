package com.eci.cosw.springbootsecureapi.controller;

import com.eci.cosw.springbootsecureapi.model.Task;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.Unirest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/task")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private ObjectMapper mapper;

    @GetMapping
    public ResponseEntity<?> getTask(){
        try {
            String resp = Unirest.get("https://task-planner-app.azurewebsites.net/api/task?code=6d6gIMumCJ9iw8uWgtCmDNYnAuxsSXbPJ7C3HxU1u1YivTA1A6zD6g==")
                    .asString().getBody().toString();
            return ResponseEntity.ok(mapper.readValue(resp,Task[].class));
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> addTask(@RequestBody Task task){
        try {
            Unirest.post("https://task-planner-app.azurewebsites.net/api/task?code=6d6gIMumCJ9iw8uWgtCmDNYnAuxsSXbPJ7C3HxU1u1YivTA1A6zD6g==")
                    .header("Content-Type", "application/json")
                    .body(mapper.writeValueAsString(task)).getBody().toString();
            return ResponseEntity.accepted().build();
        }catch (Exception e){
            return  ResponseEntity.noContent().build();
        }
    }
}
