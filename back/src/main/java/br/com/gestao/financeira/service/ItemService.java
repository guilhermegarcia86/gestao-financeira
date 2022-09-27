package br.com.gestao.financeira.service;

import br.com.gestao.financeira.adapters.database.PostgresDatabase;
import br.com.gestao.financeira.domain.Item;
import br.com.gestao.financeira.ports.database.Database;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class ItemService {

    @Inject
    PostgresDatabase database;


    public void saveItem(Item item) {
        var itemSaved = database.save(item);
        System.out.println("Item salvo: " + itemSaved);
    }
}
