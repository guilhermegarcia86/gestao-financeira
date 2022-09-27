package br.com.gestao.financeira.ports.database;

import br.com.gestao.financeira.domain.Item;

import java.util.List;

public interface Database {

    Item save(Item item);
    List<Item> findAll();
    Item findById(String id);

}
