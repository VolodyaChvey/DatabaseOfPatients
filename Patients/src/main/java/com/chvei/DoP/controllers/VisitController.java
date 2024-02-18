package com.chvei.DoP.controllers;

import com.chvei.DoP.services.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("*/visits")
public class VisitController {
    private VisitService visitService;

    public VisitController() {
    }

    @Autowired
    public VisitController(VisitService visitService) {
        this.visitService = visitService;
    }
}
