package com.cin.threadsvirtuais.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/thread")
public class ThreadController {

    private static final int BLOCKING_TIME_MS = 200;    

    @GetMapping("/test")
    public String testThread() {
        
        try {
            Thread.sleep(BLOCKING_TIME_MS);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        return "OK";
    }
}