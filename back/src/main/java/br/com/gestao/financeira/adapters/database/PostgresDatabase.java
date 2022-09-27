package br.com.gestao.financeira.adapters.database;

import br.com.gestao.financeira.domain.Item;
import br.com.gestao.financeira.ports.database.Database;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

@ApplicationScoped
public class PostgresDatabase {

    @Inject
    EntityManager em;
    public Item save(Item item) {
        em.persist(item);
        return item;
    }

    public List<Item> findAll() {
        var resultList = em.createQuery("SELECT i FROM Item i", Item.class).getResultList();
        return resultList;
    }


    public Item findById(String id) {
        var result = em.find(Item.class, id);
        return result;
    }
}
