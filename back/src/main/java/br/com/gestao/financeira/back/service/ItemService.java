package br.com.gestao.financeira.back.service;

import br.com.gestao.financeira.back.adapters.ItemRepository;
import br.com.gestao.financeira.back.domain.Item;
import br.com.gestao.financeira.back.producer.ItemProducer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    private ItemRepository itemRepository;
    private ItemProducer itemProducer;

    @Autowired
    public ItemService(ItemRepository itemRepository, ItemProducer itemProducer) {
        this.itemRepository = itemRepository;
        this.itemProducer = itemProducer;
    }

    public Item saveItem(Item item) {
        Item itemSaved = this.itemRepository.save(item);
        this.itemProducer.sendMessage(itemSaved);
        return itemSaved;
    }

    public List<Item> findAllItems() {
        return this.itemRepository.findAll();
    }

    public List<Item> findByMonth(String month) {
        return this.itemRepository.findByMes(month);
    }
}
