package br.com.gestao.financeira.back.controller;

import br.com.gestao.financeira.back.domain.Item;
import br.com.gestao.financeira.back.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController {

    private ItemService service;

    @Autowired
    public ItemController(ItemService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Item>> findAllItems(){
        return ResponseEntity.ok(this.service.findAllItems());
    }

    @GetMapping("/{month}")
    public ResponseEntity<List<Item>> findByMonth(@PathVariable String month) {
        return ResponseEntity.ok(this.service.findByMonth(month));
    }
    @PostMapping
    public ResponseEntity<Item> saveItem(@RequestBody Item item) {
        return ResponseEntity.ok(this.service.saveItem(item));
    }
}
