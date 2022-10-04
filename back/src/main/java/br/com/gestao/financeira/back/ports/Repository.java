package br.com.gestao.financeira.back.ports;

import br.com.gestao.financeira.back.domain.Item;

import java.util.List;
import java.util.UUID;

public interface Repository {
    Item save(Item item);
    Item findById(UUID uuid);
    List<Item> findAll();
    List<Item> findByMonth(String month);
}
